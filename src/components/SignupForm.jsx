"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { createUser } from "@/lib/server-actions/user.action";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const SignupForm = () => {
  const [userError, setUserError] = useState("");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await createUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      router.push("/auth/signin");
    } catch (error) {
      setUserError("Email already exists");
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[371px]"
        >
          <FormItem className="mb-[40px]">
            <FormLabel>
              <h1 className="font-[500] text-[36px]">Create an account</h1>
            </FormLabel>
            <FormLabel>
              <p className="mt-[24px] text-[16px] poppins">
                Enter you details below
              </p>
            </FormLabel>
          </FormItem>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="credentials-input focus-visible:ring-0 mb-[35px]"
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
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Email"
                    className="credentials-input focus-visible:ring-0 mb-[35px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="credentials-input focus-visible:ring-0 mb-6"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {userError && <p className="text-sm text-red-600">{userError}</p>}

          <Button
            type="submit"
            className="bg-[#DB4444] text-white border-none hover:bg-[#DB4444]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>
      <div>
        <Button
          className="bg-white rounded-[4px] border border-gray-500 text-black text-center w-full mt-3 hover:bg-gray-200 flex items-center justify-center gap-2"
          onClick={() => signIn("google")}
          type="button"
        >
          <Image src="/google.svg" width={28} height={28} alt="google icon" />
          <p>Sign up with Google</p>
        </Button>
        <Link href="/auth/signin" className="block mt-3 text-center w-full">
          <p>Already have account? Log in</p>
        </Link>
      </div>
    </section>
  );
};

export default SignupForm;
