import SectionTitle from "@/components/global/SectionTitle";

function AboutPage() {
  return (
    <section className="pt-24">
      <SectionTitle text="hakkimizda"/>
    <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl mt-10">
      Akilli
      <span className="bg-myColor py-2 px-4 rounded-lg tracking-widest text-white">
        saglik
      </span>
    </h1>
    <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
      Bu site, sağlık profesyonellerine yönelik olarak geliştirilmiş, tıbbi
      hastalıkların taranmasına yardımcı olan derin öğrenme modellerini sunan
      bir platformdur.
    </p>
    <br />
    <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">Amacımız, doktorlara en son yapay zeka teknolojilerini
      kullanarak hızlı ve güvenilir tarama sonuçları sağlayarak klinik karar
      süreçlerini desteklemektir. Yapay zeka tabanlı modellerimiz, özellikle
      malign melanom gibi ciddi hastalıkların tanısında yüksek doğruluk oranı
      sunarak, erken teşhisi kolaylaştırmayı hedeflemektedir. </p>
      <br />
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">Bu platform,
      doktorların günlük pratiklerinde teknolojiden faydalanarak hastalara en
      iyi bakımı sunmalarını amaçlamaktadır. Sağlık alanındaki yenilikçi
      çözümlerimizi kullanarak, hastalıkların erken teşhisine katkıda
      bulunmayı ve sağlık hizmetlerinin kalitesini artırmayı hedefliyoruz.</p>
  </section>
  );
}
export default AboutPage;