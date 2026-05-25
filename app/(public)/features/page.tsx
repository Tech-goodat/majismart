"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ── Hexagonal grid animated background ── */
const HexCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const drawHex = (x: number, y: number, r: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + r * Math.cos(angle);
        const py = y + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0,200,240,${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const r = 40;
      const cols = Math.ceil(canvas.width / (r * 1.73)) + 2;
      const rows = Math.ceil(canvas.height / (r * 1.5)) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * r * 1.73 + (row % 2) * (r * 0.865);
          const y = row * r * 1.5;
          const dist = Math.sqrt((x - canvas.width / 2) ** 2 + (y - canvas.height / 2) ** 2);
          const wave = Math.sin(dist / 80 - t) * 0.5 + 0.5;
          const alpha = wave * 0.06;
          drawHex(x, y, r * 0.9, alpha);
        }
      }

      t += 0.015;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

/* ── Feature data ── */
const features = [
  {
    icon: "/balance.png",
    title: "Live Balance & Usage",
    tag: "Real-time",
    color: "#00C8F0",
    desc: "Your current balance, daily consumption, and spending trends surfaced front-and-center. See exactly how much water you've used today, this week, and this month — with color-coded alerts.",
    points: ["Hourly consumption updates", "Weekly trend graphs", "Anomaly spike alerts"],
  },
  {
    icon: "/payment.png",
    title: "Instant M-Pesa Payments",
    tag: "Payments",
    color: "#00E0BB",
    desc: "Top up in seconds via M-Pesa STK push. No copy-pasting paybill numbers. Set favourite amounts, receive push receipts, and browse your full payment history.",
    points: ["STK push integration", "Saved preset amounts", "Auto-generated receipts"],
  },
  {
    icon: "/reading.png",
    title: "Meter Reading Log",
    tag: "History",
    color: "#4FC3F7",
    desc: "Every reading is timestamped, delta-tracked, and color-coded by consumption level. Scroll months back on a clean timeline — perfect for dispute resolution.",
    points: ["Delta tracking per reading", "Photo evidence upload", "Month-over-month comparison"],
  },
  {
    icon: "/balance.png",
    title: "Multi-Property Management",
    tag: "Pro",
    color: "#00E0BB",
    desc: "Manage multiple water accounts from one app. Ideal for landlords, property managers, and families with separate meters at different locations.",
    points: ["Unlimited linked accounts", "Per-property dashboards", "Consolidated billing view"],
  },
  {
    icon: "/payment.png",
    title: "Smart Alerts & Notifications",
    tag: "Alerts",
    color: "#00C8F0",
    desc: "Get notified before you run out. Set custom low-balance thresholds, unusual usage warnings, and scheduled payment reminders.",
    points: ["Custom threshold alerts", "Daily usage summaries", "Scheduled top-up reminders"],
  },
  {
    icon: "/reading.png",
    title: "Offline Mode",
    tag: "Utility",
    color: "#4FC3F7",
    desc: "No signal? No problem. MajiSmart caches your balance and reading history locally so you always have access to your data, even in low-connectivity areas.",
    points: ["Local data caching", "Background sync on reconnect", "Works on 2G networks"],
  },
];

const FeatureCard = ({ f, i }: { f: typeof features[0]; i: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border p-6 flex flex-col gap-4 cursor-default transition-all duration-300 animate-fade-up"
      style={{
        animationDelay: `${i * 0.08}s`,
        borderColor: hovered ? `${f.color}40` : "rgba(255,255,255,0.08)",
        background: hovered ? "rgba(10,25,30,0.85)" : "rgba(10,18,22,0.6)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
          <Image src={f.icon} alt={f.title} width={28} height={28} className="w-7 h-7 object-contain" />
        </div>
        <span className="text-xs font-bold tracking-widest px-3 py-1 rounded-full" style={{ color: f.color, background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
          {f.tag}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
      </div>

      <ul className="flex flex-col gap-2 mt-auto pt-2 border-t border-white/6">
        {f.points.map((p) => (
          <li key={p} className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: f.color }} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Features = () => (
  <div className="min-h-screen flex flex-col items-center text-white overflow-x-hidden bg-[#030b10]">
    <HexCanvas />

    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500/8 blur-[120px]" />
    </div>

    {/* header */}
    <section className="w-full max-w-6xl px-5 lg:px-10 pt-28 pb-16 flex flex-col items-center text-center gap-5">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
        FEATURES
      </div>

      <h1 className="text-6xl sm:text-7xl font-bold leading-[1.05]">
        Everything you need<br />
        <span style={{ background: "linear-gradient(135deg,#00C8F0,#00E0BB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          to manage water
        </span>
      </h1>

      <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
        Six powerful features engineered around how Kenyan households actually pay, track, and manage their water.
      </p>
    </section>

    {/* grid */}
    <section className="w-full max-w-6xl px-5 lg:px-10 pb-28 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((f, i) => <FeatureCard key={f.title} f={f} i={i} />)}
    </section>

    {/* bottom CTA strip */}
    <div className="w-full max-w-6xl px-5 lg:px-10 pb-20">
      <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Ready to get started?</h3>
          <p className="text-gray-400 text-sm mt-1">All features free. Always.</p>
        </div>
        <a href="/download" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-[#001a1f] transition-all hover:opacity-85 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#00C8F0,#00E0BB)" }}>
          Download Free
        </a>
      </div>
    </div>
  </div>
);

export default Features;