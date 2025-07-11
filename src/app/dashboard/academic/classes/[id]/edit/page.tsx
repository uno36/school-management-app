"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

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

// Class and teacher mock data (same as before, unchanged)
interface ClassAndSectionDetails {
  id: string;
  className: string;
  sectionName: string;
  homeroomTeacherId: string;
  homeroomTeacherName: string;
  maxStudentCapacity: number;
  currentStudentCount: number;
  academicYear: string;
  subjects: { id: string; name: string; teacher: string }[];
  schedule: { day: string; time: string; subject: string; teacher: string }[];
}

const allMockClassesAndSections: ClassAndSectionDetails[] = [
  {
    id: "C001S01",
    className: "Grade 1",
    sectionName: "A",
    homeroomTeacherId: "T001",
    homeroomTeacherName: "Ms. Emily White",
    maxStudentCapacity: 30,
    currentStudentCount: 25,
    academicYear: "2024-2025",
    subjects: [
      { id: "SUB001", name: "English", teacher: "Ms. Emily White" },
      { id: "SUB002", name: "Mathematics", teacher: "Mr. David Green" },
      { id: "SUB003", name: "Science", teacher: "Ms. Sarah Brown" },
    ],
    schedule: [
      {
        day: "Monday",
        time: "09:00 AM",
        subject: "English",
        teacher: "Ms. Emily White",
      },
      {
        day: "Monday",
        time: "10:00 AM",
        subject: "Mathematics",
        teacher: "Mr. David Green",
      },
      {
        day: "Tuesday",
        time: "09:00 AM",
        subject: "Science",
        teacher: "Ms. Sarah Brown",
      },
    ],
  },
  {
    id: "C001S02",
    className: "Grade 1",
    sectionName: "B",
    homeroomTeacherId: "T002",
    homeroomTeacherName: "Mr. David Green",
    maxStudentCapacity: 30,
    currentStudentCount: 22,
    academicYear: "2024-2025",
    subjects: [
      { id: "SUB001", name: "English", teacher: "Mr. David Green" },
      { id: "SUB002", name: "Mathematics", teacher: "Ms. Emily White" },
    ],
    schedule: [
      {
        day: "Monday",
        time: "09:00 AM",
        subject: "English",
        teacher: "Mr. David Green",
      },
      {
        day: "Tuesday",
        time: "10:00 AM",
        subject: "Mathematics",
        teacher: "Ms. Emily White",
      },
    ],
  },
  {
    id: "C002S01",
    className: "Grade 2",
    sectionName: "A",
    homeroomTeacherId: "T003",
    homeroomTeacherName: "Ms. Sarah Brown",
    maxStudentCapacity: 28,
    currentStudentCount: 28,
    academicYear: "2024-2025",
    subjects: [
      { id: "SUB004", name: "Social Studies", teacher: "Ms. Sarah Brown" },
      { id: "SUB005", name: "Art", teacher: "Ms. Olivia Taylor" },
    ],
    schedule: [
      {
        day: "Wednesday",
        time: "11:00 AM",
        subject: "Social Studies",
        teacher: "Ms. Sarah Brown",
      },
      {
        day: "Thursday",
        time: "01:00 PM",
        subject: "Art",
        teacher: "Ms. Olivia Taylor",
      },
    ],
  },
];

// Mock data for teachers to be used in the homeroom teacher dropdown
const mockTeachers = [
  { id: "T001", name: "Ms. Emily White" },
  { id: "T002", name: "Mr. David Green" },
  { id: "T003", name: "Ms. Sarah Brown" },
  { id: "T004", name: "Mr. Alex Johnson" },
  { id: "T005", name: "Ms. Olivia Taylor" },
  { id: "T006", name: "Mr. Chris Lee" },
];

