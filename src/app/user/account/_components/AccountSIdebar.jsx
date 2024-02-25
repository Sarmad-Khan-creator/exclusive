"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const accountLinks = [
  { title: "My Profile", value: "profile" },
  { title: "Address Book", value: "address-book" },
];

const AccountSidebar = () => {
  const pathname = usePathname();
  return (
    <div>
      <h2 className="font-bold font-inter">Manage My Account</h2>
      <div className="ml-10 mt-5 flex flex-col gap-5">
        {accountLinks.map((link) => {
          const isActive = pathname.includes(link.value);
          return (
            <Link
              key={link.value}
              href={link.value}
              className={`${
                isActive
                  ? "text-red-400 font-bold"
                  : "text-gray-500 font-semibold"
              }`}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AccountSidebar;
