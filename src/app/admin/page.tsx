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

type Plat = { name: string; description: string; price: string };

const emptyPlat = (): Plat => ({ name: "", description: "", price: "CHF 22.–" });

const PRIMARY = "#3a6b47";

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [authed, setAuthed] = useState(false);
    const [authError, setAuthError] = useState(false);

    const [date, setDate] = useState(todayLabel());
    const [plats, setPlats] = useState<Plat[]>([emptyPlat()]);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    function updatePlat(index: number, field: keyof Plat, value: string) {
        setPlats(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
        setSuccess(false);
    }

    function addPlat() {
        if (plats.length < 3) setPlats(prev => [...prev, emptyPlat()]);
    }

    function removePlat(index: number) {
        if (plats.length > 1) setPlats(prev => prev.filter((_, i) => i !== index));
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

        const payload = {
            password,
            date,
            plats: plats.map(p => ({ ...p, name: p.name.toUpperCase() })),
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
                {plats.some(p => p.name) && (
                    <div className="rounded-2xl p-5 text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${PRIMARY}, #2e5538)` }}>
                        <p className="text-xs font-bold tracking-widest uppercase opacity-70 mb-3">Aperçu · {date || "—"}</p>
                        <div className={`grid gap-4 ${plats.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                            {plats.map((p, i) => p.name ? (
                                <div key={i}>
                                    <p className="text-sm font-bold uppercase leading-tight">{p.name}</p>
                                    {p.description && <p className="text-xs opacity-75 mt-1 whitespace-pre-line">{p.description}</p>}
                                    {p.price && <p className="text-sm font-bold mt-1.5">{p.price}</p>}
                                </div>
                            ) : null)}
                        </div>
                    </div>
                )}

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-7 space-y-6">

                    {/* Date */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Date</label>
                        <input
                            type="text"
                            value={date}
                            onChange={e => { setDate(e.target.value); setSuccess(false); }}
                            placeholder="ex : Mardi 22 Avril"
                            className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/20 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    {/* Plats */}
                    {plats.map((plat, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: PRIMARY }}>
                                    {plats.length > 1 ? `Plat ${i + 1}` : "Plat du jour"}
                                </span>
                                {plats.length > 1 && (
                                    <button type="button" onClick={() => removePlat(i)} className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                                        Supprimer
                                    </button>
                                )}
                            </div>
                            <input
                                type="text"
                                value={plat.name}
                                onChange={e => updatePlat(i, "name", e.target.value)}
                                placeholder="Nom du plat"
                                className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/20 focus:bg-white transition-all"
                                required
                            />
                            <textarea
                                value={plat.description}
                                onChange={e => updatePlat(i, "description", e.target.value)}
                                placeholder="Description"
                                rows={2}
                                className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/20 focus:bg-white transition-all resize-none"
                                required
                            />
                            <input
                                type="text"
                                value={plat.price}
                                onChange={e => updatePlat(i, "price", e.target.value)}
                                placeholder="Prix (ex : CHF 22.–)"
                                className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/20 focus:bg-white transition-all"
                                required
                            />
                            {i < plats.length - 1 && <div className="border-b border-gray-100 pt-1" />}
                        </div>
                    ))}

                    {/* Ajouter un plat */}
                    {plats.length < 3 && (
                        <button
                            type="button"
                            onClick={addPlat}
                            className="w-full border-2 border-dashed border-gray-200 rounded-xl py-3 text-sm text-gray-400 hover:border-[#3a6b47]/40 hover:text-[#3a6b47] transition-all"
                        >
                            + Ajouter un deuxième plat
                        </button>
                    )}

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
                                <p className="text-emerald-700 text-sm font-semibold">Mis à jour avec succès !</p>
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
                        ) : "Mettre à jour le site →"}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 pb-4">fattoushgeneve.ch · Administration</p>
            </div>
        </div>
    );
}
