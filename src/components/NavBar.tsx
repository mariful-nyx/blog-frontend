import Link from "next/link";
import React, { useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import useAuth from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/store";
import { setAccessToken } from "@/redux/authSlice";
import useApi from "@/api/api";


function NavBar() {
  const auth = useAuth()
  const authUsername = Cookies.get('bpmUsername')
  const dispatch = useAppDispatch()
  const api = useApi()

  useEffect(()=>{
    const getRefresh = async () => {
      try {
          const response = await api.getAccessToken({'refresh': Cookies.get('bpmRefreshToken') || ''})
          const data = await response.data
          Cookies.set('bpmAccessToken', data.access)
          dispatch(setAccessToken(data.access))

        }catch{
          console.log('Error getting access....')
        }
    }
    getRefresh()

  }, [])


  return (
    <div className="w-full sticky top-0 z-30 bg-white backdrop-blur-lg bg-opacity-50">
    <div className="max-w-[1180px] mx-auto ">
      <div className="hidden sm:flex justify-between h-[50px] items-center px-2">
        <div>
          <h2><Link href={`/`}>predien blog</Link> </h2>
        </div>
        <div>
          <ul className="flex gap-6 font-bold">
            <li><Link href={`/author`} className="hover:text-gray-400 transition-all duration-150 uppercase text-[12px]">author</Link></li>
            <li><Link href={`/post`} className="hover:text-gray-400 transition-all duration-150 uppercase text-[12px]">post</Link></li>
            <li><Link href={`/news`} className="hover:text-gray-400 transition-all duration-150 uppercase text-[12px]">news</Link></li>
            <li><Link href={`/write`} className="hover:text-gray-400 transition-all duration-150 uppercase text-[12px]">write</Link></li>
            
            {auth.isAuthenticated ? 
              <li><Link href={`/profile/${authUsername}`} className="hover:text-gray-400 transition-all duration-150 uppercase text-[12px]">Profile</Link></li>
                :
              <li><Link href={`/login`} className="hover:text-gray-400 transition-all duration-150 uppercase text-[12px]">login</Link></li>
            }
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
    </div>
  );
}

export default NavBar;
