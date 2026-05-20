"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function TraiteurPage() {
    const t = useTranslations("Traiteur");

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

    const specialties = t.raw("specialties") as string[];
    const events = t.raw("form.events") as string[];

    return (
        <main className="min-h-screen bg-[#FAF5EC]">

            {/* Hero */}
            <div className="bg-primary pt-24 pb-14 px-4 text-center">
                <FadeIn>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-3">{t("title")}</h1>
                    <p className="text-white/75 text-lg md:text-xl max-w-lg mx-auto">
                        {t("subtitle")}
                    </p>
                </FadeIn>
            </div>

            {/* Intro + photo */}
            <div className="container mx-auto px-4 max-w-5xl py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <FadeIn delay={0.1}>
                        <div className="space-y-5">
                            <h2 className="text-3xl font-bold text-primary leading-snug">
                                {t("intro_title")}
                            </h2>
                            <p className="text-foreground/75 leading-relaxed">{t("intro_p1")}</p>
                            <p className="text-foreground/75 leading-relaxed">{t("intro_p2")}</p>
                            <ul className="space-y-2 text-sm text-foreground/70">
                                {specialties.map((item) => (
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
                        <h2 className="text-2xl font-bold text-primary mb-1">{t("form_title")}</h2>
                        <p className="text-muted-foreground text-sm mb-8">{t("form_subtitle")}</p>

                        {status === "success" ? (
                            <div className="text-center py-12 space-y-3 border border-border rounded-xl">
                                <p className="font-bold text-foreground text-lg">{t("form.success_title")}</p>
                                <p className="text-muted-foreground text-sm">{t("form.success_desc")}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">{t("form.name")} *</label>
                                        <input name="name" value={form.name} onChange={handleChange} required
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="Jean Dupont" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">{t("form.email")} *</label>
                                        <input name="email" type="email" value={form.email} onChange={handleChange} required
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="jean@example.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">{t("form.phone")}</label>
                                        <input name="phone" value={form.phone} onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder="+41 xx xxx xx xx" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">{t("form.event_type")}</label>
                                        <select name="eventType" value={form.eventType} onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
                                            <option value="">{t("form.event_placeholder")}</option>
                                            {events.map((ev) => (
                                                <option key={ev}>{ev}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">{t("form.guests")}</label>
                                        <input name="guests" value={form.guests} onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            placeholder={t("form.guests_placeholder")} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-foreground">{t("form.date")}</label>
                                        <input name="date" type="date" value={form.date} onChange={handleChange}
                                            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-foreground">{t("form.message")} *</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                                        className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                                        placeholder={t("form.message_placeholder")} />
                                </div>

                                {status === "error" && (
                                    <p className="text-sm text-red-500">{t("form.error")}</p>
                                )}

                                <button type="submit" disabled={status === "sending"}
                                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60">
                                    {status === "sending" ? t("form.sending") : t("form.submit")}
                                </button>
                            </form>
                        )}
                    </FadeIn>
                </div>
            </div>

        </main>
    );
}
