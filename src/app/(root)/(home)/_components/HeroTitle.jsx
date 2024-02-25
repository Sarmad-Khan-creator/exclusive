"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroTitle = () => {
  return (
    <motion.div
      className="px-24 py-24 flex-1"
      initial={{ display: "hidden", opacity: 0, x: -200 }}
      animate={{ display: "block", opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-[44px]">
        Getting the best and <br />
        latest Laptop has never <br />{" "}
        <span className="text-blue-600 font-bold">been easier</span>
      </h1>
      <p className="text-lg text-gray-500">
        <span className="font-bold text-gray-600">Exclusive</span> is a
        plateform where you can find every <br />
        latest tech products
      </p>
      <Link href="/product/allProducts">
        <Button className="bg-blue-600 text-white mt-10 hover:bg-blue-500">
          Shop Collection
        </Button>
      </Link>
    </motion.div>
  );
};

export default HeroTitle;
