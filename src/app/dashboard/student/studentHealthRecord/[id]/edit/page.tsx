"use client";

import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// --- Theme Context Mock (Embedded for self-contained execution) ---
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return {
      theme: "light",
      toggleTheme: () =>
        console.warn("toggleTheme called outside ThemeProvider"),
    };
  }
  return context;
};
// --- End Theme Context Mock ---

// --- Mock Shadcn UI Component Mockups ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out ${className} dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400`}
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
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = {
      default:
        "bg-blue-600 text-white shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
      outline:
        "border border-blue-400 bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-sm dark:border-blue-600 dark:text-blue-400 dark:hover:bg-gray-700",
      secondary:
        "bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500",
      ghost:
        "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100",
      link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 shadow-md dark:bg-red-700 dark:hover:bg-red-800",
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
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className} dark:text-gray-300`}
      {...props}
    />
  )
);
Label.displayName = "Label";

// --- End Mock Shadcn UI Component Mockups ---

// Define types for health record
interface HealthRecord {
  id: string;
  studentId: string;
  studentName: string;
  dateOfRecord: string; // YYYY-MM-DD
  medicalConditions: string;
  allergies: string;
  immunizations: string;
  doctorName?: string;
  doctorPhone?: string;
  notes?: string;
}

// Mock data for health records (subset for edit page)
const mockHealthRecords: HealthRecord[] = [
  {
    id: "HR001",
    studentId: "S001",
    studentName: "Alice Smith",
    dateOfRecord: "2024-09-10",
    medicalConditions: "Asthma (mild)",
    allergies: "Pollen",
    immunizations: "All standard childhood immunizations up-to-date.",
    doctorName: "Dr. Emily White",
    doctorPhone: "111-222-3333",
    notes:
      "Requires inhaler during allergy season. Parents informed about emergency plan.",
  },
  {
    id: "HR002",
    studentId: "S002",
    studentName: "Bob Johnson",
    dateOfRecord: "2024-08-15",
    medicalConditions: "None",
    allergies: "Peanuts (severe)",
    immunizations: "Up-to-date, including flu shot.",
    doctorName: "Dr. Alex Green",
    doctorPhone: "444-555-6666",
    notes:
      "EpiPen stored in nurse's office. All staff trained on anaphylaxis protocol and food cross-contamination prevention.",
  },
  {
    id: "HR003",
    studentId: "S003",
    studentName: "Charlie Brown",
    dateOfRecord: "2024-09-01",
    medicalConditions: "Eczema",
    allergies: "Dust mites",
    immunizations:
      "Missing MMR booster, parents notified and follow-up scheduled for next month.",
    doctorName: "Dr. Sarah Lee",
    doctorPhone: "777-888-9999",
    notes:
      "Skin flare-ups managed with prescribed topical cream. Avoid dusty areas and ensure proper ventilation in classroom.",
  },
];

// Mock function to simulate updating a health record
const updateHealthRecord = (record: HealthRecord): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Simulating updating health record:", record);
      // In a real app, this would be an API call to your backend
      resolve(true); // Simulate successful update
    }, 1000); // Simulate network delay
  });
};

interface StudentHealthRecordEditPageProps {
  recordId?: string; // Simulate ID coming from URL (e.g., 'HR001')
  onBack?: () => void; // Callback to navigate back
}

const StudentHealthRecordEditPage: React.FC<
  StudentHealthRecordEditPageProps
> = ({
  recordId = "HR001", // Default for demonstration
  onBack,
}) => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState<HealthRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  // Effect to fetch data on component mount based on recordId
  useEffect(() => {
    const fetchRecordData = async (id: string) => {
      setLoading(true);
      setMessage(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
        const foundRecord = mockHealthRecords.find((rec) => rec.id === id);

        if (foundRecord) {
          setFormData(JSON.parse(JSON.stringify(foundRecord))); // Deep copy
        } else {
          setMessage(`Health record with ID "${id}" not found for editing.`);
        }
      } catch (error) {
        setMessage(
          "Failed to load health record data for editing. Please try again."
        );
        console.error("Error fetching health record:", error);
      } finally {
        setLoading(false);
      }
    };

    if (recordId) {
      fetchRecordData(recordId);
    } else {
      setLoading(false);
      setMessage("No record ID provided in the URL or invalid URL structure.");
    }
  }, [recordId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [id]: value,
          }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    setMessage(null);

    if (!formData) {
      setMessage("No data to submit.");
      setSubmissionStatus("error");
      return;
    }

    // Basic validation
    if (
      !formData.studentId ||
      !formData.studentName ||
      !formData.dateOfRecord ||
      !formData.medicalConditions ||
      !formData.allergies ||
      !formData.immunizations
    ) {
      setMessage(
        "Please fill in all required fields (Student ID, Name, Date, Medical Conditions, Allergies, Immunizations)."
      );
      setSubmissionStatus("error");
      return;
    }

    try {
      const success = await updateHealthRecord(formData);
      if (success) {
        setSubmissionStatus("success");
        setMessage(`Health record ${formData.id} updated successfully!`);
      } else {
        setSubmissionStatus("error");
        setMessage("Failed to update health record. Please try again.");
      }
    } catch (error) {
      setSubmissionStatus("error");
      setMessage(
        "An error occurred while updating the record. Please try again."
      );
      console.error("Error updating health record:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Loading health record...
        </p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-red-600 mb-4 dark:text-red-400">
            Record Not Found
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {message || "The health record could not be found."}
          </p>
          {onBack && (
            <Button onClick={onBack} className="mt-6">
              Go Back to Health Records List
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50 mb-8 text-center">
          Edit Health Record: {formData.id}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                type="text"
                value={formData.studentId}
                onChange={handleChange}
                required
                disabled // Student ID typically not editable
              />
            </div>
            <div>
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                type="text"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dateOfRecord">Date of Record</Label>
            <Input
              id="dateOfRecord"
              type="date"
              value={formData.dateOfRecord}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="medicalConditions">
              Medical Conditions (comma-separated)
            </Label>
            <textarea
              id="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              rows={2}
              placeholder="Enter medical conditions here..."
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="allergies">Allergies (comma-separated)</Label>
            <textarea
              id="allergies"
              value={formData.allergies}
              onChange={handleChange}
              rows={2}
              placeholder="Enter allergies here..."
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="immunizations">Immunizations</Label>
            <textarea
              id="immunizations"
              value={formData.immunizations}
              onChange={handleChange}
              rows={3}
              placeholder="Enter immunizations here..."
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctorName">Doctor's Name (Optional)</Label>
              <Input
                id="doctorName"
                type="text"
                value={formData.doctorName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="doctorPhone">Doctor's Phone (Optional)</Label>
              <Input
                id="doctorPhone"
                type="tel"
                value={formData.doctorPhone || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <textarea
              id="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              rows={3}
              placeholder="Enter additional notes her..."
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                submissionStatus === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={submissionStatus === "submitting"}
            >
              Go Back
            </Button>
            <Button type="submit" disabled={submissionStatus === "submitting"}>
              {submissionStatus === "submitting"
                ? "Saving Changes..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentHealthRecordEditPage;
