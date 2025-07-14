"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

// --- Mock Shadcn UI Component Mockups (Integrated for self-contained execution) ---
// These are simplified versions to make the code runnable in this environment.
// In a real Next.js project, you would import these from '@/components/ui/...'
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

interface DatePickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onSelectDate,
  placeholder = "Select a date",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateClick = (day: number) => {
    const newDate = new Date();
    newDate.setDate(day);
    onSelectDate(newDate);
    setIsOpen(false);
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1); // Simplified for demo

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full justify-start text-left font-normal"
        onClick={toggleCalendar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        {selectedDate ? (
          selectedDate.toDateString()
        ) : (
          <span>{placeholder}</span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute z-50 mt-1 rounded-md border bg-popover p-3 text-popover-foreground shadow-md">
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => (
              <Button
                key={day}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleDateClick(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- End Shadcn UI Component Mockups ---

// Combined interface for a full Student Profile
interface StudentProfileData {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  gender: string;
  bloodGroup: string;
  address: string;
  phone: string;
  email: string;
  // Parent/Guardian Information
  parentFirstName: string;
  parentLastName: string;
  parentRelationship: string;
  parentPhone: string;
  parentEmail: string;
  // Emergency Contact Information
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  // Photo and Document Upload
  studentPhotoUrl: string;
  birthCertificateUrl: string;
  previousSchoolRecordsUrl: string;
  // Enrollment & Class Assignment
  academicYear: string;
  classAssigned: string;
  sectionAssigned: string;
  enrollmentDate: Date | null;
  status: "Enrolled" | "Transferred" | "Withdrawn" | "Alumni";
  // Academic History
  pastAcademicPerformance: string;
  gradesAndAchievements: string;
  previousSchoolsAttended: string;
  // Health & Medical Records
  medicalConditions: string;
  allergies: string;
  immunizations: string;
  doctorName: string;
  doctorPhone: string;
  // Disciplinary Records (array of records)
  disciplinaryRecords: {
    incidentDate: Date | null;
    incidentType: string;
    description: string;
    actionTaken: string;
    notes: string;
  }[];
}

interface StudentEditPageProps {
  params: Promise<{ id: string }>;
}

/**
 * StudentEditPage component allows editing of a comprehensive student profile.
 * It fetches existing data, pre-populates the form, and handles updates.
 */
export default function StudentEditPage({ params }: StudentEditPageProps) {
  const [id, setId] = useState<string | null>(null);
  const [student, setStudent] = useState<StudentProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getParamsAndFetchData = async () => {
      try {
        // Resolve the params promise
        const resolvedParams = await params;
        setId(resolvedParams.id);

        // Now fetch the student data using the resolved ID
        setLoading(true);
        setError(null);

        // Simulate fetching data from a backend API
        const mockData: StudentProfileData = {
          id: resolvedParams.id,
          admissionNumber: "ADM001",
          firstName: "Alice",
          lastName: "Smith",
          dateOfBirth: new Date("2015-03-15"),
          gender: "Female",
          bloodGroup: "A+",
          address: "456 Oak Avenue, Anytown, USA",
          phone: "+1 (555) 111-2222",
          email: "alice.smith@example.com",
          parentFirstName: "David",
          parentLastName: "Smith",
          parentRelationship: "Father",
          parentPhone: "+1 (555) 333-4444",
          parentEmail: "david.smith@example.com",
          emergencyContactName: "Sarah Smith",
          emergencyContactRelationship: "Aunt",
          emergencyContactPhone: "+1 (555) 555-6666",
          studentPhotoUrl:
            "https://placehold.co/150x150/aabbcc/ffffff?text=Student+Photo", // Placeholder image
          birthCertificateUrl:
            "https://placehold.co/200x100/aabbcc/ffffff?text=Birth+Cert", // Placeholder
          previousSchoolRecordsUrl:
            "https://placehold.co/200x100/aabbcc/ffffff?text=School+Records", // Placeholder
          academicYear: "2024-2025",
          classAssigned: "Grade 3",
          sectionAssigned: "B",
          enrollmentDate: new Date("2024-09-01"),
          status: "Enrolled",
          pastAcademicPerformance:
            "Consistent performer, strong in creative writing. Participated in school plays.",
          gradesAndAchievements:
            "Achieved A grades in English and Arts. Won school-wide poetry competition 2023.",
          previousSchoolsAttended:
            "Bright Kids Preschool (2018-2020), Green Valley Primary (2020-2024).",
          medicalConditions: "None known.",
          allergies: "Pollen (seasonal).",
          immunizations: "All standard childhood immunizations up to date.",
          doctorName: "Dr. Jane Foster",
          doctorPhone: "+1 (555) 777-8888",
          disciplinaryRecords: [
            {
              incidentDate: new Date("2024-10-10"),
              incidentType: "Minor Tardiness",
              description: "Late to class twice without valid excuse.",
              actionTaken: "Verbal warning, discussed with homeroom teacher.",
              notes: "Student acknowledged error and committed to punctuality.",
            },
            {
              incidentDate: new Date("2024-11-20"),
              incidentType: "Incomplete Homework",
              description:
                "Failed to submit Math homework for 3 consecutive days.",
              actionTaken: "Parent contacted, student given extension.",
              notes: "Improved submission rate after parent intervention.",
            },
          ],
        };
        setStudent(mockData);
      } catch (err) {
        setError("Failed to load student data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getParamsAndFetchData();
  }, [params]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setStudent((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleDateChange = (
    date: Date | null,
    field: keyof StudentProfileData
  ) => {
    setStudent((prev) => (prev ? { ...prev, [field]: date } : null));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof StudentProfileData
  ) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent((prev) =>
          prev ? { ...prev, [field]: reader.result as string } : null
        );
      };
      reader.readAsDataURL(file);
    } else {
      setStudent((prev) => (prev ? { ...prev, [field]: "" } : null));
    }
  };

  const handleDisciplinaryRecordChange = (
    index: number,
    field: keyof StudentProfileData["disciplinaryRecords"][0],
    value: any
  ) => {
    setStudent((prev) => {
      if (!prev) return null;
      const updatedRecords = [...prev.disciplinaryRecords];
      updatedRecords[index] = { ...updatedRecords[index], [field]: value };
      return { ...prev, disciplinaryRecords: updatedRecords };
    });
  };

  const handleAddDisciplinaryRecord = () => {
    setStudent((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        disciplinaryRecords: [
          ...prev.disciplinaryRecords,
          {
            incidentDate: null,
            incidentType: "",
            description: "",
            actionTaken: "",
            notes: "",
          },
        ],
      };
    });
  };

  const handleDeleteDisciplinaryRecord = (index: number) => {
    setStudent((prev) => {
      if (!prev) return null;
      const updatedRecords = prev.disciplinaryRecords.filter(
        (_, i) => i !== index
      );
      return { ...prev, disciplinaryRecords: updatedRecords };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student) {
      console.log("Student Data Updated:", student);
      alert("Student profile updated successfully!");
      // In a real application, you would send this 'student' object to your backend API for update.
      // After successful update, you might navigate back to the student details page or list.
    }
  };

  // Mock data for dropdowns
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading student data for editing...
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

  if (!student) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Student not found for editing.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Student Profile: {student.firstName} {student.lastName}
        </h1>

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
                  value={student.firstName}
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
                  value={student.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <DatePicker
                  selectedDate={student.dateOfBirth}
                  onSelectDate={(date) => handleDateChange(date, "dateOfBirth")}
                  placeholder="Pick a date"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  id="gender"
                  value={student.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select
                  id="bloodGroup"
                  value={student.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Contact Information
            </h3>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="123 Main St, Anytown, USA"
                value={student.address}
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
                  value={student.phone}
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
                  value={student.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Parent/Guardian Information Section */}
          <div className="space-y-4 mt-8">
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
                  value={student.parentFirstName}
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
                  value={student.parentLastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="parentRelationship">
                  Relationship to Student
                </Label>
                <Input
                  id="parentRelationship"
                  type="text"
                  placeholder="Mother"
                  value={student.parentRelationship}
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
                  value={student.parentPhone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parentEmail">Email Address</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  placeholder="jane.doe@example.com"
                  value={student.parentEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact Information Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Emergency Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emergencyContactName">Full Name</Label>
                <Input
                  id="emergencyContactName"
                  type="text"
                  placeholder="Emergency Contact Name"
                  value={student.emergencyContactName}
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
                  value={student.emergencyContactRelationship}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactPhone">Phone Number</Label>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  placeholder="+1 (555) 111-2222"
                  value={student.emergencyContactPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Photo and Document Upload Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Photo & Document Upload
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentPhotoUrl">Student Photo</Label>
                <Input
                  id="studentPhotoUrl"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "studentPhotoUrl")}
                />
                {student.studentPhotoUrl && (
                  <Image
                    width={200}
                    height={200}
                    src={student.studentPhotoUrl}
                    alt="Student"
                    className="mt-2 h-24 w-24 object-cover rounded-md shadow-sm"
                  />
                )}
              </div>
              <div>
                <Label htmlFor="birthCertificateUrl">
                  Birth Certificate (PDF/Image)
                </Label>
                <Input
                  id="birthCertificateUrl"
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => handleFileChange(e, "birthCertificateUrl")}
                />
                {student.birthCertificateUrl && (
                  <p className="text-sm text-gray-500 mt-2">
                    File uploaded:{" "}
                    {student.birthCertificateUrl.substring(0, 50)}...
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="previousSchoolRecordsUrl">
                  Previous School Records (PDF/Image)
                </Label>
                <Input
                  id="previousSchoolRecordsUrl"
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) =>
                    handleFileChange(e, "previousSchoolRecordsUrl")
                  }
                />
                {student.previousSchoolRecordsUrl && (
                  <p className="text-sm text-gray-500 mt-2">
                    File uploaded:{" "}
                    {student.previousSchoolRecordsUrl.substring(0, 50)}...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Enrollment & Class Assignment Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Enrollment & Class Assignment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="academicYear">Academic Year</Label>
                <Select
                  id="academicYear"
                  value={student.academicYear}
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
              <div>
                <Label htmlFor="classAssigned">Class</Label>
                <Select
                  id="classAssigned"
                  value={student.classAssigned}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="sectionAssigned">Section</Label>
                <Select
                  id="sectionAssigned"
                  value={student.sectionAssigned}
                  onChange={handleChange}
                >
                  <option value="">Select Section</option>
                  {sections.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="admissionNumber">Admission Number</Label>
                <Input
                  id="admissionNumber"
                  type="text"
                  placeholder="e.g., ADM2024001"
                  value={student.admissionNumber}
                  onChange={handleChange}
                  required
                  disabled // Admission number usually not editable
                />
              </div>
              <div>
                <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                <DatePicker
                  selectedDate={student.enrollmentDate}
                  onSelectDate={(date) =>
                    handleDateChange(date, "enrollmentDate")
                  }
                  placeholder="Select enrollment date"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Student Status</Label>
              <Select
                id="status"
                value={student.status}
                onChange={handleChange}
                required
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Academic History Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Academic History
            </h3>
            <div>
              <Label htmlFor="pastAcademicPerformance">
                Past Academic Performance (Notes)
              </Label>
              <textarea
                id="pastAcademicPerformance"
                placeholder="e.g., Consistently high grades in Math and Science, participated in debate club."
                value={student.pastAcademicPerformance}
                onChange={handleChange}
                rows={4}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <Label htmlFor="gradesAndAchievements">
                Grades and Achievements
              </Label>
              <textarea
                id="gradesAndAchievements"
                placeholder="e.g., GPA 3.8, Honor Roll 2022, Science Fair Winner 2023."
                value={student.gradesAndAchievements}
                onChange={handleChange}
                rows={4}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <Label htmlFor="previousSchoolsAttended">
                Previous Schools Attended
              </Label>
              <textarea
                id="previousSchoolsAttended"
                placeholder="e.g., Springfield Elementary (2018-2021), Oakwood Middle School (2021-2023)."
                value={student.previousSchoolsAttended}
                onChange={handleChange}
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          {/* Health & Medical Records Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Health & Medical Records
            </h3>
            <div>
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <textarea
                id="medicalConditions"
                placeholder="e.g., Asthma, Diabetes, Heart Condition."
                value={student.medicalConditions}
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
                value={student.allergies}
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
                value={student.immunizations}
                onChange={handleChange}
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="doctorName">Doctor&apos;s Name</Label>
                <Input
                  id="doctorName"
                  type="text"
                  placeholder="Dr. Emily White"
                  value={student.doctorName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="doctorPhone">Doctor&apos;s Phone Number</Label>
                <Input
                  id="doctorPhone"
                  type="tel"
                  placeholder="+1 (555) 333-4444"
                  value={student.doctorPhone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Disciplinary Records Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Disciplinary Records
            </h3>
            {student.disciplinaryRecords.map((record, index) => (
              <div
                key={index}
                className="p-4 border rounded-md bg-gray-50 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-700">
                    Record #{index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteDisciplinaryRecord(index)}
                  >
                    Delete
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`incidentDate-${index}`}>
                      Incident Date
                    </Label>
                    <DatePicker
                      selectedDate={record.incidentDate}
                      onSelectDate={(date) =>
                        handleDisciplinaryRecordChange(
                          index,
                          "incidentDate",
                          date
                        )
                      }
                      placeholder="Select date"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`incidentType-${index}`}>
                      Incident Type
                    </Label>
                    <Input
                      id={`incidentType-${index}`}
                      type="text"
                      placeholder="e.g., Tardiness"
                      value={record.incidentType}
                      onChange={(e) =>
                        handleDisciplinaryRecordChange(
                          index,
                          "incidentType",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <textarea
                    id={`description-${index}`}
                    placeholder="Detailed description of the incident."
                    value={record.description}
                    onChange={(e) =>
                      handleDisciplinaryRecordChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows={2}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`actionTaken-${index}`}>Action Taken</Label>
                  <textarea
                    id={`actionTaken-${index}`}
                    placeholder="e.g., Warning, Detention"
                    value={record.actionTaken}
                    onChange={(e) =>
                      handleDisciplinaryRecordChange(
                        index,
                        "actionTaken",
                        e.target.value
                      )
                    }
                    rows={2}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div>
                  <Label htmlFor={`notes-${index}`}>Additional Notes</Label>
                  <textarea
                    id={`notes-${index}`}
                    placeholder="Any other relevant notes."
                    value={record.notes}
                    onChange={(e) =>
                      handleDisciplinaryRecordChange(
                        index,
                        "notes",
                        e.target.value
                      )
                    }
                    rows={2}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddDisciplinaryRecord}
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
              Add New Disciplinary Record
            </Button>
          </div>

          <Button type="submit" className="w-full py-6 text-lg font-semibold">
            Save All Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
