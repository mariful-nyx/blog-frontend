'use client'
import { RootState, useAppDispatch } from "@/redux/store";
import React, { useEffect } from "react";

import Link from "next/link";
import { Categories } from "@/types/type";
import { useSelector } from "react-redux";
import { fetchCategories } from "@/redux/categoriesSlice";

function CategoryFolder({category}: {category:string}) {
  const { categories, isLoaded } = useSelector((state:RootState)=>state.categories)
  
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    if(!isLoaded){
      dispatch(fetchCategories())
    }
  },[isLoaded])


  function findCategoryPath(categories: Categories[], targetName: string): string[] | null {
    for (const category of categories) {
      if (category.subcategories){
        for (const subcate of category.subcategories){
          if (subcate.subsubcategories){
            for (const subsubcate of subcate.subsubcategories){
              if (subsubcate.name.toLowerCase() === targetName.toLowerCase()){
                console.log(category.name, subcate.name, subsubcate.name)
                return [category.name, subcate.name, subsubcate.name]
              }
            }
          }
        }
      }
      
    }
    return null;
  }


  return (
    <div>
      <div className="text-sm">
        <Link href={'/'} className="text-blue-600 hover:underline">{`home`}</Link> {` > `}{findCategoryPath(categories, category.split('-').join(' '))?.join(' > ')}
      </div>
    </div>
  )
}

export default CategoryFolder;
