"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams
import Link from "next/link";

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

// Mock Link component for navigation

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

// --- Mock Data (Centralized for consistency) ---
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
 * InvoiceDetailsPage component displays the detailed information for a single fee invoice.
 * It extracts the invoice ID from the URL parameters.
 */

export default function InvoiceDetailsPage() {
  const params = useParams(); // ✅ Get dynamic route params
  const invoiceId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [invoice, setInvoice] = useState<FeeInvoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoiceDetails = async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
        const foundInvoice = allMockFeeInvoices.find((inv) => inv.id === id);

        if (foundInvoice) {
          setInvoice(foundInvoice);
        } else {
          setError(`Invoice with ID "${id}" not found.`);
        }
      } catch (err) {
        setError("Failed to load invoice details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (invoiceId) {
      fetchInvoiceDetails(invoiceId);
    } else {
      setLoading(false);
      setError(
        "No Invoice ID provided in the URL. Expected /dashboard/finances/invoices/[id]"
      );
    }
  }, [invoiceId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading invoice details...</p>
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

  if (!invoice) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Invoice not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Invoice Details: {invoice.id}
          </h1>
          <Link href={`/dashboard/financials/invoices/${invoice.id}/edit`}>
            <Button variant="outline" className="cursor-pointer">
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Invoice
            </Button>
          </Link>
        </div>

        {/* Invoice Summary */}
        <div className="space-y-4 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Invoice Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Invoice ID:</strong>{" "}
              {invoice.id}
            </p>
            <p>
              <strong className="text-gray-600">Student Name:</strong>{" "}
              {invoice.studentName}
            </p>
            <p>
              <strong className="text-gray-600">Amount:</strong> $
              {invoice.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p>
              <strong className="text-gray-600">Due Date:</strong>{" "}
              {invoice.dueDate}
            </p>
            <p>
              <strong className="text-gray-600">Fee Type:</strong>{" "}
              {invoice.feeType}
            </p>
            <p>
              <strong className="text-gray-600">Status:</strong>{" "}
              <span
                className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
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
            </p>
            <p className="col-span-full">
              <strong className="text-gray-600">Notes:</strong>{" "}
              {invoice.notes || "N/A"}
            </p>
          </div>
        </div>

        {/* Payment History (Mock Data) */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Payment History (Mock Data)
          </h3>
          <p className="text-gray-600">
            This section would display a detailed history of payments made for
            this invoice, including payment dates, amounts, and methods.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>2025-06-10: $500.00 (Online Transfer)</li>
            <li>2025-05-20: $300.00 (Cash)</li>
          </ul>
        </div>

        {/* Related Documents (Mock Data) */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Related Documents (Mock Data)
          </h3>
          <p className="text-gray-600">
            Links to receipts or other relevant documents for this invoice would
            be listed here.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Receipt INV001-P1.pdf
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
