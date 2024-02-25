"use client";
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { updatePassword } from "@/lib/server-actions/user.action";
import { UpdatePasswordSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const UpdatePasswordForm = ({ user }) => {
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const updatedPassword = await updatePassword(user.email, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      if (updatedPassword.error) {
        setError(updatedPassword.error);
        return;
      }

      toast({
        title: "Updated",
        description: "Password updated succesfully",
      });

      form.reset();
    } catch (error) {
      throw error;
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <>
      <h2 className="font-bold text-lg text-red-400">Change Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="w-full bg-gray-100 mb-5 focus-visible:ring-0"
                    placeholder="Current Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="w-full bg-gray-100 mb-5 focus-visible:ring-0"
                    placeholder="New Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="w-full bg-gray-100 mb-5 focus-visible:ring-0"
                    placeholder="Confirm New Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <div className="w-full flex items-center justify-end mt-5">
            <Button
              variant="outline"
              type="submit"
              className="bg-blue-500 text-white py-4 px-8 hover:bg-blue-400 hover:text-white"
            >
              {isSubmitting ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdatePasswordForm;
