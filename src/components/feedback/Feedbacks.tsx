import { db } from "@/lib/db";
import ExposeFeedbacks from "./ExposeFeedbacks";

const Feedbacks = async () => {
  const feedbacks = await db.feedbackPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      creator: true,
    },
  });

  return (
    <>
      <ExposeFeedbacks feedbacks={feedbacks} />
    </>
  );
};

export default Feedbacks;
