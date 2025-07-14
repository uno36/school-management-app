"use client";

import Link from "next/link";
import React from "react";

// --- Mock Shadcn UI Component Mockups ---
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

// --- End Mock Shadcn UI Component Mockups ---

const TimetableLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8 font-sans text-gray-800 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Timetable Management
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Select a timetable type to view or manage schedules.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/dashboard/timetable/daily">
            <Button className="w-full sm:w-auto px-8 py-3 text-lg">
              Daily Timetable
            </Button>
          </Link>
          <Link href="/dashboard/timetable/exam">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-3 text-lg"
            >
              Exam Timetable
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TimetableLandingPage;
