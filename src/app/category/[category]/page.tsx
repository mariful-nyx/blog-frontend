import CategoryFolder from "@/app/category/component/CategoryFolder";
import React from "react";
import Categories from "@/components/NestedCategory";
import { GetCategories, GetPosts } from "@/api/data";
import Posts from "@/components/posts/Posts";


async function Category({ params }: { params: { category: string } }) {
  const cateData = await GetCategories()
  const posts = await GetPosts()

  return (
    <div className="">
        <Categories categories={cateData} />
        <div className="flex justify-center py-6 max-w-[1180px] mx-auto">
          <strong className="text-xl text-green-500">{params.category.split('-').join(' ')}</strong>
        </div>
        <div className="flex items-center h-[15vh] max-w-[1180px] mx-auto px-4 md:px-10">
          <CategoryFolder category={params.category} />
        </div>
        <div className="max-w-[1180px] mx-auto px-4 md:px-10">
          <Posts data={posts}/>
        </div>
    </div>
  );
}

export default Category;
