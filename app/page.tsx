import LoadingContainer from "@/components/global/LoadingContainer";
import AboutPage from "@/components/home/AboutPage";
import FeaturedModels from "@/components/home/FeaturedModels";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedModels />
      </Suspense>
      <AboutPage />
    </>
  );
}
