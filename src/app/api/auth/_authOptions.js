import { connectToDatabase } from "@/database/mongoose";
import { verifyPassword } from "@/lib/encryption/encryption";
import { getUser } from "@/models/user/user.model";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import GoogleProvider from "next-auth/providers/google";
import { revalidatePath } from "next/cache";
import { SigninFormSchema } from "@/lib/validations";

const User = getUser();

export const authOptions = {
  providers: [
    // GoogleProvider and CredentialsProvider configurations
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) {
          return;
        }

        await connectToDatabase();
        const validatedCredentials = SigninFormSchema.safeParse(credentials);

        if (!validatedCredentials.success) {
          throw new Error(JSON.stringify({ error: "Invalid credentials" }));
        }

        const { email, password } = validatedCredentials.data;

        const user = await User.findOne({
          email: { $regex: new RegExp(email, "i") },
        });

        if (!user || !user.password) {
          throw new Error(JSON.stringify({ error: "User not found" }));
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error(JSON.stringify({ error: "Invalid Password" }));
        } else {
          return user;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile, account, user }) {
      if (account?.provider !== "credentials") {
        await connectToDatabase();
        const userbyEmail = await User.findOne({
          email: { $regex: new RegExp(profile.email, "i") },
        });

        if (!userbyEmail) {
          await User.create({
            name: profile.given_name,
            email: profile.email,
          });
        }
        return true;
      } else {
        if (user) {
          return true;
        }

        return NextResponse.json({ error: "Incorrect password" });
      }
    },
    async session({ session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
