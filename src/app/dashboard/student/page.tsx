"use client";

// frontend/app/(dashboard)/student/page.tsx
import React, { useState } from "react";
import Link from "next/link";

// Mock Shadcn UI Button component (assuming it's available or defined elsewhere)
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

// Mock Input component for search
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Define a simplified Student interface for the list view
interface Student {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  classAssigned: string;
  academicYear: string;
  status: string;
}

/**
 * StudentListPage component displays a list of students.
 * In a real application, this data would be fetched from the backend.
 */
export default function StudentListPage() {
  // Mock student data
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      admissionNumber: "ADM001",
      firstName: "Alice",
      lastName: "Smith",
      classAssigned: "Grade 3",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "2",
      admissionNumber: "ADM002",
      firstName: "Bob",
      lastName: "Johnson",
      classAssigned: "Grade 2",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "3",
      admissionNumber: "ADM003",
      firstName: "Charlie",
      lastName: "Brown",
      classAssigned: "Grade 4",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "4",
      admissionNumber: "ADM004",
      firstName: "Diana",
      lastName: "Prince",
      classAssigned: "Grade 3",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "5",
      admissionNumber: "ADM005",
      firstName: "Eve",
      lastName: "Adams",
      classAssigned: "Grade 1",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "6",
      admissionNumber: "ADM006",
      firstName: "Frank",
      lastName: "Miller",
      classAssigned: "Grade 5",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "7",
      admissionNumber: "ADM007",
      firstName: "Grace",
      lastName: "Lee",
      classAssigned: "Grade 2",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "8",
      admissionNumber: "ADM008",
      firstName: "Henry",
      lastName: "Wang",
      classAssigned: "Grade 1",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "9",
      admissionNumber: "ADM009",
      firstName: "Isabella",
      lastName: "Garcia",
      classAssigned: "Grade 3",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "10",
      admissionNumber: "ADM010",
      firstName: "Jack",
      lastName: "Taylor",
      classAssigned: "Grade 4",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "11",
      admissionNumber: "ADM011",
      firstName: "Kara",
      lastName: "Davis",
      classAssigned: "Grade 1",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "12",
      admissionNumber: "ADM012",
      firstName: "Leo",
      lastName: "Wilson",
      classAssigned: "Grade 2",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "13",
      admissionNumber: "ADM013",
      firstName: "Mia",
      lastName: "Moore",
      classAssigned: "Grade 3",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "14",
      admissionNumber: "ADM014",
      firstName: "Nathan",
      lastName: "Thomas",
      classAssigned: "Grade 4",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "15",
      admissionNumber: "ADM015",
      firstName: "Olivia",
      lastName: "Martin",
      classAssigned: "Grade 5",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "16",
      admissionNumber: "ADM016",
      firstName: "Peter",
      lastName: "Jackson",
      classAssigned: "Grade 1",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "17",
      admissionNumber: "ADM017",
      firstName: "Quinn",
      lastName: "White",
      classAssigned: "Grade 2",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "18",
      admissionNumber: "ADM018",
      firstName: "Rachel",
      lastName: "Harris",
      classAssigned: "Grade 3",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "19",
      admissionNumber: "ADM019",
      firstName: "Sam",
      lastName: "Clark",
      classAssigned: "Grade 4",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "20",
      admissionNumber: "ADM020",
      firstName: "Tina",
      lastName: "Lewis",
      classAssigned: "Grade 5",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "21",
      admissionNumber: "ADM021",
      firstName: "Uma",
      lastName: "Walker",
      classAssigned: "Grade 1",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "22",
      admissionNumber: "ADM022",
      firstName: "Victor",
      lastName: "Young",
      classAssigned: "Grade 2",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "23",
      admissionNumber: "ADM023",
      firstName: "Wendy",
      lastName: "Hall",
      classAssigned: "Grade 3",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "24",
      admissionNumber: "ADM024",
      firstName: "Xavier",
      lastName: "Allen",
      classAssigned: "Grade 4",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "25",
      admissionNumber: "ADM025",
      firstName: "Yara",
      lastName: "Scott",
      classAssigned: "Grade 5",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "26",
      admissionNumber: "ADM026",
      firstName: "Zack",
      lastName: "Green",
      classAssigned: "Grade 1",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "27",
      admissionNumber: "ADM027",
      firstName: "Ava",
      lastName: "King",
      classAssigned: "Grade 2",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "28",
      admissionNumber: "ADM028",
      firstName: "Ben",
      lastName: "Wright",
      classAssigned: "Grade 3",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "29",
      admissionNumber: "ADM029",
      firstName: "Clara",
      lastName: "Lopez",
      classAssigned: "Grade 4",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "30",
      admissionNumber: "ADM030",
      firstName: "David",
      lastName: "Hill",
      classAssigned: "Grade 5",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "31",
      admissionNumber: "ADM031",
      firstName: "Elena",
      lastName: "Baker",
      classAssigned: "Grade 1",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "32",
      admissionNumber: "ADM032",
      firstName: "Felix",
      lastName: "Gonzalez",
      classAssigned: "Grade 2",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "33",
      admissionNumber: "ADM033",
      firstName: "Gina",
      lastName: "Nelson",
      classAssigned: "Grade 3",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
    {
      id: "34",
      admissionNumber: "ADM034",
      firstName: "Harry",
      lastName: "Carter",
      classAssigned: "Grade 4",
      academicYear: "2023-2024",
      status: "Alumni",
    },
    {
      id: "35",
      admissionNumber: "ADM035",
      firstName: "Ivy",
      lastName: "Mitchell",
      classAssigned: "Grade 5",
      academicYear: "2024-2025",
      status: "Enrolled",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Student List</h1>
        {/* Updated Button to link to the student enrollment form */}
        <Link href="/dashboard/student/studentRegistrationForm">
          <Button variant="default" className="cursor-pointer">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Student
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search students by name or admission number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Admission No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Class
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Academic Year
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.admissionNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.classAssigned}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.academicYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.status === "Enrolled"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href={`/dashboard/student/${student.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </a>
                      <a
                        href={`/dashboard/student/${student.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
