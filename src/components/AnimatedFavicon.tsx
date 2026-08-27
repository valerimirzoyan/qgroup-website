"use client";

import { useEffect } from "react";

export const AnimatedFavicon = () => {
  useEffect(() => {
    const img = new Image();
    img.src = "/images/logos/q-logo.png";

    let animationFrameId: number;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    img.onload = () => {
      let lastTime = 0;
      const fpsInterval = 1000 / 30; // 30 FPS for ultra-smooth fluid transitions

      const render = (time: number) => {
        animationFrameId = window.requestAnimationFrame(render);

        if (time - lastTime < fpsInterval) return;
        lastTime = time;

        if (!ctx) return;
        ctx.clearRect(0, 0, 32, 32);

        // Natural smooth cosine breathing wave (period ~ 2 seconds)
        const t = Date.now() / 550;
        const progress = (1 - Math.cos(t)) / 2; // Smooth 0 -> 1 -> 0 curve
        const alpha = 0.35 + 0.65 * progress;

        // Subtle soft glow halo behind icon when pulsing up
        if (progress > 0.3) {
          const glowGrad = ctx.createRadialGradient(16, 16, 4, 16, 16, 15);
          glowGrad.addColorStop(0, `rgba(163, 230, 53, ${0.4 * progress})`);
          glowGrad.addColorStop(1, "rgba(163, 230, 53, 0)");
          ctx.fillStyle = glowGrad;
          ctx.fillRect(0, 0, 32, 32);
        }

        // Draw logo with smooth alpha
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, 1, 1, 30, 30);
        ctx.globalAlpha = 1.0;

        if (link) {
          link.href = canvas.toDataURL("image/png");
        }
      };

      animationFrameId = window.requestAnimationFrame(render);
    };

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return null;
};
