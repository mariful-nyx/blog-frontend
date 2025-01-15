import { GetCategories, GetPosts } from "@/api/data";
import { MetadataRoute } from "next";
import { getAllSubcategories } from "@/components/common/getAllSubCate";
import { PostType } from "@/types/type";
import { env } from "process";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts:PostType[] = await GetPosts({all_items:true});
  const BASE_URL = env.NODE_ENV === "production" ? 'https://predienblog.vercel.app' : 'http://localhost:3000'

  const postsSitemap = posts?.map((post:PostType) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));

  const cateData = await GetCategories()

  const subCategories = getAllSubcategories(cateData)

  const categoriesSitemap = subCategories.map((cat)=>({
    url: `${BASE_URL}/category/${cat.toLowerCase().split(' ').join('-')}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }))

  const routers = [
    '',
    '/author',
    '/news',
    '/post',
  ]

  const routersSitemap = routers.map((route)=>({
    url: `${BASE_URL}${route}/`,
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
