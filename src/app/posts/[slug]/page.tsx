
import moment from "moment";
import { Metadata } from "next";
import { Post } from "@/api/data";
import { JSDOM } from 'jsdom';
import Link from "next/link";
import { PostType, RelatedArticle, Tag } from "@/types/type";


const baseUrl = process.env.BASE_URL

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await Post(params.slug);

  return {
    title: post?.title,
    description: post?.description,
    alternates: {
      canonical: `${baseUrl}/posts/${post?.slug}`
    },

    openGraph: {
      title: post?.title,
      description: post?.description,
      url: `${baseUrl}/posts/${post?.slug}`, // Using dynamic canonical URL
      images: [{ url: post?.thumbnail_img }],
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.description,
      images: post?.thumbnail_img,
    },
    icons: {
      icon: "/faviconUrl", // Dynamically set favicon
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function PostView({ params }: { params: { slug: string } }) {
  const post:PostType = await Post(params.slug);
  console.log(post)

  const dom = new JSDOM(post?.description);
  const headings = Array.from(dom.window.document.querySelectorAll('h2')).map(h2 => h2?.textContent || '');

  return (
    <>
      <div className="max-w-[1180px] mx-auto">
        <div className="flex mb-24 mt-12">
          <div className="px-6 w-[70%] border-r">

            <div className="text-5xl font-extralight">{post?.title}</div>
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
              <div
                dangerouslySetInnerHTML={{ __html: post?.description || "" }}
              />
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {post?.tag.map((item:Tag, index:number)=>(
                <div key={index} className="px-3 py-[2px] bg-blue-50 text-blue-600 rounded-md" role="button">
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div className="w-[30%] px-6 sticky" >
            <div>
              <h2 className="text-gray-600 dark:text-slate-500">Contents</h2>
              <div className="mt-2 flex flex-col gap-2">
                {headings?.map((item, index)=>(
                  <Link href={`#${index+1}`} role="button" key={index} className="text-sm font-semibold hover:underline">
                    {item}  
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-gray-600 dark:text-slate-500">Category</h2>
              <div className="mt-2">
                <span 
                  className="text-emerald-600 bg-emerald-100 rounded-md px-4 py-1"
                >
                  {post?.category.name}
                </span>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-gray-600 dark:text-slate-500">Related Article</h2>
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
