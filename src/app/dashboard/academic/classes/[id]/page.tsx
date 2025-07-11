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

interface ClassAndSectionDetails {
  id: string;
  className: string;
  sectionName: string;
  homeroomTeacherId: string;
  homeroomTeacherName: string;
  maxStudentCapacity: number;
  currentStudentCount: number;
  academicYear: string;
  subjects: { id: string; name: string; teacher: string }[];
  schedule: { day: string; time: string; subject: string; teacher: string }[];
}

const allMockClassesAndSections: ClassAndSectionDetails[] = [
  {
    id: "C001S01",
    className: "Grade 1",
    sectionName: "A",
    homeroomTeacherId: "T001",
    homeroomTeacherName: "Ms. Emily White",
    maxStudentCapacity: 30,
    currentStudentCount: 25,
    academicYear: "2024-2025",
    subjects: [
      { id: "SUB001", name: "English", teacher: "Ms. Emily White" },
      { id: "SUB002", name: "Mathematics", teacher: "Mr. David Green" },
      { id: "SUB003", name: "Science", teacher: "Ms. Sarah Brown" },
    ],
    schedule: [
      {
        day: "Monday",
        time: "09:00 AM",
        subject: "English",
        teacher: "Ms. Emily White",
      },
      {
        day: "Monday",
        time: "10:00 AM",
        subject: "Mathematics",
        teacher: "Mr. David Green",
      },
      {
        day: "Tuesday",
        time: "09:00 AM",
        subject: "Science",
        teacher: "Ms. Sarah Brown",
      },
    ],
  },
  {
    id: "C001S02",
    className: "Grade 1",
    sectionName: "B",
    homeroomTeacherId: "T002",
    homeroomTeacherName: "Mr. David Green",
    maxStudentCapacity: 30,
    currentStudentCount: 22,
    academicYear: "2024-2025",
    subjects: [
      { id: "SUB001", name: "English", teacher: "Mr. David Green" },
      { id: "SUB002", name: "Mathematics", teacher: "Ms. Emily White" },
    ],
    schedule: [
      {
        day: "Monday",
        time: "09:00 AM",
        subject: "English",
        teacher: "Mr. David Green",
      },
      {
        day: "Tuesday",
        time: "10:00 AM",
        subject: "Mathematics",
        teacher: "Ms. Emily White",
      },
    ],
  },
  {
    id: "C002S01",
    className: "Grade 2",
    sectionName: "A",
    homeroomTeacherId: "T003",
    homeroomTeacherName: "Ms. Sarah Brown",
    maxStudentCapacity: 28,
    currentStudentCount: 28,
    academicYear: "2024-2025",
    subjects: [
      { id: "SUB004", name: "Social Studies", teacher: "Ms. Sarah Brown" },
      { id: "SUB005", name: "Art", teacher: "Ms. Olivia Taylor" },
    ],
    schedule: [
      {
        day: "Wednesday",
        time: "11:00 AM",
        subject: "Social Studies",
        teacher: "Ms. Sarah Brown",
      },
      {
        day: "Thursday",
        time: "01:00 PM",
        subject: "Art",
        teacher: "Ms. Olivia Taylor",
      },
    ],
  },
];

export default function ClassAndSectionDetailsPage() {
  const params = useParams();
  const classSectionId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [classSection, setClassSection] =
    useState<ClassAndSectionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassSectionData = async () => {
      setLoading(true);
      setError(null);

      if (!classSectionId) {
        setError(
          "No Class/Section ID provided in the URL or invalid URL structure."
        );
        setLoading(false);
        return;
      }

      try {
        const foundClassSection = allMockClassesAndSections.find(
          (cs) => cs.id === classSectionId
        );

        if (foundClassSection) {
          setClassSection(foundClassSection);
        } else {
          setError(`Class/Section with ID "${classSectionId}" not found.`);
        }
      } catch (err) {
        setError("Failed to load class/section data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassSectionData();
  }, [classSectionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading class/section details...
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

  if (!classSection) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Class/Section not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Class: {classSection.className} - Section {classSection.sectionName}
          </h1>
          <Link href={`/dashboard/academic/classes/${classSection.id}/edit`}>
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
              Edit Class/Section
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
              <strong className="text-gray-600">Academic Year:</strong>{" "}
              {classSection.academicYear}
            </p>
            <p>
              <strong className="text-gray-600">Homeroom Teacher:</strong>{" "}
              {classSection.homeroomTeacherName}
            </p>
            <p>
              <strong className="text-gray-600">Max Capacity:</strong>{" "}
              {classSection.maxStudentCapacity}
            </p>
            <p>
              <strong className="text-gray-600">Current Students:</strong>{" "}
              {classSection.currentStudentCount}
            </p>
          </div>
        </div>

        {/* Subjects Taught */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Subjects Taught
          </h3>
          {classSection.subjects.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {classSection.subjects.map((subject) => (
                <li key={subject.id} className="text-gray-700">
                  <strong className="font-medium">{subject.name}</strong>{" "}
                  (Taught by: {subject.teacher})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No subjects assigned yet.</p>
          )}
        </div>

        {/* Class Schedule */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Class Schedule
          </h3>
          {classSection.schedule.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teacher
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classSection.schedule.map((slot, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {slot.day}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {slot.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {slot.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {slot.teacher}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No schedule defined yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
