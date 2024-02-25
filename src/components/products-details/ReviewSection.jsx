"use client";

import { ReviewFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import {
  createReview,
  getAllProductReviews,
} from "@/lib/server-actions/review.action";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import {
  getProductRatingOfUser,
  makeRating,
} from "@/lib/server-actions/product.action";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { productRating } from "../../lib/constants";

const ReviewSection = ({ author, productId }) => {
  const [productReviews, setProductReviews] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [ratingValue, setRatingValue] = useState(0);

  const { status } = useSession();

  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    const getRating = async () => {
      const { rating } = await getProductRatingOfUser({
        productId: productId,
      });
      rating.map((rat) => {
        if (rat.user === author) {
          setRatingValue(rat.rating);
        } else {
          setRatingValue(0);
        }
      });
    };

    getRating();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      const { reviews, author } = await getAllProductReviews(productId);

      setProductReviews(reviews);
      setAuthors(author);
    };

    getReviews();
  }, [productId]);

  const handleRating = async (rating) => {
    try {
      if (status === "unauthenticated") {
        toast({
          title: "Denied",
          description: "You need to login to rate this product",
        });

        return;
      }
      const product = await makeRating({
        rating: rating,
        productId: productId,
        user: author,
      });

      setRatingValue(rating);
    } catch (error) {
      throw error;
    }
  };

  const form = useForm({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      review: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      if (status === "unauthenticated") {
        toast({
          title: "Denied",
          description: "You need to login to submit review",
        });

        return;
      }

      if (ratingValue === 0) {
        toast({
          title: "Denied",
          description: "Please rate this product",
        });

        return;
      }
      await createReview({
        review: values.review,
        author: author,
        productId: productId,
      });

      form.reset();
    } catch (err) {
      throw err;
    }
  };
  return (
    <section className="flex flex-col gap-5 mx-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-500 font-poppins">
          Reviews
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="review"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-md text-sm text-gray-400">
                  What are your thoughts about the product?
                </FormLabel>
                <FormControl>
                  <textarea
                    type="text"
                    placeholder="Your Review"
                    {...field}
                    className="w-[600px] h-[200px] bg-gray-100 mb-2 focus-visible:ring-0 p-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row mt-4 gap-1">
            {productRating.map((item) =>
              ratingValue >= item.value ? (
                <StarFilledIcon
                  key={item.value}
                  className="cursor-pointer text-yellow-500"
                  onClick={() => ratingValue === 0 && handleRating(item.value)}
                />
              ) : (
                <StarIcon
                  key={item.value}
                  className="cursor-pointer"
                  onClick={() => ratingValue === 0 && handleRating(item.value)}
                />
              )
            )}
          </div>

          <div className="w-[600px] flex justify-end mt-4">
            <Button
              variant="outline"
              className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
            >
              Submit review
            </Button>
          </div>
        </form>
      </Form>

      <section className="w-[700px]">
        {productReviews &&
          productReviews.map((review, index) => (
            <div key={index} className="mt-10">
              <p className="text-sm text-gray-800 mb-5">{review.review}</p>
              <hr className="border border-black" />
            </div>
          ))}
      </section>
    </section>
  );
};

export default ReviewSection;
