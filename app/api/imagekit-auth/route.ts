import imagekit from "@/lib/imagekit";
import { NextResponse } from "next/server";

export async function GET() {
  const authParams = imagekit.getAuthenticationParameters();
  
  // Add publicKey to the response since getAuthenticationParameters() doesn't include it
  return NextResponse.json({
    ...authParams,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
}
