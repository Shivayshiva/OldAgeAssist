"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePlus, X, Loader2, User, LayoutGrid, GalleryHorizontal } from "lucide-react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { uploadToImageKit } from "@/lib/commonFunction"
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.array(z.string()).optional(),
  category: z.string().min(1, "Category is required"),
})

type FormData = z.infer<typeof formSchema>

export default function AddFeedPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'slide'>('grid')
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      images: [],
    },
  })

  const title = watch("title")
  const description = watch("description")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setImages((prev) => [...prev, ...newFiles])

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      setPreviews((prev) => [...prev, ...newPreviews])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => {
      const newPreviews = [...prev]
      URL.revokeObjectURL(newPreviews[index])
      return newPreviews.filter((_, i) => i !== index)
    })
  }

  // const uploadToImageKit = async (file: File) => {
  //   // Fetch auth params from your backend
  //   // Ensure you have an endpoint at /api/auth/imagekit that returns { signature, token, expire }
  //   const authRes = await fetch("/api/imagekit-auth")
  //   if (!authRes.ok) throw new Error("Failed to get auth params")
  //   const { signature, token, expire } = await authRes.json()

  //   const formData = new FormData()
  //   formData.append("file", file)
  //   formData.append("fileName", file.name)
  //   formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "")
  //   formData.append("signature", signature)
  //   formData.append("expire", expire)
  //   formData.append("token", token)
  //   formData.append("useUniqueFileName", "true")
  //   formData.append("folder", "/feed")

  //   const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
  //     method: "POST",
  //     body: formData,
  //   })

  //   if (!uploadRes.ok) throw new Error("Image upload failed")
  //   const data = await uploadRes.json()
  //   return data.url
  // }

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    if(session?.user?.id as string){
 try {
      const imageUrls = await Promise.all(images.map((file) => uploadToImageKit(file, "/feed")))

      const payload={...data, images: imageUrls, viewMode}
      console.log("Create_Feeddddddddd_Post_Result", payload)
      
      const response = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        router.push("/")
      } else {
        console.error("Failed to create post")
      }
    } catch (error) {
      console.error("Failed to submit post:", error)
    } finally {
      setLoading(false)
    }
    }
    
   
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Post</h1>
        <p className="text-muted-foreground">Share your volunteer activities with the community</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("category")}
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="Environment">Environment</option>
                  <option value="Education">Education</option>
                  <option value="Charity">Charity</option>
                  <option value="Housing">Housing</option>
                </select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Weekly Food Drive Success"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="What's on your mind?"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="grid grid-cols-3 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/5 transition-colors"
                  >
                    <ImagePlus className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">Add Photos</span>
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Post Update
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Preview</h2>
            <div className="flex items-center gap-2">
              <div className="flex bg-secondary rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('slide')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'slide' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  title="Slide View"
                >
                  <GalleryHorizontal className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">Mobile View</span>
            </div>
          </div>
          
          <Card className="overflow-hidden bg-card">
            {/* Header */}
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                {session?.user?.image ? (
                  <Image src={session.user.image} alt="User" width={40} height={40} />
                ) : (
                  <User className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{session?.user?.name || "Your Name"}</h3>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-2">
              <h4 className="font-bold mb-1">{title || "Post Title"}</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {description || "Your post description will appear here..."}
              </p>
            </div>

            {/* Images Grid */}
            {previews.length > 0 && (
              viewMode === 'grid' ? (
                <div className={`grid gap-0.5 mt-2 ${
                previews.length === 1 ? 'grid-cols-1' : 
                previews.length === 2 ? 'grid-cols-2' : 
                previews.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
              }`}>
                {previews.slice(0, 4).map((preview, index) => (
                  <div key={index} className={`relative ${
                    previews.length === 3 && index === 0 ? 'row-span-2 h-full' : 'aspect-square'
                  }`}>
                    <Image
                      src={preview}
                      alt="Post image"
                      fill
                      className="object-cover"
                    />
                    {index === 3 && previews.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl">
                        +{previews.length - 4}
                      </div>
                    )}
                  </div>
                ))}
                </div>
              ) : (
                <div className="flex overflow-x-auto snap-x snap-mandatory mt-2 scrollbar-hide">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative min-w-full aspect-square snap-center bg-muted">
                      <Image
                        src={preview}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )
            )}

            {/* Footer Actions */}
            <div className="p-4 border-t border-border mt-2 flex justify-between text-muted-foreground">
               <div className="flex items-center gap-2 text-sm">
                 <span>0 Likes</span>
               </div>
               <div className="flex items-center gap-2 text-sm">
                 <span>0 Comments</span>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}