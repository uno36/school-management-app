"use client";

import React, { useState, useEffect } from "react";

// --- Updated PageProps to match Next.js type expectation ---
interface PageProps {
  params: Promise<{ id: string }>;
}

// --- Mock Shadcn UI Component Mockups ---
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

// DatePicker component definition
interface DatePickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onSelectDate,
  placeholder = "Select a date",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateClick = (day: number) => {
    const newDate = new Date();
    newDate.setDate(day);
    onSelectDate(newDate);
    setIsOpen(false);
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1); // Simplified for demo

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full justify-start text-left font-normal"
        onClick={toggleCalendar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        {selectedDate ? (
          selectedDate.toDateString()
        ) : (
          <span>{placeholder}</span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute z-50 mt-1 rounded-md border bg-popover p-3 text-popover-foreground shadow-md">
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => (
              <Button
                key={day}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleDateClick(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
// --- End Shadcn UI Component Mockups ---

interface DisciplinaryRecordDetails {
  id: string;
  studentId: string;
  studentName: string;
  incidentDate: string; // YYYY-MM-DD
  incidentType: string;
  description: string;
  actionTaken: string;
  notes: string;
}

// Mock data for disciplinary records
const allMockDisciplinaryRecords: DisciplinaryRecordDetails[] = [
  {
    id: "DR001",
    studentId: "STU001",
    studentName: "Alice Johnson",
    incidentDate: "2025-05-10",
    incidentType: "Tardiness",
    description:
      "Student was late to first period class three times in a week without valid excuse.",
    actionTaken: "Verbal Warning, discussion with student.",
    notes:
      "Student acknowledged the issue and promised to improve punctuality.",
  },
  {
    id: "DR002",
    studentId: "STU002",
    studentName: "Bob Williams",
    incidentDate: "2025-06-01",
    incidentType: "Disruptive Behavior",
    description:
      "Repeatedly talking loudly during class, distracting other students, and ignoring teacher warnings.",
    actionTaken: "Detention for 30 minutes, parent notified via email.",
    notes: "Parent responded and will discuss behavior with student.",
  },
  {
    id: "DR003",
    studentId: "STU001",
    studentName: "Alice Johnson",
    incidentDate: "2025-06-15",
    incidentType: "Cheating",
    description:
      "Caught looking at another student's paper during a Math quiz.",
    actionTaken:
      "Suspension (1 day), quiz grade of zero, mandatory parent meeting.",
    notes:
      "Parents were very concerned and cooperative. Alice expressed remorse.",
  },
  {
    id: "DR004",
    studentId: "STU003",
    studentName: "Charlie Davis",
    incidentDate: "2025-07-01",
    incidentType: "Vandalism",
    description: "Found drawing graffiti on the restroom wall.",
    actionTaken:
      "Parent Meeting, restitution for cleaning costs, 3 days in-school suspension.",
    notes:
      "Parents agreed to cover cleaning costs. Charlie will participate in school clean-up.",
  },
];

/**
 * EditDisciplinaryRecordPage component allows editing of a disciplinary record's details.
 * It receives the 'id' parameter from the route params.
 */
export default function EditDisciplinaryRecordPage({ params }: PageProps) {
  const [formData, setFormData] = useState<DisciplinaryRecordDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecordData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Resolve the params Promise
        const currentParams = await params;
        const recordId = currentParams.id;

        if (!recordId) {
          setError("No Record ID provided in the URL.");
          setLoading(false);
          return;
        }

        const foundRecord = allMockDisciplinaryRecords.find(
          (r) => r.id === recordId
        );

        if (foundRecord) {
          // Create a deep copy to ensure state updates correctly
          setFormData(JSON.parse(JSON.stringify(foundRecord)));
        } else {
          setError(
            `Disciplinary record with ID "${recordId}" not found for editing.`
          );
        }
      } catch (err) {
        setError("Failed to load disciplinary record data for editing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordData();
  }, [params]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) =>
      prev
        ? { ...prev, incidentDate: date?.toISOString().slice(0, 10) || "" }
        : null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log("Updated Disciplinary Record Data:", formData);
      alert(
        "Disciplinary record updated successfully! Check console for data."
      );
      // In a real application, you would send this 'formData' object to your backend API for update.
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading disciplinary record data for editing...
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
          Disciplinary record not found for editing.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Disciplinary Record: {formData.id}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information (Read-only) */}
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

          {/* Incident Details (Editable) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="incidentDate">Incident Date</Label>
              <DatePicker
                selectedDate={
                  formData.incidentDate ? new Date(formData.incidentDate) : null
                }
                onSelectDate={handleDateChange}
                placeholder="Select date"
              />
            </div>
            <div>
              <Label htmlFor="incidentType">Incident Type</Label>
              <Input
                id="incidentType"
                type="text"
                placeholder="e.g., Tardiness, Disruptive Behavior"
                value={formData.incidentType}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Detailed description of the incident."
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>
          <div>
            <Label htmlFor="actionTaken">Action Taken</Label>
            <textarea
              id="actionTaken"
              placeholder="e.g., Warning, Detention, Parent Meeting"
              value={formData.actionTaken}
              onChange={handleChange}
              rows={2}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <textarea
              id="notes"
              placeholder="Any other relevant notes."
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
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