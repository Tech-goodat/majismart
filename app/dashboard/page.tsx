"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  Settings,
  LogOut,
  Droplets,
  Wifi,
  WifiOff,
  AlertTriangle,
  CreditCard,
  Activity,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL
const WS_URL = process.env.NEXT_PUBLIC_WS_URL

type User = {
  username: string;
  email: string;
};

type Meter = {
  id: number;
  meter_number: string;
  status: string;
  balance: string | number;
};

type Telemetry = {
  id: number;
  meter: number;
  flow_rate: number;
  total_consumption: number;
  timestamp: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [meter, setMeter] = useState<Meter | null>(null);
  const [latest, setLatest] = useState<Telemetry | null>(null);
  const [telemetry, setTelemetry] = useState<Telemetry[]>([]);

  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser =
      localStorage.getItem("auth_user") ||
      sessionStorage.getItem("auth_user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.error("Could not read stored user.");
      }
    }

    const fetchDashboard = async () => {
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");

      if (!token) {
        window.location.href = "/auth/login";
        return;
      }

      try {
        const headers = {
          Authorization: `Token ${token}`,
        };

        const [meterResponse, latestResponse, telemetryResponse] =
          await Promise.all([
            fetch(`${API_URL}/meters/mine/`, { headers }),
            fetch(`${API_URL}/meters/mine/latest/`, { headers }),
            fetch(`${API_URL}/meters/mine/telemetry/`, { headers }),
          ]);

        if (!meterResponse.ok) {
          throw new Error("Could not load your meter.");
        }

        const meterData = await meterResponse.json();

        setMeter(meterData);

        if (latestResponse.ok) {
          const latestData = await latestResponse.json();
          setLatest(latestData);
        }

        if (telemetryResponse.ok) {
          const telemetryData = await telemetryResponse.json();
          setTelemetry(telemetryData);
        }
      } catch (err) {
        console.error(err);
        setError("We couldn't load your water data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // WebSocket connection
  useEffect(() => {
    if (!meter?.id) {
      return;
    }

    const socket = new WebSocket(
      `${WS_URL}/ws/telemetry/${meter.id}/`
    );

    socket.onopen = () => {
      console.log("Majismart WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data: Telemetry = JSON.parse(event.data);

      console.log("Live telemetry:", data);

      setLatest(data);

      setTelemetry((previous) => [
        data,
        ...previous,
      ].slice(0, 50));
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("Majismart WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [meter?.id]);

  const handleLogout = async () => {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");

    try {
      if (token) {
        await fetch(`${API_URL}/users/logout/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");

      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_user");

      window.location.href = "/auth/login";
    }
  };

  const username = user?.username || "User";
  const initial = username.charAt(0).toUpperCase();

  const balance = Number(meter?.balance || 0);
  const totalConsumption = Number(latest?.total_consumption || 0);
  const currentFlow = Number(latest?.flow_rate || 0);

  const isOnline = meter?.status?.toUpperCase() === "ONLINE";

  const lastReading = latest?.timestamp
    ? new Date(latest.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No reading";

  /*
   * We display the latest cumulative consumption.
   *
   * IMPORTANT:
   * total_consumption is the meter's lifetime/cumulative value.
   * We do NOT call this "today's usage".
   */
  const formattedConsumption = totalConsumption.toFixed(2);

  /*
   * Latest telemetry first.
   */
  const recentTelemetry = telemetry.slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Your water account
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back, {username} 👋
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Here&apos;s the latest from your meter.
            </p>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pr-3 shadow-sm transition hover:border-blue-200"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {initial}
              </div>

              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition ${
                  showMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {showMenu && (
              <div className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-slate-100 px-4 py-4">
                  <p className="text-sm font-semibold">
                    {username}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {user?.email}
                  </p>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      window.location.href = "/auth/profile";
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Settings className="h-4 w-4" />
                    Edit profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* BALANCE HERO */}
        <section className="rounded-3xl bg-blue-600 p-6 text-white shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-blue-100">
                <CreditCard className="h-5 w-5" />

                <span className="text-sm font-medium">
                  Water balance
                </span>
              </div>

              {loading ? (
                <div className="mt-4 h-10 w-40 animate-pulse rounded-lg bg-blue-500" />
              ) : (
                <>
                  <p className="mt-3 text-4xl font-bold tracking-tight">
                    KES{" "}
                    {balance.toLocaleString("en-KE", {
                      minimumFractionDigits: 2,
                    })}
                  </p>

                  <p className="mt-2 text-sm text-blue-100">
                    Available on your meter
                  </p>
                </>
              )}
            </div>

            <button className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50">
              Top up
            </button>
          </div>
        </section>

        {/* LIVE STATS */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">

          {/* TOTAL CONSUMPTION */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-600" />

                <span className="text-sm font-medium text-slate-500">
                  Total consumed
                </span>
              </div>

              <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-600">
                ALL TIME
              </span>
            </div>

            {loading ? (
              <div className="mt-4 h-9 w-32 animate-pulse rounded-lg bg-slate-100" />
            ) : (
              <>
                <p className="mt-4 text-3xl font-bold tracking-tight">
                  {formattedConsumption}
                  <span className="ml-1 text-base font-medium text-slate-400">
                    L
                  </span>
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Cumulative meter consumption
                </p>
              </>
            )}
          </div>

          {/* CURRENT FLOW */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />

                <span className="text-sm font-medium text-slate-500">
                  Current flow
                </span>
              </div>

              <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-600">
                LIVE
              </span>
            </div>

            {loading ? (
              <div className="mt-4 h-9 w-32 animate-pulse rounded-lg bg-slate-100" />
            ) : (
              <>
                <p className="mt-4 text-3xl font-bold tracking-tight">
                  {currentFlow.toFixed(2)}
                  <span className="ml-1 text-base font-medium text-slate-400">
                    L/s
                  </span>
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Latest reported flow
                </p>
              </>
            )}
          </div>

          {/* METER */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="h-5 w-5 text-emerald-600" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-500" />
                )}

                <span className="text-sm font-medium text-slate-500">
                  My meter
                </span>
              </div>

              <span
                className={`flex items-center gap-1.5 text-xs font-semibold ${
                  isOnline
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isOnline
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                />

                {meter?.status || "Unknown"}
              </span>
            </div>

            {loading ? (
              <div className="mt-4 h-8 w-32 animate-pulse rounded-lg bg-slate-100" />
            ) : (
              <>
                <p className="mt-4 text-2xl font-bold tracking-tight">
                  {meter?.meter_number || "—"}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Last reading: {lastReading}
                </p>
              </>
            )}
          </div>
        </section>

        {/* USAGE HISTORY */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Water usage
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recent readings from your meter.
              </p>
            </div>

            <Droplets className="h-5 w-5 text-blue-600" />
          </div>

          {recentTelemetry.length === 0 ? (
            <div className="mt-8 rounded-xl bg-slate-50 px-4 py-8 text-center">
              <Droplets className="mx-auto h-6 w-6 text-slate-300" />

              <p className="mt-3 text-sm font-medium text-slate-600">
                No telemetry yet
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Your meter readings will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {recentTelemetry.map((reading) => (
                <div
                  key={reading.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                      <Droplets className="h-4 w-4 text-blue-600" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {reading.flow_rate.toFixed(2)} L/s
                      </p>

                      <p className="text-xs text-slate-400">
                        Total:{" "}
                        {reading.total_consumption.toFixed(2)} L
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400">
                    {new Date(
                      reading.timestamp
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* STATUS / ALERT */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">

          {/* CONNECTION */}
          <div
            className={`rounded-2xl border p-5 ${
              isOnline
                ? "border-emerald-200 bg-emerald-50/60"
                : "border-red-200 bg-red-50/60"
            }`}
          >
            <div className="flex gap-3">
              {isOnline ? (
                <Wifi className="mt-0.5 h-5 w-5 text-emerald-600" />
              ) : (
                <WifiOff className="mt-0.5 h-5 w-5 text-red-500" />
              )}

              <div>
                <p
                  className={`text-sm font-semibold ${
                    isOnline
                      ? "text-emerald-700"
                      : "text-red-600"
                  }`}
                >
                  {isOnline
                    ? "Your meter is online"
                    : "Your meter is offline"}
                </p>

                <p
                  className={`mt-1 text-xs leading-5 ${
                    isOnline
                      ? "text-emerald-700/70"
                      : "text-red-600/70"
                  }`}
                >
                  {isOnline
                    ? "Your meter is sending readings normally."
                    : "We haven't received a normal reading from your meter."}
                </p>
              </div>
            </div>
          </div>

          {/* SIMPLE ALERT */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Water monitoring
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your meter is being monitored for unusual consumption
                  patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {meter?.meter_number || "Your meter"}
          </span>

          <span>
            Your water, made smarter.
          </span>
        </footer>

      </div>
    </main>
  );
};

export default Dashboard;