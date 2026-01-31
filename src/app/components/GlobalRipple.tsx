import React, { useCallback } from "react";
import "@/styles/global-ripple.css";

export default function GlobalRipple() {
  const createRipple = useCallback((e: MouseEvent | TouchEvent) => {
    // Chỉ ripple cho click trái hoặc touch
    if (e instanceof MouseEvent && e.button !== 0) return;
    const isTouch = "touches" in e;
    const x = isTouch ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const y = isTouch ? e.touches[0].clientY : (e as MouseEvent).clientY;
    const ripple = document.createElement("span");
    ripple.className = "global-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  }, []);

  React.useEffect(() => {
    document.addEventListener("mousedown", createRipple);
    document.addEventListener("touchstart", createRipple);
    return () => {
      document.removeEventListener("mousedown", createRipple);
      document.removeEventListener("touchstart", createRipple);
    };
  }, [createRipple]);

  return null;
}
