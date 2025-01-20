import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import useAuth from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/store";
import { setAccessToken } from "@/redux/authSlice";
import useApi from "@/api/api";
import { RxCross1 } from "react-icons/rx";
import { IoReorderThreeOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";


function NavBar() {
  const auth = useAuth()
  const authUsername = Cookies.get('bpmUsername')
  const dispatch = useAppDispatch()
  const api = useApi()
  const pathname = usePathname()

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

  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false)

  useEffect(()=>{
    setIsOpenMobileMenu(false)
  }, [pathname])




  return (
    <div className="w-full sticky top-0 z-30 bg-white backdrop-blur-lg bg-opacity-50">
    <div className="max-w-[1180px] mx-auto ">
      <div className="hidden md:flex justify-between h-[50px] items-center px-2">
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

      <div className="flex items-center justify-between px-4 md:hidden py-3">
        <div>
          <h2><Link href={`/`}>predien blog</Link> </h2>
        </div>
        <ThemeToggle/>
        <button className='ml:hidden block' onClick={()=>setIsOpenMobileMenu(true)}>
          <IoReorderThreeOutline className='w-8 h-8 text-gray-600 dark:text-white '/>
        </button>
      </div>


      {/* Mobile menu */}
      <div className={`z-20 overflow-hidden bg-white dark:bg-black ml:hidden flex flex-col absolute left-0 top-0 right-0 duration-200 ${ isOpenMobileMenu ? 'h-screen opacity-100': 'h-0 opacity-0 overflow-hidden'}`}>
        <div className='flex flex-col p-5 w-full'>
          <button 
            onClick={()=>setIsOpenMobileMenu(false)}
            className='flex justify-end '
          >
            <RxCross1 className='text-black dark:text-white hover:text-gray-500 w-6 h-6'/>
          </button>
          <div className='overflow-hidden'>
            <ul className="flex flex-col gap-6 font-bold">
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
              {/* <Link
                href={item.link} 
                key={index} 
                className='flex gap-1 items-center py-6 text-blue-950 dark:text-white text-nowrap font-bold hover:text-slate-300 duration-200'
                onClick={()=>{
                  if(!activeIndex){
                    handleMouseEnter(index)
                  } else{
                    handleMouseLeave()
                  }
                }}
                onMouseLeave={handleMouseLeave}
              >
                {item.name} 
              </Link> */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default NavBar;
