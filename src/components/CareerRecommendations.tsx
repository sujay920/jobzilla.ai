import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, DollarSign, TrendingUp, MapPin, Brain, Target, Zap } from 'lucide-react';

const CareerRecommendations = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [skills, setSkills] = useState('');
  const [dreamJob, setDreamJob] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const subjects = [
    'Math', 'Biology', 'Art', 'Economics', 'Physics', 
    'History', 'English', 'Psychology', 'Computer Science',
    'Chemistry', 'Geography', 'Political Science', 'Philosophy'
  ];

  const interestAreas = [
    'Technology', 'Healthcare', 'Business', 'Creative Arts',
    'Finance', 'Education', 'Legal', 'Sports', 'Environment',
    'Social Work', 'Research', 'Entertainment'
  ];

  // Comprehensive career database with accurate matching
  const comprehensiveCareerData = {
    technology: [
      {
        title: "AI/ML Engineer",
        description: "Design and implement artificial intelligence and machine learning solutions",
        salary: "12-45 LPA",
        growth: "Extremely High",
        match: 95,
        skills: ["Python", "TensorFlow", "Deep Learning", "Statistics"],
        locations: ["Bangalore", "Hyderabad", "Pune", "Mumbai"],
        subjects: ["Math", "Computer Science", "Physics"],
        interests: ["Technology", "Research"]
      },
      {
        title: "Data Scientist",
        description: "Analyze complex data to extract insights and build predictive models",
        salary: "10-40 LPA",
        growth: "Very High",
        match: 92,
        skills: ["Python", "R", "Statistics", "Machine Learning", "SQL"],
        locations: ["Bangalore", "Mumbai", "Delhi", "Pune"],
        subjects: ["Math", "Computer Science", "Economics"],
        interests: ["Technology", "Research"]
      },
      {
        title: "Software Engineer",
        description: "Develop and maintain software applications and systems",
        salary: "8-35 LPA",
        growth: "Very High",
        match: 90,
        skills: ["Programming", "Problem Solving", "Algorithms", "System Design"],
        locations: ["Bangalore", "Hyderabad", "Mumbai", "Chennai"],
        subjects: ["Computer Science", "Math", "Physics"],
        interests: ["Technology"]
      },
      {
        title: "Cybersecurity Analyst",
        description: "Protect organizations from cyber threats and vulnerabilities",
        salary: "8-30 LPA",
        growth: "Very High",
        match: 88,
        skills: ["Network Security", "Ethical Hacking", "Risk Assessment"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Pune"],
        subjects: ["Computer Science", "Math"],
        interests: ["Technology"]
      },
      {
        title: "Cloud Architect",
        description: "Design and implement cloud infrastructure solutions",
        salary: "15-50 LPA",
        growth: "Very High",
        match: 87,
        skills: ["AWS", "Azure", "System Design", "DevOps"],
        locations: ["Bangalore", "Mumbai", "Hyderabad"],
        subjects: ["Computer Science", "Math"],
        interests: ["Technology"]
      },
      {
        title: "Full Stack Developer",
        description: "Develop both frontend and backend components of web applications",
        salary: "7-28 LPA",
        growth: "High",
        match: 85,
        skills: ["React", "Node.js", "JavaScript", "Databases"],
        locations: ["Bangalore", "Mumbai", "Pune", "Delhi"],
        subjects: ["Computer Science", "Math"],
        interests: ["Technology", "Creative Arts"]
      }
    ],
    healthcare: [
      {
        title: "Doctor (Specialist)",
        description: "Diagnose and treat specific medical conditions in specialized fields",
        salary: "20-100 LPA",
        growth: "Stable",
        match: 95,
        skills: ["Medical Knowledge", "Patient Care", "Diagnosis", "Surgery"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
        subjects: ["Biology", "Chemistry", "Physics"],
        interests: ["Healthcare", "Social Work"]
      },
      {
        title: "Medical Researcher",
        description: "Conduct research to advance medical science and treatments",
        salary: "8-35 LPA",
        growth: "High",
        match: 90,
        skills: ["Research Methods", "Data Analysis", "Clinical Trials"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Pune"],
        subjects: ["Biology", "Chemistry", "Math"],
        interests: ["Healthcare", "Research"]
      },
      {
        title: "Healthcare Data Analyst",
        description: "Analyze healthcare data to improve patient outcomes and operations",
        salary: "7-25 LPA",
        growth: "Very High",
        match: 88,
        skills: ["Healthcare Analytics", "Statistical Analysis", "EHR Systems"],
        locations: ["Bangalore", "Mumbai", "Hyderabad"],
        subjects: ["Biology", "Math", "Computer Science"],
        interests: ["Healthcare", "Technology"]
      },
      {
        title: "Biomedical Engineer",
        description: "Design medical equipment and devices to improve healthcare",
        salary: "8-30 LPA",
        growth: "High",
        match: 85,
        skills: ["Medical Devices", "Engineering", "Biology", "Technology"],
        locations: ["Bangalore", "Mumbai", "Chennai"],
        subjects: ["Biology", "Physics", "Math"],
        interests: ["Healthcare", "Technology"]
      },
      {
        title: "Pharmacist",
        description: "Dispense medications and provide pharmaceutical care",
        salary: "6-20 LPA",
        growth: "Moderate",
        match: 82,
        skills: ["Drug Knowledge", "Patient Counseling", "Pharmacy Management"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
        subjects: ["Biology", "Chemistry"],
        interests: ["Healthcare"]
      }
    ],
    business: [
      {
        title: "Product Manager",
        description: "Guide product development from conception to launch",
        salary: "12-40 LPA",
        growth: "Very High",
        match: 92,
        skills: ["Product Strategy", "Market Research", "Leadership", "Analytics"],
        locations: ["Bangalore", "Mumbai", "Gurgaon", "Pune"],
        subjects: ["Economics", "Psychology", "Math"],
        interests: ["Business", "Technology"]
      },
      {
        title: "Management Consultant",
        description: "Advise organizations on business strategy and operations",
        salary: "10-45 LPA",
        growth: "High",
        match: 90,
        skills: ["Strategic Thinking", "Problem Solving", "Communication"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Gurgaon"],
        subjects: ["Economics", "Math", "Psychology"],
        interests: ["Business"]
      },
      {
        title: "Business Analyst",
        description: "Analyze business processes and recommend improvements",
        salary: "6-25 LPA",
        growth: "High",
        match: 88,
        skills: ["Data Analysis", "Process Improvement", "Requirements Gathering"],
        locations: ["Bangalore", "Mumbai", "Pune", "Hyderabad"],
        subjects: ["Economics", "Math", "Computer Science"],
        interests: ["Business", "Technology"]
      },
      {
        title: "Digital Marketing Manager",
        description: "Develop and execute digital marketing strategies",
        salary: "8-30 LPA",
        growth: "Very High",
        match: 85,
        skills: ["Digital Marketing", "Analytics", "Content Strategy", "SEO"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Pune"],
        subjects: ["Economics", "Psychology", "English"],
        interests: ["Business", "Creative Arts"]
      },
      {
        title: "Operations Manager",
        description: "Oversee daily operations and improve organizational efficiency",
        salary: "9-32 LPA",
        growth: "Moderate",
        match: 83,
        skills: ["Process Optimization", "Team Management", "Supply Chain"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
        subjects: ["Economics", "Math"],
        interests: ["Business"]
      }
    ],
    creative: [
      {
        title: "UX/UI Designer",
        description: "Design user interfaces and experiences for digital products",
        salary: "6-28 LPA",
        growth: "Very High",
        match: 93,
        skills: ["Design Thinking", "Prototyping", "User Research", "Figma"],
        locations: ["Bangalore", "Mumbai", "Pune", "Gurgaon"],
        subjects: ["Art", "Psychology", "Computer Science"],
        interests: ["Creative Arts", "Technology"]
      },
      {
        title: "Content Creator",
        description: "Create engaging content for digital platforms and media",
        salary: "4-20 LPA",
        growth: "High",
        match: 88,
        skills: ["Content Writing", "Video Production", "Social Media", "Creativity"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Pune"],
        subjects: ["English", "Art", "Psychology"],
        interests: ["Creative Arts", "Entertainment"]
      },
      {
        title: "Graphic Designer",
        description: "Create visual content for various media and platforms",
        salary: "3-15 LPA",
        growth: "Moderate",
        match: 85,
        skills: ["Adobe Creative Suite", "Visual Design", "Branding", "Typography"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Pune"],
        subjects: ["Art", "Computer Science"],
        interests: ["Creative Arts"]
      },
      {
        title: "Animation Designer",
        description: "Create animated content for films, games, and digital media",
        salary: "5-22 LPA",
        growth: "High",
        match: 83,
        skills: ["3D Animation", "Motion Graphics", "Storytelling", "Maya"],
        locations: ["Mumbai", "Bangalore", "Hyderabad"],
        subjects: ["Art", "Computer Science"],
        interests: ["Creative Arts", "Entertainment"]
      }
    ],
    finance: [
      {
        title: "Investment Banker",
        description: "Facilitate corporate finance transactions and investments",
        salary: "15-60 LPA",
        growth: "High",
        match: 92,
        skills: ["Financial Analysis", "Deal Structuring", "Client Relations"],
        locations: ["Mumbai", "Delhi", "Bangalore"],
        subjects: ["Economics", "Math"],
        interests: ["Finance", "Business"]
      },
      {
        title: "Chartered Accountant",
        description: "Provide accounting, auditing, and financial advisory services",
        salary: "8-35 LPA",
        growth: "Stable",
        match: 90,
        skills: ["Accounting", "Taxation", "Auditing", "Financial Reporting"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
        subjects: ["Economics", "Math"],
        interests: ["Finance", "Business"]
      },
      {
        title: "Financial Analyst",
        description: "Analyze financial data to guide investment and business decisions",
        salary: "7-28 LPA",
        growth: "Moderate",
        match: 88,
        skills: ["Financial Modeling", "Investment Analysis", "Excel", "Valuation"],
        locations: ["Mumbai", "Delhi", "Bangalore", "Pune"],
        subjects: ["Economics", "Math"],
        interests: ["Finance", "Business"]
      },
      {
        title: "Risk Analyst",
        description: "Identify and analyze potential risks to business operations",
        salary: "7-30 LPA",
        growth: "High",
        match: 85,
        skills: ["Risk Assessment", "Statistical Analysis", "Compliance"],
        locations: ["Mumbai", "Delhi", "Bangalore"],
        subjects: ["Economics", "Math", "Computer Science"],
        interests: ["Finance", "Business"]
      }
    ]
  };

  // Advanced matching algorithm
  const calculateCareerMatch = (career: any): number => {
    let score = 0;
    let maxScore = 0;

    // Subject matching (40% weight)
    const subjectWeight = 40;
    if (career.subjects && selectedSubjects.length > 0) {
      const matchingSubjects = career.subjects.filter((subject: string) => 
        selectedSubjects.includes(subject)
      ).length;
      score += (matchingSubjects / career.subjects.length) * subjectWeight;
    }
    maxScore += subjectWeight;

    // Interest matching (30% weight)
    const interestWeight = 30;
    if (career.interests && interests.length > 0) {
      const matchingInterests = career.interests.filter((interest: string) => 
        interests.includes(interest)
      ).length;
      score += (matchingInterests / career.interests.length) * interestWeight;
    }
    maxScore += interestWeight;

    // Skills matching (20% weight)
    const skillWeight = 20;
    if (skills && career.skills) {
      const userSkills = skills.toLowerCase().split(',').map(s => s.trim());
      const matchingSkills = career.skills.filter((skill: string) => 
        userSkills.some(userSkill => skill.toLowerCase().includes(userSkill))
      ).length;
      if (career.skills.length > 0) {
        score += (matchingSkills / career.skills.length) * skillWeight;
      }
    }
    maxScore += skillWeight;

    // Dream job matching (10% weight)
    const dreamJobWeight = 10;
    if (dreamJob && career.title.toLowerCase().includes(dreamJob.toLowerCase())) {
      score += dreamJobWeight;
    }
    maxScore += dreamJobWeight;

    return maxScore > 0 ? Math.round((score / maxScore) * 100) : career.match || 70;
  };

  const getRecommendations = () => {
    const allCareers = Object.values(comprehensiveCareerData).flat();
    
    // Calculate match scores for all careers
    const careersWithScores = allCareers.map(career => ({
      ...career,
      calculatedMatch: calculateCareerMatch(career)
    }));

    // Sort by match score and return top 8
    return careersWithScores
      .sort((a, b) => b.calculatedMatch - a.calculatedMatch)
      .slice(0, 8);
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  const recommendations = showRecommendations ? getRecommendations() : [];

  return (
    <section id="careers" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent-purple/5 rounded-full blur-3xl"></div>
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
            <Target className="w-8 h-8 text-accent-green mr-3 animate-pulse" />
            <span className="text-accent-green font-medium text-lg">AI-Powered Matching</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Get Your <span className="gradient-text">Perfect Career Match</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our advanced AI analyzes your profile to find the most suitable career paths with high accuracy.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {!showRecommendations ? (
            /* Enhanced Input Form */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border border-white/10"
            >
              {/* Favorite Subjects */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  📘 Favorite Subjects
                  <span className="text-sm text-gray-400 ml-2">(Select all that apply)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => handleSubjectToggle(subject)}
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        selectedSubjects.includes(subject)
                          ? 'bg-accent-blue/20 border-accent-blue text-accent-blue'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Areas */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  🎯 Interest Areas
                  <span className="text-sm text-gray-400 ml-2">(Select your top interests)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interestAreas.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        interests.includes(interest)
                          ? 'bg-accent-purple/20 border-accent-purple text-accent-purple'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Input */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">🛠 Your Skills</h3>
                <textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., Programming, Design, Communication, Leadership, Problem Solving, Data Analysis..."
                  className="w-full p-4 bg-dark-800 border border-white/20 rounded-xl focus:border-accent-blue focus:outline-none resize-none h-24"
                />
              </div>

              {/* Dream Job */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">🌟 Dream Job (Optional)</h3>
                <input
                  type="text"
                  value={dreamJob}
                  onChange={(e) => setDreamJob(e.target.value)}
                  placeholder="What's your ideal career? (e.g., Software Engineer, Doctor, Designer)"
                  className="w-full p-4 bg-dark-800 border border-white/20 rounded-xl focus:border-accent-blue focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetRecommendations}
                disabled={selectedSubjects.length === 0 && interests.length === 0}
                className="w-full btn-primary py-4 rounded-xl font-semibold text-lg flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Brain className="mr-3 w-6 h-6" />
                Get AI-Powered Career Recommendations
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ) : (
            /* Enhanced Recommendations Display */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-accent-blue mr-3" />
                  Your AI-Matched Career Recommendations
                </h3>
                <p className="text-gray-300">
                  Based on your profile analysis, here are your top career matches with accuracy scores:
                </p>
              </div>

              <div className="grid gap-6">
                {recommendations.map((career, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass p-6 rounded-2xl border border-white/10 hover:border-accent-blue/30 transition-all duration-300 card-hover"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                      <div className="flex items-center mb-4 lg:mb-0">
                        <h4 className="text-2xl font-bold mr-4">{career.title}</h4>
                        <div className="flex items-center bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-2 rounded-full">
                          <Star className="w-4 h-4 text-white mr-1" />
                          <span className="text-white font-semibold">{career.calculatedMatch}% Match</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center text-green-400">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span className="font-semibold">{career.salary}</span>
                        </div>
                        <div className="flex items-center text-accent-blue">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm">{career.growth} Growth</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">{career.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-accent-blue">Required Skills:</h5>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill: string, skillIndex: number) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-accent-green">Top Locations:</h5>
                        <div className="flex flex-wrap gap-2">
                          {career.locations.map((location: string, locIndex: number) => (
                            <span
                              key={locIndex}
                              className="px-3 py-1 bg-accent-green/20 text-accent-green rounded-full text-sm flex items-center"
                            >
                              <MapPin className="w-3 h-3 mr-1" />
                              {location}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Match Explanation */}
                    <div className="mt-4 p-4 bg-dark-800/50 rounded-xl">
                      <h6 className="font-semibold text-sm text-accent-blue mb-2">Why this matches you:</h6>
                      <div className="text-sm text-gray-400 space-y-1">
                        {selectedSubjects.some(subject => career.subjects?.includes(subject)) && (
                          <div>✓ Aligns with your favorite subjects: {selectedSubjects.filter(subject => career.subjects?.includes(subject)).join(', ')}</div>
                        )}
                        {interests.some(interest => career.interests?.includes(interest)) && (
                          <div>✓ Matches your interests: {interests.filter(interest => career.interests?.includes(interest)).join(', ')}</div>
                        )}
                        {skills && career.skills.some((skill: string) => skills.toLowerCase().includes(skill.toLowerCase())) && (
                          <div>✓ Utilizes your existing skills</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Reset Button */}
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowRecommendations(false)}
                  className="glass px-8 py-3 rounded-xl border border-white/20 hover:border-accent-blue/50 transition-all duration-300"
                >
                  Try Again with Different Inputs
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareerRecommendations;