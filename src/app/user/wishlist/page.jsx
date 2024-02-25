import { authOptions } from "@/app/api/auth/_authOptions";
import ProductCard from "@/components/shared/ProductCard";
import { findUser } from "@/lib/server-actions/user.action";
import { getAllwhishlistedProductsForUser } from "@/lib/server-actions/wishlist.action";
import { getServerSession } from "next-auth";

const Wishlist = async () => {
  const session = await getServerSession(authOptions);
  const user = await findUser({ email: session.user.email });
  const wishlist = await getAllwhishlistedProductsForUser({
    userId: user._id,
  });

  const wishlistedProducts = JSON.parse(wishlist);
  return (
    <section className="mt-14 mx-24 min-h-screen">
      <p className="text-sm font-semibold">
        Wishlist ({wishlistedProducts.length})
      </p>

      {wishlistedProducts.length > 0 ? (
        <div className="mt-10 flex gap-3 flex-wrap mb-16">
          {wishlistedProducts.map((item) => (
            <ProductCard
              key={item}
              product={item.product}
              user={user}
              path="/user/wishlist"
            />
          ))}
        </div>
      ) : (
        <div className="h-[90vh] flex items-center justify-center">
          <h2 className="text-xl font-bold">
            No Products in Wishlist for the current User
          </h2>
        </div>
      )}
    </section>
  );
};

export default Wishlist;
