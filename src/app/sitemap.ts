import { GetCategories, GetPosts } from "@/api/data";
import { MetadataRoute } from "next";
import { getAllSubcategories } from "@/components/common/getAllSubCate";
import { PostType } from "@/types/type";
import process from "process";

const BASE_URL = process.env.NODE_ENV === "production" ? 'https://predienblog.vercel.app' : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts: PostType[] = await GetPosts({ all_items: true });

    const postsSitemap = posts?.map((post: PostType) => ({
      url: `${BASE_URL}/posts/${post.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    }));

    const cateData = await GetCategories();
    const subCategories = getAllSubcategories(cateData);

    const categoriesSitemap = subCategories.map((cat) => ({
      url: `${BASE_URL}/category/${cat.toLowerCase().split(' ').join('-')}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    }));

    const routers = ['', '/author', '/post', '/about'];

    const routersSitemap = routers.map((route) => ({
      url: `${BASE_URL}${route}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    }));

    return [
      ...routersSitemap,
      ...postsSitemap,
      ...categoriesSitemap,
    ] as MetadataRoute.Sitemap;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return []; // Fallback to an empty array if an error occurs
  }
}
