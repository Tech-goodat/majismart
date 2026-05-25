'use client'

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { FaUnlockAlt, FaEyeSlash, FaRegEye } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

const LogIn = () => {
  const router = useRouter()

  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const [loginData, setLoginData] = React.useState({
    email: '',
    password: ''
  })

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!loginData.email || !loginData.password) {
      alert('Please fill in all fields')
      return
    }

    try {
      setIsLoading(true)

      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      console.log(data)

      // Store token
      sessionStorage.setItem('token', data.access_token)

      // Optional delay for animation feel
      setTimeout(() => {
        setIsLoading(false)
        router.push('/dashboard')
      }, 1500)

    } catch (err: any) {
      console.error('Login error:', err)
      alert(err.message || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050A0F] text-white">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT IMAGE */}
        <div className="flex justify-center items-center animate-fade-up">
          <Image
            src="/smartimage.png"
            alt="MajiSmart app preview"
            width={420}
            height={520}
            className="w-full lg:w-96 h-auto"
            priority
          />
        </div>

        {/* RIGHT SIDE */}
        <section className="w-full flex flex-col items-start text-left">

          {/* LOGO */}
          <Link
            href="/"
            className="text-3xl mt-4 font-bold bg-gradient-to-r from-[#00C8F0] to-[#00E0BB] bg-clip-text text-transparent"
          >
            MajiSmart
          </Link>

          {/* BADGE */}
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-teal-400/20 bg-teal-400/5 text-teal-300 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-cyan-400" />
            </span>

            Secure login takes just a moment
          </div>

          {/* HEADING */}
          <h1 className="mt-6 text-4xl font-semibold tracking-tight">
            Welcome back !
          </h1>

          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Sign in to manage your water account, monitor usage, and stay updated in real time.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md mt-8 space-y-5"
          >

            {/* EMAIL */}
            <div className="space-y-3">
              <label className="text-sm  text-gray-300">
                Email Address
              </label>

              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                           bg-white/5 border border-white/10
                           transition-all duration-200
                           hover:border-white/20
                           focus-within:border-cyan-400/70
                           focus-within:ring-2 focus-within:ring-cyan-400/20"
              >
                <MdOutlineMarkEmailUnread className="text-gray-400 text-lg" />

                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">
                Password
              </label>

              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                           bg-white/5 border border-white/10
                           transition-all duration-200
                           hover:border-white/20
                           focus-within:border-cyan-400/70
                           focus-within:ring-2 focus-within:ring-cyan-400/20"
              >
                <FaUnlockAlt className="text-gray-400 text-lg" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 cursor-pointer hover:text-cyan-300 transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaRegEye className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mb-4 cursor-pointer rounded-xl font-medium text-gray-800
                         bg-gradient-to-r from-cyan-400 to-emerald-400
                         transition-all duration-200
                         hover:opacity-90 active:scale-[0.99]
                         focus:outline-none focus:ring-2 focus:ring-cyan-400/40
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-gray-800">
                    Signing in
                  </span>

                  <span className="flex gap-1 items-end">
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

          </form>
        </section>
      </div>
    </div>
  )
}

export default LogIn