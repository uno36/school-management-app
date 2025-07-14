"use client";

// import { useRouter } from "next/navigation";
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import Link from "next/link";

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

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface AttendanceRecord {
  id: string;
  name: string;
  type: "student" | "staff";
  status: "Present" | "Absent" | "Late";
  date: string;
  time?: string;
  reason?: string;
}

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const todayDateString = `${year}-${month}-${day}`;

const initialMockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "S001",
    name: "Alice Smith",
    type: "student",
    status: "Present",
    date: todayDateString,
    time: "08:00 AM",
  },
  {
    id: "S002",
    name: "Bob Johnson",
    type: "student",
    status: "Absent",
    date: todayDateString,
    reason: "Sick",
  },
  {
    id: "S003",
    name: "Charlie Brown",
    type: "student",
    status: "Late",
    date: todayDateString,
    time: "08:15 AM",
    reason: "Traffic",
  },
  {
    id: "S005",
    name: "Eve Adams",
    type: "student",
    status: "Present",
    date: todayDateString,
    time: "07:58 AM",
  },
  {
    id: "S006",
    name: "Frank White",
    type: "student",
    status: "Absent",
    date: todayDateString,
    reason: "Family Event",
  },
  {
    id: "S007",
    name: "Grace Taylor",
    type: "student",
    status: "Present",
    date: todayDateString,
    time: "08:02 AM",
  },
  {
    id: "S008",
    name: "Henry Green",
    type: "student",
    status: "Late",
    date: todayDateString,
    time: "08:20 AM",
    reason: "Bus Delay",
  },
  {
    id: "S009",
    name: "Ivy King",
    type: "student",
    status: "Present",
    date: todayDateString,
    time: "07:59 AM",
  },
  {
    id: "S010",
    name: "Jack Lewis",
    type: "student",
    status: "Absent",
    date: todayDateString,
    reason: "Vacation",
  },
  {
    id: "S011",
    name: "Karen Hall",
    type: "student",
    status: "Present",
    date: todayDateString,
    time: "08:01 AM",
  },
  {
    id: "S012",
    name: "Liam Young",
    type: "student",
    status: "Late",
    date: todayDateString,
    time: "08:10 AM",
    reason: "Overslept",
  },
  {
    id: "S017",
    name: "Quinn Davis",
    type: "student",
    status: "Present",
    date: todayDateString,
    time: "07:57 AM",
  },
  {
    id: "S018",
    name: "Rachel Evans",
    type: "student",
    status: "Absent",
    date: todayDateString,
    reason: "Family Emergency",
  },
  {
    id: "S019",
    name: "Sam Foster",
    type: "student",
    status: "Present",
    date: todayDateString,
    time: "08:03 AM",
  },
  {
    id: "S020",
    name: "Tina Green",
    type: "student",
    status: "Late",
    date: todayDateString,
    time: "08:18 AM",
    reason: "Car Trouble",
  },
  {
    id: "S021",
    name: "Umar Khan",
    type: "student",
    status: "Present",
    date: todayDateString,
    time: "07:55 AM",
  },
  {
    id: "S022",
    name: "Victoria Lee",
    type: "student",
    status: "Absent",
    date: todayDateString,
    reason: "Dental Appointment",
  },
  {
    id: "S023",
    name: "Walter Scott",
    type: "student",
    status: "Present",
    date: todayDateString,
    time: "08:00 AM",
  },
  {
    id: "S024",
    name: "Xavier Bell",
    type: "student",
    status: "Present",
    date: todayDateString,
    time: "07:59 AM",
  },
  {
    id: "S025",
    name: "Yara Cruz",
    type: "student",
    status: "Absent",
    date: todayDateString,
    reason: "Personal Day",
  },
  {
    id: "T001",
    name: "Mr. Davis",
    type: "staff",
    status: "Present",
    date: todayDateString,
    time: "07:45 AM",
  },
  {
    id: "T002",
    name: "Ms. Lee",
    type: "staff",
    status: "Absent",
    date: todayDateString,
    reason: "Personal Leave",
  },
  {
    id: "T003",
    name: "Dr. Evans",
    type: "staff",
    status: "Present",
    date: todayDateString,
    time: "07:50 AM",
  },
  {
    id: "T004",
    name: "Mrs. Clark",
    type: "staff",
    status: "Late",
    date: todayDateString,
    time: "08:05 AM",
    reason: "Appointment",
  },
  {
    id: "T005",
    name: "Mr. White",
    type: "staff",
    status: "Present",
    date: todayDateString,
    time: "07:48 AM",
  },
  {
    id: "T006",
    name: "Ms. Brown",
    type: "staff",
    status: "Absent",
    date: todayDateString,
    reason: "Sick Leave",
  },
  {
    id: "T009",
    name: "Ms. Green",
    type: "staff",
    status: "Present",
    date: todayDateString,
    time: "07:52 AM",
  },
  {
    id: "T010",
    name: "Mr. Hall",
    type: "staff",
    status: "Absent",
    date: todayDateString,
    reason: "Conference",
  },
  {
    id: "T011",
    name: "Mr. Jones",
    type: "staff",
    status: "Present",
    date: todayDateString,
    time: "07:42 AM",
  },
  {
    id: "S004",
    name: "Diana Prince",
    type: "student",
    status: "Present",
    date: "2025-07-12",
    time: "07:55 AM",
  },
  {
    id: "S013",
    name: "Mia Scott",
    type: "student",
    status: "Present",
    date: "2025-07-12",
    time: "07:50 AM",
  },
  {
    id: "S014",
    name: "Noah Adams",
    type: "student",
    status: "Absent",
    date: "2025-07-12",
    reason: "Doctor Appointment",
  },
  {
    id: "S015",
    name: "Olivia Baker",
    type: "student",
    status: "Present",
    date: "2025-07-12",
    time: "08:00 AM",
  },
  {
    id: "S016",
    name: "Peter Clark",
    type: "student",
    status: "Late",
    date: "2025-07-12",
    time: "08:05 AM",
    reason: "Traffic",
  },
  {
    id: "T007",
    name: "Mr. Taylor",
    type: "staff",
    status: "Present",
    date: "2025-07-12",
    time: "07:40 AM",
  },
  {
    id: "T008",
    name: "Dr. Moore",
    type: "staff",
    status: "Late",
    date: "2025-07-12",
    time: "08:00 AM",
    reason: "Traffic",
  },
];

