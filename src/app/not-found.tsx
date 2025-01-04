'use client'
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-8 h-screen justify-center items-center ">
      <h2 className="text-2xl bg-red-600 text-white py-2 px-8 rounded-xl">
        Not Found
      </h2>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className=" group flex flex-row items-center gap-4 group dark:bg-gray-800 bg-black py-1 px-6 text-white dark:text-slate-300 rounded-md font-bold transition-all duration-150 hover:bg-gray-700 dark:hover:bg-slate-900"
      >
        <GoArrowLeft className="group-hover:translate-x-[-8px] transition-all duration-150 group-hover:pl-[-10px]"/> Return Home
      </Link>
    </div>
  );
}
