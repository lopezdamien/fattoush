import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { MapPin, Phone, Mail, Clock, Car, Bus, Train } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Contact' });

    return {
        title: `Fattoush - ${t('title')}`,
        description: t('subtitle')
    };
}

export default function ContactPage() {
    const t = useTranslations("Contact");

    return (
        <main className="pt-4 md:pt-8 pb-12 bg-secondary/30">
            <Section className="text-center space-y-0.5 mb-6 py-0">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
                </FadeIn>
            </Section>

            <div className="container mx-auto px-4 max-w-6xl space-y-6">

                {/* Ligne principale : infos + carte */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                    {/* Colonne gauche : coordonnées */}
                    <div className="grid gap-3 content-start">

                        {/* Adresse */}
                        <FadeIn delay={0.1} direction="right">
                            <div className="bg-white px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-sm flex items-start gap-4 border border-border/50 hover:shadow-md transition-shadow">
                                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0 mt-0.5">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1 text-foreground">{t("address")}</h3>
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Rue+des+Gares+7-9,+1201+Genève"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-primary transition-colors font-bold text-muted-foreground"
                                    >
                                        Rue des Gares 7-9<br />
                                        1201 Genève
                                    </a>
                                    <p className="text-sm text-muted-foreground/80 mt-1.5 leading-snug italic">
                                        À la sortie de la gare Cornavin, côté Monbrillant,<br />
                                        à 2 pas de l&apos;hôtel Monbrillant,<br />
                                        à proximité de la poste
                                    </p>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Horaires */}
                        <FadeIn delay={0.2} direction="right">
                            <div className="bg-white px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-sm flex items-start gap-4 border border-border/50 hover:shadow-md transition-shadow">
                                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0 mt-0.5">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1 text-foreground">{t("hours")}</h3>
                                    <div className="text-muted-foreground text-sm md:text-base space-y-0.5">
                                        <p>Lun – Ven : 12h00 – 15h00 / 18h30 – 00h00</p>
                                        <p>Sam – Dim : 12h00 – 00h00</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Téléphone */}
                        <FadeIn delay={0.3} direction="right">
                            <div className="bg-white px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-sm flex items-center gap-4 border border-border/50 hover:shadow-md transition-shadow">
                                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-0.5 text-foreground">{t("phone")}</h3>
                                    <a href="tel:+41229104550" className="text-muted-foreground hover:text-primary transition-colors">
                                        +41 22 910 45 50
                                    </a>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Email */}
                        <FadeIn delay={0.4} direction="right">
                            <div className="bg-white px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-sm flex items-center gap-4 border border-border/50 hover:shadow-md transition-shadow">
                                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-0.5 text-foreground">{t("email")}</h3>
                                    <a href="mailto:contact@fattoushgeneve.ch" className="text-muted-foreground hover:text-primary transition-colors">
                                        contact@fattoushgeneve.ch
                                    </a>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Carte */}
                    <FadeIn delay={0.3} direction="left" className="h-[400px] lg:h-full lg:min-h-[420px] sticky top-24">
                        <div className="h-full rounded-xl overflow-hidden shadow-lg bg-white border border-border/50">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.8842426868625!2d6.139158676839352!3d46.21557987109594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c65266e7401d1%3A0x629576442651475c!2sRue%20des%20Gares%207%2C%201201%20Gen%C3%A8ve%2C%20Switzerland!5e0!3m2!1sen!2s!4v1707412345678!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) contrast(1.2) opacity(0.9)" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full mix-blend-multiply"
                            ></iframe>
                        </div>
                    </FadeIn>
                </div>

                {/* Comment venir */}
                <FadeIn delay={0.2}>
                    <div className="bg-white rounded-xl shadow-sm border border-border/50 px-6 py-6 md:px-8 md:py-7">
                        <h2 className="text-xl font-bold text-primary mb-5">{t("howToGet.title")}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0 mt-0.5">
                                    <Train size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">{t("howToGet.train.title")}</h3>
                                    <p className="text-sm text-muted-foreground leading-snug">
                                        {t("howToGet.train.desc")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0 mt-0.5">
                                    <Bus size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">{t("howToGet.bus.title")}</h3>
                                    <p className="text-sm text-muted-foreground leading-snug">
                                        {t("howToGet.bus.stop")} — {t("howToGet.bus.desc")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0 mt-0.5">
                                    <Car size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">{t("howToGet.car.title")}</h3>
                                    <p className="text-sm text-muted-foreground leading-snug">
                                        {t("howToGet.car.desc")}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </FadeIn>

            </div>
        </main>
    );
}
