import Link from 'next/link'
import React from 'react'
import { IoIosNotifications } from "react-icons/io";

const Payment = () => {
  return (
    <div className='w-full min-h-screen flex flex-col gap-8 px-4 md:px-10 py-6 text-white'>

      {/* HEADER */}
      <section className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-semibold'>Lipa na M-Pesa</h1>
          <p className='text-gray-400 text-sm md:text-base'>
            Top up your water units via M-Pesa STK push
          </p>
        </div>

        <Link
          href="/profile"
          className='flex items-center gap-2 px-4 py-2 rounded-md bg-[#08111F]/95 border border-white/10 hover:bg-white/10 transition'
        >
          <IoIosNotifications size={22} />
          <span className='hidden md:flex'>Alerts</span>
        </Link>

      </section>

      {/* MAIN GRID */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch'>

        {/* LEFT CARD */}
        <div className='bg-[#08111F]/95 border border-white/10 rounded-xl p-5 min-h-[300px]'>
          section 1
        </div>

        {/* RIGHT SIDE STACK */}
        <div className='flex flex-col gap-6'>

          <div className='bg-[#08111F]/95 border border-white/10 rounded-xl p-5 min-h-[350px]'>
            top section
          </div>

          <div className='bg-[#08111F]/95 border border-white/10 rounded-xl p-5 min-h-[200px]'>
            bottom section
          </div>

        </div>

      </section>
    </div>
  )
}

export default Payment