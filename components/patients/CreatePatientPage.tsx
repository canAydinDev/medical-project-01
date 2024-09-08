import React from "react";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/Buttons";
import { createPatientAction } from "@/utils/actions";
import ImageInput from "../form/ImageInput";

function CreatePatientPage({ modelId }: { modelId: string }) {
  return (
    <article>
      <div className="border p-8 rounded-md">
        <h1 className="text-2xl font-semibold text-myColor mb-8 capitalize flex justify-center item-center">
          Modeli Kullan
        </h1>
        <FormContainer action={createPatientAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input
              type="hidden"
              name="modelId"
              value={modelId}
              className="absolute"
            />
            <FormInput
              type="text"
              name="name"
              label="Hasta Adı Soyadı"
              placeholder="Hasta Adı Soyadı"
            />
            <ImageInput />
          </div>

          <SubmitButton text="Sonuç gör" className="mt-8 " />
        </FormContainer>
      </div>
    </article>
  );
}

export default CreatePatientPage;
