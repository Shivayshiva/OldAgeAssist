
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { GlobalButton } from "@/components/ui/GlobalButton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomTitle } from "@/components/ui/CustomTitle"
import { Plus, Trash2, ArrowLeft, Save } from "lucide-react"
import { FoundationWorkFormValues, foundationWorkSchema } from "./foundation-work"
import { CustomUploadField } from "@/components/ui/CustomUploadField"
import { CustomSelectField } from "@/components/ui/CustomSelectField"
import { CustomInputField } from "@/components/ui/CustomInputField"
import { CustomTimeField } from "@/components/ui/CustomTimeField"
import { uploadToImageKit } from "@/lib/commonFunction"



export default function CreateFoundationWorkPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FoundationWorkFormValues>({
    resolver: zodResolver(foundationWorkSchema),
    defaultValues: {
      status: "Planning",
      impact: "Medium",
      volunteerRequirement: [{ type: "", requiredCount: 1 }],
    },
  })

  console.log("__SSS__WWWWWWWWWWWWWW",errors)

  const { fields, append, remove } = useFieldArray({
    control,
    name: "volunteerRequirement",
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url= await uploadToImageKit(file, "/foundation-initiatives");
      setValue("imageUrl", url)

    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: FoundationWorkFormValues) => {
    console.log("Form submitted with data:", data)
    setIsSubmitting(true)
    try {
      // Transform comma-separated strings to arrays for API
      const formattedData = {
        ...data,
        rewards: data.rewards ? data.rewards.split(",").map((s) => s.trim()) : [],
        facilities: data.facilities ? data.facilities.split(",").map((s) => s.trim()) : [],
      }

      const response = await fetch("/api/foundation-intiative", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create initiative")
      }

      const result = await response.json()
      console.log("Initiative created:", result)
      
      router.push("/superadmin/foundation")
    } catch (error) {
      console.error("Error creating foundation work:", error)
      alert(error instanceof Error ? error.message : "Failed to create initiative")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <CustomTitle
            title="Create New Initiative"
            description="Launch a new community program or charitable project"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log("Form validation errors:", errors)
      })} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about the initiative</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <CustomInputField
                  id="title"
                  label="Initiative Title"
                  placeholder="e.g., Community Health Camp for Seniors"
                  error={errors.title?.message}
                  {...register("title")}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <CustomInputField
                  id="description"
                  label="Description"
                  placeholder="Provide a detailed description of the initiative, its goals, and expected outcomes..."
                  multiline
                  error={errors.description?.message}
                  {...register("description")}
                />
              </div>

              <div className="space-y-2">
                <CustomSelectField
                  label="Category"
                  value={watch("category")}
                  onValueChange={(value: any) => setValue("category", value)}
                  options={[
                    { label: "Healthcare & Medical", value: "Health" },
                    { label: "Education & Literacy", value: "Education" },
                    { label: "Social Welfare", value: "Social Welfare" },
                    { label: "Environment & Sustainability", value: "Environment" },
                    { label: "Community Development", value: "Community Development" },
                    { label: "Emergency Relief", value: "Emergency Relief" },
                  ]}
                  placeholder="Select initiative category"
                  error={errors.category?.message}
                />
              </div>

              <div className="space-y-2">
                <CustomSelectField
                  label="Impact Level"
                  value={watch("impact")}
                  onValueChange={(value: any) => setValue("impact", value)}
                  options={[
                    { label: "Critical - Life changing impact", value: "Critical" },
                    { label: "High - Significant community impact", value: "High" },
                    { label: "Medium - Moderate positive impact", value: "Medium" },
                    { label: "Low - Supportive initiative", value: "Low" },
                  ]}
                  placeholder="Select expected impact"
                  error={errors.impact?.message}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <CustomUploadField
                  label="Cover Image"
                  value={watch("imageUrl")}
                  onChange={handleImageUpload}
                  onRemove={() => setValue("imageUrl", "")}
                  uploading={uploading}
                />
                <input type="hidden" {...register("imageUrl")} />
                <p className="text-xs text-muted-foreground">Upload a high-quality image representing your initiative (recommended: 1200x630px)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Schedule & Timing */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule & Timing</CardTitle>
              <CardDescription>When the initiative will take place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <CustomInputField
                    id="startDate"
                    label="Start Date"
                    type="date"
                    error={errors.startDate?.message}
                    {...register("startDate")}
                  />
                </div>
                <div className="space-y-2">
                  <CustomInputField
                    id="endDate"
                    label="End Date"
                    type="date"
                    {...register("endDate")}
                  />
                  <p className="text-xs text-muted-foreground">Leave empty for single-day events</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <CustomTimeField
                    id="startTime"
                    label="Start Time"
                    value={watch("startTime")}
                    onChange={(value) => setValue("startTime", value)}
                    error={errors.startTime?.message}
                  />
                </div>
                <div className="space-y-2">
                  <CustomTimeField
                    id="endTime"
                    label="End Time"
                    value={watch("endTime")}
                    onChange={(value) => setValue("endTime", value)}
                    error={errors.endTime?.message}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
              <CardDescription>Where the initiative will be held</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <CustomInputField
                  id="location"
                  label="Physical Address"
                  placeholder="Building name, street, city, state, postal code"
                  error={errors.location?.message}
                  {...register("location")}
                />
              </div>

              <div className="space-y-2">
                <CustomInputField
                  id="googleMapLocation"
                  label="Google Maps Link"
                  placeholder="https://maps.google.com/?q=..."
                  {...register("googleMapLocation")}
                />
                <p className="text-xs text-muted-foreground">Paste the Google Maps share link for easy navigation</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget & Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Budget & Resources</CardTitle>
            <CardDescription>Financial planning and resource allocation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <CustomInputField
                  id="budget"
                  label="Total Budget (₹)"
                  type="number"
                  min="0"
                  placeholder="0"
                  error={errors.budget?.message}
                  {...register("budget")}
                />
              </div>
              <div className="space-y-2">
                <CustomInputField
                  id="beneficiaries"
                  label="Expected Beneficiaries"
                  type="number"
                  min="0"
                  placeholder="0"
                  error={errors.beneficiaries?.message}
                  {...register("beneficiaries")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements & Prerequisites */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements & Prerequisites</CardTitle>
            <CardDescription>What is needed to execute this initiative successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <CustomInputField
                id="requirement"
                label="Required Resources & Materials"
                placeholder="List all necessary resources, materials, equipment, permissions, or prerequisites..."
                multiline
                error={errors.requirement?.message}
                {...register("requirement")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Benefits & Facilities */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits & Facilities</CardTitle>
            <CardDescription>What volunteers and participants will receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <CustomInputField
                  id="rewards"
                  label="Volunteer Rewards"
                  placeholder="e.g., Certificate, T-Shirt, Meals, Transportation"
                  {...register("rewards")}
                />
                <p className="text-xs text-muted-foreground">Separate multiple items with commas</p>
              </div>

              <div className="space-y-2">
                <CustomInputField
                  id="facilities"
                  label="Available Facilities"
                  placeholder="e.g., Parking, WiFi, Refreshments, Rest Areas"
                  {...register("facilities")}
                />
                <p className="text-xs text-muted-foreground">Separate multiple items with commas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Requirements</CardTitle>
            <CardDescription>Define the roles and number of volunteers needed for this initiative</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-4 p-4 rounded-lg border bg-muted/30">
                <div className="flex-1 space-y-2">
                  <CustomInputField
                    label={`Role ${index + 1}`}
                    placeholder="e.g., Medical Assistant, Event Coordinator, Registration Helper"
                    error={errors.volunteerRequirement?.[index]?.type?.message}
                    {...register(`volunteerRequirement.${index}.type` as const)}
                  />
                </div>
                <div className="w-32 space-y-2">
                  <CustomInputField
                    label="Required"
                    type="number"
                    min="1"
                    placeholder="0"
                    error={errors.volunteerRequirement?.[index]?.requiredCount?.message}
                    {...register(`volunteerRequirement.${index}.requiredCount` as const)}
                  />
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            ))}
            <GlobalButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ type: "", requiredCount: 1 })}
              icon={<Plus className="size-4" />}
              title="Add Volunteer Role"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <GlobalButton
            type="button"
            variant="outline"
            onClick={() => router.back()}
            title="Cancel"
          />
          <GlobalButton
            type="submit"
            // disabled={isSubmitting}
            icon={<Save className="size-4" />}
            title={isSubmitting ? "Creating..." : "Create Initiative"}
          />
        </div>
      </form>
    </div>
  )
}

