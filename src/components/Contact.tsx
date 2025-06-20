import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, CheckCircle, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, label: "GitHub", href: "#" },
    { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", href: "#" },
    { icon: <Twitter className="w-6 h-6" />, label: "Twitter", href: "#" }
  ];

  const faqs = [
    {
      question: "How does the AI recommendation work?",
      answer: "The AI analyzes your skills, interests, and market data to provide personalized career matches using advanced machine learning algorithms."
    },
    {
      question: "Is this project open source?",
      answer: "This is a personal project created in 2025. Feel free to reach out if you'd like to learn more about the implementation."
    },
    {
      question: "What technologies were used?",
      answer: "Built with React, TypeScript, Tailwind CSS, Framer Motion, and modern AI integration techniques learned in 2025."
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: [0, 80, 0],
            y: [0, -40, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-purple/10 rounded-full blur-3xl"
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
            className="inline-flex items-center glass px-6 py-3 rounded-full border border-accent-green/30 mb-6"
          >
            <MessageCircle className="w-5 h-5 text-accent-green mr-2 animate-pulse" />
            <span className="text-accent-green font-medium">Get In Touch</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about the project or want to discuss AI and career technology? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-white/20 rounded-xl focus:border-accent-blue focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-white/20 rounded-xl focus:border-accent-blue focus:outline-none transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-800 border border-white/20 rounded-xl focus:border-accent-blue focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="project">About the Project</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/20 rounded-xl focus:border-accent-blue focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell me about your thoughts on the project..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 rounded-xl font-semibold text-lg flex items-center justify-center group"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                <p className="text-gray-400">
                  Thanks for reaching out! I'll get back to you soon.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Project Info & FAQ */}
          <div className="space-y-8">
            {/* Project Contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6">About This Project</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-accent-blue mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Contact</h4>
                    <p className="text-gray-400 text-sm">Feel free to reach out about the project</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MessageCircle className="w-6 h-6 text-accent-purple mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Collaboration</h4>
                    <p className="text-gray-400 text-sm">Open to discussing AI and career tech</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-white/10 hover:border-accent-blue/50 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <div className="text-gray-400 group-hover:text-accent-blue transition-colors duration-300">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-white/10 pb-4 last:border-b-0"
                  >
                    <h4 className="font-semibold mb-2 text-accent-blue">{faq.question}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;