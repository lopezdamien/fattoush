import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

type MenuCategory = "breakfast" | "cold_mezze" | "hot_mezze" | "mezze_menus" | "main_dishes" | "grill" | "sandwich_menus" | "kids_menus" | "desserts" | "drinks";

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
        breakfast: ["manouche_cheese", "manouche_zaatar", "lahm_bi_ajeen"],
        cold_mezze: [
            "foul", "shanklish", "labneh", "vine_leaves_veg",
            "hummus", "moutabal", "vine_leaves_meat_piece",
            "tabbouleh", "muhammara", "moussaka", "baba_ganouj",
            "fattoush", "beetroot_hummus", "mixed_salad"
        ],
        hot_mezze: [
            "batata_harra", "kebbeh_piece", "lentil_soup",
            "falafel_piece", "fatayer_piece", "rikakat_piece",
            "halloumi", "fries", "sfiha", "chicken_wings",
            "makanek", "spicy_sausages", "meat_hummus"
        ],
        mezze_menus: ["cold_mezze_small_2", "cold_mezze_large_4", "hot_mezze_large_4"],
        main_dishes: [
            "kabsa_chicken", "kebbeh_bil_laban", "kabsa_meat",
            "vine_leaves_main", "arayes"
        ],
        grill: [
            "lamb_plate", "chicken_plate", "kafta_plate",
            "lamb_chicken_plate", "arayes_family",
            "family_grilled_chicken", "half_grilled_chicken",
            "mixed_grill_skewers", "mixed_mezze_plate",
            "mixed_grill_family"
        ],
        sandwich_menus: [
            "falafel_sandwich_menu", "meat_sandwich_menu",
            "chicken_sandwich_menu", "vege_plate"
        ],
        kids_menus: ["kids_menu"],
        desserts: [
            "knafeh", "baklava", "basboussa",
            "katayef_walnut", "mouhalabieh",
            "katayef_kashta", "gourmet_coffee"
        ],
        drinks: [
            "coffee_tea", "black_tea", "ayran",
            "mint_tea", "soft_drinks", "wine_glass"
        ]
    };

    const categories: MenuCategory[] = [
        "breakfast", "cold_mezze", "hot_mezze", "mezze_menus",
        "main_dishes", "grill", "sandwich_menus", "kids_menus",
        "desserts", "drinks"
    ];

    return (
        <main className="pt-24 min-h-screen bg-secondary/30">
            <Section className="text-center space-y-4">
                <FadeIn>
                    <h1 className="text-5xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
                </FadeIn>
            </Section>

            <div className="container mx-auto px-4 pb-24 space-y-16">
                {(categories).map((category, sectionIndex) => (
                    <FadeIn key={category} delay={sectionIndex * 0.1}>
                        <div id={category} className="space-y-8 scroll-mt-32">
                            <h2 className="text-3xl font-bold text-primary border-b border-primary/20 pb-4">
                                {t(`categories.${category}`)}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {menuStructure[category].map((item: string) => (
                                    <div key={item} className="flex justify-between items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{t(`items.${item}.name`)}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{t(`items.${item}.desc`)}</p>
                                        </div>
                                        <div className="shrink-0 ml-6">
                                            <span className="font-bold text-primary text-lg whitespace-nowrap">{t(`items.${item}.price`)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>

            {/* Footer Disclaimer */}
            <div className="container mx-auto px-4 mt-8 pb-12 text-center text-muted-foreground text-sm space-y-2">
                <p>{t("footer.taxes")}</p>
                <p>{t("footer.allergens")}</p>
            </div>
        </main>
    );
}
