"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Heart, ArrowLeft, Check, Upload, Camera } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
  aadhaar: z.string().regex(/^\d{12}$/, "Aadhaar number must be 12 digits"),
  photo: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0]?.size <= 5 * 1024 * 1024,
      "Photo must be less than 5MB"
    )
    .refine(
      (files) => !files || files.length === 0 || ["image/jpeg", "image/png", "image/jpg"].includes(files[0]?.type),
      "Photo must be a JPEG, PNG, or JPG file"
    ),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  townVillage: z.string().min(2, "Town/Village is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
})

export default function DonatePage() {
  const router = useRouter()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      aadhaar: "",
      state: "",
      district: "",
      townVillage: "",
      pincode: "",
    },
  })

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000]

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

   const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)


    try {
      const donationAmount = selectedAmount || customAmount
      const formData = new FormData()

      formData.append("amount", donationAmount?.toString() ?? "")
      formData.append("name", values.name)
      formData.append("email", values.email)
      formData.append("phone", values.phone ?? "")
      formData.append("message", values.message ?? "")
      formData.append("aadhaar", values.aadhaar)
      formData.append("state", values.state)
      formData.append("district", values.district)
      formData.append("townVillage", values.townVillage)
      formData.append("pincode", values.pincode)

      // if (values.photo && values.photo.length > 0) {
      //   formData.append("photo", values.photo[0])
      // }

      loadRazorpay();

      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      // const params = new URLSearchParams({
      //   amount: donationAmount?.toString() ?? "",
      //   name: values.name,
      // })
      // router.push(`/donate/success?${params.toString()}`)

      const order = await response.json();

      const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: order.amount,
      currency: "INR",
      name: "Next.js App",
      description: "Test Payment",
      handler: (response: any) => {
        console.log("Frontend success (not final)", order);
        router.push(`/donate/success?paymentId=${response.razorpay_payment_id}&name=${order.name}&amount=${order.amount}`);
      },
      theme: { color: "#0f172a" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    
    } catch (error) {
      console.error("Error processing donation:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      // style={{ backgroundImage: "url('/OldAgePhoto.jpg')" }}
    >
      <div className="min-h-screen w-full bg-background/80 backdrop-blur-[2px]">
        <div className="container mx-auto px-4 py-6 md:py-12">
        <motion.div {...fadeInUp}>
          <Button asChild variant="ghost" className="mb-4 md:mb-6 min-h-[44px]">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div initial="initial" animate="animate" className="text-center mb-8 md:mb-12">
            <motion.div variants={fadeInUp}>
              <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-primary" />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-balance leading-tight px-4"
            >
              Make a Donation
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-muted-foreground text-pretty leading-relaxed px-4"
            >
              Your contribution helps provide care, comfort, and dignity to elderly residents in old age homes.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 md:p-8 lg:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {/* Amount Selection */}
                  <div className="mb-6 md:mb-8">
                    <Label className="text-base md:text-lg font-semibold mb-3 md:mb-4 block">
                      Select Donation Amount
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                      {predefinedAmounts.map((amount) => (
                        <motion.button
                          key={amount}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAmountSelect(amount)}
                          className={`p-3 md:p-4 rounded-lg border-2 font-semibold transition-all min-h-[56px] flex items-center justify-center ${
                            selectedAmount === amount
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <span className="text-sm md:text-base">₹{amount.toLocaleString("en-IN")}</span>
                          {selectedAmount === amount && <Check className="w-4 h-4 md:w-5 md:h-5 ml-2 inline" />}
                        </motion.button>
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="custom-amount" className="mb-2 block text-sm md:text-base">
                        Or Enter Custom Amount (₹)
                      </Label>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className="text-base md:text-lg min-h-[48px]"
                      />
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                    <h3 className="text-base md:text-lg font-semibold">Your Details</h3>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              className="min-h-[48px] text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              className="min-h-[48px] text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              className="min-h-[48px] text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aadhaar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aadhaar Card Number *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter 12-digit Aadhaar number"
                              className="min-h-[48px] text-base"
                              maxLength={12}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                    <div className="space-y-4">
                      <h4 className="text-sm md:text-base font-medium">Address Details</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your state"
                                  className="min-h-[48px] text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="district"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>District *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your district"
                                  className="min-h-[48px] text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="townVillage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Town/Village *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your town or village"
                                  className="min-h-[48px] text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pincode *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter 6-digit pincode"
                                  className="min-h-[48px] text-base"
                                  maxLength={6}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share why you're supporting this cause..."
                              rows={4}
                              className="text-base resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="photo"
                      render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                          <FormLabel>User Photo (Optional)</FormLabel>
                          <FormControl>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-4">
                                <Input
                                  {...fieldProps}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  id="photo-upload"
                                  onChange={(event) => {
                                    onChange(event.target.files)
                                  }}
                                />
                                <Label
                                  htmlFor="photo-upload"
                                  className="flex items-center gap-2 cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground h-12 px-4 rounded-md transition-colors border border-input"
                                >
                                  <Camera className="w-5 h-5" />
                                  <span className="text-base font-medium">Take Photo / Upload</span>
                                </Label>
                              </div>
                              {value && value.length > 0 && (
                                <div className="relative w-full max-w-[200px] aspect-video rounded-lg overflow-hidden border bg-muted">
                                  <img
                                    src={URL.createObjectURL(value[0])}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Max 5MB. Formats: JPEG, PNG, JPG.
                              </p>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-base md:text-lg min-h-[52px]"
                      disabled={isSubmitting || (!selectedAmount && !customAmount)}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Donate{" "}
                          {selectedAmount
                            ? `₹${selectedAmount.toLocaleString("en-IN")}`
                            : customAmount
                              ? `₹${customAmount}`
                              : "Now"}
                          <Heart className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </Card>
          </motion.div>

          {/* Security Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs md:text-sm text-muted-foreground mt-4 md:mt-6 px-4 leading-relaxed"
          >
            🔒 Your donation is secure and will be processed safely. We value your privacy and trust.
          </motion.p>
        </div>
      </div>
      </div>
    </div>
  )
}
