import * as z from "zod";

const freelancerFormSchema = z.object({
  profile_image: z
    .any()
    .refine(file => file instanceof File || file === "", {
      message: "Please upload an image file",
    })
    .refine(
      file => !(file instanceof File) || file.size <= 5 * 1024 * 1024,
      {
        message: "Image size must be less than 5MB",
      }
    )
    .refine(
      file =>
        !(file instanceof File) ||
        /^image\/(jpeg|png|gif|webp)$/.test(file.type),
      {
        message: "Only JPEG, PNG, GIF, or WEBP images are allowed",
      }
    ),

  whatsapp_no: z.string().min(10, "Please enter a valid contact number"),
  gender: z.string().min(1, "Please select your gender"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  role: z.string().min(1, "Role is required"),
  categories: z.string().min(1, "Category is required"),
  profile_des: z.string().optional(),
  doc_pic: z.any().optional(),
  faqs: z.any().optional(),
  website: z.string().url("Invalid website URL"),

  skills: z.array(z.string()).min(1, "At least one skill is required").optional(),

  instagramUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  facebookUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),

  hourly_rate: z
    .object({
      min: z.number().min(0, "Min hourly rate must be at least 0"),
      max: z.number().min(0, "Max hourly rate must be at least 0"),
    })

});

export default freelancerFormSchema;
