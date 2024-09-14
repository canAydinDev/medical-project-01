import LoadingContainer from "@/components/global/LoadingContainer";
import AboutPage from "@/components/home/AboutPage";
import FeaturedModels from "@/components/home/FeaturedModels";
import Hero from "@/components/home/Hero";
import ReviewMotionPage from "@/components/reviews/ReviewMotionPage";
import ReviewsHomePage from "@/components/reviews/ReviewsHomePage";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedModels />
      </Suspense>
      <ReviewMotionPage />
      <AboutPage />
    </>
  );
}
