import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";
import platDuJour from "../../../../data/plat-du-jour.json";
import { ChefHat } from "lucide-react";

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

    // Dynamic selection of daily special based on Swiss time to highlight today
    const now = new Date();
    const genevaDay = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Europe/Zurich' }).format(now);
    const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = weekdaysShort.indexOf(genevaDay);
    const dayKeys = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const currentDayOfWeekName = dayKeys[dayIndex];

    const weekdaysKeys = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"] as const;
    const hasWeeklyMenu = weekdaysKeys.some(dayKey => platDuJour.menu[dayKey] && platDuJour.menu[dayKey].name);

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

            {/* Plat du Jour (Weekly Schedule layout) */}
            {hasWeeklyMenu && (
                <div className="container mx-auto px-4 mb-12">
                    <FadeIn delay={0.1}>
                        <div 
                            className="relative overflow-hidden rounded-3xl shadow-sm w-full max-w-7xl mx-auto px-6 py-10 md:px-10 md:py-12" 
                            style={{ background: "linear-gradient(135deg, #FAF6F0 0%, #F5EFE6 50%, #EFE3D3 100%)" }}
                        >

                            {/* Filigrane */}
                            <div className="absolute right-0 bottom-0 pointer-events-none select-none font-serif text-[180px] leading-none opacity-[0.04] translate-x-12 translate-y-12" style={{ color: "#A0455A" }}>
                                ع
                            </div>

                            {/* Header */}
                            <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 space-y-3">
                                <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wide" style={{ color: "#2C2420" }}>
                                    Menus de la semaine
                                </h2>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: "#4A3F3A" }}>
                                    Découvrez nos spécialités maison préparées chaque jour par notre chef.
                                </p>
                                <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#B06070" }}>
                                    Tous les plats du jour sont accompagnés d’une salade fraîche.
                                </p>
                            </div>

                            {/* Cards Grid / Mobile Horizontal Slider */}
                            <div 
                                className="relative z-10 flex overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 gap-4 px-6 -mx-6 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-6 md:overflow-visible items-stretch"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {weekdaysKeys.map((dayKey) => {
                                    const m = platDuJour.menu[dayKey];
                                    const isToday = currentDayOfWeekName === dayKey;
                                    if (!m || !m.name) return null;

                                    const dayName = m.dateLabel ? m.dateLabel.split(" ")[0] : dayKey;

                                    return (
                                        <div
                                            key={dayKey}
                                            className={`relative flex flex-col justify-between p-6 rounded-2xl w-[280px] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none transition-all duration-300 ${
                                                isToday
                                                ? "bg-white border-2 shadow-md lg:scale-105 z-10 hover:-translate-y-2 hover:shadow-lg"
                                                : "bg-white/85 border border-black/5 shadow-sm hover:bg-white hover:-translate-y-2 hover:shadow-md"
                                            }`}
                                            style={{ borderColor: isToday ? "#3a6b47" : "transparent" }}
                                        >
                                            {isToday && (
                                                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#3a6b47] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
                                                    Aujourd'hui
                                                </span>
                                            )}

                                            <div className="flex flex-col h-full justify-between space-y-4">
                                                <div className="text-center pb-3 border-b border-black/5">
                                                    <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#B06070" }}>
                                                        {dayName}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-center text-center flex-grow py-4 justify-center">
                                                    <ChefHat size={18} className="mb-2.5 opacity-35" style={{ color: "#3a6b47" }} />
                                                    <h3 className="text-lg md:text-xl font-serif font-bold uppercase tracking-wide leading-snug px-1 min-h-[52px] flex items-center justify-center" style={{ color: "#2C2420" }}>
                                                        {m.name}
                                                    </h3>
                                                    <div className="h-0.5 w-6 my-3.5 bg-primary/20 rounded"></div>
                                                    <p className="text-xs md:text-sm leading-relaxed opacity-95 text-balance whitespace-pre-line" style={{ color: "#4A3F3A" }}>
                                                        {m.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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
