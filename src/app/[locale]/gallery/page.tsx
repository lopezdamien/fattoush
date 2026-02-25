'use client';

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";

const galleryImages = [
    { src: "/images/gallery-1.jpg", alt: "Mezzé libanais Fattoush Genève Rue des Gares" },
    { src: "/images/mezze.jpg", alt: "Assortiment de mezzés froids Fattoush Genève" },
    { src: "/images/gallery-2.jpg", alt: "Spécialités libanaises Fattoush restaurant Genève" },
    { src: "/images/gallery-3.jpg", alt: "Cuisine libanaise fraîche Fattoush Genève" },
    { src: "/images/gallery-4.jpg", alt: "Ambiance restaurant Fattoush Rue des Gares Genève" },
    { src: "/images/gallery-5.jpg", alt: "Détails culinaires Fattoush Genève" },
    { src: "/images/gallery-6.jpg", alt: "Plats libanais Fattoush restaurant Genève" },
    { src: "/images/gallery-7.jpg", alt: "Recettes traditionnelles libanaises Fattoush Genève" },
    { src: "/images/grill.jpg", alt: "Grillades libanaises Fattoush Genève Gare Cornavin" },
    { src: "/images/gallery-8.jpg", alt: "Service généreux Fattoush restaurant libanais Genève" },
    { src: "/images/gallery-9.jpg", alt: "Cuisine du Levant Fattoush Genève" },
    { src: "/images/vegetarian.jpg", alt: "Mets végétariens libanais Fattoush Genève" },
    { src: "/images/gallery-10.jpg", alt: "Expérience culinaire Fattoush Rue des Gares Genève" },
    { src: "/images/gallery-11.jpg", alt: "Partage convivial Fattoush restaurant Genève" },
    { src: "/images/gallery-12.jpg", alt: "Atmosphère Fattoush restaurant libanais Genève" },
    { src: "/images/gallery-13.jpg", alt: "Couleurs libanaises Fattoush Genève" },
    { src: "/images/gallery-14.jpg", alt: "Saveurs de Beyrouth Fattoush Genève" },
    { src: "/images/gallery-15.jpg", alt: "Choix sains libanais Fattoush Genève" },
    { src: "/images/gallery-16.jpg", alt: "Spécialités Fattoush restaurant Genève" },
    { src: "/images/gallery-17.jpg", alt: "Saveurs authentiques libanaises Fattoush Genève" },
    { src: "/images/gallery-18.jpg", alt: "Sélection Fattoush restaurant Rue des Gares Genève" },
    { src: "/images/gallery-19.jpg", alt: "Expérience libanaise Fattoush Genève" },
];

// Split images into 3 columns in a round-robin fashion for masonry effect
function buildColumns(images: typeof galleryImages, count: number) {
    const cols: (typeof galleryImages)[] = Array.from({ length: count }, () => []);
    images.forEach((img, i) => cols[i % count].push(img));
    return cols;
}

export default function GalleryPage() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const touchStartX = useRef<number | null>(null);
    const t = useTranslations("Gallery");

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const prev = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }, [lightboxIndex]);

    const next = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }, [lightboxIndex]);

    useEffect(() => {
        if (lightboxIndex === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [lightboxIndex, prev, next]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        touchStartX.current = null;
    };

    const cols3 = buildColumns(galleryImages, 3);
    const cols2 = buildColumns(galleryImages, 2);
    const cols1 = buildColumns(galleryImages, 1);

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section style={{ paddingTop: '7rem', paddingBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 700,
                    color: '#9B1C31',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                }}>
                    {t("title")}
                </h1>
                <p style={{
                    color: '#888',
                    fontSize: '1.05rem',
                    fontWeight: 400,
                    margin: 0,
                }}>
                    Un aperçu de notre univers culinaire à la Rue des Gares, Genève
                </p>
            </section>

            {/* Masonry Gallery */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
                {/* Desktop: 3 columns */}
                <div className="gallery-desktop" style={{ display: 'flex', gap: '20px' }}>
                    {cols3.map((col, ci) => (
                        <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {col.map((image, ri) => {
                                const globalIndex = ri * 3 + ci;
                                return (
                                    <div
                                        key={ri}
                                        onClick={() => openLightbox(globalIndex)}
                                        style={{
                                            cursor: 'pointer',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                                            position: 'relative',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
                                            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                                            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                                        }}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={600}
                                            height={400}
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                            loading="lazy"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Tablet: 2 columns */}
                <div className="gallery-tablet" style={{ display: 'none', gap: '16px' }}>
                    {cols2.map((col, ci) => (
                        <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {col.map((image, ri) => {
                                const globalIndex = ri * 2 + ci;
                                return (
                                    <div
                                        key={ri}
                                        onClick={() => openLightbox(globalIndex)}
                                        style={{
                                            cursor: 'pointer',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                                        }}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={600}
                                            height={400}
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                            loading="lazy"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Mobile: 1 column */}
                <div className="gallery-mobile" style={{ display: 'none', flexDirection: 'column', gap: '12px' }}>
                    {cols1[0].map((image, index) => (
                        <div
                            key={index}
                            onClick={() => openLightbox(index)}
                            style={{
                                cursor: 'pointer',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                            }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={600}
                                height={400}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                backgroundColor: '#f8f8f8',
                textAlign: 'center',
                padding: '4rem 1.5rem',
            }}>
                <p style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#222',
                    marginBottom: '1.5rem',
                }}>
                    Envie de découvrir ces saveurs ?
                </p>
                <a
                    href="https://widget.thefork.com/5461ec0f-3804-499f-8328-955b4654321f"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        backgroundColor: '#9B1C31',
                        color: '#fff',
                        padding: '0.875rem 2.5rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#7d1628')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#9B1C31')}
                >
                    Réserver une table
                </a>
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.92)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={closeLightbox}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        style={{
                            position: 'absolute',
                            top: '1.25rem',
                            right: '1.5rem',
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            lineHeight: 1,
                            zIndex: 10000,
                        }}
                    >
                        ×
                    </button>

                    {/* Prev Button */}
                    <button
                        onClick={e => { e.stopPropagation(); prev(); }}
                        style={{
                            position: 'absolute',
                            left: '1rem',
                            background: 'rgba(255,255,255,0.12)',
                            border: 'none',
                            color: '#fff',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            zIndex: 10000,
                        }}
                    >
                        ‹
                    </button>

                    {/* Image */}
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}
                    >
                        <Image
                            src={galleryImages[lightboxIndex].src}
                            alt={galleryImages[lightboxIndex].alt}
                            width={1200}
                            height={800}
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                width: 'auto',
                                height: 'auto',
                                borderRadius: '8px',
                                display: 'block',
                            }}
                            priority
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={e => { e.stopPropagation(); next(); }}
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            background: 'rgba(255,255,255,0.12)',
                            border: 'none',
                            color: '#fff',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            zIndex: 10000,
                        }}
                    >
                        ›
                    </button>
                </div>
            )}

            {/* Responsive CSS via style tag */}
            <style>{`
                @media (max-width: 640px) {
                    .gallery-desktop { display: none !important; }
                    .gallery-tablet { display: none !important; }
                    .gallery-mobile { display: flex !important; }
                }
                @media (min-width: 641px) and (max-width: 1023px) {
                    .gallery-desktop { display: none !important; }
                    .gallery-tablet { display: flex !important; }
                    .gallery-mobile { display: none !important; }
                }
                @media (min-width: 1024px) {
                    .gallery-desktop { display: flex !important; }
                    .gallery-tablet { display: none !important; }
                    .gallery-mobile { display: none !important; }
                }
            `}</style>
        </main>
    );
}
