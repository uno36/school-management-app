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
  School,
  FileCheck2,
  BookOpen,
  Wallet,
  ReceiptText,
  CreditCard,
  FileText,
  Library as LibraryIcon,
  ClipboardListIcon,
  Book,
  BarChart3,
  Shield,
  ScanLine,
  MessageCircle,
  Megaphone,
  Send,
  UserSquare,
  UserCircle2,
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
  const [isAcademicsSubmenuOpen, setIsAcademicsSubmenuOpen] = useState(false);
  const [isFinancialsSubmenuOpen, setIsFinancialsSubmenuOpen] = useState(false);
  const [isLibrarySubmenuOpen, setIsLibrarySubmenuOpen] = useState(false);
  const [isFeaturesSubmenuOpen, setIsFeaturesSubmenuOpen] = useState(false);
  const [isCommunicationSubmenuOpen, setIsCommunicationSubmenuOpen] =
    useState(false);

  const menuItems = useMemo(
    () => [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        key: "dashboard",
        path: "/",
      },
      {
        name: "Admin",
        icon: Shield,
        key: "admin",
        path: "/dashboard/admin/user-management",
      },
      {
        name: "Staff",
        icon: UserCircle2,
        key: "staff",
        path: "/dashboard/staff",
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
            path: "/dashboard/student/studentDisciplinaryRecord",
          },
          {
            name: "Student Health Records",
            icon: ClipboardList,
            key: "studentHealthRecord",
            path: "/dashboard/student/studentHealthRecord",
          },
          {
            name: "Student Registration Form",
            icon: ClipboardSignature,
            key: "studentRegistrationForm",
            path: "/dashboard/student/studentRegistrationForm",
          },
        ],
      },
      {
        name: "Academics",
        icon: GraduationCap,
        key: "academics",
        path: "/dashboard/academic",
        children: [
          {
            name: "Calendar",
            icon: CalendarDays,
            key: "calendar",
            path: "/dashboard/academic/calendar",
          },
          {
            name: "Classes",
            icon: School,
            key: "classes",
            path: "/dashboard/academic/classes",
          },
          {
            name: "Exams",
            icon: FileCheck2,
            key: "exams",
            path: "/dashboard/academic/exams",
          },
          {
            name: "Report Cards",
            icon: BarChart2,
            key: "reportCards",
            path: "/dashboard/academic/report-cards",
          },
          {
            name: "Subjects",
            icon: BookOpen,
            key: "subjects",
            path: "/dashboard/academic/subjects",
          },
        ],
      },
      {
        name: "Library",
        icon: LibraryIcon,
        key: "library",
        path: "/dashboard/library",
        children: [
          {
            name: "Books",
            icon: Book,
            key: "books",
            path: "/dashboard/library/books",
          },
          {
            name: "Borrow / Return",
            icon: ClipboardListIcon,
            key: "borrowReturn",
            path: "/dashboard/library/borrow-return",
          },
          {
            name: "Reports",
            icon: BarChart3,
            key: "libraryReports",
            path: "/dashboard/library/reports",
          },
        ],
      },
      {
        name: "Financials",
        icon: DollarSign,
        key: "financials",
        path: "/dashboard/fees",
        children: [
          {
            name: "Expense",
            icon: Wallet,
            key: "expense",
            path: "/dashboard/financials/expenses",
          },
          {
            name: "Fees",
            icon: DollarSign,
            key: "fees",
            path: "/dashboard/financials/fees",
          },
          {
            name: "Payroll",
            icon: ReceiptText,
            key: "payroll",
            path: "/dashboard/financials/payroll",
          },
          {
            name: "Invoices",
            icon: FileText,
            key: "invoices",
            path: "/dashboard/financials/invoices",
          },
        ],
      },
      {
        name: "Features",
        icon: ScanLine,
        key: "features",
        path: "/dashboard/features",
        children: [
          {
            name: "Biometric / RFID",
            icon: ScanLine,
            key: "biometric",
            path: "/dashboard/features/biometric",
          },
          {
            name: "Payment Gateway",
            icon: CreditCard,
            key: "paymentGateway",
            path: "/dashboard/features/payment-gateway",
          },
          {
            name: "SMS Gateway",
            icon: MessageCircle,
            key: "smsGateway",
            path: "/dashboard/features/sms-gateway",
          },
        ],
      },
      {
        name: "Communication",
        icon: Megaphone,
        key: "communication",
        path: "/dashboard/communication",
        children: [
          {
            name: "Announcements",
            icon: Megaphone,
            key: "announcements",
            path: "/dashboard/communication/announcements",
          },
          {
            name: "Messaging",
            icon: Send,
            key: "messaging",
            path: "/dashboard/communication/messaging",
          },
          {
            name: "Staff Portal",
            icon: UserSquare,
            key: "staffPortal",
            path: "/dashboard/communication/staff-portal",
          },
          {
            name: "Student Portal",
            icon: GraduationCap,
            key: "studentPortal",
            path: "/dashboard/communication/student-portal",
          },
          {
            name: "Parent Portal",
            icon: Users,
            key: "parentPortal",
            path: "/dashboard/communication/parent-portal",
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
        name: "Reporting",
        icon: BarChart2,
        key: "reporting",
        path: "/dashboard/reporting/analytics",
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

  useEffect(() => {
    const checkAndOpen = (key: string, setter: (value: boolean) => void) => {
      const item = menuItems.find((i) => i.key === key);
      const isActive = item?.children?.some((child) =>
        pathname.startsWith(child.path)
      );
      if (isActive) setter(true);
    };

    checkAndOpen("students", setIsStudentSubmenuOpen);
    checkAndOpen("academics", setIsAcademicsSubmenuOpen);
    checkAndOpen("financials", setIsFinancialsSubmenuOpen);
    checkAndOpen("library", setIsLibrarySubmenuOpen);
    checkAndOpen("features", setIsFeaturesSubmenuOpen);
    checkAndOpen("communication", setIsCommunicationSubmenuOpen);
  }, [pathname, menuItems]);

  const getIsOpen = (key: string) => {
    switch (key) {
      case "students":
        return isStudentSubmenuOpen;
      case "academics":
        return isAcademicsSubmenuOpen;
      case "financials":
        return isFinancialsSubmenuOpen;
      case "library":
        return isLibrarySubmenuOpen;
      case "features":
        return isFeaturesSubmenuOpen;
      case "communication":
        return isCommunicationSubmenuOpen;
      default:
        return false;
    }
  };

  const toggleOpen = (key: string) => {
    switch (key) {
      case "students":
        setIsStudentSubmenuOpen((prev) => !prev);
        break;
      case "academics":
        setIsAcademicsSubmenuOpen((prev) => !prev);
        break;
      case "financials":
        setIsFinancialsSubmenuOpen((prev) => !prev);
        break;
      case "library":
        setIsLibrarySubmenuOpen((prev) => !prev);
        break;
      case "features":
        setIsFeaturesSubmenuOpen((prev) => !prev);
        break;
      case "communication":
        setIsCommunicationSubmenuOpen((prev) => !prev);
        break;
    }
  };

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
                const isOpen = getIsOpen(item.key);

                return (
                  <li key={item.key}>
                    <button
                      onClick={() => toggleOpen(item.key)}
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
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </>
                      )}
                    </button>

                    {!isCollapsed && isOpen && (
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
