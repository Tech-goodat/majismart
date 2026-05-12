import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-white">
    <div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 gap-10 w-full items-center px-4 lg:px-0">

      {/* LEFT SIDE */}
      <div className="flex w-full flex-col items-center lg:items-start text-center lg:text-left">

        <Link
          href="/"
          className="text-2xl flex md:hidden mb-6 font-bold bg-linear-to-r from-[#00C8F0] to-[#00E0BB] bg-clip-text text-transparent"
        >
          MajiSmart
        </Link>

        {/* Badge */}
        <h1 className="flex items-center justify-center lg:justify-start w-full font-bold">
          <span className="flex items-center gap-3 px-5 py-2 rounded-full border border-teal-500/40 bg-cyan-500/10 text-teal-500 text-sm">

            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>

            Now available in Kenya
          </span>
        </h1>

        {/* Headline */}
        <div className="flex items-center lg:items-start justify-center lg:justify-start w-full flex-col mt-6">

          <h2 className="text-5xl text-center lg:text-left sm:text-6xl lg:text-8xl font-bold w-full">
            Smart Water
          </h2>

          <h2 className="text-5xl text-center lg:text-left sm:text-6xl lg:text-8xl font-bold w-full bg-gradient-to-r from-[#00C8F0] to-[#00E0BB] bg-clip-text text-transparent">
            Management
          </h2>

          <h2 className="text-5xl text-center lg:text-left sm:text-6xl lg:text-8xl font-bold w-full">
            in Your
          </h2>

          <h2 className="text-3xl text-center lg:text-left sm:text-6xl lg:text-8xl font-bold w-full">
            Pocket
          </h2>

        </div>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 text-center lg:text-left">
          <span className="max-w-md lg:max-w-xl block mx-auto lg:mx-0">
            Monitor your water balance, track meter readings, and pay your bills
            in seconds — all from one beautifully designed app.
          </span>
        </p>

      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="flex justify-center w-full  mt-6 lg:mt-0">
        <Image
          src="/rename.png"
          alt="App preview"
          width={400}
          height={200}
          className=" h-auto"
        />
      </div>

      <div className='flex w-full items-center'>
        <Link
          href="/download"
          className="mt-2 px-9 py-4 w-60 flex items-center justify-center bg-gradient-to-r from-[#00C8F0] to-[#00E0BB] text-black font-semibold rounded-xl hover:from-[#00E0BB] hover:to-[#00C8F0] transition"
        >
          Get the App
        </Link>
        <Link
          href="/auth/login"
          className="ml-4 mt-2 px-9 py-4 w-60 flex items-center justify-center border border-gray-500 text-gray-300 font-semibold rounded-xl hover:bg-gray-700 transition"
        >
          Sign In
        </Link>
      </div>
   
    </div>
     <div className='flex mt-10 text- flex-col w-full items-center justify-center'>
      <h1 className='bg-linear-to-r mb-2 from-[#00C8F0] to-[#00E0BB] bg-clip-text text-transparent '>FEATURES</h1>
      <h2 className='text-3xl sm:text-xl font-bold lg:text-7xl text-gray-300'>Everything you need</h2>
      <h2 className='text-3xl sm:text-2xl font-bold lg:text-7xl text-gray-300'>to manage your water</h2>
      <p className='text-gray-400 text-center max-w-md lg:max-w-xl mt-4'>
        From real-time meter readings to one-tap M-Pesa payments —
        </p>
        <p className='text-gray-400 text-center max-w-md lg:max-w-xl'>
          MajiSmart puts full control in your hands.
        </p>
      </div>
      <div className='flex flex-col mt-10 w-full px-2 lg:flex-row gap-4 items-center justify-center'>
        <div className='flex flex-col items-center justify-left border border-gray-600 rounded-xl w-full p-3'>
          <div className='flex text-gray-400 w-full'>
          <Image src="/balance.png"
          alt="App preview"
          width={90}
          height={90}
          className=""/>
          </div>
          <h1 className='font-semibold text-gray-400 flex w-full mb-4 mt-4 text-xl'>Live Balance and Usage</h1>
          <p className='text-lg text-gray-400'>Your current balance, daily comsumption, and spending trends are surfaced front-and-center the moment you open the app.no hunting.</p>
        </div>
         <div className='flex flex-col items-center justify-left border border-gray-600 rounded-xl w-full p-3'>
          <div className='flex w-full'>
          <Image src="/payment.png"
          alt="App preview"
          width={90}
          height={90}
          className=""/>
          </div>
          <h1 className='font-semibold text-gray-400 flex w-full mb-4 mt-4 text-xl'>Instant M-Pesa Payments</h1>
          <p className='text-lg text-gray-400'>Top up your water account in seconds via M-pesa. Set preferred accounts, get push notifications, and keep full receipt history.</p>
        </div>
         <div className='flex flex-col items-center justify-left border border-gray-600 rounded-xl w-full p-3'>
          <div className='flex w-full'>
          <Image src="/reading.png"
          alt="App preview"
          width={90}
          height={90}
          className=" "/>
          </div>
          <h1 className='font-semibold text-gray-400 flex w-full mb-4 mt-4 text-xl'>Meter Reading Log</h1>
          <p className='text-lg text-gray-400'>Every meter reading - timestamped, delta-tracked, and color-coded by consumption level. Scroll back months in a clean timeline view.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;