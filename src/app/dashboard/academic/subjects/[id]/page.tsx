// frontend/app/(dashboard)/academic/subjects/[id]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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

interface SubjectDetails {
  id: string;
  name: string;
  code: string;
  description: string;
  assignedClasses: { id: string; name: string; section: string }[];
  assignedTeachers: { id: string; name: string }[];
  creditHours: number;
  syllabusUrl: string;
}

// Mock data for subjects with more details
const allMockSubjectData: SubjectDetails[] = [
  {
    id: "SUB001",
    name: "English Language Arts",
    code: "ELA101",
    description:
      "Focuses on reading comprehension, writing skills, grammar, and literature appreciation.",
    assignedClasses: [
      { id: "C001S01", name: "Grade 1", section: "A" },
      { id: "C001S02", name: "Grade 1", section: "B" },
      { id: "C002S01", name: "Grade 2", section: "A" },
    ],
    assignedTeachers: [
      { id: "T001", name: "Ms. Emily White" },
      { id: "T002", name: "Mr. David Green" },
    ],
    creditHours: 5,
    syllabusUrl: "https://placehold.co/200x100/aabbcc/ffffff?text=ELA+Syllabus",
  },
  {
    id: "SUB002",
    name: "Mathematics",
    code: "MATH101",
    description:
      "Covers fundamental mathematical concepts including arithmetic, algebra, and geometry.",
    assignedClasses: [
      { id: "C001S01", name: "Grade 1", section: "A" },
      { id: "C001S02", name: "Grade 1", section: "B" },
      { id: "C002S01", name: "Grade 2", section: "A" },
      { id: "C003S01", name: "Grade 3", section: "A" },
    ],
    assignedTeachers: [
      { id: "T002", name: "Mr. David Green" },
      { id: "T003", name: "Ms. Sarah Brown" },
    ],
    creditHours: 6,
    syllabusUrl:
      "https://placehold.co/200x100/ccbbaa/ffffff?text=Math+Syllabus",
  },
  {
    id: "SUB003",
    name: "Science",
    code: "SCI101",
    description:
      "Introduces basic scientific principles, observation, and experimentation.",
    assignedClasses: [
      { id: "C001S01", name: "Grade 1", section: "A" },
      { id: "C002S01", name: "Grade 2", section: "A" },
      { id: "C003S01", name: "Grade 3", section: "A" },
    ],
    assignedTeachers: [
      { id: "T003", name: "Ms. Sarah Brown" },
      { id: "T004", name: "Mr. Alex Johnson" },
    ],
    creditHours: 5,
    syllabusUrl:
      "https://placehold.co/200x100/ccddff/ffffff?text=Science+Syllabus",
  },
];

/**
 * SubjectDetailsPage component displays the comprehensive details of a single subject.
 * It dynamically fetches subject data based on the 'id' parameter from the URL.
 */
export default function SubjectDetailsPage() {
  const params = useParams();
  const subjectId = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string);

  const [subject, setSubject] = useState<SubjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjectData = async () => {
      setLoading(true);
      setError(null);

      if (!subjectId) {
        setError(
          "No Subject ID provided in the URL or invalid URL structure. Expected /academic/subjects/[id] or /academic/subjects/[id]/edit"
        );
        setLoading(false);
        return;
      }

      try {
        const foundSubject = allMockSubjectData.find((s) => s.id === subjectId);

        if (foundSubject) {
          setSubject(foundSubject);
        } else {
          setError(`Subject with ID "${subjectId}" not found.`);
        }
      } catch (err) {
        setError("Failed to load subject data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectData();
  }, [subjectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading subject details...</p>
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

  if (!subject) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Subject not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Subject Details: {subject.name} ({subject.code})
          </h1>
          <Link href={`/dashboard/academic/subjects/${subject.id}/edit`}>
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
              Edit Subject
            </Button>
          </Link>
        </div>

        {/* Basic Information */}
        <div className="space-y-4 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Subject Code:</strong>{" "}
              {subject.code}
            </p>
            <p>
              <strong className="text-gray-600">Credit Hours:</strong>{" "}
              {subject.creditHours}
            </p>
            <p className="col-span-full">
              <strong className="text-gray-600">Description:</strong>{" "}
              {subject.description || "N/A"}
            </p>
            <p className="col-span-full">
              <strong className="text-gray-600">Syllabus:</strong>{" "}
              {subject.syllabusUrl ? (
                <a
                  href={subject.syllabusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Syllabus
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>

        {/* Assigned Classes */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Assigned Classes
          </h3>
          {subject.assignedClasses.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {subject.assignedClasses.map((cls) => (
                <li key={cls.id} className="text-gray-700">
                  {cls.name} - Section {cls.section}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No classes assigned to this subject yet.
            </p>
          )}
        </div>

        {/* Assigned Teachers */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Assigned Teachers
          </h3>
          {subject.assignedTeachers.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {subject.assignedTeachers.map((teacher) => (
                <li key={teacher.id} className="text-gray-700">
                  {teacher.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No teachers assigned to this subject yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
