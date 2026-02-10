import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
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

    const contactInfo = [
        {
            icon: MapPin,
            title: t("address"),
            content: (
                <>
                    Rue des Gares 7-9<br />
                    1201 Genève
                </>
            )
        },
        {
            icon: Phone,
            title: t("phone"),
            content: "+41 22 910 45 50"
        },
        {
            icon: Mail,
            title: t("email"),
            content: "contact@fattoushgeneve.ch"
        },
        {
            icon: Clock,
            title: t("hours"),
            content: (
                <>
                    Lun - Sam: 11h - 23h<br />
                    Dim: Fermé
                </>
            )
        }
    ];

    return (
        <main className="pt-20 min-h-screen bg-secondary/30">
            <Section className="text-center space-y-4 mb-8 pt-8 md:pt-12">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
                </FadeIn>
            </Section>

            <div className="container mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="grid gap-6">
                        {contactInfo.map((info, idx) => (
                            <FadeIn key={idx} delay={0.1 * (idx + 1)} direction="right">
                                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex items-start gap-6 border border-border/50 hover:shadow-md transition-shadow">
                                    <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                                        <info.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-2 text-foreground">{info.title}</h3>
                                        <div className="text-muted-foreground leading-relaxed text-lg">
                                            {info.content}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Map */}
                    <FadeIn delay={0.5} direction="left" className="h-full min-h-[400px] lg:min-h-[600px] sticky top-24">
                        <div className="h-full rounded-2xl overflow-hidden shadow-lg bg-white border border-border/50">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.8842426868625!2d6.139158676839352!3d46.21557987109594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c65266e7401d1%3A0x629576442651475c!2sRue%20des%20Gares%207%2C%201201%20Gen%C3%A8ve%2C%20Switzerland!5e0!3m2!1sen!2s!4v1707412345678!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
