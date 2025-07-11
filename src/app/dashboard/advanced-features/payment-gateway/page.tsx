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
interface FeeInvoice {
  id: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  feeType: string;
}

// --- Mock Data ---
const mockInvoices: FeeInvoice[] = [
  {
    id: "INV001",
    studentName: "Alice Smith",
    amount: 1200.0,
    dueDate: "2025-07-15",
    status: "Pending",
    feeType: "Tuition",
  },
  {
    id: "INV002",
    studentName: "Bob Johnson",
    amount: 500.0,
    dueDate: "2025-06-30",
    status: "Overdue",
    feeType: "Transport",
  },
  {
    id: "INV003",
    studentName: "Charlie Brown",
    amount: 300.0,
    dueDate: "2025-07-20",
    status: "Pending",
    feeType: "Lab Fee",
  },
];

/**
 * PaymentGatewayPage component simulates a payment gateway integration.
 * Users can select an invoice and simulate making a payment.
 */
export default function PaymentGatewayPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  const availableInvoices = mockInvoices.filter((inv) => inv.status !== "Paid");
  const selectedInvoice = availableInvoices.find(
    (inv) => inv.id === selectedInvoiceId
  );

  const handleInvoiceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedInvoiceId(id);
    const invoice = availableInvoices.find((inv) => inv.id === id);
    if (invoice) {
      setPaymentAmount(invoice.amount.toFixed(2)); // Pre-fill with full amount
    } else {
      setPaymentAmount("");
    }
    setMessage(null); // Clear previous messages
  };

  const handlePaymentAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentAmount(e.target.value);
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("processing");
    setMessage(null);

    if (!selectedInvoiceId || !paymentAmount || !paymentMethod) {
      setMessage(
        "Please select an invoice, enter an amount, and choose a payment method."
      );
      setSubmissionStatus("error");
      return;
    }

    const amountToPay = parseFloat(paymentAmount);
    if (isNaN(amountToPay) || amountToPay <= 0) {
      setMessage("Please enter a valid payment amount.");
      setSubmissionStatus("error");
      return;
    }

    if (!selectedInvoice) {
      setMessage("Selected invoice not found.");
      setSubmissionStatus("error");
      return;
    }

    if (amountToPay > selectedInvoice.amount) {
      setMessage("Payment amount cannot exceed the invoice amount.");
      setSubmissionStatus("error");
      return;
    }

    try {
      // Simulate API call to a payment gateway
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      // In a real scenario, this would involve sending payment details to a backend
      // which then communicates with a payment gateway (e.g., Stripe, PayPal).
      // The response from the gateway would determine success/failure.

      console.log(`Processing payment for Invoice ID: ${selectedInvoiceId}`);
      console.log(`Amount: $${amountToPay}`);
      console.log(`Method: ${paymentMethod}`);

      // Simulate updating invoice status based on payment
      const updatedInvoiceStatus =
        amountToPay === selectedInvoice.amount ? "Paid" : "Pending"; // Simplified logic
      // In a real app, you'd update the actual mockInvoices array or backend
      console.log(
        `Invoice ${selectedInvoice.id} status updated to: ${updatedInvoiceStatus}`
      );

      setSubmissionStatus("success");
      setMessage(
        `Payment of $${amountToPay.toFixed(2)} for Invoice ${
          selectedInvoice.id
        } processed successfully via ${paymentMethod}!`
      );
      setSelectedInvoiceId("");
      setPaymentAmount("");
      setPaymentMethod("");

      // Optionally, refresh the list of invoices or update the status in the mock data
      // For this mock, we'll just log the update.
    } catch (error) {
      setSubmissionStatus("error");
      setMessage("Payment failed. Please try again or contact support.");
      console.error("Payment processing error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Gateway Integration
        </h1>
      </div>

      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Make a Payment
        </h2>
        <form onSubmit={handleProcessPayment} className="space-y-6">
          <div>
            <Label htmlFor="invoice-select">Select Invoice</Label>
            <Select
              id="invoice-select"
              value={selectedInvoiceId}
              onChange={handleInvoiceSelect}
              required
            >
              <option value="">-- Select an Invoice --</option>
              {availableInvoices.length > 0 ? (
                availableInvoices.map((invoice) => (
                  <option key={invoice.id} value={invoice.id}>
                    {invoice.id} - {invoice.studentName} ($
                    {invoice.amount.toFixed(2)}) - {invoice.feeType} (
                    {invoice.status})
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No pending or overdue invoices
                </option>
              )}
            </Select>
          </div>

          {selectedInvoice && (
            <div className="p-4 bg-blue-50 rounded-md border border-blue-200 text-sm text-gray-700">
              <p>
                <strong>Selected Invoice Details:</strong>
              </p>
              <p>Student: {selectedInvoice.studentName}</p>
              <p>Amount Due: ${selectedInvoice.amount.toFixed(2)}</p>
              <p>Due Date: {selectedInvoice.dueDate}</p>
              <p>Status: {selectedInvoice.status}</p>
            </div>
          )}

          <div>
            <Label htmlFor="paymentAmount">Payment Amount ($)</Label>
            <Input
              id="paymentAmount"
              type="number"
              placeholder="e.g., 1200.00"
              value={paymentAmount}
              onChange={handlePaymentAmountChange}
              min="0.01"
              step="0.01"
              required
              disabled={!selectedInvoiceId}
            />
          </div>

          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              id="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              required
              disabled={!selectedInvoiceId}
            >
              <option value="">-- Select Payment Method --</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Money">Mobile Money</option>
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
            disabled={submissionStatus === "processing" || !selectedInvoiceId}
          >
            {submissionStatus === "processing"
              ? "Processing Payment..."
              : "Process Payment"}
          </Button>
        </form>
      </div>
    </div>
  );
}
