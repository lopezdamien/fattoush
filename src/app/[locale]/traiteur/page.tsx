"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ChefHat, Users, Calendar, Utensils, Sparkles } from "lucide-react";

const atouts = [
    {
        icon: ChefHat,
        color: "#FDE8E4",
        iconColor: "#C0455A",
        title: "Cuisine authentique",
        desc: "Recettes libanaises traditionnelles préparées avec des produits frais et de qualité.",
    },
    {
        icon: Users,
        color: "#E8F0FD",
        iconColor: "#4A6FA5",
        title: "Tous vos événements",
        desc: "Mariages, anniversaires, réceptions d'entreprise, buffets et plateaux repas.",
    },
    {
        icon: Utensils,
        color: "#E8F4EC",
        iconColor: "#3A7A50",
        title: "Menus sur mesure",
        desc: "Mezzés, grillades, plats chauds — nous adaptons la carte à vos envies et votre budget.",
    },
    {
        icon: Calendar,
        color: "#FDF3E3",
        iconColor: "#C07830",
        title: "Devis sous 48h",
        desc: "Contactez-nous et recevez une proposition personnalisée rapidement.",
    },
];

const specialites = [
    "Mezzés froids & chauds", "Grillades au charbon", "Kebbeh & kafta",
    "Riz & plats mijotés", "Desserts orientaux", "Plateaux repas",
];

export default function TraiteurPage() {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", eventType: "", guests: "", date: "", message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/contact-traiteur", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setStatus(res.ok ? "success" : "error");
            if (res.ok) setForm({ name: "", email: "", phone: "", eventType: "", guests: "", date: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen">

            {/* Hero */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 text-center" style={{ background: "linear-gradient(135deg, #7D1A2B 0%, #A52535 60%, #6B1522 100%)" }}>
                <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center font-serif text-[300px] leading-none text-white opacity-[0.03]">ع</div>
                <FadeIn>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-3">Fattoush Genève</p>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">Traiteur</h1>
                    <p className="text-lg md:text-xl text-white/75 max-w-xl mx-auto leading-relaxed">
                        La cuisine libanaise s&apos;invite à votre table — pour vos événements privés et professionnels à Genève et en Suisse romande.
                    </p>
                </FadeIn>
            </div>

            {/* Spécialités */}
            <div className="bg-[#FAF5EC] py-8 px-4">
                <FadeIn delay={0.1}>
                    <div className="container mx-auto max-w-4xl">
                        <div className="flex flex-wrap justify-center gap-3">
                            {specialites.map((s, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border" style={{ borderColor: "#C0455A", color: "#7D1A2B", background: "#FDE8E4" }}>
                                    <Sparkles size={13} />
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Atouts */}
            <div className="py-14 px-4 bg-white">
                <div className="container mx-auto max-w-5xl">
                    <FadeIn delay={0.1}>
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
                            Pourquoi choisir Fattoush Traiteur ?
                        </h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {atouts.map((a, i) => (
                            <FadeIn key={i} delay={0.1 * (i + 1)}>
                                <div className="rounded-2xl p-6 flex flex-col gap-4 h-full" style={{ background: a.color }}>
                                    <div className="p-3 rounded-xl w-fit" style={{ background: `${a.iconColor}20` }}>
                                        <a.icon size={22} style={{ color: a.iconColor }} />
                                    </div>
                                    <h3 className="font-bold text-foreground text-base">{a.title}</h3>
                                    <p className="text-sm text-foreground/65 leading-snug">{a.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>

            {/* Formulaire */}
            <div className="py-14 px-4" style={{ background: "linear-gradient(to bottom, #F9F4EE, #FDF8F2)" }}>
                <div className="container mx-auto max-w-2xl">
                    <FadeIn delay={0.1}>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-primary mb-2">Demandez un devis</h2>
                            <p className="text-muted-foreground">Dites-nous tout — nous vous répondons sous 48h.</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md border border-border/30 px-6 py-8 md:px-10 md:py-10">
                            {status === "success" ? (
                                <div className="text-center py-10 space-y-3">
                                    <div className="text-4xl">🎉</div>
                                    <p className="font-bold text-foreground text-xl">Demande envoyée !</p>
                                    <p className="text-muted-foreground text-sm">Nous reviendrons vers vous dans les meilleurs délais.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-foreground">Nom complet *</label>
                                            <input name="name" value={form.name} onChange={handleChange} required
                                                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                                placeholder="Jean Dupont" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-foreground">Email *</label>
                                            <input name="email" type="email" value={form.email} onChange={handleChange} required
                                                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                                placeholder="jean@example.com" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-foreground">Téléphone</label>
                                            <input name="phone" value={form.phone} onChange={handleChange}
                                                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                                placeholder="+41 xx xxx xx xx" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-foreground">Type d&apos;événement</label>
                                            <select name="eventType" value={form.eventType} onChange={handleChange}
                                                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
                                                <option value="">Sélectionner…</option>
                                                <option>Mariage</option>
                                                <option>Anniversaire</option>
                                                <option>Événement d&apos;entreprise</option>
                                                <option>Buffet privé</option>
                                                <option>Plateau repas</option>
                                                <option>Autre</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-foreground">Nombre de personnes</label>
                                            <input name="guests" value={form.guests} onChange={handleChange}
                                                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                                placeholder="ex. 50" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-foreground">Date souhaitée</label>
                                            <input name="date" type="date" value={form.date} onChange={handleChange}
                                                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-foreground">Message *</label>
                                        <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                                            className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                                            placeholder="Décrivez votre événement, vos préférences, vos contraintes…" />
                                    </div>

                                    {status === "error" && (
                                        <p className="text-sm text-red-500">Une erreur est survenue. Contactez-nous directement à contact@fattoushgeneve.ch</p>
                                    )}

                                    <button type="submit" disabled={status === "sending"}
                                        className="w-full text-white font-bold py-3.5 rounded-xl transition-opacity disabled:opacity-60 text-base"
                                        style={{ background: "linear-gradient(135deg, #7D1A2B, #A52535)" }}>
                                        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande →"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </div>

        </main>
    );
}
