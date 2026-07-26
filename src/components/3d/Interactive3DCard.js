"use client";

import { useState, useRef } from "react";

export default function Interactive3DCard({
  children,
  className = "",
  maxTilt = 12,
  glare = true,
  depth = 30,
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-1 to +1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Calculate rotation angles
    const rotateY = mouseX * maxTilt;
    const rotateX = -mouseY * maxTilt;

    // Glare position (percentage)
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;

    setTransformStyle({
      rotateX,
      rotateY,
      glareX,
      glareY,
      glareOpacity: 0.6,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      glareOpacity: 0,
      isHovered: false,
    }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 group ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="relative w-full h-full preserve-3d transition-transform duration-200 ease-out rounded-2xl"
        style={{
          transform: transformStyle.isHovered
            ? `rotateX(${transformStyle.rotateX}deg) rotateY(${transformStyle.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}

        {/* Specular 3D Reflection Glare Overlay */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
            style={{
              opacity: transformStyle.glareOpacity,
              background: `radial-gradient(circle at ${transformStyle.glareX}% ${transformStyle.glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(238, 43, 140, 0.15) 40%, transparent 70%)`,
              mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </div>
  );
}
