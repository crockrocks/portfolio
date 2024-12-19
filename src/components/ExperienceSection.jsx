import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    company: 'PharynxAI',
    role: 'Junior Software Developer',
    duration: 'July 2024 - Present',
    description: 'Optimized Generative AI workflows with ComfyUI and Stable Diffusion, improving efficiency by 20% and scalability by 20% through parallel processing and chunking. Reduced experimentation cycles by 30% using Runpod and Hugging Face.',
    technologies: ['Python', 'Generative AI','ComfyUI', 'Stable Diffusion', 'Runpod', 'Hugging Face'],
    achievements: ['Boosted AI workflow efficiency by 20%', 'Enhanced scalability by 20% through parallel processing', 'Reduced experimentation cycles by 30%']
  },
  {
    company: 'Deepmindz Innovations',
    role: 'AI/ML Intern',
    duration: 'Jan 2024 – June 2024',
    description: 'Researched and developed custom pipelines for Generative AI tasks including voice cloning, lip-sync, Stable Diffusion, image inpainting, and deepfake. Fine-tuned LLMs and Stable Diffusion models, improving performance by 15%.',
    technologies: ['Generative AI', 'Stable Diffusion', 'LLMs', 'Deepfake', 'Voice Cloning', 'Lip-sync', 'Image Inpainting'],
    achievements: ['Developed custom pipelines for AI tasks', 'Improved model performance by 15%']
  },
  {
    company: 'ResoluteAI Software',
    role: 'Machine Learning Intern',
    duration: 'Nov 2023 – Jan 2024',
    description: 'Enhanced real-time object detection pipeline by 10-15% through data annotation using Roboflow and training YOLOv5. Collaborated with a team to test and validate model quality for production environments.',
    technologies: ['Python', 'Machine Learning' , 'Computer Vision' ,'YOLOv5'],
    achievements: ['Improved object detection pipeline efficiency by 10-15%', 'Collaborated with team to ensure model robustness']
  }
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <section id="experience" className="section-container px-4 md:px-8" ref={ref}>
      <motion.h2 
        className="section-heading mb-8 md:mb-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Professional Journey
      </motion.h2>

      <div className="relative">
        {/* Vertical Timeline Line - Hidden on mobile, visible on md+ */}
        <motion.div 
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 to-pink-500 h-full"
          style={{
            scaleY: scrollYProgress,
            transformOrigin: 'top'
          }}
        />

        {/* Mobile Timeline Line */}
        <motion.div 
          className="md:hidden absolute left-4 top-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 h-full"
          style={{
            scaleY: scrollYProgress,
            transformOrigin: 'top'
          }}
        />

        <div className="space-y-8 md:space-y-16 relative">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className={`flex items-center w-full ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              } flex-col md:flex-row`}
              initial={{ opacity: 0, x: 0, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
            >
              {/* Glowing Dot - Adjusted for mobile */}
              <motion.div 
                className="absolute md:left-1/2 left-4 transform md:-translate-x-1/2 z-20"
                style={{
                  scale: scrollYProgress.get() > (index + 1) / experiences.length ? 1.5 : 1
                }}
              >
                <div className="w-4 h-4 md:w-6 md:h-6 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse" />
              </motion.div>

              {/* Experience Card - Adjusted for mobile */}
              <div className={`w-full md:w-[calc(50%-4rem)] pl-12 md:pl-0 ${
                index % 2 === 0 ? 'md:mr-auto md:pl-16' : 'md:ml-auto md:pr-16'
              }`}>
                <motion.div 
                  className="card space-y-3 shadow-2xl border-2 border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 p-4 md:p-6"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)"
                  }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold gradient-text">{exp.company}</h3>
                  <p className="text-lg md:text-xl text-purple-300">{exp.role}</p>
                  <p className="text-xs md:text-sm text-gray-400">{exp.duration}</p>
                  <p className="text-sm md:text-base text-gray-300 mb-4">{exp.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-400 text-sm md:text-base">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="px-2 py-1 bg-purple-900/50 text-purple-200 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <h4 className="font-semibold text-purple-400 text-sm md:text-base">Key Achievements:</h4>
                    <ul className="list-disc list-inside text-gray-300 text-xs md:text-sm space-y-1">
                      {exp.achievements.map((achievement, achieveIndex) => (
                        <li key={achieveIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;