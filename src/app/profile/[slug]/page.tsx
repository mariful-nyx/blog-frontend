import { GetUserDetail } from '@/api/data'
import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'

async function Profile({params}:{params:{slug:string}}) {

  const user = await GetUserDetail(params.slug)

  return (
    <div className='max-w-[1180px] mx-auto'>
      <div className='mt-12 flex flex-col gap-3 items-center w-full'>
        <div>
          {user?.avater ? 
              <img
                src={user?.avater}
                alt={user?.avater.split('/').at(-1) || ""}
                className='h-[200px] w-[200px] object-cover rounded-full'
              />
            : 
              <FaRegUserCircle
                className="h-[200px] w-[200px] aspect-square rounded-full object-cover mb-3"
              /> 
          }
        </div>
        <div className='text-3xl font-bold text-slate-600'>
          {user?.first_name} {user?.last_name}
        </div>
      </div>
    </div>
  )
}

export default Profile