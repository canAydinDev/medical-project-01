import React from "react";
import EmptyList from "@/components/global/EmptyList";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAdminModels } from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";
import { deleteModelAction } from "@/utils/actions";

async function ItemsPage() {
  const items = await fetchAdminModels();
  if (items.length === 0) return <EmptyList />;
  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          toplam model sayisi: {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Model Adı</TableHead>
            <TableHead>İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id: modelId, name } = item;
            return (
              <TableRow key={modelId}>
                <TableCell>
                  <Link
                    href={`/models/${modelId}`}
                    className="underline text-muted-foreground 
                    tracking-wide capitalize"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/models/${modelId}/edit`}>
                    <IconButton actionType="edit"></IconButton>
                  </Link>
                  <DeleteModel modelId={modelId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

export default ItemsPage;

function DeleteModel({ modelId }: { modelId: string }) {
  const deleteModel = deleteModelAction.bind(null, { modelId });
  return (
    <FormContainer action={deleteModel}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}
