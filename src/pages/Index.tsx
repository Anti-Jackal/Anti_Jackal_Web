import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ExamplesSection from '@/components/ExamplesSection';
import TryNowSection from '@/components/TryNowSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Define a mock user type
interface User {
  isLoggedIn: boolean;
  balance: number;
  email?: string;
}

// Create a user context to share user state across components
export const UserContext = React.createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => null,
});

const Index = () => {
  // Mock user state - In a real app, this would be managed by context
  const [user, setUser] = useState<User | null>(null);

  // Smooth scroll to sections when navigating
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    // Run once on mount for direct URL access with hash
    handleHashChange();

    // Add event listener for future hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen bg-ajackal-black text-ajackal-white antialiased overflow-x-hidden">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ExamplesSection />
          <TryNowSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default Index;
