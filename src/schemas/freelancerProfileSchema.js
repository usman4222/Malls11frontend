import * as z from "zod";

const freelancerFormSchema = z.object({
  profile_image: z
    .any()
    .optional()  // makes the field optional
    .refine(file => {
      // If no file provided (undefined, null, empty string), it's valid
      if (!file || file === "") return true;

      // Otherwise, must be a File instance
      if (!(file instanceof File)) return false;

      // Size check (<= 5MB)
      if (file.size > 5 * 1024 * 1024) return false;

      // Type check (jpeg, png, gif, webp)
      if (!/^image\/(jpeg|png|gif|webp)$/.test(file.type)) return false;

      return true;
    }, {
      message: "Please upload a valid image file (JPEG, PNG, GIF, WEBP) under 5MB",
    }),



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
  awards: z.array(z.string()).optional(),

  hourly_rate: z
    .object({
      min: z
        .string()
        .min(1, "Minimum hourly rate is required")
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val), { message: "Must be a number" }),

      max: z
        .string()
        .min(1, "Maximum hourly rate is required")
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val), { message: "Must be a number" }),
    })
    .refine((data) => data.max >= data.min, {
      message: "Maximum hourly rate must be greater than or equal to minimum hourly rate",
      path: ["max"],
    }),



});

export default freelancerFormSchema;
