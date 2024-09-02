import DlModelsGrid from "./DlModelsGrid";
import DlModelsList from "./DlModelsList";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAllModels } from "@/utils/actions";
import Link from "next/link";

async function DlModelsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const models = await fetchAllModels({ search });
  const totalModels = models.length;
  const searchTerm = search ? `&search=${search}` : "";
  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg text-myColor">
            {totalModels} model{totalModels > 1 && " bulundu"}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layout === "grid" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/models?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layout === "list" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/models?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* MODELS */}
      <div>
        {totalModels === 0 ? (
          <h5 className="text-2xl mt-16">
            Uzgunuz, aramaniz sonucunda hic bir model bulunamadi...
          </h5>
        ) : layout === "grid" ? (
          <DlModelsGrid models={models} />
        ) : (
          <DlModelsList models={models} />
        )}
      </div>
    </>
  );
}

export default DlModelsContainer;
