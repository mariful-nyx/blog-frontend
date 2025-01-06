"use client"
import useApi from '@/api/api'
import Modal from '@/components/common/Modal'
import useAuth from '@/hooks/useAuth'
import { UserDetailType } from '@/types/type'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { LuPen } from 'react-icons/lu'
import { toast } from 'react-toastify'

function InfoEdit({user}: {user: UserDetailType}) {
  const { isAuthenticated } = useAuth()
  const api = useApi()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const [formData, setFormData] = useState(user ? 
    {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      username: user?.username,
      status: user?.status,
      profession: user?.profession,
      university: user?.university
    }
      : 
    {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    status: '',
    profession: '',
    university: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev)=>({
      ...prev,
      [name]: value
    }))
  }

  const onClose = () => {
    setIsOpen(!isOpen)
  }



  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    api.updateProfile(user?.username, formData).then(()=>{
      toast.success('Successfully updated !')
      router.refresh()
      onClose()
    }).catch(()=>{
      toast.error('Error update info !')
    })
  }




  return (
    <div className='flex justify-center'>
      {isAuthenticated && (
        <>
        <button
          onClick={()=>setIsOpen(!isOpen)}
          className='bg-green-600 text-white rounded-md hover:bg-green-800 py-1 px-3 w-[100px] duration-200 font-bold flex gap-2 justify-center items-center text-sm'
        >
          Edit <LuPen className='w-3 h-3'/>
        </button>

        <Modal 
          isOpen={isOpen}
          onClose={onClose}
        >
          <form className='flex flex-col gap-3'>
            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='first_name' className='text-sm text-slate-600'>First name</label>
                <input
                  id='first_name'
                  name='first_name'
                  value={formData?.first_name}
                  onChange={handleChange}
                  className='text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200'
                  placeholder='First name'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='last_name' className='text-sm text-slate-600'>Last name</label>
                <input
                  id='last_name'
                  name='last_name'
                  value={formData?.last_name}
                  onChange={handleChange}
                  className='text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200'
                  placeholder='Fast name'
                />
              </div>
            </div>
            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='username' className='text-sm text-slate-600'>Username</label>
                <input
                  id='username'
                  name='username'
                  value={formData?.username}
                  onChange={handleChange}
                  className='text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200'
                  placeholder='Username'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-sm text-slate-600'>Email</label>
                <input
                  id='email'
                  name='email'
                  value={formData?.email}
                  onChange={handleChange}
                  className='text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200'
                  placeholder='Email'
                />
              </div>
            </div>
            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='status' className='text-sm text-slate-600'>Status</label>
                <input
                  id='status'
                  name='status'
                  value={formData?.status}
                  onChange={handleChange}
                  className='text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200'
                  placeholder='Status'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='profession' className='text-sm text-slate-600'>Profession</label>
                <input
                  id='profession'
                  name='profession'
                  value={formData?.profession}
                  onChange={handleChange}
                  className='text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200'
                  placeholder='Profession'
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='university' className='text-sm text-slate-600'>University</label>
              <input
                id='university'
                name='university'
                value={formData?.university}
                onChange={handleChange}
                className='text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200'
                placeholder='University'
              />
            </div>
            <div className='flex justify-end gap-4'>
              <button
                onClick={(e)=>{
                  e.preventDefault()
                  onClose()
                }}
                className='bg-white text-slate-600 rounded-md hover:bg-slate-50 border py-1 px-4 duration-200 font-bold'
              >
                Cancel
              </button>
              <button 
                type='submit' 
                onClick={handleUpdate}
                className='bg-green-600 text-white rounded-md hover:bg-green-800 py-1 px-4 duration-200 font-bold'
              >
                Update
              </button>
            </div>
          </form>
        </Modal>
        </>
      )}
    </div>
  )
}

export default InfoEdit