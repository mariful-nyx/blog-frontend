import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";

function NavBar() {
  return (
    <div className="max-w-[1180px] mx-auto">
      <div className="hidden sm:flex justify-between h-[50px] items-center px-2">
        <div>
          <h2><Link href={`/`}>store</Link> </h2>
        </div>
        <div>
          <ul className="flex gap-6 font-bold">
            <li><Link href={`/author`} className="hover:text-gray-400 transition-all duration-150">author</Link></li>
            <li><Link href={`/post`} className="hover:text-gray-400 transition-all duration-150">post</Link></li>
            <li><Link href={`/news`} className="hover:text-gray-400 transition-all duration-150">news</Link></li>
            <li><Link href={`/login`} className="hover:text-gray-400 transition-all duration-150">login</Link></li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle/>
          <button 
            className="dark:bg-white bg-black py-1 px-6 text-white dark:text-black rounded-md font-bold dark:hover:bg-gray-300 duration-200 hover:bg-gray-700"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
