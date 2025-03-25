import React, { useEffect, useRef, useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, LogIn } from 'lucide-react';
import AuthDialog from './AuthDialog';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/pages/Index';

const HeroSection = () => {
  const pixelRef = useRef<HTMLDivElement>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (pixelRef.current) {
        // Parallax effect for the pixels
        pixelRef.current.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Function to handle successful authentication
  const handleAuthSuccess = () => {
    setUser({
      isLoggedIn: true,
      balance: 5000, // Example balance in rubles
    });
    setIsAuthDialogOpen(false);
  };
  
  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10 bg-ajackal-black">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div 
            ref={pixelRef}
            className="absolute top-1/4 -left-20 w-72 h-72 bg-ajackal-purple opacity-20 rounded-full blur-3xl"
          />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-ajackal-pink opacity-15 rounded-full blur-3xl" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-16 md:pt-24 flex flex-col items-center">
        {/* Animated badge */}
        <div className="glass-morph px-4 py-1 rounded-full mb-6 animate-fade-in">
          <span className="text-sm font-medium text-ajackal-white/90">Технология будущего</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 max-w-3xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="ajackal-gradient-text">Anti-Jackal:</span> Ваш контент на новом уровне!
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-center text-ajackal-white/80 max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Революционная технология на базе нейросетей для автоматизированного улучшения качества фотографий и видео
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient text-white px-8 py-6 rounded-xl text-lg">
            <a href="#try">Попробовать бесплатно</a>
          </Button>
          
          {!user?.isLoggedIn && (
            <Button 
              variant="outline" 
              className="border-ajackal-purple/60 text-ajackal-white hover:bg-ajackal-purple/20 px-8 py-6 rounded-xl text-lg"
              onClick={() => setIsAuthDialogOpen(true)}
            >
              <LogIn className="mr-2 h-5 w-5" />
              Авторизуйтесь
            </Button>
          )}
        </div>
        
        {/* Image showcase with before/after effect */}
        <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden glass-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {/* Container with split view */}
          <div className="flex h-full">
            {/* Before image (low quality) */}
            <div className="w-1/2 h-full relative">
              <img 
                src="/img/HeroSection_1.png" 
                alt="Изображение до улучшения" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 glass-morph px-3 py-1 rounded-md z-10">
                <span className="text-sm font-medium">До</span>
              </div>
            </div>
            
            {/* After image (high quality) */}
            <div className="w-1/2 h-full relative">
              <img 
                src="/img/HeroSection_2.png" 
                alt="Изображение после улучшения" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 glass-morph px-3 py-1 rounded-md z-10">
                <span className="text-sm font-medium">После</span>
              </div>
            </div>
            
            {/* Vertical divider line */}
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <a 
          href="#features" 
          className="flex flex-col items-center gap-2 absolute bottom-8 left-1/2 transform -translate-x-1/2 text-ajackal-white/60 hover:text-ajackal-white transition-colors animate-fade-in cursor-pointer"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="text-sm">Узнать больше</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onClose={() => setIsAuthDialogOpen(false)} 
        onAuthSuccess={handleAuthSuccess}
      />
    </section>
  );
};

export default HeroSection;
