"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// --- Mock Shadcn UI Component Mockups ---
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
// --- End Shadcn UI ---

interface PayrollRecordDetails {
  id: string;
  month: string;
  academicYear: string;
  totalAmount: number;
  status: "Generated" | "Paid" | "Pending";
  generationDate: string;
  processedBy: string;
  notes: string;
}

const allMockPayrollRecords: PayrollRecordDetails[] = [
  {
    id: "PAY001",
    month: "June 2025",
    academicYear: "2024-2025",
    totalAmount: 55000.0,
    status: "Paid",
    generationDate: "2025-06-25",
    processedBy: "Admin Staff A",
    notes: "Standard monthly payroll for June, including all regular staff.",
  },
  {
    id: "PAY002",
    month: "July 2025",
    academicYear: "2024-2025",
    totalAmount: 56200.0,
    status: "Pending",
    generationDate: "2025-07-01",
    processedBy: "Admin Staff B",
    notes:
      "Includes annual increment for select staff members. Awaiting final approval for payment.",
  },
  {
    id: "PAY003",
    month: "May 2025",
    academicYear: "2024-2025",
    totalAmount: 54500.0,
    status: "Paid",
    generationDate: "2025-05-26",
    processedBy: "Admin Staff A",
    notes: "May payroll, no special adjustments.",
  },
];

export default function PayrollDetailsPage() {
  const params = useParams();
  const payrollId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [payroll, setPayroll] = useState<PayrollRecordDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayrollData = async () => {
      setLoading(true);
      setError(null);

      if (!payrollId) {
        setError("No Payroll ID provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        const foundPayroll = allMockPayrollRecords.find(
          (p) => p.id === payrollId
        );
        if (foundPayroll) {
          setPayroll(foundPayroll);
        } else {
          setError(`Payroll record with ID "${payrollId}" not found.`);
        }
      } catch (err) {
        setError("Failed to load payroll data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollData();
  }, [payrollId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading payroll details...</p>
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

  if (!payroll) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Payroll record not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Payroll Details: {payroll.month} ({payroll.academicYear})
          </h1>
          <Link href={`/dashboard/financials/payroll/${payroll.id}/edit`}>
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
              Edit Payroll
            </Button>
          </Link>
        </div>

        <div className="space-y-4 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Payroll Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Payroll ID:</strong>{" "}
              {payroll.id}
            </p>
            <p>
              <strong className="text-gray-600">Month:</strong> {payroll.month}
            </p>
            <p>
              <strong className="text-gray-600">Academic Year:</strong>{" "}
              {payroll.academicYear}
            </p>
            <p>
              <strong className="text-gray-600">Total Amount:</strong> $
              {payroll.totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p>
              <strong className="text-gray-600">Generation Date:</strong>{" "}
              {payroll.generationDate}
            </p>
            <p>
              <strong className="text-gray-600">Processed By:</strong>{" "}
              {payroll.processedBy}
            </p>
            <p>
              <strong className="text-gray-600">Status:</strong>{" "}
              <span
                className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  payroll.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : payroll.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {payroll.status}
              </span>
            </p>
            <p className="col-span-full">
              <strong className="text-gray-600">Notes:</strong>{" "}
              {payroll.notes || "N/A"}
            </p>
          </div>
        </div>

        <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Individual Staff Payments (Mock Data)
          </h3>
          <p className="text-gray-600">
            Detailed breakdown of individual staff salaries, allowances, and
            deductions would be displayed here. This would typically involve
            another table or expandable sections for each staff member.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>John Doe: $3500.00 (Basic: $3000, Allowance: $500)</li>
            <li>Jane Smith: $4200.00 (Basic: $3800, Allowance: $400)</li>
            <li>... and so on for all staff members in this payroll.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
