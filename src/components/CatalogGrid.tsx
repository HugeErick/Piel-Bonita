import { db } from "@/lib/db";
import PostPic from "./PostPic";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

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
      <PostPic initialPosts={posts} />
      {/* pics end point */}
    </>
  );
};

export default CatalogGrid;
