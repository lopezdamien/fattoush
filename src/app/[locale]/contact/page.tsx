import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
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

    return (
        <main className="pt-24 min-h-screen bg-secondary/30">
            <Section className="text-center space-y-4">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
                </FadeIn>
            </Section>

            <div className="container mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info & Form */}
                <div className="space-y-12">
                    <FadeIn delay={0.2} direction="right">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <MapPin />
                                    <h3 className="font-bold text-lg">{t("address_title")}</h3>
                                </div>
                                <p className="pl-9 text-muted-foreground">
                                    Rue des Gares 7-9<br />
                                    1201 Genève
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Phone />
                                    <h3 className="font-bold text-lg">{t("phone_title")}</h3>
                                </div>
                                <p className="pl-9 text-muted-foreground">
                                    +41 22 910 45 50
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Mail />
                                    <h3 className="font-bold text-lg">{t("email_title")}</h3>
                                </div>
                                <p className="pl-9 text-muted-foreground">
                                    contact@fattoushgeneve.ch
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Clock />
                                    <h3 className="font-bold text-lg">{t("hours_title")}</h3>
                                </div>
                                <p className="pl-9 text-muted-foreground">
                                    Lun - Sam: 11h - 23h<br />
                                    Dim: Fermé
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.4} direction="up">
                        <div className="bg-white p-8 rounded-xl shadow-sm space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">{t("form.name")}</label>
                                    <Input id="name" placeholder={t("form.name")} />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">{t("form.email")}</label>
                                    <Input id="email" type="email" placeholder={t("form.email")} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">{t("form.message")}</label>
                                <Textarea id="message" placeholder={t("form.message")} rows={4} />
                            </div>
                            <Button className="w-full md:w-auto">{t("form.send")}</Button>
                        </div>
                    </FadeIn>
                </div>

                {/* Map */}
                <FadeIn delay={0.6} direction="left">
                    <div className="h-[400px] lg:h-auto min-h-[400px] rounded-xl overflow-hidden shadow-md bg-white">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.8842426868625!2d6.139158676839352!3d46.21557987109594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c65266e7401d1%3A0x629576442651475c!2sRue%20des%20Gares%207%2C%201201%20Gen%C3%A8ve%2C%20Switzerland!5e0!3m2!1sen!2s!4v1707412345678!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
