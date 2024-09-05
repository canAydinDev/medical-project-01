import React from "react";
import {
  fetchAdminModelDetails,
  updateModelAction,
  updateModelImageAction,
} from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckBoxInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";

async function EditModelPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const model = await fetchAdminModelDetails(id);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          action={updateModelImageAction}
          name={model?.name || ""}
          image={model?.image || ""}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={model?.image} />
        </ImageInputContainer>
        <FormContainer action={updateModelAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={model?.name}
            />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={model?.description}
          />
          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="featured"
              defaultChecked={model?.featured}
            />
          </div>
          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default EditModelPage;
