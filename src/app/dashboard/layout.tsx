"use client";
import { useState } from "react";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Add a state for mobile sidebar visibility if your Header needs to control it
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar Component */}
        <Sidebar
          isOpen={!isCollapsed} // Pass the opposite of isCollapsed for isOpen
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          // If your Sidebar also manages its own mobile state, ensure it's properly handled
          // or pass isMobileSidebarOpen if the Header is controlling it
        />

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col overflow-hidden
            ${isCollapsed ? "md:ml-20" : "md:ml-64"}
          `}
        >
          {/* Header */}
          <Header
            toggleSidebar={toggleSidebar}
            toggleMobileSidebar={toggleMobileSidebar}
          />{" "}
          {/* Pass toggleMobileSidebar if Header needs it */}
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pt-10">
            {" "}
            {/* Use flex-1 to make main fill available space */}
            <div className="p-4">{children}</div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
