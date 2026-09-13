"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Droplets,
  Shield,
  Lock,
  LogOut,
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

type UserData = {
  id: number;
  username: string;
  email: string;
  meter_number?: string | null;
};

type Meter = {
  meter_number: string;
  status: string;
  balance: string | number;
};

const ProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [meter, setMeter] = useState<Meter | null>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
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

        const [userResponse, meterResponse] = await Promise.all([
          fetch(`${API_URL}/users/me/`, {
            headers,
          }),
          fetch(`${API_URL}/meters/mine/`, {
            headers,
          }),
        ]);

        if (!userResponse.ok) {
          throw new Error("Could not load your profile.");
        }

        const userData = await userResponse.json();

        setUser(userData);
        setUsername(userData.username || "");
        setEmail(userData.email || "");

        if (meterResponse.ok) {
          const meterData = await meterResponse.json();
          setMeter(meterData);
        }
      } catch (err) {
        console.error(err);
        setError("We couldn't load your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    setSaving(true);
    setSaved(false);
    setError("");

    /*
      Profile update endpoint will be connected here later.

      For now we update the local user data so the UI behaves correctly.
    */

    await new Promise((resolve) => setTimeout(resolve, 700));

    const updatedUser = {
      ...user,
      username,
      email,
    };

    setUser(updatedUser as UserData);

    const storageUser =
      localStorage.getItem("auth_user") ||
      sessionStorage.getItem("auth_user");

    if (storageUser) {
      try {
        const parsedUser = JSON.parse(storageUser);

        const updatedStorageUser = {
          ...parsedUser,
          username,
          email,
        };

        if (localStorage.getItem("auth_user")) {
          localStorage.setItem(
            "auth_user",
            JSON.stringify(updatedStorageUser)
          );
        }

        if (sessionStorage.getItem("auth_user")) {
          sessionStorage.setItem(
            "auth_user",
            JSON.stringify(updatedStorageUser)
          );
        }
      } catch (error) {
        console.error("Could not update stored user:", error);
      }
    }

    setSaving(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

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

  const initial =
    username?.charAt(0).toUpperCase() || "U";

  const isOnline =
    meter?.status?.toUpperCase() === "ONLINE";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}
        <header className="mb-8">
          <button
            onClick={() => {
              window.location.href = "/dashboard";
            }}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </button>

          <h1 className="text-3xl font-semibold tracking-tight">
            Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your Majismart account and water service.
          </p>
        </header>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* PROFILE HERO */}
        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              {loading ? "..." : initial}
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {loading ? "Loading..." : username}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {loading
                  ? "Loading your account"
                  : "Your Majismart account"}
              </p>
            </div>
          </div>
        </section>

        {/* PERSONAL INFORMATION */}
        <form onSubmit={handleSave}>
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                  <User className="h-4 w-4 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Personal information
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Update the information associated with your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-6">

              {/* USERNAME */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Username
                </label>

                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) =>
                      setUsername(event.target.value)
                    }
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* SAVE */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {saved && (
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Changes saved
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={saving || loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />

                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </section>
        </form>

        {/* WATER ACCOUNT */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                <Droplets className="h-4 w-4 text-blue-600" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Water account
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Information about your connected water meter.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Meter number
                </p>

                <p className="mt-1 text-xl font-bold tracking-tight">
                  {loading
                    ? "Loading..."
                    : meter?.meter_number ||
                      user?.meter_number ||
                      "Not assigned"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Your meter is managed by Majismart.
                </p>
              </div>

              <div
                className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  isOnline
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
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
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

              <p className="text-xs leading-5 text-blue-700/80">
                Your meter number is assigned to your account
                automatically and cannot be changed from your profile.
              </p>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
                <Lock className="h-4 w-4 text-slate-600" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Security
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Keep your account secure.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Password
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Your account password
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}

                Change password
              </button>
            </div>

            {showPassword && (
              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-700">
                  Password management
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  We'll add the secure password-change form here when
                  the Django endpoint is ready.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ACCOUNT ACTIONS */}
        <section className="mt-6 rounded-2xl border border-red-100 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold">
                  Account
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Sign out of your Majismart account on this device.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
          Majismart · Your water, made smarter.
        </footer>
      </div>
    </main>
  );
};

export default ProfilePage;