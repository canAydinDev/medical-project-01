import { fetchUserFavorites } from "@/utils/actions";
import SectionTitle from "@/components/global/SectionTitle";
import DlModelsGrid from "@/components/dlModels/DlModelsGrid";

async function FavoritePage() {
  const favorites = await fetchUserFavorites();
  if (favorites.length === 0)
    return <SectionTitle text="Henüz bir favori modeliniz yok" />;

  return (
    <div>
      <SectionTitle text="Favori Modeller" />
      <DlModelsGrid
        models={favorites.map((favorite) => {
          return favorite.dlModel;
        })}
      />
    </div>
  );
}

export default FavoritePage;
