import React from "react";
import Link from "next/link";

const blue = "oklch(62.3% 0.214 259.815)";

const steps = [
  {
    number: "01",
    title: "Your meter sends data",
    description:
      "Connected water meters continuously produce readings such as flow rate, consumption and status.",
    detail: "Flow rate • Consumption • Status • Timestamp",
  },
  {
    number: "02",
    title: "Data reaches Majismart",
    description:
      "Telemetry travels through the MQTT messaging layer and arrives at the Majismart backend in real time.",
    detail: "Meter → MQTT → Majismart",
  },
  {
    number: "03",
    title: "We build the picture",
    description:
      "Every reading becomes part of a historical record, allowing the system to understand how water is being used.",
    detail: "Live data + Historical usage",
  },
  {
    number: "04",
    title: "Unusual patterns stand out",
    description:
      "Majismart can compare current behaviour with established usage patterns and identify activity worth investigating.",
    detail: "Duration • Frequency • Time of day",
  },
  {
    number: "05",
    title: "You can act",
    description:
      "Instead of discovering a problem much later, operators can investigate unusual usage while it is still happening.",
    detail: "Detect → Investigate → Respond",
  },
];

const Page = () => {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: blue }}
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
        </Link>

        <Link
          href="/auth/login"
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          style={{ backgroundColor: blue }}
        >
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-20 text-center lg:px-8 lg:pt-28">
        <p
          className="text-sm font-semibold uppercase tracking-[0.16em]"
          style={{ color: blue }}
        >
          How Majismart works
        </p>

        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
          From a meter reading
          <br />
          to a{" "}
          <span style={{ color: blue }}>better decision.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600">
          Majismart connects the physical water meter to the information you
          need to understand consumption, spot unusual behaviour and respond
          early.
        </p>
      </section>

      {/* Main flow */}
      <section className="mx-auto max-w-6xl px-6 pb-28 lg:px-8">
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[23px] top-8 hidden h-[calc(100%-64px)] w-px md:block"
            style={{ backgroundColor: "oklch(62.3% 0.214 259.815 / 0.2)" }}
          />

          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative grid gap-6 md:grid-cols-[48px_1fr]"
              >
                {/* Number */}
                <div
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white text-sm font-semibold"
                  style={{
                    borderColor: "oklch(62.3% 0.214 259.815 / 0.3)",
                    color: blue,
                  }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-slate-300 sm:p-8">
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                    <div className="max-w-2xl">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        {step.title}
                      </h2>

                      <p className="mt-3 text-base leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </div>

                    <span
                      className="w-fit rounded-md px-3 py-1.5 text-xs font-medium"
                      style={{
                        backgroundColor:
                          "oklch(62.3% 0.214 259.815 / 0.08)",
                        color: blue,
                      }}
                    >
                      {step.detail}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real example */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-[0.16em]"
                style={{ color: blue }}
              >
                A simple example
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Not every unusual reading is a leak.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                That's why Majismart is designed to understand behaviour, not
                simply react to a single number.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    MTR-00482
                  </p>
                  <p className="mt-1 font-semibold">Usage detected</p>
                </div>

                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor:
                      "oklch(62.3% 0.214 259.815 / 0.1)",
                    color: blue,
                  }}
                >
                  Investigate
                </span>
              </div>

              <div className="py-7">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Continuous flow
                    </p>
                    <p className="mt-1 text-4xl font-semibold">21 min</p>
                  </div>

                  <p className="text-sm text-slate-400">02:14 AM</p>
                </div>

                <div className="mt-7 h-24 rounded-lg bg-slate-50 p-3">
                  <div className="flex h-full items-end gap-1">
                    {[25, 32, 28, 37, 42, 45, 50, 58, 61, 68, 76, 82, 90].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-sm"
                          style={{
                            height: `${height}%`,
                            backgroundColor:
                              index > 8
                                ? blue
                                : "oklch(62.3% 0.214 259.815 / 0.18)",
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <p className="text-sm leading-6 text-slate-600">
                  This doesn't automatically mean there is a leak. The system
                  can ask whether the household is currently using water before
                  taking further action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center">
          <p
            className="text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: blue }}
          >
            Under the hood
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            One connected flow.
          </h2>
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-3 md:flex-row">
          {[
            "Water meter",
            "MQTT",
            "Majismart",
            "Intelligence",
            "Action",
          ].map((item, index) => (
            <React.Fragment key={item}>
              <div className="w-full rounded-xl border border-slate-200 bg-white px-6 py-5 text-center font-medium shadow-sm md:w-auto">
                {item}
              </div>

              {index < 4 && (
                <span
                  className="hidden text-xl md:block"
                  style={{ color: blue }}
                >
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16 lg:px-8">
        <div
          className="mx-auto max-w-7xl rounded-2xl px-8 py-14 sm:px-12"
          style={{ backgroundColor: blue }}
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl text-white">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to see your water data differently?
              </h2>

              <p className="mt-3 leading-7 text-white/80">
                Start with the meters you already have.
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
        <Link href="/" className="font-medium text-slate-900">
          Majismart
        </Link>

        <p>Smarter water. Better decisions.</p>
      </footer>
    </main>
  );
};

export default Page;