"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import LaptopImage from "../../../../../public/Laptop_White.jpg";

import React from "react";

const HeroImage = () => {
  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Image src={LaptopImage} alt="Laptop" className="relative -z-10 top-10" />
    </motion.div>
  );
};

export default HeroImage;
