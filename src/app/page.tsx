"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, createContext, useContext } from "react";
import Sidebar from "@/components/shared/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Mock Shadcn UI Component Mockups (Integrated for self-contained execution) ---
// In a real project, these would be imported from a UI library like Shadcn UI.
// They are included directly here for a self-contained and runnable example.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 ease-in-out";
    const variantClasses = {
      default: "bg-blue-600 text-white shadow-md hover:bg-blue-700",
      outline:
        "border border-blue-400 bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-sm",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      link: "text-blue-600 underline-offset-4 hover:underline",
      destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md",
    };
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };
    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 ${className}`}
      {...props}
    />
  )
);
Label.displayName = "Label";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all duration-200 ease-in-out ${className}`}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 opacity-50"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
// --- End Shadcn UI Component Mockups ---

// Mock Link component for navigation (simple anchor tag)
// In a real React app, you'd use a routing library like React Router's <Link>
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void; // Allow custom onClick
}

// const Link: React.FC<LinkProps> = ({ href, children, onClick, ...props }) => {
//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     if (onClick) {
//       onClick(e);
//     }
//     // Prevent default navigation if onClick handles it (e.g., setCurrentPage)
//     e.preventDefault();
//   };
//   return (
//     <a href={href} onClick={handleClick} {...props}>
//       {children}
//     </a>
//   );
// };

// --- Lucide React Icons Mockups (Simplified for direct inclusion) ---
// In a real project, you would import these from 'lucide-react'
const Home = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const Users = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const Briefcase = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const DollarSign = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const MessageSquare = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const LayoutDashboard = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);
const BarChart2 = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="14" />
  </svg>
);
const Settings = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.09.1a2 2 0 0 1 0 2.73l-.09.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.09-.1a2 2 0 0 1 0 2.73l.09-.1a2 2 0 0 0-.73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const Zap = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const Menu = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const X = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
const Bell = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.36 18.35a2 2 0 1 0 3.28 0" />
  </svg>
);
const Mail = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const GraduationCap = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const CalendarDays = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);
const UserRound = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);
// --- End Lucide React Icons Mockups ---

// Define User Roles
type UserRole = "admin" | "staff" | "student" | "parent";

// Create a Context for User Role
interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: React.Dispatch<React.SetStateAction<UserRole>>;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined
);

// Custom hook to use the User Role context
const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
};

// Dummy data for the dashboard - tailored to PDF features
const studentData = {
  overallStudents: 12200,
  newAdmissions: 3900,
  dropouts: 10,
  boys: 6000,
  girls: 6200,
  // From PDF: detailed student profiles, admission number, documents
  recentRegistrations: [
    { id: "S001", name: "Alice Smith", class: "7th STD", status: "New" },
    { id: "S002", name: "Bob Johnson", class: "8th STD", status: "New" },
  ],
};

const staffData = {
  totalStaff: 150,
  teachers: 100,
  adminStaff: 30,
  supportStaff: 20,
  // From PDF: detailed profiles, qualifications, experience
  onDutyToday: 145,
  absentToday: 5,
};

const attendanceData = {
  present: 12200, // Overall students present
  absent: 120,
  lateArrivals: 120,
  // From PDF: automated attendance tracking
  studentAttendanceDetails: [
    { id: "S001", name: "Alice Smith", status: "Present", time: "08:00 AM" },
    { id: "S003", name: "Charlie Brown", status: "Absent", reason: "Sick" },
  ],
  staffAttendanceDetails: [
    { id: "T001", name: "Ms. Davis", status: "Present", time: "07:45 AM" },
    { id: "T005", name: "Mr. White", status: "Late", time: "08:15 AM" },
  ],
};

const performanceData = {
  percentage: 96,
  status: "Great",
  boysPerformance: 98, // Example: average score for boys
  girlsPerformance: 94, // Example: average score for girls
  // From PDF: tracking past academic performance, grades
  myGrades: [
    // For student view
    { subject: "Math", grade: "A", score: 92 },
    { subject: "Science", grade: "B+", score: 88 },
  ],
  childGrades: [
    // For parent view
    { subject: "Math", grade: "A", score: 92 },
    { subject: "Science", grade: "B+", score: 88 },
  ],
};

