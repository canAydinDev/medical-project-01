import BreadCrumbs from "@/components/singleModel/BreadCrumbs";
import { fetchSingleModel } from "@/utils/actions";
import Image from "next/image";
import FavoriteToggleButton from "@/components/dlModels/FavouriteToggleButton";
import ModelRating from "@/components/singleModel/ModelRating";
import CreatePatientPage from "@/components/patients/CreatePatientPage";
import { Card, CardContent } from "@/components/ui/card";

async function SingleModelPage({ params }: { params: { id: string } }) {
  const model = await fetchSingleModel(params.id);
  const modelId = params.id || "";
  return (
    <section>
      <BreadCrumbs name={model?.name || ""} />

      <div className="grid grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
            <CardContent className="p-4">
              <div className="relative h-64 md:h-48 rounded overflow-hidden ">
                <Image
                  src={model?.image || ""}
                  alt={model?.name || ""}
                  fill
                  sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                  priority
                  className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-lg  capitalize text-myColor">
                  {model?.name || ""}
                </h2>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-6 ">
          <CreatePatientPage modelId={modelId} />
        </div>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-lg  capitalize text-myColor">
          {model?.name || ""}
        </h2>
        <p>{model?.description}</p>
      </div>
    </section>
  );
}

export default SingleModelPage;
