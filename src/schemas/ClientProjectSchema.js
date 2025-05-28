import { z } from "zod";

const ClientProjectSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
    project_type: z.string().min(1, "Project Type is required"),
    management_type: z.string().min(1, "Management Type is required"),
    duration: z.string().min(1, "Duration is required"),
    experience: z.string().min(1, "Experience is required"),
    location: z.string().min(1, "Location is required"),
    language: z.string().min(1, "Language is required"),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    project_des: z.string().min(1, "Description is required"),
    project_doc: z.any().optional(),

    fixed_price: z.number().positive("Fixed price must be positive").optional(),

    min_hourly_rate: z
      .number()
      .positive("Min hourly rate must be positive")
      .optional(),

    max_hourly_rate: z
      .number()
      .positive("Max hourly rate must be positive")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.project_type === "fixed") {
        return data.fixed_price !== undefined;
      }
      if (data.project_type === "hourly") {
        return data.min_hourly_rate !== undefined && data.max_hourly_rate !== undefined;
      }
      return true;
    },
    {
      message: "Please provide price fields for the selected project type",
      path: ["fixed_price"],
    }
  )
  .refine(
    (data) => {
      if (
        data.project_type === "hourly" &&
        data.min_hourly_rate !== undefined &&
        data.max_hourly_rate !== undefined
      ) {
        return data.min_hourly_rate <= data.max_hourly_rate;
      }
      return true;
    },
    {
      message: "Min hourly rate must be less than or equal to Max hourly rate",
      path: ["max_hourly_rate"],
    }
  );


  export default ClientProjectSchema;