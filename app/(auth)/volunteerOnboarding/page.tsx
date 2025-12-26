"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, User, MapPin, Calendar, Award, CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Zod schema for volunteer onboarding
const onboardingSchema = z.object({
  // Profile
  age: z.string().min(1, "Age is required").refine((val) => {
    const num = parseInt(val)
    return num >= 18 && num <= 100
  }, "Age must be between 18 and 100"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  profilePhoto: z.string().optional(),
  phone: z.string().min(10, "Valid phone number is required"),

  // Address
  addressLine: z.string().min(5, "Address is required"),
  townOrVillage: z.string().min(2, "Town/Village is required"),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),

  // Volunteer Details
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  availabilityDays: z.array(z.string()).min(1, "Select at least one day"),
  availabilityTimeSlots: z.array(z.string()).min(1, "Select at least one time slot"),
})

type OnboardingFormData = z.infer<typeof onboardingSchema>

const skillOptions = [
  "Caregiver",
  "Medical Support",
  "Event Management",
  "Transport/Driver",
  "Teaching/Education",
  "Cooking",
  "Cleaning",
  "Counseling",
]

const dayOptions = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
]

const timeSlotOptions = [
  { value: "morning", label: "Morning (6AM - 12PM)" },
  { value: "afternoon", label: "Afternoon (12PM - 6PM)" },
  { value: "evening", label: "Evening (6PM - 10PM)" },
]

export default function VolunteerOnboardingPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      skills: [],
      availabilityDays: [],
      availabilityTimeSlots: [],
    },
  })

  const selectedSkills = watch("skills") || []
  const selectedDays = watch("availabilityDays") || []
  const selectedTimeSlots = watch("availabilityTimeSlots") || []

  const handleSkillToggle = (skill: string) => {
    const current = selectedSkills
    if (current.includes(skill)) {
      setValue("skills", current.filter((s) => s !== skill))
    } else {
      setValue("skills", [...current, skill])
    }
  }

  const handleDayToggle = (day: string) => {
    const current = selectedDays
    if (current.includes(day)) {
      setValue("availabilityDays", current.filter((d) => d !== day))
    } else {
      setValue("availabilityDays", [...current, day])
    }
  }

  const handleTimeSlotToggle = (slot: string) => {
    const current = selectedTimeSlots
    if (current.includes(slot)) {
      setValue("availabilityTimeSlots", current.filter((s) => s !== slot))
    } else {
      setValue("availabilityTimeSlots", [...current, slot])
    }
  }

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setIsSubmitting(true)
      setError("")

      const response = await fetch("/api/volunteer/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to complete onboarding")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/volunteer")
      }, 2000)
    } catch (error) {
      console.error("Onboarding error:", error)
      setError(error instanceof Error ? error.message : "Failed to complete onboarding")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="pt-8 pb-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-4">
                <CheckCircle2 className="size-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Onboarding Complete! 🎉
              </h2>
              <p className="text-muted-foreground">
                Thank you for joining us. Redirecting to your dashboard...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Help us know you better to match you with suitable opportunities
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="size-5 text-primary" />
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      {...register("age")}
                    />
                    {errors.age && (
                      <p className="text-sm text-destructive mt-1">{errors.age.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <select
                      id="gender"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...register("gender")}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-sm text-destructive mt-1">{errors.gender.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="size-5 text-primary" />
                  <h3 className="text-lg font-semibold">Address Information</h3>
                </div>

                <div>
                  <Label htmlFor="addressLine">Address Line *</Label>
                  <Input
                    id="addressLine"
                    placeholder="House No, Street Name"
                    {...register("addressLine")}
                  />
                  {errors.addressLine && (
                    <p className="text-sm text-destructive mt-1">{errors.addressLine.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="townOrVillage">Town/Village *</Label>
                    <Input
                      id="townOrVillage"
                      placeholder="Enter town or village"
                      {...register("townOrVillage")}
                    />
                    {errors.townOrVillage && (
                      <p className="text-sm text-destructive mt-1">{errors.townOrVillage.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="district">District *</Label>
                    <Input
                      id="district"
                      placeholder="Enter district"
                      {...register("district")}
                    />
                    {errors.district && (
                      <p className="text-sm text-destructive mt-1">{errors.district.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="Enter state"
                      {...register("state")}
                    />
                    {errors.state && (
                      <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="123456"
                      {...register("pincode")}
                    />
                    {errors.pincode && (
                      <p className="text-sm text-destructive mt-1">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Volunteer Preferences */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="size-5 text-primary" />
                  <h3 className="text-lg font-semibold">Volunteer Preferences</h3>
                </div>

                {/* Skills */}
                <div>
                  <Label>Skills & Interests *</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Select all that apply
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <label
                          htmlFor={skill}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.skills && (
                    <p className="text-sm text-destructive mt-2">{errors.skills.message}</p>
                  )}
                </div>

                {/* Availability Days */}
                <div>
                  <Label>Available Days *</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    When can you volunteer?
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {dayOptions.map((day) => (
                      <div key={day.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={day.value}
                          checked={selectedDays.includes(day.value)}
                          onCheckedChange={() => handleDayToggle(day.value)}
                        />
                        <label
                          htmlFor={day.value}
                          className="text-sm font-medium leading-none"
                        >
                          {day.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.availabilityDays && (
                    <p className="text-sm text-destructive mt-2">{errors.availabilityDays.message}</p>
                  )}
                </div>

                {/* Time Slots */}
                <div>
                  <Label>Available Time Slots *</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    What time works best for you?
                  </p>
                  <div className="space-y-3">
                    {timeSlotOptions.map((slot) => (
                      <div key={slot.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={slot.value}
                          checked={selectedTimeSlots.includes(slot.value)}
                          onCheckedChange={() => handleTimeSlotToggle(slot.value)}
                        />
                        <label
                          htmlFor={slot.value}
                          className="text-sm font-medium leading-none"
                        >
                          {slot.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.availabilityTimeSlots && (
                    <p className="text-sm text-destructive mt-2">{errors.availabilityTimeSlots.message}</p>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Complete Onboarding"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
