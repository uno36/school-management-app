"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Add this

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

interface PayrollRecordDetails {
  id: string;
  month: string; // e.g., "July 2025"
  academicYear: string;
  totalAmount: number;
  status: "Generated" | "Paid" | "Pending";
  generationDate: string; // YYYY-MM-DD
  processedBy: string;
  notes: string;
}

// Mock data for payroll records (same as details page)
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

/**
 * EditPayrollPage component allows editing of a payroll record's details.
 * It fetches existing data, pre-populates the form, and handles updates.
 */

export default function EditPayrollPage() {
  const params = useParams(); // ✅ Use Next.js App Router hook
  const payrollId = Array.isArray(params.id) ? params.id[0] : params.id; // ✅ Extract the `[id]` param

  const [formData, setFormData] = useState<PayrollRecordDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayrollData = async () => {
      setLoading(true);
      setError(null);

      if (!payrollId) {
        setError(
          "No Payroll ID provided in the URL or invalid URL structure. Expected /financials/payroll/[id]/edit"
        );
        setLoading(false);
        return;
      }

      try {
        const foundPayroll = allMockPayrollRecords.find(
          (p) => p.id === payrollId
        );

        if (foundPayroll) {
          setFormData(JSON.parse(JSON.stringify(foundPayroll)));
        } else {
          setError(
            `Payroll record with ID "${payrollId}" not found for editing.`
          );
        }
      } catch (err) {
        setError("Failed to load payroll data for editing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollData();
  }, [payrollId]);

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
            [id]: id === "totalAmount" ? parseFloat(value) || 0 : value,
          }
        : null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log("Updated Payroll Data:", formData);
      alert("Payroll updated successfully! Check console for data.");
      // In a real application, you would send this 'formData' object to your backend API for update.
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const academicYears = Array.from(
    { length: 5 },
    (_, i) => `${currentYear + i}-${currentYear + i + 1}`
  );
  const processedByOptions = [
    "Admin Staff A",
    "Admin Staff B",
    "Finance Dept.",
  ];
  const payrollStatuses = ["Generated", "Paid", "Pending"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading payroll data for editing...
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
          Payroll record not found for editing.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Payroll: {formData.month} ({formData.academicYear})
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payroll Period Information - some fields are read-only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="month">Month</Label>
              <Input
                id="month"
                type="text"
                value={formData.month}
                readOnly
                disabled
              />
            </div>
            <div>
              <Label htmlFor="academicYear">Academic Year</Label>
              <Input
                id="academicYear"
                type="text"
                value={formData.academicYear}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalAmount">Total Amount ($)</Label>
              <Input
                id="totalAmount"
                type="number"
                placeholder="e.g., 55000.00"
                value={formData.totalAmount}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <Label htmlFor="generationDate">Generation Date</Label>
              <Input
                id="generationDate"
                type="date"
                value={formData.generationDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="processedBy">Processed By</Label>
            <Select
              id="processedBy"
              value={formData.processedBy}
              onChange={handleChange}
              required
            >
              {processedByOptions.map((processor) => (
                <option key={processor} value={processor}>
                  {processor}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {payrollStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <textarea
              id="notes"
              placeholder="Any specific notes for this payroll run."
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white mt-6"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
