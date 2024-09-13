import BreadCrumbs from "@/components/singleModel/BreadCrumbs";
import Image from "next/image";
import CreatePatientPage from "@/components/patients/CreatePatientPage";
import SubmitReview from "@/components/reviews/SubmitReview";
import ModelReviews from "@/components/reviews/ModelReviews";
import FavouriteToggleButton from "@/components/dlModels/FavouriteToggleButton";
import ShareButton from "@/components/singleModel/ShareButton";
import ModelRating from "@/components/singleModel/ModelRating";
import { fetchSingleModel, findExistingReview } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";

async function SingleModelPage({ params }: { params: { id: string } }) {
  const { userId } = auth();

  const model = await fetchSingleModel(params.id);
  const modelId = params.id || "";
  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, modelId));

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
            <div className="flex items-center gap-x-2">
              <FavouriteToggleButton modelId={params.id} />
              <ShareButton name={model?.name || ""} modelId={params.id} />
            </div>
          </div>
          <ModelRating modelId={params.id} />

          <p className="mt-6 leading-8 text-muted-foreground">
            {model?.description}
          </p>
          <CreatePatientPage modelId={modelId} />
        </div>
      </div>
      <ModelReviews modelId={params.id} />
      {reviewDoesNotExist && <SubmitReview modelId={params.id} />}
      <SubmitReview modelId={params.id} />
    </section>
  );
}

export default SingleModelPage;
