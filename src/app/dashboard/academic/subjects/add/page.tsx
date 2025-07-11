"use client";

// frontend/app/(dashboard)/academic/subjects/add/page.tsx
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

interface SubjectFormData {
  name: string;
  code: string;
  description: string;
  assignedClasses: { id: string; name: string; section: string }[];
  assignedTeachers: { id: string; name: string }[];
  creditHours: number;
  syllabusUrl: string;
}

// Mock data for available classes and teachers for dropdowns
const mockAvailableClasses = [
  { id: "C001S01", name: "Grade 1", section: "A" },
  { id: "C001S02", name: "Grade 1", section: "B" },
  { id: "C002S01", name: "Grade 2", section: "A" },
  { id: "C003S01", name: "Grade 3", section: "A" },
  { id: "C003S02", name: "Grade 3", section: "B" },
  { id: "C004S01", name: "Grade 4", section: "A" },
];

const mockAvailableTeachers = [
  { id: "T001", name: "Ms. Emily White" },
  { id: "T002", name: "Mr. David Green" },
  { id: "T003", name: "Ms. Sarah Brown" },
  { id: "T004", name: "Mr. Alex Johnson" },
  { id: "T005", name: "Ms. Olivia Taylor" },
  { id: "T006", name: "Mr. Chris Lee" },
];

/**
 * AddSubjectForm component for adding new subjects.
 */
export default function AddSubjectForm() {
  const [formData, setFormData] = useState<SubjectFormData>({
    name: "",
    code: "",
    description: "",
    assignedClasses: [],
    assignedTeachers: [],
    creditHours: 0,
    syllabusUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "creditHours" ? parseInt(value) || 0 : value,
    }));
  };

  const handleClassAssignmentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => {
        const [name, sectionPart] = option.value.split(" - Section ");
        const section = sectionPart || ""; // Handle cases where section might not be present
        return { id: option.value, name, section };
      }
    );
    setFormData((prev) => ({ ...prev, assignedClasses: selectedOptions }));
  };

  const handleTeacherAssignmentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(e.target.selectedOptions)
      .map((option) => {
        const teacher = mockAvailableTeachers.find(
          (t) => t.id === option.value
        );
        return teacher
          ? { id: teacher.id, name: teacher.name }
          : { id: "", name: "" };
      })
      .filter((t) => t.id !== ""); // Filter out any empty entries if teacher not found
    setFormData((prev) => ({ ...prev, assignedTeachers: selectedOptions }));
  };

  const handleSyllabusFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      // In a real app, you'd upload this file and get a URL.
      // For mock, we'll just set a placeholder URL or base64 if needed.
      const mockUrl = `https://placehold.co/200x100/abcdef/fedcba?text=${file.name}`;
      setFormData((prev) => ({ ...prev, syllabusUrl: mockUrl }));
    } else {
      setFormData((prev) => ({ ...prev, syllabusUrl: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd generate a unique ID and send this data to the backend.
    const newSubject = {
      ...formData,
      id: `SUB${Math.random().toString(36).substring(2, 8).toUpperCase()}`, // Simple mock ID generation
    };
    console.log("New Subject Data:", newSubject);
    alert("Subject added successfully! Check console for data.");
    // Optionally, clear the form or redirect to the subject list page
    setFormData({
      name: "",
      code: "",
      description: "",
      assignedClasses: [],
      assignedTeachers: [],
      creditHours: 0,
      syllabusUrl: "",
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add New Subject
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Subject Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Subject Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g., English Language Arts"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="code">Subject Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="e.g., ELA101"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                placeholder="Brief description of the subject content."
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <Label htmlFor="creditHours">Credit Hours</Label>
              <Input
                id="creditHours"
                type="number"
                placeholder="e.g., 5"
                value={formData.creditHours}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="syllabusUrl">Syllabus Document</Label>
              <Input
                id="syllabusUrl"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleSyllabusFileChange}
              />
              {formData.syllabusUrl && (
                <p className="text-sm text-gray-500 mt-2">
                  File selected:{" "}
                  {formData.syllabusUrl.substring(
                    formData.syllabusUrl.lastIndexOf("/") + 1
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Assigned Classes */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Assigned Classes
            </h3>
            <div>
              <Label htmlFor="assignedClasses">
                Select Classes (Hold Ctrl/Cmd to select multiple)
              </Label>
              <Select
                id="assignedClasses"
                multiple
                value={formData.assignedClasses.map(
                  (cls) => `${cls.name} - Section ${cls.section}`
                )}
                onChange={handleClassAssignmentChange}
                className="h-auto min-h-[120px]"
              >
                {mockAvailableClasses.map((cls) => (
                  <option
                    key={cls.id}
                    value={`${cls.name} - Section ${cls.section}`}
                  >
                    {cls.name} - Section {cls.section}
                  </option>
                ))}
              </Select>
              <p className="text-sm text-gray-500 mt-2">
                Currently selected:{" "}
                {formData.assignedClasses
                  .map((cls) => `${cls.name} ${cls.section}`)
                  .join(", ") || "None"}
              </p>
            </div>
          </div>

          {/* Assigned Teachers */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Assigned Teachers
            </h3>
            <div>
              <Label htmlFor="assignedTeachers">
                Select Teachers (Hold Ctrl/Cmd to select multiple)
              </Label>
              <Select
                id="assignedTeachers"
                multiple
                value={formData.assignedTeachers.map((teacher) => teacher.id)}
                onChange={handleTeacherAssignmentChange}
                className="h-auto min-h-[120px]"
              >
                {mockAvailableTeachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </Select>
              <p className="text-sm text-gray-500 mt-2">
                Currently selected:{" "}
                {formData.assignedTeachers
                  .map((teacher) => teacher.name)
                  .join(", ") || "None"}
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white mt-6"
          >
            Add Subject
          </Button>
        </form>
      </div>
    </div>
  );
}
