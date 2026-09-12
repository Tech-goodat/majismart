import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: "oklch(62.3% 0.214 259.815)" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 3C12 3 6 9.2 6 14a6 6 0 0 0 12 0c0-4.8-6-11-6-11Z" />
              <path d="M9.5 15.5c.4 1.3 1.4 2 2.8 2.2" />
            </svg>
          </div>

          <span className="text-xl font-semibold tracking-tight">
            Majismart
          </span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <a href="#how-it-works" className="transition hover:text-slate-950">
            How it works
          </a>
          <a href="#features" className="transition hover:text-slate-950">
            Features
          </a>
          <a href="#contact" className="transition hover:text-slate-950">
            Contact
          </a>
        </div>

        <Link
          href="/auth/login"
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          style={{ backgroundColor: "oklch(62.3% 0.214 259.815)" }}
        >
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-600">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "oklch(62.3% 0.214 259.815)" }}
              />
              Smarter water management
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Know where
              <br />
              <span
                style={{ color: "oklch(62.3% 0.214 259.815)" }}
              >
                every drop
              </span>{" "}
              goes.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Majismart brings your water meters, consumption, payments and
              usage patterns into one simple system — giving you the information
              to act before problems become expensive.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link 
                href="/auth/signup"
                className="rounded-lg px-6 py-3.5 text-sm font-medium text-white transition hover:opacity-90"
                style={{
                  backgroundColor: "oklch(62.3% 0.214 259.815)",
                }}
              >
                Get started
              </Link>

              <Link
  href="/how"
  className="rounded-lg border border-slate-200 px-6 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
>
  See how it works
</Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-900">Live</span>
                telemetry
              </div>

              <span className="h-4 w-px bg-slate-200" />

              <div>
                <span className="font-medium text-slate-900">Real-time</span>{" "}
                monitoring
              </div>
            </div>
          </div>

          {/* Product panel */}
          <div className="relative">
            <div className="absolute -inset-8 -z-10 bg-slate-50 blur-3xl" />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.10)]">
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Meter overview
                  </p>
                  <p className="mt-1 font-semibold">MTR-00482</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: "oklch(62.3% 0.214 259.815)",
                    }}
                  />
                  Online
                </div>
              </div>

              {/* Balance */}
              <div className="px-6 py-7">
                <p className="text-sm text-slate-500">Available balance</p>

                <div className="mt-2 flex items-end justify-between">
                  <p className="text-4xl font-semibold tracking-tight">
                    KES 1,840
                  </p>

                  <span className="pb-1 text-sm text-slate-400">
                    Updated now
                  </span>
                </div>
              </div>

              {/* Consumption */}
              <div className="mx-6 rounded-xl bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Today's consumption</p>
                    <p className="mt-1 text-2xl font-semibold">18.4 L</p>
                  </div>

                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                    style={{
                      backgroundColor: "oklch(62.3% 0.214 259.815)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M12 3C12 3 6 9.2 6 14a6 6 0 0 0 12 0c0-4.8-6-11-6-11Z" />
                    </svg>
                  </div>
                </div>

                <div className="mt-5 flex h-20 items-end gap-1.5">
                  {[32, 45, 38, 58, 42, 67, 51, 73, 61, 78, 66, 84, 72, 92].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${height}%`,
                          backgroundColor:
                            index === 13
                              ? "oklch(62.3% 0.214 259.815)"
                              : "oklch(62.3% 0.214 259.815 / 0.18)",
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Activity */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Recent activity</p>
                  <button
                    className="text-sm font-medium"
                    style={{ color: "oklch(62.3% 0.214 259.815)" }}
                  >
                    View meter
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    ["07:42", "Kitchen usage", "8 min"],
                    ["09:15", "Shower", "6 min"],
                    ["13:28", "Kitchen usage", "4 min"],
                  ].map(([time, activity, duration]) => (
                    <div
                      key={time}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{time}</span>
                        <span className="text-sm text-slate-700">
                          {activity}
                        </span>
                      </div>

                      <span className="text-sm text-slate-400">
                        {duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl border-t border-slate-100" />

      {/* Intro */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
      >
        <div className="max-w-2xl">
          <p
            className="text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: "oklch(62.3% 0.214 259.815)" }}
          >
            One system
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            From raw meter readings to useful decisions.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Majismart turns continuous meter data into information you can
            actually use.
          </p>
        </div>

        <div
          id="how-it-works"
          className="mt-16 grid border-y border-slate-200 md:grid-cols-3"
        >
          {[
            {
              number: "01",
              title: "Live telemetry",
              text: "Receive readings from connected meters and keep a clear record of water consumption.",
            },
            {
              number: "02",
              title: "Understand usage",
              text: "See how water is being consumed over time instead of relying on occasional meter checks.",
            },
            {
              number: "03",
              title: "Act early",
              text: "Identify unusual patterns and give people the opportunity to investigate before losses grow.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="border-b border-slate-200 px-1 py-10 md:border-b-0 md:border-r md:px-8 md:last:border-r-0"
            >
              <p
                className="text-sm font-semibold"
                style={{ color: "oklch(62.3% 0.214 259.815)" }}
              >
                {item.number}
              </p>

              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>

              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-6 pb-16 lg:px-8">
        <div
          className="mx-auto max-w-7xl overflow-hidden rounded-2xl px-8 py-14 sm:px-12"
          style={{ backgroundColor: "oklch(62.3% 0.214 259.815)" }}
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl text-white">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Water data should work for you.
              </h2>

              <p className="mt-3 leading-7 text-white/80">
                Start with your meters. Build from there.
              </p>
            </div>

            <Link
              href="/auth/signup"
              className="w-fit rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-slate-100 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} Majismart</p>

        <p>Smarter water. Better decisions.</p>
      </footer>
    </main>
  );
};

export default Page;