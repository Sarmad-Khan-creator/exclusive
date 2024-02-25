import ProductCard from "@/components/shared/ProductCard";
import {
  getDiscountedProducts,
  getNotSaleProducts,
} from "@/lib/server-actions/product.action";
import HeroTitle from "./_components/HeroTitle";
import HeroImage from "./_components/HeroImage";
import DiscountedProducts from "./_components/DiscountedProducts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_authOptions";
import { findUser } from "@/lib/server-actions/user.action";
import OurProducts from "./_components/OurProducts";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Home() {
  const products = await getNotSaleProducts();
  const discountedProducts = await getDiscountedProducts();
  const session = await getServerSession(authOptions);
  let user;

  if (session) {
    user = await findUser({ email: session?.user.email });
  }

  return (
    <>
      <main className="flex h-[83vh]">
        <HeroTitle />
        <HeroImage />
      </main>

      <section className="px-24 w-full mt-3 mb-16">
        <div className="flex gap-1 items-center">
          <div className="bg-blue-500 rounded-md w-4 h-10" />
          <h3 className="font-semibold text-lg">Flash Sale</h3>
          <StarFilledIcon className="text-yellow-500 w-6 h-6 star-animate" />
        </div>
        <DiscountedProducts
          discountedProducts={JSON.parse(discountedProducts)}
          user={user}
        />
      </section>

      <section className="px-24 w-full mt-28 mb-16">
        <h3 className="font-semibold text-lg">Our Products</h3>
        <OurProducts products={products} user={user} />
        <div className="flex justify-end mt-18">
          <Link
            href="/product/allProducts"
            className="bg-blue-600 text-white hover:bg-blue-400 hover:text-white px-7 py-3 rounded-md"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    </>
  );
}
