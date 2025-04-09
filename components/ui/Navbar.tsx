"use client";

import Navbar from "@/component-lib/navbar";
import React from "react";

export default function NavbarWrapper() {
  return (
    <Navbar
      brand={{
        name: "BrandName",
        href: "/",
        logo: (
          <svg
            className="h-6 w-6 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        ),
      }}
      items={[
        { id: "home", label: "Home", href: "/" },
        { id: "features", label: "Features", href: "/features" },
        {
          id: "products",
          label: "Products",
          href: "#",
          children: [
            { id: "product-1", label: "Product 1", href: "/product-1" },
            { id: "product-2", label: "Product 2", href: "/product-2" },
          ],
        },
      ]}
      showSearchBar={true}
      showAuthButtons={true}
    />
  );
}
