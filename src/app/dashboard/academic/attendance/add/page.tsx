"use client";

import React, { useState, useEffect } from "react";

// --- Mock Shadcn UI Component Mockups (Integrated for self-contained execution) ---
// These are duplicated here to make this component self-contained and runnable.
// In a real project, you would import these from a central UI library.

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out ${className}`}
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
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 ease-in-out";
    const variantClasses = {
      default: "bg-blue-600 text-white shadow-md hover:bg-blue-700",
      outline:
        "border border-blue-400 bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-sm",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      link: "text-blue-600 underline-offset-4 hover:underline",
      destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md",
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
          className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all duration-200 ease-in-out ${className}`}
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

// Define types for attendance data
interface AttendanceRecord {
  id: string;
  name: string;
  type: "student" | "staff"; // Added type to distinguish
  class?: string; // Optional for students
  department?: string; // Optional for staff
  status: "Present" | "Absent" | "Late";
  time?: string; // Optional, for present/late
  reason?: string; // Optional, for absent/late
}

interface AttendanceFormProps {
  initialData?: AttendanceRecord; // Optional: for editing existing records
  onSave: (data: AttendanceRecord) => void;
  onCancel: () => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<AttendanceRecord>(
    initialData || {
      id: "",
      name: "",
      type: "student", // Default to student
      status: "Present", // Default status
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      reason: "",
    }
  );

  // Update form data if initialData changes (e.g., when editing a different record)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form if no initial data is provided (for adding new)
      setFormData({
        id: "",
        name: "",
        type: "student",
        status: "Present",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        reason: "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
      // Clear time/reason if status changes in a way that makes them irrelevant
      ...(id === "status" && value === "Absent" && { time: "" }),
      ...(id === "status" && value === "Present" && { reason: "" }),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.id || !formData.name || !formData.status) {
      alert("Please fill in all required fields: ID, Name, and Status.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {initialData ? "Edit Attendance Record" : "Add New Attendance Record"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selector (Student/Staff) */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Record Type
            </label>
            <Select
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full"
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </Select>
          </div>

          {/* ID and Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID
              </label>
              <Input
                id="id"
                type="text"
                value={formData.id}
                onChange={handleChange}
                placeholder="e.g., S001 or T001"
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Alice Smith"
                required
              />
            </div>
          </div>

          {/* Class/Department (conditional) */}
          {formData.type === "student" && (
            <div>
              <label
                htmlFor="class"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Class
              </label>
              <Input
                id="class"
                type="text"
                value={formData.class || ""}
                onChange={handleChange}
                placeholder="e.g., 7th Grade"
              />
            </div>
          )}
          {formData.type === "staff" && (
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <Input
                id="department"
                type="text"
                value={formData.department || ""}
                onChange={handleChange}
                placeholder="e.g., Math"
              />
            </div>
          )}

          {/* Status and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <Select
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full"
                required
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </Select>
            </div>
            {(formData.status === "Present" || formData.status === "Late") && (
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Time
                </label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time || ""}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Reason (conditional) */}
          {(formData.status === "Absent" || formData.status === "Late") && (
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reason
              </label>
              <Input
                id="reason"
                type="text"
                value={formData.reason || ""}
                onChange={handleChange}
                placeholder="e.g., Sick, Appointment"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              {initialData ? "Update Record" : "Add Record"}
            </Button>
          </div>
        </form>
        <p className="text-xs text-gray-500 mt-6">
          This form allows manual entry or editing of attendance records. In a
          production environment, this might integrate with biometric systems or
          other automated methods.
        </p>
      </div>
    </div>
  );
};

export default AttendanceForm;
