import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createModelAction } from "@/utils/actions";
import ImageInput from "@/components/form/ImageInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckboxInput from "@/components/form/CheckBoxInput";

function CreateModelPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">model oluştur</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createModelAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="model adi"
              defaultValue="model_adi"
            />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            labelText="model aciklamasi"
            defaultValue="modelle ilgili aciklamalar"
          />
          <div className="mt-6">
            <CheckboxInput name="featured" label="featured" />
          </div>

          <SubmitButton text="model oluştur" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateModelPage;
