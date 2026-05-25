"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Animated particle canvas background ── */
const WaterCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* floating bubbles */
    const bubbles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.2 + Math.random() * 0.5),
      alpha: 0.1 + Math.random() * 0.4,
    }));

    /* flowing sine lines */
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* sine wave lines */
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,${180 + i * 15},${220 + i * 5},${0.04 + i * 0.005})`;
        ctx.lineWidth = 1.5;
        for (let x = 0; x <= canvas.width; x += 4) {
          const y =
            canvas.height * (0.3 + i * 0.1) +
            Math.sin((x / canvas.width) * Math.PI * 3 + t + i) * (30 + i * 10) +
            Math.sin((x / canvas.width) * Math.PI * 6 + t * 1.3) * 10;
          i === 0 && x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      /* bubbles */
      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,200,240,${b.alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        b.x += b.vx;
        b.y += b.vy;
        if (b.y < -10) { b.y = canvas.height + 10; b.x = Math.random() * canvas.width; }
        if (b.x < 0 || b.x > canvas.width) b.vx *= -1;
      });

      t += 0.008;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none opacity-70" />;
};

/* ── QR mock ── */
const QRPlaceholder = () => (
  <div className="w-28 h-28 rounded-2xl border border-cyan-500/30 bg-white/5 grid place-items-center p-2">
    <div className="grid grid-cols-7 gap-[2px] w-full h-full">
      {Array.from({ length: 49 }).map((_, i) => {
        const corners = [0,1,2,7,8,9,14,15,16,32,33,34,39,40,41,46,47,48];
        const dots = [3,5,10,12,21,24,27,36,38,43,45];
        const fill = corners.includes(i) ? "bg-cyan-400" : dots.includes(i) ? "bg-teal-300" : "bg-white/10";
        return <div key={i} className={`rounded-[1px] ${fill}`} />;
      })}
    </div>
  </div>
);

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "4.9★", label: "App Store Rating" },
  { value: "99.8%", label: "Uptime" },
  { value: "< 2s", label: "Payment Speed" },
];

const Download = () => (
  <div className="min-h-screen flex flex-col items-center text-white overflow-x-hidden bg-[#030b10]">
    <WaterCanvas />

    {/* fixed orbs */}
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute w-[500px] h-[500px] -top-32 -right-32 rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bottom-0 -left-24 rounded-full bg-teal-400/8 blur-[90px]" style={{ animation: "drift 18s ease-in-out infinite alternate" }} />
    </div>

    {/* hero */}
    <section className="w-full max-w-6xl px-5 lg:px-10 pt-28 pb-20 flex flex-col items-center text-center gap-6">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 text-xs font-semibold tracking-widest uppercase animate-fade-up">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        Now available worldwide
      </div>

      <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
        Download<br />
        <span style={{ background: "linear-gradient(135deg,#00C8F0,#00E0BB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          MajiSmart
        </span>
      </h1>

      <p className="text-gray-400 text-lg max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
        Free to download. No subscriptions. No hidden fees. Just smarter water management in your hands.
      </p>

      {/* store buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        {[
          { logo: "/applestore.png", sub: "Download on the", name: "App Store", href: "#" },
          { logo: "/playstore.png", sub: "Get it on", name: "Google Play", href: "#" },
        ].map((s) => (
          <Link key={s.name} href={s.href}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/8 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-200 min-w-[200px]">
            <Image src={s.logo} alt={s.name} width={32} height={32} className="w-8 h-auto" />
            <div className="text-left">
              <p className="text-xs text-gray-400">{s.sub}</p>
              <p className="text-base font-semibold text-white">{s.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* QR */}
      <div className="flex flex-col items-center gap-3 mt-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <QRPlaceholder />
        <p className="text-xs text-gray-500">Scan to download instantly</p>
      </div>
    </section>

    {/* stats strip */}
    <div className="w-full max-w-6xl px-5 lg:px-10 pb-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={s.label}
          className="rounded-2xl border border-white/8 bg-white/3 p-6 flex flex-col items-center text-center animate-fade-up"
          style={{ animationDelay: `${0.1 * i}s` }}>
          <span className="text-4xl font-bold" style={{ background: "linear-gradient(135deg,#00C8F0,#00E0BB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {s.value}
          </span>
          <span className="text-sm text-gray-400 mt-1">{s.label}</span>
        </div>
      ))}
    </div>

    {/* feature checklist */}
    <div className="w-full max-w-6xl px-5 lg:px-10 pb-28">
      <div className="rounded-3xl border border-white/8 bg-white/2 p-8 grid sm:grid-cols-2 gap-4">
        <h3 className="sm:col-span-2 text-2xl font-bold text-white mb-2">Everything included. Always free.</h3>
        {[
          "Real-time balance tracking",
          "M-Pesa one-tap payments",
          "Meter reading history",
          "Low balance push alerts",
          "Multiple property accounts",
          "Downloadable receipts",
          "Offline mode support",
          "Biometric login",
        ].map((f) => (
          <div key={f} className="flex items-center gap-3 text-gray-300 text-sm">
            <span className="w-5 h-5 rounded-full border border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs">✓</span>
            {f}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Download;