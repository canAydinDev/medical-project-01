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
import { deletePatientAction, fetchUserPatients } from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";

async function Patients() {
  const patients = await fetchUserPatients();
  if (patients.length === 0) return <EmptyList />;

  return (
    <section>
      <Table>
        <TableCaption className="capitalise">
          Toplam hasta sayısı: {patients.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Hasta Adı</TableHead>
            <TableHead>Sonuç</TableHead>
            <TableHead>işlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => {
            const { id: patientId, name, prediction } = patient;
            return (
              <TableRow key={patientId}>
                <TableCell>{name}</TableCell>
                <TableCell>model sonucu: {patient.prediction}</TableCell>
                <TableCell>
                  <DeletePatient patientId={patientId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

export default Patients;

function DeletePatient({ patientId }: { patientId: string }) {
  const deletePatient = deletePatientAction.bind(null, { patientId });
  return (
    <FormContainer action={deletePatient}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}
