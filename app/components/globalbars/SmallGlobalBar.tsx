import React from 'react';
import Link from 'next/link';
import { HiHome } from "react-icons/hi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { MdCloudDownload } from "react-icons/md";

const SmallGlobalBar = () => {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0A1628]/80 backdrop-blur-xl px-4 py-3 shadow-2xl">

      <div className="flex items-center justify-between">

        <Link href="/" className="flex flex-col items-center text-gray-400 hover:text-white transition">
          <HiHome size={22} />
          <span className="text-[10px] mt-1">Home</span>
        </Link>

        <Link href="/features" className="flex flex-col items-center text-gray-400 hover:text-white transition">
          <MdOutlineFeaturedPlayList size={22} />
          <span className="text-[10px] mt-1">Features</span>
        </Link>

        <Link href="/payments" className="flex flex-col items-center text-gray-400 hover:text-white transition">
          <FaCreditCard size={20} />
          <span className="text-[10px] mt-1">Pay</span>
        </Link>

        <Link href="/reviews" className="flex flex-col items-center text-gray-400 hover:text-white transition">
          <IoMdStar size={22} />
          <span className="text-[10px] mt-1">Reviews</span>
        </Link>

        <Link href="/download" className="flex flex-col items-center text-gray-400 hover:text-white transition">
          <MdCloudDownload size={22} />
          <span className="text-[10px] mt-1">Get</span>
        </Link>

      </div>
    </div>
  );
};

export default SmallGlobalBar;