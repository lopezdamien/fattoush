"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

type GalleryImage = {
    src: string;
    alt: string;
};

export function PhotoGallery({ images }: { images: GalleryImage[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        if (openIndex === null) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenIndex(null);
        };
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [openIndex]);

    return (
        <>
            <div className="grid grid-cols-3 gap-3">
                {images.map((img, i) => (
                    <button
                        key={img.src}
                        type="button"
                        onClick={() => setOpenIndex(i)}
                        aria-label={img.alt}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-zoom-in"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 640px) 33vw, 400px"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </button>
                ))}
            </div>

            {openIndex !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 animate-fade-in"
                    onClick={() => setOpenIndex(null)}
                >
                    <button
                        type="button"
                        onClick={() => setOpenIndex(null)}
                        aria-label="Fermer"
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full p-2"
                    >
                        <X size={24} />
                    </button>
                    <div
                        className="relative w-full h-full max-w-4xl max-h-[85vh] animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[openIndex].src}
                            alt={images[openIndex].alt}
                            fill
                            sizes="100vw"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    );
}
