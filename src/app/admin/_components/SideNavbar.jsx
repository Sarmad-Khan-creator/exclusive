"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const adminRouts = [
  { title: "Dashboard", route: "/admin/dashboard" },
  { title: "Enter Product", route: "/admin/productEntry" },
];

const SideNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-[250px] h-[89vh] min-h-80 rounded-md shadow-md bg-gray-300 px-4 py-5 sticky">
      <h2 className="font-bold text-xl text-orange-600">Select Role</h2>
      <div className="flex flex-col gap-2 mt-3">
        {adminRouts.map((item) => (
          <div key={item.title}>
            <div className="w-full flex items-center justify-between gap-3">
              <Link
                href={item.route}
                className={`text-sm ${
                  pathname.includes(item.route) && "font-bold"
                }`}
              >
                {item.title}
              </Link>
              {pathname.includes(item.route) && <ArrowRight />}
            </div>
            <hr className="border-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
