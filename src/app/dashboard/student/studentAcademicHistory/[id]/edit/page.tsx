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

// Define type for academic history record
interface AcademicHistoryRecord {
  id: string;
  studentId: string;
  studentName: string;
  academicYear: string;
  gradesAndAchievements: string;
  pastAcademicPerformance: string;
  previousSchoolsAttended?: string;
}

// Mock data for academic history records (subset for edit page)
const mockAcademicHistoryRecords: AcademicHistoryRecord[] = [
  {
    id: "AH001",
    studentId: "S001",
    studentName: "Alice Smith",
    academicYear: "2023-2024",
    gradesAndAchievements:
      'Achieved A in Math, B in Science. Participated in Debate Club. Awarded "Most Improved Speaker".',
    pastAcademicPerformance:
      "Strong performance in elementary school, consistently above average. Showed early aptitude for logical reasoning.",
    previousSchoolsAttended: "Elementary School ABC (2018-2022)",
  },
  {
    id: "AH002",
    studentId: "S002",
    studentName: "Bob Johnson",
    academicYear: "2023-2024",
    gradesAndAchievements:
      "Improved grades in English, C in History. Joined Chess Club. Won regional chess tournament.",
    pastAcademicPerformance:
      "Struggled with reading in early grades, showed significant improvement in middle school. Highly analytical.",
    previousSchoolsAttended: "Primary School XYZ (2017-2022)",
  },
  {
    id: "AH003",
    studentId: "S003",
    studentName: "Charlie Brown",
    academicYear: "2022-2023",
    gradesAndAchievements:
      'Excellent in Arts, participated in school play as lead. Maintained B average. Received "Best Artistic Contribution" award.',
    pastAcademicPerformance:
      "Consistent academic record, strong in creative subjects. Very imaginative and expressive.",
    previousSchoolsAttended: "Local Community School (2016-2022)",
  },
];

// Mock function to simulate updating an academic history record
const updateAcademicHistoryRecord = (
  record: AcademicHistoryRecord
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Simulating updating academic history record:", record);
      // In a real app, this would be an API call to your backend
      resolve(true); // Simulate successful update
    }, 1000); // Simulate network delay
  });
};

interface StudentAcademicHistoryEditPageProps {
  recordId?: string; // Simulate ID coming from URL (e.g., 'AH001')
  onBack?: () => void; // Callback to navigate back
}

const StudentAcademicHistoryEditPage: React.FC<
  StudentAcademicHistoryEditPageProps
> = ({
  recordId = "AH001", // Default for demonstration
  onBack,
}) => {
  const { theme } = useTheme();

  const currentYear = new Date().getFullYear();
  const academicYears = Array.from(
    { length: 5 },
    (_, i) => `${currentYear + i}-${currentYear + i + 1}`
  ).reverse();

  const [formData, setFormData] = useState<AcademicHistoryRecord | null>(null);
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
        const foundRecord = mockAcademicHistoryRecords.find(
          (rec) => rec.id === id
        );

        if (foundRecord) {
          setFormData(JSON.parse(JSON.stringify(foundRecord))); // Deep copy
        } else {
          setMessage(
            `Academic history record with ID "${id}" not found for editing.`
          );
        }
      } catch (error) {
        setMessage(
          "Failed to load academic history data for editing. Please try again."
        );
        console.error("Error fetching academic history record:", error);
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
      !formData.academicYear ||
      !formData.gradesAndAchievements ||
      !formData.pastAcademicPerformance
    ) {
      setMessage("Please fill in all required fields.");
      setSubmissionStatus("error");
      return;
    }

    try {
      const success = await updateAcademicHistoryRecord(formData);
      if (success) {
        setSubmissionStatus("success");
        setMessage(
          `Academic history record ${formData.id} updated successfully!`
        );
      } else {
        setSubmissionStatus("error");
        setMessage(
          "Failed to update academic history record. Please try again."
        );
      }
    } catch (error) {
      setSubmissionStatus("error");
      setMessage(
        "An error occurred while updating the record. Please try again."
      );
      console.error("Error updating academic history record:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Loading academic history record...
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
            {message || "The academic history record could not be found."}
          </p>
          {onBack && (
            <Button onClick={onBack} className="mt-6">
              Go Back to Academic History List
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
          Edit Academic History Record: {formData.id}
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
            <Label htmlFor="gradesAndAchievements">
              Grades and Achievements
            </Label>
            <label
              htmlFor="gradesAndAchievements"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Grades and Achievements
            </label>
            <textarea
              id="gradesAndAchievements"
              value={formData.gradesAndAchievements}
              onChange={handleChange}
              rows={4}
              placeholder="Enter your grades and achievements here..."
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              required
              title="Please provide your grades and achievements"
            />
          </div>

          <div>
            <Label htmlFor="pastAcademicPerformance">
              Past Academic Performance Summary
            </Label>
            <textarea
              id="pastAcademicPerformance"
              value={formData.pastAcademicPerformance}
              onChange={handleChange}
              rows={4}
              placeholder="Enter past academic perfomnce here..."
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="previousSchoolsAttended">
              Previous Schools Attended (Optional)
            </Label>
            <textarea
              id="previousSchoolsAttended"
              value={formData.previousSchoolsAttended || ""}
              onChange={handleChange}
              rows={2}
              placeholder="Enter previous school attended here..."
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

export default StudentAcademicHistoryEditPage;
