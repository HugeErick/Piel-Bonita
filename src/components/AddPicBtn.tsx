"use client";

import { buttonVariants } from "./ui/Button";
import Link from "next/link";

interface AddPicBtnProps {
  params: {
    slug: string;
  };
}

const AddPicBtn = ({ params }: AddPicBtnProps) => {
  const slug = params.slug;

  return (
    <>
      <Link
        className={buttonVariants({
          variant: "default",
        })}
        href={`p/${slug}/submit`}
      >
        Add Pic
      </Link>
    </>
  );
};

export default AddPicBtn;
