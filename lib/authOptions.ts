import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
// import { connectToDatabase } from "@/lib/db";
import { connectDB } from "./mongodb";
import Member from "@/models/Member";

const normalizeEmail = (value?: string | null) => value?.toLowerCase().trim();

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();
        const normalizedEmail = normalizeEmail(credentials.email);
        if (!normalizedEmail) return null;

        const user = await Member.findOne({ "auth.email": normalizedEmail }).select("+auth.password");
        if (!user) return null;

        // If the account was created via Google, credentials login is not allowed.
        if (user.auth.provider !== "credentials" || !user.auth.password) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.auth.password);
        if (!isPasswordValid) return null;

        // Keep login metadata up to date.
        await Member.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

        return {
          id: user._id.toString(),
          email: user.auth.email,
          name: user.profile.fullName,
          image: user.profile.profilePhoto || null,
          userType: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false;
      if (account.provider !== "google") {
        if ((user as { id?: string }).id) {
          await Member.updateOne(
            { _id: (user as { id?: string }).id },
            { $set: { lastLoginAt: new Date() } }
          );
        }
        return true;
      }

      await connectDB();

      const email = normalizeEmail(user.email);
      if (!email) return false;

      const googleId =
        (profile as { sub?: string } | undefined)?.sub ?? account.providerAccountId ?? undefined;
      const image = (profile as { picture?: string } | undefined)?.picture ?? user.image;

      const query = googleId
        ? { $or: [{ "auth.googleId": googleId }, { "auth.email": email }] }
        : { "auth.email": email };

      const existingUser = await Member.findOneAndUpdate(
        query,
        {
          $setOnInsert: {
            "profile.fullName": user.name ?? profile?.name ?? "Google User",
            "auth.email": email,
            "auth.provider": "google",
            "auth.isEmailVerified": true,
          },
          $set: {
            ...(googleId ? { "auth.googleId": googleId } : {}),
            ...(image ? { "profile.profilePhoto": image } : {}),
            lastLoginAt: new Date(),
          },
        },
        { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
      );

      if (!existingUser) return false;


      (user as { id?: string }).id = existingUser._id.toString();
      (user as { userType?: string }).userType = existingUser?.role;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id?: string }).id ?? token.id;
        token.image = (user as { image?: string | null }).image ?? token.image;
        token.userType = (user as { userType?: string }).userType ?? token.userType;
      }
      // Ensure token contains the database id for OAuth logins on subsequent requests.
      if (!token.id && token.sub) {
        token.id = token.sub;
      }
      
      // If userType is missing from token, fetch it from database
      if (!token.userType) {
        await connectDB();
        let existingUser = null;
        
        if (token.id) {
          existingUser = await Member.findById(token.id).select("role profile.profilePhoto");
        } else if (token.email) {
          const normalizedEmail = normalizeEmail(token.email);
          existingUser = normalizedEmail
            ? await Member.findOne({ "auth.email": normalizedEmail }).select("_id profile.profilePhoto role")
            : null;
        }
        
        if (existingUser) {
          if (!token.id) {
            token.id = existingUser._id.toString();
          }
          if (!token.image) {
            token.image = existingUser.profile?.profilePhoto || null;
          }
          token.userType = existingUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token?.id) {
          (session.user as { id?: string }).id = token.id as string;
        }
        if (token?.image !== undefined) {
          (session.user as { image?: string | null }).image = token.image as string | null;
        }
        if ((token as { userType?: string }).userType) {
          (session.user as { userType?: string }).userType = (
            token as { userType?: string }
          ).userType;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
