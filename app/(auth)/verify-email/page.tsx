"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Invalid verification link. No token provided.")
      return
    }

    verifyEmail(token)
  }, [token])

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Verification failed")
      }

      setStatus("success")
      setMessage(result.message || "Email verified successfully!")
      
      // Redirect to volunteer onboarding after 3 seconds
      setTimeout(() => {
        router.push("/volunteer/onboarding")
      }, 3000)
    } catch (error) {
      console.error("Verification error:", error)
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Failed to verify email. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="flex justify-center mb-4">
            {status === "loading" && (
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4">
                <Loader2 className="size-16 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
            )}
            {status === "success" && (
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-4">
                <CheckCircle2 className="size-16 text-green-600 dark:text-green-400" />
              </div>
            )}
            {status === "error" && (
              <div className="rounded-full bg-red-100 dark:bg-red-900 p-4">
                <XCircle className="size-16 text-red-600 dark:text-red-400" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === "loading" && "Verifying Your Email"}
            {status === "success" && "Email Verified! ✓"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription className="text-base">
            {status === "loading" && "Please wait while we verify your email address..."}
            {status === "success" && "Your email has been successfully verified"}
            {status === "error" && "We couldn't verify your email"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pb-8">
          {message && (
            <div className={`p-4 rounded-lg text-center ${
              status === "success" 
                ? "bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200" 
                : status === "error"
                ? "bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200"
                : "bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200"
            }`}>
              {message}
            </div>
          )}

          {status === "success" && (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Redirecting you to complete your profile in 3 seconds...
              </p>
              <Button
                className="w-full"
                onClick={() => router.push("/volunteer/onboarding")}
              >
                Continue to Profile Setup
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
              <div className="text-center">
                <Link 
                  href="/volunteerRegister" 
                  className="text-sm text-primary hover:underline"
                >
                  Back to Registration
                </Link>
              </div>
            </div>
          )}

          {status === "loading" && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Mail className="size-4" />
              <span>Checking your verification token...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
