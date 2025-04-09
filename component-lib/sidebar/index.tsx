"use client";
import { useState } from "react";

// TypeScript interfaces
interface MenuItem {
  id: number;
  name: string;
  icon: string;
  path: string;
  active?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  badge?: string;
  toggle?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface Profile {
  name: string;
  email: string;
  avatarUrl: string;
}

interface MenuData {
  logo: {
    name?: string;
    logoUrl?: string;
  };
  sections: MenuSection[];
  footer: MenuItem[];
  profile: Profile;
}

interface SidebarProps {
  menuData?: MenuData;
}

// Icon component type
type IconComponent = React.FC;

// Example icons - replace with your actual icon components
const DashboardIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
  </svg>
);
const PaymentIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);
const TransactionIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
  </svg>
);
const CardsIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
    <path
      fillRule="evenodd"
      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
      clipRule="evenodd"
    />
  </svg>
);
const CapitalIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);
const VaultsIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
      clipRule="evenodd"
    />
  </svg>
);
const ReportsIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
      clipRule="evenodd"
    />
  </svg>
);
const EarnIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.563-.649-1.413-1.076-2.353-1.253V5z"
      clipRule="evenodd"
    />
  </svg>
);
const SettingsIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
);
const HelpIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);
const ProIcon: IconComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const iconMap: Record<string, IconComponent> = {
  dashboard: DashboardIcon,
  payment: PaymentIcon,
  transaction: TransactionIcon,
  cards: CardsIcon,
  capital: CapitalIcon,
  vaults: VaultsIcon,
  reports: ReportsIcon,
  earn: EarnIcon,
  settings: SettingsIcon,
  help: HelpIcon,
  pro: ProIcon,
};

// Sample menu data - this can be passed as a prop
const initialMenuData: MenuData = {
  logo: {
    name: "Sequence",
    logoUrl: "/file.svg", // Replace with your actual logo path
  },
  sections: [
    {
      title: "GENERAL",
      items: [
        {
          id: 1,
          name: "Dashboard",
          icon: "dashboard",
          path: "/dashboard",
          active: true,
        },
        { id: 2, name: "Payment", icon: "payment", path: "/payment" },
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

export default function Sidebar({ menuData = initialMenuData }: SidebarProps) {
  const [sidebarData, setSidebarData] = useState<MenuData>(menuData);

  const toggleItem = (sectionIndex: number, itemId: number): void => {
    const newData = { ...sidebarData };
    const section = newData.sections[sectionIndex];
    const itemIndex = section.items.findIndex((item) => item.id === itemId);

    if (section.items[itemIndex].expandable) {
      section.items[itemIndex].expanded = !section.items[itemIndex].expanded;
      setSidebarData(newData);
    }
  };

  const toggleProMode = (): void => {
    const newData = { ...sidebarData };
    const proModeIndex = newData.footer.findIndex((item) => item.toggle);
    if (proModeIndex !== -1) {
      newData.footer[proModeIndex].active =
        !newData.footer[proModeIndex].active;
      setSidebarData(newData);
    }
  };

  return (
    <div className="hidden md:flex flex-col h-screen bg-white w-64 border-r border-gray-200">
      {/* Logo */}
      {/* <div className="p-4 flex items-center">
        <div className="flex-shrink-0 mr-2">
          <div className="h-6 w-6 bg-black text-white rounded flex items-center justify-center">
            <img
              src={sidebarData.logo.logoUrl}
              alt={sidebarData.logo.name}
              className="h-4 w-4 text-white"
            />
          </div>
        </div>
        <span className="text-gray-800 font-semibold text-lg">
          {sidebarData.logo.name}
        </span>
      </div> */}

      {/* Main menu sections */}
      <div className="flex-grow overflow-y-auto px-4 py-2">
        {sidebarData.sections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-6">
            <div className="text-xs font-medium text-gray-400 mb-2">
              {section.title}
            </div>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const IconComponent = iconMap[item.icon] || (() => null);
                return (
                  <li key={item.id}>
                    <a
                      href={item.path}
                      onClick={
                        item.expandable
                          ? (e) => {
                              e.preventDefault();
                              toggleItem(sectionIndex, item.id);
                            }
                          : undefined
                      }
                      className={`flex items-center py-2 px-3 rounded-md text-sm ${
                        item.active
                          ? "bg-gray-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-3">
                        <IconComponent />
                      </span>
                      <span className="flex-grow">{item.name}</span>
                      {item.badge && (
                        <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.expandable && (
                        <svg
                          className={`h-4 w-4 transform ${
                            item.expanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </a>
                    {/* Expandable submenu */}
                    {item.expandable && item.expanded && (
                      <ul className="pl-10 mt-1 space-y-1">
                        <li>
                          <a
                            href="#"
                            className="block py-1 text-sm text-gray-600 hover:text-teal-600"
                          >
                            Submenu Item 1
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-1 text-sm text-gray-600 hover:text-teal-600"
                          >
                            Submenu Item 2
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer menu */}
      <div className="border-t border-gray-200">
        <ul className="px-4 py-2 space-y-1">
          {sidebarData.footer.map((item) => {
            const IconComponent = iconMap[item.icon] || (() => null);

            if (item.toggle) {
              return (
                <li
                  key={item.id}
                  className="flex items-center py-2 px-3 text-sm text-gray-700"
                >
                  <span className="mr-3">
                    <IconComponent />
                  </span>
                  <span className="flex-grow">{item.name}</span>
                  <button
                    onClick={toggleProMode}
                    className={`w-10 h-5 flex items-center rounded-full p-1 ${
                      item.active ? "bg-black" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        item.active ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <a
                  href={item.path}
                  className="flex items-center py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  <span className="mr-3">
                    <IconComponent />
                  </span>
                  <span>{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User profile */}
      <div className="border-t border-gray-200 px-4 py-3 flex flex-col gap-2">
        <div className="flex">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center mr-3">
            <span className="text-xs font-medium">
              {sidebarData.profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-grow">
            <div className="text-sm font-medium text-gray-700">
              {sidebarData.profile.name}
            </div>
            <div className="text-xs text-gray-400">
              {sidebarData.profile.email}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400">© 2024 Sequence Inc.</div>
      </div>
    </div>
  );
}
