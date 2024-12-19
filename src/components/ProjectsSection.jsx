import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Layers } from 'lucide-react';

const projects = [
  {
    title: 'Interview Assist',
    description: 'Scalable SaaS platform using LLMs and NLP to automate recruitment.',
    technologies: ['Python','LLMs', 'Retrieval Augmented Generation', 'TypeScript', 'React', 'Flask', 'MongoDB'],
    githubLink: 'https://github.com/crockrocks/InterviewAssist',
    liveLink: '#',
    image: '/assets/InterviewAssist.png',
    icon: Code
  },
  {
    title: 'BUD',
    description: 'Platform for mental health awareness  with personalized user experiences and characters.',
    technologies: ['Python', 'LLMs', 'Retrieval Augmented Generation', 'TypeScript', 'React', 'Flask', 'MongoDB'],
    githubLink: 'https://github.com/crockrocks/BUD',
    liveLink: 'https://bud-web-eight.vercel.app/',
    image: '/assets/bud.png',
    icon: Code
  },  
  {
    title: 'Dog Breed Classifier',
    description: 'Image classification model to identify dog breeds with 90% accuracy.',
    technologies: ['TensorFlow', 'MobileNetV2', 'Python'],
    githubLink: 'https://github.com/crockrocks/Dog_Breed_Classifier',
    liveLink: '#',
    image: '/assets/dog-breed-classification.webp',
    icon: Code
  },
  {
    title: 'Text Summarization',
    description: 'Implemented summarization using TF-IDF and transformers.Implementation of research paper Get To The Point',
    technologies: ['Scikit-Learn', 'Transformers', 'Hugging Face', 'Python'],
    githubLink: 'https://github.com/crockrocks/text-summarization',
    liveLink: 'https://huggingface.co/spaces/crockrocks/text-summarization',
    image: '/assets/text_summarisation.png',
    icon: Code
  },
  {
    title: 'Customer Segmentation',
    description: 'Implemented customer segmentation using clustering and ML pipelines. To help a business analyse its customers',
    technologies: ['Pandas', 'Numpy', 'Scikit-Learn', 'Matplotlib', 'Python' , 'Machine learning'],
    githubLink: 'https://github.com/crockrocks/Fastai',
    liveLink: '#',
    image: '/assets/customer_segmentation.png',
    icon: Code
  },  
  
];

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const ProjectIcon = project.icon;

  return (
    <motion.div 
      ref={cardRef}
      className="project-card relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
    >
      {/* Glow Effect */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                    blur-3xl z-0`}
        animate={isHovered ? { 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Project Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
        />
      </div>

      {/* Project Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div>
          {/* Project Title with Icon */}
          <div className="flex items-center space-x-3 mb-3">
            <ProjectIcon 
              className={`w-6 h-6 transition-colors duration-300 
                          ${isHovered ? 'text-purple-500' : 'text-gray-400'}`} 
            />
            <h3 className="text-2xl font-bold gradient-text">{project.title}</h3>
          </div>

          {/* Description */}
          <p className={`text-gray-300 mb-4 transition-all duration-300 
                         ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'}`}>
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <motion.span 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0.7, 
                  y: isHovered ? 0 : 10 
                }}
                transition={{ delay: index * 0.1 }}
                className={`px-2 py-1 bg-gray-800/50 rounded-md text-xs 
                            transition-colors duration-300
                            ${isHovered ? 'text-white' : 'text-gray-400'}`}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Project Links */}
        <motion.div 
          className={`flex space-x-3 transition-all duration-500 
                      ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <motion.a 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 360 }}
            className="text-gray-300 hover:text-purple-500 transition-colors"
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a 
            href={project.liveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 360 }}
            className="text-gray-300 hover:text-pink-500 transition-colors"
          >
            <ExternalLink className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-container">
      <motion.h2 
        className="section-heading"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>
      
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.1
            }
          }
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsSection;