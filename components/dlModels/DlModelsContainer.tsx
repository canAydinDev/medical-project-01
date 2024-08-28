import DlModelsGrid from "./DlModelsGrid";
import DlModelsList from "./DlModelsList";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAllModels } from "@/utils/actions";
import Link from "next/link";

async function DlModelsContainer( {layout, search}: {layout: string; search:string}) {
  const models = await fetchAllModels();
  const totalModels = models.length;
  const searchTerm = search? `&search=${search}`: "";
  return (
    <>
      <section>
        <div>
          
        </div>
      </section>
      <div>

      </div>
    </>
  )
}

export default DlModelsContainer