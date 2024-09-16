"use client";

import Link from "next/link";
import React from "react";
import { IoMdMedical } from "react-icons/io";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

function PersonelLogo() {
  return (
    <motion.div
      variants={fadeIn("up", 0.9)}
      initial="hidden"
      whileInView={"show"}
      whileHover={"whileHover"}
      viewport={{ once: false, amount: 0.7 }}
      className="rounded-full bg-myColor text-myColor-foreground p-2"
    >
      <Link href="/">
        <IoMdMedical className="w-6 h-6" />
      </Link>
    </motion.div>
  );
}

export default PersonelLogo;
