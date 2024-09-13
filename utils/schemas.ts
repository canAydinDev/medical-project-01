import { z, ZodSchema } from "zod";

export const modelSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "isim 2 karakterden fazla olmalidir.",
    })
    .max(100, {
      message: "isim 100 karakterden az olmalidir.",
    }),
  featured: z.coerce.boolean(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return !(wordCount >= 10 && wordCount <= 1000);
    },
    {
      message: "Aciklama en az 10 en cok 1000 karakter olmalidir.",
    }
  ),
});
export const patientSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "isim 2 karakterden fazla olmalidir.",
    })
    .max(100, {
      message: "isim 100 karakterden az olmalidir.",
    }),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
}

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}
export const reviewSchema = z.object({
  modelId: z.string().refine((value) => value !== "", {
    message: "ModelId bos olamaz",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Model name bos olamaz",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Yazar resmi bos olamaz",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Degerlendirme en az 1 olmali" })
    .max(5, { message: "Degerlendirme en fazla 5 olmali" }),
  comment: z
    .string()
    .min(5, { message: "Yorum en az 5 karakter olmali" })
    .max(500, { message: "Yorum en fazla 500 karakter olmali" }),
});
