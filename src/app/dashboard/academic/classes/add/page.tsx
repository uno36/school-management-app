"use client";

// frontend/app/(dashboard)/academic/classes/add/page.tsx
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

interface ClassAndSectionFormData {
  className: string;
  sectionName: string;
  homeroomTeacherId: string; // Will store ID of the teacher
  maxStudentCapacity: number;
  academicYear: string;
}

// Mock data for teachers to be used in the homeroom teacher dropdown
const mockTeachers = [
  { id: "T001", name: "Ms. Emily White" },
  { id: "T002", name: "Mr. David Green" },
  { id: "T003", name: "Ms. Sarah Brown" },
  { id: "T004", name: "Mr. Alex Johnson" },
  { id: "T005", name: "Ms. Olivia Taylor" },
  { id: "T006", name: "Mr. Chris Lee" },
];

/**
 * AddClassAndSectionForm component for adding new classes and sections.
 */
export default function AddClassAndSectionForm() {
  const [formData, setFormData] = useState<ClassAndSectionFormData>({
    className: "",
    sectionName: "",
    homeroomTeacherId: "",
    maxStudentCapacity: 30,
    academicYear: "2024-2025", // Default to current academic year
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "maxStudentCapacity" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd generate a unique ID and send this data to the backend.
    const newClassSection = {
      ...formData,
      id: `C${Math.random().toString(36).substring(2, 8).toUpperCase()}`, // Simple mock ID generation
    };
    console.log("New Class/Section Data:", newClassSection);
    alert("Class and Section added successfully! Check console for data.");
    // Optionally, clear the form or redirect to the class list page
    setFormData({
      className: "",
      sectionName: "",
      homeroomTeacherId: "",
      maxStudentCapacity: 30,
      academicYear: "2024-2025",
    });
  };

  const academicYears = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];
  const classNames = [
    "Nursery",
    "LKG",
    "UKG",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ];
  const sectionNames = ["A", "B", "C", "D", "E"];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add New Class & Section
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Class Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="className">Class Name</Label>
              <Select
                id="className"
                value={formData.className}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                {classNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="sectionName">Section Name</Label>
              <Select
                id="sectionName"
                value={formData.sectionName}
                onChange={handleChange}
                required
              >
                <option value="">Select Section</option>
                {sectionNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

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

          {/* Homeroom Teacher and Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="homeroomTeacherId">Homeroom Teacher</Label>
              <Select
                id="homeroomTeacherId"
                value={formData.homeroomTeacherId}
                onChange={handleChange}
                required
              >
                <option value="">Select Teacher</option>
                {mockTeachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="maxStudentCapacity">Max Student Capacity</Label>
              <Input
                id="maxStudentCapacity"
                type="number"
                placeholder="e.g., 30"
                value={formData.maxStudentCapacity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-6 text-lg font-semibold">
            Add Class & Section
          </Button>
        </form>
      </div>
    </div>
  );
}
