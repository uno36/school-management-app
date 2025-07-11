"use client";

import Link from "next/link";
import React, { useState } from "react";

// --- Mock Shadcn UI Component Mockups (Integrated for self-contained execution) ---
// These are duplicated here to make this component self-contained and runnable.
// In a real project, you would import these from a central UI library.

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

// Mock Data for Attendance
const mockStudentAttendance = [
  {
    id: "S001",
    name: "Alice Smith",
    class: "7th Grade",
    status: "Present",
    time: "08:00 AM",
  },
  {
    id: "S002",
    name: "Bob Johnson",
    class: "8th Grade",
    status: "Absent",
    reason: "Sick Leave",
  },
  {
    id: "S003",
    name: "Charlie Brown",
    class: "7th Grade",
    status: "Late",
    time: "08:15 AM",
  },
  {
    id: "S004",
    name: "Diana Prince",
    class: "9th Grade",
    status: "Present",
    time: "07:55 AM",
  },
  {
    id: "S005",
    name: "Eve Adams",
    class: "8th Grade",
    status: "Present",
    time: "07:58 AM",
  },
  {
    id: "S006",
    name: "Frank White",
    class: "7th Grade",
    status: "Absent",
    reason: "Family Event",
  },
  {
    id: "S007",
    name: "Grace Hall",
    class: "9th Grade",
    status: "Present",
    time: "08:02 AM",
  },
];

const mockStaffAttendance = [
  {
    id: "T001",
    name: "Mr. Davis",
    department: "Math",
    status: "Present",
    time: "07:45 AM",
  },
  {
    id: "T002",
    name: "Ms. Lee",
    department: "Science",
    status: "Present",
    time: "07:50 AM",
  },
  {
    id: "T003",
    name: "Dr. Evans",
    department: "Administration",
    status: "Absent",
    reason: "Conference",
  },
  {
    id: "T004",
    name: "Mrs. Green",
    department: "English",
    status: "Late",
    time: "08:10 AM",
  },
  {
    id: "T005",
    name: "Mr. White",
    department: "Sports",
    status: "Present",
    time: "07:59 AM",
  },
];

const AttendancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceType, setAttendanceType] = useState<"students" | "staff">(
    "students"
  );
  const [filterClassDept, setFilterClassDept] = useState("All"); // For filtering by class or department
  const [searchTerm, setSearchTerm] = useState(""); // For searching by name or ID

  // Determine which data to display based on attendanceType
  const currentData =
    attendanceType === "students" ? mockStudentAttendance : mockStaffAttendance;

  // Filtered data based on search term and class/department
  const filteredData = currentData.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (attendanceType === "students" && "class" in item) {
      matchesFilter =
        filterClassDept === "All" || item.class === filterClassDept;
    } else if (attendanceType === "staff" && "department" in item) {
      matchesFilter =
        filterClassDept === "All" || item.department === filterClassDept;
    }

    return matchesSearch && matchesFilter;
  });

  // Extract unique classes/departments for filter dropdown
  const uniqueClassDepts = Array.from(
    new Set(
      currentData
        .map((item) =>
          attendanceType === "students" && "class" in item
            ? item.class
            : attendanceType === "staff" && "department" in item
            ? item.department
            : ""
        )
        .filter(Boolean) // Filter out empty strings
    )
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Attendance Management
        </h1>
        <Link href="/dashboard/academic/attendance/add">
          {" "}
          {/* Link to add new class/section form */}
          <Button variant="default">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Report
          </Button>
        </Link>
      </div>

      {/* Filters and Actions */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label
              htmlFor="attendance-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <Input
              id="attendance-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="attendance-type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type
            </label>
            <Select
              id="attendance-type"
              value={attendanceType}
              onChange={(e) => {
                setAttendanceType(e.target.value as "students" | "staff");
                setFilterClassDept("All"); // Reset filter when type changes
              }}
              className="w-full"
            >
              <option value="students">Students</option>
              <option value="staff">Staff</option>
            </Select>
          </div>
          <div>
            <label
              htmlFor="filter-class-dept"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {attendanceType === "students" ? "Class" : "Department"}
            </label>
            <Select
              id="filter-class-dept"
              value={filterClassDept}
              onChange={(e) => setFilterClassDept(e.target.value)}
              className="w-full"
            >
              <option value="All">All</option>
              {uniqueClassDepts.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label
              htmlFor="search-term"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <Input
              id="search-term"
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="default" className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" className="flex-1">
            Export Report
          </Button>
        </div>
      </section>

      {/* Attendance Table */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {attendanceType === "students"
            ? "Student Attendance Records"
            : "Staff Attendance Records"}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                {attendanceType === "students" && (
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Class
                  </th>
                )}
                {attendanceType === "staff" && (
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Department
                  </th>
                )}
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Time
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Reason
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {item.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {item.name}
                    </td>
                    {attendanceType === "students" && "class" in item && (
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {item.class}
                      </td>
                    )}
                    {attendanceType === "staff" && "department" in item && (
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {item.department}
                      </td>
                    )}
                    <td
                      className={`py-3 px-4 text-sm font-medium ${
                        item.status === "Present"
                          ? "text-green-600"
                          : item.status === "Absent"
                          ? "text-red-600"
                          : "text-orange-600"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {item.time || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {item.reason || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Button variant="secondary" size="sm" className="mr-4">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500">
                    No attendance records found for the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          This table displays daily attendance records. In a real system, data
          would be fetched from a backend and updated dynamically.
        </p>
      </section>
    </div>
  );
};

export default AttendancePage;
