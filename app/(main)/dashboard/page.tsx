import Link from 'next/link'
import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import { SiContactlesspayment } from "react-icons/si";

const Dashboard = () => {
  return (
    <div className='flex w-full items-center justify-center flex-col'>
      <section className='flex w-full items-center justify-between'>
        <div className='flexflex-col'>
          <h1 className='text-3xl font-semibold'>Hello there <span className='text-4xl font-bold bg-linear-to-r from-[#00C8F0] to-[#00E0BB] bg-clip-text text-transparent'>Felix</span> !</h1>
          <p className='text-[18px] text-gray-600'>Thursday, May 7, 2026 · Account RS-927-W · Prepaid</p>

        </div>
        <div className='flex items-center gap-4'>
         <Link className='flex items-center p-2 md:gap-3 bg-[#08111F]/95 rounded-md md:px-4' href="/profile"><IoIosNotifications size={26}/><span className='hidden md:flex'>Alerts</span></Link> 
          <Link className='flex items-center bg-linear-to-r cursor-pointer from-[#00C8F0] to-[#00E0BB] w-40 text-gray-900 font-semibold hover:bg-gray-300 transition duration-300 p-2 md:gap-3 bg-gray-800 rounded-md md:px-4' href="/profile"><SiContactlesspayment  size={26}/><span className='hidden md:flex'>Top up now</span></Link>
        </div>
      </section>
    </div>
  )
}

export default Dashboard