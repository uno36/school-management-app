"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams
import Link from "next/link";

// --- Shadcn UI Button Mockup ---
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

// --- Mock Borrow Records ---
interface BorrowRecordDetails {
  id: string;
  bookTitle: string;
  bookId: string;
  borrowerName: string;
  borrowerId: string;
  borrowerType: "Student" | "Staff";
  borrowDate: string;
  returnDate: string | null;
  dueDate: string;
  status: "Borrowed" | "Returned" | "Overdue" | "Lost";
}

const allMockBorrowRecords: BorrowRecordDetails[] = [
  {
    id: "BR001",
    bookTitle: "The Great Adventures",
    bookId: "B001",
    borrowerName: "Alice Johnson",
    borrowerId: "STU001",
    borrowerType: "Student",
    borrowDate: "2025-06-01",
    returnDate: null,
    dueDate: "2025-06-15",
    status: "Overdue",
  },
  {
    id: "BR002",
    bookTitle: "Science for Kids",
    bookId: "B002",
    borrowerName: "Ms. Emily White",
    borrowerId: "T001",
    borrowerType: "Staff",
    borrowDate: "2025-06-20",
    returnDate: null,
    dueDate: "2025-07-05",
    status: "Borrowed",
  },
  {
    id: "BR003",
    bookTitle: "History of the World",
    bookId: "B003",
    borrowerName: "Bob Williams",
    borrowerId: "STU002",
    borrowerType: "Student",
    borrowDate: "2025-05-10",
    returnDate: "2025-05-25",
    dueDate: "2025-05-24",
    status: "Returned",
  },
  {
    id: "BR004",
    bookTitle: "Math Fundamentals",
    bookId: "B004",
    borrowerName: "Charlie Davis",
    borrowerId: "STU003",
    borrowerType: "Student",
    borrowDate: "2025-07-01",
    returnDate: null,
    dueDate: "2025-07-15",
    status: "Borrowed",
  },
];

export default function BorrowRecordDetailsPage() {
  const params = useParams();
  const recordId = Array.isArray(params.id) ? params.id[0] : params.id; // ✅ Use `useParams` to get the ID

  const [record, setRecord] = useState<BorrowRecordDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecordData = async () => {
      setLoading(true);
      setError(null);

      if (!recordId) {
        setError("No Borrow Record ID provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        const foundRecord = allMockBorrowRecords.find((r) => r.id === recordId);
        if (foundRecord) {
          setRecord(foundRecord);
        } else {
          setError(`Borrow record with ID "${recordId}" not found.`);
        }
      } catch (err) {
        setError("Failed to load borrow record data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordData();
  }, [recordId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading borrow record details...
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

  if (!record) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Borrow record not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Borrow Record: {record.id}
          </h1>
          <Link href={`/dashboard/library/borrow-return/${record.id}/edit`}>
            <Button variant="outline">
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
              Edit Record
            </Button>
          </Link>
        </div>

        <div className="space-y-4 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Borrowing Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Book Title:</strong>{" "}
              {record.bookTitle}
            </p>
            <p>
              <strong className="text-gray-600">Book ID:</strong>{" "}
              {record.bookId}
            </p>
            <p>
              <strong className="text-gray-600">Borrower Name:</strong>{" "}
              {record.borrowerName}
            </p>
            <p>
              <strong className="text-gray-600">Borrower ID:</strong>{" "}
              {record.borrowerId}
            </p>
            <p>
              <strong className="text-gray-600">Borrower Type:</strong>{" "}
              {record.borrowerType}
            </p>
            <p>
              <strong className="text-gray-600">Borrow Date:</strong>{" "}
              {record.borrowDate}
            </p>
            <p>
              <strong className="text-gray-600">Due Date:</strong>{" "}
              {record.dueDate}
            </p>
            <p>
              <strong className="text-gray-600">Return Date:</strong>{" "}
              {record.returnDate || "Not Returned Yet"}
            </p>
            <p>
              <strong className="text-gray-600">Status:</strong>{" "}
              <span
                className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  record.status === "Borrowed"
                    ? "bg-blue-100 text-blue-800"
                    : record.status === "Returned"
                    ? "bg-green-100 text-green-800"
                    : record.status === "Overdue"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {record.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
