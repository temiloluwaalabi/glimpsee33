// import { categoryService, feedService } from "@/lib/api/api";

export default async function Home() {
  // const feeds = await feedService.getFeedItems();
  // const categories = await categoryService.getCategories();
  // console.log("ALL FEEDS", feeds);
  // console.log("ALL CATEGORIES", categories);
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20"></div>
  );
}
