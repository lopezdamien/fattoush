import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";
import { Leaf } from "lucide-react";

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
        breakfast: [
            "manouche_cheese",
            "manouche_zaatar",
            "shanklish",
            "lahm_bi_ajeen",
            "foul"
        ],
        cold_mezze: [
            "labneh",
            "hummus",
            "vine_leaves_veg",
            "vine_leaves_meat_piece",
            "moutabal",
            "tabbouleh",
            "muhammara",
            "moussaka",
            "baba_ganouj",
            "fattoush",
            "beetroot_hummus",
            "mixed_salad"
        ],
        hot_mezze: [
            "batata_harra",
            "lentil_soup",
            "kebbeh_piece",
            "falafel_piece",
            "fatayer_piece",
            "rikakat_piece",
            "halloumi",
            "fries",
            "sfiha",
            "chicken_wings",
            "makanek",
            "spicy_sausages",
            "meat_hummus"
        ],
        mezze_menus: [
            "cold_mezze_small_2",
            "cold_mezze_large_4",
            "hot_mezze_large_4"
        ],
        main_dishes: [
            "kabsa_chicken",
            "kabsa_meat",
            "kebbeh_bil_laban",
            "vine_leaves_main",
            "arayes",
            "arayes_family",
            "mixed_mezze_plate"
        ],
        grill: [
            "lamb_plate",
            "kafta_plate",
            "chicken_plate",
            "lamb_chicken_plate",
            "family_grilled_chicken",
            "half_grilled_chicken",
            "mixed_grill_skewers",
            "mixed_grill_family"
        ],
        sandwich_menus: [
            "falafel_sandwich_menu",
            "chicken_sandwich_menu",
            "meat_sandwich_menu",
            "vege_plate"
        ],
        kids_menus: [
            "kids_menu"
        ],
        desserts: [
            "knafeh",
            "basboussa",
            "baklava",
            "mouhalabieh",
            "katayef_walnut",
            "katayef_kashta"
        ],
        drinks: [
            "coffee_tea",
            "black_tea",
            "gourmet_coffee",
            "mint_tea",
            "soft_drinks",
            "wine_glass",
            "ayran"
        ]
    };

    const categories: MenuCategory[] = [
        "breakfast",
        "cold_mezze",
        "hot_mezze",
        "mezze_menus",
        "main_dishes",
        "grill",
        "sandwich_menus",
        "kids_menus",
        "desserts",
        "drinks"
    ];

    return (
        <main className="pt-20 md:pt-24 min-h-screen bg-secondary/30">
            <div className="container mx-auto px-4 text-center space-y-2 pb-6">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground mt-2">{t("subtitle")}</p>
                </FadeIn>
            </div>

            {/* Plats de la semaine */}
            <div className="container mx-auto px-4 mb-10">
                <FadeIn delay={0.1}>
                    <div className="relative overflow-hidden bg-[#F6F4F0] rounded-2xl border border-primary/10 p-6 md:p-10 shadow-sm">
                        <div className="absolute right-0 top-0 text-primary opacity-5 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
                            <Leaf size={300} />
                        </div>

                        {/* Header */}
                        <div className="relative z-10 text-center mb-8">
                            <span className="text-xs font-bold tracking-[0.25em] text-primary uppercase">
                                Semaine du 21 au 25 avril
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                                Plats de la semaine
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">CHF 22.– · Servi avec salade fraîche</p>
                        </div>

                        {/* Days grid */}
                        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {[
                                {
                                    day: "Lundi",
                                    date: "21 avr.",
                                    name: "Courgettes farcies",
                                    desc: "Sauce au yaourt & riz",
                                },
                                {
                                    day: "Mardi",
                                    date: "22 avr.",
                                    name: "Cuisse d'agneau grillée",
                                    desc: "Sauce marinée & purée de pommes de terre",
                                },
                                {
                                    day: "Mercredi",
                                    date: "23 avr.",
                                    name: "Ouzi",
                                    desc: "Riz à la viande, petits pois & noix",
                                },
                                {
                                    day: "Jeudi",
                                    date: "24 avr.",
                                    name: "Mloukhié au poulet",
                                    desc: "Riz aux vermicelles",
                                },
                                {
                                    day: "Vendredi",
                                    date: "25 avr.",
                                    name: "Sayadieh de dorade",
                                    desc: "Riz épicé & sauce",
                                },
                            ].map((item) => (
                                <div
                                    key={item.day}
                                    className="bg-white rounded-xl p-4 flex flex-col gap-2 shadow-sm border border-primary/5 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-0">
                                        <span className="text-xs font-bold tracking-widest text-primary uppercase">{item.day}</span>
                                        <span className="text-xs text-muted-foreground lg:mb-2">{item.date}</span>
                                    </div>
                                    <div className="h-px bg-primary/10 hidden lg:block" />
                                    <p className="font-bold text-foreground text-sm md:text-base leading-tight mt-1">{item.name}</p>
                                    <p className="text-xs text-muted-foreground leading-snug flex-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Footer note */}
                        <div className="relative z-10 mt-6 text-center">
                            <p className="text-xs text-muted-foreground">
                                Option végétarienne disponible sur demande · CHF 19.90.–
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>

            <div className="container mx-auto px-4 pb-12 space-y-8">
                {(categories).map((category, sectionIndex) => (
                    <FadeIn key={category} delay={sectionIndex * 0.1}>
                        <div id={category} className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-primary border-b border-primary/20 pb-2">
                                {t(`categories.${category}`)}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {menuStructure[category].map((item: string) => (
                                    <div key={item} className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group h-full">
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors leading-tight">{t(`items.${item}.name`)}</h3>
                                                <span className="font-bold text-primary whitespace-nowrap">{t(`items.${item}.price`)}</span>
                                            </div>
                                            <p className="text-muted-foreground text-sm leading-snug">{t(`items.${item}.desc`)}</p>
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
