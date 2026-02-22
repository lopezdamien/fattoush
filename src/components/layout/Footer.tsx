import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
    const t = useTranslations("Navigation");

    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
                {/* Column 1: Contact */}
                <div className="space-y-4 flex flex-col items-center justify-center">
                    <h4 className="font-semibold text-xl">{t("contact")}</h4>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>Rue des Gares 7-9</li>
                        <li>1201 Genève</li>
                        <li>Suisse</li>
                        <li>+41 22 910 45 50</li>
                        <li>contact@fattoushgeneve.ch</li>
                    </ul>
                </div>

                {/* Column 2: Logo (Centered) */}
                <div className="flex flex-col items-center justify-center order-first md:order-none">
                    <div className="relative h-40 w-40 bg-white/10 rounded-full p-4 hover:scale-105 transition-transform duration-300">
                        <Image src="/images/logo.png" alt="Fattoush Logo" fill className="object-contain" />
                    </div>
                </div>

                {/* Column 3: Hours */}
                <div className="space-y-4 flex flex-col items-center justify-center">
                    <h4 className="font-semibold text-xl">Horaires</h4>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>Lun - Sam: 12h00 - 14h30 / 19h00 - 21h30</li>
                        <li>Dimanche: Fermé</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-60">
                &copy; {new Date().getFullYear()} FATTOUSH. All rights reserved.
            </div>
        </footer>
    );
}
