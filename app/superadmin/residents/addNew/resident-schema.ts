import { z } from "zod"

export const residentSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
//   gender: z.enum(["male", "female", "other", "transgender"], {
//     required_error: "Please select a gender",
//   }),
gender:z.string().min(1, "Please select a gender"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  age: z.string().optional(),
  profilePhoto: z.string().optional(),
  religion: z.string().optional(),
  caste: z.string().optional(),
  language: z.array(z.string()).optional(),

  // Identity Documents
  aadhaarNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{12}$/.test(val),
      "Aadhaar number must be exactly 12 digits"
    ),
  panCard: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val),
      "PAN card must be in format: ABCDE1234F"
    ),
  voterId: z.string().optional(),
  pensionNumber: z.string().optional(),

  // Contact Information
  mobileNumber: z.string().optional(),
  alternatePhone: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactRelation: z.string().min(1, "Emergency contact relation is required"),
  emergencyContactPhone: z.string().min(10, "Valid phone number is required"),
  emergencyContactAlternatePhone: z.string().optional(),

  // Address
  villageOrTown: z.string().min(1, "Village/Town is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Valid pincode is required"),
  landmark: z.string().optional(),

  // Medical Information
  bloodGroup: z.string().optional(),
  medicalConditions: z.string().optional(),
  disabilities: z.string().optional(),
  currentMedications: z.string().optional(),
  allergies: z.string().optional(),
  mobilityStatus: z.string().optional(),
  mentalHealthStatus: z.string().optional(),
  lastMedicalCheckup: z.string().optional(),
  doctorName: z.string().optional(),
  doctorContact: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  insuranceValidTill: z.string().optional(),

  // Care Requirements
  requiresCaregiver: z.boolean().default(false),
  careLevel: z.string().optional(),
  dietType: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  specialNeeds: z.string().optional(),

  // Admission Details
  
  admissionDate: z.string().optional(),
  admissionReason: z.string().optional(),
  admittedBy: z.string().optional(),
  roomNumber: z.string().optional(),
  bedNumber: z.string().optional(),
  floor: z.string().optional(),

  // Financial Information
  monthlyFee: z.string().optional(),
  paymentStatus: z.enum(["paid", "pending", "overdue"]).default("pending"),
  lastPaymentDate: z.string().optional(),
  financialSponsorName: z.string().optional(),
  financialSponsorRelation: z.string().optional(),
  financialSponsorPhone: z.string().optional(),
  financialSponsorAddress: z.string().optional(),

  // Legal Guardian
  hasLegalGuardian: z.boolean().default(false),
  guardianName: z.string().optional(),
  guardianRelation: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianAddress: z.string().optional(),
  guardianEmail: z.string().optional(),
  guardianAadhaar: z.string().optional(),

  // Social & Activity
  hobbies: z.string().optional(),
  previousOccupation: z.string().optional(),
  education: z.string().optional(),
  maritalStatus: z.string().optional(),
  numberOfChildren: z.string().optional(),
  languagesSpoken: z.string().optional(),

  // Additional Information
  notes: z.string().optional(),
  behaviorNotes: z.string().optional(),
  preferences: z.string().optional(),

  // Status
  status: z.enum(["active", "inactive", "deceased", "transferred"]).default("active"),
})

export type ResidentFormValues = z.infer<typeof residentSchema>
