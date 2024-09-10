import React from "react";
import EmptyList from "@/components/global/EmptyList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  checkJobStatusAction,
  deletePatientAction,
  fetchUserPatients,
} from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import { IconButton, SubmitButton } from "@/components/form/Buttons";
import FormInput from "@/components/form/FormInput";

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
                <TableCell>
                  {patient.prediction === "malign" ||
                  patient.prediction === "benign"
                    ? `Model sonucu: ${patient.prediction}`
                    : "Model sonuc uretiyor..."}
                </TableCell>
                <TableCell>
                  <FormContainer action={checkJobStatusAction}>
                    <input
                      type="hidden"
                      id="jobId"
                      name="jobId"
                      value={patient.prediction}
                    />
                    <input
                      type="hidden"
                      id="patientId"
                      name="patientId"
                      value={patient.id}
                    />

                    <SubmitButton text="sonuc gor" className="mt-8" />
                  </FormContainer>
                </TableCell>
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
