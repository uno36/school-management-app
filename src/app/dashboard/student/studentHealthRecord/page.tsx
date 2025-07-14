"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out ${className} dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

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
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
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

// Mock data for health records
const initialMockHealthRecords: HealthRecord[] = [
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
    notes: "Requires inhaler during allergy season. Parents informed.",
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
      "EpiPen stored in nurse's office. All staff trained on anaphylaxis protocol.",
  },
  {
    id: "HR003",
    studentId: "S003",
    studentName: "Charlie Brown",
    dateOfRecord: "2024-09-01",
    medicalConditions: "Eczema",
    allergies: "Dust mites",
    immunizations: "Missing MMR booster, parents notified.",
    doctorName: "Dr. Sarah Lee",
    doctorPhone: "777-888-9999",
    notes: "Skin flare-ups managed with topical cream. Avoid dusty areas.",
  },
  {
    id: "HR004",
    studentId: "S004",
    studentName: "Diana Prince",
    dateOfRecord: "2024-07-20",
    medicalConditions: "None",
    allergies: "None",
    immunizations: "Fully immunized.",
    doctorName: "Dr. David Kim",
    doctorPhone: "123-987-6543",
    notes: "Healthy and active student.",
  },
  {
    id: "HR005",
    studentId: "S005",
    studentName: "Eve Adams",
    dateOfRecord: "2024-09-05",
    medicalConditions: "Seasonal Allergies",
    allergies: "Grass",
    immunizations: "Up-to-date.",
    doctorName: "Dr. Emily White",
    doctorPhone: "111-222-3333",
    notes: "Takes over-the-counter antihistamines as needed.",
  },
];

const StudentHealthRecordListPage: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [records, setRecords] = useState<HealthRecord[]>(
    initialMockHealthRecords
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCondition, setFilterCondition] = useState("All");

  // Extract unique medical conditions and allergies, then combine with 'All' and ensure overall uniqueness
  const medicalConditions = Array.from(
    new Set(
      initialMockHealthRecords
        .map((rec) => rec.medicalConditions.split(", ").map((c) => c.trim()))
        .flat()
    )
  ).filter(Boolean);
  const allergies = Array.from(
    new Set(
      initialMockHealthRecords
        .map((rec) => rec.allergies.split(", ").map((a) => a.trim()))
        .flat()
    )
  ).filter(Boolean);
  const allFilters = Array.from(
    new Set(["All", ...medicalConditions, ...allergies])
  ).filter(Boolean); // Ensure overall uniqueness

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      searchTerm === "" ||
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.medicalConditions
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      record.allergies.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition =
      filterCondition === "All" ||
      record.medicalConditions.includes(filterCondition) ||
      record.allergies.includes(filterCondition);
    return matchesSearch && matchesCondition;
  });

  const handleDeleteRecord = (id: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete health record with ID: ${id}?`
      )
    ) {
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.id !== id)
      );
      alert(`Health record ${id} deleted successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 dark:text-gray-50">
        Student Health Records
      </h1>

      {/* Filters and Actions */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              htmlFor="filter-condition"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
            >
              Filter by Condition/Allergy
            </label>
            <select
              id="filter-condition"
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all duration-200 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              {allFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="search-term"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
            >
              Search
            </label>
            <Input
              id="search-term"
              type="text"
              placeholder="Search by student name, ID, or notes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="/dashboard/student/studentHealthRecord/add">
            <Button variant="default" className="cursor-pointer">
              Add New Record
            </Button>
          </Link>
        </div>
      </section>

      {/* Health Records List Table */}
      <section className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-gray-50">
          Health Records ({filteredRecords.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Record ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Student ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Student Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Medical Conditions
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Allergies
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                      {record.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                      {record.studentId}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                      {record.studentName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 truncate max-w-xs">
                      {record.medicalConditions}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 truncate max-w-xs">
                      {record.allergies}
                    </td>
                    <td className="py-3 px-4 text-sm flex space-x-2">
                      <Link
                        href={`/dashboard/student/studentHealthRecord/${record.id}`}
                      >
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          size="sm"
                        >
                          View
                        </Button>
                      </Link>
                      <Link
                        href={`/dashboard/student/studentHealthRecord${record.id}/edit`}
                      >
                        <Button
                          variant="secondary"
                          className="cursor-pointer"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        className="cursor-pointer"
                        size="sm"
                        onClick={() => handleDeleteRecord(record.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No health records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-4 dark:text-gray-400">
          This table lists student health records.
        </p>
      </section>
    </div>
  );
};

export default StudentHealthRecordListPage;
