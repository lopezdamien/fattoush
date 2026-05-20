"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";

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
        <main className="min-h-screen bg-[#FAF5EC]">

            {/* Hero avec photo */}
            <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
                <Image
                    src="/images/mezze.jpg"
                    alt="Traiteur Fattoush"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)" }} />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-4 text-center">
                    <FadeIn>
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-3">Traiteur</h1>
                        <p className="text-white/80 text-lg md:text-xl max-w-lg">
                            La cuisine de Fattoush pour vos événements privés et professionnels
                        </p>
                    </FadeIn>
                </div>
            </div>

            {/* Intro + photo secondaire */}
            <div className="container mx-auto px-4 max-w-5xl py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <FadeIn delay={0.1}>
                        <div className="space-y-5">
                            <h2 className="text-3xl font-bold text-primary leading-snug">
                                Un repas libanais généreux, livré chez vous
                            </h2>
                            <p className="text-foreground/75 leading-relaxed">
                                Que ce soit pour un mariage, un anniversaire, une réception d&apos;entreprise ou un repas entre amis, nous préparons des mezzés, grillades et plats mijotés avec les mêmes produits frais que dans notre restaurant de la Rue des Gares.
                            </p>
                            <p className="text-foreground/75 leading-relaxed">
                                Chaque commande est pensée sur mesure — menu, quantités, présentation — pour que votre événement soit une réussite.
                            </p>
                            <ul className="space-y-2 text-sm text-foreground/70">
                                {["Mezzés froids & chauds", "Grillades & kafta", "Plats mijotés & riz", "Desserts orientaux", "Plateaux repas & buffets"].map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] relative">
                            <Image
                                src="/images/grill.jpg"
                                alt="Grillades Fattoush"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Formulaire */}
            <div className="bg-white py-14 px-4">
                <div className="container mx-auto max-w-2xl">
                    <FadeIn delay={0.1}>
                        <h2 className="text-2xl font-bold text-primary mb-1">Demande de devis</h2>
                        <p className="text-muted-foreground text-sm mb-8">
                            Remplissez le formulaire — nous vous répondons sous 48h.
                        </p>

                        {status === "success" ? (
                            <div className="text-center py-12 space-y-3 border border-border rounded-xl">
                                <p className="text-3xl">🎉</p>
                                <p className="font-bold text-foreground text-lg">Votre demande a bien été envoyée !</p>
                                <p className="text-muted-foreground text-sm">Nous reviendrons vers vous dans les meilleurs délais.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">Nom complet *</label>
                                        <input name="name" value={form.name} onChange={handleChange} required
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="Jean Dupont" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">Email *</label>
                                        <input name="email" type="email" value={form.email} onChange={handleChange} required
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="jean@example.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">Téléphone</label>
                                        <input name="phone" value={form.phone} onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="+41 xx xxx xx xx" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">Type d&apos;événement</label>
                                        <select name="eventType" value={form.eventType} onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
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
                                        <label className="text-sm font-medium text-foreground">Nombre de personnes</label>
                                        <input name="guests" value={form.guests} onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="ex. 50" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">Date souhaitée</label>
                                        <input name="date" type="date" value={form.date} onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-foreground">Message *</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                                        className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                                        placeholder="Décrivez votre événement, vos préférences alimentaires, vos contraintes…" />
                                </div>

                                {status === "error" && (
                                    <p className="text-sm text-red-500">Une erreur est survenue. Contactez-nous directement à contact@fattoushgeneve.ch</p>
                                )}

                                <button type="submit" disabled={status === "sending"}
                                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60">
                                    {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                                </button>
                            </form>
                        )}
                    </FadeIn>
                </div>
            </div>

        </main>
    );
}
