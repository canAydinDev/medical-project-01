"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

function PolicyForms() {
  return (
    <div className="flex-col justify-center items-center text-center my-5">
      <motion.div
        variants={fadeIn("up", 0.9)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      >
        <p className="text-gray-600 text-sm text-center">
          © 2024 MuhammedCan Aydin. All rights reserved. Medical Doctor & Full
          Stack Developer & Data Scientist
        </p>
      </motion.div>
      <div className="flex justify-evenly items-center my-5">
        <motion.div
          variants={fadeIn("right", 0.9)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          whileHover={"whileHover"}
        >
          <a className="underline underline-offset-4" href="/privacy-policy">
            Gizlilik Politikası
          </a>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.9)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          whileHover={"whileHover"}
        >
          <a className="underline underline-offset-4" href="/term-of-use">
            Kullanım Şartları
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default PolicyForms;
