import { Categories, Subcategory } from "@/types/type";

export const getAllSubcategories = (categories: Categories[] ): string[] => {
    let result:string[] = [];

    
    if (Array.isArray(categories)){
      categories.forEach((category:Categories) => {
        category.subcategories.forEach((subcategory:Subcategory) => {
          result.push(subcategory.name); // Add the subcategory name
    
          if (subcategory.subcategories) {
            result = result.concat(getAllSubcategories([subcategory as Categories])); // Recursively add sub-subcategories
          }
        });
      })}
  
    return result;
  };