"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BarChart2,
  GraduationCap,
  DollarSign,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOutIcon,
  ChevronDown,
  ChevronUp,
  BookOpenCheck,
  ShieldAlert,
  ClipboardList,
  ClipboardSignature,
} from "lucide-react";
import { useMemo, useEffect, useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  toggleSidebar,
}) => {
  const pathname = usePathname();
  const [isStudentSubmenuOpen, setIsStudentSubmenuOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        key: "dashboard",
        path: "/",
      },
      {
        name: "Students",
        icon: Users,
        key: "students",
        path: "/dashboard/student",
        children: [
          {
            name: "Students",
            icon: Users,
            key: "students",
            path: "/dashboard/student",
          },
          {
            name: "Student Academic History",
            icon: BookOpenCheck,
            key: "studentAcademicHistory",
            path: "/dashboard/student/studentAcademicHistory",
          },
          {
            name: "Student Disciplinary Record",
            icon: ShieldAlert,
            key: "studentDisciplinaryRecord",
            path: "/dashboard/student/disciplinary-record",
          },
          {
            name: "Student Enrollment Form",
            icon: ClipboardList,
            key: "studentEnrollmentForm",
            path: "/dashboard/student/enrollment-form",
          },
          {
            name: "Student Registration Form",
            icon: ClipboardSignature,
            key: "studentRegistrationForm",
            path: "/dashboard/student/registration-form",
          },
        ],
      },
      {
        name: "Timetable",
        icon: CalendarDays,
        key: "timetable",
        path: "/dashboard/timetable",
      },
      {
        name: "Attendance",
        icon: BarChart2,
        key: "attendance",
        path: "/dashboard/academic/attendance",
      },
      {
        name: "Academics",
        icon: GraduationCap,
        key: "academics",
        path: "/dashboard/academics",
      },
      {
        name: "Fees",
        icon: DollarSign,
        key: "fees",
        path: "/dashboard/fees",
      },
      {
        name: "Messages",
        icon: MessageSquare,
        key: "messages",
        path: "/dashboard/messages",
      },
      {
        name: "Settings",
        icon: Settings,
        key: "settings",
        path: "/dashboard/settings",
      },
      {
        name: "Logout",
        icon: LogOutIcon,
        key: "logout",
        path: "/logout",
      },
    ],
    []
  );

  const activeItem = [...menuItems]
    .flatMap((item) => [item, ...(item.children || [])])
    .sort((a, b) => b.path.length - a.path.length)
    .find((item) => pathname.startsWith(item.path));

  // Automatically open student submenu if current path is under it
  useEffect(() => {
    const studentItem = menuItems.find((item) => item.key === "students");
    const isChildActive = studentItem?.children?.some((child) =>
      pathname.startsWith(child.path)
    );
    if (isChildActive) {
      setIsStudentSubmenuOpen(true);
    }
  }, [pathname, menuItems]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform
          ${isCollapsed ? "w-20" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-gray-900">SCHOOLAPP</h1>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="ml-auto text-gray-500 hover:text-gray-800"
          >
            {isCollapsed ? (
              <ChevronRight className="h-6 w-6" />
            ) : (
              <ChevronLeft className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {menuItems.map((item) => {
              const isActive = item.key === activeItem?.key;

              if (item.children) {
                const isChildActive = item.children.some((child) =>
                  pathname.startsWith(child.path)
                );
                return (
                  <li key={item.key}>
                    <button
                      onClick={() =>
                        setIsStudentSubmenuOpen(!isStudentSubmenuOpen)
                      }
                      className={`w-full flex items-center py-3 text-[1.05rem] font-medium rounded-r-full transition-all
                        ${
                          isChildActive
                            ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                        ${isCollapsed ? "justify-center px-0" : "px-6"}`}
                    >
                      <item.icon className="w-6 h-6" />
                      {!isCollapsed && (
                        <>
                          <span className="ml-4 flex-1">{item.name}</span>
                          {isStudentSubmenuOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </>
                      )}
                    </button>

                    {!isCollapsed && isStudentSubmenuOpen && (
                      <ul className="ml-10 mt-1 space-y-1">
                        {item.children.map((child) => {
                          const isChildActive = pathname.startsWith(child.path);
                          return (
                            <li key={child.key}>
                              <Link
                                href={child.path}
                                className={`flex items-center gap-2 py-2 text-[1.05rem] rounded transition-colors
                                  ${
                                    isChildActive
                                      ? "text-blue-700 font-semibold"
                                      : "text-gray-600 hover:text-gray-900"
                                  }`}
                              >
                                <child.icon className="w-5 h-5" />
                                <span>{child.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.key}>
                  <Link
                    href={item.path}
                    className={`flex items-center py-3 text-[1.05rem] font-medium rounded-r-full transition-all
                      ${
                        isActive
                          ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }
                      ${isCollapsed ? "justify-center px-0" : "px-6"}`}
                  >
                    <item.icon className="w-6 h-6" />
                    {!isCollapsed && <span className="ml-4">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
