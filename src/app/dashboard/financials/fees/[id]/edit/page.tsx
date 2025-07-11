"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// --- Shadcn UI Component Mockups ---
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
// --- End UI Mockups ---

interface FeeStructureDetails {
  id: string;
  name: string;
  applicableTo: string;
  amount: number;
  frequency: "Annually" | "Termly" | "Monthly" | "One-time";
  academicYear: string;
  description: string;
  status: "Active" | "Inactive" | "Archived";
}

const allMockFeeStructures: FeeStructureDetails[] = [
  {
    id: "FEE001",
    name: "Annual Tuition Fee",
    applicableTo: "All Students",
    amount: 15000,
    frequency: "Annually",
    academicYear: "2024-2025",
    description:
      "Covers core academic programs, facilities usage, and basic extracurricular activities.",
    status: "Active",
  },
  {
    id: "FEE002",
    name: "Sports Club Fee",
    applicableTo: "Students in Sports Club",
    amount: 500,
    frequency: "One-time",
    academicYear: "2024-2025",
    description:
      "One-time fee for participation in school-organized sports clubs and access to sports equipment.",
    status: "Active",
  },
  {
    id: "FEE003",
    name: "Lab Fee",
    applicableTo: "Grade 9-12 Science Students",
    amount: 250,
    frequency: "Termly",
    academicYear: "2024-2025",
    description:
      "Per-term fee to cover consumables and maintenance for science laboratory sessions.",
    status: "Active",
  },
  {
    id: "FEE004",
    name: "Admission Fee",
    applicableTo: "New Admissions",
    amount: 1000,
    frequency: "One-time",
    academicYear: "2023-2024",
    description:
      "Non-refundable fee for new student admissions, covering administrative costs.",
    status: "Archived",
  },
];

export default function EditFeeForm() {
  const params = useParams();
  const feeId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [formData, setFormData] = useState<FeeStructureDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeeData = () => {
      if (!feeId) {
        setError(
          "No Fee ID provided in the URL. Expected /financials/fees/[id]/edit"
        );
        setLoading(false);
        return;
      }

      const foundFee = allMockFeeStructures.find((f) => f.id === feeId);
      if (foundFee) {
        setFormData({ ...foundFee });
      } else {
        setError(`Fee structure with ID "${feeId}" not found.`);
      }
      setLoading(false);
    };

    fetchFeeData();
  }, [feeId]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log("Updated Fee Structure Data:", formData);
      alert("Fee structure updated successfully!");
    }
  };

  const frequencies = ["Annually", "Termly", "Monthly", "One-time"];
  const currentYear = new Date().getFullYear();
  const academicYears = Array.from(
    { length: 5 },
    (_, i) => `${currentYear + i}-${currentYear + i + 1}`
  );
  const feeStatuses = ["Active", "Inactive", "Archived"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading fee structure data...</p>
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
        <p className="text-xl text-gray-600">Fee structure not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Fee Structure: {formData.name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Fee Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="applicableTo">Applicable To</Label>
            <Input
              id="applicableTo"
              value={formData.applicableTo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                id="frequency"
                value={formData.frequency}
                onChange={handleChange}
              >
                {frequencies.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="academicYear">Academic Year</Label>
            <Select
              id="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
            >
              {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select id="status" value={formData.status} onChange={handleChange}>
              {feeStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter a description" // Added placeholder
              aria-label="Description" // Added aria-label for screen readers
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 text-lg font-semibold mt-6"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
