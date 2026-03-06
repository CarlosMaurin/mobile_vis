
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { Home, User, Briefcase, MessageSquare, Users, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Memoize navItems to prevent unnecessary re-renders of the observer effect
  const navItems = useMemo(() => [
    { name: 'Home', icon: <Home className="w-4 h-4" />, href: '#home' },
    { name: 'Services', icon: <Briefcase className="w-4 h-4" />, href: '#services' },
    { name: 'About', icon: <User className="w-4 h-4" />, href: '#about' },
    { name: 'Testimonials', icon: <MessageSquare className="w-4 h-4" />, href: '#testimonials' },
    { name: 'Clients', icon: <Users className="w-4 h-4" />, href: '#clients' },
  ], []);

  // Auto-update active tab based on scroll position (ScrollSpy)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchedItem = navItems.find(item => item.href === `#${id}`);
          if (matchedItem) {
            setActiveTab(matchedItem.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    ['home', 'services', 'about', 'clients', 'work-process', 'testimonials'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  // Handle Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  const restoreScroll = () => {
    document.body.style.overflow = 'auto';
  };

  const handleNavClick = (name: string, href: string) => {
    if (isOpen) setIsOpen(false);

    if (name === 'Home') {
      window.location.href = window.location.pathname;
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Variants for mobile menu
  // Fix: Added explicit Variants type and casting for ease/when to satisfy Framer Motion's strict typing
  const menuVariants: Variants = {
    hidden: { 
      opacity: 0,
      pointerEvents: 'none' as const 
    },
    visible: { 
      opacity: 1,
      pointerEvents: 'auto' as const,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      pointerEvents: 'none' as const,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.045,
        staggerDirection: -1,
        when: "afterChildren" as const
      }
    }
  };

  // Fix: Explicitly typed as Variants to handle easing string constants correctly
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 10 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 10,
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <>
      {/* DESKTOP NAV (Untouched logic and structure) */}
      <nav className="hidden md:flex fixed top-6 left-0 w-full z-[100] px-4 md:px-0 justify-center pointer-events-none">
        <div className="bg-white/30 backdrop-blur-[28px] backdrop-saturate-[180%] border border-white/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-full py-2 px-3 flex items-center gap-2 pointer-events-auto max-w-full overflow-x-auto no-scrollbar">
          <div className="px-4 border-r border-black/10 hidden sm:block">
            <span className="font-bold tracking-tighter text-xl text-primary drop-shadow-sm">V.I.S</span>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name, item.href)}
                className={`
                  relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 flex items-center gap-2 whitespace-nowrap
                  ${activeTab === item.name 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-dark hover:bg-black/10 hover:text-primary'
                  }
                `}
              >
                {activeTab !== item.name && item.icon}
                {item.name}
              </button>
            ))}
          </div>

          <div className="pl-2 border-l border-black/10">
            <button
              onClick={() => handleNavClick('Contact', '#contact')}
              className="flex justify-center gap-3 items-center mx-auto shadow-md text-sm bg-white/40 backdrop-blur-md font-bold isolation-auto border-white/50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-primary hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-5 py-2 overflow-hidden border-2 rounded-full group transition-colors duration-500 text-primary"
            >
              Contact
              <svg
                className="w-7 h-7 justify-end group-hover:rotate-90 group-hover:bg-white text-white ease-linear duration-300 rounded-full border border-primary/20 bg-accent group-hover:border-none p-1.5 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  className="fill-white group-hover:fill-primary"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV (Visible only below md) */}
      <div className="md:hidden fixed top-0 left-0 w-full z-[120] px-6 py-5 flex items-center justify-between pointer-events-auto">
        <motion.img 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          src="https://res.cloudinary.com/deit2ncmp/image/upload/v1767404186/New-Logo-3_o27t3b.png" 
          alt="V.I.S. Logo" 
          className="h-10 w-auto drop-shadow-md"
        />
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[130] w-12 h-12 flex items-center justify-center bg-white/40 backdrop-blur-lg rounded-full border border-white/50 shadow-lg text-primary transition-transform active:scale-95"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence onExitComplete={restoreScroll}>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-0 z-[115] md:hidden bg-dark/70 backdrop-blur-[30px] flex flex-col items-center justify-center p-10"
          >
            <div className="flex flex-col items-center space-y-8 w-full max-h-screen overflow-y-auto no-scrollbar">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  variants={itemVariants}
                  onClick={() => handleNavClick(item.name, item.href)}
                  className="group relative flex flex-col items-center"
                >
                  <span className={`text-4xl font-lemonmilk tracking-widest transition-colors duration-300 ${activeTab === item.name ? 'text-accent' : 'text-white/60 group-hover:text-white'}`}>
                    {item.name}
                  </span>
                  {activeTab === item.name && (
                    <motion.div 
                      layoutId="activeIndicatorMobile"
                      className="mt-2 h-1 w-8 bg-accent rounded-full"
                    />
                  )}
                </motion.button>
              ))}
              
              <motion.button
                variants={itemVariants}
                onClick={() => handleNavClick('Contact', '#contact')}
                className="mt-8 bg-primary text-white font-lemonmilk px-14 py-5 rounded-full text-lg tracking-[0.2em] shadow-2xl transition-all active:scale-95 hover:bg-accent"
              >
                CONTACT
              </motion.button>

              {/* Social Icons at the end */}
              <motion.div 
                variants={itemVariants}
                className="flex space-x-8 pt-10"
              >
                {[
                  { icon: 'fab fa-linkedin', href: '#' },
                  { icon: 'fab fa-instagram', href: '#' },
                  { icon: 'fab fa-facebook', href: '#' },
                  { icon: 'fab fa-whatsapp', href: '#' }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href}
                    className="text-white/30 hover:text-accent transition-all duration-300 transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`${social.icon} text-2xl md:text-3xl`}></i>
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
