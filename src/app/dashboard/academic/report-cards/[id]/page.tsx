"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams
import Link from "next/link";

// --- Shadcn UI Button Component ---
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
// --- End UI Button ---

interface GradeEntry {
  subject: string;
  grade: string;
  comments: string;
}

interface ReportCardDetails {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  academicYear: string;
  term: string;
  generationDate: string;
  status: "Generated" | "Published" | "Draft";
  grades: GradeEntry[];
  overallComments: string;
  overallGrade: string;
}

// Mock data
const allMockReportCards: ReportCardDetails[] = [
  {
    id: "RC001",
    studentId: "STU001",
    studentName: "Alice Johnson",
    className: "Grade 1 A",
    academicYear: "2024-2025",
    term: "Mid-Year",
    generationDate: "2025-01-15",
    status: "Published",
    grades: [
      {
        subject: "English Language Arts",
        grade: "A",
        comments: "Excellent progress in reading.",
      },
      {
        subject: "Mathematics",
        grade: "B+",
        comments: "Strong understanding of basic operations.",
      },
      {
        subject: "Science",
        grade: "A-",
        comments: "Actively participates in experiments.",
      },
      {
        subject: "Social Studies",
        grade: "B",
        comments: "Shows interest in historical events.",
      },
      {
        subject: "Art & Craft",
        grade: "A+",
        comments: "Very creative and imaginative.",
      },
    ],
    overallComments:
      "Alice is a diligent student with a positive attitude. She excels in creative subjects and shows consistent effort across all areas.",
    overallGrade: "A-",
  },
  {
    id: "RC002",
    studentId: "STU002",
    studentName: "Bob Williams",
    className: "Grade 1 A",
    academicYear: "2024-2025",
    term: "Mid-Year",
    generationDate: "2025-01-15",
    status: "Published",
    grades: [
      {
        subject: "English Language Arts",
        grade: "B",
        comments: "Needs to improve writing fluency.",
      },
      {
        subject: "Mathematics",
        grade: "B+",
        comments: "Good grasp of numbers.",
      },
      {
        subject: "Science",
        grade: "C+",
        comments: "Requires more focus during practicals.",
      },
      {
        subject: "Social Studies",
        grade: "B-",
        comments: "Participates well in group discussions.",
      },
      {
        subject: "Art & Craft",
        grade: "B",
        comments: "Shows potential in drawing.",
      },
    ],
    overallComments:
      "Bob is a cooperative student. He is making steady progress but could benefit from extra practice in science and writing.",
    overallGrade: "B+",
  },
  {
    id: "RC003",
    studentId: "STU003",
    studentName: "Charlie Davis",
    className: "Grade 2 A",
    academicYear: "2024-2025",
    term: "Term 1",
    generationDate: "2024-11-20",
    status: "Generated",
    grades: [
      {
        subject: "English Language Arts",
        grade: "A+",
        comments: "Outstanding performance!",
      },
      {
        subject: "Mathematics",
        grade: "A",
        comments: "Consistently solves complex problems.",
      },
      {
        subject: "Science",
        grade: "A",
        comments: "Demonstrates deep understanding of concepts.",
      },
    ],
    overallComments:
      "Charlie is an exceptionally bright and motivated student. His academic achievements are commendable.",
    overallGrade: "A",
  },
  {
    id: "RC004",
    studentId: "STU004",
    studentName: "Diana Miller",
    className: "Grade 3 A",
    academicYear: "2024-2025",
    term: "Mid-Year",
    generationDate: "2025-01-18",
    status: "Draft",
    grades: [
      { subject: "English Language Arts", grade: "N/A", comments: "" },
      { subject: "Mathematics", grade: "N/A", comments: "" },
      { subject: "Science", grade: "N/A", comments: "" },
      { subject: "Social Studies", grade: "N/A", comments: "" },
    ],
    overallComments:
      "Report card is currently in draft mode. Grades and comments are pending finalization.",
    overallGrade: "N/A",
  },
];

export default function ReportCardDetailsPage() {
  const { id } = useParams(); // ✅ Use useParams
  const reportCardId = Array.isArray(id) ? id[0] : id;

  const [reportCard, setReportCard] = useState<ReportCardDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportCardData = async () => {
      setLoading(true);
      setError(null);

      if (!reportCardId) {
        setError("No Report Card ID provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        const foundReportCard = allMockReportCards.find(
          (rc) => rc.id === reportCardId
        );

        if (foundReportCard) {
          setReportCard(foundReportCard);
        } else {
          setError(`Report Card with ID "${reportCardId}" not found.`);
        }
      } catch (err) {
        setError("Failed to load report card data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportCardData();
  }, [reportCardId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading report card details...</p>
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

  if (!reportCard) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Report card not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Report Card for {reportCard.studentName}
          </h1>
          <Link href={`/dashboard/academic/report-cards/${reportCard.id}/edit`}>
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
              Edit Report Card
            </Button>
          </Link>
        </div>

        {/* Student and Academic Information */}
        <div className="space-y-4 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Student & Academic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Student Name:</strong>{" "}
              {reportCard.studentName}
            </p>
            <p>
              <strong className="text-gray-600">Student ID:</strong>{" "}
              {reportCard.studentId}
            </p>
            <p>
              <strong className="text-gray-600">Class:</strong>{" "}
              {reportCard.className}
            </p>
            <p>
              <strong className="text-gray-600">Academic Year:</strong>{" "}
              {reportCard.academicYear}
            </p>
            <p>
              <strong className="text-gray-600">Term:</strong> {reportCard.term}
            </p>
            <p>
              <strong className="text-gray-600">Generation Date:</strong>{" "}
              {reportCard.generationDate}
            </p>
            <p>
              <strong className="text-gray-600">Status:</strong>{" "}
              <span
                className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  reportCard.status === "Published"
                    ? "bg-green-100 text-green-800"
                    : reportCard.status === "Generated"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {reportCard.status}
              </span>
            </p>
          </div>
        </div>

        {/* Subject-wise Grades */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Subject Grades
          </h3>
          {reportCard.grades.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportCard.grades.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entry.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {entry.grade}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {entry.comments || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
              No grades available for this report card.
            </p>
          )}
        </div>

        {/* Overall Performance */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Overall Performance
          </h3>
          <p>
            <strong className="text-gray-600">Overall Grade:</strong>{" "}
            <span className="text-lg font-bold text-blue-700">
              {reportCard.overallGrade}
            </span>
          </p>
          <p>
            <strong className="text-gray-600">Overall Comments:</strong>{" "}
            {reportCard.overallComments || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
