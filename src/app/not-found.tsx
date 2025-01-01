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
        className="flex flex-row items-center gap-4 group dark:bg-white bg-black py-1 px-6 text-white dark:text-black rounded-md font-bold dark:hover:bg-gray-300 transition-all duration-150 hover:bg-gray-700"
      >
        <GoArrowLeft className="transition-all duration-150 group-hover:pl-[-10px]"/> Return Home
      </Link>
    </div>
  );
}
