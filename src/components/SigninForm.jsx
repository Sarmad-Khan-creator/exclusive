"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninFormSchema } from "@/lib/validations";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import FormError from "./form-error";
import Link from "next/link";

const SigninForm = () => {
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const { user, error } = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!error) {
        router.push("/");
      }

      let errorMessage = JSON.parse(error);
      if (error) {
        setPasswordError(errorMessage.error);
      }
    } catch (error) {
      throw error;
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
              <h1 className="font-[500] text-[36px]">Login to Exclusive</h1>
            </FormLabel>
            <FormLabel>
              <p className="mt-[24px] text-[16px] poppins">
                Enter you details below
              </p>
            </FormLabel>
          </FormItem>

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
                {passwordError && (
                  <div className="mb-5">
                    <FormError message={passwordError} className="mb-5" />
                  </div>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#DB4444] text-white border-none hover:bg-[#DB4444]"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Log in"}
          </Button>
        </form>
      </Form>
      <Link href="signup">
        <p className="text-center mt-3">
          No Account? <span className="underline">Sign up</span>
        </p>
      </Link>
    </section>
  );
};

export default SigninForm;
