
import Slider from "@/components/Home/Slider";
import Categories from "@/components/NestedCategory";
import Posts from "@/components/posts/Posts";
import TopAuthor from "@/components/Home/TopAuthor";
import useApi from "@/api/api";
import { MoreOptionButton } from "@/components/button";
import { GetCategories, GetUsers } from "@/api/data";

export default async function Home() {
  const api = useApi()

  const response = await api.posts({ordering: '-created_at'})
  const data = await response.data

  const userData = await GetUsers()

  const cateData = await GetCategories()

  return (
    <div className="">
      <Slider/>
      <Categories categories={cateData}/>
      <div className="max-w-[1180px] mx-auto px-10 py-6">

        <h2>Recent Posts</h2>
        <Posts data={data}/>

        <div className="flex justify-center sm:justify-end mt-8">
          <MoreOptionButton buttonName="more" href="/post"/>
        </div>

        <div className="mt-12">
          <TopAuthor data={userData}/>
          <div className="flex justify-center sm:justify-end mt-8">
            <MoreOptionButton buttonName="see more" href="/news"/>
          </div>
        </div>
      </div>
      
     
    </div>
  );
}
