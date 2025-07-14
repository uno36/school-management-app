"use client";

import React, { useState, useEffect } from "react";

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

// --- Mock Data Interface ---
interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  targetAudience: string;
}

// --- Mock Data ---
const mockAnnouncements: Announcement[] = [
  {
    id: "ANN001",
    title: "Summer Vacation Dates",
    content:
      "School will be closed from August 1st to August 31st for summer vacation.",
    date: "2025-07-01",
    targetAudience: "All",
  },
  {
    id: "ANN002",
    title: "Parent-Teacher Meeting Reminder",
    content:
      "A reminder that the Parent-Teacher Meeting is scheduled for July 20th.",
    date: "2025-07-05",
    targetAudience: "Parents",
  },
  {
    id: "ANN003",
    title: "New Library Hours",
    content:
      "The school library will now be open until 5 PM on weekdays, starting next Monday.",
    date: "2025-07-08",
    targetAudience: "Students",
  },
];

/**
 * AnnouncementsPage component handles posting and viewing school announcements.
 */
export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(mockAnnouncements);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    targetAudience: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleNewAnnouncementChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setNewAnnouncement((prev) => ({ ...prev, [id]: value }));
  };

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    setMessage(null);

    if (
      !newAnnouncement.title ||
      !newAnnouncement.content ||
      !newAnnouncement.targetAudience
    ) {
      setMessage("Please fill all fields to post an announcement.");
      setSubmissionStatus("error");
      return;
    }

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newId = `ANN${String(announcements.length + 1).padStart(3, "0")}`;
      const postedAnnouncement: Announcement = {
        id: newId,
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: new Date().toISOString().split("T")[0], // Current date
        targetAudience: newAnnouncement.targetAudience,
      };

      setAnnouncements((prev) => [...prev, postedAnnouncement]);
      setNewAnnouncement({ title: "", content: "", targetAudience: "" });
      setSubmissionStatus("success");
      setMessage("Announcement posted successfully!");
      console.log("Announcement posted successfully!", postedAnnouncement);
    } catch (error) {
      setSubmissionStatus("error");
      setMessage("Failed to post announcement. Please try again.");
      console.error("Error posting announcement:", error);
    }
  };

  const targetAudiences = ["All", "Students", "Parents", "Teachers", "Staff"];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Announcements & Notifications
        </h1>
        {/* No specific "back" link needed here, as this is a main section page */}
      </div>

      {/* Post New Announcement Form */}
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Post New Announcement
        </h2>
        <form onSubmit={handlePostAnnouncement} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., School Holiday Notice"
              value={newAnnouncement.title}
              onChange={handleNewAnnouncementChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              value={newAnnouncement.content}
              onChange={handleNewAnnouncementChange}
              placeholder="Enter announcement details here..."
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>
          <div>
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Select
              id="targetAudience"
              value={newAnnouncement.targetAudience}
              onChange={handleNewAnnouncementChange}
              required
            >
              <option value="">Select Audience</option>
              {targetAudiences.map((audience) => (
                <option key={audience} value={audience}>
                  {audience}
                </option>
              ))}
            </Select>
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
            disabled={submissionStatus === "submitting"}
          >
            {submissionStatus === "submitting"
              ? "Posting..."
              : "Post Announcement"}
          </Button>
        </form>
      </div>

      {/* Recent Announcements List */}
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Recent Announcements
        </h2>
        <div className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="border border-gray-100 p-4 rounded-md bg-gray-50 shadow-sm"
              >
                <h3 className="font-semibold text-lg text-gray-900">
                  {announcement.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Date:</span> {announcement.date}{" "}
                  | <span className="font-medium">Audience:</span>{" "}
                  {announcement.targetAudience}
                </p>
                <p className="text-gray-700">{announcement.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No announcements posted yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
