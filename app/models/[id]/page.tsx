import BreadCrumbs from "@/components/singleModel/BreadCrumbs";
import { fetchSingleModel } from "@/utils/actions";
import Image from "next/image";
import CreatePatientPage from "@/components/patients/CreatePatientPage";
import { Card, CardContent } from "@/components/ui/card";
import FavouriteToggleButton from "@/components/dlModels/FavouriteToggleButton";

async function SingleModelPage({ params }: { params: { id: string } }) {
  const model = await fetchSingleModel(params.id);
  const modelId = params.id || "";
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
            <FavouriteToggleButton modelId={params.id} />
          </div>

          <p className="mt-6 leading-8 text-muted-foreground">
            {model?.description}
          </p>
          <CreatePatientPage modelId={modelId} />
        </div>
      </div>
    </section>
  );
}

export default SingleModelPage;
