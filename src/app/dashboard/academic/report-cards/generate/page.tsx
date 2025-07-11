"use client";

// frontend/app/(dashboard)/academic/report-cards/generate/page.tsx
import React, { useState } from "react";

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

interface ReportCardFormData {
  studentId: string;
  studentName: string;
  className: string;
  academicYear: string;
  term: string;
  grades: GradeEntry[];
  overallComments: string;
  overallGrade: string;
}

// Mock data for dropdowns
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

/**
 * GenerateReportCardForm component for creating new report cards.
 */
export default function GenerateReportCardForm() {
  const [formData, setFormData] = useState<ReportCardFormData>({
    studentId: "",
    studentName: "",
    className: "",
    academicYear: "2024-2025",
    term: "",
    grades: mockSubjects.map((sub) => ({
      subject: sub.name,
      grade: "",
      comments: "",
    })), // Initialize with all subjects
    overallComments: "",
    overallGrade: "",
  });

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStudentId = e.target.value;
    const selectedStudent = mockStudents.find(
      (s) => s.id === selectedStudentId
    );
    setFormData((prev) => ({
      ...prev,
      studentId: selectedStudentId,
      studentName: selectedStudent ? selectedStudent.name : "",
      className: selectedStudent ? selectedStudent.class : "",
    }));
  };

  const handleGradeChange = (
    index: number,
    field: keyof GradeEntry,
    value: string
  ) => {
    setFormData((prev) => {
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
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd generate a unique ID and send this data to the backend.
    const newReportCard = {
      ...formData,
      id: `RC${Math.random().toString(36).substring(2, 8).toUpperCase()}`, // Simple mock ID generation
      generationDate: new Date().toISOString().slice(0, 10), // Current date
      status: "Generated", // Default status
    };
    console.log("New Report Card Data:", newReportCard);
    alert("Report Card generated successfully! Check console for data.");
    // Optionally, clear the form or redirect to the report card list page
    setFormData({
      studentId: "",
      studentName: "",
      className: "",
      academicYear: "2024-2025",
      term: "",
      grades: mockSubjects.map((sub) => ({
        subject: sub.name,
        grade: "",
        comments: "",
      })),
      overallComments: "",
      overallGrade: "",
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Generate New Report Card
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student and Academic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentId">Select Student</Label>
              <Select
                id="studentId"
                value={formData.studentId}
                onChange={handleStudentChange}
                required
              >
                <option value="">Select Student</option>
                {mockStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.id})
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="className">Class (Auto-filled)</Label>
              <Input
                id="className"
                type="text"
                value={formData.className}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="academicYear">Academic Year</Label>
              <Select
                id="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                required
              >
                {academicYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="term">Term</Label>
              <Select
                id="term"
                value={formData.term}
                onChange={handleChange}
                required
              >
                <option value="">Select Term</option>
                {terms.map((term) => (
                  <option key={term} value={term}>
                    {term}
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
            Generate Report Card
          </Button>
        </form>
      </div>
    </div>
  );
}
