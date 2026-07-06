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
    const activeDays = DAYS_KEYS.filter((dayKey) => menu[dayKey] && menu[dayKey].name);

    const initialDay = activeDays.includes(currentDay as any)
        ? (currentDay as keyof WeeklyMenu)
        : (activeDays[0] || "lundi");

    const [selectedDay, setSelectedDay] = useState<keyof WeeklyMenu>(initialDay);

    const activePlat = menu[selectedDay];
    const hasPlat = activePlat && activePlat.name && activePlat.description;

    return (
        <div className="relative z-10 w-full max-w-xl mx-auto bg-secondary rounded-2xl shadow-sm border border-primary/10 p-5 md:p-8 space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-1">
                <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-wide">
                    PLAT DU JOUR
                </h2>
                {activePlat?.dateLabel && (
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground/85">
                        {activePlat.dateLabel}
                    </p>
                )}
            </div>

            {/* Tabs Buttons - Only visible if there are multiple configured days */}
            {activeDays.length > 1 && (
                <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-primary/5 rounded-xl max-w-md mx-auto">
                    {activeDays.map((dayKey) => {
                        const isActive = selectedDay === dayKey;
                        return (
                            <button
                                key={dayKey}
                                type="button"
                                onClick={() => setSelectedDay(dayKey)}
                                className={`px-4 py-2 text-xs md:text-sm font-bold tracking-wide rounded-lg transition-all duration-200 cursor-pointer ${
                                    isActive
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                }`}
                            >
                                {DAY_LABELS[dayKey]}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Selected Dish Content */}
            <div className="relative min-h-[120px] flex flex-col justify-center py-6 border-t border-black/5">
                {hasPlat ? (
                    <div 
                        key={selectedDay}
                        className="text-center animate-fade-in space-y-3"
                    >
                        {/* Elegant top line decoration */}
                        <div className="h-[1px] w-12 mx-auto bg-primary/20"></div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-primary uppercase tracking-wide leading-tight px-1">
                            {activePlat.name}
                        </h3>
                        
                        {/* Elegant middle divider */}
                        <div className="h-[1px] w-6 mx-auto bg-primary/25"></div>
                        
                        <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-md mx-auto whitespace-pre-line">
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
                <p className="text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] text-primary/70">
                    Tous les plats du jour sont accompagnés d’une salade fraîche.
                </p>
            </div>
        </div>
    );
}
