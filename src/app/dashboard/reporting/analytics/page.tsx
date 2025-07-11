import React from "react";

// --- Mock Shadcn UI Component Mockups (Integrated for self-contained execution) ---
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

/**
 * ReportingAnalyticsPage component serves as a landing page for various reports and analytics.
 * In a full implementation, this would link to specific report generation pages or display dashboards.
 */
export default function ReportingAnalyticsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Reporting & Analytics
        </h1>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="space-y-8">
          <p className="text-gray-700 text-lg mb-6">
            Welcome to the Reporting & Analytics dashboard. From here, you can
            access various reports and insights related to student performance,
            attendance, financial data, and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Academic Reports Card */}
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Academic Reports
              </h3>
              <p className="text-gray-700 mb-4">
                Generate reports on student grades, performance trends, and
                subject-wise analysis.
              </p>
              <Link href="/dashboard/academic/report-cards">
                {" "}
                {/* Placeholder link */}
                <Button variant="outline" className="w-full">
                  View Academic Reports
                </Button>
              </Link>
            </div>

            {/* Attendance Reports Card */}
            <div className="p-6 bg-green-50 rounded-lg border border-green-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Attendance Reports
              </h3>
              <p className="text-gray-700 mb-4">
                Track student and staff attendance, identify patterns, and
                generate summary reports.
              </p>
              <Link href="#">
                {" "}
                {/* Placeholder link */}
                <Button variant="outline" className="w-full">
                  View Attendance Reports
                </Button>
              </Link>
            </div>

            {/* Financial Reports Card */}
            <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Financial Reports
              </h3>
              <p className="text-gray-700 mb-4">
                Access detailed reports on fee collections, expenses, payroll,
                and budget analysis.
              </p>
              <Link href="/dashboard/financials/">
                {" "}
                {/* Placeholder link */}
                <Button variant="outline" className="w-full">
                  View Financial Reports
                </Button>
              </Link>
            </div>

            {/* Staff Reports Card */}
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Staff Reports
              </h3>
              <p className="text-gray-700 mb-4">
                Generate reports on staff profiles, workload, and performance
                metrics.
              </p>
              <Link href="/dashboard/staff">
                {" "}
                {/* Placeholder link */}
                <Button variant="outline" className="w-full">
                  View Staff Reports
                </Button>
              </Link>
            </div>

            {/* Custom Reports Card */}
            <div className="p-6 bg-red-50 rounded-lg border border-red-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Custom Reports
              </h3>
              <p className="text-gray-700 mb-4">
                Create and save custom reports based on specific criteria and
                data points.
              </p>
              <Link href="/dashboard/reporting">
                {" "}
                {/* Placeholder link */}
                <Button variant="outline" className="w-full">
                  Create Custom Report
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-4">
              A visual dashboard providing key performance indicators (KPIs) and
              trends at a glance. This section would integrate charts and graphs
              for quick data interpretation.
            </p>
            <Button variant="default">Go to Analytics Dashboard</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
