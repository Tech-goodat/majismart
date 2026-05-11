import Link from 'next/link'
import React from 'react'

const LargeGlobalBar = () => {
  return (
    <div className='flex w-full p-4 px-15 items-center bg-[#001a2e] justify-between'>
      <Link href="/" className="text-2xl font-bold bg-linear-to-r from-[#00C8F0] to-[#00E0BB] bg-clip-text text-transparent">
         MajiSmart
      </Link>
      <div className='flex space-x-10'>
        <Link href="/features" className='text-lg font-medium text-gray-400 hover:text-gray-100 transition duration-300'>
          Features
        </Link>
        <Link href="/how" className='text-lg font-medium text-gray-400 hover:text-gray-100 transition duration-300'>
          How it Works
        </Link>
        <Link href="/payments" className='text-lg font-medium text-gray-400 hover:text-gray-100 transition duration-300'>
          Payments
        </Link>
        <Link href="/reviews" className='text-lg font-medium text-gray-400 hover:text-gray-100 transition duration-300'>
          Reviews
        </Link>
      </div>
      <div className='flex space-x-4'>
        <Link href="/auth/login" className='px-4 flex items-center justify-center py-2.5 w-30 text-white cursor-pointer border font-semibold rounded-xl border-gray-600 transition duration-300'>
          Sign In
        </Link>
        <Link href="/download" className='px-4 flex items-center justify-center py-2.5 bg-linear-to-r cursor-pointer from-[#00C8F0] to-[#00E0BB] w-40 text-gray-900 rounded-xl font-semibold hover:bg-gray-300 transition duration-300'>
          Get the App
        </Link>
      </div>
    </div>
  )
}

export default LargeGlobalBar