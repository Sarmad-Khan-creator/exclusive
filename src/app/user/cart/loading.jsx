import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CartLoading = () => {
  return (
    <section className="mt-14 px-24 min-h-screen">
      <div className="text-gray-500 text-sm">
        Home / <span className="text-black">Cart</span>
      </div>

      <div className="mt-14 flex flex-col gap-5">
        <div className="flex w-full gap-16">
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
        </div>
        <div className="flex w-full gap-16">
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
        </div>
        <div className="flex w-full gap-16">
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
        </div>
        <div className="flex w-full gap-16">
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
          <Skeleton className="flex-1 h-[50px]" />
        </div>
      </div>
    </section>
  );
};

export default CartLoading;
