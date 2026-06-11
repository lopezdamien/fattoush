"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function WorldCupModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if user has already dismissed the modal in this session
        const hasSeen = sessionStorage.getItem("fattoush_worldcup_modal_seen");
        if (!hasSeen) {
            // Show modal with a tiny delay for a smoother effect
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("fattoush_worldcup_modal_seen", "true");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleClose}
            />

            {/* Modal Body */}
            <div className="relative z-10 w-full max-w-sm overflow-hidden bg-secondary rounded-3xl border border-primary/10 shadow-2xl p-6 md:p-8 text-center space-y-6 transform scale-100 transition-all duration-300 animate-fade-in">
                {/* Close Button */}
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors p-1 rounded-full hover:bg-black/5 cursor-pointer"
                    aria-label="Fermer"
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="space-y-4 pt-2">
                    {/* Sport emoji badge */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 text-primary text-2xl">
                        ⚽
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight leading-snug">
                        FATTOUSH diffuse les matchs de la coupe du monde 2026 !!
                    </h3>
                    
                    <p className="text-sm text-muted-foreground">
                        Venez vibrer avec nous et profitez de nos spécialités libanaises authentiques en direct sur grand écran.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-2">
                    <a 
                        href="https://widget.thefork.com/5461ec0f-3804-499f-8328-955b4654321f" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={handleClose}
                        className="w-full bg-primary text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all text-center block"
                    >
                        Réserver une table
                    </a>
                    <button 
                        type="button"
                        onClick={handleClose}
                        className="w-full bg-transparent hover:bg-black/5 text-muted-foreground text-sm font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}
