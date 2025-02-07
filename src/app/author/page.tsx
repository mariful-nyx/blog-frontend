"use client"

import React, { Suspense, useEffect, useState } from 'react'

import { User } from '@/types/type';
import userImg from '@/assets/images/user.webp'
import Image from 'next/image';
import RoleBadge from '@/components/badge/RoleBadge';
import Link from 'next/link';

import useApi from '@/api/api';
import { toast } from 'react-toastify';
import SearchComponent from '../post/component/Search';
import Paginator from '@/components/paginator';

// const SearchComponent = dynamic(()=>import('@/app/post/component/Search'), {ssr: false})
// const Paginator = dynamic(()=>import('@/components/paginator'), {ssr: false})


interface AuthorParams {
  page: string;
  search: string;
}

function Author({searchParams}: {searchParams: AuthorParams}) {
  const api = useApi()
  const [users, setUsers] = useState<any>()

  useEffect(()=>{
    api.getUsers(searchParams).then((response)=>{
      setUsers(response.data)
    }).catch(()=>toast.error('Error fetch authors !'))
  },[searchParams])

  return (
    <div className='max-w-[1180px] mx-auto w-full'>
      <div className='px-4 lg:px-10 w-full'>
        <div className='mt-12 w-full'>
          <Suspense fallback={<>Loading...</>}>
            <SearchComponent/>
          </Suspense>
        <div className='flex mt-12'>
          <div className='w-0 overflow-hidden opacity-0 md:w-[30%]'>
            filter
          </div>
          <div className='w-full md:w-[70%]'>
            <div className='flex flex-col gap-4'>
              {users?.results?.map((user:User, index:number)=>(
                <Link
                  href={`/profile/${user.username}`} 
                  key={index}
                  legacyBehavior
                >
                  <div className='group relative flex justify-start gap-3 shadow-md hover:shadow-lg px-4 py-4 rounded-md bg-white dark:bg-gray-800'>
                  <div className='absolute top-0 right-0'>
                    <RoleBadge name={user.role}/>
                  </div>
                  <div>
                  {user.avater ? 
                    <img
                      src={user.avatar_preview} 
                      alt='' 
                      className='h-16 min-w-16 w-16 aspect-square rounded-full object-cover '
                    />:
                    <Image 
                      src={userImg} 
                      alt='' 
                      className='h-16 w-16 aspect-square rounded-full object-cover dark:mix-blend-overlay'
                     
                    />
                  
                  }

                  </div>
                  <div>
                    <div 
                      className='cursor-pointer text-slate-600 dark:text-slate-400 font-bold text-lg group-hover:text-blue-500 duration-200'
                    >
                      {user.first_name} {user.last_name}
                    </div>
                    <div
                      className='text-gray-400 text-sm flex flex-col sm:flex-row flex-wrap gap-3 box-border'
                    >
                      <div>{user.username}</div>
                      <div>
                        <strong className='text-green-400'>Total Posts: </strong>{user.posts}
                      </div>
                      <div>
                        <strong className='text-blue-400'>Total Comments: </strong>{user.comments}
                      </div>
                    </div>
                    <div className='mt-4 w-[300px]'>
                      {user.status}
                    </div>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
           
          </div>
        </div>
      </div>
      <div className='mt-12'>
        <Paginator data={users}/>
      </div>
    </div>
    </div>
  )}

export default Author