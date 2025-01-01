"use client"
import { GetPosts } from '@/api/data'
import Paginator from '@/components/paginator'
import { Post as PostType, PostListResponse } from '@/types/type'
import { Metadata } from 'next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'


function Post() {
  // const params = useSearchParams()
  // const posts:PostListResponse = await GetPosts(params)
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  
  const [searchTerm, setSearchTerm] = useState<string>(search || '')
  const [posts, setPosts] = useState<PostListResponse>({})



  // Fetch posts when the search term changes
  useEffect(() => {
    if (searchParams !== undefined) {
      GetPosts(searchParams).then((data) => {
        setPosts(data)
      })
    }
  }, [searchParams])


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }

    router.push(`${pathname}?${newParams.toString()}`, undefined)

  }

  return (
    <>
    
        <div className='max-w-[1180px] mx-auto mt-8 px-4 lg:px-10'>
            <div>
                <div>
                    <div className='flex justify-center items-center gap-4'>
                        <div className='relative w-1/4'>
                            <input
                                type='text'
                                id='search'
                                name='search'
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder='search here'
                                className='py-1 px-3 w-full border border-slate-400 focus:outline focus:outline-slate-700 text-slate-400 rounded-md'
                            />
                            <FaSearch className='absolute right-2 top-2 text-slate-400'/>
                        </div>
                        
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div className='mt-12 flex'>
                    <div className='w-[30%]'>
                        <h3>Category</h3>
                        
                    </div>
                    <div className='w-[70%]'>
                        {posts?.results?.map((post:PostType, index:number)=>(
                          <div key={index}>
                            {post.title}
                          </div>
                        ))}
                    </div>
                </div>
                <div className='mt-8'>
                  <Paginator data={posts} />
                </div>
            </div>
        </div>
    </>
  )
}

export default Post


// export async function generateMetadata(): Promise<Metadata> {

  
//     return {
//       title: 'Post filter and search',
//       description: 'Details post filter and search ',
    
//     };
//   }