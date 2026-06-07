"use client";

import { useState } from "react";

type DayMenu = { name: string; description: string; dateLabel?: string };
type WeeklyMenu = {
    lundi: DayMenu;
    mardi: DayMenu;
    mercredi: DayMenu;
    jeudi: DayMenu;
    vendredi: DayMenu;
};

interface WeeklySpecialsProps {
    menu: WeeklyMenu;
    currentDay: string;
}

const DAYS_KEYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"] as const;
const DAY_LABELS = {
    lundi: "Lundi",
    mardi: "Mardi",
    mercredi: "Mercredi",
    jeudi: "Jeudi",
    vendredi: "Vendredi"
};

export function WeeklySpecials({ menu, currentDay }: WeeklySpecialsProps) {
    // Default to current day if it's a weekday, otherwise Lundi
    const defaultDay = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"].includes(currentDay)
        ? (currentDay as keyof WeeklyMenu)
        : "lundi";

    const [selectedDay, setSelectedDay] = useState<keyof WeeklyMenu>(defaultDay);

    const activePlat = menu[selectedDay];
    const hasPlat = activePlat && activePlat.name && activePlat.description;

    return (
        <div className="relative z-10 w-full max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-black/5 p-5 md:p-8 space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-1.5">
                <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide" style={{ color: "#2C2420" }}>
                    Menus de la semaine
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Découvrez nos spécialités maison préparées chaque jour par notre chef.
                </p>
            </div>

            {/* Tabs Buttons */}
            <div className="grid grid-cols-5 gap-1 p-1 bg-secondary/10 rounded-xl">
                {DAYS_KEYS.map((dayKey) => {
                    const isActive = selectedDay === dayKey;
                    return (
                        <button
                            key={dayKey}
                            type="button"
                            onClick={() => setSelectedDay(dayKey)}
                            className={`py-2 text-[10px] xs:text-xs md:text-sm font-semibold tracking-wide rounded-lg transition-all duration-200 cursor-pointer ${
                                isActive
                                ? "bg-[#3a6b47] text-white shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-black/5"
                            }`}
                        >
                            {DAY_LABELS[dayKey]}
                        </button>
                    );
                })}
            </div>

            {/* Selected Dish Content */}
            <div className="relative min-h-[110px] flex flex-col justify-center py-2 border-t border-black/5">
                {hasPlat ? (
                    <div 
                        key={selectedDay}
                        className="space-y-2 text-center animate-fade-in"
                    >
                        <h3 className="text-lg md:text-xl font-serif font-bold uppercase tracking-wide" style={{ color: "#2C2420" }}>
                            {activePlat.name}
                        </h3>
                        <p className="text-xs md:text-sm leading-relaxed max-w-md mx-auto whitespace-pre-line" style={{ color: "#4A3F3A" }}>
                            {activePlat.description}
                        </p>
                    </div>
                ) : (
                    <p className="text-center text-xs md:text-sm text-muted-foreground py-4">
                        Aucun plat configuré pour ce jour.
                    </p>
                )}
            </div>

            {/* Mention */}
            <div className="text-center pt-3 border-t border-black/5">
                <p className="text-[9px] md:text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#B06070" }}>
                    Tous les plats du jour sont accompagnés d’une salade fraîche.
                </p>
            </div>
        </div>
    );
}
