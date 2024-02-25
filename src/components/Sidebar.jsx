"use client";
import { Category } from "@/lib/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const active = !searchParams.has("category");

  const handleCategoryClick = (value) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "category",
      value: value,
    });

    router.push(newUrl, { scroll: false });
  };

  const handleRemoveKeys = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: "category",
    });

    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex flex-col gap-3 py-5 min-w-[250px] max-h-[500px] card-shadow pr-7">
      <div
        className={`${
          active
            ? "font-bold text-white bg-blue-500 rounded-md"
            : "font-semibold"
        } cursor-pointer py-4 px-6`}
        onClick={() => handleRemoveKeys()}
      >
        <p>All Products</p>
      </div>
      {Category.map((category) => {
        let isActive;
        if (searchParams.get("category") === category.value) {
          isActive = true;
        } else {
          isActive = false;
        }
        return (
          <div
            key={category.value}
            className={`${
              isActive
                ? "font-bold text-white bg-blue-500 rounded-md"
                : "font-semibold"
            } cursor-pointer py-4 px-6`}
            onClick={() => handleCategoryClick(category.value)}
          >
            <p>{category.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
