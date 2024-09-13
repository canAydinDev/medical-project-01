import { fetchFeaturedModels } from "../../utils/actions";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import DlModelsGrid from "../dlModels/DlModelsGrid";

async function FeaturedModels() {
  const models = await fetchFeaturedModels();
  if (models.length === 0) return <EmptyList />;

  return (
    <section className="pt-24">
      <SectionTitle text="Popüler modeller" />
      <DlModelsGrid models={models} />
    </section>
  );
}

export default FeaturedModels;
