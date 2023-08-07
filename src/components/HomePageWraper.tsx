import { FC } from "react";
import { Icons } from "./Icons";
import { metadata } from "@/app/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";

interface HomePageWraperProps {}

const HomePageWraper: FC<HomePageWraperProps> = ({}) => {
  return (
    <div className="flex items-center justify-center flex-col my-12">
      <div className="mt-12 flex flex-row">
        <Icons.tempLogo className="h-20 w-20 -mt-2 mx-2" />
        <h1
          className="text-6xl font-extrabold text-black dark:text-white"
          style={{ textShadow: "0 0.1rem 0 #fff, 0 0 8rem rgba(0,0,0,.8)" }}
        >
          {metadata.title}
        </h1>
      </div>
      <h2 className="text-4xl font-semibold mt-10 mx-2 mb-4 ">
        {metadata.description}
      </h2>
      <div className="mx-10 my-16">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="only-item">
            <AccordionTrigger>What is {metadata.title}? </AccordionTrigger>
            <AccordionContent>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur doloribus, tenetur suscipit dignissimos expedita esse,
              laboriosam, fuga hic dolorum earum dolor. Ipsa quibusdam doloribus
              perspiciatis modi corrupti adipisci. Sint, architecto?
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default HomePageWraper;
