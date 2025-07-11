"use client";

import Link from "next/link";
// frontend/app/(dashboard)/academic/exams/[id]/page.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

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
// --- End Shadcn UI Component Mockups ---

interface ExamDetails {
  id: string;
  name: string;
  type: "Mid-Term" | "Final" | "Unit Test" | "Quiz" | "Deadline";
  academicYear: string;
  className: string;
  subject: string;
  date: string; // YYYY-MM-DD
  status: "Scheduled" | "Completed" | "Cancelled";
  duration: string; // e.g., "2 hours", "90 minutes"
  maxMarks: number;
  instructions: string;
  // Potentially add more fields like:
  // examPaperUrl: string;
  // answerKeyUrl: string;
  // resultReleaseDate: string;
}

// Mock data for exams (expanded for details)
const allMockExamData: ExamDetails[] = [
  {
    id: "EXM001",
    name: "English Mid-Term",
    type: "Mid-Term",
    academicYear: "2024-2025",
    className: "Grade 1 A",
    subject: "English Language Arts",
    date: "2025-10-20",
    status: "Scheduled",
    duration: "2 hours",
    maxMarks: 100,
    instructions:
      "Please bring your own stationery. No electronic devices allowed.",
  },
  {
    id: "EXM002",
    name: "Math Final Exam",
    type: "Final",
    academicYear: "2024-2025",
    className: "Grade 2 A",
    subject: "Mathematics",
    date: "2026-02-15",
    status: "Scheduled",
    duration: "2 hours 30 minutes",
    maxMarks: 120,
    instructions:
      "Calculators are allowed. Show all your work for partial credit.",
  },
  {
    id: "EXM003",
    name: "Science Unit 1 Quiz",
    type: "Quiz",
    academicYear: "2024-2025",
    className: "Grade 1 B",
    subject: "Science",
    date: "2025-09-25",
    status: "Completed",
    duration: "30 minutes",
    maxMarks: 50,
    instructions: "Multiple choice questions only.",
  },
  {
    id: "EXM004",
    name: "Social Studies Project Deadline",
    type: "Deadline",
    academicYear: "2024-2025",
    className: "Grade 3 A",
    subject: "Social Studies",
    date: "2025-11-10",
    status: "Scheduled",
    duration: "N/A",
    maxMarks: 100,
    instructions: "Submit your project report by end of day.",
  },
];

/**
 * ExamDetailsPage component displays the comprehensive details of a single exam.
 * It dynamically fetches exam data based on the 'id' parameter from the URL.
 */
export default function ExamDetailsPage() {
  const params = useParams();
  const examId = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string);

  const [exam, setExam] = useState<ExamDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamData = async () => {
      setLoading(true);
      setError(null);

      if (!examId) {
        setError(
          "No Exam ID provided in the URL or invalid URL structure. Expected /academic/exams/[id] or /academic/exams/[id]/edit"
        );
        setLoading(false);
        return;
      }

      try {
        const foundExam = allMockExamData.find((e) => e.id === examId);

        if (foundExam) {
          setExam(foundExam);
        } else {
          setError(`Exam with ID "${examId}" not found.`);
        }
      } catch (err) {
        setError("Failed to load exam data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [examId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading exam details...</p>
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

  if (!exam) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Exam not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Exam Details: {exam.name}
          </h1>
          <Link href={`/dashboard/academic/exams/${exam.id}/edit`}>
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
              Edit Exam
            </Button>
          </Link>
        </div>

        {/* Basic Information */}
        <div className="space-y-4 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Exam Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Exam Type:</strong>{" "}
              <span
                className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  exam.type === "Mid-Term"
                    ? "bg-purple-100 text-purple-800"
                    : exam.type === "Final"
                    ? "bg-green-100 text-green-800"
                    : exam.type === "Unit Test"
                    ? "bg-blue-100 text-blue-800"
                    : exam.type === "Quiz"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {exam.type}
              </span>
            </p>
            <p>
              <strong className="text-gray-600">Academic Year:</strong>{" "}
              {exam.academicYear}
            </p>
            <p>
              <strong className="text-gray-600">Class:</strong> {exam.className}
            </p>
            <p>
              <strong className="text-gray-600">Subject:</strong> {exam.subject}
            </p>
            <p>
              <strong className="text-gray-600">Date:</strong> {exam.date}
            </p>
            <p>
              <strong className="text-gray-600">Status:</strong>{" "}
              <span
                className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  exam.status === "Scheduled"
                    ? "bg-blue-100 text-blue-800"
                    : exam.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {exam.status}
              </span>
            </p>
            <p>
              <strong className="text-gray-600">Duration:</strong>{" "}
              {exam.duration || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Max Marks:</strong>{" "}
              {exam.maxMarks || "N/A"}
            </p>
            <p className="col-span-full">
              <strong className="text-gray-600">Instructions:</strong>{" "}
              {exam.instructions || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
