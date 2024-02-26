"use client";
import ProductCard from "@/components/shared/ProductCard";
import { getDiscountedProducts } from "@/lib/server-actions/product.action";
import { findUser } from "@/lib/server-actions/user.action";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const DiscountedProducts = () => {
  const { data: session } = useSession();
  const [discountedProducts, setDiscountedProducts] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    const discountedProducts = async () => {
      const products = await getDiscountedProducts();
      setDiscountedProducts(products);
    };

    const getUser = async () => {
      const gettedUser = await findUser({ email: session?.user.email });
      setUser(gettedUser);
    };

    discountedProducts();
    getUser();
  }, [session?.user.email]);
  const variants = {
    initial: { opacity: 0, display: "hidden" },
    animate: (i) => ({
      opacity: 1,
      display: "block",
      transition: {
        delay: i * 0.2,
      },
    }),
  };
  return (
    <motion.div className="flex w-full gap-5 mt-3" variants={variants}>
      {discountedProducts &&
        JSON.parse(discountedProducts).map((discountedProduct, i) => (
          <ProductCard
            key={discountedProduct.title}
            product={discountedProduct}
            user={user}
            path="/"
            initial="initial"
            animate="animate"
            custom={i}
            variants={variants}
          />
        ))}
    </motion.div>
  );
};

export default DiscountedProducts;
