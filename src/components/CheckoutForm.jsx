"use client";
import { CheckoutFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import CheckoutSummary from "./CheckoutSummary";
import { Button } from "./ui/button";

const CheckoutForm = ({ cartItems, totalPrice }) => {
  const form = useForm({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      street: "",
      apartment: "",
      town: "",
    },
  });

  const onSubmit = (values) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-[300px]">
          <div className="w-[400px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500 text-sm">Name*</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="focus-visible:ring-0 w-full bg-gray-200"
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
                  <FormLabel className="text-gray-500 text-sm">
                    Email Address*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="focus-visible:ring-0 w-full bg-gray-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500 text-sm">
                    Phone Number*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="focus-visible:ring-0 w-full bg-gray-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500 text-sm">
                    Company Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="focus-visible:ring-0 w-full bg-gray-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500 text-sm">
                    Street Address*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="focus-visible:ring-0 w-full bg-gray-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500 text-sm">
                    Apartment, floor, etc (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="focus-visible:ring-0 w-full bg-gray-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="town"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500 text-sm">
                    Town/City*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="focus-visible:ring-0 w-full bg-gray-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <CheckoutSummary cartItems={cartItems} totalPrice={totalPrice} />
            <Button
              variant="outline"
              className="mt-5 bg-blue-600 text-white hover:bg-blue-500 hover:text-white px-10 py-5"
            >
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
