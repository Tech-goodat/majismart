import Link from 'next/link'
import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import { RiSecurePaymentFill } from "react-icons/ri";
import { SiContactlesspayment } from "react-icons/si";

const Billing = () => {
  return (
    <div className='flex w-full items-center justify-center flex-col'>
      <section className='flex w-full items-center justify-between'>
        <div className='flexflex-col'>
          <h1 className='text-3xl font-semibold'>Billing Accounts</h1>
          <p className='text-gray-600 text-[18px]'>Manage your linked water accounts</p>

        </div>
        <div className='flex items-center gap-4'>
         <Link className='flex items-center  p-2 md:gap-3 bg-[#08111F]/95 rounded-md md:px-4' href="/profile"><IoIosNotifications className='text-linear-to-r from-[#fffb00] to-[#ffaa00]' size={26}/><span className='hidden md:flex'>Alerts</span></Link> 
         
        </div>
      </section>
      <section className='w-full grid grid-cols-2 mt-7 gap-3 items-center'>
        <div className='flex flex-col gap-5  p-5'>
         <div className='bg-[#08111F]/95 border flex flex-col gap-4 border-white/10 rounded-xl p-5 h-[150px]'>
          Account 1
        </div>
         <div className='bg-[#08111F]/95 border flex flex-col gap-4 border-white/10 rounded-xl p-5 h-[250px]'>
          Account 1
        </div>
        <div className='flex items-center w-full gap-4'>
           <Link className='flex items-center justify-center py-4 w-full p-2 md:gap-3 bg-[#08111F]/95 rounded-md md:px-4' href="/profile"><IoIosNotifications size={26}/><span className='hidden md:flex'>Alerts</span></Link> 
          <Link className='flex items-center justify-center w-full py-4 bg-linear-to-r cursor-pointer from-[#00C8F0] to-[#00E0BB] text-gray-900 font-semibold hover:bg-gray-300 transition duration-300 p-2 md:gap-3 bg-gray-800 rounded-md md:px-4' href="/profile"><SiContactlesspayment  size={26}/><span className='hidden md:flex'>Top up now</span></Link>
        </div>
        </div>
        <div className='bg-[#08111F]/95 border border-white/10 rounded-xl p-5 h-[500px]'>
          Account 2
        </div>
      </section>
    </div>
  )
}

export default Billing