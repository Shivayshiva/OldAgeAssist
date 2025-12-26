"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomTitle } from "@/components/ui/CustomTitle"
import { GlobalButton } from "@/components/ui/GlobalButton"
import { CustomInputField } from "@/components/ui/CustomInputField"
import { CustomSelectField } from "@/components/ui/CustomSelectField"
import { CustomUploadField } from "@/components/ui/CustomUploadField"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { residentSchema, type ResidentFormValues } from "./resident-schema"
import { uploadToImageKit } from "@/lib/commonFunction"

export default function AddNewResidentPage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ResidentFormValues>({
    resolver: zodResolver(residentSchema),
    defaultValues: {
      status: "active",
      paymentStatus: "pending",
      requiresCaregiver: false,
      hasLegalGuardian: false,
    },
  })

  console.log("error_eeror_555", errors)

  const watchHasLegalGuardian = watch("hasLegalGuardian")
  const watchProfilePhoto = watch("profilePhoto")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadToImageKit(file, "/residents")
      setValue("profilePhoto", url)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: ResidentFormValues) => {
    try {
      const response = await fetch("/api/resident", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create resident")
      }

      console.log("Resident created successfully:", result)
      router.push("/superadmin/residents")
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof ResidentFormValues)[] = []

    // Define required fields for each step
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["fullName", "gender"]
        break
      case 2:
        fieldsToValidate = [
          "emergencyContactName",
          "emergencyContactRelation",
          "emergencyContactPhone",
          "villageOrTown",
          "district",
          "state",
          "pincode",
        ]
        break
      case 3:
        // Step 3 has no mandatory fields
        fieldsToValidate = []
        break
      case 4:
        // Step 4 has no mandatory fields anymore
        fieldsToValidate = []
        break
      case 5:
        // Step 5 has no mandatory fields
        fieldsToValidate = []
        break
    }

    // Log current values for debugging
    if (currentStep === 4) {
      console.log("Step 4 validation - admissionDate:", watch("admissionDate"))
      console.log("Step 4 validation - admissionReason:", watch("admissionReason"))
    }

    // Validate the fields
    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      setCurrentStep(Math.min(5, currentStep + 1))
    } else {
      // Scroll to first error
      const firstError = Object.keys(errors)[0]
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`)
        element?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Contact & Address" },
    { number: 3, title: "Medical Info" },
    { number: 4, title: "Admission & Care" },
    { number: 5, title: "Guardian & Family" },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-5" />
        </Button>
        <CustomTitle
          title="New Resident Admission"
          description="Complete the admission process for a new resident"
        />
      </div>

      {/* Progress Steps */}
      <Card className="hidden md:block">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`size-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep === step.number
                        ? "bg-primary text-primary-foreground"
                        : currentStep > step.number
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className="text-xs mt-2 text-center">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 -mt-5 ${
                      currentStep > step.number ? "bg-green-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic details about the resident</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <CustomUploadField
                label="Profile Photo"
                value={watchProfilePhoto}
                onChange={handleImageUpload}
                onRemove={() => setValue("profilePhoto", "")}
                uploading={uploading}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <CustomInputField
                label="Full Name *"
                placeholder="Enter full name"
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <CustomSelectField
                label="Gender *"
                value={watch("gender")}
                onValueChange={(value: any) => setValue("gender", value)}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Transgender", value: "transgender" },
                  { label: "Other", value: "other" },
                ]}
                placeholder="Select gender"
                error={errors.gender?.message}
              />

              <CustomInputField
                label="Date of Birth *"
                type="date"
                error={errors.dateOfBirth?.message}
                {...register("dateOfBirth")}
              />

              <CustomInputField
                label="Age"
                type="number"
                placeholder="Calculated from DOB"
                {...register("age")}
              />

              <CustomSelectField
                label="Religion"
                value={watch("religion")}
                onValueChange={(value: any) => setValue("religion", value)}
                options={[
                  { label: "Hinduism", value: "hinduism" },
                  { label: "Islam", value: "islam" },
                  { label: "Christianity", value: "christianity" },
                  { label: "Sikhism", value: "sikhism" },
                  { label: "Buddhism", value: "buddhism" },
                  { label: "Jainism", value: "jainism" },
                  { label: "Parsi", value: "parsi" },
                  { label: "Other", value: "other" },
                   { label: "Unknown", value: "unknown" },
                ]}
                placeholder="Select religion"
              />

              <CustomInputField
                label="Caste"
                placeholder="Enter caste"
                {...register("caste")}
              />

              <CustomSelectField
                label="Marital Status"
                value={watch("maritalStatus")}
                onValueChange={(value: any) => setValue("maritalStatus", value)}
                options={[
                  { label: "Single", value: "single" },
                  { label: "Married", value: "married" },
                  { label: "Widowed", value: "widowed" },
                  { label: "Divorced", value: "divorced" },
                ]}
                placeholder="Select marital status"
              />

              <CustomInputField
                label="Number of Children"
                type="number"
                placeholder="0"
                {...register("numberOfChildren")}
              />

              <CustomSelectField
                label="Education"
                value={watch("education")}
                onValueChange={(value: any) => setValue("education", value)}
                options={[
                  { label: "No Formal Education", value: "no_formal" },
                  { label: "Primary School", value: "primary" },
                  { label: "Middle School", value: "middle" },
                  { label: "High School", value: "high_school" },
                  { label: "Higher Secondary", value: "higher_secondary" },
                  { label: "Diploma", value: "diploma" },
                  { label: "Graduate", value: "graduate" },
                  { label: "Post Graduate", value: "post_graduate" },
                  { label: "Doctorate", value: "doctorate" },
                  { label: "Other", value: "other" },
                ]}
                placeholder="Select education level"
              />

              <CustomInputField
                label="Previous Occupation"
                placeholder="Enter previous occupation"
                {...register("previousOccupation")}
              />
            </div>

            {/* Identity Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                Identity Documents
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <CustomInputField
                  label="Aadhaar Number"
                  placeholder="Enter 12-digit Aadhaar number"
                  {...register("aadhaarNumber")}
                />

                <CustomInputField
                  label="PAN Card"
                  placeholder="Enter PAN card number"
                  {...register("panCard")}
                />

                <CustomInputField
                  label="Voter ID"
                  placeholder="Enter voter ID"
                  {...register("voterId")}
                />

                <CustomInputField
                  label="Pension Number"
                  placeholder="Enter pension number"
                  {...register("pensionNumber")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Contact & Address */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Contact & Address Information</CardTitle>
            <CardDescription>Contact details and residential address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold">Contact Information</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <CustomInputField
                  label="Mobile Number"
                  placeholder="+91 XXXXX XXXXX"
                  {...register("mobileNumber")}
                />

                <CustomInputField
                  label="Alternate Phone"
                  placeholder="+91 XXXXX XXXXX"
                  {...register("alternatePhone")}
                />

                <CustomInputField
                  label="Email"
                  type="email"
                  placeholder="email@example.com"
                  {...register("email")}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Emergency Contact *</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <CustomInputField
                  label="Contact Name *"
                  placeholder="Enter name"
                  error={errors.emergencyContactName?.message}
                  {...register("emergencyContactName")}
                />

                <CustomInputField
                  label="Relation *"
                  placeholder="e.g., Son, Daughter, Friend"
                  error={errors.emergencyContactRelation?.message}
                  {...register("emergencyContactRelation")}
                />

                <CustomInputField
                  label="Phone Number *"
                  placeholder="+91 XXXXX XXXXX"
                  error={errors.emergencyContactPhone?.message}
                  {...register("emergencyContactPhone")}
                />

                <CustomInputField
                  label="Alternate Phone"
                  placeholder="+91 XXXXX XXXXX"
                  {...register("emergencyContactAlternatePhone")}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Address Details *</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <CustomInputField
                  label="Village/Town *"
                  placeholder="Enter village or town"
                  error={errors.villageOrTown?.message}
                  {...register("villageOrTown")}
                />

                <CustomInputField
                  label="District *"
                  placeholder="Enter district"
                  error={errors.district?.message}
                  {...register("district")}
                />

                <CustomInputField
                  label="State *"
                  placeholder="Enter state"
                  error={errors.state?.message}
                  {...register("state")}
                />

                <CustomInputField
                  label="Pincode *"
                  placeholder="000000"
                  error={errors.pincode?.message}
                  {...register("pincode")}
                />

                <div className="md:col-span-2">
                  <CustomInputField
                    label="Landmark"
                    placeholder="Enter nearby landmark"
                    {...register("landmark")}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Medical Information */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
            <CardDescription>Health records and medical details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <CustomSelectField
                label="Blood Group"
                value={watch("bloodGroup")}
                onValueChange={(value: any) => setValue("bloodGroup", value)}
                options={[
                  { label: "A+", value: "A+" },
                  { label: "A-", value: "A-" },
                  { label: "B+", value: "B+" },
                  { label: "B-", value: "B-" },
                  { label: "AB+", value: "AB+" },
                  { label: "AB-", value: "AB-" },
                  { label: "O+", value: "O+" },
                  { label: "O-", value: "O-" },
                ]}
                placeholder="Select blood group"
              />

              <CustomSelectField
                label="Mobility Status"
                value={watch("mobilityStatus")}
                onValueChange={(value: any) => setValue("mobilityStatus", value)}
                options={[
                  { label: "Independent", value: "independent" },
                  { label: "Assisted", value: "assisted" },
                  { label: "Wheelchair", value: "wheelchair" },
                  { label: "Bedridden", value: "bedridden" },
                ]}
                placeholder="Select mobility status"
              />

              <CustomSelectField
                label="Mental Health Status"
                value={watch("mentalHealthStatus")}
                onValueChange={(value: any) => setValue("mentalHealthStatus", value)}
                options={[
                  { label: "Normal", value: "normal" },
                  { label: "Dementia", value: "dementia" },
                  { label: "Alzheimer's", value: "alzheimer" },
                  { label: "Depression", value: "depression" },
                  { label: "Other", value: "other" },
                ]}
                placeholder="Select mental health status"
              />

              <CustomInputField
                label="Last Medical Checkup"
                type="date"
                {...register("lastMedicalCheckup")}
              />

              <CustomInputField
                label="Doctor Name"
                placeholder="Enter doctor's name"
                {...register("doctorName")}
              />

              <CustomInputField
                label="Doctor Contact"
                placeholder="+91 XXXXX XXXXX"
                {...register("doctorContact")}
              />
            </div>

            <div className="space-y-4">
              <CustomInputField
                label="Medical Conditions"
                placeholder="e.g., Diabetes, Hypertension (comma separated)"
                multiline
                {...register("medicalConditions")}
              />

              <CustomInputField
                label="Disabilities"
                placeholder="List any disabilities (comma separated)"
                multiline
                {...register("disabilities")}
              />

              <CustomInputField
                label="Current Medications"
                placeholder="List current medications (comma separated)"
                multiline
                {...register("currentMedications")}
              />

              <CustomInputField
                label="Allergies"
                placeholder="List any allergies (comma separated)"
                multiline
                {...register("allergies")}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Insurance Details</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <CustomInputField
                  label="Provider"
                  placeholder="Insurance provider name"
                  {...register("insuranceProvider")}
                />

                <CustomInputField
                  label="Policy Number"
                  placeholder="Policy number"
                  {...register("insurancePolicyNumber")}
                />

                <CustomInputField
                  label="Valid Till"
                  type="date"
                  {...register("insuranceValidTill")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Admission & Care */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Admission & Care Requirements</CardTitle>
            <CardDescription>Admission details and care level information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold">Admission Details *</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <CustomInputField
                  label="Admission Date *"
                  type="date"
                  error={errors.admissionDate?.message}
                  {...register("admissionDate")}
                />

                <CustomInputField
                  label="Admitted By"
                  placeholder="Name of admitting person"
                  {...register("admittedBy")}
                />

                <CustomInputField
                  label="Room Number"
                  placeholder="e.g., A-204"
                  {...register("roomNumber")}
                />

                <CustomInputField
                  label="Bed Number"
                  placeholder="e.g., B-01"
                  {...register("bedNumber")}
                />

                <CustomInputField
                  label="Floor"
                  placeholder="e.g., Ground Floor"
                  {...register("floor")}
                />

                <div className="md:col-span-2">
                  <CustomInputField
                    label="Admission Reason *"
                    placeholder="Reason for admission"
                    multiline
                    error={errors.admissionReason?.message}
                    {...register("admissionReason")}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Care Requirements</Label>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="requiresCaregiver"
                  checked={watch("requiresCaregiver")}
                  onCheckedChange={(checked) => setValue("requiresCaregiver", checked as boolean)}
                />
                <Label htmlFor="requiresCaregiver" className="cursor-pointer">
                  Requires Caregiver
                </Label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <CustomSelectField
                  label="Care Level"
                  value={watch("careLevel")}
                  onValueChange={(value: any) => setValue("careLevel", value)}
                  options={[
                    { label: "Low", value: "low" },
                    { label: "Medium", value: "medium" },
                    { label: "High", value: "high" },
                    { label: "Critical", value: "critical" },
                  ]}
                  placeholder="Select care level"
                />

                <CustomInputField
                  label="Diet Type"
                  placeholder="e.g., Vegetarian, Non-vegetarian"
                  {...register("dietType")}
                />

                <CustomInputField
                  label="Dietary Restrictions"
                  placeholder="e.g., No sugar, Low salt (comma separated)"
                  {...register("dietaryRestrictions")}
                />

                <CustomInputField
                  label="Special Needs"
                  placeholder="List any special needs (comma separated)"
                  {...register("specialNeeds")}
                />
              </div>

              <CustomInputField
                label="Hobbies & Interests"
                placeholder="List hobbies (comma separated)"
                {...register("hobbies")}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Financial Information</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <CustomInputField
                  label="Monthly Fee"
                  type="number"
                  placeholder="0"
                  {...register("monthlyFee")}
                />

                <CustomSelectField
                  label="Payment Status"
                  value={watch("paymentStatus")}
                  onValueChange={(value: any) => setValue("paymentStatus", value)}
                  options={[
                    { label: "Paid", value: "paid" },
                    { label: "Pending", value: "pending" },
                    { label: "Overdue", value: "overdue" },
                  ]}
                  placeholder="Select payment status"
                />
              </div>

              <Label className="text-sm font-medium mt-4">Financial Sponsor (if applicable)</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <CustomInputField
                  label="Sponsor Name"
                  placeholder="Enter sponsor name"
                  {...register("financialSponsorName")}
                />

                <CustomInputField
                  label="Sponsor Relation"
                  placeholder="Relation to resident"
                  {...register("financialSponsorRelation")}
                />

                <CustomInputField
                  label="Sponsor Phone"
                  placeholder="+91 XXXXX XXXXX"
                  {...register("financialSponsorPhone")}
                />

                <CustomInputField
                  label="Sponsor Address"
                  placeholder="Enter address"
                  {...register("financialSponsorAddress")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Guardian & Family */}
      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Guardian & Additional Information</CardTitle>
            <CardDescription>Legal guardian and other relevant details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasLegalGuardian"
                  checked={watchHasLegalGuardian}
                  onCheckedChange={(checked) => setValue("hasLegalGuardian", checked as boolean)}
                />
                <Label htmlFor="hasLegalGuardian" className="cursor-pointer font-semibold">
                  Has Legal Guardian
                </Label>
              </div>

              {watchHasLegalGuardian && (
                <div className="space-y-4 border-l-4 border-primary pl-4">
                  <Label className="text-base font-semibold">Guardian Details</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <CustomInputField
                      label="Guardian Name"
                      placeholder="Enter guardian name"
                      {...register("guardianName")}
                    />

                    <CustomInputField
                      label="Relation"
                      placeholder="Relation to resident"
                      {...register("guardianRelation")}
                    />

                    <CustomInputField
                      label="Phone"
                      placeholder="+91 XXXXX XXXXX"
                      {...register("guardianPhone")}
                    />

                    <CustomInputField
                      label="Email"
                      type="email"
                      placeholder="guardian@email.com"
                      {...register("guardianEmail")}
                    />

                    <CustomInputField
                      label="Aadhaar Number"
                      placeholder="XXXX-XXXX-XXXX"
                      {...register("guardianAadhaar")}
                    />

                    <div className="md:col-span-2">
                      <CustomInputField
                        label="Address"
                        placeholder="Enter complete address"
                        multiline
                        {...register("guardianAddress")}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Additional Information</Label>
              <CustomInputField
                label="Languages Spoken"
                placeholder="e.g., Hindi, English, Marathi (comma separated)"
                {...register("languagesSpoken")}
              />

              <CustomInputField
                label="Notes"
                placeholder="Any additional notes about the resident"
                multiline
                {...register("notes")}
              />

              <CustomInputField
                label="Behavior Notes"
                placeholder="Behavioral observations or notes"
                multiline
                {...register("behaviorNotes")}
              />

              <CustomInputField
                label="Preferences"
                placeholder="Personal preferences, likes, dislikes"
                multiline
                {...register("preferences")}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>

          {currentStep < 5 && 
            <GlobalButton
              type="button"
              onClick={handleNextStep}
              icon={<Plus className="size-4" />}
              title="Next"
            />}
            {!(currentStep < 5) && 
            <GlobalButton
              type="submit"
              disabled={isSubmitting}
              icon={<Save className="size-4" />}
              title={isSubmitting ? "Submitting..." : "Submit Admission"}
            />
            }
        </div>
      </div>
    </form>
  )
}
