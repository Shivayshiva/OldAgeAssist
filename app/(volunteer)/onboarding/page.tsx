import { Navbar } from "@/components/layout/navbar"
import { VolunteerRegistrationForm } from "@/components/forms/volunteer-registration-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <VolunteerRegistrationForm />
    </div>
  )
}
