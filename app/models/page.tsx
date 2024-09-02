import DlModelsContainer from "@/components/dlModels/DlModelsContainer";

function ModelsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";

  return <DlModelsContainer layout={layout} search={search} />;
}

export default ModelsPage;
