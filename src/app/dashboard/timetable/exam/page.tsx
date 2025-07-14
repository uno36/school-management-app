"use client";

import React, { useState } from "react";

// --- Mock Shadcn UI Component Mockups ---
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
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = {
      default: "bg-blue-600 text-white shadow-md hover:bg-blue-700",
      outline:
        "border border-blue-400 bg-transparent text-blue-600 hover:bg-blue-50",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      link: "text-blue-600 underline-offset-4 hover:underline",
      destructive: "bg-red-600 text-white hover:bg-red-700",
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
// --- End Mock Shadcn UI Component Mockups ---

// Define types for exam timetable entry
interface ExamTimetableEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (e.g., "09:00 AM")
  subject: string;
  class: string; // e.g., "GCSE Year 10", "GCSE Year 11"
  room: string;
  invigilator: string; // Teacher name
}

// Mock data for exams
const initialExamTimetable: ExamTimetableEntry[] = [
  {
    id: "EX001",
    date: "2025-01-15",
    time: "09:00 AM",
    subject: "GCSE Mathematics",
    class: "GCSE Year 11",
    room: "Hall A",
    invigilator: "Mr. Smith",
  },
  {
    id: "EX002",
    date: "2025-01-15",
    time: "01:00 PM",
    subject: "GCSE English Literature",
    class: "GCSE Year 11",
    room: "Hall B",
    invigilator: "Mrs. Davis",
  },
  {
    id: "EX003",
    date: "2025-01-16",
    time: "09:00 AM",
    subject: "GCSE Physics",
    class: "GCSE Year 10",
    room: "Lab 1",
    invigilator: "Ms. Johnson",
  },
  {
    id: "EX004",
    date: "2025-01-17",
    time: "09:00 AM",
    subject: "GCSE Chemistry",
    class: "GCSE Year 11",
    room: "Lab 2",
    invigilator: "Mr. Green",
  },
];

const mockInvigilators = [
  "Mr. Smith",
  "Ms. Johnson",
  "Mrs. Davis",
  "Mr. Green",
  "Ms. Brown",
];
const examClasses = [
  "GCSE Year 10",
  "GCSE Year 11",
  "A-Level Year 12",
  "A-Level Year 13",
];
const examRooms = ["Hall A", "Hall B", "Lab 1", "Lab 2", "Library"];
const examSubjects = [
  "GCSE Mathematics",
  "GCSE English Literature",
  "GCSE Physics",
  "GCSE Chemistry",
  "GCSE Biology",
  "GCSE History",
  "GCSE Geography",
];

const ExamTimetablePage: React.FC = () => {
  const [examEntries, setExamEntries] =
    useState<ExamTimetableEntry[]>(initialExamTimetable);
  const [newExamEntry, setNewExamEntry] = useState<
    Omit<ExamTimetableEntry, "id">
  >({
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    subject: examSubjects[0],
    class: examClasses[0],
    room: examRooms[0],
    invigilator: mockInvigilators[0],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setNewExamEntry((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `EX${Date.now()}`; // Simple unique ID generation
    setExamEntries((prev) => [...prev, { ...newExamEntry, id }]);
    // Reset form after adding
    setNewExamEntry({
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      subject: examSubjects[0],
      class: examClasses[0],
      room: examRooms[0],
      invigilator: mockInvigilators[0],
    });
  };

  const handleDeleteEntry = (id: string) => {
    setExamEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Exam Timetable</h1>

      {/* Add New Exam Entry Form */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Add New Exam Entry
        </h2>
        <form
          onSubmit={handleAddEntry}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <Input
              id="date"
              type="date"
              value={newExamEntry.date}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
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
              value={newExamEntry.time}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <Select
              id="subject"
              value={newExamEntry.subject}
              onChange={handleInputChange}
              className="w-full"
            >
              {examSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label
              htmlFor="class"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Class/Year
            </label>
            <Select
              id="class"
              value={newExamEntry.class}
              onChange={handleInputChange}
              className="w-full"
            >
              {examClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label
              htmlFor="room"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room
            </label>
            <Select
              id="room"
              value={newExamEntry.room}
              onChange={handleInputChange}
              className="w-full"
            >
              {examRooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label
              htmlFor="invigilator"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Invigilator
            </label>
            <Select
              id="invigilator"
              value={newExamEntry.invigilator}
              onChange={handleInputChange}
              className="w-full"
            >
              {mockInvigilators.map((inv) => (
                <option key={inv} value={inv}>
                  {inv}
                </option>
              ))}
            </Select>
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <Button type="submit" className="px-6 py-2">
              Add Exam
            </Button>
          </div>
        </form>
      </section>

      {/* Exam Timetable Display */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Upcoming Exams ({examEntries.length})
        </h2>
        {examEntries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Time
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Subject
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Class
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Room
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Invigilator
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {examEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {entry.date}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {entry.time}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {entry.subject}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {entry.class}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {entry.room}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {entry.invigilator}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No exam timetable entries found.</p>
        )}
        <p className="text-xs text-gray-500 mt-4">
          This table displays the exam schedule, including subjects, classes,
          rooms, and assigned invigilators.
        </p>
      </section>
    </div>
  );
};

export default ExamTimetablePage;
