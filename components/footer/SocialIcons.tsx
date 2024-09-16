"use client";

import { TwitterIcon, LinkedinIcon } from "react-share";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

function SocialIcons() {
  return (
    <div className="flex justify-center items-center gap-3 mx-3">
      <motion.a
        variants={fadeIn("left", 0.9)}
        initial="hidden"
        whileInView={"show"}
        whileHover={"whileHover"}
        viewport={{ once: false, amount: 0.7 }}
        href="https://www.google.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon size={38} round />
      </motion.a>

      <motion.a
        variants={fadeIn("left", 0.9)}
        initial="hidden"
        whileInView={"show"}
        whileHover={"whileHover"}
        viewport={{ once: false, amount: 0.7 }}
        href="https://www.linkedin.com/in/muhammedcan-aydin-15a818249/?originalSubdomain=tr"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedinIcon size={38} round />
      </motion.a>

      <motion.a
        variants={fadeIn("left", 0.9)}
        initial="hidden"
        whileInView={"show"}
        whileHover={"whileHover"}
        viewport={{ once: false, amount: 0.7 }}
        href="https://www.google.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size={38} style={{ color: "purple" }} />
      </motion.a>
    </div>
  );
}

export default SocialIcons;
