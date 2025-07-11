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

const Select = React.forwardRef<HTMLSelectElement, Select>(
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
  upcomingAssignments: {
    id: string;
    title: string;
    dueDate: string;
    subject: string;
  }[];
  announcements: { id: string; title: string; content: string; date: string }[];
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
    upcomingAssignments: [
      {
        id: "A001",
        title: "Math Worksheet 5",
        dueDate: "2025-07-15",
        subject: "Math",
      },
      {
        id: "A002",
        title: "Science Project Outline",
        dueDate: "2025-07-20",
        subject: "Science",
      },
    ],
    announcements: [
      {
        id: "ANN001",
        title: "Summer Vacation Dates",
        content:
          "School will be closed from August 1st to August 31st for summer vacation.",
        date: "2025-07-01",
      },
      {
        id: "ANN003",
        title: "New Library Hours",
        content:
          "The school library will now be open until 5 PM on weekdays, starting next Monday.",
        date: "2025-07-08",
      },
    ],
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
    upcomingAssignments: [
      {
        id: "A003",
        title: "English Essay Draft",
        dueDate: "2025-07-18",
        subject: "English",
      },
    ],
    announcements: [
      {
        id: "ANN001",
        title: "Summer Vacation Dates",
        content:
          "School will be closed from August 1st to August 31st for summer vacation.",
        date: "2025-07-01",
      },
    ],
  },
];

/**
 * StudentPortalPage component provides a personalized view for students.
 * It includes mock data for their grades, attendance, upcoming assignments, and relevant announcements.
 */
export default function StudentPortalPage() {
  // For demonstration, let's assume a student is logged in with ID 'S001'
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      // In a real application, the student ID would come from authentication context
      const studentId = "S001"; // Example: Alice Smith's ID
      const student = mockStudents.find((s) => s.id === studentId);

      if (student) {
        setCurrentStudent(student);
      } else {
        setError("Student data not found. Please ensure you are logged in.");
      }
    } catch (err) {
      setError("Failed to load student portal data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading student portal...</p>
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

  if (!currentStudent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Student data not available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Student Portal: {currentStudent.name}
        </h1>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
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
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Upcoming Assignments
            </h3>
            {currentStudent.upcomingAssignments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentStudent.upcomingAssignments.map((assignment) => (
                      <tr key={assignment.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {assignment.title}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {assignment.subject}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {assignment.dueDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No upcoming assignments.</p>
            )}
          </div>

          {/* Academic Performance (Grades) */}
          <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Academic Performance
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
              <p className="text-gray-500">No grades available yet.</p>
            )}
          </div>

          {/* Attendance Record */}
          <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Attendance Record (Last 7 Days)
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
              <p className="text-gray-500">No attendance records available.</p>
            )}
          </div>

          {/* Relevant Announcements */}
          <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Relevant Announcements
            </h3>
            {currentStudent.announcements.length > 0 ? (
              currentStudent.announcements.map((announcement) => (
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
                No announcements for you at this time.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
