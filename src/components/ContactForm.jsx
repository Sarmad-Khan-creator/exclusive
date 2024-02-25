"use client";

import { ContactFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { sendMessage } from "@/lib/server-actions/message.action";
import { toast } from "./ui/use-toast";

const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await sendMessage({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
      });

      form.reset();

      toast({
        title: "Sent",
        description: "Message Send succesfully",
      });
    } catch (error) {
      throw error;
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between"
      >
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1 h-[50px]">
                <FormControl>
                  <Input
                    className="h-full rounded-md bg-gray-200 w-full focus-visible:ring-0"
                    type="text"
                    placeholder="Your Name *"
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
              <FormItem className="flex-1 h-[50px]">
                <FormControl>
                  <Input
                    className="h-[50px] rounded-md bg-gray-200 w-full focus-visible:ring-0"
                    type="text"
                    placeholder="Your Email *"
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
              <FormItem className="flex-1 w-[500px] h-[50px]">
                <FormControl>
                  <Input
                    className="h-[50px] rounded-md bg-gray-200 w-full focus-visible:ring-0"
                    type="text"
                    placeholder="Your Phone *"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="mt-5 w-full">
              <FormControl>
                <Textarea
                  placeholder="Your Message *"
                  className="rounded-md bg-gray-200 w-full h-[200px] focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-end">
          <Button
            variant="outline"
            className="bg-blue-600 text-white px-12 py-7 mt-5 hover:bg-blue-500 hover:text-white"
            type="submit"
          >
            Send Message
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
