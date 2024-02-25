"use client";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { productRating } from "../../lib/constants";
import {
  getProductRating,
  getTotalNumberOfReviews,
} from "@/lib/server-actions/product.action";
import { useEffect, useState } from "react";

const Rating = ({ productId }) => {
  const [ratingValue, setRatingValue] = useState();
  const [noOfReviews, setNoOfReviews] = useState();
  useEffect(() => {
    const getProductDetail = async () => {
      const rating = await getProductRating(productId);
      const { numberOfReviews } = await getTotalNumberOfReviews(productId);

      setRatingValue(rating);
      setNoOfReviews(numberOfReviews);
    };

    getProductDetail();
  }, [productId]);
  let rating;

  if (ratingValue) {
    rating = Math.floor(ratingValue.totalRating / noOfReviews);
  }

  return (
    <div className="flex flex-row gap-3 mt-1 items-center">
      <div className="flex flex-row gap-1">
        {productRating.map((item, index) =>
          rating >= item.value ? (
            <StarFilledIcon key={index} className="text-yellow-500" />
          ) : (
            <StarIcon key={item.value} />
          )
        )}
      </div>
      <p className="text-sm text-gray-600">({noOfReviews})</p>
    </div>
  );
};

export default Rating;
