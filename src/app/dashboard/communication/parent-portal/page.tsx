"use client";

import React, { useState, useEffect } from "react";

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

// --- Mock Data Interfaces ---
interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  grades: { subject: string; score: number }[];
  attendance: { date: string; status: "Present" | "Absent" | "Late" }[];
  feeStatus: "Paid" | "Pending" | "Overdue";
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  targetAudience: string;
}

// --- Mock Data ---
const mockStudents: Student[] = [
  {
    id: "S001",
    name: "Alice Smith",
    class: "Grade 5",
    section: "A",
    grades: [
      { subject: "Math", score: 85 },
      { subject: "Science", score: 92 },
    ],
    attendance: [
      { date: "2025-07-08", status: "Present" },
      { date: "2025-07-09", status: "Present" },
      { date: "2025-07-10", status: "Late" },
    ],
    feeStatus: "Pending",
  },
  {
    id: "S002",
    name: "Bob Johnson",
    class: "Grade 7",
    section: "B",
    grades: [
      { subject: "English", score: 78 },
      { subject: "History", score: 88 },
    ],
    attendance: [
      { date: "2025-07-08", status: "Present" },
      { date: "2025-07-09", status: "Absent" },
      { date: "2025-07-10", status: "Present" },
    ],
    feeStatus: "Paid",
  },
];

const mockAnnouncements: Announcement[] = [
  {
    id: "ANN001",
    title: "Summer Vacation Dates",
    content:
      "School will be closed from August 1st to August 31st for summer vacation.",
    date: "2025-07-01",
    targetAudience: "All",
  },
  {
    id: "ANN002",
    title: "Parent-Teacher Meeting Reminder",
    content:
      "A reminder that the Parent-Teacher Meeting is scheduled for July 20th.",
    date: "2025-07-05",
    targetAudience: "Parents",
  },
];

/**
 * ParentPortalPage component provides a view for parents to access their child's information.
 * It includes mock data for student grades, attendance, and fee status.
 */
export default function ParentPortalPage() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching parent's children data
    setLoading(true);
    setError(null);
    try {
      // In a real app, this would fetch children associated with the logged-in parent
      if (mockStudents.length > 0) {
        setSelectedStudentId(mockStudents[0].id); // Automatically select the first child
        setCurrentStudent(mockStudents[0]);
      } else {
        setError("No children found associated with this parent account.");
      }
    } catch (err) {
      setError("Failed to load children data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      const student = mockStudents.find((s) => s.id === selectedStudentId);
      setCurrentStudent(student || null);
    } else {
      setCurrentStudent(null);
    }
  }, [selectedStudentId]);

  const handleStudentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudentId(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading parent portal...</p>
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

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Parent Portal</h1>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        {mockStudents.length > 0 && (
          <div className="mb-6">
            <Label htmlFor="child-select">Select Child</Label>
            <Select
              id="child-select"
              value={selectedStudentId || ""}
              onChange={handleStudentSelect}
              className="w-full md:w-1/2"
            >
              {mockStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.class} {student.section})
                </option>
              ))}
            </Select>
          </div>
        )}

        {currentStudent ? (
          <div className="space-y-8">
            {/* Student Basic Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              {/* Placeholder for student photo */}
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold border-4 border-white shadow-md">
                {currentStudent.name.charAt(0)}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {currentStudent.name}
                </h2>
                <p className="text-lg text-gray-700">
                  Class:{" "}
                  <span className="font-medium">
                    {currentStudent.class} {currentStudent.section}
                  </span>
                </p>
                <p className="text-md text-gray-600">
                  Fee Status:{" "}
                  <span
                    className={`font-medium ${
                      currentStudent.feeStatus === "Paid"
                        ? "text-green-700"
                        : currentStudent.feeStatus === "Pending"
                        ? "text-yellow-700"
                        : "text-red-700"
                    }`}
                  >
                    {currentStudent.feeStatus}
                  </span>
                </p>
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                Recent School Announcements
              </h3>
              {mockAnnouncements.length > 0 ? (
                mockAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border border-gray-100 p-3 rounded-md bg-gray-50 shadow-sm"
                  >
                    <h4 className="font-semibold text-md text-gray-900">
                      {announcement.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Date:</span>{" "}
                      {announcement.date}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {announcement.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No recent announcements for parents.
                </p>
              )}
            </div>

            {/* Academic Performance (Grades) */}
            <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                Academic Performance - {currentStudent.name}
              </h3>
              {currentStudent.grades.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentStudent.grades.map((grade, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {grade.subject}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {grade.score}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">
                  No grades available for {currentStudent.name}.
                </p>
              )}
            </div>

            {/* Attendance Record */}
            <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                Attendance Record - {currentStudent.name} (Last 7 Days)
              </h3>
              {currentStudent.attendance.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentStudent.attendance.map((record, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {record.date}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                record.status === "Present"
                                  ? "bg-green-100 text-green-800"
                                  : record.status === "Absent"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">
                  No attendance records available for {currentStudent.name}.
                </p>
              )}
            </div>

            {/* Fee Statement Summary */}
            <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                Fee Statement Summary - {currentStudent.name}
              </h3>
              <p className="text-gray-700">
                Current Fee Status:{" "}
                <span
                  className={`font-semibold ${
                    currentStudent.feeStatus === "Paid"
                      ? "text-green-600"
                      : currentStudent.feeStatus === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {currentStudent.feeStatus}
                </span>
              </p>
              <p className="text-gray-600">
                For detailed fee information, please refer to the Financials
                section or contact the school administration.
              </p>
              <Button variant="default">View Full Fee Statement</Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center text-lg">
            Please select a child to view their portal information.
          </p>
        )}
      </div>
    </div>
  );
}
