"use client"

import useApi from "@/api/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import noImg from '@/assets/images/noImage.jpg'
import CategoryList from "@/components/common/categoryList";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchCategories } from "@/redux/categoriesSlice";
import { SubSubCategories } from "@/types/type";
import Select from 'react-select'

function Write() {
  const api = useApi()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    thumbnail: null,
    title: '',
    description: '',
    tag: [],
    category: 0,
    categoryName: '',
    related_article: []
  })

  const { categories, isLoaded } = useSelector((state: RootState)=>state.categories)
  const [isOpenRelatedArticleList, setIsOpenRelatedArticleList] = useState<boolean>(false)

  useEffect(()=>{
    if(!isLoaded){
      dispatch(fetchCategories())
    }
  }, [dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev)=>({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement
    if(files && files[0]) {
      setFormData((prev)=>({
        ...prev,
        [e.target.name]: files[0]
      }))
    }
  }



  const onClose = () => {
    setIsOpen(!isOpen)
  }



  const handlePostCreate = (e: React.FormEvent) => {
    e.preventDefault()
    api.createPost(formData).then(()=>{
      toast.success('Successfully created !')
      router.replace('/')
      onClose()
    }).catch(()=>{
      toast.error('Error update info !')
    })
  }


  const onSelect = (subsubcat: SubSubCategories) => {
    setFormData((prev)=>({
      ...prev,
      category: subsubcat.id,
      categoryName: subsubcat.name
    }))
  }

  const [articleSearch, setArticleSearch] = useState<string>()
  const inputRef = useRef(null); // Create a reference to the input

  const handleArticleAdd = (items: object[]) => {
    items.map((item)=>console.log(item))
  }

  // const handleArticleSearch = (e) => {
  //   setArticleSearch()
  // }

  return (
    <div className="max-w-[1180px] mx-auto px-4 lg-px-10 mt-8">
      <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="thumbnail" className="text-sm text-slate-600">
              {formData?.thumbnail ? 
                <img
                  src={URL.createObjectURL(formData?.thumbnail)}
                  alt=""
                  className="h-[200px] w-[300px] object-cover"
                />
                :
                <Image
                  src={noImg}
                  alt="no-image"
                  className="h-[200px] w-[300px] object-cover"
                />
              }
            </label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm text-slate-600">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData?.title}
              onChange={handleChange}
              className="text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200"
              placeholder="First name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm text-slate-600">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={formData?.description}
              onChange={handleChange}
              className="text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200"
              placeholder="Description"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm text-slate-600">
              Category
            </label>
            <div className="bg-green-100 text-green-600 rounded-md px-4 py-1 w-fit">
              {formData?.categoryName}
            </div>
            <CategoryList categories={categories || []} onSelect={onSelect}/>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tag" className="text-sm text-slate-600">
              Tag
            </label>
            <div className="bg-green-100 text-green-600 rounded-md px-4 py-1 w-fit">
              {formData?.categoryName}
            </div>
            <CategoryList categories={categories || []} onSelect={onSelect}/>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="related_article" className="text-sm text-slate-600">
              Related Article
            </label>
            <div className="bg-green-100 text-green-600 rounded-md px-4 py-1 w-fit">
              {formData?.categoryName}
            </div>
            <div className=" relative">
              {/* <input
                ref={inputRef}
                id="related_article"
                name="related_article"
                placeholder="search related article"
                onClick={()=>{
                  if(isOpenRelatedArticleList===false){
                    setIsOpenRelatedArticleList(true)
                  }
                }}
                value={articleSearch}
                onChange={(e)=>setArticleSearch(e.target.value)}
                className="text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200"
              />
              <ul className={`${isOpenRelatedArticleList ? 'block': 'hidden'} mt-3 border rounded-md p-3`}>
                {}
                <li className="border-b"> fdvfd</li>

              </ul> */}

              <Select 
                name="" 
                options={[{label: 'sdfcvdscds', value: 'dscvdf'}, {label: 'dfvsdcsfs', value: 'ghngfdvfd'}, {label: 'jkmhgfgfd', value: 'bvrtgtr'}]}
                // isMulti={true}
                onChange={handleArticleAdd}
              />
            </div>

          </div>

          <div className="flex flex-col gap-2 mt-3">
            <button
              onClick={handlePostCreate}
              className='bg-green-600 w-fit text-white rounded-md hover:bg-green-800 py-1 px-4 duration-200 font-bold'

            >
              Create
            </button>
          </div>
          

      </form>
    </div>
  );
}

export default Write;
