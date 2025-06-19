import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, MessageCircle } from 'lucide-react';

const AskJobzilla = () => {
  const [messages, setMessages] = useState<Array<{id: number, text: string, isUser: boolean}>>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Sample AI responses for demo purposes
  const getAIResponse = (question: string): string => {
    const responses = {
      'career': "Based on your interests, I'd recommend exploring careers in technology, healthcare, or creative fields. What specific skills do you enjoy using?",
      'salary': "Salary ranges vary by location and experience. For entry-level positions: Software Engineer (8-15 LPA), Data Scientist (10-18 LPA), UX Designer (6-12 LPA). Would you like specific information about any field?",
      'skills': "Focus on developing both technical and soft skills. Popular technical skills include programming, data analysis, and digital marketing. Soft skills like communication and problem-solving are equally important!",
      'education': "Your educational background is just the starting point. Consider online courses, certifications, and practical projects to build your portfolio. What field interests you most?",
      'future': "The future job market will emphasize AI, sustainability, healthcare, and remote work. Skills in technology, creativity, and emotional intelligence will be highly valued.",
      'default': "That's a great question! I'd be happy to help you explore career opportunities. Could you tell me more about your interests, skills, or what specific aspect of career planning you'd like to discuss?"
    };

    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('career') || lowerQuestion.includes('job')) return responses.career;
    if (lowerQuestion.includes('salary') || lowerQuestion.includes('pay') || lowerQuestion.includes('money')) return responses.salary;
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('learn')) return responses.skills;
    if (lowerQuestion.includes('education') || lowerQuestion.includes('study') || lowerQuestion.includes('degree')) return responses.education;
    if (lowerQuestion.includes('future') || lowerQuestion.includes('trend')) return responses.future;
    
    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(inputText),
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="ask-jobzilla" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl"></div>
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
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-8 h-8 text-accent-blue mr-3 animate-pulse" />
            <span className="text-accent-blue font-medium text-lg">AI Career Assistant</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Ask <span className="gradient-text">Jobzilla</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get instant answers to your career questions with our AI-powered assistant.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {!isOpen ? (
            /* Chat Trigger */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="glass p-8 rounded-2xl border border-white/10 hover:border-accent-blue/30 transition-all duration-300 card-hover group"
              >
                <div className="flex items-center justify-center mb-4">
                  <MessageCircle className="w-16 h-16 text-accent-blue group-hover:animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Start Conversation</h3>
                <p className="text-gray-400 mb-6">
                  Ask me anything about careers, skills, salaries, or your future path!
                </p>
                <div className="btn-primary px-8 py-3 rounded-full font-semibold inline-flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Ask Jobzilla
                </div>
              </motion.button>

              {/* Sample Questions */}
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "What career suits my skills?",
                  "How much can I earn as a developer?",
                  "What skills should I learn?",
                  "Which field has the best future?",
                  "How to switch careers?",
                  "What education do I need?"
                ].map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setIsOpen(true);
                      setInputText(question);
                    }}
                    className="glass p-4 rounded-xl border border-white/10 hover:border-accent-blue/30 transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center">
                      <Bot className="w-4 h-4 text-accent-blue mr-2 group-hover:animate-pulse" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        "{question}"
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Chat Interface */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-accent-blue to-accent-purple p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Bot className="w-6 h-6 text-white mr-3" />
                  <div>
                    <h3 className="font-semibold text-white">Jobzilla AI</h3>
                    <p className="text-white/80 text-sm">Your Career Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    <Bot className="w-12 h-12 mx-auto mb-4 text-accent-blue" />
                    <p>Hi! I'm Jobzilla AI. Ask me anything about your career!</p>
                  </div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isUser ? 'bg-accent-blue' : 'bg-accent-purple'
                      }`}>
                        {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        message.isUser 
                          ? 'bg-accent-blue text-white' 
                          : 'bg-dark-800 border border-white/10'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent-purple flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-dark-800 border border-white/10 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about careers, skills, salaries..."
                    className="flex-1 bg-dark-800 border border-white/20 rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none"
                    disabled={isLoading}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="btn-primary px-4 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AskJobzilla;