import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const socialLinks = [
    { 
      icon: Github,
      href: 'https://github.com/crockrocks',
      label: 'Github',
      color: 'group-hover:text-purple-500',
      delay: 0.1
    },
    { 
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/harsh-pant2003/',
      label: 'LinkedIn',
      color: 'group-hover:text-blue-500',
      delay: 0.2
    },
    { 
      icon: Mail,
      href: 'mailto:harshpant3703@gmail.com',
      label: 'Email',
      color: 'group-hover:text-pink-500',
      delay: 0.3
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20" />
      
      {/* Content */}
      <div className="relative border-t border-gray-800/50 backdrop-blur-sm bg-black/50">
        <div className="container mx-auto px-4 py-12">
          {/* Scroll to top button */}
          <motion.button
            onClick={scrollToTop}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       bg-gradient-to-r from-purple-600 to-pink-600 
                       p-3 rounded-full group hover:scale-110 transition-transform"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </motion.button>

          {/* Social Links */}
          <div className="flex flex-col items-center justify-center space-y-8 mb-8">
            <div className="flex justify-center space-x-8">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 hover:scale-110 transition-transform
                             bg-gray-900/50 rounded-lg border border-gray-800/50`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: link.delay }}
                  onHoverStart={() => setHoveredIcon(index)}
                  onHoverEnd={() => setHoveredIcon(null)}
                >
                  <link.icon 
                    className={`w-6 h-6 transition-colors duration-300 ${link.color}`} 
                  />
                  
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredIcon === index ? 1 : 0,
                      y: hoveredIcon === index ? 0 : 10
                    }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 
                               bg-gray-900 text-white px-3 py-1 rounded-lg text-sm
                               whitespace-nowrap"
                  >
                    {link.label}
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <motion.div 
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Heart className="w-4 h-4 text-red-500 inline" />
              </motion.div>
              <span>by Harsh Pant</span>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;