"use client";

import Image from "next/image";
import React from "react";

// --- Mock Shadcn UI Component Mockups ---
// Duplicated for self-contained execution. In a real project, import these.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 ease-in-out";
    const variantClasses = {
      default: "bg-blue-600 text-white shadow-md hover:bg-blue-700",
      outline:
        "border border-blue-400 bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-sm",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      link: "text-blue-600 underline-offset-4 hover:underline",
      destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md",
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
// --- End Mock Shadcn UI Component Mockups ---

// Define interface for Academic History data
interface StudentAcademicHistoryData {
  studentId: string; // Added studentId for context
  studentName: string; // Added studentName for display
  pastAcademicPerformance: string;
  gradesAndAchievements: string;
  previousSchoolsAttended: string;
}

// Mock data for a student's academic history
const mockAcademicHistory: StudentAcademicHistoryData = {
  studentId: "S001",
  studentName: "Alice Smith",
  pastAcademicPerformance:
    "Consistently high grades in Math and Science. Demonstrated strong analytical skills and problem-solving abilities. Participated actively in class discussions and group projects.",
  gradesAndAchievements:
    'GPA: 3.8/4.0, Honor Roll (2022, 2023), First Place in Regional Science Fair (2023) for "Renewable Energy Solutions", Member of National Honor Society.',
  previousSchoolsAttended:
    "Springfield Elementary (2018-2021), Oakwood Middle School (2021-2023).",
};

interface StudentAcademicHistoryDetailsPageProps {
  studentId?: string; // Simulate ID coming from URL
  onEdit?: (id: string) => void; // Callback to navigate to edit page
  onBack?: () => void; // Callback to navigate back
}

const StudentAcademicHistoryDetailsPage: React.FC<
  StudentAcademicHistoryDetailsPageProps
> = ({
  studentId = "S001", // Default for demonstration
  onEdit,
  onBack,
}) => {
  // In a real app, you would fetch data based on studentId
  // For this example, we'll use mock data.
  const academicHistory =
    studentId === mockAcademicHistory.studentId ? mockAcademicHistory : null;

  if (!academicHistory) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Record Not Found
          </h2>
          <p className="text-gray-700">
            The academic history for student ID &quot;{studentId}&quot; could
            not be found.
          </p>
          {onBack && (
            <Button onClick={onBack} className="mt-6">
              Go Back
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Academic History: {academicHistory.studentName}
          </h1>
          {onEdit && (
            <a
              href={`/dashboard/student/studentAcademicHistory/${academicHistory.studentId}/edit`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                onEdit(academicHistory.studentId); // Use the provided callback
              }}
            >
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
                Edit History
              </Button>
            </a>
          )}
        </div>

        {/* Student Basic Info (Context) */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Image
            width={150}
            height={150}
            src={`https://placehold.co/150x150/87CEEB/FFFFFF?text=${academicHistory.studentName
              .split(" ")[0]
              .charAt(0)}${academicHistory.studentName
              .split(" ")[1]
              .charAt(0)}`}
            alt={`${academicHistory.studentName}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/150x150/cccccc/333333?text=${academicHistory.studentName
                .split(" ")[0]
                .charAt(0)}${academicHistory.studentName
                .split(" ")[1]
                .charAt(0)}`;
            }}
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              {academicHistory.studentName}
            </h2>
            <p className="text-lg text-gray-700">
              Student ID:{" "}
              <span className="font-medium">{academicHistory.studentId}</span>
            </p>
            {/* Add more student details here if available from a joined query */}
            <p className="text-md text-gray-600">
              Current Class: <span className="font-medium">7th Grade A</span>{" "}
              {/* Mocked */}
            </p>
          </div>
        </div>

        {/* Academic History Details */}
        <div className="space-y-6 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Past Academic Performance
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {academicHistory.pastAcademicPerformance || "N/A"}
          </p>
        </div>

        <div className="space-y-6 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Grades and Achievements
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {academicHistory.gradesAndAchievements || "N/A"}
          </p>
        </div>

        <div className="space-y-6 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Previous Schools Attended
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {academicHistory.previousSchoolsAttended || "N/A"}
          </p>
        </div>

        {onBack && (
          <div className="mt-8 text-center">
            <Button onClick={onBack} variant="outline">
              Go Back
            </Button>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-6 text-center">
          This page displays detailed academic history for a specific student.
        </p>
      </div>
    </div>
  );
};

export default StudentAcademicHistoryDetailsPage;
