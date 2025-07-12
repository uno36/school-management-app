"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

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

interface HealthRecordDetails {
  id: string;
  studentId: string;
  studentName: string;
  medicalConditions: string;
  allergies: string;
  immunizations: string;
  doctorName: string;
  doctorPhone: string;
}

const allMockHealthRecords: HealthRecordDetails[] = [
  {
    id: "HR001",
    studentId: "STU001",
    studentName: "Alice Johnson",
    medicalConditions: "None",
    allergies: "Pollen (seasonal)",
    immunizations: "MMR, DTP, Polio (all up to date)",
    doctorName: "Dr. Emily White",
    doctorPhone: "+1-555-111-2222",
  },
  // ... other mock records
];

export default function HealthRecordDetailsPage({ params }: PageProps) {
  const { id: recordId } = params;
  const [record, setRecord] = useState<HealthRecordDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecordData = async () => {
      setLoading(true);
      setError(null);

      try {
        const foundRecord = allMockHealthRecords.find((r) => r.id === recordId);
        if (foundRecord) {
          setRecord(foundRecord);
        } else {
          setError(`Health record with ID "${recordId}" not found.`);
        }
      } catch (err) {
        setError("Failed to load health record data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordData();
  }, [recordId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <p className="text-xl text-gray-600">
            Loading health record details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Record Not Found
          </h2>
          <p className="text-gray-700">
            The health record for student ID &quot;{recordId}&quot; could not be
            found.
          </p>
          <Button className="mt-6" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8">
      <div className="container mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Health Record: {record.studentName}
          </h1>
          <a href={`/student/health-records/${record.id}/edit`}>
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
              Edit Record
            </Button>
          </a>
        </div>

        {/* Student Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Image
            width={150}
            height={150}
            src={`https://placehold.co/150x150/87CEEB/FFFFFF?text=${record.studentName
              .split(" ")[0]
              .charAt(0)}${record.studentName.split(" ")[1].charAt(0)}`}
            alt={`${record.studentName}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/150x150/cccccc/333333?text=${record.studentName
                .split(" ")[0]
                .charAt(0)}${record.studentName.split(" ")[1].charAt(0)}`;
            }}
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              {record.studentName}
            </h2>
            <p className="text-lg text-gray-700">
              Student ID:{" "}
              <span className="font-medium">{record.studentId}</span>
            </p>
            <p className="text-md text-gray-600">
              Health Status:{" "}
              <span className="font-medium">
                {record.medicalConditions === "None"
                  ? "Good"
                  : "Special Conditions"}
              </span>
            </p>
          </div>
        </div>

        {/* Medical Information Sections */}
        <div className="space-y-6 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Medical Conditions
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {record.medicalConditions || "None"}
          </p>
        </div>

        <div className="space-y-6 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Allergies
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {record.allergies || "None"}
          </p>
        </div>

        <div className="space-y-6 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Immunizations
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {record.immunizations || "N/A"}
          </p>
        </div>

        <div className="space-y-6 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Physician Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Doctor's Name:</p>
              <p className="text-gray-800 font-medium">
                {record.doctorName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Contact Number:</p>
              <p className="text-gray-800 font-medium">
                {record.doctorPhone || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={() => window.history.back()} variant="outline">
            Go Back
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-6 text-center">
          This page displays detailed health information for a specific student.
        </p>
      </div>
    </div>
  );
}
