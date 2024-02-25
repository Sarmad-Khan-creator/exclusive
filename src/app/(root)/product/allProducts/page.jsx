import { authOptions } from "@/app/api/auth/_authOptions";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/shared/ProductCard";
import { getProducts } from "@/lib/server-actions/product.action";
import { findUser } from "@/lib/server-actions/user.action";
import { getServerSession } from "next-auth";

const AllProducts = async ({ searchParams }) => {
  const products = await getProducts(searchParams.category);
  const session = await getServerSession(authOptions);

  let user;
  if (session) {
    user = await findUser({ email: session.user.email });
  }
  return (
    <section className="mx-24 flex gap-20">
      <Sidebar />
      <div className="mt-10 mb-16 flex flex-wrap gap-x-2 gap-y-20">
        {JSON.parse(products).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            user={user}
            path={`product/allProducts?category${searchParams.category}`}
          />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
