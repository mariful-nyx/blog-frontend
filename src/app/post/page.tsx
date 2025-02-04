import { GetPosts } from '@/api/data'
import {  PostListResponse } from '@/types/type'
import Link from 'next/link';
import Image from 'next/image';
import noImage from '@/assets/images/noImage.jpg'
import dynamic from 'next/dynamic';

const SearchComponent = dynamic(()=>import('./component/Search'), {ssr: false})
const Paginator = dynamic(()=>import('@/components/paginator'), {ssr: false})


interface PostParams {
  page: string;
  search: string;
}

async function Post({searchParams}: {searchParams: PostParams}) {

  const posts:PostListResponse = await GetPosts(searchParams)


  return (
    <>
        <div className='max-w-[1180px] mx-auto mt-8 px-4 lg:px-10'>
            <div>
                <div>
                  <SearchComponent/>
                  <div>
                        
                  </div>
                </div>
                <div className='mt-12 flex'>
                    <div className='w-0 overflow-hidden opacity-0 md:w-[30%]'>
                        <h3>Category</h3>
                        
                    </div>
                    <div className='w-full md:w-[70%] flex flex-col gap-4'>
                      {posts &&
                        posts?.results?.map((post, index) => (
                        <Link href={`/posts/${post?.slug}`} key={index} legacyBehavior>
                          <div className="rounded-md shadow-md hover:shadow-lg duration-200 group w-full bg-white dark:bg-gray-800">
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
                              {post?.thumbnail ? (
                                <img
                                  src={post.thumbnail_img}
                                  alt=""
                                  className="h-[150px] w-full sm:w-[200px] object-cover"
                                />
                              ) : (
                                <Image
                                  src={noImage}
                                  alt=""
                                  className="h-[150px] w-[200px] object-cover dark:mix-blend-overlay"
                                />
                              )}
                              <div className="w-full mt-2 mr-4 mb-2 p-4 sm:p-0">
                                <div className="text-xl group-hover:text-green-500 duration-200 cursor-pointer">
                                  {post?.title}
                                </div>
                                <div className="text-sm text-slate-500">
                                  By{" "}
                                  <Link
                                    href={`/profile/${post?.posted_by}`}
                                    className="text-green-500 hover:text-green-700 duration-200"
                                  >
                                    {post?.posted_by}
                                  </Link>
                                </div>

                                <div className="text-slate-400 line-clamp-2 mt-3 w-full">
                                {
                                  JSON.parse(post?.description)?.map((item:any, index:number)=>(
                                    <div key={index}>
                                      {item.type === "paragraph" && (
                                        <div className={``}>
                                          {item.children?.map((item:any, index:number)=>(
                                            <div key={index}>
                                              {item?.text}
                                            
                                            </div>
                                          ))}  
                                        </div>
                                      )}
                                    </div>))
                                }
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                </div>
                <div className='mt-8'>
                  {posts && <Paginator data={posts} /> }
                </div>
            </div>
        </div>
    </>
  )
}

export default Post

