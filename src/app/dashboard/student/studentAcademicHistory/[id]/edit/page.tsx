"use client";

import React, { useState, useEffect } from "react";

// --- Mock Shadcn UI Component Mockups (from user's StudentAcademicHistoryForm) ---
// These are duplicated here to make this component self-contained and runnable.
// In a real project, you would import these from a central UI library.

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

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 ${className}`}
      {...props}
    />
  )
);
Label.displayName = "Label";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// --- End Mock Shadcn UI Component Mockups ---

// Define interface for Academic History data (must match StudentAcademicHistoryForm's expectation)
interface StudentAcademicHistoryData {
  pastAcademicPerformance: string;
  gradesAndAchievements: string;
  previousSchoolsAttended: string;
}

// StudentAcademicHistoryForm component (provided by the user)
// This is included directly for self-contained execution. In a real project, it would be imported.
interface StudentAcademicHistoryFormProps {
  initialData?: StudentAcademicHistoryData; // Added for editing
  onSave: (data: StudentAcademicHistoryData) => void;
  onCancel: () => void;
}

const StudentAcademicHistoryForm: React.FC<StudentAcademicHistoryFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<StudentAcademicHistoryData>(
    initialData || {
      pastAcademicPerformance: "",
      gradesAndAchievements: "",
      previousSchoolsAttended: "",
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        pastAcademicPerformance: "",
        gradesAndAchievements: "",
        previousSchoolsAttended: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Call the onSave prop
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {initialData
            ? "Edit Student Academic History"
            : "Add Student Academic History"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="pastAcademicPerformance">
              Past Academic Performance (Notes)
            </Label>
            <Textarea
              id="pastAcademicPerformance"
              placeholder="e.g., Consistently high grades in Math and Science, participated in debate club."
              value={formData.pastAcademicPerformance}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="gradesAndAchievements">
              Grades and Achievements
            </Label>
            <Textarea
              id="gradesAndAchievements"
              placeholder="e.g., GPA 3.8, Honor Roll 2022, Science Fair Winner 2023."
              value={formData.gradesAndAchievements}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="previousSchoolsAttended">
              Previous Schools Attended
            </Label>
            <Textarea
              id="previousSchoolsAttended"
              placeholder="e.g., Springfield Elementary (2018-2021), Oakwood Middle School (2021-2023)."
              value={formData.previousSchoolsAttended}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="py-6 text-lg font-semibold">
              {initialData ? "Update History" : "Save Academic History"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Mock data for a student's academic history to be edited
const mockAcademicHistoryToEdit: StudentAcademicHistoryData = {
  pastAcademicPerformance:
    "Historically strong in STEM subjects, showed leadership in robotics club.",
  gradesAndAchievements:
    "GPA: 3.9, Dean's List (all semesters), Robotics Competition Winner (2023), Math Olympiad participant.",
  previousSchoolsAttended:
    "Bright Minds Academy (2015-2020), Central High School (2020-2023).",
};

interface EditStudentAcademicHistoryPageProps {
  studentId?: string; // Simulate ID coming from URL
  onSaveSuccess?: () => void; // Callback after successful save
  onCancelEdit?: () => void; // Callback to cancel edit and go back
}

const EditStudentAcademicHistoryPage: React.FC<
  EditStudentAcademicHistoryPageProps
> = ({
  studentId = "S001", // Default for demonstration
  onSaveSuccess,
  onCancelEdit,
}) => {
  const [loading, setLoading] = useState(true);
  const [academicHistory, setAcademicHistory] =
    useState<StudentAcademicHistoryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching the academic history data based on ID
    const fetchAcademicHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real app: const response = await fetch(`/api/student/${studentId}/academic-history`);
        // const data = await response.json();
        // For now, use mock data
        if (studentId === "S001") {
          // Assuming S001 has academic history
          setAcademicHistory(mockAcademicHistoryToEdit);
        } else {
          setAcademicHistory(null); // Record not found
          setError(`Academic history for student ID "${studentId}" not found.`);
        }
      } catch (err) {
        console.error("Failed to fetch academic history:", err);
        setError("Failed to load academic history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicHistory();
  }, [studentId]); // Re-fetch if ID changes

  const handleSave = (updatedData: StudentAcademicHistoryData) => {
    // In a real app, you would send this updatedData to your backend API
    console.log("Saving updated academic history:", updatedData);
    // Simulate API call success
    alert("Student academic history updated successfully!");
    if (onSaveSuccess) {
      onSaveSuccess(); // Navigate back or refresh list
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading academic history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          {onCancelEdit && (
            <Button onClick={onCancelEdit} className="mt-6">
              Go Back
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (!academicHistory) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Record Not Found
          </h2>
          <p className="text-gray-700">
            The academic history for student ID &quot;{studentId}&quot; does not
            exist.
          </p>
          {onCancelEdit && (
            <Button onClick={onCancelEdit} className="mt-6">
              Go Back
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <StudentAcademicHistoryForm
      initialData={academicHistory}
      onSave={handleSave}
      onCancel={onCancelEdit || (() => console.log("Edit cancelled"))} // Provide a default if no callback
    />
  );
};

export default EditStudentAcademicHistoryPage;