const AttendanceListPage: React.FC = () => {
  const { theme } = useTheme();
  const [attendanceRecords] = useState<AttendanceRecord[]>(
    initialMockAttendanceRecords
  );
  const [filterType, setFilterType] = useState<"all" | "student" | "staff">(
    "all"
  );
  const [filterDate, setFilterDate] = useState<string>(todayDateString);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesType = filterType === "all" || record.type === filterType;
    const matchesDate = record.date === filterDate;
    const matchesSearch =
      searchTerm === "" ||
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.reason?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesDate && matchesSearch;
  });

  // const router = useRouter();

  // const handleViewDetails = (id: string) => {
  //   router.push(`/dashboard/academic/attendance/${id}`);
  // };

  const handleDeleteRecord = (id: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the attendance record with ID: ${id}?`
      )
    ) {
      alert(`Attendance record ${id} would be deleted here (simulated)`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 dark:text-gray-50">
        Attendance Records
      </h1>

      <section className="bg-white p-6 rounded-lg shadow-md mb-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              htmlFor="filter-type"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
            >
              Filter by Type
            </label>
            <Select
              id="filter-type"
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as "all" | "student" | "staff")
              }
              className="w-full"
            >
              <option value="all">All</option>
              <option value="student">Students</option>
              <option value="staff">Staff</option>
            </Select>
          </div>
          <div>
            <label
              htmlFor="filter-date"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
            >
              Filter by Date
            </label>
            <Input
              id="filter-date"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="search-term"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
            >
              Search
            </label>
            <Input
              id="search-term"
              type="text"
              placeholder="Search by name, ID, or reason"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="/dashboard/academic/attendance/add">
            <Button variant="default" className="cursor-pointer">
              Add New Record
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-gray-50">
          {filterType === "all"
            ? "All Records"
            : filterType === "student"
            ? "Student Records"
            : "Staff Records"}
          ({filteredRecords.length}) for {filterDate}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Type
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Time
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Reason
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
                      {record.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 capitalize dark:text-gray-200">
                      {record.type}
                    </td>
                    <td
                      className={`py-3 px-4 text-sm font-medium ${
                        record.status === "Present"
                          ? "text-green-600"
                          : record.status === "Absent"
                          ? "text-red-600"
                          : "text-orange-600"
                      }`}
                    >
                      {record.status}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                      {record.time || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                      {record.reason || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm flex space-x-2">
                      <Link
                        href={`/dashboard/academic/attendance/${record.id}`}
                      >
                        <Button variant="outline" size="sm">
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
                    colSpan={7}
                    className="py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No attendance records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-4 dark:text-gray-400">
          This table lists daily attendance records for students and staff.
        </p>
      </section>
    </div>
  );
};

export default AttendanceListPage;
