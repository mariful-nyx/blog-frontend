import { GetUserDetail } from '@/api/data'
import { UserDetailType } from '@/types/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import noImg from '@/assets/images/noImage.jpg'
import { FaRegUserCircle } from 'react-icons/fa'
import { BsCamera } from 'react-icons/bs'
import dynamic from 'next/dynamic'

const ProfilePic = dynamic(()=> import('../components/ProfilePic'), {ssr: false})
const InfoEdit = dynamic(()=> import('../components/InfoEdit'), {ssr: false})
const Logout = dynamic(()=>import('../components/Logout'), {ssr:false})

async function Profile({params}:{params:{slug:string}}) {

  const user:UserDetailType = await GetUserDetail(params.slug)

  return (
    <div className='max-w-[1180px] mx-auto px-4 lg-px-10'>
      <div className='mt-12 flex flex-col gap-3 items-center w-full'>
        <label htmlFor="profile-pic" className="relative group">
          {user?.avater ? (
            <img
              src={user?.avater}
              alt={user?.avater.split("/").at(-1) || ""}
              className="h-[200px] w-[200px] object-cover rounded-full group-hover:mix-blend-darken"
              
            />
          ) : (
            <FaRegUserCircle className="h-[200px] w-[200px] aspect-square rounded-full object-cover mb-3 text-slate-700  dark:text-slate-500 group" />
          )}
          <div className="duration-200 group-hover:block hidden absolute top-0 h-[200px] w-[200px] aspect-square rounded-full backdrop-blur-lg bg-gray-500 opacity-60"></div>
          <BsCamera className="duration-200 transition-all absolute top-12 right-12 w-[100px] h-[100px] group-hover:block hidden text-white" />
        </label>
          <ProfilePic user={user}/>
        <div>
          <div className='text-3xl font-bold text-slate-700 dark:text-slate-300'>
            {user?.first_name} {user?.last_name}
          </div>
          <div className='font-semibold text-slate-500 text-center'>
            {user?.username}
          </div>
          <div className='mt-4'>
            <InfoEdit user={user}/>
            
          </div>
        </div>
        <div className='flex mt-12 w-full'>
          <div className='w-[30%] mr-4'>
            <div>
              <div className=' flex gap-4 items-center'>
                <strong className='text-green-500'>Status</strong>
              </div>
              <div className='text-slate-500 dark:text-slate-300'>
                {user?.status ? user.status : 'No details provided.'}
              </div>
            </div>
            <div className='mt-4'>
              <div className=' flex gap-4 items-center'>
                <strong className='text-green-500'>Profession</strong>
              </div>
              <div className='text-slate-500 dark:text-slate-300'>
                {user?.profession ? user.profession :  'No details provided.'}
              </div>
            </div>
            <div className='mt-4'>
              <div className=' flex gap-4 items-center'>
                <strong className='text-green-500'>University</strong>
              </div>
              <div className='text-slate-500 dark:text-slate-300'>
                {user?.university ? user.university : 'No details provided.'}
              </div>
            </div>
            <div>
              <Logout user={user}/>
            </div>

          </div>
          <div className='w-[70%] ml-4'>
            <div>
              <h2 className='text-green-500'>Posts</h2>
              <div className='flex flex-col gap-4 mt-4'>
                {user?.posts?.length ? 
                  user?.posts.map((post, index)=>(
                  <Link
                    href={`/posts/${post.slug}`}
                    key={index}
                    className='h-[150px] rounded-md shadow-md hover:shadow-lg duration-200 group w-full bg-white dark:bg-gray-800'
                  >
                    <div className='flex gap-4'>
                      {post.thumbnail ? 
                        <img
                          src={post?.thumbnail}
                          alt=''
                          className='h-[150px] w-[200px] object-cover'
                       
                        />
                        :
                        <Image
                          src={noImg}
                          alt=''
                          className='h-[150px] w-[200px] object-cover dark:mix-blend-overlay'
                         
                        />
                      }
                      <div 
                        className='w-full mt-2 mr-4 mb-2'
                      >
                        <div
                          className='text-xl group-hover:text-green-500 duration-200'
                        >
                          {post.title}
                        </div>
                        <div
                          className='text-sm text-slate-500'
                        >
                          By <Link href={`/profile/${post.posted_by}`} className='text-green-500 hover:text-green-700 duration-200'>{post.posted_by}</Link>
                        </div>
                        
                        <div className='text-slate-400 line-clamp-2 mt-3 w-full'>
                          {post.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                )):
                <div className='text-lg text-center w-full text-slate-500 dark:text-slate-300'>No post yet...</div>
              
              }
              </div>
            </div>
            <div className='mt-8'>
              <h2 className='text-green-500'>Comments</h2>
              <div className='mt-4'>
                {user?.comments.length ? 
                  user.comments.map((comment, index)=>(
                    <div key={index}>
                      {comment.comment}
                    </div>
                )) :
                  <div className='text-lg text-slate-500 dark:text-slate-300 text-center w-full'>No comments yet...</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile