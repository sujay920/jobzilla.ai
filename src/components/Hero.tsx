import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Target, Brain } from 'lucide-react';

const Hero = () => {
  const scrollToCareerSection = () => {
    document.querySelector('#careers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://my.spline.design/untitled-8V8gOwxGE8o2v0ztlRfQ5tzD/"
          className="w-full h-full border-none"
          style={{ pointerEvents: 'none' }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-dark-900/30 backdrop-blur-sm"></div>
      </div>

      {/* Enhanced Neon Glow Effects */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-blue/15 rounded-full blur-3xl animate-pulse"
          style={{ 
            boxShadow: '0 0 100px rgba(0, 191, 255, 0.2), 0 0 200px rgba(0, 191, 255, 0.1)' 
          }}
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/15 rounded-full blur-3xl animate-pulse"
          style={{ 
            boxShadow: '0 0 120px rgba(139, 92, 246, 0.2), 0 0 240px rgba(139, 92, 246, 0.1)' 
          }}
        />
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent-pink/8 to-transparent rounded-full"
          style={{ 
            boxShadow: '0 0 150px rgba(236, 72, 153, 0.15)' 
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="glass px-6 py-3 rounded-full border border-accent-blue/30 flex items-center space-x-3 backdrop-blur-md">
                <Brain className="w-5 h-5 text-accent-blue animate-pulse" />
                <span className="text-accent-blue font-medium">Built in 2025 • AI-Powered</span>
                <Sparkles className="w-5 h-5 text-accent-purple animate-pulse" />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-poppins mb-6 leading-tight"
              style={{ textShadow: '0 0 30px rgba(0, 191, 255, 0.3)' }}
            >
              Your Dream Career
              <br />
              <span className="gradient-text">Awaits Discovery</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto"
              style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.1)' }}
            >
              Unlock your potential with AI-driven career recommendations. A personal project inspired by 2025's AI innovation.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCareerSection}
              className="btn-primary px-10 py-4 rounded-full font-semibold text-lg flex items-center justify-center group shadow-2xl"
              style={{ 
                boxShadow: '0 0 30px rgba(0, 191, 255, 0.4), 0 10px 25px rgba(0, 0, 0, 0.3)' 
              }}
            >
              Get Career Recommendations
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass px-10 py-4 rounded-full font-semibold text-lg border border-white/20 hover:border-accent-blue/50 transition-all duration-300 backdrop-blur-md"
              style={{ 
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' 
              }}
            >
              Explore Features
            </motion.button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                icon: <Zap className="w-10 h-10" />,
                title: "AI-Powered Analysis",
                description: "Advanced algorithms analyze your profile for perfect matches",
                color: "from-accent-blue to-accent-purple"
              },
              {
                icon: <Target className="w-10 h-10" />,
                title: "Precision Matching",
                description: "Get recommendations tailored specifically to your goals",
                color: "from-accent-purple to-accent-pink"
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: "Future-Ready Insights",
                description: "Built with 2025's latest AI technologies",
                color: "from-accent-pink to-accent-blue"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 card-hover group backdrop-blur-md"
                style={{ 
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)' 
                }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  <div className="text-white flex items-center justify-center h-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-3 group-hover:text-accent-blue transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer hover:border-accent-blue/50 transition-colors duration-300"
          onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ 
            boxShadow: '0 0 15px rgba(0, 191, 255, 0.2)' 
          }}
        >
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-accent-blue to-accent-purple rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;