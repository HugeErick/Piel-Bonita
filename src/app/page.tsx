import CatalogGrid from "@/components/CatalogGrid";
import HomePageWraper from "@/components/HomePageWraper";

export default function Home() {
  return (
    <>
      <HomePageWraper />
      <div className="flex flex-col mx-auto w-100">
      <div id="catalogue"></div>
      {/* @ts-expect-error */}
      <CatalogGrid />
       </div>
    </>
  );
}
