import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Briefcase, Code, Mail } from 'lucide-react';

const FloatingSidebar = () => {
  const mouseY = useMotionValue(Infinity);
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'home', title: 'Home', icon: Home, href: '#home' },
    { id: 'experience', title: 'Experience', icon: Briefcase, href: '#experience' },
    { id: 'projects', title: 'Projects', icon: Code, href: '#projects' },
    { id: 'contact', title: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <motion.div
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
    >
      <div className="flex flex-col gap-6 p-4 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
        {navigationItems.map((item) => (
          <NavItem
            key={item.id}
            mouseY={mouseY}
            scrollY={scrollY}
            {...item}
          />
        ))}
      </div>
    </motion.div>
  );
};

const NavItem = ({ mouseY, scrollY, id, title, icon: Icon, href }) => {
  const ref = useRef(null);
  
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    const centerY = bounds.y + bounds.height / 2;
    return val - centerY;
  });

  // Calculate scroll distance with null checks and fallbacks
  const scrollDistance = useTransform(scrollY, (val) => {
    const targetId = href.replace('#', '');
    const section = document.getElementById(targetId);
    
    if (!section) {
      // Return a large number if section not found to minimize scaling
      return 1000;
    }

    const bounds = section.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const distanceFromCenter = Math.abs(bounds.top + bounds.height / 2 - viewportCenter);
    
    // Return the distance, with a minimum to prevent division by zero
    return Math.max(distanceFromCenter, 1);
  });

  const scale = useTransform(
    [distance, scrollDistance],
    ([mouseDistance, scrollDist]) => {
      // Use the smaller of the two distances to determine scale
      const dist = Math.min(Math.abs(mouseDistance), scrollDist);
      // Gradually scale down as distance increases, with a minimum scale of 1
      return Math.max(1, 1.5 - (dist / 200) * 0.5);
    }
  );

  const opacity = useTransform(
    [distance, scrollDistance],
    ([mouseDistance, scrollDist]) => {
      const dist = Math.min(Math.abs(mouseDistance), scrollDist);
      // Maintain minimum opacity of 0.6
      return Math.max(0.6, 1 - (dist / 200) * 0.4);
    }
  );

  const springConfig = { mass: 0.1, stiffness: 150, damping: 12 };
  const scaleSpring = useSpring(scale, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{
        scale: scaleSpring,
        opacity: opacitySpring,
      }}
      className="relative group"
      onClick={(e) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 
                   flex items-center justify-center border border-gray-800/50
                   hover:from-purple-600/30 hover:to-pink-600/30 transition-colors"
      >
        <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap
                   bg-gray-900/90 text-white px-3 py-1.5 rounded-lg text-sm
                   border border-gray-800/50 pointer-events-none"
      >
        {title}
      </motion.div>
    </motion.a>
  );
};

export default FloatingSidebar;