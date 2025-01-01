import React from "react";
import moment from "moment";
import Link from "next/link";
import { Post, PostListResponse } from "@/types/type";
import { MdOutlineImageNotSupported } from "react-icons/md";

function Posts({ data }: { data: PostListResponse }) {
  return (
    <div className="">
      <div className="">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-8 mt-4">
          {data?.results.map((post: Post, index: number) => (
            <div key={index} className="group">
              <Link href={`/posts/${post.slug}`}>
                {post?.thumbnail ? 
                  <img
                    src={post?.thumbnail}
                    alt={post?.thumbnail.split("/").at(-1) || ""}
                    height={200}
                    className="aspect-video object-cover"
                  />
                  :
                  <MdOutlineImageNotSupported 
                    className="h-[200px] w-full aspect-video text-red-200" 
                  />
                }
              </Link>
              <div className="mt-3">
                <Link
                  href={`/posts/${post.slug}`}
                  className="mt-1 font-bold text-lg group-hover:text-green-500 hover:dark:text-green-500 duration-200"
                >
                  {post.title}
                </Link>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{post.description}</p>
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
