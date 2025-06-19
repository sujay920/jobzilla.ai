import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, TrendingUp, Shield, Lightbulb, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI Career Analysis",
      description: "Our advanced AI analyzes your skills, interests, and market trends to provide accurate career recommendations.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Personalized Matching",
      description: "Get matched with careers that align with your personality, values, and long-term goals.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Market Insights",
      description: "Stay informed about salary ranges, job growth, and industry trends for informed decision-making.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. We never share your personal information.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Skill Development",
      description: "Receive personalized learning paths and skill recommendations to advance your career.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Success Tracking",
      description: "Monitor your progress and celebrate milestones as you advance toward your career goals.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-accent-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Why Choose <span className="gradient-text">Jobzilla AI</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of career guidance with our cutting-edge AI technology and personalized approach.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 card-hover group"
            >
              {/* Icon with Gradient Background */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 glass p-8 rounded-2xl border border-white/10"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Students Guided" },
              { number: "95%", label: "Success Rate" },
              { number: "500+", label: "Career Paths" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;