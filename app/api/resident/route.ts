import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import OldResident from "@/models/OldResident"
import { authOptions } from "@/lib/authOptions"
import { connectDB } from "@/lib/mongodb"
import { residentSchema } from "@/app/superadmin/residents/addNew/resident-schema"

export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await connectDB()

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const gender = searchParams.get("gender")

    // Build filter object
    const filter: any = {}
    if (status) filter.status = status
    if (gender) filter.gender = gender

    // Fetch residents with optional filters
    const residents = await OldResident.find(filter)
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json(
      {
        success: true,
        count: residents.length,
        data: residents,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error fetching residents:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch residents",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 }
      )
    }

    // Parse the request body
    const body = await req.json()

    // Validate with Zod schema
    const validationResult = residentSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }))

      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 }
      )
    }

    const {
      // Personal Information
      fullName,
      gender,
      dateOfBirth,
      age,
      profilePhoto,
      religion,
      caste,
      language,

      // Identity Documents
      aadhaarNumber,
      panCard,
      voterId,
      pensionNumber,

      // Contact Information
      mobileNumber,
      alternatePhone,
      email,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactPhone,
      emergencyContactAlternatePhone,

      // Address
      villageOrTown,
      district,
      state,
      pincode,
      landmark,

      // Medical Information
      bloodGroup,
      medicalConditions,
      disabilities,
      currentMedications,
      allergies,
      mobilityStatus,
      mentalHealthStatus,
      lastMedicalCheckup,
      doctorName,
      doctorContact,
      insuranceProvider,
      insurancePolicyNumber,
      insuranceValidTill,

      // Care Requirements
      requiresCaregiver,
      careLevel,
      dietType,
      dietaryRestrictions,
      specialNeeds,

      // Admission Details
      admissionDate,
      admissionReason,
      admittedBy,
      roomNumber,
      bedNumber,
      floor,

      // Financial Information
      monthlyFee,
      paymentStatus,
      lastPaymentDate,
      financialSponsorName,
      financialSponsorRelation,
      financialSponsorPhone,
      financialSponsorAddress,

      // Legal Guardian
      hasLegalGuardian,
      guardianName,
      guardianRelation,
      guardianPhone,
      guardianAddress,
      guardianEmail,
      guardianAadhaar,

      // Social & Activity
      hobbies,
      previousOccupation,
      education,
      maritalStatus,
      numberOfChildren,
      languagesSpoken,

      // Additional Information
      notes,
      behaviorNotes,
      preferences,

      // Status
      status,
    } = body

    // Connect to database
    await connectDB()

    // Helper function to convert comma-separated strings to arrays
    const toArray = (value: string | string[] | undefined): string[] => {
      if (!value) return []
      if (Array.isArray(value)) return value
      return value.split(",").map((item) => item.trim()).filter(Boolean)
    }

    // Create new resident
    const resident = await OldResident.create({
      // Personal Information
      fullName,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      age: age || undefined,
      profilePhoto,
      religion,
      caste,
      language: toArray(language),

      // Identity Documents
      aadhaarNumber,
      panCard,
      voterId,
      pensionNumber,

      // Contact Information
      mobileNumber,
      alternatePhone,
      email,
      emergencyContact: {
        name: emergencyContactName,
        relation: emergencyContactRelation,
        phone: emergencyContactPhone,
        alternatePhone: emergencyContactAlternatePhone,
      },

      // Address
      address: {
        villageOrTown,
        district,
        state,
        pincode,
        landmark,
      },

      // Medical Information
      bloodGroup,
      medicalConditions: toArray(medicalConditions),
      disabilities: toArray(disabilities),
      currentMedications: toArray(currentMedications),
      allergies: toArray(allergies),
      mobilityStatus,
      mentalHealthStatus,
      lastMedicalCheckup: lastMedicalCheckup ? new Date(lastMedicalCheckup) : undefined,
      doctorName,
      doctorContact,
      insurance: {
        provider: insuranceProvider,
        policyNumber: insurancePolicyNumber,
        validTill: insuranceValidTill ? new Date(insuranceValidTill) : undefined,
      },

      // Care Requirements
      careRequirements: {
        requiresCaregiver: requiresCaregiver || false,
        careLevel,
        dietType,
        dietaryRestrictions: toArray(dietaryRestrictions),
        specialNeeds: toArray(specialNeeds),
      },

      // Admission Details
      admissionDetails: {
        admissionDate: new Date(admissionDate),
        admissionReason,
        admittedBy,
        roomNumber,
        bedNumber,
        floor,
      },

      // Financial Information
      financialInfo: {
        monthlyFee: monthlyFee ? parseFloat(monthlyFee) : undefined,
        paymentStatus: paymentStatus || "pending",
        lastPaymentDate: lastPaymentDate ? new Date(lastPaymentDate) : undefined,
        sponsor: financialSponsorName
          ? {
              name: financialSponsorName,
              relation: financialSponsorRelation,
              phone: financialSponsorPhone,
              address: financialSponsorAddress,
            }
          : undefined,
      },

      // Legal Guardian
      guardian:
        hasLegalGuardian && guardianName
          ? {
              name: guardianName,
              relation: guardianRelation,
              phone: guardianPhone,
              address: guardianAddress,
              email: guardianEmail,
              aadhaar: guardianAadhaar,
            }
          : undefined,

      // Social Information
      socialInfo: {
        hobbies: toArray(hobbies),
        previousOccupation,
        education,
        maritalStatus,
        numberOfChildren: numberOfChildren ? parseInt(numberOfChildren) : undefined,
        languagesSpoken: toArray(languagesSpoken),
      },

      // Additional Information
      notes,
      behaviorNotes,
      preferences,

      // Status
      status: status || "active",

      // Meta
      createdBy: session.user.id || session.user.email,
      lastUpdatedBy: session.user.id || session.user.email,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Resident created successfully",
        data: resident,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creating resident:", error)
    return NextResponse.json(
      {
        error: "Failed to create resident",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
