import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Heart, Star, ChefHat, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });

    return {
        title: `Fattoush - ${t('title')}`,
        description: t('history').substring(0, 160) + '...'
    };
}

export default function AboutPage() {
    const t = useTranslations("About");

    const philosophyItems = [
        { key: "homemade", icon: ChefHat },
        { key: "quality", icon: Star },
        { key: "warmth", icon: Heart },
        { key: "sharing", icon: Users },
    ];

    return (
        <main className="pt-16 min-h-screen">
            {/* History Section */}
            <Section className="bg-background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <FadeIn direction="right">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold text-primary">
                                {t("title")}
                            </h1>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {t("history")}
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2}>
                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/about.png"
                                alt="Fattoush Restaurant Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </FadeIn>
                </div>
            </Section>

            {/* Philosophy Section */}
            <Section className="bg-secondary/30">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">{t("philosophy_title")}</h2>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {philosophyItems.map(({ key, icon: Icon }, index) => (
                        <FadeIn key={key} delay={0.2 + index * 0.1}>
                            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm hover:shadow-md transition-all hover:-translate-y-1">
                                <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                                    <div className="p-4 bg-secondary rounded-full text-primary">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-center">{t(`philosophy.${key}`)}</h3>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </Section>
        </main>
    );
}
