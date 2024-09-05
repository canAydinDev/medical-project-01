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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-y-6 gap-x-6">
        <div className="col-span-1 sm:col-span-2 relative h-full">
          <Image
            src={model?.image || ""}
            alt={model?.name || ""}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>

        <div className="col-span-1 sm:col-span-4 flex flex-col gap-x-8 items-start">
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">
              {model?.name || ""}
            </h1>
            <FavoriteToggleButton modelId={params.id} />
          </div>
          <ModelRating modelId={params.id} />
        </div>

        <div className="col-span-1 sm:col-span-6 lg:col-span-6 flex justify-center items-center">
          Buraya form gelecek
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-6">
        <p className="col-span-1 sm:col-span-6 mt-6 leading-8 text-muted-foreground">
          {model?.description}
        </p>
      </div>
    </section>
  );
}

export default SingleModelPage;
