import { getProductById } from "@/lib/server-actions/product.action";
import Image from "next/image";
import DeliveryCar from "../../../../../public/DeliveryCar.svg";
import Return from "../../../../../public/Return.svg";
import BuyNow from "@/components/products-details/BuyNow";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_authOptions";
import { findUser } from "@/lib/server-actions/user.action";
import { getWishlist } from "@/lib/server-actions/wishlist.action";
import ReviewSection from "@/components/products-details/ReviewSection";

const ProductDetail = async ({ params }) => {
  const productById = await getProductById(params.id);
  const product = JSON.parse(productById);
  const session = await getServerSession(authOptions);

  let user;
  let wishlist;
  if (session) {
    user = await findUser({ email: session?.user.email });
    wishlist = await getWishlist(user._id, params.id);
  }
  return (
    <>
      <div className="mx-24 mt-24">
        <p className="text-sm">
          Account / {product.category} / {product.title}
        </p>
      </div>
      <section className="h-[70vh] mx-24 mt-5 flex justify-between">
        <div className="h-full w-[150px] flex flex-col gap-5">
          {product.imageUrl.map((image) => (
            <Image
              key={image}
              src={image}
              alt="Product Photo"
              width={100}
              height={100}
            />
          ))}
        </div>
        <div className="h-full w-[500px] relative">
          <Image src={product.imageUrl[0]} alt="Product Photo" fill />
        </div>
        <div className="flex flex-col gap-5 w-[500px]">
          <h1 className="font-semibold text-xl line-clamp-2">
            {product.title}
          </h1>
          <p className="text-lg">${product.originalPrice}</p>
          <p className="text-sm line-clamp-3">{product.description}</p>
          <BuyNow
            productId={params.id}
            userId={user && user._id}
            wishlist={wishlist && JSON.parse(wishlist)}
          />

          <div className="flex flex-col border border-gray-500 w-full">
            <div className="border-b border-b-gray-500 w-full h-20 flex gap-6 items-center px-5 py-3">
              <Image src={DeliveryCar} alt="Car delivery" />
              <div className="flex flex-col">
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div>
              <div className="w-full h-20 flex gap-6 items-center px-5 py-3">
                <Image src={Return} alt="Car delivery" />
                <div className="flex flex-col">
                  <p className="font-semibold">Return Delivery</p>
                  <p className="text-sm">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <ReviewSection author={user && user._id} productId={params.id} />
      </section>
    </>
  );
};

export default ProductDetail;
