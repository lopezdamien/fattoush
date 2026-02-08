import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

type MenuCategory = "breakfast" | "cold_mezze" | "hot_mezze" | "mezze_menus" | "main_dishes" | "grill" | "sandwiches" | "dessert" | "drinks";

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

    // Definition of the menu structure with items for each category
    const menuStructure: Record<MenuCategory, string[]> = {
        breakfast: ["labneh", "foul", "fatayer", "rakakat"],
        cold_mezze: ["hummus", "moutabal", "tabbouleh", "fattoush", "warak_enab", "labneh"],
        hot_mezze: ["falafel", "kibbeh", "rakakat", "fatayer", "foul"],
        mezze_menus: ["menu_decouverte", "menu_royal"],
        main_dishes: ["shawarma_plate"],
        grill: ["shish_taouk", "kafta", "mixed_grill"],
        sandwiches: ["taouk_sandwich", "falafel_sandwich"],
        dessert: ["baklava", "knefeh", "mouhalabieh"],
        drinks: ["ayran", "lemonade", "arak"]
    };

    const categories: MenuCategory[] = [
        "breakfast", "cold_mezze", "hot_mezze", "mezze_menus",
        "main_dishes", "grill", "sandwiches", "dessert", "drinks"
    ];

    return (
        <main className="min-h-screen bg-secondary/30 pb-24">
            {/* Hero Menu */}
            <div className="pt-32 pb-16 text-center bg-secondary">
                <FadeIn>
                    <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 font-serif">{t("title")}</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto px-4">
                        {t("subtitle")}
                    </p>
                </FadeIn>
            </div>

            {/* Sticky Navigation */}
            <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-y border-border shadow-sm mb-12 overflow-x-auto no-scrollbar">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-2 md:gap-8 py-4 min-w-max">
                        {categories.map((cat) => (
                            <a
                                key={cat}
                                href={`#${cat}`}
                                className="text-sm md:text-base font-medium text-muted-foreground hover:text-primary whitespace-nowrap px-3 py-1 rounded-full hover:bg-secondary transition-all"
                            >
                                {t(`categories.${cat}`)}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Menu Content */}
            <div className="container mx-auto px-4 max-w-4xl space-y-24">
                {categories.map((category, index) => (
                    <section key={category} id={category} className="scroll-mt-32">
                        <FadeIn delay={index * 0.1}>
                            <h2 className="text-3xl font-bold text-primary border-b-2 border-primary/10 pb-4 mb-8 sticky top-32 bg-secondary/30 backdrop-blur-sm z-10 w-full">
                                {t(`categories.${category}`)}
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {menuStructure[category].map((item) => (
                                    <div key={item} className="group flex justify-between items-baseline gap-4 md:gap-8 p-4 rounded-lg hover:bg-white transition-colors">
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-baseline justify-between w-full md:w-auto">
                                                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {t(`items.${item}.name`)}
                                                </h3>
                                                {/* Price visible on mobile right next to title if needed, but keeping it unified below */}
                                            </div>
                                            <p className="text-muted-foreground text-sm md:text-base font-light italic leading-relaxed">
                                                {t(`items.${item}.desc`)}
                                            </p>
                                        </div>
                                        <div className="shrink-0">
                                            <span className="text-lg font-bold text-primary tabular-nums">
                                                {t(`items.${item}.price`)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </section>
                ))}
            </div>

            {/* Footer Disclaimer */}
            <div className="container mx-auto px-4 mt-24 text-center text-muted-foreground text-sm space-y-2">
                <p>{t("footer.taxes")}</p>
                <p>{t("footer.allergens")}</p>
            </div>
        </main>
    );
}
