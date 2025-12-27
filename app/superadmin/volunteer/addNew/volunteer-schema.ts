import { z } from "zod"

export const volunteerSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  profilePhoto: z.string().optional(),

  // Volunteer Details
  skills: z.string().optional(),
  availability: z.array(z.string()).min(1, "Please select at least one available day"),
  status: z.enum(["active", "pending", "inactive"]).default("pending"),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  notes: z.string().optional(),
})

export type VolunteerFormValues = z.infer<typeof volunteerSchema>
