// frontend/components/shared/Header.tsx
"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface HeaderProps {
  toggleSidebar: () => void;
  toggleMobileSidebar?: () => void; // Made optional since it wasn't used in your original code
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before showing the theme switcher
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left side - Sidebar toggle and logo */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-4">
          {/* Theme switcher */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-6 w-6 text-gray-600 dark:text-yellow-300" />
              ) : (
                <Moon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          )}

          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-medium">
                  AD
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
