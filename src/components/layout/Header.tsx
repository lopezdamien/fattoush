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
        { href: "/about", label: "about" },
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
            <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                <div className="flex items-center gap-4 z-50 relative">
                    {/* Mobile menu trigger */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white hover:text-white/80 transition-colors p-2"
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
                                    <X size={32} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={32} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <Link href="/" className="font-bold text-2xl md:text-3xl text-white tracking-wider hover:opacity-90 transition-opacity z-50">
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
                        <LanguageSwitcher />
                    </div>
                    {/* Mobile Language Switcher stays visible or moves into menu? User asked for sandwich menu design, usually includes everything. 
                        Let's keep it visible on mobile header too or just inside menu. 
                        Common pattern: inside menu for cleaner header. I'll put it inside menu as requested in previous similar prompt. */}
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
                        className="fixed inset-0 bg-primary z-40 md:hidden flex flex-col items-center justify-center p-6 min-h-screen overflow-y-auto"
                    >
                        {/* Decorative background elements if needed, keeping it clean for now */}

                        <nav className="flex flex-col items-center gap-8 w-full max-w-md text-center py-10">
                            {links.map((link) => (
                                <motion.div key={link.href} variants={itemVariants} className="w-full">
                                    <Link
                                        href={link.href}
                                        onClick={toggleMenu}
                                        className="block text-4xl sm:text-5xl font-black text-white hover:text-[var(--color-green)] transition-colors tracking-tight py-2 uppercase"
                                    >
                                        {t(link.label)}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center gap-8 w-full">
                            <div className="w-16 h-1 bg-white/20 rounded-full" />

                            <div className="flex items-center gap-6 text-white/80">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-green)] transition-colors hover:scale-110 transform duration-200">
                                    <Instagram size={28} />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-green)] transition-colors hover:scale-110 transform duration-200">
                                    <Facebook size={28} />
                                </a>
                                <a href="/contact" onClick={toggleMenu} className="hover:text-[var(--color-green)] transition-colors hover:scale-110 transform duration-200">
                                    <MapPin size={28} />
                                </a>
                            </div>

                            <div className="scale-125">
                                <LanguageSwitcher />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
