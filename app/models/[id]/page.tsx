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
      <div className="flex justify-center">
        <div className="mt-6 grid gap-y-8 lg:grid-cols-5 lg:gap-x-6">
          {/* IMAGE FIRST COL */}
          <div className="relative h-full">
            <Image
              src={model?.image || ""}
              alt={model?.name || ""}
              fill
              sizes="(max-width:768px) 33vw,(max-width:1200px) 33vw,33vw"
              priority
              className="w-full rounded-md object-cover"
            />
          </div>
          {/* PRODUCT INFO SECOND COL */}
          <div>
            <div className="flex gap-x-4 items-center">
              <h1 className="capitalize text-3xl font-bold">
                {model?.name || ""}
              </h1>
              <FavoriteToggleButton modelId={params.id} />
            </div>
            <ModelRating modelId={params.id} />
            <h4 className="text-xl mt-2">{model?.name || ""}</h4>
          </div>
        </div>
        <div className="flex gap-x-4 items-center">
          <form action="">
            <label htmlFor="">Hasta adi soyadi</label>
            <input type="text" className="border" />
            <label htmlFor="">nevus foto</label>
            <input type="image" className="border" />
          </form>
        </div>
      </div>
    </section>
  );
}
export default SingleModelPage;
