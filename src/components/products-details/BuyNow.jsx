"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/server-actions/wishlist.action";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { toast } from "../ui/use-toast";

const BuyNow = ({ productId, userId, wishlist }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((quantity) => quantity - 1);
  };

  const handleWhishlist = async () => {
    try {
      if (!userId) {
        toast({
          title: "Denied",
          description: "You need to login to add this to wishlist",
        });

        return;
      }
      if (wishlist) {
        {
          await removeFromWishlist({
            productId,
            userId,
            path: `/product/${productId}`,
          });
        }
      } else {
        await addToWishlist({
          productId,
          userId,
          path: `/product/${productId}`,
        });
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex gap-6 items-center">
      <div className="flex gap-3 border border-gray-300">
        <Button variant="outline" onClick={decreaseQuantity}>
          -
        </Button>
        <p className="flex justify-center items-center w-8">{quantity}</p>
        <Button variant="outline" onClick={increaseQuantity}>
          +
        </Button>
      </div>
      <Button
        variant="outline"
        className="bg-blue-600 w-full text-white h-14 hover:bg-blue-500 hover:text-white"
      >
        Buy Now
      </Button>
      <Button
        variant="outline"
        className="h-14 border border-gray-400"
        onClick={handleWhishlist}
      >
        {wishlist ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <HeartFilledIcon className="h-6 w-6 text-red-600" />
          </motion.div>
        ) : (
          <Heart />
        )}
      </Button>
    </div>
  );
};

export default BuyNow;
