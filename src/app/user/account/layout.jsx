import React from "react";
import AccountSidebar from "./_components/AccountSIdebar";

const Account = ({ children }) => {
  return (
    <main className="min-h-screen mx-24 my-20 flex flex-col gap-16">
      <div>Home / Account</div>
      <section className="flex gap-32">
        <AccountSidebar />
        {children}
      </section>
    </main>
  );
};

export default Account;
