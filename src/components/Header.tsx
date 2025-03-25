import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, Wallet, User, ChevronDown, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthDialog from './AuthDialog';
import TopUpBalanceDialog from './TopUpBalanceDialog';
import { UserContext } from '@/pages/Index';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  // Handle scroll event to style header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle successful authentication
  const handleAuthSuccess = () => {
    setUser({
      isLoggedIn: true,
      balance: 120, // Example balance in rubles
      email: 'user@example.com', // Add example email
    });
    setIsAuthDialogOpen(false);
  };

  // Handle successful balance top-up
  const handleTopUpSuccess = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        balance: user.balance + amount
      });
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    const email = user?.email || '';
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Extract username from email (everything before @)
  const getUsernameFromEmail = () => {
    const email = user?.email || '';
    if (email && email.includes('@')) {
      return email.split('@')[0];
    }
    return email;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-ajackal-black/80 backdrop-blur-md border-b border-white/10' 
          : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 md:h-16 md:w-16 relative">
            <img 
              src="/lovable-uploads/e9d475c9-91bf-4926-a570-a8c3c93fae65.png" 
              alt="Anti-Jackal Logo" 
              className="h-full w-full object-contain relative z-10"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl md:text-2xl lg:text-3xl ajackal-gradient-text">Anti-Jackal</span>
              <span className="text-xs font-medium bg-gradient-to-r from-ajackal-purple/30 to-ajackal-pink/30 border border-white/20 px-2 py-0.5 rounded-md backdrop-blur-sm text-white/90 shadow-sm">beta</span>
            </div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-ajackal-white/100 hover:text-ajackal-white transition-colors">
            Преимущества
          </a>
          <a href="#examples" className="text-ajackal-white/100 hover:text-ajackal-white transition-colors">
            Примеры
          </a>
          <a href="#contact" className="text-ajackal-white/100 hover:text-ajackal-white transition-colors">
            Контакты
          </a>
          
          {user && user.isLoggedIn ? (
            <div className="flex items-center gap-4">
              {/* Try Now Button comes before balance */}
              <Button className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient transition-all duration-300">
                <a href="#try">Попробовать бесплатно</a>
              </Button>
              
              {/* Balance button with clearer indication it can be topped up */}
              <Button 
                variant="outline" 
                className="border-ajackal-purple/60 text-ajackal-white hover:bg-ajackal-purple/20 flex items-center gap-2"
                onClick={() => setIsTopUpDialogOpen(true)}
              >
                <Wallet size={18} />
                <span>Баланс: {user.balance} ₽</span>
                <PlusCircle size={14} className="text-ajackal-purple/90" />
              </Button>
              
              {/* User account dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-ajackal-purple/60 text-ajackal-white hover:bg-ajackal-purple/20 flex items-center gap-2"
                  >
                    <Avatar className="h-6 w-6 mr-1">
                      <AvatarFallback className="bg-ajackal-purple/30 text-white text-xs">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{getUsernameFromEmail()}</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-ajackal-black border border-ajackal-purple/30 text-ajackal-white">
                  <DropdownMenuItem className="hover:bg-ajackal-purple/20" onClick={() => setUser(null)}>
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient transition-all duration-300">
                <a href="#try">Попробовать бесплатно</a>
              </Button>
              <Button 
                variant="outline" 
                className="border-ajackal-purple/60 text-ajackal-white hover:bg-ajackal-purple/20"
                onClick={() => setIsAuthDialogOpen(true)}
              >
                <LogIn size={18} className="mr-2" />
                Войти
              </Button>
            </>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-ajackal-white/90 hover:text-ajackal-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-ajackal-black/95 backdrop-blur-md border-b border-white/10 animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#features" 
              className="py-2 text-ajackal-white/90 hover:text-ajackal-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Преимущества
            </a>
            <a 
              href="#examples" 
              className="py-2 text-ajackal-white/90 hover:text-ajackal-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Примеры
            </a>
            <a 
              href="#contact" 
              className="py-2 text-ajackal-white/90 hover:text-ajackal-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Контакты
            </a>
            
            {user && user.isLoggedIn ? (
              <>
                <Button className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient transition-all duration-300 w-full">
                  <a href="#try">Попробовать бесплатно</a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-ajackal-purple/60 text-ajackal-white hover:bg-ajackal-purple/20 w-full flex items-center justify-between"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsTopUpDialogOpen(true);
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Wallet size={18} />
                    Баланс
                  </span>
                  <span className="font-medium flex items-center gap-1">
                    {user.balance} ₽
                    <PlusCircle size={14} className="text-ajackal-purple/90" />
                  </span>
                </Button>
                
                <div className="flex items-center gap-2 p-3 border border-ajackal-purple/30 rounded-md">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-ajackal-purple/30 text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                  <span className="block text-sm">{getUsernameFromEmail()}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-ajackal-white/70 hover:text-ajackal-white hover:bg-ajackal-purple/20 h-8 w-8 p-0"
                    onClick={() => setUser(null)}
                  >
                    <LogIn size={18} className="rotate-180" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient transition-all duration-300 w-full mt-2">
                  <a href="#try">Попробовать бесплатно</a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-ajackal-purple/60 text-ajackal-white hover:bg-ajackal-purple/20 w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthDialogOpen(true);
                  }}
                >
                  <LogIn size={18} className="mr-2" />
                  Войти
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onClose={() => setIsAuthDialogOpen(false)} 
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Top Up Balance Dialog */}
      <TopUpBalanceDialog
        isOpen={isTopUpDialogOpen}
        onClose={() => setIsTopUpDialogOpen(false)}
        onSuccess={handleTopUpSuccess}
      />
    </header>
  );
};

export default Header;
