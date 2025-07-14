"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

// --- Mock Shadcn UI Component Mockups (Integrated for self-contained execution) ---
// These are reusable UI components to simulate the look and feel of Shadcn UI.
// They are included directly in this file for a self-contained and runnable example.

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

// Mock Link component for navigation, assuming a Next.js-like environment
// In a real browser environment without Next.js, this would be a simple <a> tag

// --- Mock Data Interface ---
interface FeeInvoice {
  id: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Partially Paid" | "Pending" | "Overdue";
  feeType: string;
  notes: string;
}

// --- Mock Data (Centralized for consistency across components) ---
// In a real application, this would be fetched from a backend API or a global state management.
const allMockFeeInvoices: FeeInvoice[] = [
  {
    id: "INV001",
    studentName: "Alice Smith",
    amount: 1200.0,
    dueDate: "2025-07-15",
    status: "Pending",
    feeType: "Tuition",
    notes: "",
  },
  {
    id: "INV002",
    studentName: "Bob Johnson",
    amount: 500.0,
    dueDate: "2025-06-30",
    status: "Paid",
    feeType: "Transport",
    notes: "",
  },
  {
    id: "INV003",
    studentName: "Charlie Brown",
    amount: 1200.0,
    dueDate: "2025-07-15",
    status: "Overdue",
    feeType: "Tuition",
    notes: "",
  },
  {
    id: "INV004",
    studentName: "Diana Prince",
    amount: 300.0,
    dueDate: "2025-07-20",
    status: "Pending",
    feeType: "Lab Fee",
    notes: "",
  },
  {
    id: "INV005",
    studentName: "Eve Adams",
    amount: 750.0,
    dueDate: "2025-08-01",
    status: "Pending",
    feeType: "Sports",
    notes: "",
  },
];

/**
 * InvoicesListPage component displays a list of all fee invoices,
 * with search functionality and links to generate, view, and edit invoices.
 */
export default function InvoicesListPage() {
  const [invoices, setInvoices] = useState<FeeInvoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching data on component mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, this would be an API call: fetch('/api/invoices')
      setInvoices(allMockFeeInvoices);
    } catch (err) {
      setError("Failed to load invoices.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.feeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading invoices...</p>
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

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Fee Invoices Management
        </h1>
        <Link href="/dashboard/financials/invoices/generate">
          <Button variant="default" className="cursor-pointer">
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
            Generate New Invoice
          </Button>
        </Link>
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search invoices by student name, ID, fee type, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg"
        />
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Invoice ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Student Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fee Type
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
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      $
                      {invoice.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.feeType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : invoice.status === "Overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/dashboard/financials/invoices/${invoice.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/financials/invoices/${invoice.id}/edit`}
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
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No fee invoices found.
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
