"use client";

// frontend/app/(dashboard)/library/reports/page.tsx
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

/**
 * LibraryReportsPage component provides options to generate various library reports.
 * This is a placeholder for future report generation functionality.
 */
export default function LibraryReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState<string | null>(
    null
  );
  const [reportData, setReportData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for various report types
  const mockAllBooksReport = [
    {
      id: "B001",
      title: "The Great Adventures",
      author: "A.B. Author",
      status: "Available",
      available: 3,
      total: 5,
    },
    {
      id: "B002",
      title: "Science for Kids",
      author: "Dr. S. Scientist",
      status: "Available",
      available: 8,
      total: 10,
    },
    {
      id: "B003",
      title: "History of the World",
      author: "H. Historian",
      status: "Borrowed",
      available: 0,
      total: 3,
    },
    {
      id: "B004",
      title: "Math Fundamentals",
      author: "M. Mathematician",
      status: "Available",
      available: 7,
      total: 7,
    },
  ];

  const mockBorrowedBooksReport = [
    {
      id: "BR001",
      bookTitle: "The Great Adventures",
      borrower: "Alice Johnson",
      dueDate: "2025-06-15",
      status: "Overdue",
    },
    {
      id: "BR002",
      bookTitle: "Science for Kids",
      borrower: "Ms. Emily White",
      dueDate: "2025-07-05",
      status: "Borrowed",
    },
    {
      id: "BR004",
      bookTitle: "Math Fundamentals",
      borrower: "Charlie Davis",
      dueDate: "2025-07-15",
      status: "Borrowed",
    },
  ];

  const mockOverdueBooksReport = [
    {
      id: "BR001",
      bookTitle: "The Great Adventures",
      borrower: "Alice Johnson",
      dueDate: "2025-06-15",
      daysOverdue: 25,
    },
  ];

  const mockPopularBooksReport = [
    { id: "B002", title: "Science for Kids", borrowCount: 15 },
    { id: "B001", title: "The Great Adventures", borrowCount: 12 },
    { id: "B004", title: "Math Fundamentals", borrowCount: 10 },
  ];

  const generateReport = (reportType: string) => {
    setLoading(true);
    setError(null);
    setSelectedReportType(reportType);
    setReportData(null); // Clear previous data

    // Simulate API call delay
    setTimeout(() => {
      try {
        let data: any[] = [];
        let reportTitle = "";

        switch (reportType) {
          case "all-books":
            data = mockAllBooksReport;
            reportTitle = "All Books in Library";
            break;
          case "borrowed-books":
            data = mockBorrowedBooksReport;
            reportTitle = "Currently Borrowed Books";
            break;
          case "overdue-books":
            data = mockOverdueBooksReport;
            reportTitle = "Overdue Books";
            break;
          case "popular-books":
            data = mockPopularBooksReport;
            reportTitle = "Most Popular Books";
            break;
          default:
            setError("Invalid report type selected.");
            return;
        }
        setReportData(data);
        // In a real app, you might navigate to a dedicated report view page
        // or render the report dynamically here. For now, we'll just display it.
      } catch (err) {
        setError("Failed to generate report.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulate network delay
  };

  const renderReportTable = () => {
    if (!reportData) return null;

    if (reportData.length === 0) {
      return (
        <p className="text-gray-600 text-center py-4">
          No data available for this report type.
        </p>
      );
    }

    switch (selectedReportType) {
      case "all-books":
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available / Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.available} / {book.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "borrowed-books":
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrower
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.bookTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.borrower}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.status === "Borrowed"
                          ? "bg-blue-100 text-blue-800"
                          : record.status === "Overdue"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "overdue-books":
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrower
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Overdue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.bookTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.borrower}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">
                    {record.daysOverdue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "popular-books":
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrow Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.borrowCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Library Reports</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Generate a Report
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button onClick={() => generateReport("all-books")} variant="outline">
            All Books
          </Button>
          <Button
            onClick={() => generateReport("borrowed-books")}
            variant="outline"
          >
            Borrowed Books
          </Button>
          <Button
            onClick={() => generateReport("overdue-books")}
            variant="outline"
          >
            Overdue Books
          </Button>
          <Button
            onClick={() => generateReport("popular-books")}
            variant="outline"
          >
            Popular Books
          </Button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <p className="text-lg text-blue-600">Generating report...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      )}

      {reportData && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 p-6 border-b">
            {selectedReportType === "all-books" && "All Books in Library"}
            {selectedReportType === "borrowed-books" &&
              "Currently Borrowed Books"}
            {selectedReportType === "overdue-books" && "Overdue Books"}
            {selectedReportType === "popular-books" && "Most Popular Books"}
          </h2>
          <div className="overflow-x-auto">{renderReportTable()}</div>
        </div>
      )}
    </div>
  );
}
