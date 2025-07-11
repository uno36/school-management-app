"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Use useParams for dynamic routing

// --- Shadcn UI Component Mockups (unchanged) ---
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
// --- End UI Mockups ---

interface ExamDetails {
  id: string;
  name: string;
  type: "Mid-Term" | "Final" | "Unit Test" | "Quiz" | "Deadline";
  academicYear: string;
  className: string;
  subject: string;
  date: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  duration: string;
  maxMarks: number;
  instructions: string;
}

const allMockExamData: ExamDetails[] = [
  {
    id: "EXM001",
    name: "English Mid-Term",
    type: "Mid-Term",
    academicYear: "2024-2025",
    className: "Grade 1 A",
    subject: "English Language Arts",
    date: "2025-10-20",
    status: "Scheduled",
    duration: "2 hours",
    maxMarks: 100,
    instructions:
      "Please bring your own stationery. No electronic devices allowed.",
  },
  {
    id: "EXM002",
    name: "Math Final Exam",
    type: "Final",
    academicYear: "2024-2025",
    className: "Grade 2 A",
    subject: "Mathematics",
    date: "2026-02-15",
    status: "Scheduled",
    duration: "2 hours 30 minutes",
    maxMarks: 120,
    instructions:
      "Calculators are allowed. Show all your work for partial credit.",
  },
  {
    id: "EXM003",
    name: "Science Unit 1 Quiz",
    type: "Quiz",
    academicYear: "2024-2025",
    className: "Grade 1 B",
    subject: "Science",
    date: "2025-09-25",
    status: "Completed",
    duration: "30 minutes",
    maxMarks: 50,
    instructions: "Multiple choice questions only.",
  },
  {
    id: "EXM004",
    name: "Social Studies Project Deadline",
    type: "Deadline",
    academicYear: "2024-2025",
    className: "Grade 3 A",
    subject: "Social Studies",
    date: "2025-11-10",
    status: "Scheduled",
    duration: "N/A",
    maxMarks: 100,
    instructions: "Submit your project report by end of day.",
  },
];

// Mock data for dropdowns (classes and subjects)
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
];

export default function ExamEditPage() {
  const { id } = useParams(); // ✅ Replace path logic
  const examId = Array.isArray(id) ? id[0] : id;

  const [formData, setFormData] = useState<ExamDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamData = async () => {
      setLoading(true);
      setError(null);

      if (!examId) {
        setError("No Exam ID provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        const foundExam = allMockExamData.find((e) => e.id === examId);

        if (foundExam) {
          setFormData(JSON.parse(JSON.stringify(foundExam)));
        } else {
          setError(`Exam with ID "${examId}" not found for editing.`);
        }
      } catch (err) {
        setError("Failed to load exam data for editing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [examId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [id]: id === "maxMarks" ? parseInt(value) || 0 : value,
          }
        : null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log("Updated Exam Data:", formData);
      alert("Exam updated successfully! Check console for data.");
    }
  };

  const examTypes = ["Mid-Term", "Final", "Unit Test", "Quiz", "Deadline"];
  const academicYears = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];
  const examStatuses = ["Scheduled", "Completed", "Cancelled"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading exam data for editing...
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
        <p className="text-xl text-gray-600">Exam not found for editing.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Exam: {formData.name}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Exam Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Exam Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., English Mid-Term"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Exam Type</Label>
              <Select
                id="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                {examTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
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
                <option value="">Select Academic Year</option>
                {academicYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="className">Class</Label>
              <Select
                id="className"
                value={formData.className}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                {mockClasses.map((cls) => (
                  <option key={cls.id} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select Subject</option>
                {mockSubjects.map((sub) => (
                  <option key={sub.id} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                type="text"
                placeholder="e.g., 2 hours"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="maxMarks">Max Marks</Label>
              <Input
                id="maxMarks"
                type="number"
                placeholder="e.g., 100"
                value={formData.maxMarks}
                onChange={handleChange}
                min="0"
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
              {examStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="instructions">Instructions (Optional)</Label>
            <textarea
              id="instructions"
              placeholder="Any specific instructions for the exam."
              value={formData.instructions}
              onChange={handleChange}
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white mt-8"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
