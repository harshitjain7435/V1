"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CinematicBackgroundProps {
  className?: string;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
  className = "",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const IMAGES = [
    "/images/image1.png",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];

  const SLIDE_DURATION = 4000; // 4 seconds per slide
  const TRANSITION_DURATION = 900; // 900ms for slide transition

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % IMAGES.length);
  };

  // Reset transition state after animation completes
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);

    return () => clearTimeout(timer);
  }, [isTransitioning]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gray-900 ${className}`}
    >
      {/* Slides Carousel Wrapper */}
      <div
        className="relative w-full h-full flex"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isTransitioning
            ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
          willChange: "transform",
        }}
      >
        {/* Individual Slides */}
        {IMAGES.map((imageUrl, index) => (
          <div
            key={index}
            className="min-w-full h-full flex-shrink-0 relative bg-gray-800"
          >
            <Image
              src={imageUrl}
              alt={`Warehouse slide ${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
              quality={90}
              onLoadingComplete={() => index === 0 && setIsLoaded(true)}
            />
          </div>
        ))}
      </div>

      {/* Slide Navigation Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentSlide(index);
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "bg-white w-8 h-2"
                : "bg-white/40 w-2 h-2 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              boxShadow: index === currentSlide ? "0 0 8px rgba(255,255,255,0.5)" : "none",
            }}
          />
        ))}
      </div>

      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-white flex items-center justify-center z-0">
          <div className="text-gray-400 text-sm">Loading slides...</div>
        </div>
      )}
    </div>
  );
};
