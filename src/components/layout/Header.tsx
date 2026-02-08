"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";

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
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-primary">
                    FATTOUSH
                </Link>

                <nav className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide"
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
