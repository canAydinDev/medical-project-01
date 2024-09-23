"use client";
import { fadeIn } from "@/utils/variants";
import SectionTitle from "../global/SectionTitle";
import { motion } from "framer-motion";
import ReviewsHomePage from "./ReviewsHomePage"; // İstemci bileşeni

function ReviewMotionPage() {
  return (
    <>
      <SectionTitle text="Güncel yorumlar" />
      <motion.section
        variants={fadeIn("left", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      >
        <ReviewsHomePage />
      </motion.section>
    </>
  );
}

export default ReviewMotionPage;
