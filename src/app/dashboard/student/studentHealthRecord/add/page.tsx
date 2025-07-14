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

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all duration-200 ease-in-out ${className} dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100`}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
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
// --- End Mock Shadcn UI Component Mockups ---

// Define type for a new health record
interface NewHealthRecord {
  studentId: string;
  studentName: string;
  dateOfRecord: string;
  medicalConditions: string;
  allergies: string;
  immunizations: string;
  doctorName: string;
  doctorPhone: string;
  notes: string;
}

// Mock function to simulate adding a health record
const addHealthRecord = (record: NewHealthRecord): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = `HR${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`;
      console.log("Simulating adding new health record:", {
        id: newId,
        ...record,
      });
      // In a real app, this would be an API call to your backend
      resolve(newId);
    }, 1000); // Simulate network delay
  });
};

const StudentHealthRecordAddPage: React.FC = () => {
  const { theme } = useTheme();

  const todayDateString = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<NewHealthRecord>({
    studentId: "",
    studentName: "",
    dateOfRecord: todayDateString,
    medicalConditions: "",
    allergies: "",
    immunizations: "",
    doctorName: "",
    doctorPhone: "",
    notes: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    setMessage(null);

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
      const newRecordId = await addHealthRecord(formData);
      setSubmissionStatus("success");
      setMessage(
        `Health record for "${formData.studentName}" added successfully with ID: ${newRecordId}`
      );
      // Optionally clear form or redirect after success
      setFormData({
        studentId: "",
        studentName: "",
        dateOfRecord: todayDateString,
        medicalConditions: "",
        allergies: "",
        immunizations: "",
        doctorName: "",
        doctorPhone: "",
        notes: "",
      });
    } catch (error) {
      setSubmissionStatus("error");
      setMessage("Failed to add health record. Please try again.");
      console.error("Error adding health record:", error);
    }
  };

  // Simulate navigation back to list page (in a real app, use router.back() or router.push())
  const handleGoBack = () => {
    alert("Simulating navigation back to Health Records List.");
    // Example for Next.js: useRouter().back();
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50 mb-8 text-center">
          Add New Student Health Record
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                type="text"
                placeholder="e.g., S001"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                type="text"
                placeholder="e.g., Alice Smith"
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
              placeholder="e.g., Asthma (mild), Eczema"
              value={formData.medicalConditions}
              onChange={handleChange}
              rows={2}
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="allergies">Allergies (comma-separated)</Label>
            <textarea
              id="allergies"
              placeholder="e.g., Peanuts (severe), Pollen"
              value={formData.allergies}
              onChange={handleChange}
              rows={2}
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="immunizations">Immunizations</Label>
            <textarea
              id="immunizations"
              placeholder="e.g., All standard childhood immunizations up-to-date."
              value={formData.immunizations}
              onChange={handleChange}
              rows={3}
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
                placeholder="e.g., Dr. Jane Doe"
                value={formData.doctorName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="doctorPhone">Doctor's Phone (Optional)</Label>
              <Input
                id="doctorPhone"
                type="tel"
                placeholder="e.g., 123-456-7890"
                value={formData.doctorPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <textarea
              id="notes"
              placeholder="Any additional relevant information."
              value={formData.notes}
              onChange={handleChange}
              rows={3}
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
              onClick={handleGoBack}
              disabled={submissionStatus === "submitting"}
            >
              Go Back
            </Button>
            <Button type="submit" disabled={submissionStatus === "submitting"}>
              {submissionStatus === "submitting"
                ? "Adding Record..."
                : "Add Record"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentHealthRecordAddPage;
