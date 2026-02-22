import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardTitle, CardHeader } from "@/components/ui/Card";
import Image from "next/image";
import { Leaf, ScrollText, Users } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('title') + " - " + t('subtitle'),
    description: t('spirit.description')
  };
}

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Fattoush Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 space-y-6">
          <FadeIn direction="up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-md">
              {t("title")}
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto drop-shadow-sm">
              {t("subtitle")}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/menu">
                <Button size="lg" className="text-lg px-8 py-6 h-auto shadow-lg hover:scale-105 transition-transform bg-primary text-white border-2 border-primary hover:bg-primary/90">
                  {t("cta")}
                </Button>
              </Link>
              <a href="https://widget.thefork.com/5461ec0f-3804-499f-8328-955b4654321f" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto shadow-lg hover:scale-105 transition-transform bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary">
                  {t("book")}
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Spirit Section */}
      <Section className="bg-background text-center space-y-12">
        <FadeIn>
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold text-primary">{t("spirit.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("spirit.description")}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-secondary/50 transition-colors">
              <div className="p-4 bg-secondary rounded-full text-primary">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-semibold">{t("spirit.fresh")}</h3>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-secondary/50 transition-colors">
              <div className="p-4 bg-secondary rounded-full text-primary">
                <ScrollText size={32} />
              </div>
              <h3 className="text-xl font-semibold">{t("spirit.tradition")}</h3>
            </div>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-secondary/50 transition-colors">
              <div className="p-4 bg-secondary rounded-full text-primary">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold">{t("spirit.sharing")}</h3>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Specialties Section */}
      <Section className="bg-secondary/30">
        <FadeIn>
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-bold text-primary">{t("specialties.title")}</h2>
            <p className="text-muted-foreground">{t("specialties.description")}</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0.2}>
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 w-full">
                <Image src="/images/mezze.png" alt="Mezze" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <CardHeader>
                <CardTitle>{t("specialties.mezze")}</CardTitle>
              </CardHeader>
            </Card>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 w-full">
                <Image src="/images/grill.png" alt="Grill" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <CardHeader>
                <CardTitle>{t("specialties.grill")}</CardTitle>
              </CardHeader>
            </Card>
          </FadeIn>

          <FadeIn delay={0.6}>
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 w-full">
                <Image src="/images/vegetarian.png" alt="Vegetarian" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <CardHeader>
                <CardTitle>{t("specialties.vege")}</CardTitle>
              </CardHeader>
            </Card>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.8} className="mt-12 text-center">
          <Link href="/menu">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              {t("specialties.menu_btn")}
            </Button>
          </Link>
        </FadeIn>
      </Section>

      {/* Reservation CTA */}
      <section className="bg-primary text-secondary py-24 text-center">
        <div className="container mx-auto px-4 space-y-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("reservation.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="https://widget.thefork.com/5461ec0f-3804-499f-8328-955b4654321f" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold">
                {t("reservation.btn")}
              </Button>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* SEO Local Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Restaurant libanais à Genève – Rue des Gares
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Fattoush est un restaurant libanais situé à la Rue des Gares 7-9, à Genève, à proximité immédiate de la Gare Cornavin. Que ce soit pour un déjeuner convivial, un dîner entre amis ou une découverte des saveurs du Levant, notre équipe vous accueille dans un cadre chaleureux au cœur du quartier des Grottes.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
