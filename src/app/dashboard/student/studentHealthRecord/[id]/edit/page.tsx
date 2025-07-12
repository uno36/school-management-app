"use client";

import React, { useState, useEffect } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

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
// --- End Shadcn UI Component Mockups ---

interface HealthRecordDetails {
  id: string;
  studentId: string;
  studentName: string;
  medicalConditions: string;
  allergies: string;
  immunizations: string;
  doctorName: string;
  doctorPhone: string;
}

const allMockHealthRecords: HealthRecordDetails[] = [
  {
    id: "HR001",
    studentId: "STU001",
    studentName: "Alice Johnson",
    medicalConditions: "None",
    allergies: "Pollen (seasonal)",
    immunizations: "MMR, DTP, Polio (all up to date)",
    doctorName: "Dr. Emily White",
    doctorPhone: "+1-555-111-2222",
  },
  // ... other records
];

export default function EditHealthRecordPage({ params }: PageProps) {
  const { id: recordId } = params;
  const [formData, setFormData] = useState<HealthRecordDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecordData = async () => {
      setLoading(true);
      setError(null);

      try {
        const foundRecord = allMockHealthRecords.find((r) => r.id === recordId);

        if (foundRecord) {
          setFormData(JSON.parse(JSON.stringify(foundRecord)));
        } else {
          setError(
            `Health record with ID "${recordId}" not found for editing.`
          );
        }
      } catch (err) {
        setError("Failed to load health record data for editing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordData();
  }, [recordId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log("Updated Health Record Data:", formData);
      alert("Health record updated successfully! Check console for data.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <p className="text-xl text-gray-600">
            Loading health record data for editing...
          </p>
        </div>
      </div>
    );
  }

  if (error || !formData) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Record Not Found
          </h2>
          <p className="text-gray-700">
            The health record for ID &quot;{recordId}&quot; could not be found
            for editing.
          </p>
          <Button className="mt-6" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8">
      <div className="container mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Health Record: {formData.studentName}
          </h1>
        </div>

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

          {/* Health Details (Editable) */}
          <div>
            <Label htmlFor="medicalConditions">Medical Conditions</Label>
            <textarea
              id="medicalConditions"
              placeholder="e.g., Asthma, Diabetes, Heart Condition."
              value={formData.medicalConditions}
              onChange={handleChange}
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="allergies">Allergies</Label>
            <textarea
              id="allergies"
              placeholder="e.g., Penicillin, Peanuts, Bee Stings."
              value={formData.allergies}
              onChange={handleChange}
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="immunizations">Immunizations</Label>
            <textarea
              id="immunizations"
              placeholder="e.g., DTP, MMR, Polio (dates if available)."
              value={formData.immunizations}
              onChange={handleChange}
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctorName">Doctor's Name</Label>
              <Input
                id="doctorName"
                type="text"
                placeholder="Dr. Emily White"
                value={formData.doctorName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="doctorPhone">Doctor's Phone</Label>
              <Input
                id="doctorPhone"
                type="tel"
                placeholder="+1 (555) 333-4444"
                value={formData.doctorPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
