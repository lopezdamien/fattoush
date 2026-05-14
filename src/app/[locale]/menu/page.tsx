import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";
import platDuJour from "../../../../data/plat-du-jour.json";

type MenuCategory = "breakfast" | "cold_mezze" | "hot_mezze" | "mezze_menus" | "main_dishes" | "grill" | "sandwich_menus" | "kids_menus" | "desserts";

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
            "ouzi_agneau",
            "arayes_family",
            "mixed_mezze_plate",
            "vege_plate"
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
            "meat_sandwich_menu",
            "chicken_sandwich_menu"
        ],
        kids_menus: [
            "kids_menu"
        ],
        desserts: [
            "baklava",
            "basboussa",
            "mouhalabieh",
            "layali_lubnan",
            "gourmet_coffee",
            "dessert_du_moment"
        ],
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
        "desserts"
    ];

    return (
        <main className="pt-20 md:pt-24 min-h-screen bg-secondary/30">
            <div className="container mx-auto px-4 text-center space-y-2 pb-6">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground mt-2">{t("subtitle")}</p>
                </FadeIn>
            </div>

            {/* Plat du Jour */}
            <div className="container mx-auto px-4 mb-8">
                <FadeIn delay={0.1}>
                    <div className="relative overflow-hidden rounded-xl shadow-sm text-center bg-white border border-border/50">

                        {/* Filigrane */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none font-serif text-[200px] md:text-[260px] leading-none text-primary opacity-[0.03] translate-x-1/4">
                            ع
                        </div>

                        {/* En-tête date */}
                        <div className="relative z-10 px-6 py-4" style={{ background: "#C9788A" }}>
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/70 mb-1">
                                Plat du jour
                            </p>
                            <p className="text-lg md:text-xl font-bold text-white tracking-wide">
                                {platDuJour.date}
                            </p>
                        </div>

                        {/* Plats */}
                        <div className="relative z-10 flex flex-wrap justify-center w-full max-w-4xl mx-auto px-4 py-6" style={{ background: "#FDF6F0" }}>
                            {platDuJour.plats.map((plat, i) => (
                                <>
                                    <div key={i} className="flex flex-col items-center space-y-2 px-8 py-3 flex-1 min-w-[220px]">
                                        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide" style={{ color: "#A0455A" }}>
                                            {plat.name}
                                        </h2>
                                        <p className="text-sm md:text-base whitespace-pre-line leading-relaxed" style={{ color: "#7A6A64" }}>
                                            {plat.description}
                                        </p>
                                    </div>
                                    <div className="w-px self-stretch hidden md:block" style={{ background: "#E8D5CC" }} />
                                    <div className="w-3/4 h-px md:hidden my-3 mx-auto" style={{ background: "#E8D5CC" }} />
                                </>
                            ))}

                            <div className="flex flex-col items-center space-y-2 px-8 py-3 flex-1 min-w-[220px]">
                                <h2 className="text-xl md:text-2xl font-bold tracking-wide" style={{ color: "#5E8C6A" }}>
                                    Option Végétarienne
                                </h2>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: "#7A6A64" }}>
                                    Adaptation du plat du jour sur demande
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

            <div className="container mx-auto px-4 pb-12 space-y-8">
                {(categories).map((category, sectionIndex) => (
                    <FadeIn key={category} delay={sectionIndex * 0.1}>
                        <div id={category} className="space-y-4 scroll-mt-24">
                            <div className="border-b border-primary/20 pb-2">
                                <h2 className="text-2xl font-bold text-primary">
                                    {t(`categories.${category}`)}
                                </h2>
                                {t.has(`categories.${category}_subtitle`) && (
                                    <p className="text-sm text-muted-foreground italic mt-0.5">
                                        {t(`categories.${category}_subtitle`)}
                                    </p>
                                )}
                            </div>
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
