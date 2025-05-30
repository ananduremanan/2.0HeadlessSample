import { MenuData } from "@/component-lib/sidebar/type";
import SideBarButton from "@/components/ui/SideBarButton";

// Sample menu data - this can be passed as a prop
export const initialMenuData: MenuData = {
  logo: {
    name: "Sequence",
    logoUrl: "/file.svg",
  },
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
          path: "/dashboard/landing/tetris",
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
        {
          id: 890,
          name: "Custoime",
          icon: "earn",
          type: "custom",
          component: SideBarButton,
        },
      ],
    },
  ],
  footer: [
    { id: 9, name: "Settings", icon: "settings", path: "/settings" },
    { id: 10, name: "Logout", icon: "help", path: "/dashboard" },
    {
      type: "custom",
      id: 11,
      name: "Dark Mode",
      icon: "pro",
      toggle: false,
      active: false,
      component: SideBarButton,
    },
  ],
  profile: {
    name: "Young Alaska",
    email: "young@alaskan.com",
    avatarUrl: "/avatar.jpg", // Replace with your actual avatar path
  },
};
