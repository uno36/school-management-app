"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// --- Mock Shadcn UI Component Mockups ---
// Duplicated for self-contained execution. In a real project, import these.
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
// --- End Mock Shadcn UI Component Mockups ---

// Define interface for Student data (simplified for list display)
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: string;
  admissionNumber: string;
}

// Mock data for a list of students
const mockStudents: Student[] = [
  {
    id: "S001",
    firstName: "Alice",
    lastName: "Smith",
    class: "7th Grade A",
    admissionNumber: "ADM-2024-001",
  },
  {
    id: "S002",
    firstName: "Bob",
    lastName: "Johnson",
    class: "8th Grade B",
    admissionNumber: "ADM-2024-002",
  },
  {
    id: "S003",
    firstName: "Charlie",
    lastName: "Brown",
    class: "7th Grade A",
    admissionNumber: "ADM-2024-003",
  },
  {
    id: "S004",
    firstName: "Diana",
    lastName: "Prince",
    class: "9th Grade C",
    admissionNumber: "ADM-2024-004",
  },
  {
    id: "S005",
    firstName: "Eve",
    lastName: "Adams",
    class: "8th Grade B",
    admissionNumber: "ADM-2024-005",
  },
];

const StudentListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const router = useRouter();

  // Filtered students based on search term and class
  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      searchTerm === "" ||
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass = filterClass === "All" || student.class === filterClass;

    return matchesSearch && matchesClass;
  });

  // Extract unique classes for filter dropdown
  const uniqueClasses = Array.from(
    new Set(mockStudents.map((student) => student.class))
  );

  // Simulate navigation (in a real app, you'd use a router like Next.js's useRouter)
  const handleViewAcademicHistory = (studentId: string) => {
    router.push(`/dashboard/student/studentAcademicHistory/${studentId}`);
    // Example of actual navigation if using Next.js App Router:
    // router.push(`/dashboard/student/academic-history/${studentId}`);
  };

  const handleEditAcademicHistory = (studentId: string) => {
    router.push(`/dashboard/student/studentAcademicHistory/${studentId}/edit`);
    // Example of actual navigation if using Next.js App Router:
    // router.push(`/dashboard/student/academic-history/${studentId}/edit`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Student List</h1>

      {/* Filters and Actions */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              htmlFor="search-term"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search Students
            </label>
            <Input
              id="search-term"
              type="text"
              placeholder="Search by name, ID, or admission no."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="filter-class"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Class
            </label>
            <Select
              id="filter-class"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full"
            >
              <option value="All">All Classes</option>
              {uniqueClasses.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-end">
            <Button variant="default" className="w-full">
              Apply Filters
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="/dashboard/student/studentAcademicHistory/add">
            <Button variant="outline" className="cursor-pointer">
              Generate History
            </Button>
          </Link>
        </div>
      </section>

      {/* Student List Table */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          All Students ({filteredStudents.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Student ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Admission No.
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Class
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {student.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {student.admissionNumber}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {student.class}
                    </td>
                    <td className="py-3 px-4 text-sm flex space-x-2">
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        size="sm"
                        onClick={() => handleViewAcademicHistory(student.id)}
                      >
                        View Academic History
                      </Button>
                      <Button
                        variant="secondary"
                        className="cursor-pointer"
                        size="sm"
                        onClick={() => handleEditAcademicHistory(student.id)}
                      >
                        Edit Academic History
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          This table lists all registered students. &quot;View Academic
          History&quot; and &quot;Edit Academic History&quot; buttons simulate
          navigation to their respective dedicated pages.
        </p>
      </section>
    </div>
  );
};

export default StudentListPage;
