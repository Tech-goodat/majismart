import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
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
      <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
        <Image
          src="/homeimage.png"
          alt="App preview"
          width={1200}
          height={500}
          className="w-full max-w-lg sm:max-w-xl lg:max-w-xl h-auto"
        />
      </div>

    </div>
  );
};

export default Home;