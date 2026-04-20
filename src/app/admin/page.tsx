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
        // Quick client-side check — real check happens server-side on submit
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
            <div className="min-h-screen bg-[#F6F4F0] flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm space-y-6">
                    <div className="text-center space-y-1">
                        <h1 className="text-2xl font-bold text-[#3a6b47]">Fattoush Admin</h1>
                        <p className="text-sm text-gray-500">Accès réservé</p>
                    </div>
                    <form onSubmit={handleAuth} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/30"
                            autoFocus
                        />
                        {authError && (
                            <p className="text-red-500 text-sm text-center">Mot de passe incorrect</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-[#3a6b47] text-white rounded-lg py-3 font-semibold text-sm hover:bg-[#2e5538] transition-colors"
                        >
                            Accéder
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6F4F0] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg space-y-6">
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold text-[#3a6b47]">Plat du jour</h1>
                    <p className="text-sm text-gray-500">Le site sera mis à jour dans ~1 minute après enregistrement</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</label>
                        <input
                            type="text"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            placeholder="ex: Lundi 21 Avril"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/30"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nom du plat</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="ex: Courgettes farcies"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/30"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="ex: Sauce au yaourt, riz et salade"
                            rows={3}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/30 resize-none"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Prix</label>
                        <input
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder="ex: CHF 22.–"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a6b47]/30"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    {success && (
                        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 text-center">
                            ✓ Mis à jour ! Le site sera actualisé dans environ 1 minute.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#3a6b47] text-white rounded-lg py-3 font-semibold text-sm hover:bg-[#2e5538] transition-colors disabled:opacity-60"
                    >
                        {loading ? "Enregistrement…" : "Mettre à jour le site"}
                    </button>
                </form>

                <button
                    onClick={() => { setAuthed(false); setPassword(""); }}
                    className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                    Se déconnecter
                </button>
            </div>
        </div>
    );
}
