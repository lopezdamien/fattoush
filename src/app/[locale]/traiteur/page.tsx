"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { ChefHat, Users, Calendar, Utensils } from "lucide-react";

const atouts = [
    {
        icon: ChefHat,
        title: "Cuisine authentique",
        desc: "Recettes libanaises traditionnelles préparées avec des produits frais et de qualité.",
    },
    {
        icon: Users,
        title: "Tous vos événements",
        desc: "Mariages, anniversaires, réceptions d'entreprise, buffets et plateaux repas.",
    },
    {
        icon: Utensils,
        title: "Menus sur mesure",
        desc: "Mezzés, grillades, plats chauds — nous adaptons la carte à vos envies et votre budget.",
    },
    {
        icon: Calendar,
        title: "Réservation simple",
        desc: "Contactez-nous pour obtenir un devis personnalisé sous 48h.",
    },
];

export default function TraiteurPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        guests: "",
        date: "",
        message: "",
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
            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", phone: "", eventType: "", guests: "", date: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <main className="pt-4 md:pt-8 pb-16 bg-secondary/30 min-h-screen">
            {/* Titre */}
            <Section className="text-center space-y-2 mb-8 py-0">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">Traiteur</h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Fattoush s'invite à votre table pour vos événements privés et professionnels à Genève et en Suisse romande.
                    </p>
                </FadeIn>
            </Section>

            {/* Atouts */}
            <div className="container mx-auto px-4 max-w-5xl mb-12">
                <FadeIn delay={0.1}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {atouts.map((a, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-border/50 p-5 flex flex-col gap-3">
                                <div className="bg-primary/10 p-3 rounded-full text-primary w-fit">
                                    <a.icon size={20} />
                                </div>
                                <h3 className="font-bold text-foreground">{a.title}</h3>
                                <p className="text-sm text-muted-foreground leading-snug">{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>

            {/* Formulaire */}
            <div className="container mx-auto px-4 max-w-2xl">
                <FadeIn delay={0.2}>
                    <div className="bg-white rounded-xl shadow-sm border border-border/50 px-6 py-8 md:px-10 md:py-10">
                        <h2 className="text-2xl font-bold text-primary mb-1">Demande de devis</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                            Remplissez le formulaire ci-dessous — nous vous répondrons sous 48h.
                        </p>

                        {status === "success" ? (
                            <div className="text-center py-10 space-y-3">
                                <p className="text-2xl">🎉</p>
                                <p className="font-bold text-foreground text-lg">Votre demande a bien été envoyée !</p>
                                <p className="text-muted-foreground text-sm">Nous reviendrons vers vous dans les meilleurs délais.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">Nom complet *</label>
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="Jean Dupont"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">Email *</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="jean@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">Téléphone</label>
                                        <input
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="+41 xx xxx xx xx"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">Type d&apos;événement</label>
                                        <select
                                            name="eventType"
                                            value={form.eventType}
                                            onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                                        >
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
                                        <input
                                            name="guests"
                                            value={form.guests}
                                            onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="ex. 50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">Date souhaitée</label>
                                        <input
                                            name="date"
                                            type="date"
                                            value={form.date}
                                            onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-foreground">Message *</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                                        placeholder="Décrivez votre événement, vos préférences alimentaires, vos contraintes…"
                                    />
                                </div>

                                {status === "error" && (
                                    <p className="text-sm text-red-500">Une erreur est survenue. Veuillez réessayer ou nous contacter directement.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
                                >
                                    {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                                </button>
                            </form>
                        )}
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
