"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
    const t = useTranslations("Navigation");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { href: "/", label: "home" },
        { href: "/menu", label: "menu" },
        { href: "/about", label: "about" },
        { href: "/gallery", label: "gallery" },
        { href: "/contact", label: "contact" },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed top-0 w-full z-50 bg-primary shadow-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Mobile menu trigger */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white hover:text-white/80 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} />
                    </button>

                    <Link href="/" className="font-bold text-2xl text-white tracking-wider hover:opacity-90 transition-opacity">
                        FATTOUSH
                    </Link>
                </div>

                {/* Desktop Navigation */}
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
                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-xl md:hidden flex flex-col"
                        >
                            <div className="p-4 border-b flex items-center justify-between bg-primary text-white">
                                <span className="font-bold text-xl tracking-wider">FATTOUSH</span>
                                <button
                                    onClick={toggleMenu}
                                    className="text-white hover:text-white/80 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
                                <nav className="flex flex-col gap-4">
                                    {links.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={toggleMenu}
                                            className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
                                        >
                                            {t(link.label)}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-auto pt-6 border-t border-border">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-muted-foreground">Langue:</span>
                                        <LanguageSwitcher />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
