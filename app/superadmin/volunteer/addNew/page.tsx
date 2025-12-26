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
import { ArrowLeft, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { volunteerSchema, type VolunteerFormValues } from "./volunteer-schema"
import { uploadToImageKit } from "@/lib/commonFunction"

export default function AddNewVolunteerPage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      status: "pending",
      availability: [],
      skills: [],
    },
  })

  console.log("errors", errors)

  const watchProfilePhoto = watch("profilePhoto")
  const watchAvailability = watch("availability") || []

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadToImageKit(file, "/volunteers")
      setValue("profilePhoto", url)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: VolunteerFormValues) => {
    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create volunteer")
      }

      console.log("Volunteer created successfully:", result)
      router.push("/superadmin/volunteer")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(error instanceof Error ? error.message : "Failed to create volunteer")
    }
  }

  const availabilityDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    const current = watchAvailability
    if (checked) {
      setValue("availability", [...current, day])
    } else {
      setValue("availability", current.filter((d) => d !== day))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-5" />
        </Button>
        <CustomTitle
          title="Add New Volunteer"
          description="Register a new volunteer to the system"
        />
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Basic details about the volunteer</CardDescription>
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
              label="First Name *"
              placeholder="Enter first name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />

            <CustomInputField
              label="Last Name *"
              placeholder="Enter last name"
              error={errors.lastName?.message}
              {...register("lastName")}
            />

            <CustomInputField
              label="Email *"
              type="email"
              placeholder="email@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <CustomInputField
              label="Phone *"
              placeholder="+91 XXXXX XXXXX"
              error={errors.phone?.message}
              {...register("phone")}
            />

            <CustomInputField
              label="Date of Birth"
              type="date"
              error={errors.dateOfBirth?.message}
              {...register("dateOfBirth")}
            />

            <CustomSelectField
              label="Gender"
              value={watch("gender")}
              onValueChange={(value: any) => setValue("gender", value)}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
              placeholder="Select gender"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-1">
            <CustomInputField
              label="Address"
              placeholder="Enter complete address"
              multiline
              {...register("address")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Volunteer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Volunteer Details</CardTitle>
          <CardDescription>Skills, availability, and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <CustomInputField
              label="Skills (comma separated)"
              placeholder="e.g., Teaching, Cooking, Healthcare"
              error={errors.skills?.message}
              {...register("skills")}
            />

            <CustomSelectField
              label="Status"
              value={watch("status")}
              onValueChange={(value: any) => setValue("status", value)}
              options={[
                { label: "Active", value: "active" },
                { label: "Pending", value: "pending" },
                { label: "Inactive", value: "inactive" },
              ]}
              placeholder="Select status"
            />

            <CustomInputField
              label="Emergency Contact Name"
              placeholder="Enter emergency contact name"
              {...register("emergencyContactName")}
            />

            <CustomInputField
              label="Emergency Contact Phone"
              placeholder="+91 XXXXX XXXXX"
              {...register("emergencyContactPhone")}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Availability *</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availabilityDays.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={watchAvailability.includes(day)}
                    onCheckedChange={(checked) => handleAvailabilityChange(day, checked as boolean)}
                  />
                  <Label htmlFor={day} className="cursor-pointer text-sm">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
            {errors.availability && (
              <p className="text-sm text-destructive">{errors.availability.message}</p>
            )}
          </div>

          <CustomInputField
            label="Notes"
            placeholder="Any additional notes about the volunteer"
            multiline
            {...register("notes")}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <GlobalButton
          type="submit"
          disabled={isSubmitting}
          icon={<Save className="size-4" />}
          title={isSubmitting ? "Submitting..." : "Add Volunteer"}
        />
      </div>
    </form>
  )
}
