import React from "react";
import SideNavbar from "./_components/SideNavbar";

const AdminLayout = ({ children }) => {
  return (
    <main className="w-full h-full flex items-start justify-start mt-10 gap-20 px-[50px]">
      <SideNavbar />
      {children}
    </main>
  );
};

export default AdminLayout;
