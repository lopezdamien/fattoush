"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function Header() {
    const t = useTranslations("Navigation");

    const links = [
        { href: "/", label: "home" },
        { href: "/menu", label: "menu" },
        { href: "/about", label: "about" },
        { href: "/gallery", label: "gallery" },
        { href: "/contact", label: "contact" },
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-primary shadow-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Mobile menu trigger would go here */}

                    <Link href="/" className="font-bold text-2xl text-white tracking-wider hover:opacity-90 transition-opacity">
                        FATTOUSH
                    </Link>
                </div>

                <nav className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-white/90 hover:text-white transition-colors text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-2"
                        >
                            {t(link.label)}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
