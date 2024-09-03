import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { DlModel } from "@prisma/client";
import Image from "next/image";
import FavoriteToggleButton from "./FavouriteToggleButton";
function DlModelsList({ models }: { models: DlModel[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      {models.map((model) => {
        const { name, image } = model;
        const modelId = model.id;
        return (
          <article key={modelId} className="group relative">
            <Link href={`/models/${modelId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64  md:h-48 md:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="w-full rounded-md object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                  </div>
                  <p className="text-muted-foreground text-lg md:ml-auto"></p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-8 right-8 z-5">
              <FavoriteToggleButton modelId={modelId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default DlModelsList;
