"use client";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/server-actions/wishlist.action";
import { cn } from "@/lib/utils";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

const WhishlistIcon = ({ wishlist, userId, productId, path }) => {
  const router = useRouter();
  const handleWhishlist = async () => {
    try {
      if (wishlist) {
        if (!userId) {
          router.push("/auth/signin");
        } else {
          await removeFromWishlist({
            productId: productId,
            userId: JSON.parse(userId),
            path: path,
          });
        }
      } else {
        if (!userId) {
          router.push("/auth/signin");
        } else {
          await addToWishlist({
            productId: productId,
            userId: JSON.parse(userId),
            path: path,
          });
        }
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div onClick={handleWhishlist} className="cursor-pointer relative z-10">
      <HeartFilledIcon
        className={cn(wishlist ? "text-red-500" : "text-black")}
      />
    </div>
  );
};

export default WhishlistIcon;
