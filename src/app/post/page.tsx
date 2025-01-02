import { GetPosts } from '@/api/data'
import Paginator from '@/components/paginator'
import { Post as PostType, PostListResponse } from '@/types/type'
import SearchComponent from './component/Search';

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
                  {posts && <Paginator data={posts} /> }
                </div>
            </div>
        </div>
    </>
  )
}

export default Post

