"use client";

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

// Mock Link component for navigation
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

// --- Mock Data Interfaces ---
interface Person {
  id: string;
  name: string;
  type: "Student" | "Staff";
  rfidTag?: string; // Mock RFID tag
  fingerprintId?: string; // Mock Fingerprint ID
}

interface AttendanceRecord {
  id: string;
  personId: string;
  personName: string;
  personType: "Student" | "Staff";
  timestamp: string;
  method: "RFID" | "Fingerprint";
  status: "Check-in" | "Check-out";
}

// --- Mock Data ---
const mockPeople: Person[] = [
  {
    id: "P001",
    name: "Alice Student",
    type: "Student",
    rfidTag: "RFID12345",
    fingerprintId: "FP001",
  },
  {
    id: "P002",
    name: "Bob Staff",
    type: "Staff",
    rfidTag: "RFID67890",
    fingerprintId: "FP002",
  },
  {
    id: "P003",
    name: "Charlie Student",
    type: "Student",
    rfidTag: "RFID11223",
    fingerprintId: "FP003",
  },
  {
    id: "P004",
    name: "Diana Staff",
    type: "Staff",
    rfidTag: "RFID44556",
    fingerprintId: "FP004",
  },
];

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "ATT001",
    personId: "P001",
    personName: "Alice Student",
    personType: "Student",
    timestamp: "2025-07-10T08:00:00Z",
    method: "RFID",
    status: "Check-in",
  },
  {
    id: "ATT002",
    personId: "P002",
    personName: "Bob Staff",
    personType: "Staff",
    timestamp: "2025-07-10T08:15:00Z",
    method: "Fingerprint",
    status: "Check-in",
  },
  {
    id: "ATT003",
    personId: "P001",
    personName: "Alice Student",
    personType: "Student",
    timestamp: "2025-07-10T16:00:00Z",
    method: "RFID",
    status: "Check-out",
  },
];

/**
 * BiometricRFIDPage component simulates biometric/RFID integration for attendance tracking.
 * Users can simulate scanning an ID and view a log of attendance records.
 */
export default function BiometricRFIDPage() {
  const [scanInput, setScanInput] = useState<string>("");
  const [scanMethod, setScanMethod] = useState<"RFID" | "Fingerprint">("RFID");
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >(mockAttendanceRecords);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleScanInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScanInput(e.target.value);
  };

  const handleScanMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScanMethod(e.target.value as "RFID" | "Fingerprint");
    setScanInput(""); // Clear input when method changes
    setMessage(null);
  };

  const handleProcessScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("scanning");
    setMessage(null);

    if (!scanInput) {
      setMessage("Please enter a valid ID to scan.");
      setSubmissionStatus("error");
      return;
    }

    try {
      // Simulate API call/processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const foundPerson = mockPeople.find(
        (person) =>
          (scanMethod === "RFID" && person.rfidTag === scanInput) ||
          (scanMethod === "Fingerprint" && person.fingerprintId === scanInput)
      );

      if (foundPerson) {
        // Determine if it's a check-in or check-out (simplified logic: toggle status)
        const lastRecord = attendanceRecords
          .filter((rec) => rec.personId === foundPerson.id)
          .sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )[0];

        let newStatus: "Check-in" | "Check-out" = "Check-in";
        if (lastRecord && lastRecord.status === "Check-in") {
          newStatus = "Check-out";
        }

        const newRecord: AttendanceRecord = {
          id: `ATT${String(attendanceRecords.length + 1).padStart(3, "0")}`,
          personId: foundPerson.id,
          personName: foundPerson.name,
          personType: foundPerson.type,
          timestamp: new Date().toISOString(),
          method: scanMethod,
          status: newStatus,
        };

        setAttendanceRecords((prev) => [newRecord, ...prev]); // Add to top of log
        setScanInput("");
        setSubmissionStatus("success");
        setMessage(
          `${foundPerson.name} (${foundPerson.type}) ${newStatus} recorded successfully via ${scanMethod}!`
        );
        console.log("Attendance recorded:", newRecord);
      } else {
        setMessage(`No user found with ${scanMethod} ID: "${scanInput}".`);
        setSubmissionStatus("error");
      }
    } catch (error) {
      setSubmissionStatus("error");
      setMessage("Error processing scan. Please try again.");
      console.error("Scan error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Biometric/RFID Integration
        </h1>
      </div>

      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Simulate Attendance Scan
        </h2>
        <form onSubmit={handleProcessScan} className="space-y-6">
          <div>
            <Label htmlFor="scanMethod">Scan Method</Label>
            <Select
              id="scanMethod"
              value={scanMethod}
              onChange={handleScanMethodChange}
              required
            >
              <option value="RFID">RFID Card Scan</option>
              <option value="Fingerprint">Fingerprint Scan</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="scanInput">
              {scanMethod === "RFID"
                ? "Enter RFID Tag ID"
                : "Enter Fingerprint ID"}
            </Label>
            <Input
              id="scanInput"
              type="text"
              placeholder={
                scanMethod === "RFID" ? "e.g., RFID12345" : "e.g., FP001"
              }
              value={scanInput}
              onChange={handleScanInput}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              (Use mock IDs like RFID12345, FP001, etc., for simulation)
            </p>
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                submissionStatus === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white mt-6"
            disabled={submissionStatus === "scanning"}
          >
            {submissionStatus === "scanning"
              ? "Processing Scan..."
              : "Process Scan"}
          </Button>
        </form>
      </div>

      {/* Recent Attendance Log */}
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Recent Attendance Log
        </h2>
        <div className="space-y-4">
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record) => (
              <div
                key={record.id}
                className="border border-gray-100 p-4 rounded-md bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-md text-gray-900">
                    {record.personName} ({record.personType})
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      record.status === "Check-in"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {record.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Time:</span>{" "}
                  {new Date(record.timestamp).toLocaleString()} |{" "}
                  <span className="font-medium">Method:</span> {record.method}
                </p>
                <p className="text-gray-700 text-sm">ID: {record.personId}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No attendance records yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
