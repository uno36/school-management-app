"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams from next/navigation
import Link from "next/link";

// --- Shadcn UI Button component ---
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
// --- End UI Mockup ---

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

export default function FeeDetailsPage() {
  const params = useParams();
  const feeId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [fee, setFee] = useState<FeeStructureDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeeData = () => {
      setLoading(true);
      setError(null);

      if (!feeId) {
        setError(
          "No Fee ID provided in the URL. Expected /financials/fees/[id]"
        );
        setLoading(false);
        return;
      }

      try {
        const foundFee = allMockFeeStructures.find((f) => f.id === feeId);

        if (foundFee) {
          setFee(foundFee);
        } else {
          setError(`Fee structure with ID "${feeId}" not found.`);
        }
      } catch (err) {
        setError("Failed to load fee structure data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeData();
  }, [feeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading fee structure details...
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

  if (!fee) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Fee structure not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Fee Details: {fee.name}
          </h1>
          <Link href={`/dashboard/financials/fees/${fee.id}/edit`}>
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
              Edit Fee
            </Button>
          </Link>
        </div>

        {/* Fee Information */}
        <div className="space-y-4 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Fee Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Fee Name:</strong> {fee.name}
            </p>
            <p>
              <strong className="text-gray-600">Applicable To:</strong>{" "}
              {fee.applicableTo}
            </p>
            <p>
              <strong className="text-gray-600">Amount:</strong> $
              {fee.amount.toLocaleString()}
            </p>
            <p>
              <strong className="text-gray-600">Frequency:</strong>{" "}
              {fee.frequency}
            </p>
            <p>
              <strong className="text-gray-600">Academic Year:</strong>{" "}
              {fee.academicYear}
            </p>
            <p>
              <strong className="text-gray-600">Status:</strong>{" "}
              <span
                className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  fee.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : fee.status === "Archived"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {fee.status}
              </span>
            </p>
            <p className="col-span-full">
              <strong className="text-gray-600">Description:</strong>{" "}
              {fee.description || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
