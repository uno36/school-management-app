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
interface SMSLog {
  id: string;
  recipient: string; // Phone number or group name
  message: string;
  timestamp: string;
  status: "Sent" | "Failed";
}

interface UserGroup {
  id: string;
  name: string;
  members: string[]; // List of phone numbers
}

// --- Mock Data ---
const mockUserGroups: UserGroup[] = [
  {
    id: "G001",
    name: "All Parents",
    members: ["+11234567890", "+11234567891"],
  },
  { id: "G002", name: "Grade 5 Teachers", members: ["+11234567892"] },
  {
    id: "G003",
    name: "Grade 10 Students",
    members: ["+11234567893", "+11234567894"],
  },
];

const mockSmsLogs: SMSLog[] = [
  {
    id: "LOG001",
    recipient: "+11234567890",
    message: "Welcome to school!",
    timestamp: "2025-07-01T10:00:00Z",
    status: "Sent",
  },
  {
    id: "LOG002",
    recipient: "All Parents",
    message: "School holiday reminder.",
    timestamp: "2025-07-05T14:30:00Z",
    status: "Sent",
  },
  {
    id: "LOG003",
    recipient: "+11234567899",
    message: "Test message.",
    timestamp: "2025-07-08T09:00:00Z",
    status: "Failed",
  },
];

/**
 * SMSGatewayPage component simulates an SMS gateway integration.
 * Users can send bulk or individual SMS messages and view a log of sent messages.
 */
export default function SMSGatewayPage() {
  const [recipientType, setRecipientType] = useState<"individual" | "group">(
    "individual"
  );
  const [individualRecipient, setIndividualRecipient] = useState<string>("");
  const [groupRecipient, setGroupRecipient] = useState<string>("");
  const [messageContent, setMessageContent] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [messageFeedback, setMessageFeedback] = useState<string | null>(null);
  const [smsLogs, setSmsLogs] = useState<SMSLog[]>(mockSmsLogs);

  const handleRecipientTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRecipientType(e.target.value as "individual" | "group");
    setIndividualRecipient("");
    setGroupRecipient("");
    setMessageFeedback(null);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("sending");
    setMessageFeedback(null);

    let recipientIdentifier = "";
    let recipientsArray: string[] = [];

    if (recipientType === "individual") {
      if (!individualRecipient || !messageContent) {
        setMessageFeedback(
          "Please enter a recipient phone number and message content."
        );
        setSubmissionStatus("error");
        return;
      }
      recipientIdentifier = individualRecipient;
      recipientsArray = [individualRecipient];
    } else {
      // group
      if (!groupRecipient || !messageContent) {
        setMessageFeedback(
          "Please select a recipient group and enter message content."
        );
        setSubmissionStatus("error");
        return;
      }
      recipientIdentifier =
        mockUserGroups.find((g) => g.id === groupRecipient)?.name ||
        "Unknown Group";
      recipientsArray =
        mockUserGroups.find((g) => g.id === groupRecipient)?.members || [];
    }

    if (recipientsArray.length === 0) {
      setMessageFeedback("No valid recipients found for the selected option.");
      setSubmissionStatus("error");
      return;
    }

    try {
      // Simulate API call to an SMS gateway
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      const newLogId = `LOG${String(smsLogs.length + 1).padStart(3, "0")}`;
      const newLog: SMSLog = {
        id: newLogId,
        recipient: recipientIdentifier,
        message: messageContent,
        timestamp: new Date().toISOString(),
        status: "Sent", // Assume success for mock
      };

      setSmsLogs((prev) => [newLog, ...prev]); // Add new log to the beginning
      setNewMessageFieldsToDefault();
      setSubmissionStatus("success");
      setMessageFeedback(
        `Message sent successfully to ${recipientIdentifier}!`
      );
      console.log("SMS sent successfully!", newLog);
    } catch (error) {
      setSubmissionStatus("error");
      setMessageFeedback(
        "Failed to send SMS. Please try again or check gateway configuration."
      );
      console.error("SMS sending error:", error);
    }
  };

  const setNewMessageFieldsToDefault = () => {
    setIndividualRecipient("");
    setGroupRecipient("");
    setMessageContent("");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          SMS Gateway Integration
        </h1>
      </div>

      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Send SMS Notification
        </h2>
        <form onSubmit={handleSendMessage} className="space-y-6">
          <div>
            <Label htmlFor="recipientType">Recipient Type</Label>
            <Select
              id="recipientType"
              value={recipientType}
              onChange={handleRecipientTypeChange}
              required
            >
              <option value="individual">Individual Phone Number</option>
              <option value="group">Pre-defined Group</option>
            </Select>
          </div>

          {recipientType === "individual" ? (
            <div>
              <Label htmlFor="individualRecipient">
                Recipient Phone Number
              </Label>
              <Input
                id="individualRecipient"
                type="tel" // Use tel for phone numbers
                placeholder="e.g., +1234567890 (include country code)"
                value={individualRecipient}
                onChange={(e) => setIndividualRecipient(e.target.value)}
                required
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="groupRecipient">Recipient Group</Label>
              <Select
                id="groupRecipient"
                value={groupRecipient}
                onChange={(e) => setGroupRecipient(e.target.value)}
                required
              >
                <option value="">-- Select a Group --</option>
                {mockUserGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name} ({group.members.length} members)
                  </option>
                ))}
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="messageContent">Message Content</Label>
            <textarea
              id="messageContent"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type your SMS message here (max 160 characters for single SMS)..."
              rows={4}
              maxLength={160} // Typical SMS character limit
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
            <p className="text-right text-xs text-gray-500 mt-1">
              {messageContent.length} / 160 characters
            </p>
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
            disabled={submissionStatus === "sending"}
          >
            {submissionStatus === "sending" ? "Sending SMS..." : "Send SMS"}
          </Button>
        </form>
      </div>

      {/* SMS Log */}
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">SMS Log</h2>
        <div className="space-y-4">
          {smsLogs.length > 0 ? (
            smsLogs.map((log) => (
              <div
                key={log.id}
                className="border border-gray-100 p-4 rounded-md bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-md text-gray-900">
                    To: {log.recipient}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      log.status === "Sent"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {log.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Sent At:</span>{" "}
                  {new Date(log.timestamp).toLocaleString()}
                </p>
                <p className="text-gray-700 text-sm">{log.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No SMS messages sent yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
