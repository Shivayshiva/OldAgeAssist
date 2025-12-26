import crypto from "crypto"

export function generateEmailVerificationToken() {
  const token = crypto.randomBytes(32).toString("hex")

  const expires = new Date()
  expires.setHours(expires.getHours() + 24)

  return { token, expires }
}
