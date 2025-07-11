"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

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

interface StaffProfileData {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  qualification: string;
  experience: string;
  designation: string;
  department: string;
  joiningDate: Date | null;
  employmentStatus:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Intern"
    | "Active"
    | "On Leave"
    | "Terminated";
  salaryInformation: string;
  bankDetails: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  photoUrl: string;
  resumeUrl: string;
  idProofUrl: string;
}

const allMockStaffData: StaffProfileData[] = [
  {
    id: "S001",
    staffId: "EMP001",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: new Date("1980-05-20"),
    gender: "Male",
    contactNumber: "+1 (111) 222-3333",
    email: "john.doe@school.com",
    address: "123 Teacher Lane, Schoolville, USA",
    qualification: "Master of Education",
    experience: "15",
    designation: "Head Teacher",
    department: "Academics",
    joiningDate: new Date("2008-09-01"),
    employmentStatus: "Full-time",
    salaryInformation: "$75,000/year",
    bankDetails: "Bank of America, Acct: ****1234",
    emergencyContactName: "Jane Doe",
    emergencyContactRelationship: "Spouse",
    emergencyContactPhone: "+1 (111) 222-4444",
    photoUrl: "https://placehold.co/150x150/aabbcc/ffffff?text=John",
    resumeUrl: "https://placehold.co/200x100/aabbcc/ffffff?text=John+Resume",
    idProofUrl: "https://placehold.co/200x100/aabbcc/ffffff?text=John+ID",
  },
  {
    id: "S002",
    staffId: "EMP002",
    firstName: "Jane",
    lastName: "Smith",
    dateOfBirth: new Date("1975-11-10"),
    gender: "Female",
    contactNumber: "+1 (555) 666-7777",
    email: "jane.smith@school.com",
    address: "456 Admin Road, Schoolville, USA",
    qualification: "MBA",
    experience: "20",
    designation: "Administrator",
    department: "Administration",
    joiningDate: new Date("2003-01-15"),
    employmentStatus: "Full-time",
    salaryInformation: "$85,000/year",
    bankDetails: "Wells Fargo, Acct: ****5678",
    emergencyContactName: "Robert Smith",
    emergencyContactRelationship: "Brother",
    emergencyContactPhone: "+1 (555) 666-8888",
    photoUrl: "https://placehold.co/150x150/ccbbaa/ffffff?text=Jane",
    resumeUrl: "https://placehold.co/200x100/ccbbaa/ffffff?text=Jane+Resume",
    idProofUrl: "https://placehold.co/200x100/ccbbaa/ffffff?text=Jane+ID",
  },
  {
    id: "S003",
    staffId: "EMP003",
    firstName: "Peter",
    lastName: "Jones",
    dateOfBirth: new Date("1990-03-01"),
    gender: "Male",
    contactNumber: "+1 (999) 000-1111",
    email: "peter.jones@school.com",
    address: "789 Science St, Schoolville, USA",
    qualification: "PhD in Physics",
    experience: "8",
    designation: "Science Teacher",
    department: "Academics",
    joiningDate: new Date("2015-08-20"),
    employmentStatus: "On Leave",
    salaryInformation: "$60,000/year",
    bankDetails: "Chase Bank, Acct: ****9012",
    emergencyContactName: "Mary Jones",
    emergencyContactRelationship: "Mother",
    emergencyContactPhone: "+1 (999) 000-2222",
    photoUrl: "https://placehold.co/150x150/ccddff/ffffff?text=Peter",
    resumeUrl: "https://placehold.co/200x100/ccddff/ffffff?text=Peter+Resume",
    idProofUrl: "https://placehold.co/200x100/ccddff/ffffff?text=Peter+ID",
  },
];

export default function StaffDetailsPage() {
  const [staffId, setStaffId] = useState<string | undefined>();
  const [staff, setStaff] = useState<StaffProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pathSegments = window.location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    const staffIndex = pathSegments.indexOf("staff");
    if (staffIndex !== -1 && pathSegments.length > staffIndex + 1) {
      const potentialId = pathSegments[staffIndex + 1];
      if (pathSegments[staffIndex + 2] === "edit") {
        setStaffId(potentialId);
      } else {
        setStaffId(potentialId);
      }
    }
  }, []);

  useEffect(() => {
    if (!staffId) return;

    const fetchStaffData = async () => {
      setLoading(true);
      setError(null);
      try {
        const foundStaff = allMockStaffData.find((s) => s.id === staffId);
        if (foundStaff) {
          setStaff(foundStaff);
        } else {
          setError(`Staff member with ID "${staffId}" not found.`);
        }
      } catch (err) {
        setError("Failed to load staff data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [staffId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading staff data...</p>
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

  if (!staff) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Staff member not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Staff Profile: {staff.firstName} {staff.lastName}
          </h1>
          <a href={`/staff/${staff.id}/edit`}>
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

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Image
            width={150}
            height={150}
            src={
              staff.photoUrl ||
              "https://placehold.co/150x150/cccccc/333333?text=No+Photo"
            }
            alt={`${staff.firstName} ${staff.lastName}`}
            className="rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              {staff.firstName} {staff.lastName}
            </h2>
            <p className="text-lg text-gray-700">
              Staff ID: <span className="font-medium">{staff.staffId}</span>
            </p>
            <p className="text-md text-gray-600">
              Designation:{" "}
              <span className="font-medium">{staff.designation}</span>
            </p>
            <p className="text-md text-gray-600">
              Department:{" "}
              <span className="font-medium">{staff.department}</span>
            </p>
            <p className="text-md text-gray-600">
              Status:{" "}
              <span
                className={`font-medium ${
                  staff.employmentStatus === "Active"
                    ? "text-green-700"
                    : "text-gray-700"
                }`}
              >
                {staff.employmentStatus}
              </span>
            </p>
          </div>
        </div>

        {/* You already have the rest of the content for personal info, professional info, financial details, etc. Keep that unchanged */}
      </div>
    </div>
  );
}
