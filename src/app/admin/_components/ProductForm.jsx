"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  insertProduct,
  updateProduct,
} from "@/lib/server-actions/product.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PickerOverlay } from "filestack-react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Category } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ProductForm = ({ type, data }) => {
  const router = useRouter();
  const [uploadState, setUploadState] = useState("");
  const [open, setOpen] = useState(false);

  const productData = data && JSON.parse(data || "");

  const [imgUrl, setImgUrl] = useState(productData?.imageUrl || []);

  const showPicker = () => {
    setUploadState(true);
  };

  const handleImageUploadDone = (res) => {
    res.filesUploaded.forEach((file) =>
      setImgUrl((prevImages) => [...prevImages, file.url])
    );
  };

  const form = useForm({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      title: productData?.title || "",
      description: productData?.description || "",
      colors: productData?.colors || [],
      category: productData?.category || "",
      originalPrice: productData?.originalPrice || "",
      discountedPrice: productData?.discountedPrice || "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const onSubmit = async (values) => {
    try {
      if (type !== "Edit") {
        await insertProduct({
          title: values.title,
          description: values.description,
          colors: values.colors,
          category: values.category,
          imgUrl: imgUrl,
          originalPrice: values.originalPrice,
          discountedPrice: values.discountedPrice,
        });
      } else {
        await updateProduct(productData?._id, {
          title: values.title,
          description: values.description,
          colors: values.colors,
          category: values.category,
          imgUrl: imgUrl,
          originalPrice: values.originalPrice,
          discountedPrice: values.discountedPrice,
        });
      }

      router.push("/admin/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const handleInputKeyDown = (e, field) => {
    if (e.key === "Enter" && field.name === "colors") {
      e.preventDefault();

      const colorInput = e.target;
      const colorValue = colorInput.value.trim();

      if (colorValue !== "") {
        if (colorValue.length > 15) {
          return form.setError("colors", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (!field.value.includes(colorValue)) {
          form.setValue("colors", [...field.value, colorValue]);
          colorInput.value = "";
          form.clearErrors("colors");
        }
      } else {
        form.trigger();
      }
    }
  };
  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-gray-300 px-5 py-3 rounded-md w-[600px]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="title"
                    {...field}
                    className="w-full bg-gray-100 mb-2 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 w-full justify-between">
            <FormField
              control={form.control}
              name="originalPrice"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-md">Orignal Price</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Original Price"
                      {...field}
                      className="w-full bg-gray-100 mb-2 focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountedPrice"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-md">Discounted Price</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Discounted Price"
                      {...field}
                      className="w-full bg-gray-100 mb-2 focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-[200px] justify-between mt-5 bg-gray-200 hover:bg-gray-400",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? Category.find(
                            (category) => category.value === field.value
                          )?.label
                        : "Select Category..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command className="bg-gray-200">
                      <CommandInput
                        placeholder="Search Category..."
                        className="h-9"
                      />
                      <CommandEmpty>No Category found.</CommandEmpty>
                      <CommandGroup>
                        {Category.map((category) => (
                          <CommandItem
                            key={category.value}
                            value={category.value}
                            onSelect={() => {
                              form.setValue("category", category.value);
                              setOpen(false);
                            }}
                            className="cursor-pointer"
                          >
                            {category.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value === category.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Colors</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      placeholder="Colors"
                      className="w-full bg-gray-100 mb-2 focus-visible:ring-0"
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />
                    {field.value.length > 0 && (
                      <div className="flex gap-3 mt-2.5">
                        {field.value.map((color) => (
                          <div
                            key={color}
                            className="flex items-center justify-center px-4 py-1 rounded-md bg-gray-400 text-black"
                          >
                            {color}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {uploadState && (
            <PickerOverlay
              apikey={process.env.NEXT_PUBLIC_FILESTACK_API_KEY}
              pickerOptions={{
                accept: ["image/*"],
                maxFiles: 5,
                onClose: () => setUploadState(false),
                onUploadDone: (res) => handleImageUploadDone(res),
              }}
            />
          )}
          <Button
            type="button"
            onClick={showPicker}
            className="bg-gray-200 mt-5 text-gray-700 hover:bg-gray-400"
          >
            Upload Images
          </Button>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Product Detail</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[150px] bg-gray-100 focus-visible:ring-0"
                    placeholder="Detail about your product"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end mt-5">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>{type === "Edit" ? "Updating" : "Submitting"}</>
              ) : (
                <>{type === "Edit" ? "Update" : "Submit"}</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ProductForm;
