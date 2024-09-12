import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

async function FavouriteToggleButton({ modelId }: { modelId: string }) {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  const favoriteId = await fetchFavoriteId({ modelId });

  return <FavoriteToggleForm favoriteId={favoriteId} modelId={modelId} />;
}

export default FavouriteToggleButton;
