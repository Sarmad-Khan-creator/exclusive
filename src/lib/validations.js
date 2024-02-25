import * as z from "zod";

export const SignupFormSchema = z.object({
  name: z.string().describe("Name").min(3, { message: "Name too short" }),
  email: z
    .string()
    .describe("Email")
    .email({ message: "Invalid Email address" }),
  password: z
    .string()
    .describe("Password")
    .min(6, { message: "Password should be greater than 6 characters" }),
});

export const SigninFormSchema = z.object({
  email: z
    .string()
    .describe("Email")
    .email({ message: "Invalid Email address" }),
  password: z
    .string()
    .describe("Password")
    .min(6, { message: "Password should be greater than 6 characters" }),
});

export const ProductFormSchema = z.object({
  title: z.string().min(1, { message: "Enter title for the product" }),
  description: z.string().min(20, {
    message: "Detailed description should be minimum of 20 characters",
  }),
  category: z.string(),
  colors: z
    .array(z.string().min(1).max(15))
    .min(1, { message: "At least one color" }),
  originalPrice: z.string(),
  discountedPrice: z.string(),
});

export const ReviewFormSchema = z.object({
  review: z
    .string()
    .min(20, { message: "Review should be greater than 20 characters" }),
});

export const ContactFormSchema = z.object({
  name: z.string().describe("Name"),
  email: z
    .string()
    .describe("Email")
    .email({ message: "Email address is invalid" }),
  phone: z.string().describe("Phone"),
  message: z.string().describe("Message"),
});

export const CheckoutFormSchema = z.object({
  name: z.string().describe("Name").min(1, { message: "Name is required" }),
  email: z
    .string()
    .describe("Email")
    .email({ message: "Email address is invalid" }),
  phone: z
    .number()
    .describe("Phone")
    .min(1, { message: "Phone number is required" }),
  company: z.string().describe("Company"),
  street: z
    .string()
    .describe("Street")
    .min(1, { message: "Street is required" }),
  apartment: z.string().describe("Apartment"),
  town: z
    .string()
    .describe("Town")
    .min(1, { message: "Town / Sity is required" }),
});

export const EditProfileSchema = z.object({
  firstName: z.string().describe("First Name"),
  lastName: z.string().describe("Last Name"),
  email: z.string().describe("Email").email({ message: "Email is invalid" }),
  address: z.string().describe("Address"),
});

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().describe("Current Password"),
  newPassword: z
    .string()
    .describe("New Password")
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .describe("Confirm Password")
    .min(6, { message: "Password must be at least 6 characters" }),
});
