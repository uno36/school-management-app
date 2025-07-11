"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams from next/navigation

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

// --- Data Definitions ---
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

// --- Main Component ---
export default function EditBorrowRecordPage() {
  const params = useParams(); // ✅ Use Next.js useParams
  const recordId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [formData, setFormData] = useState<BorrowRecordDetails | null>(null);
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
          setFormData(JSON.parse(JSON.stringify(foundRecord)));
        } else {
          setError(
            `Borrow record with ID "${recordId}" not found for editing.`
          );
        }
      } catch (err) {
        setError("Failed to load borrow record data for editing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordData();
  }, [recordId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log("Updated Borrow Record Data:", formData);
      alert("Borrow record updated successfully! Check console for data.");
      // Submit to backend in real app
    }
  };

  const borrowStatuses = ["Borrowed", "Returned", "Overdue", "Lost"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading borrow record data for editing...
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
          Borrow record not found for editing.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Borrow Record: {formData.id}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bookTitle">Book Title</Label>
              <Input
                id="bookTitle"
                type="text"
                value={formData.bookTitle}
                readOnly
                disabled
              />
            </div>
            <div>
              <Label htmlFor="bookId">Book ID</Label>
              <Input
                id="bookId"
                type="text"
                value={formData.bookId}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="borrowerName">Borrower Name</Label>
              <Input
                id="borrowerName"
                type="text"
                value={formData.borrowerName}
                readOnly
                disabled
              />
            </div>
            <div>
              <Label htmlFor="borrowerId">Borrower ID</Label>
              <Input
                id="borrowerId"
                type="text"
                value={formData.borrowerId}
                readOnly
                disabled
              />
            </div>
          </div>

          <div>
            <Label htmlFor="borrowerType">Borrower Type</Label>
            <Input
              id="borrowerType"
              type="text"
              value={formData.borrowerType}
              readOnly
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="borrowDate">Borrow Date</Label>
              <Input
                id="borrowDate"
                type="date"
                value={formData.borrowDate}
                onChange={handleChange}
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
            <Label htmlFor="returnDate">Return Date (Optional)</Label>
            <Input
              id="returnDate"
              type="date"
              value={formData.returnDate || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {borrowStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
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
