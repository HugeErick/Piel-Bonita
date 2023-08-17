"use client";

import { cn } from "@/lib/utils";
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
        className={cn(
          buttonVariants({
            variant: "default",
          }),
          "rounded-[2vh] my-2"
        )}
        href={`p/${slug}/submit`}
      >
        Add Pic
      </Link>
    </>
  );
};

export default AddPicBtn;
