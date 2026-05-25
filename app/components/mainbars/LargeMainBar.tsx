'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

import { FaHome } from "react-icons/fa"
import { IoMdSpeedometer } from "react-icons/io"
import { MdAddIcCall } from "react-icons/md"
import { IoSettingsOutline } from "react-icons/io5"
import { FaFileInvoiceDollar } from "react-icons/fa6"
import { GiPayMoney } from "react-icons/gi"
import { VscAccount } from "react-icons/vsc"

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: FaHome },
  { name: 'Billing Accounts', href: '/billing', icon: VscAccount },
  { name: 'Make Payment', href: '/payment', icon: GiPayMoney },
  { name: 'Invoices & Receipts', href: '/invoices', icon: FaFileInvoiceDollar },
  { name: 'Meter Readings', href: '/readings', icon: IoMdSpeedometer },
  { name: 'Help center', href: '/help', icon: MdAddIcCall },
  { name: 'Settings', href: '/settings', icon: IoSettingsOutline },
]

const LargeMainBar = () => {
  const pathname = usePathname()

  return (
    <aside className="w-full h-screen bg-[#08111F]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col px-5 py-6">

      {/* Logo */}
      <Link
        href="/dashboard"
        className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#00C8F0] to-[#00E0BB] bg-clip-text text-transparent"
      >
        MajiSmart
      </Link>

      <p className="text-sm text-gray-500 mt-1">
        Smart Water Management
      </p>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 mt-12">

        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group relative flex items-center gap-4 rounded-xl px-4 py-3
                transition-all duration-200 overflow-hidden border

                ${
                  isActive
                    ? 'bg-cyan-400/10 text-white border-cyan-400/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'
                }
              `}
            >

              {/* Active background */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-cyan-400/5" />
              )}

              {/* Accent bar */}
              <div
                className={`
                  relative z-10 h-8 w-[3px] rounded-full transition-all duration-300
                  ${
                    isActive
                      ? 'bg-cyan-400'
                      : 'bg-transparent group-hover:bg-white/20'
                  }
                `}
              />

              {/* Icon */}
              <Icon
                size={21}
                className={`
                  relative z-10 transition-all duration-200
                  ${
                    isActive
                      ? 'text-cyan-300 scale-105'
                      : 'text-gray-400 group-hover:text-cyan-300'
                  }
                `}
              />

              {/* Text */}
              <span
                className={`
                  relative z-10 text-[15px] font-medium tracking-wide transition-all duration-200
                  ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-300 group-hover:text-white'
                  }
                `}
              >
                {item.name}
              </span>

            </Link>
          )
        })}

      </nav>

      {/* Bottom Card */}
      <div className="mt-auto">
        <div className="rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 p-5 backdrop-blur-xl">

          <h3 className="text-white font-semibold text-lg">
            Water Usage
          </h3>

          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Monitor your billing accounts, payments and meter readings in real time.
          </p>

          <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 py-3 text-sm font-semibold text-[#04111d] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-cyan-500/20">
            View Analytics
          </button>

        </div>
      </div>

    </aside>
  )
}

export default LargeMainBar