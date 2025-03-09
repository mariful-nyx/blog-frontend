import Slider from "@/components/Home/Slider";
import Categories from "@/components/NestedCategory";
import Posts from "@/components/posts/Posts";
import TopAuthor from "@/components/Home/TopAuthor";
import { MoreOptionButton } from "@/components/button";
import { GetCategories, GetPosts, GetUsers } from "@/api/data";
import { Metadata } from "next";

const baseUrl = "https://predienblog.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Predien - Programming blog for developers and clients',
    description: "Predien team research for new inventions and problem solving. We don't work for personal benefit, but also for the benefit of everyone.",
    alternates: {
      canonical: `${baseUrl}/`,
    },

    openGraph: {
      title: 'Predien - Programming blog for developers and clients',
      description: "Predien team research for new inventions and problem solving. We don't work for personal benefit, but also for the benefit of everyone.",
      url: `${baseUrl}/`, // Using dynamic canonical URL
      images: '',
    },
    twitter: {
      card: "summary_large_image",
      title: "Predien - Programming blog for developers and clients",
      description: "Predien team research for new inventions and problem solving. We don't work for personal benefit, but also for the benefit of everyone.",
      images: "/",
    },
    icons: {
      icon: "/faviconUrl", // Dynamically set favicon
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home() {
  try {
    const data = await GetPosts({ ordering: '-created_at' }); // Fetch posts
    const userData = await GetUsers(); // Fetch user data
    const cateData = await GetCategories(); // Fetch categories

    return (
      <div className="">
        <Slider />
        <Categories categories={cateData} />
        <div className="max-w-[1180px] mx-auto px-10 py-6">
          <h2>Recent Posts</h2>
          <Posts data={data} />

          <div className="flex justify-center sm:justify-end mt-8">
            <MoreOptionButton buttonName="more" href="/post" />
          </div>

          <div className="mt-12">
            <TopAuthor data={userData} />
            <div className="flex justify-center sm:justify-end mt-8">
              <MoreOptionButton buttonName="see more" href="/author" />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data...</div>;
  }
}
