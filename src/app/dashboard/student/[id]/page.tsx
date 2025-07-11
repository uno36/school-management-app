"use client";

import Image from "next/image";
// frontend/app/(dashboard)/student/[id]/page.tsx
import React, { useState, useEffect } from "react";

// --- Mock Shadcn UI Component Mockups (Integrated for self-contained execution) ---
// These are simplified versions to make the code runnable in this environment.
// In a real Next.js project, you would import these from '@/components/ui/...'
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

// Combined interface for a full Student Profile
interface StudentProfileData {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  gender: string;
  bloodGroup: string;
  address: string;
  phone: string;
  email: string;
  // Parent/Guardian Information
  parentFirstName: string;
  parentLastName: string;
  parentRelationship: string;
  parentPhone: string;
  parentEmail: string;
  // Emergency Contact Information
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  // Photo and Document Upload
  studentPhotoUrl: string;
  birthCertificateUrl: string;
  previousSchoolRecordsUrl: string;
  // Enrollment & Class Assignment
  academicYear: string;
  classAssigned: string;
  sectionAssigned: string;
  enrollmentDate: Date | null;
  status: "Enrolled" | "Transferred" | "Withdrawn" | "Alumni";
  // Academic History
  pastAcademicPerformance: string;
  gradesAndAchievements: string;
  previousSchoolsAttended: string;
  // Health & Medical Records
  medicalConditions: string;
  allergies: string;
  immunizations: string;
  doctorName: string;
  doctorPhone: string;
  // Disciplinary Records (array of records)
  disciplinaryRecords: {
    incidentDate: Date | null;
    incidentType: string;
    description: string;
    actionTaken: string;
    notes: string;
  }[];
}

/**
 * StudentDetailsPage component displays the comprehensive profile of a single student.
 * In a real Next.js application, the student ID would be extracted from the URL
 * and used to fetch data from the backend.
 */
