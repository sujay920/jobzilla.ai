import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, TrendingUp, Shield, Lightbulb, Award, Zap, Target } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart AI Analysis",
      description: "Our advanced AI analyzes your skills, interests, and market trends to provide accurate career recommendations.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personalized Matching",
      description: "Get matched with careers that align with your personality, values, and long-term aspirations.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Market Insights",
      description: "Stay informed about salary ranges, job growth, and industry trends for informed decision-making.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. We never share your personal information.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Skill Development",
      description: "Receive personalized learning paths and skill recommendations to advance your career journey.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Success Tracking",
      description: "Monitor your progress and celebrate milestones as you advance toward your career goals.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const stats = [
    { number: "100K+", label: "Students Guided", icon: <Users className="w-6 h-6" /> },
    { number: "98%", label: "Success Rate", icon: <Target className="w-6 h-6" /> },
    { number: "500+", label: "Career Paths", icon: <Zap className="w-6 h-6" /> },
    { number: "24/7", label: "AI Support", icon: <Brain className="w-6 h-6" /> }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/3 w-72 h-72 bg-accent-purple/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl"
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
            className="inline-flex items-center glass px-6 py-3 rounded-full border border-accent-blue/30 mb-6"
          >
            <Zap className="w-5 h-5 text-accent-blue mr-2 animate-pulse" />
            <span className="text-accent-blue font-medium">Powerful Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
            Why Choose <span className="gradient-text">Jobzilla AI</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of career guidance with our cutting-edge AI technology and personalized approach to professional development.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 card-hover group"
            >
              {/* Icon with Gradient Background */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white flex items-center justify-center h-full">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-accent-blue transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Line */}
              <div className="w-0 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mt-6 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-3xl border border-white/10 backdrop-blur-md"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple p-3 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white flex items-center justify-center h-full">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;