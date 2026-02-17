"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <div>
      <div
        className="flex border-b-2 border-gray-200 gap-8"
        role="tablist"
        aria-label="Content tabs"
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`py-4 px-1 font-semibold text-base transition-colors relative ${
              activeTab === tab.id
                ? "text-cyan-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-[-2px] left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600"
                layoutId="underline"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <div className="mt-8">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            id={`${tab.id}-panel`}
            role="tabpanel"
            aria-labelledby={tab.id}
            hidden={activeTab !== tab.id}
          >
            {activeTab === tab.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {tab.content}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
