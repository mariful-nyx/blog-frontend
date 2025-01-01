'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown  } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Categories as CateType, SubCategories, SubSubCategories } from '@/types/type';

const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [handler]);

  return ref;
};


const CategoryComponent: React.FC<{ category: CateType }> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subIsOpen, setSubIsOpen] = useState<number | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubToggle = (id: number) => {
    setSubIsOpen(subIsOpen === id ? null : id);
  };

  const ref = useClickOutside(() => {
    setIsOpen(false)
    setSubIsOpen(null)
  })

  return (
    <li className="relative">
      <button 
        onClick={handleToggle} 
        className={`cursor-pointer px-4 py-2 
                    ${ isOpen ? 'text-blue-400': ''} 
                    hover:text-blue-400 duration-200 group flex flex-nowrap items-center gap-2 text-nowrap`
                  }
      >
        {category.name} {isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
      </button>

      {isOpen && category.subcategories && category.subcategories.length > 0 && (
        <ul ref={ref} className="absolute left-0 bg-white shadow-lg mt-1 w-fit z-10 list-none">
          {category?.subcategories.map((subcategory:SubCategories) => (
            <li key={subcategory.id} className="relative">
              <button
                onClick={() => handleSubToggle(subcategory.id)}
                className={`cursor-pointer flex flex-nowrap justify-between items-center pl-4 pr-3 py-1 hover:bg-blue-100 text-black 
                  ${ subIsOpen === subcategory.id ? 
                    'text-blue-600 bg-blue-100' 
                    : 
                    '' } hover:text-blue-600 duration-200 w-full text-left text-nowrap`
                  }
              >
                <span>{subcategory.name}</span> 
                <span className='ml-1'>{subcategory.subsubcategories && <MdOutlineKeyboardArrowRight /> } </span>
              </button>

              {subIsOpen === subcategory.id &&
                subcategory.subsubcategories &&
                subcategory.subsubcategories.length > 0 && (
                  <ul className="list-none absolute top-0 left-full bg-white shadow-lg w-fit text-nowrap z-10">
                    {subcategory?.subsubcategories?.map((subSubcategory: SubSubCategories) => (
                      <li key={subSubcategory.id}>
                        <Link 
                          href={`/category/${subSubcategory.name.toLowerCase().split(' ').join('-')}/`}  
                          className="duration-200 cursor-pointer block px-4 py-2 hover:bg-blue-100 text-black hover:text-blue-600"
                        >
                          {subSubcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

// Parent Component to render the main list of categories
const Categories: React.FC<{ categories: CateType[] }> = ({ categories }) => {
  return (
    <nav className="bg-gray-800 text-white ">
      <ul className="flex flex-wrap space-x-4 list-none max-w-[1180px] mx-auto">
        {categories?.map((category) => (
          <CategoryComponent key={category.id} category={category} />
        ))}
      </ul>
    </nav>
  );
};

export default Categories