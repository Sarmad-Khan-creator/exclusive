"use client";
import ProductCard from "@/components/shared/ProductCard";
import { motion } from "framer-motion";

const OurProducts = ({ products, user }) => {
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
        JSON.parse(products).map((product, i) => (
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
