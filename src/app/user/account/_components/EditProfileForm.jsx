"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { updateUser } from "@/lib/server-actions/user.action";
import { EditProfileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";

const EditProfileForm = ({ user }) => {
  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: user.name.split(" ")[0] || "",
      lastName: user.name.split(" ")[1] || "",
      email: user.email || "",
      address: user.address || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const updatedUser = await updateUser({
        prevEmail: user.email,
        email: values.email,
        name: `${values.firstName} ${values.lastName}`,
        address: values.address,
      });

      toast({
        title: "Updated",
        description: "Profile Updated succesfully",
      });

      return updatedUser;
    } catch (error) {}
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10">
          <div className="flex gap-7">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col w-[400px]">
                  <FormLabel className="text-md text-sm text-gray-400">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-100 mb-2 focus-visible:ring-0"
                      placeholder="What is your first name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col w-[400px]">
                  <FormLabel className="text-md text-sm text-gray-400">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-100 mb-2 focus-visible:ring-0"
                      placeholder="What is your last name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-7">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col w-[400px]">
                  <FormLabel className="text-md text-sm text-gray-400">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-100 mb-2 focus-visible:ring-0"
                      placeholder="What is your email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col w-[400px]">
                  <FormLabel className="text-md text-sm text-gray-400">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-100 mb-2 focus-visible:ring-0"
                      placeholder="What is your home address?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-end mt-5">
          <Button
            variant="outline"
            type="submit"
            className="bg-blue-500 text-white py-4 px-8 hover:bg-blue-400 hover:text-white"
          >
            {isSubmitting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              " Update"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
