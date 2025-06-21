import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Jobzilla AI. How can I help you with your career today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "What careers match my skills?",
    "How much can I earn?",
    "What skills should I learn?",
    "Career change advice"
  ];

  const botResponses = {
    skills: "I'd love to help you find careers that match your skills! Could you tell me about your current skills and interests? For example, are you more technical, creative, or people-oriented?",
    salary: "Salary ranges vary by location and experience level. Here are some general ranges:\n\n• Software Engineer: $70k-$150k\n• Data Scientist: $80k-$160k\n• UX Designer: $60k-$120k\n• Marketing Manager: $55k-$110k\n\nWhat specific role interests you?",
    learn: "Great question! The most in-demand skills right now include:\n\n• AI/Machine Learning\n• Data Analysis\n• Digital Marketing\n• Cloud Computing\n• UX/UI Design\n• Project Management\n\nWhat field are you most interested in?",
    change: "Career changes can be exciting! Here's my advice:\n\n1. Assess your transferable skills\n2. Research your target industry\n3. Network with professionals\n4. Consider additional training\n5. Start with side projects\n\nWhat career are you considering?",
    project: "This project was built in 2025 using React, TypeScript, and modern AI concepts! It's inspired by my AI classes and represents the future of personalized career guidance. What aspect interests you most?",
    default: "That's a great question! I'm here to help with career guidance, skill recommendations, salary insights, and job market trends. What specific aspect of your career would you like to explore?"
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('match')) {
      return botResponses.skills;
    } else if (lowerMessage.includes('salary') || lowerMessage.includes('earn') || lowerMessage.includes('money')) {
      return botResponses.salary;
    } else if (lowerMessage.includes('learn') || lowerMessage.includes('study')) {
      return botResponses.learn;
    } else if (lowerMessage.includes('change') || lowerMessage.includes('switch')) {
      return botResponses.change;
    } else if (lowerMessage.includes('project') || lowerMessage.includes('built') || lowerMessage.includes('2025')) {
      return botResponses.project;
    } else {
      return botResponses.default;
    }
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button - Higher z-index to stay above 3D background */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-[100]"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple shadow-2xl flex items-center justify-center text-white transition-all duration-300 ${
            isOpen ? 'hidden' : 'block'
          }`}
          style={{ 
            boxShadow: '0 0 30px rgba(0, 191, 255, 0.4), 0 0 60px rgba(139, 92, 246, 0.3)',
            animation: 'pulseGlow 2s ease-in-out infinite'
          }}
        >
          <MessageCircle className="w-8 h-8" />
        </motion.button>
      </motion.div>

      {/* Chat Window - Higher z-index to stay above 3D background */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 w-96 h-[500px] z-[100] glass rounded-2xl border border-white/20 shadow-2xl overflow-hidden backdrop-blur-md"
            style={{ 
              boxShadow: '0 0 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(0, 191, 255, 0.1)' 
            }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-accent-blue to-accent-purple p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Jobzilla AI</h3>
                  <p className="text-white/80 text-sm">Your Career Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors duration-300 p-1 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4 bg-dark-900/50 backdrop-blur-sm">
              {messages.length === 1 && (
                <div className="text-center text-gray-400 py-4">
                  <Bot className="w-12 h-12 mx-auto mb-4 text-accent-blue animate-pulse" />
                  <p className="text-sm">Hi! I'm Jobzilla AI. Ask me anything about careers!</p>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot ? 'bg-accent-purple' : 'bg-accent-blue'
                    }`}>
                      {message.isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`p-3 rounded-2xl backdrop-blur-sm ${
                      message.isBot 
                        ? 'bg-dark-800/80 border border-white/10' 
                        : 'bg-gradient-to-br from-accent-blue to-accent-purple text-white'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-accent-purple flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-dark-800/80 border border-white/10 p-3 rounded-2xl backdrop-blur-sm">
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

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleSendMessage(reply)}
                      className="text-xs px-3 py-2 glass rounded-full border border-accent-blue/30 hover:border-accent-blue/50 transition-all duration-300 text-accent-blue backdrop-blur-sm"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-dark-800/50 backdrop-blur-sm">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your career..."
                  className="flex-1 px-4 py-2 bg-dark-700/80 border border-white/20 rounded-xl focus:border-accent-blue focus:outline-none text-sm backdrop-blur-sm"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isTyping}
                  className="px-4 py-2 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatBot;