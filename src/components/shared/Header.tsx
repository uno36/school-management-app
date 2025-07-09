// frontend/components/shared/Header.tsx
"use client"

// frontend/components/shared/Header.tsx
import React, { useState } from 'react'; // Import useState

// Mock Shadcn UI Button component (assuming it's available or defined elsewhere)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    const variantClasses = {
      default: 'bg-blue-600 text-white hover:bg-blue-700', // Adjusted for header theme
      outline: 'border border-blue-400 bg-transparent text-blue-600 hover:bg-blue-50',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      ghost: 'hover:bg-gray-100 hover:text-gray-900',
      link: 'text-blue-600 underline-offset-4 hover:underline',
    };
    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
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
Button.displayName = 'Button';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between min-w-[275px]"> {/* Ensure minimum width handling */}
        {/* Logo/App Name */}
        <div className="flex items-center flex-shrink-0"> {/* flex-shrink-0 to prevent shrinking */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="text-xl sm:text-2xl font-bold text-gray-800 whitespace-nowrap">SchoolManagementApp</span> {/* Adjusted font size for smaller screens */}
        </div>

        {/* Navigation (for larger screens) */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
            Dashboard
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
            Students
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
            Staff
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
            Academics
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
            Finance
          </a>
        </nav>

        {/* User Actions / Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4"> {/* Adjusted spacing for smaller screens */}
          {/* Profile button: visible on all screens, text hidden on very small screens */}
          <Button variant="ghost" size="sm" className="flex items-center md:inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="hidden sm:inline">Profile</span> {/* Hide text on very small screens */}
          </Button>

          {/* Logout button: hidden on mobile, visible on desktop */}
          <div className="hidden md:block">
            <Button variant="default" size="sm">
              Logout
            </Button>
          </div>

          {/* Hamburger button: visible on mobile, hidden on desktop */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}>
          {/* Adjusted width to be full on small screens, with padding */}
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-lg p-6 animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                {/* Close icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-lg py-2" onClick={toggleMobileMenu}>
                Dashboard
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-lg py-2" onClick={toggleMobileMenu}>
                Students
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-lg py-2" onClick={toggleMobileMenu}>
                Staff
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-lg py-2" onClick={toggleMobileMenu}>
                Academics
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-lg py-2" onClick={toggleMobileMenu}>
                Finance
              </a>
              <hr className="my-2 border-gray-200" />
              <Button variant="ghost" className="justify-start text-lg" onClick={toggleMobileMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Profile
              </Button>
              <Button variant="default" className="w-full justify-center text-lg" onClick={toggleMobileMenu}>
                Logout
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
