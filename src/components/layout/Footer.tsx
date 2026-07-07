import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
    const t = useTranslations("Navigation");
    const tFooter = useTranslations("Footer");

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
                        <li>Lun - Ven: 12h00 - 15h00 / 18h30 - 00h00</li>
                        <li>Sam - Dim: 12h00 - 00h00</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-4 text-center text-sm opacity-75">
                <p className="inline-flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    {tFooter("halal")}
                </p>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-60">
                &copy; {new Date().getFullYear()} FATTOUSH. All rights reserved.
            </div>
        </footer>
    );
}
