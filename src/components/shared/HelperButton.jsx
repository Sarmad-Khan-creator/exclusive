"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const HelperButton = ({ onClick, children }) => {
  return (
    <Button variant="outline" onClick={() => signOut}>
      {children}
    </Button>
  );
};

export default HelperButton;
