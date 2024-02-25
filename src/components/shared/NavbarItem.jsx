"use client";

import { motion } from "framer-motion";
import { NavItems } from "./../../lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarItem = () => {
  const pathname = usePathname();
  return (
    <>
      {NavItems.map((item) => (
        <div key={item.title}>
          <Link href={item.route} className="text-black text-sm thin-bold">
            {item.title}
          </Link>
          {pathname === item.route && (
            <motion.div
              layoutId="tab-indicator"
              className="w-full h-1 bg-blue-600"
            />
          )}
        </div>
      ))}
    </>
  );
};

export default NavbarItem;