const financialData = {
  totalFeesCollected: 550000,
  outstandingFees: 75000,
  upcomingDeadlines: [
    { date: "2024-12-24", description: "Term 2 Fee Payment" },
  ],
};

const announcements = [
  {
    date: "07 Dec",
    title: "School Closed Due to Weather Alert",
    description:
      "Due to inclement weather, Classes will resume on 09-12-2024. Stay safe",
  },
  {
    date: "18 Dec",
    title: "Annual Day Celebration",
    description: "Join us for our Annual Day Celebration on 12-12-2024",
  },
  {
    date: "22 Dec",
    title: "Exam Schedule Released",
    description: "The Term 1 examination schedule will be available.",
  },
  {
    date: "24 Dec",
    title: "Fee Deadline Approaching",
    description:
      "This is a reminder that the deadline for Term 2 fee payment is 24-12-2024.",
  },
  {
    date: "31 Dec",
    title: "Parent-Teacher Meetings",
    description:
      "Teachers will discuss student progress and address concerns. Attendance is mandatory.",
  },
];

const onLeaveToday = [
  {
    name: "Angel",
    imageUrl: "https://placehold.co/40x40/FF6666/FFFFFF?text=A",
  },
  { name: "Arun", imageUrl: "https://placehold.co/40x40/66B2FF/FFFFFF?text=A" },
  {
    name: "Tharun",
    imageUrl: "https://placehold.co/40x40/99FF99/FFFFFF?text=T",
  },
  { name: "Lila", imageUrl: "https://placehold.co/40x40/FFCC66/FFFFFF?text=L" },
  {
    name: "David",
    imageUrl: "https://placehold.co/40x40/CC99FF/FFFFFF?text=D",
  },
];

const calendarDays = [
  { day: 1, type: "normal" },
  { day: 2, type: "normal" },
  { day: 3, type: "normal" },
  { day: 4, type: "normal" },
  { day: 5, type: "normal" },
  { day: 6, type: "normal" },
  { day: 7, type: "normal" },
  { day: 8, type: "normal" },
  { day: 9, type: "normal" },
  { day: 10, type: "normal" },
  { day: 11, type: "normal" },
  { day: 12, type: "normal" },
  { day: 13, type: "holiday" },
  { day: 14, type: "normal" },
  { day: 15, type: "normal" },
  { day: 16, type: "normal" },
  { day: 17, type: "normal" },
  { day: 18, type: "meeting" },
  { day: 19, type: "normal" },
  { day: 20, type: "normal" },
  { day: 21, type: "normal" },
  { day: 22, type: "event" },
  { day: 23, type: "normal" },
  { day: 24, type: "normal" },
  { day: 25, type: "normal" },
  { day: 26, type: "normal" },
  { day: 27, type: "normal" },
  { day: 28, type: "normal" },
  { day: 29, type: "normal" },
  { day: 30, type: "normal" },
  { day: 31, type: "normal" },
];

