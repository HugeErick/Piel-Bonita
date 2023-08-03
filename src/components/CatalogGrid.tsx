import { FC } from "react";
import imageSample1 from "../../sampleImages/sampleImage1.jpg";
import imageSample2 from "../../sampleImages/sampleImage2.jpg";
import Image from "next/image";

interface CatalogGridProps {}

const CatalogGrid: FC<CatalogGridProps> = ({}) => {
  const photoTitle = "image sample 1";
  return (
    <div className="flex justify-center items-center mt-14 border boder-solid border-emerald-500 rounded-lg">
      <div className="grid grid-rows-3 grid-cols-2 gap-x-10 gap-y-6 w-100" >
        {/* <img src={imageSample1} alt={photoTitle} className="w-10 h-10" /> */}
        <Image src={imageSample1} alt={photoTitle} className="w-80 h-80" referrerPolicy="no-referrer" />
        <Image src={imageSample2} alt={photoTitle} className="w-80 h-80" referrerPolicy="no-referrer" />
      </div>
    </div>
  );
};

export default CatalogGrid;
