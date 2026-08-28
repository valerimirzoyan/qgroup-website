"use client";

import React, { useState, useEffect } from "react";

interface OpeningAnimationProps {
  onComplete?: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  // Animation phases:
  // 1: 'fullscreen-spawn' (giant logo covering the whole screen, pulsing in center)
  // 2: 'center-minimise' (smoothly shrinks down from fullscreen to normal centered size)
  // 3: 'shift-right' (logo glides very smoothly to the right to open space on the left)
  // 4: 'typing' (types 'Q Group' letter by letter on the left while logo pulses on the right)
  // 5: 'reveal-tagline' (subtitle fades in, ambient flare)
  // 6: 'fade-out' (entire overlay smoothly dissolves)
  // 7: 'hidden' (unmounted)
  const [phase, setPhase] = useState<
    "fullscreen-spawn" | "center-minimise" | "shift-right" | "typing" | "reveal-tagline" | "fade-out" | "hidden"
  >("fullscreen-spawn");

  const [typedText, setTypedText] = useState("");
  const fullText = "Q Group";

  useEffect(() => {
    // Step 1: Start giant fullscreen in center, then smoothly minimise
    const timerMinimise = setTimeout(() => {
      setPhase("center-minimise");
    }, 120);

    // Step 2: Once centered, hold pulse, then glide very smoothly to the right
    const timerShift = setTimeout(() => {
      setPhase("shift-right");
    }, 1350);

    // Step 3: Start typing 'Q Group' after the smooth shift
    const timerTyping = setTimeout(() => {
      setPhase("typing");
    }, 2000);

    return () => {
      clearTimeout(timerMinimise);
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
      }, 1450);

      return () => {
        clearTimeout(timerFade);
        clearTimeout(timerFinish);
      };
    }
  }, [phase, onComplete]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#080d1a] flex items-center justify-center overflow-hidden transition-all duration-800 ${
        phase === "fade-out"
          ? "opacity-0 scale-105 pointer-events-none blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[600px] h-[600px] rounded-full bg-lime-500/15 blur-[140px] transition-all duration-1200 ${
            phase === "fullscreen-spawn"
              ? "scale-150 opacity-90"
              : phase === "reveal-tagline"
              ? "scale-125 opacity-100"
              : "scale-100 opacity-60"
          }`}
        />
      </div>

      {/* Main Lockup Stage */}
      <div className="relative flex items-center justify-center z-10 select-none px-4">
        
        {/* Text Container: Positioned on the Left of Logo */}
        <div
          className={`flex flex-col justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === "fullscreen-spawn" || phase === "center-minimise"
              ? "w-0 opacity-0"
              : "w-auto opacity-100 mr-4 sm:mr-6"
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
            className={`transition-all duration-600 ease-out pt-1 ${
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

        {/* Logo Container with Ultra-Smooth Minimise & Right-Glide Transitions */}
        <div
          className={`transition-all duration-1100 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center ${
            phase === "fullscreen-spawn"
              ? "scale-[4.2] sm:scale-[4.8] opacity-85"
              : "scale-100 opacity-100"
          }`}
        >
          {/* Pulsing Glow Ring around Logo */}
          <div className="relative flex items-center justify-center">
            {/* Ambient Radial Pulse */}
            <div
              className={`absolute inset-0 rounded-full bg-lime-400/30 blur-xl transition-all duration-700 ${
                phase === "reveal-tagline"
                  ? "scale-150 opacity-100"
                  : "animate-ping opacity-60"
              }`}
            />

            {/* Logo Image with Rhythmic Breathing Pulse */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
              <img
                src="/images/logos/q-logo.png"
                alt="Q Group Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_24px_rgba(132,204,22,0.75)] animate-pulse"
              />
            </div>
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
