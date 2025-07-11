"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";

// 🔧 ADDED placeholder values
const academicYears = ["2023-2024", "2024-2025", "2025-2026"];
const classes = ["Grade 1", "Grade 2", "Grade 3"];
const sections = ["A", "B", "C"];
const statuses = ["Active", "Inactive", "Pending"];

export interface StudentFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  gender: string;
  bloodGroup: string;
  address: string;
  phone: string;
  email: string;
  parentFirstName: string;
  parentLastName: string;
  parentRelationship: string;
  parentPhone: string;
  parentEmail: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  studentPhotoUrl: string;
  birthCertificateUrl: string;
  previousSchoolRecordsUrl: string;
  academicYear: string;
  classAssigned: string;
  sectionAssigned: string;
  admissionNumber: string;
  enrollmentDate: Date | null;
  status: string; // 🔧 ADDED
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

export default function StudentEnrollmentPage() {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gender: "",
    bloodGroup: "",
    address: "",
    phone: "",
    email: "",
    parentFirstName: "",
    parentLastName: "",
    parentRelationship: "",
    parentPhone: "",
    parentEmail: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    studentPhotoUrl: "",
    birthCertificateUrl: "",
    previousSchoolRecordsUrl: "",
    academicYear: "",
    classAssigned: "",
    sectionAssigned: "",
    admissionNumber: "STU-" + Math.floor(1000 + Math.random() * 9000),
    enrollmentDate: new Date(),
    status: "", // 🔧 ADDED
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, dateOfBirth: date || null }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [id]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Student Data Submitted:", formData);
    alert("Student registration form submitted successfully!");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="mx-auto w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label>Date of Birth</Label>
                <DatePicker
                  selectedDate={formData.dateOfBirth}
                  onSelectDate={handleDateChange}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select
                  value={formData.bloodGroup}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, bloodGroup: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Contact Information
            </h3>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="123 Main St, Anytown, USA"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Parent/Guardian Information Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Parent/Guardian Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentFirstName">First Name</Label>
                <Input
                  id="parentFirstName"
                  type="text"
                  placeholder="Jane"
                  value={formData.parentFirstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parentLastName">Last Name</Label>
                <Input
                  id="parentLastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.parentLastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="parentRelationship">Relationship</Label>
                <Input
                  id="parentRelationship"
                  type="text"
                  placeholder="Mother"
                  value={formData.parentRelationship}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parentPhone">Phone Number</Label>
                <Input
                  id="parentPhone"
                  type="tel"
                  placeholder="+1 (555) 987-6543"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parentEmail">Email</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  placeholder="jane.doe@example.com"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emergencyContactName">Full Name</Label>
                <Input
                  id="emergencyContactName"
                  type="text"
                  placeholder="Emergency Contact"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactRelationship">
                  Relationship
                </Label>
                <Input
                  id="emergencyContactRelationship"
                  type="text"
                  placeholder="Aunt/Uncle"
                  value={formData.emergencyContactRelationship}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactPhone">Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  placeholder="+1 (555) 111-2222"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentPhotoUrl">Student Photo</Label>
                <Input
                  id="studentPhotoUrl"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {formData.studentPhotoUrl && (
                  <Image
                    src={formData.studentPhotoUrl}
                    alt="Student"
                    className="mt-2 h-24 w-24 object-cover rounded-md"
                    width={96}
                    height={96}
                  />
                )}
              </div>
              <div>
                <Label htmlFor="birthCertificateUrl">Birth Certificate</Label>
                <Input
                  id="birthCertificateUrl"
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="previousSchoolRecordsUrl">School Records</Label>
              <Input
                id="previousSchoolRecordsUrl"
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Enrollment and class assignment section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
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
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full py-6 text-lg font-semibold">
            Register Student
          </Button>
        </form>
      </div>
    </div>
  );
}

