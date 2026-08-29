"use client";

import React, { useState, useEffect } from "react";

interface OpeningAnimationProps {
  onComplete?: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  // Animation phases:
  // 0: 'standby' (dark ambient background pre-warms for ~250ms while image finishes loading in memory)
  // 1: 'fullscreen-spawn' (giant logo covering the center of the screen)
  // 2: 'center-minimise' (smoothly shrinks down from fullscreen to centered normal scale)
  // 3: 'shift-left' (logo + ambient highlight glide with buttery smoothness to its left stayed position)
  // 4: 'typing' (starts writing 'Q Group' letter by letter right as the logo reaches the left)
  // 5: 'reveal-tagline' (subtitle fades in smoothly with ambient glow)
  // 6: 'fade-out' (entire overlay smoothly dissolves into the main website)
  // 7: 'hidden' (unmounted)
  const [phase, setPhase] = useState<
    "standby" | "fullscreen-spawn" | "center-minimise" | "shift-left" | "typing" | "reveal-tagline" | "fade-out" | "hidden"
  >("standby");

  const [imageLoaded, setImageLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Q Group";

  // Preload logo image into browser memory immediately
  useEffect(() => {
    const img = new Image();
    img.src = "/images/logos/q-logo.png";
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = () => setImageLoaded(true);
    }
  }, []);

  // Prevent background scroll ONLY during the active intro (cleared completely on fade-out)
  useEffect(() => {
    if (phase !== "fade-out" && phase !== "hidden") {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow || "";
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [phase]);

  // Main animation timeline orchestration
  useEffect(() => {
    // Step 0 -> 1: Show dark background for 250ms buffer, then reveal giant logo in center
    const timerSpawn = setTimeout(() => {
      setPhase("fullscreen-spawn");
    }, 250);

    // Step 1 -> 2: Smoothly minimise from giant scale to center normal size
    const timerMinimise = setTimeout(() => {
      setPhase("center-minimise");
    }, 380);

    // Step 2 -> 3: Settle at center, then start smooth left glide
    const timerShift = setTimeout(() => {
      setPhase("shift-left");
    }, 1500);

    // Step 3 -> 4: Start typing right as the logo completes its leftward glide (2300ms)
    const timerTyping = setTimeout(() => {
      setPhase("typing");
    }, 2300);

    return () => {
      clearTimeout(timerSpawn);
      clearTimeout(timerMinimise);
      clearTimeout(timerShift);
      clearTimeout(timerTyping);
    };
  }, []);

  // Handle smooth typing effect
  useEffect(() => {
    if (phase === "typing") {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          // Once text typing finishes, reveal the tagline
          setTimeout(() => {
            setPhase("reveal-tagline");
          }, 150);
        }
      }, 100); // Natural smooth typing speed per character

      return () => clearInterval(interval);
    }
  }, [phase]);

  // Handle final reveal and fade out
  useEffect(() => {
    if (phase === "reveal-tagline") {
      const timerFade = setTimeout(() => {
        setPhase("fade-out");
        // Ensure scroll is instantly restored when fade out begins
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }, 800);

      const timerFinish = setTimeout(() => {
        setPhase("hidden");
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        if (onComplete) onComplete();
      }, 1600);

      return () => {
        clearTimeout(timerFade);
        clearTimeout(timerFinish);
      };
    }
  }, [phase, onComplete]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 w-full h-full z-[9999] bg-[#080d1a] flex items-center justify-center overflow-hidden select-none transition-all duration-700 ${
        phase === "fade-out"
          ? "opacity-0 scale-105 pointer-events-none blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Main Lockup Stage */}
      <div className="relative flex items-center justify-center z-10 select-none px-4">
        
        {/* Logo Container: Smooth Minimise to Center -> Butter-Smooth Left Glide */}
        <div
          className={`transition-all duration-[1150ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center relative will-change-transform ${
            phase === "standby"
              ? "scale-[4.2] sm:scale-[4.8] opacity-0"
              : phase === "fullscreen-spawn"
              ? "scale-[4.2] sm:scale-[4.8] opacity-85"
              : phase === "center-minimise"
              ? "scale-100 opacity-100"
              : "scale-100 opacity-100 mr-4 sm:mr-6"
          }`}
        >
          {/* Dynamic Green Highlight - Anchored directly to Logo and Moves Left Together */}
          <div
            className={`absolute pointer-events-none rounded-full bg-lime-500/25 blur-[120px] transition-all duration-[1150ms] ease-[cubic-bezier(0.22,1,0.36,1)] -z-10 ${
              phase === "standby"
                ? "w-[420px] h-[420px] opacity-40 scale-100"
                : phase === "fullscreen-spawn"
                ? "w-[420px] h-[420px] opacity-100 scale-150"
                : phase === "reveal-tagline"
                ? "w-[320px] h-[320px] opacity-100 scale-125"
                : "w-[260px] h-[260px] opacity-85 scale-100"
            }`}
          />

          {/* Pulsing Glow Ring around Logo */}
          <div className="relative flex items-center justify-center">
            {/* Ambient Radial Pulse */}
            <div
              className={`absolute inset-0 rounded-full bg-lime-400/35 blur-xl transition-all duration-700 ${
                phase === "standby"
                  ? "opacity-0"
                  : phase === "reveal-tagline"
                  ? "scale-150 opacity-100"
                  : "animate-ping opacity-60"
              }`}
            />

            {/* Logo Image (Zero Alt Text to prevent browser text flickering) */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
              <img
                src="/images/logos/q-logo.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-contain filter drop-shadow-[0_0_24px_rgba(132,204,22,0.8)] animate-pulse transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Text Container: Expands Smoothly on the Right of Logo Once Logo Arrives */}
        <div
          className={`flex flex-col justify-center overflow-hidden transition-all duration-[1150ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            phase === "standby" || phase === "fullscreen-spawn" || phase === "center-minimise"
              ? "max-w-0 opacity-0 -translate-x-2"
              : "max-w-[420px] opacity-100 translate-x-0"
          }`}
        >
          {/* Typed 'Q Group' Headline - Crisp Solid White */}
          <div className="flex items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white whitespace-nowrap">
              {typedText}
            </h1>

            {/* Blinking Typing Cursor */}
            {phase === "typing" && (
              <span className="inline-block w-1 sm:w-1.5 h-8 sm:h-10 md:h-12 bg-lime-400 ml-1.5 animate-pulse rounded-full" />
            )}
          </div>

          {/* Subtitle Tagline - Clean Crisp Slate with balanced spacing */}
          <div
            className={`transition-all duration-700 ease-out pt-3 sm:pt-4 ${
              phase === "reveal-tagline" || phase === "fade-out"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] text-slate-400 uppercase whitespace-nowrap">
              IT Infrastructure & Security
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
