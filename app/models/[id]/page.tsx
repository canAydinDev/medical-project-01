import BreadCrumbs from "@/components/singleModel/BreadCrumbs";
import { fetchSingleModel } from "@/utils/actions";
import Image from "next/image";
import FavoriteToggleButton from "@/components/dlModels/FavouriteToggleButton";
import ModelRating from "@/components/singleModel/ModelRating";

async function SingleModelPage({ params }: { params: { id: string } }) {
  const model = await fetchSingleModel(params.id);

  return (
    <section>
      <BreadCrumbs name={model?.name || ""} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative h-full">
          <Image
            src={model?.image || ""}
            alt={model?.name || ""}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">
              {model?.name || ""}
            </h1>
            <FavoriteToggleButton modelId={params.id} />
          </div>
          <ModelRating modelId={params.id} />

          <p className="mt-6 leading-8 text-muted-foreground">
            {model?.description}
          </p>
        </div>
      </div>
    </section>
  );
}
export default SingleModelPage;
