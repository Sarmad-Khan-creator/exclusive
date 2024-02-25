import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <main className="w-full mt-10 flex">
      <Image src="/login-mobile.png" width={600} height={530} alt="mobile" />

      <div className="w-full h-[80vh] flex items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
