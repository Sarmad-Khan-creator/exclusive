"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import WhishlistIcon from "../WhishlistIcon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Rating from "./Rating";
import CartIcon from "../CartIcon";
import { motion } from "framer-motion";
import { getWishlist } from "@/lib/server-actions/wishlist.action";
import { getCartItem } from "@/lib/server-actions/cart.action";

const ProductCard = ({
  product,
  initial,
  animate,
  custom,
  user,
  variants,
  path,
}) => {
  const [wishlist, setWishlist] = useState();
  const [cartItem, setCartItem] = useState();
  const discount = Math.floor(
    ((product.originalPrice - product.discountedPrice) /
      product.originalPrice) *
      100
  );

  useEffect(() => {
    const getProducts = async () => {
      const wishlist = await getWishlist(user._id, product._id);
      setWishlist(JSON.parse(wishlist));

      const cartItems = await getCartItem(user._id, product._id);
      setCartItem(JSON.parse(cartItems));
    };

    getProducts();
  }, [wishlist, cartItem, product._id, user._id]);

  return (
    <motion.div
      className="w-[300px] h-[300px] rounded-md"
      variants={variants}
      initial={initial}
      whileInView={animate}
      custom={custom}
    >
      <div className="w-full bg-gray-200 p-5">
        <div
          className={cn(
            "flex w-full items-center",
            product.discountedFlage ? "justify-between" : "justify-end"
          )}
        >
          {product.discountedFlage && (
            <div className="bg-blue-600 text-white px-3 py-1 rounded-md">
              -{discount}%
            </div>
          )}
          <div className="flex items-center gap-1">
            <div className="rounded-full p-2 bg-gray-100">
              <CartIcon
                inCart={cartItem}
                productId={product._id}
                userId={user && user._id}
              />
            </div>
            <div className="rounded-full p-2 bg-gray-100">
              <WhishlistIcon
                userId={user && JSON.stringify(user._id)}
                productId={product._id}
                wishlist={wishlist && wishlist}
                path={path}
              />
            </div>
          </div>
        </div>
        <Link href={`/product/${product._id}`}>
          <div className="w-full h-full flex items-center justify-center mt-6 mb-6">
            <Image
              src={product && product.imageUrl[0]}
              alt="Photo"
              width={200}
              height={130}
              className="aspect-[16/12]"
            />
          </div>
        </Link>
      </div>

      <div>
        <Rating productId={product._id} />
      </div>

      <h2 className="font-bold text-lg mt-2 line-clamp-1">{product.title}</h2>
      {product.discountedFlage && (
        <p className="inline-block text-gray-500 font-semibold text-sm me-3">
          ${product.discountedPrice}
        </p>
      )}
      <p
        className={cn(
          "inline-block text-red-400 font-semibold text-sm",
          product.discountedFlage && "line-through"
        )}
      >
        ${product.originalPrice}
      </p>
    </motion.div>
  );
};

export default ProductCard;
