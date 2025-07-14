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

// Mock Link component for navigation (not directly used on this page, but included for consistency)
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
interface Message {
  id: string;
  sender: string;
  receiver: string; // Could be a single user or a group/role
  subject: string;
  content: string;
  timestamp: string; // ISO string for date/time
  readStatus: "read" | "unread";
}

interface User {
  id: string;
  name: string;
  role: string; // e.g., 'Student', 'Teacher', 'Parent', 'Admin'
}

// --- Mock Data ---
const mockUsers: User[] = [
  { id: "U001", name: "Admin User", role: "Admin" },
  { id: "U002", name: "Ms. Smith", role: "Teacher" },
  { id: "U003", name: "John Doe", role: "Student" },
  { id: "U004", name: "Jane Parent", role: "Parent" },
];

const mockMessages: Message[] = [
  {
    id: "MSG001",
    sender: "Ms. Smith",
    receiver: "John Doe",
    subject: "Homework Reminder",
    content: "Just a friendly reminder about the math homework due tomorrow.",
    timestamp: "2025-07-10T10:00:00Z",
    readStatus: "unread",
  },
  {
    id: "MSG002",
    sender: "Admin User",
    receiver: "All",
    subject: "School Event Tomorrow",
    content:
      "Reminder: Annual Sports Day is tomorrow, July 12th, starting at 9 AM.",
    timestamp: "2025-07-10T09:30:00Z",
    readStatus: "read",
  },
  {
    id: "MSG003",
    sender: "Jane Parent",
    receiver: "Ms. Smith",
    subject: "Regarding John's Progress",
    content:
      "I would like to discuss John's academic progress at your earliest convenience.",
    timestamp: "2025-07-09T15:45:00Z",
    readStatus: "read",
  },
];

/**
 * MessagingPage component provides an interface for sending and viewing internal messages.
 */
export default function MessagingPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState({
    receiver: "",
    subject: "",
    content: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [messageFeedback, setMessageFeedback] = useState<string | null>(null);

  // For demonstration, let's assume the current sender is 'Admin User'
  const currentSender =
    mockUsers.find((user) => user.role === "Admin")?.name || "Admin User";

  const handleNewMessageChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setNewMessage((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    setMessageFeedback(null);

    if (!newMessage.receiver || !newMessage.subject || !newMessage.content) {
      setMessageFeedback("Please fill all fields to send a message.");
      setSubmissionStatus("error");
      return;
    }

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newId = `MSG${String(messages.length + 1).padStart(3, "0")}`;
      const sentMessage: Message = {
        id: newId,
        sender: currentSender, // Assuming current user is the sender
        receiver: newMessage.receiver,
        subject: newMessage.subject,
        content: newMessage.content,
        timestamp: new Date().toISOString(),
        readStatus: "unread", // New messages are unread by default for the receiver
      };

      setMessages((prev) => [...prev, sentMessage]); // Add to messages list
      setNewMessage({ receiver: "", subject: "", content: "" }); // Clear form
      setSubmissionStatus("success");
      setMessageFeedback("Message sent successfully!");
      console.log("Message sent successfully!", sentMessage);
    } catch (error) {
      setSubmissionStatus("error");
      setMessageFeedback("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    }
  };

  // Filter messages to show a simplified inbox view (e.g., messages sent to 'All' or current user)
  const displayedMessages = messages
    .filter(
      (msg) =>
        msg.receiver === "All" ||
        msg.receiver === currentSender ||
        msg.sender === currentSender
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ); // Sort by newest first

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Internal Messaging System
        </h1>
      </div>

      {/* Compose New Message Form */}
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Compose New Message
        </h2>
        <form onSubmit={handleSendMessage} className="space-y-6">
          <div>
            <Label htmlFor="receiver">To</Label>
            <Select
              id="receiver"
              value={newMessage.receiver}
              onChange={handleNewMessageChange}
              required
            >
              <option value="">Select Recipient</option>
              <option value="All">All Users</option>
              {mockUsers.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name} ({user.role})
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              type="text"
              placeholder="e.g., Important Update"
              value={newMessage.subject}
              onChange={handleNewMessageChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Message</Label>
            <textarea
              id="content"
              value={newMessage.content}
              onChange={handleNewMessageChange}
              placeholder="Type your message here..."
              rows={5}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>

          {messageFeedback && (
            <div
              className={`p-3 rounded-md text-sm ${
                submissionStatus === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {messageFeedback}
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white mt-6"
            disabled={submissionStatus === "submitting"}
          >
            {submissionStatus === "submitting" ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>

      {/* Message Inbox/List */}
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Your Messages
        </h2>
        <div className="space-y-4">
          {displayedMessages.length > 0 ? (
            displayedMessages.map((msg) => (
              <div
                key={msg.id}
                className="border border-gray-100 p-4 rounded-md bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {msg.subject}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      msg.readStatus === "unread"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {msg.readStatus.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">From:</span> {msg.sender} |{" "}
                  <span className="font-medium">To:</span> {msg.receiver} |{" "}
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
                <p className="text-gray-700">{msg.content}</p>
                {/* In a real application, clicking a message would mark it as read and show full details */}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
