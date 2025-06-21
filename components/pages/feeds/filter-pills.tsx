import { motion } from "framer-motion";
import React from "react";

import { mockCategories } from "@/config/constants/mockdata";
import { useFeedState } from "@/hooks/use-feed-state";
import { cn } from "@/lib/utils";

export default function FilterPills() {
  const { filters, setSelectedCategory } = useFeedState();
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {mockCategories.map((category) => {
        const Icon = category.icon;
        const isActive = filters.category === category.id;

        return (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "group flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
              isActive
                ? "scale-105 transform text-white shadow-lg"
                : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <div
                className={`absolute inset-0 bg-gradient-to-r ${category.color}`}
              />
            )}
            <div className="relative flex items-center gap-2">
              <span>{Icon}</span>
              {category.name}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
