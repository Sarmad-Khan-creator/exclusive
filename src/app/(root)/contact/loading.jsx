import ContactForm from "@/components/ContactForm";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React from "react";

const ContactLoading = () => {
  return (
    <section className="mt-14 h-screen">
      <div className="text-gray-500 text-sm ml-24">
        Home / <span className="text-black">Contact</span>
      </div>

      <div className="flex mt-14 mx-24 gap-[150px]">
        <div className="flex flex-col gap-5 w-[250px] text-sm">
          <Skeleton className="w-full h-[150px]" />
          <Skeleton className="w-full h-[150px]" />
          <Skeleton className="w-full h-[150px]" />
        </div>

        <div className="flex flex-col gap-10 w-full">
          <div className="flex gap-14">
            <Skeleton className="flex-1 h-[70px]" />
            <Skeleton className="flex-1 h-[70px]" />
            <Skeleton className="flex-1 h-[70px]" />
          </div>
          <Skeleton className="w-full h-[700px]" />
        </div>
      </div>
    </section>
  );
};

export default ContactLoading;
