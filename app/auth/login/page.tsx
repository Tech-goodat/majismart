"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const blue = "oklch(62.3% 0.214 259.815)";

const API_URL = "https://maji-iot-backend.onrender.com";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (typeof data === "object" && data !== null) {
          const firstError = Object.values(data)[0];

          if (Array.isArray(firstError)) {
            setError(String(firstError[0]));
          } else {
            setError(String(firstError));
          }
        } else {
          setError("Invalid email or password.");
        }

        return;
      }

      /*
       * Knox returns:
       *
       * {
       *   token: "...",
       *   user: {
       *     id: 1,
       *     email: "...",
       *     username: "..."
       *   }
       * }
       */

      const { token, user } = data;

      if (!token) {
        setError("Login succeeded, but no authentication token was returned.");
        return;
      }

      if (rememberMe) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("auth_token", token);
        sessionStorage.setItem("auth_user", JSON.stringify(user));
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Make sure the Django backend is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <div className="hidden bg-slate-50 lg:flex lg:flex-col lg:justify-between lg:p-12">
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
              </svg>
            </div>

            <span className="text-xl font-semibold tracking-tight">
              Majismart
            </span>
          </Link>

          <div className="max-w-md">
            <p
              className="text-sm font-semibold uppercase tracking-[0.16em]"
              style={{ color: blue }}
            >
              Welcome back
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-[-0.04em]">
              Your water.
              <br />
              <span style={{ color: blue }}>Your view.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Sign in to see your household's water usage, balance, and the
              activity happening around your meter.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Majismart
          </p>
        </div>

        {/* Form */}
        <div className="flex min-h-screen items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <Link
              href="/"
              className="mb-10 flex items-center gap-3 lg:hidden"
            >
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
                </svg>
              </div>

              <span className="text-xl font-semibold">Majismart</span>
            </Link>

            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to continue to your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[oklch(62.3%_0.214_259.815)] focus:ring-4 focus:ring-[oklch(62.3%_0.214_259.815_/_0.08)]"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-medium transition hover:opacity-75"
                    style={{ color: blue }}
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-lg border border-slate-200 px-4 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-[oklch(62.3%_0.214_259.815)] focus:ring-4 focus:ring-[oklch(62.3%_0.214_259.815_/_0.08)]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                        <path d="M9.9 4.3A10.7 10.7 0 0 1 12 4c5.5 0 9 5 9 8a8.6 8.6 0 0 1-2.1 3.7" />
                        <path d="M6.6 6.6C4.3 8.1 3 10.5 3 12c0 3 3.5 8 9 8 1.5 0 2.9-.4 4.1-1" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-3">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                  style={{ accentColor: blue }}
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-500"
                >
                  Remember me
                </label>
              </div>

              {/* API error */}
              {error && (
                <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-lg text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: blue }}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium"
                style={{ color: blue }}
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}