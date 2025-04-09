import { MenuData } from "@/component-lib/sidebar/type";

// Sample menu data - this can be passed as a prop
export const initialMenuData: MenuData = {
  sections: [
    {
      title: "GENERAL",
      items: [
        {
          id: 1,
          name: "Dashboard",
          icon: "dashboard",
          path: "/dashboard/landing",
          active: true,
        },
        {
          id: 2,
          name: "Payment",
          icon: "payment",
          path: "/dashboard/landing/payment",
        },
        {
          id: 3,
          name: "Transaction",
          icon: "transaction",
          path: "/transaction",
        },
        {
          id: 4,
          name: "Cards",
          icon: "cards",
          path: "/cards",
          expandable: true,
          expanded: false,
        },
      ],
    },
    {
      title: "SUPPORT",
      items: [
        { id: 5, name: "Capital", icon: "capital", path: "/capital" },
        { id: 6, name: "Vaults", icon: "vaults", path: "/vaults" },
        { id: 7, name: "Reports", icon: "reports", path: "/reports" },
        { id: 8, name: "Earn", icon: "earn", path: "/earn", badge: "150" },
      ],
    },
  ],
  footer: [
    { id: 9, name: "Settings", icon: "settings", path: "/settings" },
    { id: 10, name: "Help", icon: "help", path: "/help" },
    {
      id: 11,
      name: "Pro Mode",
      icon: "pro",
      path: "/pro",
      toggle: true,
      active: true,
    },
  ],
  profile: {
    name: "Young Alaska",
    email: "young@alaskan.com",
    avatarUrl: "/avatar.jpg", // Replace with your actual avatar path
  },
};
