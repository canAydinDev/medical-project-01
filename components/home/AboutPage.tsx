"use client";

import SectionTitle from "@/components/global/SectionTitle";
import { fadeIn } from "@/utils/variants";
import { motion } from "framer-motion";

function AboutPage() {
  const paragraps = [
    "Bu site, sağlık profesyonellerine yönelik olarak geliştirilmiş, tıbbi hastalıkların taranmasına yardımcı olan derin öğrenme modellerini sunan bir platformdur.",
    "Amacımız, doktorlara en son yapay zeka teknolojilerini kullanarak hızlı ve güvenilir tarama sonuçları sağlayarak klinik karar süreçlerini desteklemektir. Yapay zeka tabanlı modellerimiz, özellikle malign melanom gibi ciddi hastalıkların tanısında yüksek doğruluk oranı sunarak, erken teşhisi kolaylaştırmayı hedeflemektedir.",
    "Bu platform, doktorların günlük pratiklerinde teknolojiden faydalanarak hastalara en iyi bakımı sunmalarını amaçlamaktadır. Sağlık alanındaki yenilikçi çözümlerimizi kullanarak, hastalıkların erken teşhisine katkıda bulunmayı ve sağlık hizmetlerinin kalitesini artırmayı hedefliyoruz.",
  ];
  return (
    <section className="pt-24">
      <SectionTitle text="Hakkımızda" />
      <motion.h1
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl mt-5"
      >
        Akilli
        <span className="bg-myColor py-2 px-4 rounded-lg tracking-widest text-white">
          saglik
        </span>
      </motion.h1>

      {paragraps.map((par, i) => {
        return (
          <motion.div
            key={i}
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground"
          >
            {par}
          </motion.div>
        );
      })}
    </section>
  );
}
export default AboutPage;
