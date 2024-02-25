import CheckoutForm from "@/components/CheckoutForm";
import { authOptions } from "@/app/api/auth/_authOptions";
import {
  getAllAddedToCartItems,
  getTotalPrice,
} from "@/lib/server-actions/cart.action";
import { findUser } from "@/lib/server-actions/user.action";
import { getServerSession } from "next-auth";
import CheckoutSummary from "@/components/CheckoutSummary";

const Checkout = async () => {
  const session = await getServerSession(authOptions);
  const user = await findUser({ email: session?.user.email });
  const cartItems = await getAllAddedToCartItems({ userId: user._id });
  const { totalPrice } = await getTotalPrice({ user: user._id });
  return (
    <section className="mt-20 px-24">
      <h1 className="font-semibold text-3xl">Billing Details</h1>
      <div className="mt-8">
        <CheckoutForm
          cartItems={JSON.parse(cartItems)}
          totalPrice={totalPrice}
        />
      </div>
    </section>
  );
};

export default Checkout;
