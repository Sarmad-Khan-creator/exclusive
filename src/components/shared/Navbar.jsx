import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_authOptions";
import NavbarItem from "./NavbarItem";
import { getAllwhishlistedProductsForUser } from "@/lib/server-actions/wishlist.action";
import { findUser } from "@/lib/server-actions/user.action";
import { getAllAddedToCartItems } from "@/lib/server-actions/cart.action";
import Search from "../Search";
import UserLinks from "../UserLinks";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const user = await findUser({ email: session?.user.email });

  let wishlistedProducts;
  if (session) {
    const wishlisted = await getAllwhishlistedProductsForUser({
      userId: user._id,
    });
    wishlistedProducts = JSON.parse(wishlisted);
  }

  const cartItems = await getAllAddedToCartItems({ userId: user._id });

  return (
    <header className="py-5 px-24 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Exclusive.</h1>
      <nav>
        <ul className="list-none flex items-center gap-8">
          <NavbarItem />
          {!session ? (
            <Link
              href="/auth/signup"
              className="text-sm thin-bold bg-blue-500 rounded-full py-3 px-6 text-white hover:bg-blue-400 hover:text-white"
            >
              Sign Up
            </Link>
          ) : (
            <Link href="/api/auth/signout">Sign out</Link>
          )}
        </ul>
      </nav>

      <div className="flex items-center gap-5">
        <Search />
        <UserLinks
          wishlistedProducts={wishlistedProducts || []}
          cartItems={cartItems}
        />
      </div>
    </header>
  );
};

export default Navbar;
