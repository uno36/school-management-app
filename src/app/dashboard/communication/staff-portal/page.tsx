"use client";

import React, { useState, useEffect } from "react";

// --- Mock Shadcn UI Component Mockups (Integrated for self-contained execution) ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline:
        "border border-blue-400 bg-transparent text-blue-600 hover:bg-blue-50",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      link: "text-blue-600 underline-offset-4 hover:underline",
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
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
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
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${className}`}
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

// Mock Link component for navigation
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

// --- Mock Data Interfaces ---
interface StaffMember {
  id: string;
  name: string;
  role: string; // e.g., 'Teacher', 'Admin', 'Librarian'
  department: string;
  schedule: { day: string; time: string; activity: string }[];
  announcements: { id: string; title: string; content: string; date: string }[];
  assignedClasses?: { id: string; name: string; section: string }[];
}

// --- Mock Data ---
const mockStaffMembers: StaffMember[] = [
  {
    id: "T001",
    name: "Ms. Emily White",
    role: "Teacher",
    department: "Mathematics",
    schedule: [
      { day: "Monday", time: "08:00 AM - 09:00 AM", activity: "Grade 5 Math" },
      { day: "Tuesday", time: "10:00 AM - 11:00 AM", activity: "Grade 6 Math" },
    ],
    announcements: [
      {
        id: "ANN001",
        title: "Faculty Meeting Tomorrow",
        content:
          "A mandatory faculty meeting will be held tomorrow at 3 PM in the staff room.",
        date: "2025-07-10",
      },
    ],
    assignedClasses: [
      { id: "C001", name: "Grade 5", section: "A" },
      { id: "C002", name: "Grade 6", section: "B" },
    ],
  },
  {
    id: "A001",
    name: "Mr. David Lee",
    role: "Administrator",
    department: "Administration",
    schedule: [
      {
        day: "Monday",
        time: "09:00 AM - 12:00 PM",
        activity: "Student Admissions",
      },
      {
        day: "Wednesday",
        time: "01:00 PM - 03:00 PM",
        activity: "Budget Review",
      },
    ],
    announcements: [
      {
        id: "ANN002",
        title: "New Policy on Leave Requests",
        content:
          "Please review the updated policy on submitting leave requests, effective immediately.",
        date: "2025-07-08",
      },
    ],
  },
];

/**
 * StaffPortalPage component provides a personalized view for staff members.
 * It includes mock data for their schedule, assigned classes (for teachers), and relevant announcements.
 */
export default function StaffPortalPage() {
  // For demonstration, let's assume a staff member is logged in with ID 'T001'
  const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      // In a real application, the staff ID would come from authentication context
      const staffId = "T001"; // Example: Ms. Emily White's ID
      const staff = mockStaffMembers.find((s) => s.id === staffId);

      if (staff) {
        setCurrentStaff(staff);
      } else {
        setError("Staff data not found. Please ensure you are logged in.");
      }
    } catch (err) {
      setError("Failed to load staff portal data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading staff portal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!currentStaff) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Staff data not available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Staff Portal: {currentStaff.name}
        </h1>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="space-y-8">
          {/* Staff Basic Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            {/* Placeholder for staff photo */}
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold border-4 border-white shadow-md">
              {currentStaff.name.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900">
                {currentStaff.name}
              </h2>
              <p className="text-lg text-gray-700">
                Role: <span className="font-medium">{currentStaff.role}</span>
              </p>
              <p className="text-md text-gray-600">
                Department:{" "}
                <span className="font-medium">{currentStaff.department}</span>
              </p>
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Your Daily Schedule
            </h3>
            {currentStaff.schedule.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentStaff.schedule.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.day}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.time}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.activity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No schedule available.</p>
            )}
          </div>

          {/* Assigned Classes (for Teachers) */}
          {currentStaff.role === "Teacher" && currentStaff.assignedClasses && (
            <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                Assigned Classes
              </h3>
              {currentStaff.assignedClasses.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {currentStaff.assignedClasses.map((cls) => (
                    <li key={cls.id}>
                      <span className="font-medium">{cls.name}</span> - Section{" "}
                      {cls.section}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No classes assigned.</p>
              )}
            </div>
          )}

          {/* Relevant Announcements */}
          <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Relevant Announcements
            </h3>
            {currentStaff.announcements.length > 0 ? (
              currentStaff.announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border border-gray-100 p-3 rounded-md bg-gray-50 shadow-sm"
                >
                  <h4 className="font-semibold text-md text-gray-900">
                    {announcement.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Date:</span>{" "}
                    {announcement.date}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {announcement.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No announcements for you at this time.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
