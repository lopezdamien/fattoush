import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";

const snackItems = [
    "falafel",
    "tawouk",
    "chawarma_poulet",
    "chawarma_agneau",
    "kafta",
    "mix_frit",
    "makanek",
];

const pizzaItems = [
    "margherita",
    "sicilienne",
    "napolitaine",
    "quatre_saisons",
    "quatre_fromages",
    "calzone",
    "champignon",
    "vegetarienne",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Snack" });
    return {
        title: `Fattoush - ${t("title")}`,
        description: t("subtitle"),
    };
}

export default function SnackPage() {
    const t = useTranslations("Snack");

    return (
        <main className="pt-20 md:pt-24 min-h-screen bg-secondary/30">
            <div className="container mx-auto px-4 text-center space-y-2 pb-6">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground mt-2">{t("subtitle")}</p>
                </FadeIn>
            </div>

            <div className="container mx-auto px-4 pb-12">
                <FadeIn delay={0.1}>
                    <div id="sandwichs" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-primary border-b border-primary/20 pb-2">
                            {t("category")}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {snackItems.map((item) => (
                                <div
                                    key={item}
                                    className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group h-full"
                                >
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors leading-tight">
                                                {t(`items.${item}.name`)}
                                            </h3>
                                            <span className="font-bold text-primary whitespace-nowrap">
                                                {t(`items.${item}.price`)}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-snug">
                                            {t(`items.${item}.desc`)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>

            <div className="container mx-auto px-4 pb-12">
                <FadeIn delay={0.2}>
                    <div id="pizzas" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-primary border-b border-primary/20 pb-2">
                            {t("pizzas.category")}
                        </h2>

                        <div className="relative bg-[#2E593F] text-white rounded-xl p-5 md:p-6 text-center shadow-lg border-2 border-[#2E593F]/30 overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                            <p className="relative text-lg md:text-xl font-extrabold tracking-wide drop-shadow-sm mb-2">
                                {t("pizzas.coming_soon")}
                            </p>
                            <p className="relative text-base md:text-lg font-semibold tracking-wide drop-shadow-sm">
                                {t("pizzas.promo")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pizzaItems.map((item) => (
                                <div
                                    key={item}
                                    className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group h-full"
                                >
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors leading-tight">
                                                {t(`pizzas.items.${item}.name`)}
                                            </h3>
                                            <span className="font-bold text-primary whitespace-nowrap">
                                                {t(`pizzas.items.${item}.price`)}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-snug">
                                            {t(`pizzas.items.${item}.desc`)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>

            <div className="container mx-auto px-4 mt-8 pb-12 text-center text-muted-foreground text-sm space-y-2">
                <p>{t("footer.taxes")}</p>
                <p>{t("footer.allergens")}</p>
            </div>
        </main>
    );
}
