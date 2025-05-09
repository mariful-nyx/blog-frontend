'use client'
import useApi from '@/api/api'
import { LoginFormData } from '@/types/type'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { isAxiosError } from 'axios'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/navigation'


function Login() {
  const api = useApi()
  const router = useRouter()
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [formData, setFormData] = useState<LoginFormData>({email: '', password: ''}) 

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev:LoginFormData)=>({
      ...prev,
      [name]: value
    }))

  }

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await api.login(formData)
      const data = await response.data
      Cookies.set('bpmAccessToken', data.access)
      Cookies.set('bpmRefreshToken', data.refresh)
      Cookies.set('bpmUsername', data.user.username)
      Cookies.set('bpmUserEmail', data.user.email)
      Cookies.set('bpmUserID', data.user.id)

      router.replace(`/`)
      router.refresh()

    } catch(error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error("An unknown error occurred");
      }
    }
    
  }

  return (
    <div>
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-[50%] max-w-full md:max-w-[590px] mx-auto mr-0'>
          <div className='h-[90vh]'>
            <form className='flex flex-col gap-6 px-16 items-center justify-center h-full'>
              <input
                id='email'
                type='email'
                name='email'
                value={formData?.email || ''}
                onChange={onChange}
                placeholder='email'
                required
                className='text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none focus:outline-blue-600 duration-200'
              />
              <div className=' relative w-full'>
                <input
                  id='password'
                  type={`${passwordVisible ? 'text' : 'password' }`}
                  name='password'
                  value={formData?.password || ''}
                  onChange={onChange}
                  placeholder='password'
                  required
                  className='text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200'
                />
                <div className='absolute top-[9px] right-2'>
                  {passwordVisible ? 
                  <AiOutlineEye
                    onClick={()=>setPasswordVisible(false)}
                    className='w-6 h-6 hover:text-blue-500 duration-200 cursor-pointer'
                  /> :
                  <AiOutlineEyeInvisible 
                    onClick={()=>setPasswordVisible(true)}
                    className='w-6 h-6 hover:text-blue-500 duration-200 cursor-pointer'
                  />}
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                  <input type='checkbox' />  <div className='text-sm text-blue-500'>Remember password</div>
                </div>
                <div>
                    Forgot password
                </div>
              </div>
              <button 
                type='submit' 
                onClick={handleLogin}
                className='bg-blue-600 text-white w-full rounded-md hover:bg-blue-800 py-2 duration-200 font-bold'
              >
                Login
              </button>

              <div className='text-blue-600'>Not have account ? <Link href={`/signup`} className=' underline font-bold hover:text-blue-800 duration-200'>Signup</Link></div>

            </form>
          </div>
          
        </div>
        <div className='w-full md:w-[50%] h-screen bg-blue-500'>
          ui portion
        </div>
      </div>
        
        
    </div>
  )
}

export default Login