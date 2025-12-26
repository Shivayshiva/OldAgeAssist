  export const uploadToImageKit = async (file: File, folderName: string) => {
    // Fetch auth params from your backend
    // Ensure you have an endpoint at /api/auth/imagekit that returns { signature, token, expire }
    const authRes = await fetch("/api/imagekit-auth")
    if (!authRes.ok) throw new Error("Failed to get auth params")
    const { signature, token, expire } = await authRes.json()

    const formData = new FormData()
    formData.append("file", file)
    formData.append("fileName", file.name)
    formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "")
    formData.append("signature", signature)
    formData.append("expire", expire)
    formData.append("token", token)
    formData.append("useUniqueFileName", "true")
    formData.append("folder", folderName)

    const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      body: formData,
    })

    if (!uploadRes.ok) throw new Error("Image upload failed")
    const data = await uploadRes.json()
    return data.url
  }