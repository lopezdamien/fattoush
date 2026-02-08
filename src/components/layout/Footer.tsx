import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations("Navigation");

    return (
        <footer className="bg-primary text-secondary py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">FATTOUSH</h3>
                    <p className="text-sm opacity-80">
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

                <div className="space-y-4">
                    <h4 className="font-semibold">{t("menu")}</h4>
                    {/* Social icons placeholder */}
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-secondary/20 text-center text-sm opacity-60">
                © {new Date().getFullYear()} FATTOUSH. All rights reserved.
            </div>
        </footer>
    );
}
