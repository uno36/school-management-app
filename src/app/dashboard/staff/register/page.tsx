"use client";

import Image from "next/image";
// frontend/app/(dashboard)/staff/register/page.tsx
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

interface StaffFormData {
  staffId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  qualification: string;
  experience: string; // Years of experience
  designation: string;
  department: string;
  joiningDate: Date | null;
  employmentStatus: "Full-time" | "Part-time" | "Contract" | "Intern";
  salaryInformation: string;
  bankDetails: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  photoUrl: string;
  resumeUrl: string;
  idProofUrl: string;
}

/**
 * StaffRegistrationForm component for adding new staff members.
 */
export default function StaffRegistrationForm() {
  const [formData, setFormData] = useState<StaffFormData>({
    staffId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    qualification: "",
    experience: "",
    designation: "",
    department: "",
    joiningDate: null,
    employmentStatus: "Full-time",
    salaryInformation: "",
    bankDetails: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    photoUrl: "",
    resumeUrl: "",
    idProofUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date: Date | null, field: keyof StaffFormData) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof StaffFormData
  ) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Staff Registration Data:", formData);
    alert("Staff registered successfully! Check console for data.");
    // In a real application, you would send this 'formData' object to your backend API.
    // After successful registration, you might navigate to the staff list page.
  };

  // Mock data for dropdowns
  const genders = ["Male", "Female", "Other"];
  const designations = [
    "Head Teacher",
    "Teacher",
    "Administrator",
    "Librarian",
    "Accountant",
    "Support Staff",
  ];
  const departments = [
    "Academics",
    "Administration",
    "Finance",
    "Library",
    "IT",
    "Maintenance",
  ];
  const employmentStatuses = ["Full-time", "Part-time", "Contract", "Intern"];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Register New Staff Member
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
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
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <DatePicker
                  selectedDate={formData.dateOfBirth}
                  onSelectDate={(date) => handleDateChange(date, "dateOfBirth")}
                  placeholder="Pick a date"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
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
            <div>
              <Label htmlFor="address">Address</Label>
              <textarea
                id="address"
                placeholder="123 Main St, Anytown, USA"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Select
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Designation</option>
                  {designations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="qualification">Highest Qualification</Label>
                <Input
                  id="qualification"
                  type="text"
                  placeholder="e.g., Master of Education"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="joiningDate">Joining Date</Label>
              <DatePicker
                selectedDate={formData.joiningDate}
                onSelectDate={(date) => handleDateChange(date, "joiningDate")}
                placeholder="Pick joining date"
              />
            </div>
            <div>
              <Label htmlFor="employmentStatus">Employment Status</Label>
              <Select
                id="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                required
              >
                {employmentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Financial & Bank Details */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Financial & Bank Details
            </h3>
            <div>
              <Label htmlFor="salaryInformation">Salary Information</Label>
              <Input
                id="salaryInformation"
                type="text"
                placeholder="e.g., $50,000/year, Grade Level 5"
                value={formData.salaryInformation}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="bankDetails">Bank Details</Label>
              <textarea
                id="bankDetails"
                placeholder="Bank Name, Account Number, IFSC Code etc."
                value={formData.bankDetails}
                onChange={handleChange}
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          {/* Emergency Contact Information */}
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
                  placeholder="Spouse/Parent"
                  value={formData.emergencyContactRelationship}
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
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Document Uploads */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Document Uploads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="photoUrl">Staff Photo</Label>
                <Input
                  id="photoUrl"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "photoUrl")}
                />
                {formData.photoUrl && (
                  <Image
                    width={200}
                    height={200}
                    src={formData.photoUrl}
                    alt="Staff"
                    className="mt-2 h-24 w-24 object-cover rounded-md shadow-sm"
                  />
                )}
              </div>
              <div>
                <Label htmlFor="resumeUrl">Resume/CV (PDF)</Label>
                <Input
                  id="resumeUrl"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, "resumeUrl")}
                />
                {formData.resumeUrl && (
                  <p className="text-sm text-gray-500 mt-2">
                    File selected: {formData.resumeUrl.substring(0, 50)}...
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="idProofUrl">
                ID Proof (e.g., Passport, Driver&apos;s License)
              </Label>
              <Input
                id="idProofUrl"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileChange(e, "idProofUrl")}
              />
              {formData.idProofUrl && (
                <p className="text-sm text-gray-500 mt-2">
                  File selected: {formData.idProofUrl.substring(0, 50)}...
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white mt-8"
          >
            Register Staff
          </Button>
        </form>
      </div>
    </div>
  );
}
