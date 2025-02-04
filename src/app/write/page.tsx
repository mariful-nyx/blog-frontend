"use client"

import useApi from "@/api/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import noImg from '@/assets/images/noImage.jpg'
import CategoryList from "@/components/common/categoryList";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchCategories } from "@/redux/categoriesSlice";
import { SubSubCategories } from "@/types/type";
import Select from 'react-select'
import Cookies from "js-cookie";
import { RxCross1 } from "react-icons/rx";
import { fetchTags } from "@/redux/tagSlice";
import { fetchPosts } from "@/redux/postsSlice";
import SlateEditor from '@/components/SlateEditor'
import Link from "next/link";

interface OptionType {
  label: string;
  value: number;
}


function Write() {
  const api = useApi()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [image, setImage] = useState<File | null>(null)


  const [formData, setFormData] = useState({
    thumbnail: null,
    thumbnailPreview: '',
    title: '',
    description: '',
    meta_title: '',
    meta_description: '',
    slug: '',
    tag: [],
    category: 0,
    categoryName: '',
    related_article: []
  })

  const { categories, isLoaded } = useSelector((state: RootState)=>state.categories)
  const { tags, isTagsLoaded } = useSelector((state: RootState)=>state.tags)
  const { posts, isPostsLoaded } = useSelector((state: RootState)=>state.posts)


  useEffect(()=>{
    if(!isLoaded){
      dispatch(fetchCategories())
    }
    if(!isTagsLoaded) {
      dispatch(fetchTags())
    }
    if(!isPostsLoaded) {
      dispatch(fetchPosts())
    }
    setFormData((prev)=>({
      ...prev,
      'user': Cookies.get('bpmUserID')
    }))
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
      setImage(files[0])

      api.createImage({image: files[0] || '', image_alt_text:  files[0].name || `image`}).then((response)=>{
        
        setFormData((prev)=>({
          ...prev,
          thumbnail: response.data?.id,
          thumbnailPreview: response.data?.image
        }))
        toast.success('Image uploaded successfully.')
      }).catch(()=>toast.error('Image upload failed !'))
      
    }
  }


  const handlePostCreate = (e: React.FormEvent) => {
    e.preventDefault()
    api.createPost(formData).then(()=>{
      toast.success('Successfully created !')
      router.replace('/')
    }).catch(()=>{
      toast.error('Error creating post !')
    })
  }


  const onSelect = (subsubcat: SubSubCategories) => {
    setFormData((prev)=>({
      ...prev,
      category: subsubcat.id,
      categoryName: subsubcat.name
    }))
  }


  const handleTagsAdd = (items: OptionType[]) => {
    const tags = items.map((item)=>item?.value)

    setFormData((prev)=>({
      ...prev,
      'tag': tags as [],
    }))
  }


  const handleArticleAdd = (items: OptionType[]) => {
    const relatedPosts = items.map((item)=>item?.value)

    setFormData((prev)=>({
      ...prev,
      'related_article': relatedPosts as [],
    }))
  }
  



  return (
    <div className="max-w-[1180px] mx-auto px-4 lg-px-10 mt-8">
      <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="thumbnail" className="text-sm text-slate-600">
              { image ? 
                <img
                  src={URL.createObjectURL(image)}
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

            <SlateEditor 
              onChange={(value:any)=>{
                setFormData((prev)=>({
                  ...prev,
                  'description': JSON.stringify(value)
                }))
              }}
            />

          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="meta_title" className="text-sm text-slate-600">
              Meta title
            </label>
            <input
              id="meta_title"
              name="meta_title"
              type="text"
              value={formData?.meta_title}
              onChange={handleChange}
              className="text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200"
              placeholder="Meta title"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="meta_description" className="text-sm text-slate-600">
              Meta description
            </label>
            <input
              id="meta_description"
              name="meta_description"
              type="text"
              value={formData?.meta_description}
              onChange={handleChange}
              className="text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200"
              placeholder="Meta description"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className="text-sm text-slate-600">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              value={formData?.slug}
              onChange={handleChange}
              className="text-slate-600 dark:text-slate-300 dark:bg-gray-800 w-full px-4 py-2 rounded-md border outline-none focus:outline-none  focus:outline-blue-600 duration-200"
              placeholder="slug"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm text-slate-600">
              Category
            </label>
            {formData?.categoryName && (
              <div className="bg-green-100 text-green-600 rounded-md px-4 py-1 w-fit flex gap-3 items-center">
                {formData?.categoryName} 
                <RxCross1 
                  className="cursor-pointer" 
                  onClick={()=>{
                    setFormData((prev)=>({
                      ...prev,
                      'category': 0,
                      'categoryName': ''
                    }))
                  }}
                />
              </div>
            )}
            <CategoryList categories={categories || []} onSelect={onSelect}/>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tag" className="text-sm text-slate-600">
              Tag
            </label>
              <Select
                isMulti
                name="" 
                options={tags?.map((tag)=>({label: tag.name, value: tag.id})) || []}
                onChange={(value: unknown)=>handleTagsAdd(value as [])}
              />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="related_article" className="text-sm text-slate-600">
              Related Article
            </label>
            <div className=" relative">

              <Select
                isMulti
                name="" 
                options={posts?.map((post)=>({label: post.title, value: post.id})) || []}
                onChange={(value: unknown)=>handleArticleAdd(value as [])}
              />
            </div>

          </div>

          <div className="flex flex-row gap-2 mt-3 justify-end">
            <Link
              href="/"
              className='border border-red-500 w-fit text-red-500  hover:bg-red-500 hover:text-white py-2 px-6 duration-200 font-bold'

            >
              Cancel
            </Link>
            <button
              onClick={handlePostCreate}
              className='bg-green-500 w-fit border border-green-500 text-white hover:bg-green-600 py-2 px-6 duration-200 font-bold'

            >
              Create
            </button>
          </div>
          

      </form>
    </div>
  );
}

export default Write;
