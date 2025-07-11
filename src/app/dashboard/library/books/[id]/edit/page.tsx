"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams
import Image from "next/image";

// --- Mock Shadcn UI Component Mockups (same as before) ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
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
  ({ className, children, ...props }, ref) => (
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
  )
);
Select.displayName = "Select";
// --- End Shadcn UI Component Mockups ---

interface BookDetails {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publicationYear: string;
  publisher: string;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverImageUrl: string;
  status: "Available" | "Borrowed" | "Lost" | "Reserved";
}

// Mock data
const allMockBookData: BookDetails[] = [
  {
    id: "B001",
    title: "The Great Adventures",
    author: "A.B. Author",
    isbn: "978-1234567890",
    genre: "Adventure",
    publicationYear: "2010",
    publisher: "Adventure House",
    totalCopies: 5,
    availableCopies: 3,
    description:
      "A thrilling tale of exploration and discovery across uncharted lands.",
    coverImageUrl:
      "https://placehold.co/150x200/aabbcc/ffffff?text=Book+Cover+1",
    status: "Available",
  },
  {
    id: "B002",
    title: "Science for Kids",
    author: "Dr. S. Scientist",
    isbn: "978-0987654321",
    genre: "Education",
    publicationYear: "2022",
    publisher: "Knowledge Publishers",
    totalCopies: 10,
    availableCopies: 8,
    description:
      "An engaging introduction to scientific concepts for young learners.",
    coverImageUrl:
      "https://placehold.co/150x200/ccbbaa/ffffff?text=Book+Cover+2",
    status: "Available",
  },
  {
    id: "B003",
    title: "History of the World",
    author: "H. Historian",
    isbn: "978-1122334455",
    genre: "History",
    publicationYear: "2005",
    publisher: "Ancient Texts Co.",
    totalCopies: 3,
    availableCopies: 0,
    description:
      "A comprehensive overview of global history from ancient times to the modern era.",
    coverImageUrl:
      "https://placehold.co/150x200/ccddff/ffffff?text=Book+Cover+3",
    status: "Borrowed",
  },
  {
    id: "B004",
    title: "Math Fundamentals",
    author: "M. Mathematician",
    isbn: "978-9988776655",
    genre: "Education",
    publicationYear: "2018",
    publisher: "Numeric Press",
    totalCopies: 7,
    availableCopies: 7,
    description:
      "Essential mathematical principles explained with clear examples and exercises.",
    coverImageUrl:
      "https://placehold.co/150x200/ddeeff/ffffff?text=Book+Cover+4",
    status: "Available",
  },
];

export default function EditBookPage() {
  const params = useParams();
  const bookId = Array.isArray(params.id) ? params.id[0] : params.id; // ✅ Extract book ID

  const [formData, setFormData] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      setLoading(true);
      setError(null);

      if (!bookId) {
        setError("No Book ID provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        const foundBook = allMockBookData.find((b) => b.id === bookId);
        if (foundBook) {
          setFormData(JSON.parse(JSON.stringify(foundBook)));
        } else {
          setError(`Book with ID "${bookId}" not found for editing.`);
        }
      } catch (err) {
        setError("Failed to load book data for editing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [id]:
              id === "totalCopies" || id === "availableCopies"
                ? parseInt(value) || 0
                : value,
          }
        : null
    );
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) =>
        prev ? { ...prev, coverImageUrl: imageUrl } : null
      );
    } else {
      setFormData((prev) => (prev ? { ...prev, coverImageUrl: "" } : null));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log("Updated Book Data:", formData);
      alert("Book updated successfully! Check console for data.");
    }
  };

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Fantasy",
    "Mystery",
    "Biography",
    "Education",
    "Adventure",
    "Children",
  ];
  const currentYear = new Date().getFullYear();
  const publicationYears = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString()
  );
  const bookStatuses = ["Available", "Borrowed", "Lost", "Reserved"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">
          Loading book data for editing...
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

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Book not found for editing.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Book: {formData.title}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Book Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., The Secret Garden"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                type="text"
                placeholder="e.g., Frances Hodgson Burnett"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                type="text"
                placeholder="e.g., 978-0123456789"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Select
                id="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                <option value="">Select Genre</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="publicationYear">Publication Year</Label>
              <Select
                id="publicationYear"
                value={formData.publicationYear}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {publicationYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                type="text"
                placeholder="e.g., Penguin Books"
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalCopies">Total Copies</Label>
              <Input
                id="totalCopies"
                type="number"
                placeholder="e.g., 5"
                value={formData.totalCopies}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div>
              <Label htmlFor="availableCopies">Available Copies</Label>
              <Input
                id="availableCopies"
                type="number"
                placeholder="e.g., 3"
                value={formData.availableCopies}
                onChange={handleChange}
                min="0"
                max={formData.totalCopies}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {bookStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Brief summary of the book."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div>
            <Label htmlFor="coverImageUrl">Book Cover Image</Label>
            <Input
              id="coverImageUrl"
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
            />
            {formData.coverImageUrl && (
              <Image
                width={200}
                height={200}
                src={formData.coverImageUrl}
                alt="Book Cover"
                className="mt-4 h-32 w-auto object-contain rounded-md shadow-sm"
              />
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white mt-6"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
