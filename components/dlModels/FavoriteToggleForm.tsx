"use client";

import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/utils/actions";
import { CardSubmitButton } from "../form/Buttons";

type FavoriteToggleFormProps = {
  modelId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({ modelId, favoriteId }: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    modelId,
    favoriteId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}

export default FavoriteToggleForm;
