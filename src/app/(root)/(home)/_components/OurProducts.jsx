"use client";
import ProductCard from "@/components/shared/ProductCard";
import { getNotSaleProducts } from "@/lib/server-actions/product.action";
import { findUser } from "@/lib/server-actions/user.action";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const OurProducts = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getOnSaleProducts = async () => {
      const salesProducts = await getNotSaleProducts();
      setProducts(JSON.parse(salesProducts));
    };

    const getUser = async () => {
      const gettedUser = await findUser({ email: session?.user.email });
      setUser(gettedUser);
    };

    getOnSaleProducts();
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
    <motion.div className="flex h-max w-full gap-5 mt-3">
      {products &&
        products.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
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

export default OurProducts;
