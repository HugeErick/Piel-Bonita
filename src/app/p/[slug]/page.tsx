import AddPic from "@/components/AddPic";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const session = await getAuthSession();
  if (!session) return notFound();

  const { slug } = params;

  const admin = await db.admin.findFirst({
    where: { adminname: slug, userId: session.user.id },
  });

  if (!admin) return notFound();

  return (
    <>
      <AddPic params={{session, slug}} />
    </>
  );
};

export default page;
