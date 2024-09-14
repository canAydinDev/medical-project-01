import Link from "next/link";
import { Button } from "../ui/button";

function HeroText() {
  const heroText = ["hemen başlayın", "hep yanınızdayız"];
  const heroContent = [
    "Tamamen ücretsiz modellerimizi kullanmaya hemen başlayın. Tanılarınızı modellerimizle destekleyin.",
    "Tüm tanı sürecinde bizden destek alabilirsiniz.",
  ];
  const indexes = [0];

  return (
    <div className="lg:hidden relative z-20">
      {" "}
      {indexes.map((index) => (
        <div key={index} className="text-center">
          <h3 className="max-w-2xl font-bold text-2xl tracking-tight sm:text-4xl capitalize text-center text-gray-600">
            {heroText[index]}
          </h3>
          <p className="mt-2 max-w-xl text-lg leading-8 text-muted-foreground text-gray-100">
            {heroContent[index]}
          </p>
          <div className="mt-8">
            <Button>
              <Link href="models/" className="cursor-pointer">
                Popüler Modeller
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HeroText;
