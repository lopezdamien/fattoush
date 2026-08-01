"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

// ==========================================
// CONFIGURATION
// ==========================================
const ENABLE_MODAL = true; // Set to false to force-disable the modal
const AUTO_EXPIRE_DATETIME = "2026-08-02T22:00:00+02:00"; // Target expiration date/time (Sunday Aug 2nd, 22:00 Zurich time)

export function NationalDayModal() {
    const t = useTranslations("NationalDayModal");
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Date-based helper to auto-expire the modal
    const isBeforeEndDateTime = () => {
        try {
            const now = new Date();
            const target = new Date(AUTO_EXPIRE_DATETIME);
            return now < target;
        } catch {
            return true; // Fallback to showing if Date parsing fails
        }
    };

    useEffect(() => {
        if (!ENABLE_MODAL || !isBeforeEndDateTime()) return;

        // Set isMounted to true after 1.5 seconds delay (on every visit/refresh)
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Call showModal once the dialog element is rendered/mounted in the DOM
    useEffect(() => {
        if (isMounted && dialogRef.current) {
            if (!dialogRef.current.open) {
                dialogRef.current.showModal();
            }
        }
    }, [isMounted]);

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        setIsMounted(false);
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

    if (!isMounted) return null;

    return (
        <dialog 
            ref={dialogRef}
            onClick={handleBackdropClick}
            onClose={handleClose}
            closedby="any"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent border-none outline-none overflow-visible m-auto max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl w-full animate-fade-in"
        >
            {/* Modal Body */}
            <div className="relative z-10 w-full overflow-hidden bg-secondary rounded-3xl border border-primary/10 shadow-2xl p-6 sm:p-8 md:p-12 text-center space-y-6 md:space-y-8 animate-scale-up">
                {/* Close Button (X) */}
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-all p-1.5 rounded-full hover:bg-black/5 cursor-pointer z-20"
                    aria-label={t("close")}
                >
                    <X size={18} />
                </button>

                {/* Content Container */}
                <div className="space-y-4 md:space-y-6 pt-2">
                    {/* Text Content */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider">
                            {t("title")}
                        </div>
                        
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight leading-tight">
                            {t("subtitle")}
                        </h3>
                        
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                            {t("description")}
                        </p>

                        <p className="text-sm sm:text-base md:text-lg font-semibold text-primary/80 italic pt-1">
                            {t("footer")}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto w-full">
                    <a 
                        href="https://widget.thefork.com/5461ec0f-3804-499f-8328-955b4654321f" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={handleClose}
                        className="flex-1 bg-primary text-white text-sm sm:text-base font-bold py-3.5 px-6 rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all text-center block"
                    >
                        {t("cta")}
                    </a>
                    <button 
                        type="button"
                        onClick={handleClose}
                        className="flex-1 bg-transparent hover:bg-black/5 border border-primary/10 text-muted-foreground text-sm sm:text-base font-semibold py-3.5 px-6 rounded-xl transition-all cursor-pointer"
                    >
                        {t("close")}
                    </button>
                </div>
            </div>
        </dialog>
    );
}
