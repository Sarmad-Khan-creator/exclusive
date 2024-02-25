import { authOptions } from "@/app/api/auth/_authOptions";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import {
  getAllAddedToCartItems,
  getTotalPrice,
} from "@/lib/server-actions/cart.action";
import { findUser } from "@/lib/server-actions/user.action";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Cart = async () => {
  const session = await getServerSession(authOptions);
  const user = await findUser({ email: session?.user.email });

  const { totalPrice } = await getTotalPrice({ user: user._id });

  const cartItems = await getAllAddedToCartItems({ userId: user._id });
  return (
    <section className="mt-14 px-24">
      <div className="text-gray-500 text-sm">
        Home / <span className="text-black">Cart</span>
      </div>

      <div className="mt-14 flex flex-col gap-5">
        <div className="flex w-full">
          <p className="flex-1 text-sm font-semibold">Product</p>
          <p className="flex-1 text-sm font-semibold">Price</p>
          <p className="flex-1 text-sm font-semibold">Quantity</p>
          <p className="flex-1 text-sm font-semibold">Subtotal</p>
        </div>

        {JSON.parse(cartItems).length > 0 &&
          JSON.parse(cartItems).map((cartItem) => (
            <CartItem key={cartItem._id} cartItem={cartItem} />
          ))}

        <div className="w-full flex justify-start mt-5">
          <Link href="/">
            <Button variant="outline" className="border border-black">
              Return To Shop
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <div className="border border-black px-5 py-7 flex flex-col w-[500px]">
          <h2 className="font-semibold text-lg">Cart Total</h2>
          <div className="w-full flex justify-between mt-5 mb-5">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <hr className="border border-gray-600" />

          <div className="w-full flex justify-between mt-5 mb-5">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <hr className="border border-gray-600" />

          <div className="w-full flex justify-between mt-5 mb-5">
            <p>Total</p>
            <p>${totalPrice}</p>
          </div>

          <div className="w-full flex justify-center items-center">
            <Link href="/user/checkout">
              <Button
                variant="outline"
                className="bg-blue-600 text-white px-14 py-6 hover:bg-blue-500 hover:text-white"
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
