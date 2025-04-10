import { useState, ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  renderContent: (activeTabId: string) => ReactNode;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function Tabs({
  tabs,
  defaultTabId,
  renderContent,
  onChange,
  className = "",
}: TabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || (tabs.length > 0 ? tabs[0].id : "")
  );

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <nav className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            disabled={tab.disabled}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab.disabled
                ? "text-gray-300 cursor-not-allowed"
                : activeTabId === tab.id
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="pt-4">{renderContent(activeTabId)}</div>
    </div>
  );
}
