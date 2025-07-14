"use client";

import Link from "next/link";
// frontend/app/(dashboard)/staff/page.tsx
import React, { useState } from "react";

// --- Mock Shadcn UI Component Mockups (Integrated for self-contained execution) ---
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
// --- End Shadcn UI Component Mockups ---

// Define a simplified Staff interface for the list view
interface Staff {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  designation: string;
  department: string;
  status: "Active" | "On Leave" | "Terminated";
}

/**
 * StaffListPage component displays a list of staff members.
 * In a real application, this data would be fetched from the backend.
 */
export default function StaffListPage() {
  // Mock staff data
  const [staffMembers, setStaffMembers] = useState<Staff[]>([
    {
      id: "S001",
      staffId: "EMP001",
      firstName: "John",
      lastName: "Doe",
      designation: "Head Teacher",
      department: "Academics",
      status: "Active",
    },
    {
      id: "S002",
      staffId: "EMP002",
      firstName: "Jane",
      lastName: "Smith",
      designation: "Administrator",
      department: "Administration",
      status: "Active",
    },
    {
      id: "S003",
      staffId: "EMP003",
      firstName: "Peter",
      lastName: "Jones",
      designation: "Science Teacher",
      department: "Academics",
      status: "On Leave",
    },
    {
      id: "S004",
      staffId: "EMP004",
      firstName: "Emily",
      lastName: "Davis",
      designation: "Librarian",
      department: "Library",
      status: "Active",
    },
    {
      id: "S005",
      staffId: "EMP005",
      firstName: "Michael",
      lastName: "Brown",
      designation: "Accountant",
      department: "Finance",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Staff List</h1>
        <Link href="/dashboard/staff/register">
          {" "}
          {/* Link to staff registration form */}
          <Button variant="default" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 cursor-pointer"
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
            Add New Staff
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search staff by name, ID, designation, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:bg-gray-800 dark">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Staff ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Designation
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Department
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {staff.staffId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {staff.firstName} {staff.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {staff.designation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {staff.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          staff.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : staff.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/dashboard/staff/${staff.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/staff/${staff.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No staff members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
