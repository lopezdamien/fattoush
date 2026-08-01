"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// ==========================================
// CONFIGURATION
// ==========================================
const ENABLE_MODAL = true; // Set to false to force-disable the modal
const AUTO_EXPIRE_DATE = "2026-08-03"; // Automatically hides starting from this date (YYYY-MM-DD local time)

export function NationalDayModal() {
    const t = useTranslations("NationalDayModal");
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Date-based helper to auto-expire the modal
    const isBeforeEndDate = () => {
        try {
            // Get current date in Switzerland (Zurich) timezone in YYYY-MM-DD format
            const formatter = new Intl.DateTimeFormat("sv-SE", {
                timeZone: "Europe/Zurich",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            const [{ value: year }, , { value: month }, , { value: day }] = formatter.formatToParts(new Date());
            const todayStr = `${year}-${month}-${day}`;
            return todayStr < AUTO_EXPIRE_DATE;
        } catch {
            // Fallback to local time if formatting fails
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const todayStr = `${year}-${month}-${day}`;
            return todayStr < AUTO_EXPIRE_DATE;
        }
    };

    useEffect(() => {
        if (!ENABLE_MODAL || !isBeforeEndDate()) return;

        // Check if user has already dismissed the modal in this session
        const hasSeen = sessionStorage.getItem("fattoush_nationalday_seen");
        if (!hasSeen) {
            // Show modal after 1.5 seconds for a smoother initial load transition
            const timer = setTimeout(() => {
                if (dialogRef.current) {
                    dialogRef.current.showModal();
                    setIsOpen(true);
                }
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        setIsOpen(false);
        sessionStorage.setItem("fattoush_nationalday_seen", "true");
    };

    // Close when clicking the backdrop (light-dismiss fallback for unsupported browsers)
    const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
        if (event.target !== dialogRef.current) return;
        const rect = dialogRef.current.getBoundingClientRect();
        const isDialogContent = (
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
        );
        if (!isDialogContent) {
            handleClose();
        }
    };

    if (!isOpen) return null;

    return (
        <dialog 
            ref={dialogRef}
            onClick={handleBackdropClick}
            onClose={handleClose}
            closedby="any"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent border-none outline-none overflow-visible m-auto max-w-sm w-full animate-fade-in"
        >
            {/* Modal Body */}
            <div className="relative z-10 w-full overflow-hidden bg-secondary rounded-3xl border border-primary/10 shadow-2xl p-6 md:p-8 text-center space-y-5 animate-scale-up">
                {/* Close Button (X) */}
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-all p-1.5 rounded-full hover:bg-black/5 cursor-pointer z-20"
                    aria-label={t("close")}
                >
                    <X size={18} />
                </button>

                {/* Content Container */}
                <div className="space-y-4 pt-2">
                    {/* Visual Banner */}
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm border border-primary/10 bg-black/5">
                        <Image 
                            src="/images/nationalday.jpg" 
                            alt={t("title")}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            {t("title")}
                        </div>
                        
                        <h3 className="text-xl font-bold text-primary tracking-tight leading-snug">
                            {t("subtitle")}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {t("description")}
                        </p>

                        <p className="text-sm font-semibold text-primary/80 italic pt-1">
                            {t("footer")}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                    <a 
                        href="https://widget.thefork.com/5461ec0f-3804-499f-8328-955b4654321f" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={handleClose}
                        className="w-full bg-primary text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all text-center block"
                    >
                        {t("cta")}
                    </a>
                    <button 
                        type="button"
                        onClick={handleClose}
                        className="w-full bg-transparent hover:bg-black/5 text-muted-foreground text-sm font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer"
                    >
                        {t("close")}
                    </button>
                </div>
            </div>
        </dialog>
    );
}
