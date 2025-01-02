import { Categories, SubCategories, SubSubCategories } from "@/types/type";

export const getAllSubcategories = (categories: Categories[] ): string[] => {
    const result:string[] = [];

    
    if (Array.isArray(categories)){
      categories.forEach((category:Categories) => {
        if(category.subcategories){
          category.subcategories.forEach((subcategory:SubCategories) => {
            subcategory.subsubcategories?.forEach((subsubcat:SubSubCategories)=>{
              result.push(subsubcat.name); 

            })
          });
        }
      })}
  
    return result;
  };