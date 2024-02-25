"use client";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/server-actions/wishlist.action";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "./ui/use-toast";
import { addToCart } from "@/lib/server-actions/cart.action";

const CartIcon = ({ inCart, productId, userId }) => {
  const router = useRouter();
  const { status } = useSession();
  const handleCartItem = async () => {
    try {
      if (status === "unauthenticated") {
        toast({
          title: "Denied",
          description: "You need to login to add this product in your cart",
        });

        return;
      }

      if (inCart) {
        await removeFromCart({ productId, userId });
      } else {
        await addToCart({ productId, userId });
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div onClick={handleCartItem} className="cursor-pointer relative z-10">
      <ShoppingCart
        className={cn("w-4 h-4", inCart ? "text-yellow-600" : "text-black")}
      />
    </div>
  );
};

export default CartIcon;
