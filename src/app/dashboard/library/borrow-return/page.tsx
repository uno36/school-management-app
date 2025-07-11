"use client";

// frontend/app/(dashboard)/library/borrow-return/page.tsx
import Link from "next/link";
import React, { useState } from "react";

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
// --- End Shadcn UI Component Mockups ---

interface BorrowRecord {
  id: string;
  bookTitle: string;
  bookId: string;
  borrowerName: string;
  borrowerId: string; // Student ID or Staff ID
  borrowerType: "Student" | "Staff";
  borrowDate: string; // YYYY-MM-DD
  returnDate: string | null; // YYYY-MM-DD, null if not returned
  dueDate: string; // YYYY-MM-DD
  status: "Borrowed" | "Returned" | "Overdue" | "Lost";
}

/**
 * BorrowReturnListPage component displays a list of book borrowing and return records.
 * It includes a search bar and buttons to manage borrowing and returns.
 */
export default function BorrowReturnListPage() {
  // Mock data for borrow/return records
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>([
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
      status: "Overdue", // Example: overdue
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
      borrowDate: "2025-05-10",
      returnDate: "2025-05-25",
      dueDate: "2025-05-24", // Example: returned late
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
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = borrowRecords.filter(
    (record) =>
      record.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.borrowerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.borrowDate.includes(searchTerm) ||
      record.dueDate.includes(searchTerm)
  );

  const handleReturn = (id: string) => {
    // In a real application, this would update the backend.
    // For mock, we update the status and returnDate.
    setBorrowRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              status: "Returned",
              returnDate: new Date().toISOString().slice(0, 10),
            }
          : record
      )
    );
    alert("Book marked as returned!");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Borrow & Return Management
        </h1>
        <Link href="/dashboard/library/borrow-return/borrow">
          {" "}
          {/* Link to new borrow form */}
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
            Record New Borrowing
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search by book title, borrower name/ID, or status..."
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
                  Book Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Borrower
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Borrow Date
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
                  Return Date
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
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.bookTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.borrowerName} (
                      {record.borrowerType === "Student" ? "S" : "T"}
                      {record.borrowerId.slice(3)})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.borrowDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.returnDate || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {record.status === "Borrowed" ||
                      record.status === "Overdue" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReturn(record.id)}
                          className="text-green-600 hover:text-green-900 mr-2"
                        >
                          Return
                        </Button>
                      ) : null}
                      <Link
                        href={`/dashboard/library/borrow-return/${record.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/library/borrow-return/${record.id}/edit`}
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
                    No borrowing records found.
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
