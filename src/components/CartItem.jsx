"use client";
import Image from "next/image";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { updateProductInCart } from "@/lib/server-actions/cart.action";
import { toast } from "./ui/use-toast";

const CartItem = ({ cartItem }) => {
  const [productQuantity, setProductQuantity] = useState(cartItem.quantity);
  const [productTotal, setProductTotal] = useState(cartItem.subTotal);

  const handleCahnge = (e) => {
    if (e.target.value <= 0) {
      setProductQuantity(1);
      setProductTotal(cartItem.product.discountedPrice);
    } else {
      setProductQuantity(e.target.value);
      setProductTotal(e.target.value * cartItem.product.discountedPrice);
    }
  };

  const handleUpdateCart = async () => {
    try {
      await updateProductInCart({
        productId: cartItem._id,
        quantity: productQuantity,
        subTotal: productTotal,
      });

      toast({
        title: "Updated",
        description: "Product updated successfully",
      });
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex w-full items-center">
      <div className="flex flex-1 gap-4 items-center">
        <Image
          src={cartItem.product.imageUrl[0]}
          alt="product"
          width={50}
          height={40}
        />
        <p className="text-sm">{cartItem.product.title}</p>
      </div>
      <p className="flex-1 text-sm">${cartItem.product.originalPrice}</p>
      <div className="flex-1">
        <Input
          type="number"
          value={productQuantity}
          onChange={(e) => handleCahnge(e)}
          className="w-20 bg-gray-200 focus-visible:ring-0"
        />
      </div>
      <div className="flex-1 flex justify-between items-center">
        <p className="flex-1 text-sm">${productTotal}</p>
        <Button
          variant="outline"
          className="bg-red-300 text-black hover:bg-red-200"
          onClick={handleUpdateCart}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