export default function EditClassAndSectionPage() {
  const params = useParams();
  const classSectionId = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string);

  const [formData, setFormData] = useState<ClassAndSectionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassSectionData = async () => {
      setLoading(true);
      setError(null);

      if (!classSectionId) {
        setError(
          "No Class/Section ID provided in the URL or invalid URL structure. Expected /academic/classes/[id]/edit"
        );
        setLoading(false);
        return;
      }

      try {
        const foundClassSection = allMockClassesAndSections.find(
          (cs) => cs.id === classSectionId
        );

        if (foundClassSection) {
          setFormData(JSON.parse(JSON.stringify(foundClassSection)));
        } else {
          setError(
            `Class/Section with ID "${classSectionId}" not found for editing.`
          );
        }
      } catch (err) {
        setError("Failed to load class/section data for editing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassSectionData();
  }, [classSectionId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [id]: id === "maxStudentCapacity" ? parseInt(value) || 0 : value,
            // Update homeroomTeacherName if homeroomTeacherId changes
            ...(id === "homeroomTeacherId" && {
              homeroomTeacherName:
                mockTeachers.find((t) => t.id === value)?.name || "",
            }),
          }
        : null
    );
  };

  const handleSubjectChange = (
    index: number,
    field: keyof ClassAndSectionDetails["subjects"][0],
    value: string
  ) => {
    setFormData((prev) => {
      if (!prev) return null;
      const updatedSubjects = [...prev.subjects];
      updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
      return { ...prev, subjects: updatedSubjects };
    });
  };

  const handleAddSubject = () => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        subjects: [
          ...prev.subjects,
          {
            id: `SUB${Math.random()
              .toString(36)
              .substring(2, 8)
              .toUpperCase()}`,
            name: "",
            teacher: "",
          },
        ],
      };
    });
  };

  const handleDeleteSubject = (index: number) => {
    setFormData((prev) => {
      if (!prev) return null;
      const updatedSubjects = prev.subjects.filter((_, i) => i !== index);
      return { ...prev, subjects: updatedSubjects };
    });
  };

  const handleScheduleChange = (
    index: number,
    field: keyof ClassAndSectionDetails["schedule"][0],
    value: string
  ) => {
    setFormData((prev) => {
      if (!prev) return null;
      const updatedSchedule = [...prev.schedule];
      updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
      return { ...prev, schedule: updatedSchedule };
    });
  };

  const handleAddScheduleSlot = () => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        schedule: [
          ...prev.schedule,
          { day: "", time: "", subject: "", teacher: "" },
        ],
      };
    });
  };

  const handleDeleteScheduleSlot = (index: number) => {
    setFormData((prev) => {
      if (!prev) return null;
      const updatedSchedule = prev.schedule.filter((_, i) => i !== index);
      return { ...prev, schedule: updatedSchedule };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log("Updated Class/Section Data:", formData);
      alert("Class and Section updated successfully! Check console for data.");
      // In a real application, you would send this 'formData' object to your backend API for update.
    }
  };

  const academicYears = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];
  const classNames = [
    "Nursery",
    "LKG",
    "UKG",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ];
  const sectionNames = ["A", "B", "C", "D", "E"];
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading class/section data for editing...
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
          Class/Section not found for editing.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Class: {formData.className} - Section {formData.sectionName}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Class Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="className">Class Name</Label>
                <Select
                  id="className"
                  value={formData.className}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Class</option>
                  {classNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="sectionName">Section Name</Label>
                <Select
                  id="sectionName"
                  value={formData.sectionName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Section</option>
                  {sectionNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>
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
                <option value="">Select Academic Year</option>
                {academicYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="homeroomTeacherId">Homeroom Teacher</Label>
                <Select
                  id="homeroomTeacherId"
                  value={formData.homeroomTeacherId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Teacher</option>
                  {mockTeachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="maxStudentCapacity">Max Student Capacity</Label>
                <Input
                  id="maxStudentCapacity"
                  type="number"
                  placeholder="e.g., 30"
                  value={formData.maxStudentCapacity}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="currentStudentCount">
                Current Student Count (Read-Only)
              </Label>
              <Input
                id="currentStudentCount"
                type="number"
                value={formData.currentStudentCount}
                disabled // This is typically derived, not directly editable
              />
            </div>
          </div>

          {/* Subjects Taught Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Subjects Taught
            </h3>
            {formData.subjects.map((subject, index) => (
              <div
                key={index}
                className="p-4 border rounded-md bg-gray-50 space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="col-span-full flex justify-between items-center">
                  <h4 className="font-medium text-gray-700">
                    Subject #{index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteSubject(index)}
                  >
                    Delete
                  </Button>
                </div>
                <div>
                  <Label htmlFor={`subjectName-${index}`}>Subject Name</Label>
                  <Input
                    id={`subjectName-${index}`}
                    type="text"
                    placeholder="e.g., English"
                    value={subject.name}
                    onChange={(e) =>
                      handleSubjectChange(index, "name", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`subjectTeacher-${index}`}>Teacher</Label>
                  <Input
                    id={`subjectTeacher-${index}`}
                    type="text"
                    placeholder="e.g., Ms. Emily White"
                    value={subject.teacher}
                    onChange={(e) =>
                      handleSubjectChange(index, "teacher", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddSubject}
              className="w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Subject
            </Button>
          </div>

          {/* Class Schedule Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Class Schedule
            </h3>
            {formData.schedule.map((slot, index) => (
              <div
                key={index}
                className="p-4 border rounded-md bg-gray-50 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-700">
                    Schedule Slot #{index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteScheduleSlot(index)}
                  >
                    Delete
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`scheduleDay-${index}`}>Day</Label>
                    <Select
                      id={`scheduleDay-${index}`}
                      value={slot.day}
                      onChange={(e) =>
                        handleScheduleChange(index, "day", e.target.value)
                      }
                      required
                    >
                      <option value="">Select Day</option>
                      {daysOfWeek.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`scheduleTime-${index}`}>Time</Label>
                    <Input
                      id={`scheduleTime-${index}`}
                      type="time"
                      placeholder="e.g., 09:00 AM"
                      value={slot.time}
                      onChange={(e) =>
                        handleScheduleChange(index, "time", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`scheduleSubject-${index}`}>Subject</Label>
                    <Input
                      id={`scheduleSubject-${index}`}
                      type="text"
                      placeholder="e.g., Mathematics"
                      value={slot.subject}
                      onChange={(e) =>
                        handleScheduleChange(index, "subject", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`scheduleTeacher-${index}`}>Teacher</Label>
                    <Input
                      id={`scheduleTeacher-${index}`}
                      type="text"
                      placeholder="e.g., Mr. David Green"
                      value={slot.teacher}
                      onChange={(e) =>
                        handleScheduleChange(index, "teacher", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddScheduleSlot}
              className="w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Schedule Slot
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white mt-8"
          >
            Save All Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
