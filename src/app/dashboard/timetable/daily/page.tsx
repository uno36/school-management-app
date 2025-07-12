"use client";

import React, { useState, useEffect } from "react";

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
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
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

// Define types for daily timetable entry
interface DailyTimetableEntry {
  id: string;
  teacherId: string;
  teacherName: string;
  day: string; // e.g., "Monday", "Tuesday"
  period: string; // e.g., "P1", "P2", "Lunch"
  timeSlot: string; // e.g., "08:00 - 08:50"
  subject: string;
  class: string; // e.g., "7A", "8B"
  room: string;
}

// Mock data for teachers
const mockTeachers = [
  { id: "T001", name: "Mr. Smith (Math)" },
  { id: "T002", name: "Ms. Johnson (Science)" },
  { id: "T003", name: "Mrs. Davis (English)" },
];

// Mock data for daily timetable entries
const initialDailyTimetable: DailyTimetableEntry[] = [
  {
    id: "DT001",
    teacherId: "T001",
    teacherName: "Mr. Smith (Math)",
    day: "Monday",
    period: "P1",
    timeSlot: "08:00 - 08:50",
    subject: "Mathematics",
    class: "7A",
    room: "M101",
  },
  {
    id: "DT002",
    teacherId: "T001",
    teacherName: "Mr. Smith (Math)",
    day: "Monday",
    period: "P2",
    timeSlot: "08:50 - 09:40",
    subject: "Mathematics",
    class: "8B",
    room: "M102",
  },
  {
    id: "DT003",
    teacherId: "T002",
    teacherName: "Ms. Johnson (Science)",
    day: "Tuesday",
    period: "P3",
    timeSlot: "09:40 - 10:30",
    subject: "Physics",
    class: "9C",
    room: "L201",
  },
  {
    id: "DT004",
    teacherId: "T003",
    teacherName: "Mrs. Davis (English)",
    day: "Wednesday",
    period: "P4",
    timeSlot: "10:30 - 11:20",
    subject: "English Literature",
    class: "7B",
    room: "H301",
  },
  {
    id: "DT005",
    teacherId: "T001",
    teacherName: "Mr. Smith (Math)",
    day: "Thursday",
    period: "P5",
    timeSlot: "11:20 - 12:10",
    subject: "Mathematics",
    class: "9A",
    room: "M101",
  },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "Lunch", "Break"];
const timeSlots = [
  "08:00 - 08:50",
  "08:50 - 09:40",
  "09:40 - 10:30",
  "10:30 - 11:20",
  "11:20 - 12:10",
  "12:10 - 13:00",
  "13:00 - 13:50",
  "13:50 - 14:40",
];
const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English Literature",
  "English Language",
  "History",
  "Geography",
  "Art",
  "Music",
  "Physical Education",
];
const classes = ["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C"];
const rooms = [
  "M101",
  "M102",
  "L201",
  "L202",
  "H301",
  "H302",
  "Gym",
  "Art Room",
  "Music Room",
];

const DailyTimetablePage: React.FC = () => {
  const [timetableEntries, setTimetableEntries] = useState<
    DailyTimetableEntry[]
  >(initialDailyTimetable);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("all"); // 'all' or specific teacher ID
  const [newEntry, setNewEntry] = useState<Omit<DailyTimetableEntry, "id">>({
    teacherId: mockTeachers[0].id,
    teacherName: mockTeachers[0].name,
    day: daysOfWeek[0],
    period: periods[0],
    timeSlot: timeSlots[0],
    subject: subjects[0],
    class: classes[0],
    room: rooms[0],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (id === "teacherId") {
      const selectedTeacher = mockTeachers.find((t) => t.id === value);
      setNewEntry((prev) => ({
        ...prev,
        teacherId: value,
        teacherName: selectedTeacher ? selectedTeacher.name : "",
      }));
    } else {
      setNewEntry((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `DT${Date.now()}`; // Simple unique ID generation
    setTimetableEntries((prev) => [...prev, { ...newEntry, id }]);
    // Reset form after adding
    setNewEntry({
      teacherId: mockTeachers[0].id,
      teacherName: mockTeachers[0].name,
      day: daysOfWeek[0],
      period: periods[0],
      timeSlot: timeSlots[0],
      subject: subjects[0],
      class: classes[0],
      room: rooms[0],
    });
  };

  const handleDeleteEntry = (id: string) => {
    setTimetableEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const filteredTimetable =
    selectedTeacherId === "all"
      ? timetableEntries
      : timetableEntries.filter(
          (entry) => entry.teacherId === selectedTeacherId
        );

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Daily Timetable</h1>

      {/* Teacher Selection */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <label
            htmlFor="teacher-select"
            className="text-lg font-medium text-gray-700"
          >
            View Timetable For:
          </label>
          <Select
            id="teacher-select"
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
            className="w-full sm:w-64"
          >
            <option value="all">All Teachers</option>
            {mockTeachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </Select>
        </div>
      </section>

      {/* Add New Timetable Entry Form */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Add New Schedule Entry
        </h2>
        <form
          onSubmit={handleAddEntry}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div>
            <label
              htmlFor="teacherId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teacher
            </label>
            <Select
              id="teacherId"
              value={newEntry.teacherId}
              onChange={handleInputChange}
              className="w-full"
            >
              {mockTeachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label
              htmlFor="day"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Day
            </label>
            <Select
              id="day"
              value={newEntry.day}
              onChange={handleInputChange}
              className="w-full"
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label
              htmlFor="period"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Period
            </label>
            <Select
              id="period"
              value={newEntry.period}
              onChange={handleInputChange}
              className="w-full"
            >
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label
              htmlFor="timeSlot"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time Slot
            </label>
            <Select
              id="timeSlot"
              value={newEntry.timeSlot}
              onChange={handleInputChange}
              className="w-full"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </Select>
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
              value={newEntry.subject}
              onChange={handleInputChange}
              className="w-full"
            >
              {subjects.map((subject) => (
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
              Class
            </label>
            <Select
              id="class"
              value={newEntry.class}
              onChange={handleInputChange}
              className="w-full"
            >
              {classes.map((cls) => (
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
            <Input
              id="room"
              type="text"
              value={newEntry.room}
              onChange={handleInputChange}
              placeholder="e.g., M101"
              className="w-full"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <Button type="submit" className="px-6 py-2">
              Add Entry
            </Button>
          </div>
        </form>
      </section>

      {/* Daily Timetable Display */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {selectedTeacherId === "all"
            ? "All Daily Schedules"
            : `${
                mockTeachers.find((t) => t.id === selectedTeacherId)?.name
              }'s Schedule`}
        </h2>
        {filteredTimetable.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Day
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Period
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
                  {selectedTeacherId === "all" && (
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Teacher
                    </th>
                  )}
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTimetable.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {entry.day}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {entry.period}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {entry.timeSlot}
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
                    {selectedTeacherId === "all" && (
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {entry.teacherName}
                      </td>
                    )}
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
          <p className="text-gray-500">
            No daily timetable entries found for the selected teacher.
          </p>
        )}
        <p className="text-xs text-gray-500 mt-4">
          This table displays daily class schedules. Teachers can filter to see
          their own timetable.
        </p>
      </section>
    </div>
  );
};

export default DailyTimetablePage;
