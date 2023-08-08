import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { Icons } from "./Icons";

const BackToHomeBtn = () => {
  return (
    <div className="-mt-16">
      <Link
        href="/"
        className={cn("rounded-[2vh] stroke-white ", buttonVariants())}
      >
        <Icons.home className="h-10 w-10" />
      </Link>
    </div>
  );
};

export default BackToHomeBtn;
