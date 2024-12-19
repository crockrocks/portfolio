import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import FloatingSidebar from './components/FlaotingSidebar';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Global Background Gradient */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-black via-black to-gray-900 opacity-80 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
      />

      {/* Subtle Animated Background Shapes */}
      <motion.div 
        className="fixed top-1/4 left-1/4 w-64 h-64 bg-purple-900 rounded-full opacity-20 blur-3xl z-0"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="fixed bottom-1/4 right-1/4 w-48 h-48 bg-blue-900 rounded-full opacity-20 blur-3xl z-0"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, -10, 10, 0],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <FloatingSidebar />
      {/* Content with relative positioning */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}

export default App;