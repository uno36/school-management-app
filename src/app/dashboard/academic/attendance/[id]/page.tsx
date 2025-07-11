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

// Define types for attendance data, including associated profile details for display
interface DisciplinaryRecord {
  incidentDate?: Date;
  incidentType?: string;
  description?: string;
  actionTaken?: string;
  notes?: string;
}

interface AttendanceRecord {
  id: string;
  name: string;
  type: "student" | "staff";
  status: "Present" | "Absent" | "Late";
  date: string; // Date of the attendance record
  time?: string;
  reason?: string;
  // Associated profile details (mocked for this page, would come from a joined query)
  photoUrl?: string;
  admissionNumber?: string; // For students
  statusOverall?: string; // e.g., "Enrolled" for student, "Active" for staff
  classAssigned?: string; // For students
  sectionAssigned?: string; // For students
  department?: string; // For staff

  // Additional mock profile fields to match the provided format
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: string;
  bloodGroup?: string;
  address?: string;
  phone?: string;
  email?: string;
  parentFirstName?: string;
  parentLastName?: string;
  parentRelationship?: string;
  parentPhone?: string;
  parentEmail?: string;
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  emergencyContactPhone?: string;
  academicYear?: string;
  enrollmentDate?: Date;
  pastAcademicPerformance?: string;
  gradesAndAchievements?: string;
  previousSchoolsAttended?: string;
  medicalConditions?: string;
  allergies?: string;
  immunizations?: string;
  doctorName?: string;
  doctorPhone?: string;
  disciplinaryRecords: DisciplinaryRecord[];
  birthCertificateUrl?: string;
  previousSchoolRecordsUrl?: string;
}

// Mock data for a detailed attendance record, including associated profile details
const mockAttendanceRecordDetails: AttendanceRecord = {
  id: "S001",
  name: "Alice Smith",
  type: "student",
  status: "Present",
  date: "2024-12-07",
  time: "08:00 AM",
  reason: "",
  // Associated profile details for display
  photoUrl: "https://placehold.co/150x150/87CEEB/FFFFFF?text=AS",
  admissionNumber: "ADM-2024-001",
  statusOverall: "Enrolled",
  classAssigned: "7th Grade",
  sectionAssigned: "A",
  firstName: "Alice",
  lastName: "Smith",
  dateOfBirth: new Date("2010-05-15"),
  gender: "Female",
  bloodGroup: "A+",
  address: "123 School Lane, City, Country",
  phone: "123-456-7890",
  email: "alice.s@example.com",
  parentFirstName: "John",
  parentLastName: "Smith",
  parentRelationship: "Father",
  parentPhone: "987-654-3210",
  parentEmail: "john.s@example.com",
  emergencyContactName: "Jane Smith",
  emergencyContactRelationship: "Mother",
  emergencyContactPhone: "555-123-4567",
  academicYear: "2024-2025",
  enrollmentDate: new Date("2024-09-01"),
  pastAcademicPerformance: "Consistently excellent grades in Math and Science.",
  gradesAndAchievements: "Honor Roll (2023), Science Fair Winner (2023)",
  previousSchoolsAttended: "Elementary School ABC",
  medicalConditions: "None",
  allergies: "Pollen",
  immunizations: "Up-to-date",
  doctorName: "Dr. Emily White",
  doctorPhone: "111-222-3333",
  disciplinaryRecords: [
    {
      incidentDate: new Date("2024-10-20"),
      incidentType: "Minor Tardiness",
      description:
        "Arrived 10 minutes late to class without prior notification.",
      actionTaken: "Verbal warning, discussed punctuality.",
      notes: "First offense.",
    },
  ],
  birthCertificateUrl: "https://example.com/birth_certificate_s001.pdf",
  previousSchoolRecordsUrl: "https://example.com/previous_records_s001.pdf",
};

// Another mock record for staff attendance details
const mockStaffAttendanceRecordDetails: AttendanceRecord = {
  id: "T003",
  name: "Dr. Evans",
  type: "staff",
  status: "Absent",
  date: "2024-12-07",
  time: "",
  reason: "Conference",
  // Associated profile details for display
  photoUrl: "https://placehold.co/150x150/666666/FFFFFF?text=DE",
  department: "Administration",
  firstName: "Dr.",
  lastName: "Evans",
  dateOfBirth: new Date("1975-03-10"),
  gender: "Female",
  email: "drevans@example.com",
  phone: "999-888-7777",
  address: "456 Admin Way, City, Country",
  disciplinaryRecords: [], // Staff might have different disciplinary records
};

interface AttendanceDetailsPageProps {
  attendanceId?: string; // Simulate ID coming from URL (e.g., 'S001' or 'T003')
  recordType?: "student" | "staff"; // Simulate type coming from URL or context
  onEdit?: (id: string, type: "student" | "staff") => void; // Callback to navigate to edit page
  onBack?: () => void; // Callback to navigate back
  initialData?: AttendanceRecord;
}

