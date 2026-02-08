import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
    const t = useTranslations("Navigation");

    return (
        <footer className="bg-secondary/30 text-foreground pt-16 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="space-y-4">
                    <div className="relative h-24 w-24 mb-4">
                        <Image src="/images/logo.png" alt="Fattoush Logo" fill className="object-contain" />
                    </div>
                    <h3 className="font-bold text-2xl text-primary">FATTOUSH</h3>
                    <p className="text-muted-foreground text-sm">
                        Cuisine libanaise authentique au cœur de Genève.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold">{t("contact")}</h4>
                    <ul className="space-y-2 text-sm opacity-80">
                        <li>Rue des Gares 7-9</li>
                        <li>1201 Genève</li>
                        <li>+41 22 910 45 50</li>
                        <li>contact@fattoushgeneve.ch</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold">Horaires</h4>
                    <ul className="space-y-2 text-sm opacity-80">
                        <li>Lun - Sam: 11h - 23h</li>
                        <li>Dimanche: Fermé</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-secondary/20 text-center text-sm opacity-60">
                © {new Date().getFullYear()} FATTOUSH. All rights reserved.
            </div>
        </footer>
    );
}
