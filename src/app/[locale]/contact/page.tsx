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
                <a
                    href="https://www.google.com/maps/search/?api=1&query=Rue+des+Gares+7-9,+1201+Genève"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                >
                    Rue des Gares 7-9<br />
                    1201 Genève
                </a>
            )
        },
        {
            icon: Phone,
            title: t("phone"),
            content: (
                <a
                    href="tel:+41229104550"
                    className="hover:text-primary transition-colors"
                >
                    +41 22 910 45 50
                </a>
            )
        },
        {
            icon: Mail,
            title: t("email"),
            content: (
                <a
                    href="mailto:contact@fattoushgeneve.ch"
                    className="hover:text-primary transition-colors"
                >
                    contact@fattoushgeneve.ch
                </a>
            )
        },
        {
            icon: Clock,
            title: t("hours"),
            content: (
                <>
                    Lun - Sam: 12h00 - 14h30 / 19h00 - 21h30<br />
                    Dim: Fermé
                </>
            )
        }
    ];

    return (
        <main className="pt-4 md:pt-8 pb-4 md:pb-8 bg-secondary/30">
            <Section className="text-center space-y-0.5 mb-2 py-0">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
                </FadeIn>
            </Section>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="grid gap-3 content-start">
                        {contactInfo.map((info, idx) => (
                            <FadeIn key={idx} delay={0.1 * (idx + 1)} direction="right">
                                <div className="bg-white px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-sm flex items-center gap-4 border border-border/50 hover:shadow-md transition-shadow h-full">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                                        <info.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-0.5 text-foreground">{info.title}</h3>
                                        <div className="text-muted-foreground leading-snug text-base">
                                            {info.content}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Map */}
                    <FadeIn delay={0.5} direction="left" className="h-[500px] lg:h-auto lg:min-h-[500px] sticky top-24 lg:self-stretch">
                        <div className="h-full rounded-xl overflow-hidden shadow-lg bg-white border border-border/50 relative">
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
            </div>
        </main>
    );
}
