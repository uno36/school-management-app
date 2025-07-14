"use client";

import Link from "next/link";
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// --- Theme Context Mock (Embedded for self-contained execution) ---
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

// --- Mock Shadcn UI Component Mockups ---
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
// --- End Mock Shadcn UI Component Mockups ---

// Mock Link component for navigation (simple anchor tag)
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void; // Allow custom onClick
}



// Define types for health record
interface HealthRecord {
  id: string;
  studentId: string;
  studentName: string;
  dateOfRecord: string; // YYYY-MM-DD
  medicalConditions: string;
  allergies: string;
  immunizations: string;
  doctorName?: string;
  doctorPhone?: string;
  notes?: string;
}

// Mock data for health records (subset for details page)
const mockHealthRecords: HealthRecord[] = [
  {
    id: "HR001",
    studentId: "S001",
    studentName: "Alice Smith",
    dateOfRecord: "2024-09-10",
    medicalConditions: "Asthma (mild)",
    allergies: "Pollen",
    immunizations: "All standard childhood immunizations up-to-date.",
    doctorName: "Dr. Emily White",
    doctorPhone: "111-222-3333",
    notes:
      "Requires inhaler during allergy season. Parents informed about emergency plan.",
  },
  {
    id: "HR002",
    studentId: "S002",
    studentName: "Bob Johnson",
    dateOfRecord: "2024-08-15",
    medicalConditions: "None",
    allergies: "Peanuts (severe)",
    immunizations: "Up-to-date, including flu shot.",
    doctorName: "Dr. Alex Green",
    doctorPhone: "444-555-6666",
    notes:
      "EpiPen stored in nurse's office. All staff trained on anaphylaxis protocol and food cross-contamination prevention.",
  },
  {
    id: "HR003",
    studentId: "S003",
    studentName: "Charlie Brown",
    dateOfRecord: "2024-09-01",
    medicalConditions: "Eczema",
    allergies: "Dust mites",
    immunizations:
      "Missing MMR booster, parents notified and follow-up scheduled for next month.",
    doctorName: "Dr. Sarah Lee",
    doctorPhone: "777-888-9999",
    notes:
      "Skin flare-ups managed with prescribed topical cream. Avoid dusty areas and ensure proper ventilation in classroom.",
  },
];

interface StudentHealthRecordDetailsPageProps {
  recordId?: string; // Simulate ID coming from URL (e.g., 'HR001')
  onEdit?: (id: string) => void; // Callback to navigate to edit page
  onBack?: () => void; // Callback to navigate back
}

const StudentHealthRecordDetailsPage: React.FC<
  StudentHealthRecordDetailsPageProps
> = ({
  recordId = "HR001", // Default for demonstration
  onEdit,
  onBack,
}) => {
  const { theme } = useTheme();

  // In a real app, you would fetch data based on recordId
  const record = mockHealthRecords.find((rec) => rec.id === recordId);

  if (!record) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-red-600 mb-4 dark:text-red-400">
            Record Not Found
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            The health record with ID "{recordId}" could not be found.
          </p>
          {onBack && (
            <Button onClick={onBack} className="mt-6">
              Go Back to Health Records List
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">
            Health Record Details: {record.id}
          </h1>
          <div className="flex space-x-3">
            {/* Edit Button */}
            {onEdit && ( // Conditionally render if onEdit prop is provided
              <Link href={`/dashboard/student/studentHealthRecord/${record.id}/edit`}>
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
              </Link>
            )}
            {onBack && (
              <Button variant="secondary" onClick={onBack}>
                Go Back
              </Button>
            )}
          </div>
        </div>

        {/* Health Record Information */}
        <div className="space-y-6 p-6 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-700 text-gray-800 dark:text-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-700 dark:text-gray-300">
                Student ID:
              </strong>{" "}
              {record.studentId}
            </p>
            <p>
              <strong className="text-gray-700 dark:text-gray-300">
                Student Name:
              </strong>{" "}
              {record.studentName}
            </p>
            <p>
              <strong className="text-gray-700 dark:text-gray-300">
                Date of Record:
              </strong>{" "}
              {record.dateOfRecord}
            </p>
          </div>

          <div>
            <strong className="text-gray-700 dark:text-gray-300 block mb-2">
              Medical Conditions:
            </strong>
            <p className="p-3 bg-white rounded-md shadow-sm border border-gray-100 dark:bg-gray-700 dark:border-gray-600">
              {record.medicalConditions || "None"}
            </p>
          </div>

          <div>
            <strong className="text-gray-700 dark:text-gray-300 block mb-2">
              Allergies:
            </strong>
            <p className="p-3 bg-white rounded-md shadow-sm border border-gray-100 dark:bg-gray-700 dark:border-gray-600">
              {record.allergies || "None"}
            </p>
          </div>

          <div>
            <strong className="text-gray-700 dark:text-gray-300 block mb-2">
              Immunizations:
            </strong>
            <p className="p-3 bg-white rounded-md shadow-sm border border-gray-100 dark:bg-gray-700 dark:border-gray-600">
              {record.immunizations || "N/A"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p>
              <strong className="text-gray-700 dark:text-gray-300">
                Doctor's Name:
              </strong>{" "}
              {record.doctorName || "N/A"}
            </p>
            <p>
              <strong className="text-gray-700 dark:text-gray-300">
                Doctor's Phone:
              </strong>{" "}
              {record.doctorPhone || "N/A"}
            </p>
          </div>

          <div>
            <strong className="text-gray-700 dark:text-gray-300 block mb-2">
              Additional Notes:
            </strong>
            <p className="p-3 bg-white rounded-md shadow-sm border border-gray-100 dark:bg-gray-700 dark:border-gray-600">
              {record.notes || "No additional notes."}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center dark:text-gray-400">
          This page displays detailed health information for a student.
        </p>
      </div>
    </div>
  );
};

export default StudentHealthRecordDetailsPage;
