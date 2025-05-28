import * as z from "zod";

const clientProfileSchema = z.object({
  profile_image: z.any()
    .refine(file => file instanceof File || file === "", {
      message: "Please upload an image file",
    })
    .refine(file => !(file instanceof File) || file.size <= 5 * 1024 * 1024, {
      message: "Image size must be less than 5MB",
    })
    .refine(file => !(file instanceof File) || /^image\/(jpeg|png|gif|webp)$/.test(file.type), {
      message: "Only JPEG, PNG, GIF, or WEBP images are allowed",
    }),
  categories: z.string().min(1, "Please select a category"),
  website: z.string().url("Invalid website URL"),
  whatsapp_no: z
    .string()
    .min(1, "Please enter a WhatsApp number")
    .regex(/^03\d{9}$/, "Please enter a valid WhatsApp number"),
  country: z.string().min(1, "Please select a country"),
  gender: z.string().min(1, "Please select a gender"),
  state: z.string().min(1, "Please select a state"),
  description: z.string().optional(),
  instagramUrl: z.string().url("Invalid URL").or(z.literal("")),
  facebookUrl: z.string().url("Invalid URL").or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").or(z.literal("")),
});

export default clientProfileSchema;
