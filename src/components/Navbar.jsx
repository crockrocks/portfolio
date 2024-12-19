import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { name: 'Home', href: '#home', delay: 0.1 },
    { name: 'Experience', href: '#experience', delay: 0.2 },
    { name: 'Projects', href: '#projects', delay: 0.3 },
    { name: 'Contact', href: '#contact', delay: 0.4 }
  ];

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar Content */}
      <div className="backdrop-blur-md bg-black/70 border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="gradient-text">Harsh Pant</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 group ${
                    activeSection === item.href.replace('#', '') 
                      ? 'text-purple-500' 
                      : 'text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full 
                               bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300`}
                    initial={false}
                    animate={activeSection === item.href.replace('#', '') ? { width: '100%' } : { width: '0%' }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-md bg-black/90 border-b border-gray-800/50"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: item.delay }}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-lg mb-2
                             ${activeSection === item.href.replace('#', '') 
                               ? 'bg-gray-800/50 text-purple-500' 
                               : 'text-gray-300'
                             } hover:bg-gray-800/30 transition-colors`}
                >
                  <span>{item.name}</span>
                  <ChevronRight 
                    className={`transform transition-transform ${
                      activeSection === item.href.replace('#', '') ? 'translate-x-1' : ''
                    }`}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;