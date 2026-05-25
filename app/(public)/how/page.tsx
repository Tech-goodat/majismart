"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ── Flowing grid lines background ── */
const FlowCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number, t = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    /* moving grid of dots */
    const SPACING = 60;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / SPACING) + 2;
      const rows = Math.ceil(canvas.height / SPACING) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING;
          const by = r * SPACING;
          const wave = Math.sin(c * 0.4 + t) * Math.cos(r * 0.4 + t * 0.7);
          const alpha = (wave + 1) / 2 * 0.08;
          const radius = 1 + wave * 0.8;

          ctx.beginPath();
          ctx.arc(bx, by, Math.max(0.3, radius), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,200,240,${alpha})`;
          ctx.fill();
        }
      }

      /* flowing diagonal lines */
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const xOff = ((t * 30 + i * 120) % (canvas.width + 200)) - 100;
        ctx.moveTo(xOff, 0);
        ctx.lineTo(xOff + canvas.height * 0.6, canvas.height);
        ctx.strokeStyle = `rgba(0,200,240,${0.015 + i * 0.005})`;
        ctx.stroke();
      }

      t += 0.012;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none" />;
};

const steps = [
  {
    num: "01",
    title: "Download & Register",
    subtitle: "30 seconds flat",
    desc: "Install MajiSmart from the App Store or Google Play. Sign up with just your phone number — no email, no paperwork, no office visit required.",
    detail: "Your number is your identity. We send a one-time OTP and you're in. Biometric login is enabled automatically on supported devices.",
    icon: "📲",
    color: "#00C8F0",
  },
  {
    num: "02",
    title: "Link Your Meter Account",
    subtitle: "Your utility number is all you need",
    desc: "Enter your water utility account number. MajiSmart instantly fetches your meter details, balance, and reading history.",
    detail: "Add multiple accounts for different properties. Rename them anything you like — 'Home', 'Rental Unit A', 'Mum's Place'.",
    icon: "🔗",
    color: "#00E0BB",
  },
  {
    num: "03",
    title: "Monitor in Real-Time",
    subtitle: "Always in the know",
    desc: "Your dashboard updates automatically. See your current balance, this month's consumption, and get alerted when you're running low.",
    detail: "Set custom low-balance alerts. Compare your usage month over month. Spot unusual spikes before they become a problem.",
    icon: "📊",
    color: "#4FC3F7",
  },
  {
    num: "04",
    title: "Pay with One Tap",
    subtitle: "M-Pesa. Done.",
    desc: "Tap Pay, choose an amount, and confirm on your phone. The M-Pesa STK push arrives instantly — no copy-pasting paybill numbers ever again.",
    detail: "Receipts are stored automatically. Export to PDF for landlord statements. Set up recurring top-ups so you never run dry.",
    icon: "💸",
    color: "#00C8F0",
  },
];

const StepCard = ({ step, i, active, onActivate }: {
  step: typeof steps[0]; i: number; active: boolean; onActivate: () => void;
}) => (
  <div
    onClick={onActivate}
    className="rounded-2xl border p-6 flex gap-5 cursor-pointer transition-all duration-300 animate-fade-up"
    style={{
      animationDelay: `${i * 0.1}s`,
      borderColor: active ? `${step.color}50` : "rgba(255,255,255,0.08)",
      background: active ? `rgba(0,0,0,0.6)` : "rgba(10,18,22,0.5)",
      boxShadow: active ? `0 0 30px ${step.color}12` : "none",
    }}
  >
    {/* connector line + number */}
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black transition-all duration-300"
        style={{
          background: active ? `${step.color}20` : "rgba(255,255,255,0.05)",
          border: `2px solid ${active ? step.color : "rgba(255,255,255,0.1)"}`,
          color: active ? step.color : "#6b7280",
        }}
      >
        {step.num}
      </div>
      {i < steps.length - 1 && (
        <div className="w-px flex-1 min-h-[2rem]" style={{ background: active ? `linear-gradient(${step.color},transparent)` : "rgba(255,255,255,0.06)" }} />
      )}
    </div>

    {/* content */}
    <div className="flex-1 pb-2">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-xl">{step.icon}</span>
        <span className="text-xs font-semibold tracking-widest" style={{ color: step.color }}>{step.subtitle}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
      {active && (
        <p className="text-gray-500 text-xs leading-relaxed mt-3 pt-3 border-t border-white/6 animate-fade-up">
          {step.detail}
        </p>
      )}
    </div>
  </div>
);

const How = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center text-white overflow-x-hidden bg-[#030b10]">
      <FlowCanvas />

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] top-1/4 -right-40 rounded-full bg-teal-500/8 blur-[110px]" />
        <div className="absolute w-[400px] h-[400px] bottom-10 -left-32 rounded-full bg-cyan-500/6 blur-[100px]" />
      </div>

      {/* header */}
      <section className="w-full max-w-6xl px-5 lg:px-10 pt-28 pb-12 flex flex-col items-center text-center gap-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
          HOW IT WORKS
        </div>
        <h1 className="text-6xl sm:text-7xl font-bold leading-[1.05]">
          Set up in<br />
          <span style={{ background: "linear-gradient(135deg,#00C8F0,#00E0BB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            under 2 minutes
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
          Four simple steps — tap through them below to see exactly what happens at each stage.
        </p>
      </section>

      {/* two column layout */}
      <section className="w-full max-w-6xl px-5 lg:px-10 pb-28 grid lg:grid-cols-2 gap-10 items-start">

        {/* steps */}
        <div className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <StepCard key={s.num} step={s} i={i} active={active === i} onActivate={() => setActive(i)} />
          ))}
        </div>

        {/* sticky image panel */}
        <div className="lg:sticky lg:top-28 flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center w-full">
            {/* glow */}
            <div className="absolute w-72 h-72 rounded-full blur-[80px] opacity-20 transition-all duration-500"
              style={{ background: `radial-gradient(circle, ${steps[active].color}, transparent 70%)` }} />
            <Image src="/smartimage.png" alt="App preview" width={320} height={420}
              className="relative z-10 w-64 sm:w-72 lg:w-80 h-auto" />
          </div>

          {/* step indicator dots */}
          <div className="flex gap-2">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: active === i ? 24 : 8, height: 8,
                  background: active === i ? steps[active].color : "rgba(255,255,255,0.15)",
                }} />
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 max-w-xs">
            {steps[active].detail}
          </p>
        </div>

      </section>
    </div>
  );
};

export default How;