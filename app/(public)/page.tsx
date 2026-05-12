import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GiRoundStar } from "react-icons/gi";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-white overflow-x-hidden">

      {/* ── BACKGROUND ORBS ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden flex flex-col lg:grid lg:grid-cols-2 gap-10 w-full max-w-6xl items-center px-5 pt-16 pb-12 lg:px-10 animate-fade-up">

        {/* Water rings */}
        <div className="hero-rings">
          <div className="ring ring-1" />
          <div className="ring ring-2" />
          <div className="ring ring-3" />
          <div className="ring ring-4" />
        </div>

        {/* LEFT */}
        <div className="flex w-full flex-col items-center lg:items-start text-center lg:text-left">

          {/* Mobile logo */}
          <Link href="/" className="text-2xl flex md:hidden mb-8 font-bold gradient-text">
            MajiSmart
          </Link>

          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/8 text-teal-400 text-sm mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400" />
            </span>
            Now available in Kenya
          </div>

          {/* Headline */}
          <div className="flex flex-col w-full animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">Smart Water</h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight gradient-text">Management</h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">in Your</h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">Pocket</h1>
          </div>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Monitor your water balance, track meter readings, and pay your bills
            in seconds — all from one beautifully designed app.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/download" className="btn-primary w-full text-lg lg:w-50 py-2">Get the App</Link>
            <Link href="/auth/login" className="btn-secondary w-full lg:w-30 text-lg py-2">Sign In</Link>
          </div>

        </div>

        {/* RIGHT — image */}
        <div className="flex justify-center lg:justify-end w-full animate-fade-up" style={{ animationDelay: '0.25s' }}>
          <div className="image-glow-wrap">
            <Image src="/rename.png" alt="MajiSmart app preview" width={400} height={500} className="w-64 sm:w-80 lg:w-96 h-auto relative z-10" priority />
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════
          FEATURES SECTION
      ══════════════════════════════════════════ */}
      <section className="w-full max-w-6xl px-5 lg:px-10 py-16 animate-fade-up" style={{ animationDelay: '0.1s' }}>

        <div className="flex flex-col items-center text-center mb-12">
          <span className="label-tag mb-3">FEATURES</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-100 leading-tight">Everything you need</h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-100 leading-tight">to manage your water</h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-lg mt-4 leading-relaxed">
            From real-time meter readings to one-tap M-Pesa payments — MajiSmart puts full control in your hands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="feature-card animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="feature-icon-wrap">
              <Image src="/balance.png" alt="Balance" width={48} height={48} className="w-12 h-12 object-contain" />
            </div>
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">Live Balance & Usage</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Your current balance, daily consumption, and spending trends surfaced front-and-center. No hunting.</p>
          </div>

          <div className="feature-card animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <div className="feature-icon-wrap">
              <Image src="/payment.png" alt="Payment" width={48} height={48} className="w-12 h-12 object-contain" />
            </div>
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">Instant M-Pesa Payments</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Top up your water account in seconds via M-Pesa. Set preferred accounts, get push notifications, and keep full receipt history.</p>
          </div>

          <div className="feature-card animate-fade-up sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.35s' }}>
            <div className="feature-icon-wrap">
              <Image src="/reading.png" alt="Reading" width={48} height={48} className="w-12 h-12 object-contain" />
            </div>
            <h3 className="text-lg font-semibold text-white mt-4 mb-2">Meter Reading Log</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Every reading — timestamped, delta-tracked, and color-coded by consumption level. Scroll back months in a clean timeline view.</p>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS SECTION
      ══════════════════════════════════════════ */}
      <section className="w-full max-w-6xl px-5 lg:px-10 py-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">

          {/* Left text */}
          <div className="flex flex-col w-full animate-fade-up">
            <span className="label-tag mb-4">HOW IT WORKS</span>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">Set up in</h2>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight gradient-text">under 2</h2>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">minutes</h2>
            <p className="text-gray-400 text-base mt-4 leading-relaxed max-w-sm">
              Link your water account number and you're done. MajiSmart handles the rest automatically.
            </p>

            <div className="flex flex-col gap-6 mt-10">
              {[
                { num: '01', title: 'Download & register', desc: 'Create an account with your phone number in seconds. No paperwork, no office visit.' },
                { num: '02', title: 'Link your meter account', desc: 'Enter your water utility account number. Add multiple properties if needed.' },
                { num: '03', title: 'Monitor & pay with ease', desc: 'Get notified of low balance, review readings, and pay directly from your phone — anytime, anywhere.' },
              ].map((step) => (
                <div key={step.num} className="step-card animate-fade-up">
                  <span className="step-number">{step.num}</span>
                  <div>
                    <p className="text-base font-semibold text-white">{step.title}</p>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="flex justify-center w-full animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="image-glow-wrap">
              <Image src="/rename.png" alt="App preview" width={300} height={400} className="w-56 sm:w-72 lg:w-80 h-auto relative z-10" />
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          PAYMENTS SECTION
      ══════════════════════════════════════════ */}
      <section className="w-full max-w-6xl px-5 lg:px-10 py-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">

          {/* Image — shows first on mobile */}
          <div className="flex justify-center w-full order-2 lg:order-1 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="image-glow-wrap">
              <Image src="/rename.png" alt="Payment preview" width={300} height={400} className="w-56 sm:w-72 lg:w-80 h-auto relative z-10" />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col w-full order-1 lg:order-2 animate-fade-up">
            <span className="label-tag mb-4">PAYMENTS</span>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">Pay your</h2>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight gradient-text">water bill</h2>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">in 3 taps</h2>

            <p className="text-gray-400 text-base mt-5 leading-relaxed max-w-sm">
              Native M-Pesa integration means zero friction. Select an amount, confirm, done. Receipts stored automatically.
            </p>

            <ul className="flex flex-col gap-4 mt-8">
              {[
                'M-Pesa STK push — no copy-pasting paybill numbers',
                'Preset amounts (KES 200, 500, 1000) for faster top-ups',
                'Instant balance update after every transaction',
                'Full transaction history with downloadable receipts',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                  <GiRoundStar className="text-cyan-400 mt-0.5 shrink-0 text-base" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════ */}
      <section className="w-full max-w-6xl px-5 lg:px-10 py-20 flex flex-col items-center text-center animate-fade-up">
        <span className="label-tag mb-4">GET STARTED TODAY</span>

        <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight">Your water.</h2>
        <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight gradient-text">Your control.</h2>

        <p className="text-gray-400 text-base sm:text-lg mt-6 max-w-md leading-relaxed">
          Download MajiSmart free. No subscription, no hidden charges — just smarter water management.
        </p>

        <div className="flex flex-col w-full lg:flex-row gap-4 justify-center mt-10">
          <Link href="/download" className="w-full lg:w-70 store-btn">
            <Image src="/applestore.png" alt="Apple" width={28} height={28} className="w-7 h-auto" />
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-400">Download on the</span>
              <span className="text-sm font-semibold text-white">App Store</span>
            </div>
          </Link>

          <Link href="/download" className="store-btn lg:w-70 w-full">
            <Image src="/playstore.png" alt="Google Play" width={28} height={28} className="w-7 h-auto" />
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-400">Find it on</span>
              <span className="text-sm font-semibold text-white">Google Play</span>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;