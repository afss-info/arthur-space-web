"use client";

import React, { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: { x: number; y: number; radius: number; opacity: number; fadeDir: number; speed: number }[] = [];
    let shootingStars: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // إنشاء 250 نجمة مضيئة
    for (let i = 0; i < 250; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        fadeDir: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 0.05,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // رسم النجوم المتلألئة
      stars.forEach((star) => {
        star.opacity += star.fadeDir * 0.005;
        if (star.opacity <= 0.1) {
          star.opacity = 0.1;
          star.fadeDir = 1;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        } else if (star.opacity >= 1) {
          star.opacity = 1;
          star.fadeDir = -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // رسم النجوم المتساقطة
      if (Math.random() < 0.015 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 3),
          length: Math.random() * 100 + 50,
          speed: Math.random() * 15 + 10,
          opacity: 1,
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        let ss = shootingStars[i];
        ss.x += ss.speed;
        ss.y += ss.speed;
        ss.opacity -= 0.02;

        if (ss.opacity <= 0 || ss.x > canvas.width || ss.y > canvas.height) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.length, ss.y - ss.length);
        
        const gradient = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.length, ss.y - ss.length);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#0a0a0a]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* تأثير السديم البنفسجي */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#6b21a8] opacity-10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#6b21a8] opacity-10 blur-[120px]" />
    </div>
  );
}
