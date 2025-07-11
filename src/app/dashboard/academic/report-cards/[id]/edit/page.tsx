"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams

// --- Mock Shadcn UI Component Mockups (Integrated for self-contained execution) ---
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

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  )
);
Label.displayName = "Label";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${className}`}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
// --- End Shadcn UI Component Mockups ---

interface GradeEntry {
  subject: string;
  grade: string;
  comments: string;
}

interface ReportCardDetails {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  academicYear: string;
  term: string;
  generationDate: string; // YYYY-MM-DD
  status: "Generated" | "Published" | "Draft";
  grades: GradeEntry[];
  overallComments: string;
  overallGrade: string;
}

// Mock data for report cards (same as details page)
const allMockReportCards: ReportCardDetails[] = [
  {
    id: "RC001",
    studentId: "STU001",
    studentName: "Alice Johnson",
    className: "Grade 1 A",
    academicYear: "2024-2025",
    term: "Mid-Year",
    generationDate: "2025-01-15",
    status: "Published",
    grades: [
      {
        subject: "English Language Arts",
        grade: "A",
        comments: "Excellent progress in reading.",
      },
      {
        subject: "Mathematics",
        grade: "B+",
        comments: "Strong understanding of basic operations.",
      },
      {
        subject: "Science",
        grade: "A-",
        comments: "Actively participates in experiments.",
      },
      {
        subject: "Social Studies",
        grade: "B",
        comments: "Shows interest in historical events.",
      },
      {
        subject: "Art & Craft",
        grade: "A+",
        comments: "Very creative and imaginative.",
      },
    ],
    overallComments:
      "Alice is a diligent student with a positive attitude. She excels in creative subjects and shows consistent effort across all areas.",
    overallGrade: "A-",
  },
  {
    id: "RC002",
    studentId: "STU002",
    studentName: "Bob Williams",
    className: "Grade 1 A",
    academicYear: "2024-2025",
    term: "Mid-Year",
    generationDate: "2025-01-15",
    status: "Published",
    grades: [
      {
        subject: "English Language Arts",
        grade: "B",
        comments: "Needs to improve writing fluency.",
      },
      {
        subject: "Mathematics",
        grade: "B+",
        comments: "Good grasp of numbers.",
      },
      {
        subject: "Science",
        grade: "C+",
        comments: "Requires more focus during practicals.",
      },
      {
        subject: "Social Studies",
        grade: "B-",
        comments: "Participates well in group discussions.",
      },
      {
        subject: "Art & Craft",
        grade: "B",
        comments: "Shows potential in drawing.",
      },
    ],
    overallComments:
      "Bob is a cooperative student. He is making steady progress but could benefit from extra practice in science and writing.",
    overallGrade: "B+",
  },
  {
    id: "RC003",
    studentId: "STU003",
    studentName: "Charlie Davis",
    className: "Grade 2 A",
    academicYear: "2024-2025",
    term: "Term 1",
    generationDate: "2024-11-20",
    status: "Generated",
    grades: [
      {
        subject: "English Language Arts",
        grade: "A+",
        comments: "Outstanding performance!",
      },
      {
        subject: "Mathematics",
        grade: "A",
        comments: "Consistently solves complex problems.",
      },
      {
        subject: "Science",
        grade: "A",
        comments: "Demonstrates deep understanding of concepts.",
      },
    ],
    overallComments:
      "Charlie is an exceptionally bright and motivated student. His academic achievements are commendable.",
    overallGrade: "A",
  },
  {
    id: "RC004",
    studentId: "STU004",
    studentName: "Diana Miller",
    className: "Grade 3 A",
    academicYear: "2024-2025",
    term: "Mid-Year",
    generationDate: "2025-01-18",
    status: "Draft",
    grades: [
      { subject: "English Language Arts", grade: "N/A", comments: "" },
      { subject: "Mathematics", grade: "N/A", comments: "" },
      { subject: "Science", grade: "N/A", comments: "" },
      { subject: "Social Studies", grade: "N/A", comments: "" },
    ],
    overallComments:
      "Report card is currently in draft mode. Grades and comments are pending finalization.",
    overallGrade: "N/A",
  },
];

// Mock data for dropdowns (students, classes, terms, grades, subjects)
const mockStudents = [
  { id: "STU001", name: "Alice Johnson", class: "Grade 1 A" },
  { id: "STU002", name: "Bob Williams", class: "Grade 1 A" },
  { id: "STU003", name: "Charlie Davis", class: "Grade 2 A" },
  { id: "STU004", name: "Diana Miller", class: "Grade 3 A" },
];

const mockClasses = [
  { id: "C001S01", name: "Grade 1 A" },
  { id: "C001S02", name: "Grade 1 B" },
  { id: "C002S01", name: "Grade 2 A" },
  { id: "C003S01", name: "Grade 3 A" },
];

const mockSubjects = [
  { id: "SUB001", name: "English Language Arts" },
  { id: "SUB002", name: "Mathematics" },
  { id: "SUB003", name: "Science" },
  { id: "SUB004", name: "Social Studies" },
  { id: "SUB005", name: "Art & Craft" },
];

const academicYears = ["2023-2024", "2024-2025", "2025-2026"];
const terms = ["Term 1", "Term 2", "Mid-Year", "Final"];
const gradesOptions = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D",
  "F",
  "Pass",
  "Fail",
  "N/A",
];
const reportCardStatuses = ["Generated", "Published", "Draft"];

export default function ReportCardEditPage() {
  const params = useParams(); // ✅ Use useParams
  const reportCardId = Array.isArray(params.id) ? params.id[0] : params.id; // ✅ Safely extract ID

  console.log("Extracted Report Card ID from useParams:", reportCardId);

  const [formData, setFormData] = useState<ReportCardDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportCardData = async () => {
      setLoading(true);
      setError(null);

      if (!reportCardId) {
        setError("No Report Card ID provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        const foundReportCard = allMockReportCards.find(
          (rc) => rc.id === reportCardId
        );

        if (foundReportCard) {
          setFormData(JSON.parse(JSON.stringify(foundReportCard)));
        } else {
          setError(
            `Report Card with ID "${reportCardId}" not found for editing.`
          );
        }
      } catch (err) {
        setError("Failed to load report card data for editing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportCardData();
  }, [reportCardId]);

  const handleGradeChange = (
    index: number,
    field: keyof GradeEntry,
    value: string
  ) => {
    setFormData((prev) => {
      if (!prev) return null;
      const updatedGrades = [...prev.grades];
      updatedGrades[index] = { ...updatedGrades[index], [field]: value };
      return { ...prev, grades: updatedGrades };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log("Updated Report Card Data:", formData);
      alert("Report Card updated successfully! Check console for data.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading report card data for editing...
        </p>
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

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Report card not found for editing.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Report Card for {formData.studentName}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student and Academic Information (Read-Only) */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Student & Academic Information (Read-Only)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  type="text"
                  value={formData.studentName}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  type="text"
                  value={formData.studentId}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="className">Class</Label>
                <Input
                  id="className"
                  type="text"
                  value={formData.className}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input
                  id="academicYear"
                  type="text"
                  value={formData.academicYear}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="term">Term</Label>
                <Input
                  id="term"
                  type="text"
                  value={formData.term}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="generationDate">Generation Date</Label>
                <Input
                  id="generationDate"
                  type="date"
                  value={formData.generationDate}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                {reportCardStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Subject-wise Grades */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Subject Grades
            </h3>
            {formData.grades.map((entry, index) => (
              <div
                key={index}
                className="p-4 border rounded-md bg-gray-50 space-y-3 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="col-span-full">
                  <Label htmlFor={`subject-${index}`}>Subject</Label>
                  <Input
                    id={`subject-${index}`}
                    type="text"
                    value={entry.subject}
                    readOnly
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor={`grade-${index}`}>Grade</Label>
                  <Select
                    id={`grade-${index}`}
                    value={entry.grade}
                    onChange={(e) =>
                      handleGradeChange(index, "grade", e.target.value)
                    }
                    required
                  >
                    <option value="">Select Grade</option>
                    {gradesOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`comments-${index}`}>Comments</Label>
                  <textarea
                    id={`comments-${index}`}
                    placeholder="Comments for this subject..."
                    value={entry.comments}
                    onChange={(e) =>
                      handleGradeChange(index, "comments", e.target.value)
                    }
                    rows={1}
                    className="flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Overall Comments and Grade */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Overall Performance
            </h3>
            <div>
              <Label htmlFor="overallComments">Overall Comments</Label>
              <textarea
                id="overallComments"
                placeholder="General comments on student's overall performance and behavior."
                value={formData.overallComments}
                onChange={handleChange}
                rows={4}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <Label htmlFor="overallGrade">Overall Grade</Label>
              <Select
                id="overallGrade"
                value={formData.overallGrade}
                onChange={handleChange}
                required
              >
                <option value="">Select Overall Grade</option>
                {gradesOptions.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white mt-6"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
