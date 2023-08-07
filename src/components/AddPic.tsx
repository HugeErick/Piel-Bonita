import { Session } from "next-auth";
import { notFound } from "next/navigation";
import HomePageWraper from "./HomePageWraper";
import CatalogGrid from "./CatalogGrid";
import AddPicBtn from "./AddPicBtn";

interface AddPicProps {
  params: {
    session: Session | null;
    slug: string;
  };
}

const AddPic = ({ params }: AddPicProps) => {
  if (!params.session) return notFound();
  const { slug } = params;

  return (
    <>
      <HomePageWraper />
      <div className="flex justify-center items-center mx-auto">
        <AddPicBtn params={{ slug }} />
      </div>
      <div className="flex flex-col mx-auto w-100">
        <div id="catalogue"></div>
        {/* @ts-expect-error */}
        <CatalogGrid />
      </div>
    </>
  );
};

export default AddPic;
