import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout component wraps all pages within the (dashboard) route group.
 * It provides a consistent header and footer for authenticated routes.
 *
 * NOTE: In a real Next.js app, the <html> and <body> tags, along with global
 * CSS imports and metadata, would typically be in the root app/layout.tsx.
 * For this isolated environment, we are adjusting the structure to avoid
 * DOM nesting warnings.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-16"> {/* pt-16 to account for fixed header height */}
        {children}
      </main>
      <Footer />
    </div>
  );
}