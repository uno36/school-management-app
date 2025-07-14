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

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all duration-200 ease-in-out ${className} dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100`}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 opacity-50"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
// --- End Mock Shadcn UI Component Mockups ---

// Mock Link component for navigation (simple anchor tag)
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void; // Allow custom onClick
}

// Define types for academic history record
interface AcademicHistoryRecord {
  id: string;
  studentId: string;
  studentName: string;
  academicYear: string;
  gradesAndAchievements: string;
  pastAcademicPerformance: string;
  previousSchoolsAttended?: string;
}

// Mock data for academic history records
const initialMockAcademicHistoryRecords: AcademicHistoryRecord[] = [
  {
    id: "AH001",
    studentId: "S001",
    studentName: "Alice Smith",
    academicYear: "2023-2024",
    gradesAndAchievements:
      "Achieved A in Math, B in Science. Participated in Debate Club.",
    pastAcademicPerformance:
      "Strong performance in elementary school, consistently above average.",
    previousSchoolsAttended: "Elementary School ABC",
  },
  {
    id: "AH002",
    studentId: "S002",
    studentName: "Bob Johnson",
    academicYear: "2023-2024",
    gradesAndAchievements:
      "Improved grades in English, C in History. Joined Chess Club.",
    pastAcademicPerformance:
      "Struggled with reading in early grades, showed significant improvement in middle school.",
    previousSchoolsAttended: "Primary School XYZ",
  },
  {
    id: "AH003",
    studentId: "S003",
    studentName: "Charlie Brown",
    academicYear: "2022-2023",
    gradesAndAchievements:
      "Excellent in Arts, participated in school play. Maintained B average.",
    pastAcademicPerformance:
      "Consistent academic record, strong in creative subjects.",
    previousSchoolsAttended: "Local Community School",
  },
  {
    id: "AH004",
    studentId: "S001",
    studentName: "Alice Smith",
    academicYear: "2022-2023",
    gradesAndAchievements:
      'Achieved A in all core subjects. Awarded "Student of the Year".',
    pastAcademicPerformance: "Outstanding performance, top of her class.",
    previousSchoolsAttended: "Elementary School ABC",
  },
  {
    id: "AH005",
    studentId: "S004",
    studentName: "Diana Prince",
    academicYear: "2023-2024",
    gradesAndAchievements:
      "Consistent A- grades. Captain of the Basketball team.",
    pastAcademicPerformance:
      "Well-rounded student, strong in both academics and sports.",
    previousSchoolsAttended: "Another High School",
  },
  {
    id: "AH006",
    studentId: "S005",
    studentName: "Eve Adams",
    academicYear: "2023-2024",
    gradesAndAchievements:
      "Good progress in Math, needs improvement in Science.",
    pastAcademicPerformance:
      "Average performance, but shows potential with extra support.",
    previousSchoolsAttended: "Local Middle School",
  },
];

const StudentAcademicHistoryListPage: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [records, setRecords] = useState<AcademicHistoryRecord[]>(
    initialMockAcademicHistoryRecords
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("All");

  const academicYears = Array.from(
    new Set(initialMockAcademicHistoryRecords.map((rec) => rec.academicYear))
  )
    .sort()
    .reverse();

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      searchTerm === "" ||
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.gradesAndAchievements
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      record.pastAcademicPerformance
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesYear =
      filterYear === "All" || record.academicYear === filterYear;
    return matchesSearch && matchesYear;
  });

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/academic/studentAcademicHistory/${id}`);
  };

  const handleDeleteRecord = (id: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete academic history record with ID: ${id}?`
      )
    ) {
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.id !== id)
      );
      alert(`Academic history record ${id} deleted successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 dark:text-gray-50">
        Student Academic History
      </h1>

      {/* Filters and Actions */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              htmlFor="filter-year"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
            >
              Filter by Academic Year
            </label>
            <Select
              id="filter-year"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full"
            >
              <option value="All">All Years</option>
              {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
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
              placeholder="Search by student name, ID, or achievements"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="/dashboard/student/studentAcademicHistory/add">
            <Button variant="default" className="cursor-pointer">
              Add New Record
            </Button>
          </Link>
        </div>
      </section>

      {/* Academic History List Table */}
      <section className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-gray-50">
          Academic Records ({filteredRecords.length})
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
                  Academic Year
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Grades & Achievements
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
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                      {record.academicYear}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 truncate max-w-xs">
                      {record.gradesAndAchievements}
                    </td>
                    <td className="py-3 px-4 text-sm flex space-x-2">
                      <Link
                        href={`/dashboard/student/studentAcademicHistory/${record.id}`}
                      >
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          size="sm"
                          onClick={() => handleViewDetails(record.id)}
                        >
                          View
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
                    No academic history records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-4 dark:text-gray-400">
          This table lists student academic history records.
        </p>
      </section>
    </div>
  );
};

export default StudentAcademicHistoryListPage;
