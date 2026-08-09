import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";
import { Clock, Phone } from "lucide-react";
import Image from "next/image";
import { PhotoGallery } from "@/components/ui/PhotoGallery";

const pizzaGalleryImages = [
    { src: "/images/pizza1.jpg", alt: "Pizza Fattoush" },
    { src: "/images/pizza2.jpg", alt: "Pizza Fattoush" },
    { src: "/images/pizza4.jpg", alt: "Pizza libanaise Fattoush" },
];

const sandwichGalleryImages = [
    { src: "/images/sandwich1.jpg", alt: "Sandwich Snack by Fattoush" },
    { src: "/images/sandwich2.jpg", alt: "Sandwich Snack by Fattoush" },
    { src: "/images/sandwich3.jpg", alt: "Sandwich Snack by Fattoush" },
];

const UBER_EATS_URL =
    "https://www.ubereats.com/ch-fr/store/snack-by-fattoush/JH6lbvgUTaeaj67U-sk5qA?pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMlJ1ZSUyMENhcm9saW5lJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyRWlkU2RXVWdRMkZ5YjJ4cGJtVXNJREV5TWpjZ1EyRnliM1ZuWlN3Z1UzZHBkSHBsY214aGJtUWlMaW9zQ2hRS0VnbXYwZV9RMTNxTVJ4RWU3NEdlVFNnQmVoSVVDaElKU181WENkNTZqRWNSMEhNWlFJal9BQVElMjIlMkMlMjJyZWZlcmVuY2VUeXBlJTIyJTNBJTIyZ29vZ2xlX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBNDYuMTg4MTQwOCUyQyUyMmxvbmdpdHVkZSUyMiUzQTYuMTM4MzIyMiU3RA%3D%3D";

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
    "jambon",
    "al_funghi",
    "napoletana",
    "parma",
    "vegetarienne",
    "capricciosa",
    "calabraise",
    "quatre_fromages",
    "sicilienne",
    "calzone",
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
        <main className="min-h-screen bg-secondary/30">
            {/* Hero Section */}
            <section className="relative h-[32vh] md:h-[42vh] w-full flex items-center justify-center text-center text-white">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/snack-hero.jpg"
                        alt="Snack by Fattoush"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        style={{ objectPosition: "62% 70%" }}
                        priority
                    />
                    <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <FadeIn direction="up">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase drop-shadow-md">
                            {t("title")}
                        </h1>
                    </FadeIn>
                </div>
            </section>

            <div className="container mx-auto px-4 pt-10 pb-10 max-w-4xl">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {/* Horaires */}
                    <FadeIn delay={0.1} direction="up" className="flex-1">
                        <div className="h-full bg-white px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-sm flex items-start gap-4 border border-border/50 hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0 mt-0.5">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1 text-foreground">{t("hours.title")}</h3>
                                <div className="text-muted-foreground text-sm md:text-base space-y-0.5">
                                    <p>
                                        {t("hours.monday")} : <span className="font-semibold text-primary">{t("hours.closed")}</span>
                                    </p>
                                    <p>{t("hours.tuesday_sunday")} : 11h30 – 14h30 / 18h30 – 22h00</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Commande par téléphone */}
                    <FadeIn delay={0.15} direction="up" className="flex-1">
                        <a
                            href="tel:+41229104550"
                            className="h-full bg-white px-5 py-4 md:px-6 md:py-5 rounded-xl shadow-sm flex items-start gap-4 border border-border/50 hover:shadow-md transition-shadow"
                        >
                            <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0 mt-0.5">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1 text-foreground">{t("phone.title")}</h3>
                                <p className="text-muted-foreground text-sm md:text-base mb-1">{t("phone.subtitle")}</p>
                                <span className="font-semibold text-primary text-sm md:text-base">+41 22 910 45 50</span>
                            </div>
                        </a>
                    </FadeIn>

                    {/* Uber Eats */}
                    <FadeIn delay={0.2} direction="up">
                        <a
                            href={UBER_EATS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t("ubereats.cta")}
                            className="group block relative w-28 h-28 mx-auto sm:mx-0 rounded-[1.25rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                        >
                            <Image src="/images/ubereats.png" alt={t("ubereats.cta")} fill sizes="112px" className="object-cover" />
                        </a>
                    </FadeIn>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-12">
                <FadeIn delay={0.1}>
                    <div id="pizzas" className="space-y-4 scroll-mt-24">
                        <PhotoGallery images={pizzaGalleryImages} />
                        <h2 className="text-2xl font-bold text-primary border-b border-primary/20 pb-2">
                            {t("pizzas.category")}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pizzaItems.map((item) => (
                                <div key={item} className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group h-full">
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

            <div className="container mx-auto px-4 pb-12">
                <FadeIn delay={0.2}>
                    <div id="sandwichs" className="space-y-4 scroll-mt-24">
                        <PhotoGallery images={sandwichGalleryImages} />
                        <h2 className="text-2xl font-bold text-primary border-b border-primary/20 pb-2">
                            {t("category")}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {snackItems.map((item) => (
                                <div key={item} className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group h-full">
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

            <div className="container mx-auto px-4 mt-8 pb-12 text-center text-muted-foreground text-sm space-y-2">
                <p>{t("footer.taxes")}</p>
                <p>{t("footer.allergens")}</p>
            </div>
        </main>
    );
}
