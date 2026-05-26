import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";
import platDuJour from "../../../../data/plat-du-jour.json";

export const dynamic = "force-dynamic";

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

    // Dynamic selection of daily special based on Swiss time
    const now = new Date();
    const genevaHour = parseInt(
        new Intl.DateTimeFormat('fr-CH', { hour: 'numeric', hour12: false, timeZone: 'Europe/Zurich' }).format(now),
        10
    );
    const genevaDay = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Europe/Zurich' }).format(now);

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayIndex = weekdays.indexOf(genevaDay);

    // Switch to tomorrow's plat du jour after 14:00 (2 PM)
    if (genevaHour >= 14) {
        dayIndex = (dayIndex + 1) % 7;
    }

    const dayKeys = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const targetDayKey = dayKeys[dayIndex] as keyof typeof platDuJour.menu;
    const activePlat = platDuJour.menu && platDuJour.menu[targetDayKey] ? platDuJour.menu[targetDayKey] : null;
    const hasPlat = activePlat && activePlat.name && activePlat.description;

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
                    <p className="text-sm font-semibold text-primary/70 italic mt-1">{t("homemade_bread")}</p>
                </FadeIn>
            </div>

            {/* Plat du Jour */}
            {hasPlat && (
                <div className="container mx-auto px-4 mb-8">
                    <FadeIn delay={0.1}>
                        <div className="flex justify-center">
                            <div className="relative overflow-hidden rounded-2xl shadow-sm w-full max-w-xl text-center px-8 py-8" style={{ background: "linear-gradient(135deg, #FDE8E4 0%, #FDF3E3 50%, #E8F4EC 100%)" }}>

                                {/* Filigrane */}
                                <div className="absolute right-0 bottom-0 pointer-events-none select-none font-serif text-[140px] leading-none opacity-[0.06] translate-x-6 translate-y-4" style={{ color: "#A0455A" }}>
                                    ع
                                </div>

                                {/* Label */}
                                <p className="text-base font-bold tracking-[0.2em] uppercase mb-1" style={{ color: "#B06070" }}>
                                    Plat du jour
                                </p>

                                {/* Date */}
                                <p className="text-lg font-semibold tracking-wide mb-5" style={{ color: "#9A8880" }}>
                                    {activePlat.dateLabel}
                                </p>

                                {/* Plat */}
                                <div className="relative z-10 space-y-2">
                                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide" style={{ color: "#2C2420" }}>
                                        {activePlat.name}
                                    </h2>
                                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ color: "#4A3F3A" }}>
                                        {activePlat.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            )}

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
