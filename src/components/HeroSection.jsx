import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaRss } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

const TypedText = ({ texts, speed = 100, delay = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          // Start deleting after a delay
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          // Move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const typingSpeed = isDeleting ? speed / 2 : speed;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentTextIndex, isDeleting, texts, speed, delay]);

  return (
    <span className="text-gradient">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const socialLinks = [
    { 
      icon: FaLinkedin, 
      href: "https://www.linkedin.com/in/harsh-pant2003/", 
      label: "LinkedIn",
      description: "Professional Network",
      color: "text-blue-500 hover:text-blue-400",
      bgColor: "group-hover:bg-blue-500/10",
      offset: "ml-0" // No offset for first item
    },
    { 
      icon: FaGithub, 
      href: "https://github.com/crockrocks", 
      label: "GitHub",
      description: "Open Source Projects",
      color: "text-gray-400 hover:text-gray-200",
      bgColor: "group-hover:bg-gray-500/10",
      offset: "ml-8" // Offset second item
    },
    { 
      icon: FaEnvelope, 
      href: "mailto:harshpant3703@gmail.com", 
      label: "Email",
      description: "Get In Touch",
      color: "text-red-500 hover:text-red-400",
      bgColor: "group-hover:bg-red-500/10",
      offset: "ml-20" // Smaller offset for third item
    },
    { 
      icon: FaRss, 
      href: "https://blog.harshpant.com", 
      label: "Blog",
      description: "Tech Insights",
      color: "text-orange-500 hover:text-orange-400",
      bgColor: "group-hover:bg-orange-500/10",
      offset: "ml-32" // Largest offset for last item
    }
  ];

  const professionalTitles = [
    "AI/ML Enthusiast",
    "Software Developer",
  ];

  return (
    <section id='home' className="section-container min-h-screen flex items-center">
      <div className="grid md:grid-cols-3 items-center gap-8">
        {/* Enhanced Social Links for Desktop with Staggered Layout */}
        <motion.div 
          className="hidden md:flex flex-col space-y-4 justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <h3 className="text-lg font-medium text-gray-300">
              Connect with me :
            </h3>
          </div>
          
          {socialLinks.map((link, index) => (
            <motion.a 
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group flex items-center space-x-3 
                transition-all duration-300 
                p-2 rounded-lg 
                ${link.bgColor}
                ${link.offset} // Apply the staggered offset
              `}
              whileHover={{ 
                x: 10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className={`
                  w-10 h-10 rounded-full 
                  flex items-center justify-center 
                  transition-all duration-300
                  ${link.color}
                `}
                whileHover={{ 
                  rotate: [0, 10, -10, 0],
                  scale: 1.1
                }}
              >
                <link.icon className="w-5 h-5" />
              </motion.div>
              <div>
                <h4 className={`
                  text-base font-medium 
                  text-gray-300 
                  group-hover:text-white 
                  transition-colors
                  ${link.color}
                `}>
                  {link.label}
                </h4>
                <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                  {link.description}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Profile Picture */}
        <motion.div 
          className="flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="relative group">
            <motion.div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 p-1 shadow-2xl"
              animate={{
                scale: isHovered ? 1.05 : 1,
                rotate: isHovered ? [0, 5, -5, 0] : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src="/assets/pedro.gif" 
                alt="Harsh Pant" 
                className="w-full h-full rounded-full object-cover border-4 border-gray-800/50 group-hover:border-purple-600/50 transition-all duration-300"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  rotate: isHovered ? [0, 2, -2, 0] : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          className="text-center md:text-left space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Hi, I'm <span className="gradient-text">Harsh Pant</span>
          </motion.h1>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl font-medium text-gray-300 mb-2">
              <TypedText texts={professionalTitles} />
            </p>
            <p className="text-base md:text-lg text-gray-400">
              I craft innovative solutions that push the boundaries of technology and make a meaningful impact.
            </p>
          </motion.div>


          <hr className="my-6 border-gray-700 md:hidden" />

          <motion.div 
            className="flex justify-center space-x-6 md:hidden mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  ${link.color} 
                  transition-all duration-300 
                  hover:scale-125
                `}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex justify-center md:block"
          >
            <a 
              href="#contact"
              className="gradient-button"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;