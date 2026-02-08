import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";

const galleryImages = [
    { src: "/images/hero.png", alt: "Fattoush Interior & Atmosphere", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/mezze.png", alt: "Fresh Mezze Selection", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/gallery_detail.png", alt: "Culinary Details", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/grill.png", alt: "Authentic Grills", span: "md:col-span-1 md:row-span-2" },
    { src: "/images/about.png", alt: "Restaurant Ambiance", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/vegetarian.png", alt: "Vegetarian Delights", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/gallery_ambiance.png", alt: "Evening Mood", span: "md:col-span-2 md:row-span-1" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Gallery' });

    return {
        title: `Fattoush - ${t('title')}`,
        description: t('subtitle')
    };
}

export default function GalleryPage() {
    const t = useTranslations("Gallery");

    return (
        <main className="pt-24 min-h-screen">
            <Section className="text-center space-y-4">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
                </FadeIn>
            </Section>

            <section className="container mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4">
                    {galleryImages.map((image, index) => (
                        <FadeIn
                            key={index}
                            className={`relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group ${image.span} opacity-0`}
                            delay={index * 0.1}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </main>
    );
}
