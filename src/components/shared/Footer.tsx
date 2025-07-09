// frontend/components/shared/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} SchoolManagementApp. All rights reserved.
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6">
          <a href="#" className="hover:text-blue-400 transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-200">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-200">
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
