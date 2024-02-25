"use client";

import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileLink = () => {
  const pathname = usePathname();

  const active = pathname.includes("account");
  return (
    <Link
      href="/user/account/profile"
      className={cn(active && "rounded-full p-1 bg-red-500 text-white")}
    >
      <User className={cn(active && "scale-90")} />
    </Link>
  );
};

export default ProfileLink;
