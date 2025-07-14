"use client";
import Image from "next/image";
import Link from "next/link";
// frontend/app/(dashboard)/staff/[id]/page.tsx
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

// Combined interface for a full Staff Profile
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
  experience: string; // Years of experience
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
    | "Terminated"
    | "Resigned";
  salaryInformation: string;
  bankDetails: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  photoUrl: string;
  resumeUrl: string;
  idProofUrl: string;
}

// Larger mock dataset for multiple staff members
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
    employmentStatus: "On Leave", // Example of status
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

/**
 * StaffDetailsPage component displays the comprehensive profile of a single staff member.
 * It dynamically fetches staff data based on the 'id' parameter from the URL.
 */
export default function StaffDetailsPage() {
  // Extract staffId from window.location.pathname for dynamic routing in this environment
  const pathSegments = window.location.pathname
    .split("/")
    .filter((segment) => segment !== ""); // Filter out empty strings
  let staffId: string | undefined;

  // Find the segment after 'staff' which should be the ID
  const staffIndex = pathSegments.indexOf("staff");
  if (staffIndex !== -1 && pathSegments.length > staffIndex + 1) {
    staffId = pathSegments[staffIndex + 1];
    // If the next segment is 'edit', then the ID is the one before 'edit'
    if (staffId === "edit" && pathSegments.length > staffIndex + 2) {
      staffId = pathSegments[staffIndex + 1]; // This was corrected to pathSegments[staffIndex + 1] in the previous turn, but should be current index
    }
  }

  // Corrected logic to get the ID from the URL for /staff/[id] or /staff/[id]/edit
  // Example: /staff/S001 -> ['staff', 'S001'] -> staffId = 'S001'
  // Example: /staff/S001/edit -> ['staff', 'S001', 'edit'] -> staffId = 'S001'
  if (pathSegments[staffIndex + 1] && pathSegments[staffIndex + 1] !== "edit") {
    staffId = pathSegments[staffIndex + 1];
  } else if (
    pathSegments[staffIndex + 2] &&
    pathSegments[staffIndex + 2] !== "edit"
  ) {
    staffId = pathSegments[staffIndex + 2]; // This handles /staff/edit/S001 if the structure was different, but for /staff/S001/edit, it's still pathSegments[staffIndex + 1]
  }

  // The most reliable way for /staff/[id] and /staff/[id]/edit
  // Find the last segment that is not 'edit'
  const lastSegment = pathSegments[pathSegments.length - 1];
  if (lastSegment && lastSegment !== "edit") {
    staffId = lastSegment;
  } else if (
    pathSegments.length >= 2 &&
    pathSegments[pathSegments.length - 2] !== "staff"
  ) {
    // This covers /staff/ID/edit where ID is the second to last segment
    staffId = pathSegments[pathSegments.length - 2];
  } else {
    staffId = undefined; // No valid ID found
  }

  const [staff, setStaff] = useState<StaffProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaffData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate fetching data from a backend API based on staffId
        const foundStaff = allMockStaffData.find((s) => s.id === staffId);

        if (foundStaff) {
          setStaff(foundStaff);
        } else {
          setError(`Staff member with ID ${staffId} not found.`);
        }
      } catch (err) {
        setError("Failed to load staff data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [staffId]); // Dependency on staffId to re-fetch if ID changes

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
          <Link href={`/staff/${staff.id}/edit`}>
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
          </Link>
        </div>

        {/* Staff Photo and Basic Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Image
            width={150}
            height={150}
            src={
              staff.photoUrl ||
              "https://placehold.co/150x150/cccccc/333333?text=No+Photo"
            }
            alt={`${staff.firstName} ${staff.lastName}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
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

        {/* Personal Information */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Date of Birth:</strong>{" "}
              {staff.dateOfBirth?.toDateString() || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Gender:</strong>{" "}
              {staff.gender || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Contact Number:</strong>{" "}
              {staff.contactNumber || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Email:</strong>{" "}
              {staff.email || "N/A"}
            </p>
            <p className="col-span-full">
              <strong className="text-gray-600">Address:</strong>{" "}
              {staff.address || "N/A"}
            </p>
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Professional Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Qualification:</strong>{" "}
              {staff.qualification || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Experience:</strong>{" "}
              {staff.experience ? `${staff.experience} Years` : "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Joining Date:</strong>{" "}
              {staff.joiningDate?.toDateString() || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Employment Status:</strong>{" "}
              {staff.employmentStatus || "N/A"}
            </p>
          </div>
        </div>

        {/* Financial & Bank Details */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Financial & Bank Details
          </h3>
          <p>
            <strong className="text-gray-600">Salary Information:</strong>{" "}
            {staff.salaryInformation || "N/A"}
          </p>
          <p>
            <strong className="text-gray-600">Bank Details:</strong>{" "}
            {staff.bankDetails || "N/A"}
          </p>
        </div>

        {/* Emergency Contact Information */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Emergency Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-600">Name:</strong>{" "}
              {staff.emergencyContactName || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Relationship:</strong>{" "}
              {staff.emergencyContactRelationship || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Phone:</strong>{" "}
              {staff.emergencyContactPhone || "N/A"}
            </p>
          </div>
        </div>

        {/* Document Links */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong className="text-gray-600">Resume/CV:</strong>{" "}
              {staff.resumeUrl ? (
                <a
                  href={staff.resumeUrl}
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
              <strong className="text-gray-600">ID Proof:</strong>{" "}
              {staff.idProofUrl ? (
                <a
                  href={staff.idProofUrl}
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
