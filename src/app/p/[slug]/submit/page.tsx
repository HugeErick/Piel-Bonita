import BackToHomeBtn from "@/components/BackToHomeBtn";
import { Editor } from "@/components/Editor";
import { Button } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const session = await getAuthSession();
  if (!session) return notFound();

  const isAdmin = await db.admin.findFirst({
    where: {
      adminname: params.slug,
      userId: session.user.id,
    },
  });

  if (!isAdmin) return notFound();

  return (
    <div className="flex flex-col items-start gap-6 mb-2 mt-20">
      <div className="mt-10">
        <BackToHomeBtn />
      </div>
      <div className="border-b border-gray-200 pb-5">
        <div className="ml-2 -mt-2 flex flex-col flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6">
            Lets add a picture
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            in the homepage 😊
          </p>
        </div>
      </div>

      <Editor />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full mt-2 mb-4" form="addpic-post-form">
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
