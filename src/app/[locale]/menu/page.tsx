import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";

type MenuCategory = "cold_mezze" | "hot_mezze" | "grill" | "dessert";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Menu' });

    return {
        title: `Fattoush - ${t('title')}`,
        description: t('subtitle')
    };
}

export default function MenuPage() {
    const t = useTranslations("Menu");

    const menuStructure: Record<MenuCategory, string[]> = {
        cold_mezze: ["hummus", "moutabal", "tabbouleh", "fattoush"],
        hot_mezze: ["falafel", "kibbeh"],
        grill: ["shish_taouk", "kafta", "mixed_grill"],
        dessert: ["baklava", "knefeh"]
    };

    return (
        <main className="pt-24 min-h-screen bg-secondary/30">
            <Section className="text-center space-y-4">
                <FadeIn>
                    <h1 className="text-5xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
                    <Button variant="outline" className="mt-6 border-primary text-primary hover:bg-primary hover:text-white">
                        {t("download")}
                    </Button>
                </FadeIn>
            </Section>

            <div className="container mx-auto px-4 pb-24 space-y-16">
                {(Object.entries(menuStructure) as [MenuCategory, string[]][]).map(([category, items], sectionIndex) => (
                    <FadeIn key={category} delay={sectionIndex * 0.1}>
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-primary border-b border-primary/20 pb-4">
                                {t(`sections.${category}`)}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {items.map((item, itemIndex) => (
                                    <div key={item} className="flex justify-between items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-semibold">{t(`items.${item}.name`)}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{t(`items.${item}.desc`)}</p>
                                        </div>
                                        <span className="font-bold text-primary text-lg whitespace-nowrap ml-6">{t(`items.${item}.price`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </main>
    );
}
