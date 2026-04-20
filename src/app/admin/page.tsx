"use client";

import { useState } from "react";

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const MONTHS = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

function todayLabel() {
    const d = new Date();
    return `${DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

const PRIMARY = "#3a6b47";

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [authed, setAuthed] = useState(false);
    const [authError, setAuthError] = useState(false);

    const [date, setDate] = useState(todayLabel());
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("CHF 22.–");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

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

        const res = await fetch("/api/plat-du-jour", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password, date, name: name.toUpperCase(), description, price }),
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
                    {/* Logo / Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-sm" style={{ backgroundColor: PRIMARY }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                                <path d="M8 12h8M12 8v8"/>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight" style={{ color: PRIMARY }}>Fattoush</h1>
                        <p className="text-sm text-gray-400 mt-1 tracking-wide uppercase text-xs">Espace administration</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">
                        <form onSubmit={handleAuth} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Mot de passe</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all"
                                    style={{ "--tw-ring-color": `${PRIMARY}40` } as React.CSSProperties}
                                    autoFocus
                                />
                            </div>

                            {authError && (
                                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                                    <span className="text-red-400 text-base">✕</span>
                                    <p className="text-red-500 text-sm">Mot de passe incorrect</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full text-white rounded-xl py-3.5 font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-md"
                                style={{ backgroundColor: PRIMARY }}
                            >
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
            <div className="w-full max-w-lg">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
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

                {/* Preview card */}
                {name && (
                    <div className="mb-4 rounded-2xl p-5 text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${PRIMARY}, #2e5538)` }}>
                        <p className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2">Aperçu · {date || "—"}</p>
                        <p className="text-lg font-bold uppercase leading-tight">{name}</p>
                        {description && <p className="text-sm opacity-80 mt-1">{description}</p>}
                        {price && <p className="text-base font-bold mt-2">{price}</p>}
                    </div>
                )}

                {/* Form card */}
                <div className="bg-white rounded-3xl shadow-xl p-7 space-y-5">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <Field label="Date" value={date} onChange={setDate} placeholder="ex : Mardi 22 Avril" />
                        <Field label="Nom du plat" value={name} onChange={setName} placeholder="ex : Courgettes farcies" />
                        <Field label="Description" value={description} onChange={setDescription} placeholder="ex : Sauce au yaourt, riz et salade" textarea />
                        <Field label="Prix" value={price} onChange={setPrice} placeholder="ex : CHF 22.–" />

                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                                <span className="text-red-400">✕</span>
                                <p className="text-red-500 text-sm">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                                <span className="text-emerald-500 text-lg">✓</span>
                                <div>
                                    <p className="text-emerald-700 text-sm font-semibold">Mis à jour avec succès !</p>
                                    <p className="text-emerald-600 text-xs mt-0.5">Le site sera actualisé dans ~1 minute.</p>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full text-white rounded-xl py-4 font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-md disabled:opacity-50 mt-2"
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
                            ) : "Mettre à jour le site →"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-gray-400 mt-5">fattoushgeneve.ch · Administration</p>
            </div>
        </div>
    );
}

function Field({
    label, value, onChange, placeholder, textarea
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    textarea?: boolean;
}) {
    const cls = "w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/20 focus:bg-white transition-all";
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{label}</label>
            {textarea ? (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                    className={cls + " resize-none"}
                    required
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={cls}
                    required
                />
            )}
        </div>
    );
}
