// frontend/components/student/StudentEnrollmentForm.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface StudentEnrollmentData {
  academicYear: string;
  classAssigned: string;
  sectionAssigned: string;
  admissionNumber: string;
  enrollmentDate: Date | null;
  status: "Enrolled" | "Transferred" | "Withdrawn" | "Alumni";
}

function DatePicker({
  selectedDate,
  onSelectDate,
  placeholder = "Select a date",
}: {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate || undefined}
          onSelect={onSelectDate}
          required
        />
      </PopoverContent>
    </Popover>
  );
}

function StudentEnrollmentForm() {
  const [formData, setFormData] = useState<StudentEnrollmentData>({
    academicYear: "",
    classAssigned: "",
    sectionAssigned: "",
    admissionNumber: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
    enrollmentDate: new Date(),
    status: "Enrolled",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, enrollmentDate: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Student Enrollment Data Submitted:", formData);
    alert("Student enrollment data saved successfully!");
  };

  // Mock data
  const academicYears = ["2023-2024", "2024-2025", "2025-2026"];
  const classes = [
    "Nursery",
    "LKG",
    "UKG",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
  ];
  const sections = ["A", "B", "C", "D"];
  const statuses = ["Enrolled", "Transferred", "Withdrawn", "Alumni"];

  return (
    <div className="mx-auto mt-30 w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student Enrollment & Class Assignment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="admissionNumber">Admission Number</Label>
            <Input
              id="admissionNumber"
              type="text"
              value={formData.admissionNumber}
              onChange={handleChange}
              readOnly
              className="bg-gray-100"
            />
          </div>
          <div>
            <Label>Enrollment Date</Label>
            <DatePicker
              selectedDate={formData.enrollmentDate}
              onSelectDate={handleDateChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="academicYear"
              className="block text-sm font-medium text-gray-700"
            >
              Academic Year
            </label>
            <select
              id="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select Year</option>
              {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="classAssigned"
              className="block text-sm font-medium text-gray-700"
            >
              Class Assigned
            </label>
            <select
              id="classAssigned"
              value={formData.classAssigned}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="sectionAssigned"
              className="block text-sm font-medium text-gray-700"
            >
              Section Assigned
            </label>
            <select
              id="sectionAssigned"
              value={formData.sectionAssigned}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select Section</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="w-full py-6 text-lg font-semibold">
          Save Enrollment
        </Button>
      </form>
    </div>
  );
}

export default StudentEnrollmentForm;
