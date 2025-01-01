import React from "react";
import Link from "next/link";
import { PaginatedUsers, User } from "@/types/type";
import RoleBadge from "../badge/RoleBadge";
import { FaRegUserCircle } from "react-icons/fa";


function TopAuthor({data}: {data: PaginatedUsers}) {

  return (
    <div className="">
      <h2 className="mb-4">TopAuthor</h2>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml:grid-cols-4 gap-4">
          {data?.results.map((author:User, index:number) => (
            <Link
              href={`/profile/${author.username}`}
              key={index}
              className="relative group flex flex-col justify-items-center items-center bg-white px-4 pt-10 pb-4 rounded-md shadow-md hover:shadow-lg"
            >
              <div className="absolute top-0 right-0">
                <RoleBadge name={author.role}/>
              </div>
              {author?.avater ? 
                  <img
                    src={author.avater}
                    alt={author?.avatar?.split("/").at(-1) || ""}
                    className="h-[100px] w-[100px] aspect-square rounded-full object-cover mb-3"
                  />
                : 
                  <FaRegUserCircle 
                    className="h-[100px] w-[100px] aspect-square rounded-full object-cover mb-3"
                  /> 
              }
              <div
                className="text-nowrap uppercase font-semibold text-sm text-slate-700 group-hover:text-blue-500 duration-200 "
              >
                {author.first_name} {author.last_name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopAuthor;
