"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

// --- Theme Context Mock ---
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return {
      theme: "light",
      toggleTheme: () =>
        console.warn("toggleTheme called outside ThemeProvider"),
    };
  }
  return context;
};
// --- End Theme Context Mock ---

// --- Mock Shadcn UI Component ---
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
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 ease-in-out";
    const variantClasses = {
      default:
        "bg-blue-600 text-white shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
      outline:
        "border border-blue-400 bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-sm dark:border-blue-600 dark:text-blue-400 dark:hover:bg-gray-700",
      secondary:
        "bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500",
      ghost:
        "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100",
      link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 shadow-md dark:bg-red-700 dark:hover:bg-red-800",
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
  date: string;
  time?: string;
  reason?: string;
  photoUrl?: string;
  admissionNumber?: string;
  statusOverall?: string;
  classAssigned?: string;
  sectionAssigned?: string;
  department?: string;
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

const mockAttendanceRecordDetails: AttendanceRecord = {
  id: "S001",
  name: "Alice Smith",
  type: "student",
  status: "Present",
  date: "2025-07-13",
  time: "08:00 AM",
  reason: "",
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
    {
      incidentDate: new Date("2024-11-05"),
      incidentType: "Uniform Violation",
      description: "Wore non-regulation shoes to school.",
      actionTaken: "Sent home to change, note sent to parents.",
      notes: "Second offense, stricter action next time.",
    },
  ],
  birthCertificateUrl: "https://example.com/birth_certificate_s001.pdf",
  previousSchoolRecordsUrl: "https://example.com/previous_records_s001.pdf",
};

const mockStaffAttendanceRecordDetails: AttendanceRecord = {
  id: "T003",
  name: "Dr. Evans",
  type: "staff",
  status: "Present",
  date: "2025-07-13",
  time: "07:50 AM",
  reason: "",
  photoUrl: "https://placehold.co/150x150/666666/FFFFFF?text=DE",
  department: "Administration",
  firstName: "Dr.",
  lastName: "Evans",
  dateOfBirth: new Date("1975-03-10"),
  gender: "Female",
  email: "drevans@example.com",
  phone: "999-888-7777",
  address: "456 Admin Way, City, Country",
  disciplinaryRecords: [
    {
      incidentDate: new Date("2024-09-10"),
      incidentType: "Policy Breach",
      description: "Accessed unauthorized student records.",
      actionTaken: "Formal warning, mandatory retraining on data privacy.",
      notes: "First and only instance of this type of breach.",
    },
  ],
};

const AttendanceDetailsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [record, setRecord] = useState<AttendanceRecord | null>(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);

      // Select the appropriate record based on the ID parameter
      const selectedRecord =
        resolvedParams.id === "S001"
          ? mockAttendanceRecordDetails
          : resolvedParams.id === "T003"
          ? mockStaffAttendanceRecordDetails
          : null;

      setRecord(selectedRecord);
    };

    getParams();
  }, [params]);

  const handleDeleteClick = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the attendance record for ${record?.name} (${record?.id})?`
      )
    ) {
      // In a real app, you would call an API to delete the record
      alert(`Record ${id} would be deleted here (simulated)`);
      router.push("/dashboard/academic/attendance");
    }
  };

  const handleBackClick = () => {
    router.push("/dashboard/academic/attendance");
  };

  // Loading state while params are being resolved
  if (id === null) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 dark:text-blue-400">
            Loading...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Loading attendance record details.
          </p>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-red-600 mb-4 dark:text-red-400">
            Record Not Found
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            The attendance record with ID "{id}" could not be found.
          </p>
          <Button onClick={handleBackClick} className="mt-6">
            Go Back to Attendance List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">
            Attendance Details for: {record.firstName} {record.lastName}
          </h1>
          <Button variant="destructive" onClick={handleDeleteClick}>
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete Record
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-700">
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
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md dark:border-gray-700"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/150x150/cccccc/333333?text=${record.firstName.charAt(
                0
              )}${record.lastName.charAt(0)}`;
            }}
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
              {record.firstName} {record.lastName}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Record ID: <span className="font-medium">{record.id}</span>
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400">
              Type:{" "}
              <span className="font-medium capitalize">{record.type}</span>
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400">
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
              <p className="text-md text-gray-600 dark:text-gray-400">
                Time: <span className="font-medium">{record.time}</span>
              </p>
            )}
            {record.reason && (
              <p className="text-md text-gray-600 dark:text-gray-400">
                Reason: <span className="font-medium">{record.reason}</span>
              </p>
            )}
            <p className="text-md text-gray-600 dark:text-gray-400">
              Date: <span className="font-medium">{record.date}</span>
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4 dark:text-gray-50 dark:border-gray-600">
            Associated Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {record.type === "student" && (
              <>
                <p className="dark:text-gray-300">
                  <strong className="text-gray-600 dark:text-gray-400">
                    Admission No:
                  </strong>{" "}
                  {record.admissionNumber || "N/A"}
                </p>
                <p className="dark:text-gray-300">
                  <strong className="text-gray-600 dark:text-gray-400">
                    Overall Status:
                  </strong>{" "}
                  <span
                    className={
                      record.statusOverall === "Enrolled"
                        ? "text-green-700"
                        : "text-gray-700"
                    }
                  >
                    {record.statusOverall || "N/A"}
                  </span>
                </p>
                <p className="dark:text-gray-300">
                  <strong className="text-gray-600 dark:text-gray-400">
                    Class:
                  </strong>{" "}
                  {record.classAssigned || "N/A"}
                </p>
                <p className="dark:text-gray-300">
                  <strong className="text-gray-600 dark:text-gray-400">
                    Section:
                  </strong>{" "}
                  {record.sectionAssigned || "N/A"}
                </p>
              </>
            )}
            {record.type === "staff" && (
              <p className="dark:text-gray-300">
                <strong className="text-gray-600 dark:text-gray-400">
                  Department:
                </strong>{" "}
                {record.department || "N/A"}
              </p>
            )}
            <p className="dark:text-gray-300">
              <strong className="text-gray-600 dark:text-gray-400">
                Gender:
              </strong>{" "}
              {record.gender || "N/A"}
            </p>
            <p className="dark:text-gray-300">
              <strong className="text-gray-600 dark:text-gray-400">
                Date of Birth:
              </strong>{" "}
              {record.dateOfBirth?.toDateString() || "N/A"}
            </p>
            <p className="dark:text-gray-300">
              <strong className="text-gray-600 dark:text-gray-400">
                Email:
              </strong>{" "}
              {record.email || "N/A"}
            </p>
            <p className="dark:text-gray-300">
              <strong className="text-gray-600 dark:text-gray-400">
                Phone:
              </strong>{" "}
              {record.phone || "N/A"}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4 dark:text-gray-50 dark:border-gray-600">
            Disciplinary Records
          </h3>
          {record.disciplinaryRecords &&
          record.disciplinaryRecords.length > 0 ? (
            <div className="space-y-4">
              {record.disciplinaryRecords.map((rec, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                >
                  <p className="dark:text-gray-300">
                    <strong>Date:</strong>{" "}
                    {rec.incidentDate?.toDateString() || "N/A"}
                  </p>
                  <p className="dark:text-gray-300">
                    <strong>Type:</strong> {rec.incidentType || "N/A"}
                  </p>
                  <p className="dark:text-gray-300">
                    <strong>Description:</strong> {rec.description || "N/A"}
                  </p>
                  <p className="dark:text-gray-300">
                    <strong>Action Taken:</strong> {rec.actionTaken || "N/A"}
                  </p>
                  <p className="dark:text-gray-300">
                    <strong>Notes:</strong> {rec.notes || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No disciplinary records found.
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleBackClick} variant="outline">
            Back to Attendance List
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetailsPage;
