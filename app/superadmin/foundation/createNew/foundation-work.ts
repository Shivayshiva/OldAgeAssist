import { z } from "zod"

export const foundationWorkSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  status: z.enum(["Planning", "Active", "Completed", "On Hold"], {
    required_error: "Please select a status.",
  }),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please select a valid start date.",
  }),
  endDate: z.string().optional(),
  startTime: z.string(),
  endTime: z.string().optional(),
  budget: z.coerce.number().min(0, {
    message: "Budget must be a positive number.",
  }),
  beneficiaries: z.coerce.number().int().min(0, {
    message: "Beneficiaries must be a positive integer.",
  }),
  impact: z.string({
    required_error: "Please select an impact level.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  googleMapLocation: z.string().optional(),
  requirement: z.string().min(10, {
    message: "Requirement description must be at least 10 characters.",
  }),
  imageUrl: z.string().optional(),
  volunteerRequirement: z.array(
    z.object({
      type: z.string().min(1, "Type is required"),
      requiredCount: z.coerce.number().min(1, "Count must be at least 1"),
    })
  ).optional(),
  rewards: z.string().optional(), // We'll handle comma-separated string in the form
  facilities: z.string().optional(), // We'll handle comma-separated string in the form
})

export type FoundationWorkFormValues = z.infer<typeof foundationWorkSchema>