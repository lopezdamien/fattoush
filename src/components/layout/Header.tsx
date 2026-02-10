"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { Menu, X, Facebook, Instagram, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

export function Header() {
    const t = useTranslations("Navigation");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const links = [
        { href: "/", label: "home" },
        { href: "/menu", label: "menu" },
        { href: "/gallery", label: "gallery" },
        { href: "/contact", label: "contact" },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuVariants: Variants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.1,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        closed: { opacity: 0, y: 20 },
        open: { opacity: 1, y: 0 }
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-primary/95 backdrop-blur-sm shadow-md transition-all duration-300">
            <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between relative">
                <div className="flex items-center gap-4 z-50">
                    {/* Mobile menu trigger */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white hover:text-white/80 transition-colors p-2 relative z-50"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <AnimatePresence mode="wait">
                            {isMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={28} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={28} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Desktop Logo */}
                    <Link href="/" className="hidden md:block font-bold text-3xl text-white tracking-wider hover:opacity-90 transition-opacity z-50">
                        FATTOUSH
                    </Link>
                </div>

                {/* Mobile Logo (Centered) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden z-50">
                    <Link href="/" className="font-bold text-2xl text-white tracking-wider hover:opacity-90 transition-opacity">
                        FATTOUSH
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-white/90 hover:text-[var(--color-green)] transition-all text-sm font-bold uppercase tracking-widest hover:scale-105"
                        >
                            {t(link.label)}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4 z-50">
                    <div className="hidden md:block">
                        <a
                            href="https://widget.thefork.com/5461ec0f-3804-499f-8328-955b4654321f"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="secondary" size="sm" className="hidden lg:flex font-semibold">
                                {t("book")}
                            </Button>
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-primary z-40 md:hidden flex flex-col items-center justify-center p-6 h-[100dvh]"
                    >
                        <nav className="flex flex-col items-center gap-6 w-full max-w-md text-center py-4">
                            {links.map((link) => (
                                <motion.div key={link.href} variants={itemVariants} className="w-full">
                                    <Link
                                        href={link.href}
                                        onClick={toggleMenu}
                                        className="block text-3xl font-black text-white hover:text-[var(--color-green)] transition-colors tracking-tight py-1 uppercase"
                                    >
                                        {t(link.label)}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div variants={itemVariants} className="w-full pt-4">
                                <a
                                    href="https://widget.thefork.com/5461ec0f-3804-499f-8328-955b4654321f"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={toggleMenu}
                                    className="block w-full"
                                >
                                    <Button size="lg" className="w-full text-xl py-6 bg-white text-primary hover:bg-white/90 font-bold uppercase transition-colors">
                                        {t("book")}
                                    </Button>
                                </a>
                            </motion.div>
                        </nav>

                        <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center gap-6 w-full">
                            <div className="w-12 h-1 bg-white/20 rounded-full" />

                            <div className="flex items-center gap-8 text-white/80">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-green)] transition-colors transform hover:scale-110">
                                    <Instagram size={24} />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-green)] transition-colors transform hover:scale-110">
                                    <Facebook size={24} />
                                </a>
                                <a href="/contact" onClick={toggleMenu} className="hover:text-[var(--color-green)] transition-colors transform hover:scale-110">
                                    <MapPin size={24} />
                                </a>
                            </div>

                            <div className="scale-110 mt-2">
                                <LanguageSwitcher />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
