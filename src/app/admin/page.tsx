"use client";

import { useState, useEffect } from "react";

type DayMenu = { name: string; description: string; dateLabel?: string };
type WeeklyMenuState = {
    lundi: DayMenu;
    mardi: DayMenu;
    mercredi: DayMenu;
    jeudi: DayMenu;
    vendredi: DayMenu;
};

const emptyDay = (): DayMenu => ({ name: "", description: "" });

const PRIMARY = "#3a6b47";
const DAYS_OF_WEEK: (keyof WeeklyMenuState)[] = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
const FRENCH_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const MONTHS = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

// Helper to find the Monday of the current or next week
function getInitialMondayStr() {
    const d = new Date();
    const day = d.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // get current week's Monday
    const monday = new Date(d.setDate(diff));
    if (day === 6 || day === 0) { // Saturday or Sunday, configure next week
        monday.setDate(monday.getDate() + 7);
    }
    return monday.toISOString().split("T")[0]; // YYYY-MM-DD
}

// Helper to compute date labels for the week starting on Monday
function getWeekDaysLabels(mondayStr: string) {
    if (!mondayStr) return [];
    const parts = mondayStr.split("-");
    const monday = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    
    return FRENCH_DAYS.map((dayName, index) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + index);
        return `${dayName} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
    });
}

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [authed, setAuthed] = useState(false);
    const [authError, setAuthError] = useState(false);

    const [weekStarting, setWeekStarting] = useState(getInitialMondayStr());
    const [menu, setMenu] = useState<WeeklyMenuState>({
        lundi: emptyDay(),
        mardi: emptyDay(),
        mercredi: emptyDay(),
        jeudi: emptyDay(),
        vendredi: emptyDay()
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Load active menu on mount
    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await fetch("/api/plat-du-jour");
                if (res.ok) {
                    const data = await res.json();
                    if (data.weekStarting) {
                        setWeekStarting(data.weekStarting);
                    }
                    if (data.menu) {
                        setMenu({
                            lundi: data.menu.lundi || emptyDay(),
                            mardi: data.menu.mardi || emptyDay(),
                            mercredi: data.menu.mercredi || emptyDay(),
                            jeudi: data.menu.jeudi || emptyDay(),
                            vendredi: data.menu.vendredi || emptyDay()
                        });
                    }
                }
            } catch (e) {
                console.error("Impossible de récupérer le plat du jour :", e);
            }
        }
        fetchMenu();
    }, []);

    const dateLabels = getWeekDaysLabels(weekStarting);

    function updateDay(day: keyof WeeklyMenuState, field: keyof DayMenu, value: string) {
        setMenu(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: value
            }
        }));
        setSuccess(false);
    }

    function handleWeekChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        if (!val) return;
        
        // Align date to the Monday of that week
        const d = new Date(val);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(d.setDate(diff));
        setWeekStarting(monday.toISOString().split("T")[0]);
        setSuccess(false);
    }

    async function handleAuth(e: React.FormEvent) {
        e.preventDefault();
        if (password.length < 1) return;
        setAuthed(true);
        setAuthError(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError("");

        // Prepare the payload with calculated dateLabels
        const payloadMenu = { ...menu };
        DAYS_OF_WEEK.forEach((day, index) => {
            payloadMenu[day] = {
                ...payloadMenu[day],
                dateLabel: dateLabels[index]
            };
        });

        const payload = {
            password,
            weekStarting,
            menu: payloadMenu
        };

        const res = await fetch("/api/plat-du-jour", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        setLoading(false);

        if (res.ok) {
            setSuccess(true);
        } else {
            const data = await res.json();
            if (res.status === 401) {
                setAuthed(false);
                setAuthError(true);
            } else {
                setError(data.error || "Une erreur est survenue.");
            }
        }
    }

    if (!authed) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #f0f4f1 0%, #e8f0ea 100%)" }}>
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-sm" style={{ backgroundColor: PRIMARY }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18M3 12h18M3 18h18"/>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight" style={{ color: PRIMARY }}>Fattoush</h1>
                        <p className="text-xs text-gray-400 mt-1 tracking-widest uppercase">Espace administration</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 space-y-4">
                        <form onSubmit={handleAuth} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Mot de passe</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/20 focus:bg-white transition-all"
                                    autoFocus
                                />
                            </div>
                            {authError && (
                                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                                    <span className="text-red-400">✕</span>
                                    <p className="text-red-500 text-sm">Mot de passe incorrect</p>
                                </div>
                            )}
                            <button type="submit" className="w-full text-white rounded-xl py-3.5 font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-md" style={{ backgroundColor: PRIMARY }}>
                                Accéder →
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-10 flex items-start justify-center" style={{ background: "linear-gradient(135deg, #f0f4f1 0%, #e8f0ea 100%)" }}>
            <div className="w-full max-w-lg space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Fattoush Genève</p>
                        <h1 className="text-2xl font-bold tracking-tight mt-0.5" style={{ color: PRIMARY }}>Plat du jour</h1>
                    </div>
                    <button
                        onClick={() => { setAuthed(false); setPassword(""); setSuccess(false); }}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 rounded-full px-3 py-1.5 bg-white"
                    >
                        Déconnexion
                    </button>
                </div>

                {/* Aperçu */}
                {DAYS_OF_WEEK.some(d => menu[d].name) && (
                    <div className="rounded-2xl p-5 text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${PRIMARY}, #2e5538)` }}>
                        <p className="text-xs font-bold tracking-widest uppercase opacity-70 mb-3">Aperçu de la semaine</p>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                            {DAYS_OF_WEEK.map((day, index) => {
                                const m = menu[day];
                                return m.name ? (
                                    <div key={day} className="border-b border-white/10 pb-2 last:border-0 last:pb-0">
                                        <p className="text-xs font-bold tracking-wider opacity-60 uppercase">{dateLabels[index]}</p>
                                        <p className="text-sm font-bold uppercase leading-tight mt-0.5">{m.name}</p>
                                        {m.description && <p className="text-xs opacity-75 mt-0.5 whitespace-pre-line">{m.description}</p>}
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-7 space-y-6">

                    {/* Date picker for target week */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Semaine du (Lundi)</label>
                        <input
                            type="date"
                            value={weekStarting}
                            onChange={handleWeekChange}
                            className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/20 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    {/* Weekdays menu configuration */}
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Plats du lundi au vendredi</span>
                        </div>
                        {DAYS_OF_WEEK.map((day, index) => {
                            const m = menu[day];
                            return (
                                <div key={day} className="space-y-2 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>
                                            {dateLabels[index]}
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={m.name}
                                        onChange={e => updateDay(day, "name", e.target.value)}
                                        placeholder="Nom du plat (laisser vide si pas de plat)"
                                        className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/20 focus:bg-white transition-all"
                                    />
                                    <textarea
                                        value={m.description}
                                        onChange={e => updateDay(day, "description", e.target.value)}
                                        placeholder="Description (ex: accompagnements, sauce...)"
                                        rows={2}
                                        className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/20 focus:bg-white transition-all resize-none"
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                            <span className="text-red-400">✕</span>
                            <p className="text-red-500 text-sm">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                            <span className="text-emerald-500 text-lg">✓</span>
                            <div>
                                <p className="text-emerald-700 text-sm font-semibold">Semaine mise à jour avec succès !</p>
                                <p className="text-emerald-600 text-xs mt-0.5">Le site sera actualisé dans ~1 minute.</p>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white rounded-xl py-4 font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-md disabled:opacity-50"
                        style={{ backgroundColor: PRIMARY }}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                </svg>
                                Enregistrement…
                            </span>
                        ) : "Enregistrer la semaine →"}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 pb-4">fattoushgeneve.ch · Administration</p>
            </div>
        </div>
    );
}