const AttendanceDetailsPage: React.FC<AttendanceDetailsPageProps> = ({
  attendanceId = "S001", // Default for demonstration
  recordType = "student",
  initialData = mockAttendanceRecordDetails, // Default for demonstration, can be 'staff'
  onEdit,
  onBack,
}) => {
  // In a real app, you would fetch data based on attendanceId and recordType
  // For this example, we'll select from mock data based on the provided attendanceId.
  const record =
    attendanceId === "S001"
      ? mockAttendanceRecordDetails
      : attendanceId === "T003"
      ? mockStaffAttendanceRecordDetails
      : null;

  if (!record) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Record Not Found
          </h2>
          <p className="text-gray-700">
            The attendance record with ID &quot;{attendanceId}&quot; could not
            be found.
          </p>
          {onBack && (
            <Button onClick={onBack} className="mt-6">
              Go Back to Attendance List
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
            Attendance Details for: {record.firstName} {record.lastName}
          </h1>
          {onEdit && (
            <a
              href={`/dashboard/academic/attendance/${record.id}/edit`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                onEdit(record.id, record.type); // Use the provided callback
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
                Edit Record
              </Button>
            </a>
          )}
        </div>

        {/* Basic Attendance Information */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Image
            width={150}
            height={150}
            src={
              record.photoUrl ||
              `https://placehold.co/150x150/cccccc/333333?text=${record.firstName.charAt(
                0
              )}${record.lastName.charAt(0)}`
            }
            alt={`${record.firstName} ${record.lastName}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/150x150/cccccc/333333?text=${record.firstName.charAt(
                0
              )}${record.lastName.charAt(0)}`;
            }}
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              {record.firstName} {record.lastName}
            </h2>
            <p className="text-lg text-gray-700">
              Record ID: <span className="font-medium">{record.id}</span>
            </p>
            <p className="text-md text-gray-600">
              Type:{" "}
              <span className="font-medium capitalize">{record.type}</span>
            </p>
            <p className="text-md text-gray-600">
              Status:{" "}
              <span
                className={`font-medium ${
                  record.status === "Present"
                    ? "text-green-700"
                    : record.status === "Absent"
                    ? "text-red-700"
                    : "text-orange-700"
                }`}
              >
                {record.status}
              </span>
            </p>
            {record.time && (
              <p className="text-md text-gray-600">
                Time: <span className="font-medium">{record.time}</span>
              </p>
            )}
            {record.reason && (
              <p className="text-md text-gray-600">
                Reason: <span className="font-medium">{record.reason}</span>
              </p>
            )}
            <p className="text-md text-gray-600">
              Date: <span className="font-medium">{record.date}</span>
            </p>
          </div>
        </div>

        {/* Associated Profile Information (Summary) */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Associated Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {record.type === "student" && (
              <>
                <p>
                  <strong className="text-gray-600">Admission No:</strong>{" "}
                  {record.admissionNumber || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-600">Overall Status:</strong>{" "}
                  <span
                    className={`${
                      record.statusOverall === "Enrolled"
                        ? "text-green-700"
                        : "text-gray-700"
                    }`}
                  >
                    {record.statusOverall || "N/A"}
                  </span>
                </p>
                <p>
                  <strong className="text-gray-600">Class:</strong>{" "}
                  {record.classAssigned || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-600">Section:</strong>{" "}
                  {record.sectionAssigned || "N/A"}
                </p>
              </>
            )}
            {record.type === "staff" && (
              <p>
                <strong className="text-gray-600">Department:</strong>{" "}
                {record.department || "N/A"}
              </p>
            )}
            <p>
              <strong className="text-gray-600">Gender:</strong>{" "}
              {record.gender || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Date of Birth:</strong>{" "}
              {record.dateOfBirth?.toDateString() || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Email:</strong>{" "}
              {record.email || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Phone:</strong>{" "}
              {record.phone || "N/A"}
            </p>
          </div>
        </div>

        {/* Note about full profile */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          This page provides details for a specific attendance record.
          Comprehensive student/staff profile information (including full
          personal, contact, parent, medical, disciplinary, and document
          details) would typically be managed and viewed on a dedicated profile
          page (e.g., `/dashboard/students/[id]`).
        </p>

        {/* Placeholder sections from the original student profile format */}
        {/* These sections are included to match the requested format but contain N/A as they are not core to an attendance record */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Personal Information (Full Profile)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Date of Birth:</strong>{" "}
              {record.dateOfBirth?.toDateString() || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Gender:</strong>{" "}
              {record.gender || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Blood Group:</strong>{" "}
              {record.bloodGroup || "N/A"}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Contact Information (Full Profile)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Address:</strong>{" "}
              {record.address || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Phone:</strong>{" "}
              {record.phone || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Email:</strong>{" "}
              {record.email || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetailsPage;
