'use client';

import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    id: 1,
    src: "/bg1.jpg",
    alt: "Creative team collaborating on a media project",
    title: "Creative Collaboration",
    description: "Where ideas come to life"
  },
  {
    id: 2,
    src: "/bg2.jpg",
    alt: "Modern creative studio workspace",
    title: "Modern Workspace",
    description: "Designed for innovation"
  },
  {
    id: 3,
    src: "/bg3.jpg",
    alt: "Team planning a brand campaign",
    title: "Strategic Planning",
    description: "Building the future together"
  },
  {
    id: 4,
    src: "/bg4.jpg",
    alt: "Designer working through the creative process",
    title: "Creative Process",
    description: "From concept to reality"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // Only the first image loads with the page; later slides are fetched just before they are shown.
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    // Warm up the current and the upcoming slide.
    const t = setTimeout(() => {
      setMounted((prev) => {
        const next = (currentSlide + 1) % slides.length;
        if (prev.has(currentSlide) && prev.has(next)) return prev;
        return new Set([...prev, currentSlide, next]);
      });
    }, currentSlide === 0 ? 3000 : 0);
    return () => clearTimeout(t);
  }, [currentSlide]);

  // Auto-play. The first advance waits long enough that it never competes with initial load.
  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(nextSlide, 6000);
    return () => clearInterval(id);
  }, [isAutoPlaying, currentSlide, nextSlide]);

  return (
    <section
      aria-label="Introduction"
      className="relative bg-black min-h-[100svh] flex items-center pt-24 pb-10 sm:py-16 overflow-hidden"
    >
      {/* Moving background lines (pure CSS, compositor-only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="hero-line-x absolute h-px left-0 right-0 bg-gradient-to-r from-transparent via-purple-900/30 to-transparent"
            style={{ top: `${20 + i * 15}%`, animationDuration: `${15 + i * 2}s`, animationDelay: `${i * 2}s` }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <div
            key={`v-${i}`}
            className="hero-line-y absolute w-px top-0 bottom-0 bg-gradient-to-b from-transparent via-purple-900/30 to-transparent"
            style={{ left: `${30 + i * 25}%`, animationDuration: `${12 + i * 1.5}s`, animationDelay: `${i}s` }}
          />
        ))}
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="relative w-full">
          {/* SVG clipPath */}
          <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
            <defs>
              <clipPath id="heroShape" clipPathUnits="objectBoundingBox">
                <path
                  d="M 0,0 L 0.48,0 Q 0.52,0 0.52,0.04 L 0.52,0.28 Q 0.52,0.34 0.46,0.34 L 0.04,0.34 Q 0,0.34 0,0.38 L 0,1 L 0.7,1 Q 0.74,1 0.74,0.96 L 0.74,0.78 Q 0.74,0.72 0.8,0.72 L 0.96,0.72 Q 1,0.72 1,0.68 L 1,0 Z"
                />
              </clipPath>
            </defs>
          </svg>

          {/* Slider */}
          <div
            className="relative overflow-hidden rounded-3xl shadow-2xl h-[460px] sm:h-[520px]"
            style={{ clipPath: 'url(#heroShape)' }}
          >
            {/* Crossfading slides (CSS opacity transition, no animation library) */}
            {slides.map((s, idx) => (
              <div
                key={s.id}
                aria-hidden={currentSlide !== idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  currentSlide === idx ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {mounted.has(idx) && (
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    quality={50}
                    className="object-cover"
                    // The first slide is the LCP element: fetch it immediately at high priority.
                    {...(idx === 0
                      ? { loading: 'eager' as const, fetchPriority: 'high' as const }
                      : { loading: 'lazy' as const })}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-red-900/70" />
                <div className="absolute bottom-8 left-8 bg-white/40 rounded-xl p-4 max-w-[300px] hidden sm:block">
                  <p className="text-white text-lg font-semibold">{s.title}</p>
                  <p className="text-white/90 text-sm">{s.description}</p>
                </div>
              </div>
            ))}

            {/* Inner glow (CSS) */}
            <div
              aria-hidden="true"
              className="hero-glow absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-purple-900/20 pointer-events-none"
            />

            {/* Slide dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex z-20">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Show slide ${idx + 1}: ${s.title}`}
                  aria-current={currentSlide === idx}
                  className="p-2.5 flex items-center justify-center"
                >
                  <span
                    className={`block transition-all duration-300 rounded-full ${
                      currentSlide === idx ? 'w-8 h-2 bg-purple-500' : 'w-2 h-2 bg-white/60 hover:bg-white/90'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 text-white rounded-full p-2 transition-colors z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 text-white rounded-full p-2 transition-colors z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => setIsAutoPlaying((v) => !v)}
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="absolute top-4 left-4 bg-white/40 hover:bg-white/60 text-white rounded-full p-2 transition-colors z-20"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>

          {/* Headline: rendered visible in the server HTML so it paints immediately (LCP). */}
          <div className="hero-slide-in absolute top-6 sm:top-10 md:left-8 max-w-[190px] sm:max-w-[300px] md:max-w-[620px]">
            <h1 className="text-white text-2xl md:text-5xl font-bold leading-tight tracking-tight">
              <span className="flex flex-col sm:flex-row sm:gap-3">
                <span>Innovative</span>
                <span>Studio Agency</span>
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent mt-1 sm:mt-2 inline-block">
                for Modern <span className="text-3xl sm:text-5xl">Brands</span>
              </span>
            </h1>
          </div>

          {/* Rotating ring (CSS) */}
          <div
            aria-hidden="true"
            className="spin-slow absolute top-8 right-8 w-20 h-20 rounded-full items-center justify-center pointer-events-none hidden sm:flex"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 border-[5px] border-purple-900 rounded-full" />
              <svg
                width="78"
                height="78"
                className="spin-slow-reverse text-purple-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <circle cx="39" cy="39" r="32" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="14 10" />
              </svg>
            </div>
          </div>

          {/* Glass card */}
          <div className="hero-card-in absolute bottom-8 right-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-7 max-w-[275px] border border-white/20 hidden sm:block transition-transform duration-300 hover:-translate-y-1">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-900 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <p className="font-semibold text-[18px] leading-none tracking-tight mb-3 text-white">
                MAKING IDEAS HAPPEN
              </p>
            </div>
            <p className="text-white text-[13px] mt-4 leading-snug">
              Where Innovation Meets Purpose
              <br />
              to Grow Your Brand
            </p>
            <div
              aria-hidden="true"
              className="float-sway absolute -bottom-3 -right-3 bg-white/20 p-3 rounded-2xl shadow text-3xl border border-white/30"
            >
              🌿
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
