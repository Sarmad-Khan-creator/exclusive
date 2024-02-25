"use client";
import ProductCard from "@/components/shared/ProductCard";
import { motion } from "framer-motion";

const DiscountedProducts = ({ discountedProducts, user }) => {
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
        discountedProducts.map((discountedProduct, i) => (
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
