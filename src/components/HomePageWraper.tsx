import { FC } from "react";
import { Icons } from "./Icons";
import { metadata } from "@/app/layout";

interface HomePageWraperProps {}

const HomePageWraper: FC<HomePageWraperProps> = ({}) => {
  return (
    <div className="flex items-center justify-center flex-col my-12">
      <div className="mt-12 flex flex-row">
        <Icons.tempLogo className="h-20 w-20 -mt-2 mx-2" />
        <h1 className="text-6xl font-extrabold text-black dark:text-white">
          {metadata.title}
        </h1>
      </div>
      <h2 className="text-4xl font-semibold mt-4 mx-2 ">{metadata.description}</h2>
    </div>
  );
};

export default HomePageWraper;
