'use client'
import useApi from '@/api/api'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/navigation'


function Sigup() {
  const api = useApi()
  const router = useRouter()
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [formData, setFormData] = useState({email: '', username: '', password: ''}) 

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev)=>({
      ...prev,
      [name]: value
    }))

  }

  const handleSignup = async(e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await api.signup(formData)
      const data = await response.data
      if (data){
        router.replace(`/login`)
        router.refresh()
      }
    
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
      <div className='flex'>
        <div className='w-[50%] max-w-[590px] mx-auto mr-0'>
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
               <input
                id='username'
                type='username'
                name='username'
                value={formData?.username || ''}
                onChange={onChange}
                placeholder='username'
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

              
              <button 
                type='submit' 
                onClick={handleSignup}
                className='bg-blue-600 text-white w-full rounded-md hover:bg-blue-800 py-2 duration-200 font-bold'
              >
                Signup
              </button>

              <div className='text-blue-600'>
                Not have account ? 
                <Link href={`/login`} className=' underline font-bold hover:text-blue-800 duration-200'>Login</Link>
              </div>

            </form>
          </div>
          
        </div>
        <div className='w-[50%] h-screen bg-blue-500'>
          ui portion
        </div>
      </div>
        
        
    </div>
  )
}

export default Sigup