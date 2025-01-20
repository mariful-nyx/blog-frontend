import React from "react";
import moment from "moment";
import Link from "next/link";
import { Post, PostListResponse } from "@/types/type";
import Image from "next/image";
import noImg from "@/assets/images/noImage.jpg"

function Posts({ data }: { data: PostListResponse }) {

  return (
    <div className="">
      <div className="">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-8 mt-4">
          {data?.results.map((post: Post, index: number) => (
            <div key={index} className="group dark:bg-gray-800 dark:rounded-md">
              <Link href={`/posts/${post.slug}`}>
                {post?.thumbnail ? 
                  <img
                    src={post?.thumbnail_img}
                    alt={post?.thumbnail_img.split("/").at(-1) || ""}
                    className="object-cover h-[200px] w-full overflow-hidden"
                  />
                  :
                <Image
                  src={noImg}
                  alt=""
                  className=" object-cover h-[200px] dark:mix-blend-overlay min-w-0"
                />
                }
              </Link>
              <div className="mt-3 dark:px-2 dark:pb-2">
                <Link
                  href={`/posts/${post.slug}`}
                  className="mt-1 font-bold text-lg group-hover:text-green-500 hover:dark:text-green-500 duration-200"
                >
                  {post.title}
                </Link>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  <div dangerouslySetInnerHTML={{ __html: post.description}} />
                </p>
                <div className="flex justify-between items-center gap-4 mt-4">
                  <Link
                    href={`/profile/${post.posted_by}`}
                    className="dark:text-gray-300 hover:dark:text-white hover:text-gray-600 text-sm"
                  >
                    <span 
                      className="text-gray-400"
                    >
                      By
                    </span> 
                    <span 
                      className="ml-2 font-semibold text-green-500 hover:text-green-800 duration-200"
                    >
                      {post.posted_by}
                    </span>
                  </Link>
                  <p className="text-[12px] text-blue-400 font-bold ">
                    {moment(post.updated_at).format("MMMM, DD, YYYY")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default Posts;
