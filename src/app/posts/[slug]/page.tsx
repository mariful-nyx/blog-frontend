
import moment from "moment";
import { Metadata } from "next";
import { Post } from "@/api/data";
import Link from "next/link";
import { PostType, RelatedArticle, Tag } from "@/types/type";


const baseUrl = "https://predienblog.vercel.app"



export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await Post(params.slug);

  return {
    title: post?.meta_title,
    description: post?.meta_description,
    alternates: {
      canonical: `${baseUrl}/posts/${post?.slug}`
    },

    openGraph: {
      title: post?.meta_title,
      description: post?.meta_description,
      url: `${baseUrl}/posts/${post?.slug}`, // Using dynamic canonical URL
      images: [{ url: post?.thumbnail_img }],
    },
    twitter: {
      card: "summary_large_image",
      title: post?.meta_title,
      description: post?.meta_description,
      images: post?.thumbnail_img,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function PostView({ params }: { params: { slug: string } }) {
  const post:PostType = await Post(params.slug);

  return (
    <>
      <div className="max-w-[1180px] mx-auto">
        <div className="flex mb-24 mt-12">
          <div className="px-6 w-full md:w-[70%] border-r">

            <h1 className="text-5xl font-extralight">{post?.title}</h1>
            <div className="flex justify-between mb-10 mt-2">
              <div className="text-slate-500">
                By 
                <Link 
                  href={`/profile/${post?.posted_by}`} 
                  className="ml-2 font-semibold text-green-500 hover:text-green-800 duration-200"
                >
                  {post?.posted_by}
                </Link>
              </div>
              <span className="text-[12px] text-blue-400 font-bold">
                {moment(post?.posted_at).format("MMMM, DD, YYYY")}
              </span>
            </div>
            <div>

              {post.description &&
                JSON.parse(post.description)?.map((item:any, index:number)=>(
                  <div key={index}>
                    {item.type === "paragraph" && (
                      <div className={`${item?.align === "center" && 'text-center' } ${item?.align === "left" && 'text-start' } ${item?.align === "right" && 'text-end' } ${item?.align === "justify" && 'text-justify' } `}>
                        {item.children?.map((item:any, index:number)=>(
                          <div key={index} className={`${item?.bold && 'font-bold'} ${item?.italic && ' italic'} ${item?.underline && 'underline' }`}>
                            {item?.text}
                           
                          </div>
                        ))}  
                      </div>
                    )}
                    {item.type === "heading-one" && (
                      <div id={`head-${index+1}`} className={`text-3xl mt-4 font-bold scroll-mt-[52px] scroll-smooth ${item?.align === "center" && 'text-center' } ${item?.align === "left" && 'text-start' } ${item?.align === "right" && 'text-end' } ${item?.align === "justify" && 'text-justify' } `}>
                        {item.children?.map((item:any, index:number)=>(
                          <div key={index} className={`${item?.bold && 'font-bold'} ${item?.italic && ' italic'} ${item?.underline && 'underline' }`}>
                            {item?.text}
                           
                          </div>
                        ))}  
                      </div>
                    )}

                    {item.type === "heading-two" && (
                      <div className={`text-2xl font-semibold ${item?.align === "center" && 'text-center' } ${item?.align === "left" && 'text-start' } ${item?.align === "right" && 'text-end' } ${item?.align === "justify" && 'text-justify' } `}>
                        {item.children?.map((item:any, index:number)=>(
                          <div key={index} className={`${item?.bold && 'font-bold'} ${item?.italic && ' italic'} ${item?.underline && 'underline' }`}>
                            {item?.text}
                           
                          </div>
                        ))}  
                      </div>
                    )}

                    {item.type === "bulleted-list" && (
                      <ul className={`pl-4 pt-2 ${item?.align === "center" && 'text-center' } ${item?.align === "left" && 'text-start' } ${item?.align === "right" && 'text-end' } ${item?.align === "justify" && 'text-justify' } `}>
                        {item.children?.map((item:any, index:number)=>(
                          <li key={index} className={`${item?.bold && 'font-bold'} ${item?.italic && ' italic'} ${item?.underline && 'underline' }`}>
                            {item?.children[0].text}
                           
                          </li>
                        ))}  
                      </ul>
                    )}

                    {item.type === "numbered-list" && (
                      <ol className={`pl-4 pt-2 ${item?.align === "center" && 'text-center' } ${item?.align === "left" && 'text-start' } ${item?.align === "right" && 'text-end' } ${item?.align === "justify" && 'text-justify' } `}>
                        {item.children?.map((item:any, index:number)=>(
                          <li key={index} className={`${item?.bold && 'font-bold'} ${item?.italic && ' italic'} ${item?.underline && 'underline' }`}>
                            {item?.children[0].text}
                           
                          </li>
                        ))}  
                      </ol>
                    )}

                    {/* {item.type === "" && (
                      <ol className={`pl-4 pt-2 ${item?.align === "center" && 'text-center' } ${item?.align === "left" && 'text-start' } ${item?.align === "right" && 'text-end' } ${item?.align === "justify" && 'text-justify' } `}>
                        {item.children?.map((item:any, index:number)=>(
                          <li key={index} className={`${item?.bold && 'font-bold'} ${item?.italic && ' italic'} ${item?.underline && 'underline' }`}>
                            {item?.children[0].text}
                           
                          </li>
                        ))}  
                      </ol>
                    )} */}


                  </div>
                ))
              }
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {post?.tag.map((item:Tag, index:number)=>(
                <div key={index} className="px-3 py-[2px] bg-blue-50 dark:bg-blue-600 text-blue-600 dark:text-slate-200 font-bold rounded-md" role="button">
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div className=" hidden md:block md:w-[30%] px-6 sticky" >
            <div>
              <h2 className="text-gray-600 dark:text-slate-200">Contents</h2>
              <div className="mt-2 flex flex-col gap-1">
                {post?.description &&
                  JSON.parse(post.description)?.map((item:any, index:number)=>(
                  <div key={index}>
                    {item.type === "heading-one" &&
                      <Link href={`#head-${index+1}`} role="button" key={index} className="text-sm font-semibold hover:underline">
                        {item?.children[0].text}  
                      </Link>
                    
                    }
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-gray-600 dark:text-slate-200">Category</h2>
              <div className="mt-2">
                <span 
                  className="font-bold text-emerald-600 dark:text-slate-200 bg-emerald-100 dark:bg-emerald-600 rounded-md px-4 py-1"
                >
                  {post?.category.name}
                </span>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-gray-600 dark:text-slate-200">Related Article</h2>
              <div className="mt-2 flex flex-col gap-2">
                {post?.related_article.map((item:RelatedArticle, index:number)=>(
                  <Link href={`/posts/${item.slug}/`} key={index} className="hover:underline">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default PostView;
