"use client";

import React, { useState, useEffect } from "react";

interface OpeningAnimationProps {
  onComplete?: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  // Animation phases:
  // 1: 'corner-spawn' (starts at screen corner, magnified, pulsing)
  // 2: 'center-float' (glides to exact center and minimises to normal size)
  // 3: 'shift-left' (moves left to make space for text)
  // 4: 'typing' (types 'Q Group' letter by letter while logo pulses)
  // 5: 'reveal-tagline' (subtitle fades in, final glow flare)
  // 6: 'fade-out' (entire overlay smoothly dissolves)
  // 7: 'hidden' (unmounted)
  const [phase, setPhase] = useState<
    "corner-spawn" | "center-float" | "shift-left" | "typing" | "reveal-tagline" | "fade-out" | "hidden"
  >("corner-spawn");

  const [typedText, setTypedText] = useState("");
  const fullText = "Q Group";

  useEffect(() => {
    // Step 1: Start at corner, then glide to center after 350ms
    const timerCenter = setTimeout(() => {
      setPhase("center-float");
    }, 350);

    // Step 2: Hold at center while pulsing, then shift left after 1300ms
    const timerShift = setTimeout(() => {
      setPhase("shift-left");
    }, 1350);

    // Step 3: Start typing 'Q Group' after 1800ms
    const timerTyping = setTimeout(() => {
      setPhase("typing");
    }, 1850);

    return () => {
      clearTimeout(timerCenter);
      clearTimeout(timerShift);
      clearTimeout(timerTyping);
    };
  }, []);

  // Handle typing effect
  useEffect(() => {
    if (phase === "typing") {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setPhase("reveal-tagline");
        }
      }, 95); // Smooth typing speed per character

      return () => clearInterval(interval);
    }
  }, [phase]);

  // Handle final reveal and fade out
  useEffect(() => {
    if (phase === "reveal-tagline") {
      const timerFade = setTimeout(() => {
        setPhase("fade-out");
      }, 700);

      const timerFinish = setTimeout(() => {
        setPhase("hidden");
        if (onComplete) onComplete();
      }, 1400);

      return () => {
        clearTimeout(timerFade);
        clearTimeout(timerFinish);
      };
    }
  }, [phase, onComplete]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#080d1a] flex items-center justify-center overflow-hidden transition-all duration-700 ${
        phase === "fade-out"
          ? "opacity-0 scale-105 pointer-events-none blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[500px] h-[500px] rounded-full bg-lime-500/10 blur-[130px] transition-all duration-1000 ${
            phase === "corner-spawn"
              ? "scale-50 opacity-40 -translate-x-32 -translate-y-32"
              : phase === "reveal-tagline"
              ? "scale-150 opacity-100"
              : "scale-100 opacity-70"
          }`}
        />
      </div>

      {/* Main Lockup Stage */}
      <div className="relative flex items-center justify-center z-10 select-none">
        
        {/* Logo Container with Smooth Spatial Transitions */}
        <div
          className={`transition-all duration-900 ease-out flex items-center justify-center ${
            phase === "corner-spawn"
              ? "translate-x-[-32vw] translate-y-[-28vh] scale-[2.2] opacity-0"
              : phase === "center-float"
              ? "translate-x-0 translate-y-0 scale-100 opacity-100"
              : "translate-x-0 translate-y-0 scale-100 opacity-100 mr-4 sm:mr-6"
          }`}
        >
          {/* Pulsing Glow Ring around Logo (matching the pulse of the browser tab icon) */}
          <div className="relative flex items-center justify-center">
            {/* Ambient Radial Pulse */}
            <div
              className={`absolute inset-0 rounded-full bg-lime-400/25 blur-xl transition-all duration-700 ${
                phase === "reveal-tagline"
                  ? "scale-150 opacity-100"
                  : "animate-ping opacity-60"
              }`}
            />

            {/* Logo Image with Cosine Rhythmic Breathing */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
              <img
                src="/images/logos/q-logo.png"
                alt="Q Group Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(132,204,22,0.65)] animate-pulse"
              />
            </div>
          </div>
        </div>

        {/* Text Container: Appears on the Right of Logo */}
        <div
          className={`flex flex-col justify-center overflow-hidden transition-all duration-500 ${
            phase === "corner-spawn" || phase === "center-float"
              ? "w-0 opacity-0"
              : "w-auto opacity-100"
          }`}
        >
          {/* Typed 'Q Group' Headline */}
          <div className="flex items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white whitespace-nowrap">
              <span className="text-white">Q </span>
              <span className="text-gradient">
                {typedText.length > 2 ? typedText.slice(2) : ""}
              </span>
            </h1>

            {/* Glowing Blinking Typing Cursor */}
            {phase === "typing" && (
              <span className="inline-block w-1 sm:w-1.5 h-8 sm:h-10 md:h-12 bg-lime-400 ml-1.5 animate-pulse rounded-full shadow-[0_0_12px_#a3e635]" />
            )}
          </div>

          {/* Subtitle Tagline (Fades in smoothly on completion) */}
          <div
            className={`transition-all duration-500 ease-out pt-1 ${
              phase === "reveal-tagline" || phase === "fade-out"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <p className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.25em] text-lime-400 uppercase whitespace-nowrap">
              IT Infrastructure & Security
            </p>
          </div>
        </div>

      </div>

      {/* Discreet Skip Button in bottom corner */}
      <button
        onClick={() => {
          setPhase("fade-out");
          setTimeout(() => {
            setPhase("hidden");
            if (onComplete) onComplete();
          }, 400);
        }}
        className="absolute bottom-6 right-6 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 backdrop-blur-md transition-colors cursor-pointer"
      >
        Skip
      </button>
    </div>
  );
};
