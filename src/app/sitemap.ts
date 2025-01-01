import { GetPosts } from "@/api/data";
import { MetadataRoute } from "next";
import category from '@/category.json'
import { getAllSubcategories } from "@/components/common/getAllSubCate";
import { PostType } from "@/types/type";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts:PostType[] = await GetPosts({all_items:true});

  const postsSitemap = posts?.map((post:PostType) => ({
    url: `${process.env.BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));

  const subCategories = getAllSubcategories(category)

  const categoriesSitemap = subCategories.map((cat)=>({
    url: `${process.env.BASE_URL}/category/${cat.toLowerCase().split(' ').join('-')}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }))

  const routers = [
    '/',
    '/author',
    '/news',
    '/post',
    
    
  ]

  const routersSitemap = routers.map((route)=>({
    url: `${process.env.BASE_URL}/${route}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }))

  return [
    ...routersSitemap,
    ...postsSitemap,
    ...categoriesSitemap
  ] as MetadataRoute.Sitemap;
}