// Component for displaying student overview (Admin/Staff View)
const StudentOverview: React.FC = () => {
  const { userRole } = useUserRole();
  if (userRole === "student" || userRole === "parent") return null; // Not visible for students/parents

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Students overview{" "}
          <span className="text-green-500 text-sm">
            120% higher than last year ▲
          </span>
        </h3>
        <Select className="mt-2 md:mt-0 md:w-auto">
          <option>Last 1 year</option>
          <option>Last 6 months</option>
          <option>Last 3 months</option>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-start p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-gray-600">Overall Students</span>
          <span className="text-2xl font-bold text-blue-700">
            {studentData.overallStudents.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-start p-4 bg-green-50 rounded-lg">
          <span className="text-sm text-gray-600">New Admissions</span>
          <span className="text-2xl font-bold text-green-700">
            {studentData.newAdmissions.toLocaleString()}{" "}
            <span className="text-green-500 text-sm">+5%</span>
          </span>
        </div>
        <div className="flex flex-col items-start p-4 bg-red-50 rounded-lg">
          <span className="text-sm text-gray-600">Dropouts</span>
          <span className="text-2xl font-bold text-red-700">
            {studentData.dropouts}{" "}
            <span className="text-red-500 text-sm">-10%</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start p-4 bg-purple-50 rounded-lg">
            <span className="text-sm text-gray-600">Boys</span>
            <span className="text-2xl font-bold text-purple-700">
              {studentData.boys.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-start p-4 bg-pink-50 rounded-lg">
            <span className="text-sm text-gray-600">Girls</span>
            <span className="text-2xl font-bold text-pink-700">
              {studentData.girls.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component for displaying Staff Overview (Admin View)
const StaffOverview: React.FC = () => {
  const { userRole } = useUserRole();
  if (userRole !== "admin") return null; // Only visible for admin

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Staff Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-start p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-gray-600">Total Staff</span>
          <span className="text-2xl font-bold text-blue-700">
            {staffData.totalStaff}
          </span>
        </div>
        <div className="flex flex-col items-start p-4 bg-green-50 rounded-lg">
          <span className="text-sm text-gray-600">Teachers</span>
          <span className="text-2xl font-bold text-green-700">
            {staffData.teachers}
          </span>
        </div>
        <div className="flex flex-col items-start p-4 bg-purple-50 rounded-lg">
          <span className="text-sm text-gray-600">Admin Staff</span>
          <span className="text-2xl font-bold text-purple-700">
            {staffData.adminStaff}
          </span>
        </div>
        <div className="flex flex-col items-start p-4 bg-orange-50 rounded-lg">
          <span className="text-sm text-gray-600">Support Staff</span>
          <span className="text-2xl font-bold text-orange-700">
            {staffData.supportStaff}
          </span>
        </div>
      </div>
    </section>
  );
};

// Component for displaying overall attendance (Admin/Staff View)
const OverallAttendance: React.FC = () => {
  const { userRole } = useUserRole();
  if (userRole === "student" || userRole === "parent") return null; // Not visible for students/parents

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Overall Attendance
        </h3>
        <Input
          type="date"
          defaultValue="2024-12-07"
          className="mt-2 md:mt-0 md:w-auto"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col items-start p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-gray-600">No. of Present</span>
          <span className="text-2xl font-bold text-blue-700">
            {attendanceData.present.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-start p-4 bg-yellow-50 rounded-lg">
          <span className="text-sm text-gray-600">No. of Absent</span>
          <span className="text-2xl font-bold text-yellow-700">
            {attendanceData.absent}
          </span>
        </div>
        <div className="flex flex-col items-start p-4 bg-orange-50 rounded-lg">
          <span className="text-sm text-gray-600">Late arrivals</span>
          <span className="text-2xl font-bold text-orange-700">
            {attendanceData.lateArrivals}
          </span>
        </div>
      </div>
      <Button variant="outline" className="w-full md:w-auto">
        Download Report
      </Button>
    </section>
  );
};

// Component for student's individual attendance (Student/Parent View)
const MyAttendance: React.FC = () => {
  const { userRole } = useUserRole();
  if (userRole !== "student" && userRole !== "parent") return null;

  // In a real app, this would fetch specific student/child attendance
  const currentAttendance = attendanceData.studentAttendanceDetails[0]; // Mocking for single student

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        My Attendance
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col items-start p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-gray-600">Status</span>
          <span className="text-2xl font-bold text-blue-700">
            {currentAttendance.status}
          </span>
        </div>
        <div className="flex flex-col items-start p-4 bg-green-50 rounded-lg">
          <span className="text-sm text-gray-600">Last Recorded Time</span>
          <span className="text-2xl font-bold text-green-700">
            {currentAttendance.time || "N/A"}
          </span>
        </div>
      </div>
      {userRole === "parent" && (
        <p className="text-sm text-gray-600 mt-4">
          Viewing attendance for your child.
        </p>
      )}
      {userRole === "student" && currentAttendance.reason && (
        <p className="text-sm text-gray-600 mt-4">
          Reason for absence: {currentAttendance.reason}
        </p>
      )}
    </section>
  );
};

// Component for performance chart (Admin/Staff View)
const PerformanceChart: React.FC = () => {
  const { userRole } = useUserRole();
  if (userRole === "student" || userRole === "parent") return null; // Not visible for students/parents

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Performance</h3>
        <div className="flex space-x-2">
          <Select className="w-auto">
            <option>7th STD</option>
            <option>8th STD</option>
          </Select>
          <Select className="w-auto">
            <option>Half year</option>
            <option>Full year</option>
          </Select>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#2563eb"
              strokeWidth="10"
              strokeDasharray={`${performanceData.percentage * 2.827} 282.7`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
              className="transition-all duration-1000 ease-in-out"
            />
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-3xl font-bold fill-gray-900"
            >
              {performanceData.percentage}%
            </text>
            <text
              x="50"
              y="65"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm fill-gray-600"
            >
              {performanceData.status}
            </text>
          </svg>
        </div>
        <div className="flex justify-around w-full mt-6">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-600 mr-2"></span>
            <span className="text-sm text-gray-700">Boys</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span>
            <span className="text-sm text-gray-700">Girls</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component for individual grades (Student/Parent View)
const MyGrades: React.FC = () => {
  const { userRole } = useUserRole();
  if (userRole !== "student" && userRole !== "parent") return null;

  const gradesToDisplay =
    userRole === "student"
      ? performanceData.myGrades
      : performanceData.childGrades;

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {userRole === "student" ? "My Grades" : "Child's Grades"}
      </h3>
      <div className="space-y-3">
        {gradesToDisplay.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
          >
            <span className="font-medium text-gray-800">{item.subject}</span>
            <span
              className={`font-bold ${
                item.grade === "A" ? "text-green-600" : "text-blue-600"
              }`}
            >
              {item.grade} ({item.score}%)
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-4">
        {userRole === "student"
          ? "Your academic performance overview."
          : "Overview of your child's academic performance."}
      </p>
    </section>
  );
};

// Component for Fee Information (Admin/Parent View)
const FeeInformation: React.FC = () => {
  const { userRole } = useUserRole();
  if (userRole !== "admin" && userRole !== "parent") return null;

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Fee Information
      </h3>
      {userRole === "admin" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col items-start p-4 bg-green-50 rounded-lg">
            <span className="text-sm text-gray-600">Total Fees Collected</span>
            <span className="text-2xl font-bold text-green-700">
              ${financialData.totalFeesCollected.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-start p-4 bg-red-50 rounded-lg">
            <span className="text-sm text-gray-600">Outstanding Fees</span>
            <span className="text-2xl font-bold text-red-700">
              ${financialData.outstandingFees.toLocaleString()}
            </span>
          </div>
        </div>
      )}
      <h4 className="font-semibold text-gray-900 mb-2">Upcoming Deadlines:</h4>
      <ul className="list-disc list-inside space-y-1">
        {financialData.upcomingDeadlines.map((deadline, index) => (
          <li key={index} className="text-sm text-gray-600">
            <span className="font-medium">{deadline.date}:</span>{" "}
            {deadline.description}
          </li>
        ))}
      </ul>
      {userRole === "parent" && (
        <Button variant="default" className="mt-6 w-full md:w-auto">
          Pay Fees Now
        </Button>
      )}
    </section>
  );
};

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<UserRole>("admin");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Close sidebar on larger screens if it was open for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
        {/* Sidebar Component */}
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
            isSidebarCollapsed ? "ml-20" : "ml-64"
          } ${isSidebarOpen ? "translate-x-64 lg:translate-x-0" : ""}`}
        >
          {/* Top Bar */}
          <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-4"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </Button>
            {/* Add collapse button for desktop */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex mr-4"
              onClick={toggleCollapse}
              aria-label="Collapse sidebar"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-6 w-6" />
              ) : (
                <ChevronLeft className="h-6 w-6" />
              )}
            </Button>

            {/* Rest of your header content remains the same */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                View as:
              </span>
              <Select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="w-32"
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </Select>
            </div>
            <div className="hidden lg:flex space-x-4">
              {userRole === "admin" && (
                <>
                  <Link href="/dashboard/student">
                    <Button
                      variant="default"
                      className="rounded-full px-6 py-2 cursor-pointer"
                    >
                      Students
                    </Button>
                  </Link>

                  <Button variant="outline" className="rounded-full px-6 py-2">
                    Teachers
                  </Button>
                </>
              )}
              {userRole === "staff" && (
                <>
                  <Button variant="default" className="rounded-full px-6 py-2">
                    My Classes
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-2">
                    My Schedule
                  </Button>
                </>
              )}
              {userRole === "student" && (
                <>
                  <Button variant="default" className="rounded-full px-6 py-2">
                    My Profile
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-2">
                    My Timetable
                  </Button>
                </>
              )}
              {userRole === "parent" && (
                <>
                  <Button variant="default" className="rounded-full px-6 py-2">
                    My Child
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-2">
                    Fee Status
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" aria-label="Mail">
                <Mail className="w-6 h-6 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="w-6 h-6 text-gray-600" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-lg">
                A
              </div>
            </div>
          </header>

          {/* Rest of your main content remains exactly the same */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome Back,{" "}
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}!
              </h2>
              <p className="text-gray-600">Here&apos;s your updated overview</p>
            </div>

            {/* Conditional Sections based on Role */}
            {userRole === "admin" && <StudentOverview />}
            {userRole === "admin" && <StaffOverview />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: On Leave Today & Announcements */}
              <div className="lg:col-span-1 flex flex-col space-y-8">
                {/* On Leave Today (Admin/Staff View) */}
                {(userRole === "admin" || userRole === "staff") && (
                  <section className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        On Leave Today ({onLeaveToday.length})
                      </h3>
                      <Link
                        href="#"
                        className="text-blue-600 text-sm font-medium"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                      {onLeaveToday.map((person, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center text-center"
                        >
                          <Image
                            width={40}
                            height={40}
                            src={person.imageUrl}
                            alt={person.name}
                            className="w-12 h-12 rounded-full object-cover mb-2"
                            onError={(e) => {
                              e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/FFFFFF?text=${person.name.charAt(
                                0
                              )}`;
                            }}
                          />
                          <span className="text-sm font-medium">
                            {person.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      {userRole === "admin"
                        ? "Overview of staff on leave."
                        : "Staff on leave in your department."}
                    </p>
                  </section>
                )}

                {/* Announcements (Visible to all roles) */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Announcements
                    </h3>
                    <Link
                      href="#"
                      className="text-blue-600 text-sm font-medium"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {announcements.map((announcement, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 text-center mr-4">
                          <div className="text-blue-600 text-xl font-bold">
                            {announcement.date.split(" ")[0]}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {announcement.date.split(" ")[1]}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {announcement.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {announcement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Attendance & Performance/Grades & Calendar */}
              <div className="lg:col-span-2 flex flex-col space-y-8">
                {/* Attendance Section */}
                {userRole === "admin" || userRole === "staff" ? (
                  <OverallAttendance />
                ) : (
                  <MyAttendance />
                )}

                {/* Performance/Grades Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {userRole === "admin" || userRole === "staff" ? (
                    <PerformanceChart />
                  ) : (
                    <MyGrades />
                  )}

                  {/* Calendar (Visible to all roles, but content might vary) */}
                  <section className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Calendar
                      </h3>
                      <Input
                        type="date"
                        defaultValue="2024-12-07"
                        className="mt-2 md:mt-0 md:w-auto"
                      />
                    </div>
                    <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-4">
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                      <div>Sun</div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {calendarDays.map((day, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded-full flex items-center justify-center
                            ${
                              day.type === "holiday"
                                ? "bg-red-200 text-red-800 font-bold"
                                : ""
                            }
                            ${
                              day.type === "meeting"
                                ? "bg-blue-200 text-blue-800 font-bold"
                                : ""
                            }
                            ${
                              day.type === "event"
                                ? "bg-green-200 text-green-800 font-bold"
                                : ""
                            }
                            ${
                              day.type === "normal" && day.day !== 0
                                ? "text-gray-800"
                                : ""
                            }
                            ${day.day === 0 ? "opacity-0" : ""}
                          `}
                        >
                          {day.day !== 0 && day.day}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-red-200 mr-2"></span>
                        <span>Holidays</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-200 mr-2"></span>
                        <span>Meetings</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-200 mr-2"></span>
                        <span>Events</span>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Fee Information (Admin/Parent View) */}
                {(userRole === "admin" || userRole === "parent") && (
                  <FeeInformation />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </UserRoleContext.Provider>
  );
};

export default App;
