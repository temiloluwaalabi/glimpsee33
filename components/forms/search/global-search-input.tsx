// components/GlobalSearchInput.tsx
"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import GlobalSearchDialog from "@/components/dialogs/global-search-dialog";
import { Input } from "@/components/ui/input";
import useSession from "@/hooks/use-session";
import { useAppStore } from "@/store/use-app-store";

interface GlobalSearchInputProps {
  placeholder?: string;
  className?: string;
}

const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({
  placeholder = "Search for articles, topics, or authors...",
  className = "",
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAppStore();
  const { session } = useSession();
  const router = useRouter();

  const handleInputClick = () => {
    if (!isAuthenticated || !session?.isLoggedIn) {
      router.push("/login");
      return;
    }
    setIsSearchOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!isSearchOpen) {
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <Search className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onClick={handleInputClick}
          className="h-[48px] w-full rounded-full bg-white py-4 pr-6 pl-14 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
        />
      </div>

      <GlobalSearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchQuery}
      />
    </>
  );
};

export default GlobalSearchInput;
