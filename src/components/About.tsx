import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Target, Award, ArrowRight } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "AI Research Lead",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "PhD in Machine Learning with 8+ years in career analytics"
    },
    {
      name: "Marcus Johnson",
      role: "Product Director",
      image: "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Former career counselor turned tech innovator"
    },
    {
      name: "Elena Rodriguez",
      role: "UX Design Lead",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Passionate about creating intuitive user experiences"
    }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision",
      description: "We deliver accurate, data-driven career recommendations tailored to each individual."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Empowerment",
      description: "We believe everyone deserves access to personalized career guidance and growth opportunities."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Innovation",
      description: "We continuously evolve our AI technology to stay ahead of changing career landscapes."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from AI algorithms to user experience."
    }
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
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-accent-green/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent-purple/5 rounded-full blur-3xl"
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
            <span className="text-accent-purple font-medium">About Jobzilla</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
            Revolutionizing <span className="gradient-text">Career Discovery</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We're on a mission to democratize career guidance through AI, helping millions discover their true potential and build fulfilling professional lives.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h3>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Founded in 2023, Jobzilla emerged from a simple observation: traditional career guidance was failing the digital generation. Students and professionals were making life-changing decisions with limited, outdated information.
              </p>
              <p>
                Our team of AI researchers, career counselors, and technologists came together with a shared vision: to create an intelligent system that could provide personalized, data-driven career recommendations at scale.
              </p>
              <p>
                Today, we're proud to have helped over 100,000 individuals discover their ideal career paths, with our AI continuously learning and improving from every interaction.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              className="mt-8 flex items-center text-accent-blue hover:text-accent-purple transition-colors duration-300 font-semibold"
            >
              Learn More About Our Mission
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
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
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Team collaboration" 
                className="w-full h-80 object-cover rounded-2xl mb-6"
              />
              <div className="text-center">
                <h4 className="text-2xl font-bold mb-2">Innovation at Our Core</h4>
                <p className="text-gray-400">
                  Our diverse team combines expertise in AI, psychology, and career development to create breakthrough solutions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
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
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-3 group-hover:text-accent-blue transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-6 rounded-2xl border border-white/10 hover:border-accent-purple/30 transition-all duration-300 text-center group"
              >
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-accent-blue/20 group-hover:border-accent-purple/40 transition-colors duration-300"
                  />
                  <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 group-hover:from-accent-blue/30 group-hover:to-accent-purple/30 transition-all duration-300"></div>
                </div>
                <h4 className="text-xl font-semibold mb-2 group-hover:text-accent-blue transition-colors duration-300">
                  {member.name}
                </h4>
                <p className="text-accent-purple font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;