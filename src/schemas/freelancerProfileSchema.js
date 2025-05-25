import * as z from "zod";

const freelancerFormSchema = z.object({
  featuredImage: z.string().min(1, "Featured image is required"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  whatsappNumber: z.string().min(10, "Please enter a valid contact number"), 
  gender: z.string().min(1, "Please select your gender"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  hourlyRate: z.coerce.number().min(1, "Hourly rate must be greater than 0"), 
  maxHourlyRate: z.coerce.number().min(1, "Max hourly rate must be greater than 0"),
  role: z.string().min(1, "Role is required"),
  categories: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  cv: z
    .instanceof(File, { message: "Please upload a valid file" }) 
    .refine((file) => file.size > 0, { message: "CV file is required" }),
  awards: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  faqs: z.array(z.string()).optional(),
  instagramUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  facebookUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export default freelancerFormSchema;
