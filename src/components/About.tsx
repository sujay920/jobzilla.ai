import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Code, Lightbulb, ArrowRight } from 'lucide-react';

const About = () => {
  const inspirations = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI & Machine Learning",
      description: "Inspired by cutting-edge AI technologies and their potential to transform career guidance."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Modern Web Development",
      description: "Built with React, TypeScript, and modern web technologies for optimal performance."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "User-Centric Design",
      description: "Focused on creating an intuitive and engaging experience for career discovery."
    }
  ];

  const technologies = [
    "React & TypeScript",
    "Framer Motion",
    "Tailwind CSS",
    "AI Integration",
    "Responsive Design",
    "Modern UI/UX"
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-accent-green/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent-purple/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center glass px-6 py-3 rounded-full border border-accent-purple/30 mb-6"
          >
            <Sparkles className="w-5 h-5 text-accent-purple mr-2 animate-pulse" />
            <span className="text-accent-purple font-medium">About This Project</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
            Built with <span className="gradient-text">AI Innovation</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A personal project created in 2025, inspired by AI classes and the vision to make career guidance more accessible through intelligent technology.
          </p>
        </motion.div>

        {/* Project Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">The Vision</h3>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Jobzilla AI was born from a simple yet powerful idea: what if we could use artificial intelligence to help people discover their perfect career path? Inspired by my AI classes in 2025, this project represents the intersection of technology and human potential.
              </p>
              <p>
                The challenge was clear - traditional career guidance often feels generic and outdated. Students and professionals deserve personalized, data-driven insights that consider their unique skills, interests, and the evolving job market.
              </p>
              <p>
                This project showcases how modern AI can be applied to solve real-world problems, creating meaningful connections between people and their ideal careers through intelligent analysis and recommendation systems.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass p-8 rounded-3xl border border-white/10">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="AI and technology" 
                className="w-full h-80 object-cover rounded-2xl mb-6"
              />
              <div className="text-center">
                <h4 className="text-2xl font-bold mb-2">AI-Powered Innovation</h4>
                <p className="text-gray-400">
                  Combining machine learning algorithms with intuitive design to create the future of career discovery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Inspiration Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Project Inspiration</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {inspirations.map((inspiration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass p-6 rounded-2xl border border-white/10 hover:border-accent-blue/30 transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple p-4 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white flex items-center justify-center h-full">
                    {inspiration.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-3 group-hover:text-accent-blue transition-colors duration-300">
                  {inspiration.title}
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {inspiration.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies Used */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-3xl border border-white/10 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8">Built With Modern Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass p-4 rounded-xl border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300"
              >
                <span className="text-accent-blue font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            This project demonstrates the power of combining modern web technologies with AI concepts learned in 2025, 
            creating a seamless and intelligent user experience for career discovery.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;