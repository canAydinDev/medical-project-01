"use client";

import { termsOfUse } from "@/utils/articles";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

function TermsOfUsePage() {
  return (
    <div className="text-center mx-52">
      <h1 className="text-3xl font-bold mb-6">Gizlilik Politikası</h1>

      {termsOfUse.map((text, index) => (
        <>
          <motion.h2
            key={index}
            variants={fadeIn("up", 0.9)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="text-xl font-semibold m-6 "
          >
            {text.heading}
          </motion.h2>
          <motion.p
            key={index}
            variants={fadeIn("up", 0.9)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="m-4"
          >
            {text.paragraph}
          </motion.p>
        </>
      ))}
    </div>
  );
}

export default TermsOfUsePage;
