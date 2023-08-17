import { db } from "@/lib/db";
import PostPic from "./PostPic";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { metadata } from "@/app/layout";

const CatalogGrid = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  return (
    <>
      {/* pics start point */}
      <h5 className="text-2xl antialiased my-2 mx-auto">
        {metadata.title} News!{" "}
      </h5>
      <PostPic initialPosts={posts} />
      {/* pics end point */}
    </>
  );
};

export default CatalogGrid;
