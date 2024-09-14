import { DlModel } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import FavouriteToggleButton from "./FavouriteToggleButton";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

function DlModelsGrid({ models }: { models: DlModel[] }) {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {models.map((model) => {
        if (!model) return null;
        const { name, image } = model;
        const modelId = model.id;
        return (
          <article key={modelId} className="group relative">
            <Link href={`/models/${modelId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-4">
                  <div className="relative h-64 md:h-48 rounded overflow-hidden ">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg  capitalize text-myColor">{name}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7 z-5">
              <FavouriteToggleButton modelId={modelId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default DlModelsGrid;
