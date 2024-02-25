"use client";

import { useSession } from "next-auth/react";
import ProfileLink from "./ProfileLink";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

const UserLinks = ({ wishlistedProducts, cartItems }) => {
  const { data } = useSession();
  return (
    <>
      {data && (
        <div className="flex items-center gap-5">
          <Link href="/user/wishlist">
            <div className="relative">
              <div className="relative top-2">
                <Heart />
              </div>

              <div className="relative w-4 h-4 left-[16px] bottom-[18px]">
                <p className="text-xs font-semibold rounded-full bg-red-600 text-white text-center">
                  {data && wishlistedProducts.length}
                </p>
              </div>
            </div>
          </Link>

          <Link href="/user/cart">
            <div className="relative">
              <div className="relative top-2">
                <ShoppingCart />
              </div>

              <div className="relative w-4 h-4 left-[16px] bottom-[18px]">
                <p className="text-xs font-semibold rounded-full bg-red-600 text-white text-center">
                  {data && JSON.parse(cartItems).length}
                </p>
              </div>
            </div>
          </Link>
          <ProfileLink />
        </div>
      )}
    </>
  );
};

export default UserLinks;