export default function StudentDetailsPage() {
  const [student, setStudent] = useState<StudentProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock student ID for demonstration. In a real app, you'd get this from Next.js router.
  const studentId = "1"; // Example: Hardcoding for now, imagine this comes from useRouter().query.id

  useEffect(() => {
    // Simulate fetching data from a backend API
    const fetchStudentData = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real app: const response = await fetch(`/api/students/${studentId}`);
        // For now, use mock data
        const mockData: StudentProfileData = {
          id: "1",
          admissionNumber: "ADM001",
          firstName: "Alice",
          lastName: "Smith",
          dateOfBirth: new Date("2015-03-15"),
          gender: "Female",
          bloodGroup: "A+",
          address: "456 Oak Avenue, Anytown, USA",
          phone: "+1 (555) 111-2222",
          email: "alice.smith@example.com",
          parentFirstName: "David",
          parentLastName: "Smith",
          parentRelationship: "Father",
          parentPhone: "+1 (555) 333-4444",
          parentEmail: "david.smith@example.com",
          emergencyContactName: "Sarah Smith",
          emergencyContactRelationship: "Aunt",
          emergencyContactPhone: "+1 (555) 555-6666",
          studentPhotoUrl:
            "https://placehold.co/150x150/aabbcc/ffffff?text=Student+Photo", // Placeholder image
          birthCertificateUrl:
            "https://placehold.co/200x100/aabbcc/ffffff?text=Birth+Cert", // Placeholder
          previousSchoolRecordsUrl:
            "https://placehold.co/200x100/aabbcc/ffffff?text=School+Records", // Placeholder
          academicYear: "2024-2025",
          classAssigned: "Grade 3",
          sectionAssigned: "B",
          enrollmentDate: new Date("2024-09-01"),
          status: "Enrolled",
          pastAcademicPerformance:
            "Consistent performer, strong in creative writing. Participated in school plays.",
          gradesAndAchievements:
            "Achieved A grades in English and Arts. Won school-wide poetry competition 2023.",
          previousSchoolsAttended:
            "Bright Kids Preschool (2018-2020), Green Valley Primary (2020-2024).",
          medicalConditions: "None known.",
          allergies: "Pollen (seasonal).",
          immunizations: "All standard childhood immunizations up to date.",
          doctorName: "Dr. Jane Foster",
          doctorPhone: "+1 (555) 777-8888",
          disciplinaryRecords: [
            {
              incidentDate: new Date("2024-10-10"),
              incidentType: "Minor Tardiness",
              description: "Late to class twice without valid excuse.",
              actionTaken: "Verbal warning, discussed with homeroom teacher.",
              notes: "Student acknowledged error and committed to punctuality.",
            },
            {
              incidentDate: new Date("2024-11-20"),
              incidentType: "Incomplete Homework",
              description:
                "Failed to submit Math homework for 3 consecutive days.",
              actionTaken: "Parent contacted, student given extension.",
              notes: "Improved submission rate after parent intervention.",
            },
          ],
        };
        setStudent(mockData);
      } catch (err) {
        setError("Failed to load student data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]); // Dependency on studentId

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading student data...</p>
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

  if (!student) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Student not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Student Profile: {student.firstName} {student.lastName}
          </h1>
          <a href={`/student/${student.id}/edit`}>
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
              Edit Profile
            </Button>
          </a>
        </div>

        {/* Student Photo and Basic Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Image
            width={150}
            height={150}
            src={
              student.studentPhotoUrl ||
              "https://placehold.co/150x150/cccccc/333333?text=No+Photo"
            }
            alt={`${student.firstName} ${student.lastName}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-lg text-gray-700">
              Admission No:{" "}
              <span className="font-medium">{student.admissionNumber}</span>
            </p>
            <p className="text-md text-gray-600">
              Status:{" "}
              <span
                className={`font-medium ${
                  student.status === "Enrolled"
                    ? "text-green-700"
                    : "text-gray-700"
                }`}
              >
                {student.status}
              </span>
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Date of Birth:</strong>{" "}
              {student.dateOfBirth?.toDateString() || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Gender:</strong>{" "}
              {student.gender || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Blood Group:</strong>{" "}
              {student.bloodGroup || "N/A"}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Address:</strong>{" "}
              {student.address || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Phone:</strong>{" "}
              {student.phone || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Email:</strong>{" "}
              {student.email || "N/A"}
            </p>
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Parent/Guardian Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Name:</strong>{" "}
              {student.parentFirstName} {student.parentLastName || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Relationship:</strong>{" "}
              {student.parentRelationship || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Phone:</strong>{" "}
              {student.parentPhone || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Email:</strong>{" "}
              {student.parentEmail || "N/A"}
            </p>
          </div>
        </div>

        {/* Emergency Contact Information */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Emergency Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Name:</strong>{" "}
              {student.emergencyContactName || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Relationship:</strong>{" "}
              {student.emergencyContactRelationship || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Phone:</strong>{" "}
              {student.emergencyContactPhone || "N/A"}
            </p>
          </div>
        </div>

        {/* Enrollment & Class Assignment */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Enrollment & Class Assignment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Academic Year:</strong>{" "}
              {student.academicYear || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Class:</strong>{" "}
              {student.classAssigned || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Section:</strong>{" "}
              {student.sectionAssigned || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Enrollment Date:</strong>{" "}
              {student.enrollmentDate?.toDateString() || "N/A"}
            </p>
          </div>
        </div>

        {/* Academic History */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Academic History
          </h3>
          <p>
            <strong className="text-gray-600">Past Performance:</strong>{" "}
            {student.pastAcademicPerformance || "N/A"}
          </p>
          <p>
            <strong className="text-gray-600">Grades & Achievements:</strong>{" "}
            {student.gradesAndAchievements || "N/A"}
          </p>
          <p>
            <strong className="text-gray-600">Previous Schools:</strong>{" "}
            {student.previousSchoolsAttended || "N/A"}
          </p>
        </div>

        {/* Health & Medical Records */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Health & Medical Records
          </h3>
          <p>
            <strong className="text-gray-600">Medical Conditions:</strong>{" "}
            {student.medicalConditions || "N/A"}
          </p>
          <p>
            <strong className="text-gray-600">Allergies:</strong>{" "}
            {student.allergies || "N/A"}
          </p>
          <p>
            <strong className="text-gray-600">Immunizations:</strong>{" "}
            {student.immunizations || "N/A"}
          </p>
          <p>
            <strong className="text-gray-600">Doctor&apos;s Name:</strong>{" "}
            {student.doctorName || "N/A"}
          </p>
          <p>
            <strong className="text-gray-600">Doctor&apos;s Phone:</strong>{" "}
            {student.doctorPhone || "N/A"}
          </p>
        </div>

        {/* Disciplinary Records */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Disciplinary Records
          </h3>
          {student.disciplinaryRecords.length > 0 ? (
            <div className="space-y-4">
              {student.disciplinaryRecords.map((record, index) => (
                <div key={index} className="p-4 border rounded-md bg-gray-50">
                  <p>
                    <strong>Date:</strong>{" "}
                    {record.incidentDate?.toDateString() || "N/A"}
                  </p>
                  <p>
                    <strong>Type:</strong> {record.incidentType || "N/A"}
                  </p>
                  <p>
                    <strong>Description:</strong> {record.description || "N/A"}
                  </p>
                  <p>
                    <strong>Action Taken:</strong> {record.actionTaken || "N/A"}
                  </p>
                  <p>
                    <strong>Notes:</strong> {record.notes || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No disciplinary records found.</p>
          )}
        </div>

        {/* Document Links */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong className="text-gray-600">Birth Certificate:</strong>{" "}
              {student.birthCertificateUrl ? (
                <a
                  href={student.birthCertificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <p>
              <strong className="text-gray-600">
                Previous School Records:
              </strong>{" "}
              {student.previousSchoolRecordsUrl ? (
                <a
                  href={student.previousSchoolRecordsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
