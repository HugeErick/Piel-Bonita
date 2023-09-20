import CatalogGrid from "@/components/CatalogGrid";
import HomePageWraper from "@/components/HomePageWraper";
import Feedbacks from "@/components/feedback/Feedbacks";
import PostFeedback from "@/components/feedback/PostFeedback";

export default function Home() {
  return (
    <>
      <HomePageWraper />
      <div className="flex flex-col mx-auto w-100">
        <div id="catalogue"></div>
        {/* @ts-expect-error */}
        <CatalogGrid />
      </div>
      <h3 className="text-xl text-black dark:text-white">
        Write your experience
      </h3>
      <PostFeedback />
      {/* @ts-expect-error */}
      <Feedbacks />
    </>
  );
}
