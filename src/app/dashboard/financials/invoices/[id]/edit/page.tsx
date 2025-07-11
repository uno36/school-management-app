"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅

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

// --- Mock Data Interface ---
interface FeeInvoice {
  id: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Partially Paid" | "Pending" | "Overdue";
  feeType: string;
  notes?: string;
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
    notes: "Standard tuition fee for Q3.",
  },
  {
    id: "INV002",
    studentName: "Bob Johnson",
    amount: 500.0,
    dueDate: "2025-06-30",
    status: "Paid",
    feeType: "Transport",
    notes: "Bus fee for June.",
  },
  {
    id: "INV003",
    studentName: "Charlie Brown",
    amount: 1200.0,
    dueDate: "2025-07-15",
    status: "Overdue",
    feeType: "Tuition",
    notes: "Overdue tuition for Q3, reminder sent.",
  },
  {
    id: "INV004",
    studentName: "Diana Prince",
    amount: 300.0,
    dueDate: "2025-07-20",
    status: "Pending",
    feeType: "Lab Fee",
    notes: "Science lab usage fee.",
  },
  {
    id: "INV005",
    studentName: "Eve Adams",
    amount: 750.0,
    dueDate: "2025-08-01",
    status: "Pending",
    feeType: "Sports",
    notes: "Annual sports club membership.",
  },
];

/**
 * EditInvoicePage component allows editing of a fee invoice's details.
 * It fetches existing data, pre-populates the form, and handles updates.
 * It extracts the invoice ID from the URL parameters.
 */

export default function EditInvoicePage() {
  const params = useParams(); // ✅
  const invoiceId = Array.isArray(params.id) ? params.id[0] : params.id; // ✅

  const [formData, setFormData] = useState<FeeInvoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!invoiceId || typeof invoiceId !== "string") {
      setLoading(false);
      setError(
        "No Invoice ID found in URL. Expected /dashboard/financials/invoices/[id]/edit"
      );
      return;
    }

    const fetchInvoiceData = async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const foundInvoice = allMockFeeInvoices.find((inv) => inv.id === id);

        if (foundInvoice) {
          setFormData(JSON.parse(JSON.stringify(foundInvoice)));
        } else {
          setError(`Invoice with ID "${id}" not found for editing.`);
        }
      } catch (err) {
        setError("Failed to load invoice data for editing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceData(invoiceId);
  }, [invoiceId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [id]: id === "amount" ? parseFloat(value) || 0 : value,
          }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    setMessage(null);

    if (formData) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Simulating API call to update invoice:", formData);

        setSubmissionStatus("success");
        setMessage("Invoice updated successfully!");
      } catch (error) {
        setSubmissionStatus("error");
        setMessage("Failed to update invoice. Please try again.");
        console.error("Error updating invoice:", error);
      }
    } else {
      setSubmissionStatus("error");
      setMessage("No invoice data to submit.");
    }
  };

  const feeTypes = [
    "Tuition",
    "Transport",
    "Lab Fee",
    "Exam Fee",
    "Library Fee",
  ];
  const invoiceStatuses = ["Paid", "Partially Paid", "Pending", "Overdue"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading invoice data for editing...
        </p>
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

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Invoice record not found for editing.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Invoice: {formData.id}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              type="text"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="feeType">Fee Type</Label>
            <Select
              id="feeType"
              value={formData.feeType}
              onChange={handleChange}
              required
            >
              <option value="">Select Fee Type</option>
              {feeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {invoiceStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <textarea
              id="notes"
              placeholder="Any additional details or remarks about the invoice."
              value={formData.notes || ""}
              onChange={handleChange}
              rows={2}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                submissionStatus === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white mt-6"
            disabled={submissionStatus === "submitting"}
          >
            {submissionStatus === "submitting"
              ? "Saving Changes..."
              : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
