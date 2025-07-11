"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// --- Shadcn UI Component Mockups ---
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
// --- End Shadcn UI Mockups ---

interface ExpenseDetails {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  paidTo: string;
  status: "Paid" | "Pending" | "Reimbursed";
  notes: string;
}

const allMockExpenses: ExpenseDetails[] = [
  {
    id: "EXP001",
    category: "Utilities",
    description: "Monthly electricity bill for school premises.",
    amount: 1200.5,
    date: "2025-06-28",
    paidTo: "City Power",
    status: "Paid",
    notes: "Payment for June 2025 electricity consumption.",
  },
  {
    id: "EXP002",
    category: "Salaries",
    description: "July staff salaries and benefits.",
    amount: 55000,
    date: "2025-07-01",
    paidTo: "Various Staff",
    status: "Paid",
    notes: "Payroll processed for all teaching and administrative staff.",
  },
  {
    id: "EXP003",
    category: "Supplies",
    description:
      "Bulk purchase of art and craft supplies for Q3 academic activities.",
    amount: 750.25,
    date: "2025-07-05",
    paidTo: "Art Supply Co.",
    status: "Pending",
    notes: "Order placed, awaiting delivery and invoice for payment.",
  },
  {
    id: "EXP004",
    category: "Maintenance",
    description:
      "Emergency plumbing repair in the main administration building restroom.",
    amount: 300,
    date: "2025-06-10",
    paidTo: "Local Plumber",
    status: "Reimbursed",
    notes: "Reimbursement for Mr. Smith, who paid initially out of pocket.",
  },
];

export default function ExpenseDetailsPage() {
  const params = useParams();
  const expenseId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [expense, setExpense] = useState<ExpenseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenseData = () => {
      if (!expenseId) {
        setError("No Expense ID provided in the URL.");
        setLoading(false);
        return;
      }

      const foundExpense = allMockExpenses.find((e) => e.id === expenseId);
      if (foundExpense) {
        setExpense(foundExpense);
      } else {
        setError(`Expense with ID "${expenseId}" not found.`);
      }
      setLoading(false);
    };

    fetchExpenseData();
  }, [expenseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading expense details...</p>
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

  if (!expense) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Expense not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Expense Details: {expense.id}
          </h1>
          <Link href={`/dashboard/financials/expenses/${expense.id}/edit`}>
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
              Edit Expense
            </Button>
          </Link>
        </div>

        <div className="space-y-4 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Expense Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Category:</strong>{" "}
              {expense.category}
            </p>
            <p>
              <strong className="text-gray-600">Amount:</strong> $
              {expense.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            <p>
              <strong className="text-gray-600">Date:</strong> {expense.date}
            </p>
            <p>
              <strong className="text-gray-600">Paid To:</strong>{" "}
              {expense.paidTo}
            </p>
            <p>
              <strong className="text-gray-600">Status:</strong>{" "}
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  expense.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : expense.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {expense.status}
              </span>
            </p>
            <p className="col-span-full">
              <strong className="text-gray-600">Description:</strong>{" "}
              {expense.description}
            </p>
            <p className="col-span-full">
              <strong className="text-gray-600">Notes:</strong> {expense.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
