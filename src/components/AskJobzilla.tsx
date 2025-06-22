import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, MessageCircle, Brain, TrendingUp, DollarSign } from 'lucide-react';

const AskJobzilla = () => {
  const [messages, setMessages] = useState<Array<{id: number, text: string, isUser: boolean}>>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Comprehensive career database with detailed information
  const careerDatabase = {
    technology: [
      { title: "Software Engineer", salary: "8-35 LPA", growth: "Very High", skills: ["Programming", "Problem Solving", "Algorithms"], description: "Design, develop, and maintain software applications and systems" },
      { title: "Data Scientist", salary: "10-40 LPA", growth: "Extremely High", skills: ["Python", "Statistics", "Machine Learning"], description: "Analyze complex data to extract insights and build predictive models" },
      { title: "AI/ML Engineer", salary: "12-45 LPA", growth: "Extremely High", skills: ["Deep Learning", "TensorFlow", "Neural Networks"], description: "Develop artificial intelligence and machine learning solutions" },
      { title: "DevOps Engineer", salary: "9-32 LPA", growth: "Very High", skills: ["Docker", "Kubernetes", "CI/CD"], description: "Streamline development and deployment processes" },
      { title: "Cybersecurity Analyst", salary: "8-30 LPA", growth: "Very High", skills: ["Network Security", "Ethical Hacking", "Risk Assessment"], description: "Protect organizations from cyber threats and vulnerabilities" },
      { title: "Cloud Architect", salary: "15-50 LPA", growth: "Very High", skills: ["AWS", "Azure", "System Design"], description: "Design and implement cloud infrastructure solutions" },
      { title: "Full Stack Developer", salary: "7-28 LPA", growth: "High", skills: ["React", "Node.js", "Databases"], description: "Develop both frontend and backend components of web applications" },
      { title: "Mobile App Developer", salary: "6-25 LPA", growth: "High", skills: ["React Native", "Flutter", "iOS/Android"], description: "Create mobile applications for smartphones and tablets" },
      { title: "Blockchain Developer", salary: "10-40 LPA", growth: "Very High", skills: ["Solidity", "Smart Contracts", "Cryptocurrency"], description: "Develop decentralized applications and blockchain solutions" },
      { title: "Game Developer", salary: "5-22 LPA", growth: "Moderate", skills: ["Unity", "C#", "3D Graphics"], description: "Create interactive games for various platforms" }
    ],
    healthcare: [
      { title: "Doctor (General)", salary: "10-50 LPA", growth: "Stable", skills: ["Medical Knowledge", "Patient Care", "Diagnosis"], description: "Diagnose and treat illnesses, provide medical care to patients" },
      { title: "Surgeon", salary: "20-100 LPA", growth: "Stable", skills: ["Surgical Skills", "Precision", "Medical Expertise"], description: "Perform surgical operations to treat diseases and injuries" },
      { title: "Medical Researcher", salary: "8-35 LPA", growth: "High", skills: ["Research Methods", "Data Analysis", "Clinical Trials"], description: "Conduct research to advance medical science and treatments" },
      { title: "Pharmacist", salary: "6-20 LPA", growth: "Moderate", skills: ["Drug Knowledge", "Patient Counseling", "Pharmacy Management"], description: "Dispense medications and provide pharmaceutical care" },
      { title: "Physiotherapist", salary: "4-15 LPA", growth: "High", skills: ["Rehabilitation", "Exercise Therapy", "Patient Assessment"], description: "Help patients recover from injuries and improve mobility" },
      { title: "Nurse", salary: "3-12 LPA", growth: "High", skills: ["Patient Care", "Medical Procedures", "Compassion"], description: "Provide direct patient care and support medical teams" },
      { title: "Healthcare Data Analyst", salary: "7-25 LPA", growth: "Very High", skills: ["Healthcare Analytics", "Statistical Analysis", "EHR Systems"], description: "Analyze healthcare data to improve patient outcomes" },
      { title: "Biomedical Engineer", salary: "8-30 LPA", growth: "High", skills: ["Medical Devices", "Engineering", "Biology"], description: "Design medical equipment and devices" }
    ],
    business: [
      { title: "Business Analyst", salary: "6-25 LPA", growth: "High", skills: ["Data Analysis", "Process Improvement", "Requirements Gathering"], description: "Analyze business processes and recommend improvements" },
      { title: "Product Manager", salary: "12-40 LPA", growth: "Very High", skills: ["Product Strategy", "Market Research", "Leadership"], description: "Guide product development from conception to launch" },
      { title: "Marketing Manager", salary: "8-30 LPA", growth: "High", skills: ["Digital Marketing", "Brand Management", "Campaign Strategy"], description: "Develop and execute marketing strategies to promote products" },
      { title: "Financial Analyst", salary: "7-28 LPA", growth: "Moderate", skills: ["Financial Modeling", "Investment Analysis", "Excel"], description: "Analyze financial data to guide investment decisions" },
      { title: "Management Consultant", salary: "10-45 LPA", growth: "High", skills: ["Strategic Thinking", "Problem Solving", "Communication"], description: "Advise organizations on business strategy and operations" },
      { title: "Sales Manager", salary: "8-35 LPA", growth: "Moderate", skills: ["Sales Strategy", "Team Leadership", "Customer Relations"], description: "Lead sales teams and develop revenue strategies" },
      { title: "Operations Manager", salary: "9-32 LPA", growth: "Moderate", skills: ["Process Optimization", "Team Management", "Supply Chain"], description: "Oversee daily operations and improve efficiency" },
      { title: "HR Manager", salary: "7-25 LPA", growth: "Moderate", skills: ["Talent Management", "Employee Relations", "Recruitment"], description: "Manage human resources and organizational development" }
    ],
    creative: [
      { title: "UX/UI Designer", salary: "6-28 LPA", growth: "Very High", skills: ["Design Thinking", "Prototyping", "User Research"], description: "Design user interfaces and experiences for digital products" },
      { title: "Graphic Designer", salary: "3-15 LPA", growth: "Moderate", skills: ["Adobe Creative Suite", "Visual Design", "Branding"], description: "Create visual content for various media and platforms" },
      { title: "Content Creator", salary: "4-20 LPA", growth: "High", skills: ["Content Writing", "Video Production", "Social Media"], description: "Create engaging content for digital platforms" },
      { title: "Fashion Designer", salary: "3-18 LPA", growth: "Moderate", skills: ["Fashion Design", "Trend Analysis", "Creativity"], description: "Design clothing and accessories for various markets" },
      { title: "Interior Designer", salary: "4-20 LPA", growth: "Moderate", skills: ["Space Planning", "3D Visualization", "Client Relations"], description: "Design interior spaces for residential and commercial use" },
      { title: "Animator", salary: "5-22 LPA", growth: "High", skills: ["3D Animation", "Motion Graphics", "Storytelling"], description: "Create animated content for films, games, and media" },
      { title: "Photographer", salary: "3-15 LPA", growth: "Moderate", skills: ["Photography", "Photo Editing", "Visual Storytelling"], description: "Capture and edit photographs for various purposes" },
      { title: "Video Editor", salary: "4-18 LPA", growth: "High", skills: ["Video Editing", "Color Grading", "Audio Mixing"], description: "Edit and produce video content for various platforms" }
    ],
    finance: [
      { title: "Investment Banker", salary: "15-60 LPA", growth: "High", skills: ["Financial Analysis", "Deal Structuring", "Client Relations"], description: "Facilitate corporate finance transactions and investments" },
      { title: "Chartered Accountant", salary: "8-35 LPA", growth: "Stable", skills: ["Accounting", "Taxation", "Auditing"], description: "Provide accounting, auditing, and financial advisory services" },
      { title: "Financial Planner", salary: "6-25 LPA", growth: "High", skills: ["Investment Planning", "Risk Assessment", "Client Advisory"], description: "Help individuals and businesses plan their financial future" },
      { title: "Risk Analyst", salary: "7-30 LPA", growth: "High", skills: ["Risk Assessment", "Statistical Analysis", "Compliance"], description: "Identify and analyze potential risks to business operations" },
      { title: "Actuary", salary: "10-40 LPA", growth: "High", skills: ["Statistics", "Probability", "Insurance"], description: "Assess risk and uncertainty in insurance and finance" },
      { title: "Quantitative Analyst", salary: "12-45 LPA", growth: "Very High", skills: ["Mathematical Modeling", "Programming", "Statistics"], description: "Use mathematical models to analyze financial markets" }
    ],
    education: [
      { title: "Teacher", salary: "3-12 LPA", growth: "Stable", skills: ["Subject Expertise", "Communication", "Patience"], description: "Educate students in various subjects and grade levels" },
      { title: "Professor", salary: "8-30 LPA", growth: "Stable", skills: ["Research", "Teaching", "Academic Writing"], description: "Teach at university level and conduct research" },
      { title: "Educational Consultant", salary: "6-22 LPA", growth: "High", skills: ["Curriculum Development", "Educational Technology", "Training"], description: "Advise on educational programs and policies" },
      { title: "Corporate Trainer", salary: "5-20 LPA", growth: "High", skills: ["Training Design", "Presentation", "Adult Learning"], description: "Develop and deliver training programs for organizations" },
      { title: "E-learning Developer", salary: "6-25 LPA", growth: "Very High", skills: ["Instructional Design", "Educational Technology", "Content Creation"], description: "Create digital learning experiences and courses" }
    ],
    legal: [
      { title: "Corporate Lawyer", salary: "10-50 LPA", growth: "High", skills: ["Legal Research", "Contract Law", "Negotiation"], description: "Handle legal matters for corporations and businesses" },
      { title: "Criminal Lawyer", salary: "8-40 LPA", growth: "Moderate", skills: ["Criminal Law", "Court Procedures", "Client Advocacy"], description: "Defend clients in criminal cases" },
      { title: "Legal Consultant", salary: "7-30 LPA", growth: "High", skills: ["Legal Advisory", "Compliance", "Risk Management"], description: "Provide legal advice to individuals and organizations" },
      { title: "Patent Attorney", salary: "12-45 LPA", growth: "High", skills: ["Intellectual Property", "Patent Law", "Technical Writing"], description: "Handle patent applications and intellectual property matters" }
    ]
  };

  // Enhanced AI response system with direct answers
  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Career recommendation queries
    if (lowerQuestion.includes('recommend') || lowerQuestion.includes('suggest') || lowerQuestion.includes('career') || lowerQuestion.includes('job')) {
      if (lowerQuestion.includes('tech') || lowerQuestion.includes('programming') || lowerQuestion.includes('software') || lowerQuestion.includes('computer')) {
        return generateCareerRecommendations('technology', 'technology field');
      } else if (lowerQuestion.includes('health') || lowerQuestion.includes('medical') || lowerQuestion.includes('doctor') || lowerQuestion.includes('medicine')) {
        return generateCareerRecommendations('healthcare', 'healthcare field');
      } else if (lowerQuestion.includes('business') || lowerQuestion.includes('management') || lowerQuestion.includes('marketing')) {
        return generateCareerRecommendations('business', 'business field');
      } else if (lowerQuestion.includes('creative') || lowerQuestion.includes('design') || lowerQuestion.includes('art')) {
        return generateCareerRecommendations('creative', 'creative field');
      } else if (lowerQuestion.includes('finance') || lowerQuestion.includes('money') || lowerQuestion.includes('banking')) {
        return generateCareerRecommendations('finance', 'finance field');
      } else if (lowerQuestion.includes('teach') || lowerQuestion.includes('education') || lowerQuestion.includes('professor')) {
        return generateCareerRecommendations('education', 'education field');
      } else if (lowerQuestion.includes('law') || lowerQuestion.includes('legal') || lowerQuestion.includes('lawyer')) {
        return generateCareerRecommendations('legal', 'legal field');
      } else {
        return generateTopCareerRecommendations();
      }
    }
    
    // Salary queries
    if (lowerQuestion.includes('salary') || lowerQuestion.includes('pay') || lowerQuestion.includes('earn') || lowerQuestion.includes('money')) {
      if (lowerQuestion.includes('highest') || lowerQuestion.includes('best') || lowerQuestion.includes('top')) {
        return `💰 **Highest Paying Careers in India:**

🏆 **Top Tier (20+ LPA):**
• Investment Banker: 15-60 LPA
• Cloud Architect: 15-50 LPA
• AI/ML Engineer: 12-45 LPA
• Surgeon: 20-100 LPA
• Patent Attorney: 12-45 LPA

💎 **High Paying (10-20 LPA):**
• Data Scientist: 10-40 LPA
• Product Manager: 12-40 LPA
• Quantitative Analyst: 12-45 LPA
• Management Consultant: 10-45 LPA

📈 **Growing Fields:**
• Cybersecurity: 8-30 LPA (High demand)
• Blockchain Developer: 10-40 LPA (Emerging)
• Healthcare Data Analyst: 7-25 LPA (Rapid growth)

*Salaries vary based on experience, location, and company size.`;
      } else {
        return `💰 **Average Salary Ranges by Field:**

🔧 **Technology:** 6-45 LPA
• Entry: 6-12 LPA
• Mid-level: 12-25 LPA
• Senior: 25-45 LPA

🏥 **Healthcare:** 3-100 LPA
• Nurses: 3-12 LPA
• Doctors: 10-50 LPA
• Specialists: 20-100 LPA

💼 **Business:** 6-45 LPA
• Analysts: 6-25 LPA
• Managers: 8-35 LPA
• Consultants: 10-45 LPA

🎨 **Creative:** 3-28 LPA
• Designers: 3-28 LPA
• Content Creators: 4-20 LPA

💰 **Finance:** 6-60 LPA
• Analysts: 6-30 LPA
• Investment Banking: 15-60 LPA

*These are approximate ranges and can vary significantly based on location, experience, and company.`;
      }
    }
    
    // Skills queries
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('learn')) {
      if (lowerQuestion.includes('2025') || lowerQuestion.includes('future') || lowerQuestion.includes('trending')) {
        return `🚀 **Most In-Demand Skills for 2025:**

🤖 **AI & Technology:**
• Artificial Intelligence & Machine Learning
• Python Programming
• Cloud Computing (AWS, Azure)
• Cybersecurity
• Data Science & Analytics
• Blockchain Development

💼 **Business Skills:**
• Digital Marketing
• Product Management
• Data-Driven Decision Making
• Agile Project Management
• Customer Experience Design

🎯 **Soft Skills:**
• Emotional Intelligence
• Critical Thinking
• Adaptability
• Communication
• Leadership
• Problem Solving

🌟 **Emerging Areas:**
• Quantum Computing
• Sustainable Technology
• AR/VR Development
• IoT (Internet of Things)
• Robotics Process Automation

💡 **Pro Tip:** Combine technical skills with strong communication abilities for maximum career impact!`;
      } else {
        return `🎯 **Essential Skills by Career Path:**

💻 **Technology:**
• Programming (Python, JavaScript, Java)
• Problem Solving & Algorithms
• System Design
• Version Control (Git)
• Database Management

🏥 **Healthcare:**
• Medical Knowledge
• Patient Care
• Critical Thinking
• Attention to Detail
• Empathy & Communication

💼 **Business:**
• Data Analysis
• Strategic Thinking
• Communication
• Leadership
• Project Management

🎨 **Creative:**
• Design Software (Adobe Suite)
• Creativity & Innovation
• Visual Communication
• User Experience Design
• Storytelling

📊 **Finance:**
• Financial Analysis
• Excel & Financial Modeling
• Risk Assessment
• Attention to Detail
• Regulatory Knowledge

Which field interests you most? I can provide more specific skill recommendations!`;
      }
    }
    
    // Future/trends queries
    if (lowerQuestion.includes('future') || lowerQuestion.includes('trend') || lowerQuestion.includes('growing')) {
      return `🔮 **Future Career Trends & Growing Fields:**

🚀 **Fastest Growing Careers:**
• AI/ML Engineer (40% growth expected)
• Data Scientist (35% growth)
• Cybersecurity Analyst (33% growth)
• Cloud Architect (30% growth)
• Healthcare Data Analyst (28% growth)

🌟 **Emerging Roles:**
• Prompt Engineer (AI)
• Sustainability Consultant
• Virtual Reality Developer
• Drone Operator
• Genetic Counselor

🔥 **Hot Industries:**
• Artificial Intelligence
• Renewable Energy
• Biotechnology
• E-commerce
• Digital Health
• Fintech

📈 **Key Trends:**
• Remote work capabilities
• AI integration in all fields
• Sustainability focus
• Digital transformation
• Personalized healthcare
• Automation & robotics

💡 **Future-Proof Skills:**
• Adaptability
• Continuous learning
• Digital literacy
• Creative problem solving
• Human-AI collaboration

The future belongs to those who can adapt and learn continuously!`;
    }
    
    // Education queries
    if (lowerQuestion.includes('education') || lowerQuestion.includes('degree') || lowerQuestion.includes('study') || lowerQuestion.includes('course')) {
      return `🎓 **Education Pathways for Top Careers:**

💻 **Technology:**
• Computer Science/IT Engineering
• Data Science/Analytics
• Online Coding Bootcamps
• Certifications (AWS, Google Cloud)

🏥 **Healthcare:**
• MBBS (5.5 years) → Specialization
• Nursing (3-4 years)
• Pharmacy (4 years)
• Physiotherapy (4.5 years)

💼 **Business:**
• BBA/MBA
• Commerce with specialization
• Digital Marketing Courses
• Project Management Certification

🎨 **Creative:**
• Design Degree (3-4 years)
• Portfolio-based learning
• Online courses (Coursera, Udemy)
• Industry workshops

💰 **Finance:**
• CA (3-4 years)
• CFA Certification
• Finance/Economics Degree
• FRM (Financial Risk Manager)

📚 **Alternative Paths:**
• Online learning platforms
• Industry certifications
• Apprenticeships
• Self-directed learning

Remember: Skills matter more than degrees in many fields today!`;
    }
    
    // Career change queries
    if (lowerQuestion.includes('change') || lowerQuestion.includes('switch') || lowerQuestion.includes('transition')) {
      return `🔄 **Career Change Strategy:**

📋 **Step-by-Step Plan:**
1. **Self Assessment**
   • Identify transferable skills
   • Clarify your values & interests
   • Set realistic timeline

2. **Research & Planning**
   • Study target industry
   • Network with professionals
   • Identify skill gaps

3. **Skill Development**
   • Take relevant courses
   • Build portfolio/projects
   • Get certifications

4. **Transition Strategy**
   • Start with side projects
   • Consider freelancing
   • Apply for entry-level roles

🎯 **Popular Transition Paths:**
• Teaching → Corporate Training
• Engineering → Product Management
• Finance → Data Science
• Marketing → UX Design
• Any field → Technology

💡 **Success Tips:**
• Leverage existing network
• Highlight transferable skills
• Be patient with salary adjustments
• Consider gradual transitions
• Stay updated with industry trends

🚀 **Fast-Track Options:**
• Bootcamps (3-6 months)
• Online certifications
• Mentorship programs
• Industry switching programs

What field are you considering switching to?`;
    }
    
    // Default comprehensive response
    return `🤖 **Hi! I'm Jobzilla AI - Your Career Intelligence Assistant**

I can help you with:

🎯 **Career Recommendations**
• "Suggest tech careers" → Get personalized tech role suggestions
• "Best healthcare jobs" → Explore medical field opportunities
• "Creative career options" → Discover design & content roles

💰 **Salary Information**
• "Highest paying jobs" → Top salary ranges
• "Software engineer salary" → Specific role compensation
• "Finance field salaries" → Industry pay scales

📚 **Skill Guidance**
• "Skills to learn in 2025" → Future-ready capabilities
• "Programming skills needed" → Technical requirements
• "Business skills for growth" → Professional development

🔮 **Future Trends**
• "Growing career fields" → Emerging opportunities
• "Future job market" → Industry predictions
• "AI impact on careers" → Technology disruption insights

🎓 **Education Paths**
• "Best degree for tech" → Academic recommendations
• "Online courses for marketing" → Learning resources
• "Certification vs degree" → Education strategy

Ask me anything specific about careers, salaries, skills, or your professional future!`;
  };

  const generateCareerRecommendations = (field: keyof typeof careerDatabase, fieldName: string): string => {
    const careers = careerDatabase[field];
    const topCareers = careers.slice(0, 6);
    
    let response = `🎯 **Top Career Recommendations in ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:**\n\n`;
    
    topCareers.forEach((career, index) => {
      response += `${index + 1}. **${career.title}**\n`;
      response += `   💰 Salary: ${career.salary}\n`;
      response += `   📈 Growth: ${career.growth}\n`;
      response += `   🛠️ Key Skills: ${career.skills.join(', ')}\n`;
      response += `   📝 ${career.description}\n\n`;
    });
    
    response += `💡 **Why these careers are great:**\n`;
    response += `• High growth potential in the current market\n`;
    response += `• Strong salary prospects\n`;
    response += `• Future-proof with emerging technologies\n`;
    response += `• Multiple entry paths available\n\n`;
    response += `Want specific advice for any of these roles? Just ask!`;
    
    return response;
  };

  const generateTopCareerRecommendations = (): string => {
    const allCareers = Object.values(careerDatabase).flat();
    const topCareers = allCareers
      .filter(career => career.growth === 'Very High' || career.growth === 'Extremely High')
      .slice(0, 8);
    
    let response = `🌟 **Top Career Recommendations Across All Fields:**\n\n`;
    
    topCareers.forEach((career, index) => {
      response += `${index + 1}. **${career.title}**\n`;
      response += `   💰 ${career.salary} | 📈 ${career.growth} Growth\n`;
      response += `   🛠️ ${career.skills.slice(0, 3).join(', ')}\n`;
      response += `   📝 ${career.description}\n\n`;
    });
    
    response += `🎯 **These careers offer:**\n`;
    response += `• Excellent growth prospects\n`;
    response += `• Competitive salaries\n`;
    response += `• High market demand\n`;
    response += `• Future sustainability\n\n`;
    response += `Tell me your interests (tech, healthcare, business, creative, finance, education, legal) for more targeted recommendations!`;
    
    return response;
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getAIResponse(messageText),
        isUser: false
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Recommend tech careers",
    "Highest paying jobs in India",
    "Skills to learn in 2025",
    "Best healthcare careers",
    "How to change careers",
    "Future job trends",
    "Creative field opportunities",
    "Finance career options"
  ];

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
            <Brain className="w-8 h-8 text-accent-blue mr-3 animate-pulse" />
            <span className="text-accent-blue font-medium text-lg">AI Career Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Ask <span className="gradient-text">Jobzilla AI</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get instant, comprehensive answers about careers, salaries, skills, and your professional future.
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
                <h3 className="text-2xl font-bold mb-4">Start AI Conversation</h3>
                <p className="text-gray-400 mb-6">
                  Get instant answers about careers, salaries, skills, and professional growth!
                </p>
                <div className="btn-primary px-8 py-3 rounded-full font-semibold inline-flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Ask Jobzilla AI
                </div>
              </motion.button>

              {/* Quick Questions */}
              <div className="mt-12">
                <h4 className="text-xl font-semibold mb-6 text-center">Popular Questions</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setIsOpen(true);
                        setTimeout(() => handleSendMessage(question), 500);
                      }}
                      className="glass p-4 rounded-xl border border-white/10 hover:border-accent-blue/30 transition-all duration-300 text-left group"
                    >
                      <div className="flex items-center">
                        <Bot className="w-5 h-5 text-accent-blue mr-3 group-hover:animate-pulse" />
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                          "{question}"
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Enhanced Chat Interface */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-accent-blue to-accent-purple p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="w-6 h-6 text-white mr-3" />
                  <div>
                    <h3 className="font-semibold text-white">Jobzilla AI</h3>
                    <p className="text-white/80 text-sm">Career Intelligence Assistant</p>
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
                    <Brain className="w-12 h-12 mx-auto mb-4 text-accent-blue animate-pulse" />
                    <p className="mb-4">Hi! I'm Jobzilla AI, your career intelligence assistant.</p>
                    <p className="text-sm">Ask me about careers, salaries, skills, or professional growth!</p>
                  </div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isUser ? 'bg-accent-blue' : 'bg-accent-purple'
                      }`}>
                        {message.isUser ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
                      </div>
                      <div className={`p-4 rounded-2xl ${
                        message.isUser 
                          ? 'bg-accent-blue text-white' 
                          : 'bg-dark-800 border border-white/10'
                      }`}>
                        <div className="text-sm leading-relaxed whitespace-pre-line">{message.text}</div>
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
                        <Brain className="w-4 h-4" />
                      </div>
                      <div className="bg-dark-800 border border-white/10 p-4 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-400">Analyzing your question...</span>
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
                    placeholder="Ask about careers, salaries, skills, trends..."
                    className="flex-1 bg-dark-800 border border-white/20 rounded-xl px-4 py-3 focus:border-accent-blue focus:outline-none"
                    disabled={isLoading}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage()}
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