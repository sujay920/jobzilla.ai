import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, DollarSign, TrendingUp, MapPin } from 'lucide-react';

const CareerRecommendations = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [skills, setSkills] = useState('');
  const [dreamJob, setDreamJob] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const subjects = [
    'Math', 'Biology', 'Art', 'Economics', 'Physics', 
    'History', 'English', 'Psychology', 'Computer Science'
  ];

  const careerData = [
    {
      title: "Software Engineer",
      description: "Develop and maintain software applications and systems.",
      salary: "8-30 LPA",
      growth: "High",
      match: 95,
      skills: ["Programming", "Problem Solving", "Teamwork"],
      locations: ["Bangalore", "Mumbai", "Hyderabad"]
    },
    {
      title: "Data Scientist",
      description: "Analyze data to gain insights and support decision-making.",
      salary: "10-35 LPA",
      growth: "Very High",
      match: 88,
      skills: ["Statistics", "Python", "Machine Learning"],
      locations: ["Bangalore", "Pune", "Delhi"]
    },
    {
      title: "UX Designer",
      description: "Design user experiences for digital products and services.",
      salary: "6-22 LPA",
      growth: "High",
      match: 82,
      skills: ["Design Thinking", "Prototyping", "User Research"],
      locations: ["Mumbai", "Bangalore", "Gurgaon"]
    }
  ];

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

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
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Get Your <span className="gradient-text">Career Recommendations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tell us about yourself and let our AI find the perfect career matches for you.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {!showRecommendations ? (
            /* Input Form */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border border-white/10"
            >
              {/* Favorite Subjects */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">📘 Favorite Subjects</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

              {/* Skills Input */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">🛠 Your Skills</h3>
                <textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., Programming, Design, Communication, Leadership..."
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
                  placeholder="What's your dream career?"
                  className="w-full p-4 bg-dark-800 border border-white/20 rounded-xl focus:border-accent-blue focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetRecommendations}
                className="w-full btn-primary py-4 rounded-xl font-semibold text-lg flex items-center justify-center group"
              >
                🔮 Get My Career Recommendations
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ) : (
            /* Recommendations Display */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">🎯 Your Personalized Career Matches</h3>
                <p className="text-gray-300">Based on your profile, here are our top recommendations:</p>
              </div>

              {careerData.map((career, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass p-6 rounded-2xl border border-white/10 hover:border-accent-blue/30 transition-all duration-300 card-hover"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center mb-4 md:mb-0">
                      <h4 className="text-2xl font-bold mr-4">{career.title}</h4>
                      <div className="flex items-center bg-accent-blue/20 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-accent-blue mr-1" />
                        <span className="text-accent-blue font-semibold">{career.match}% Match</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-400 mb-1">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{career.salary}</span>
                      </div>
                      <div className="flex items-center text-accent-blue">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">{career.growth} Growth</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{career.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold mb-2">Required Skills:</h5>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, skillIndex) => (
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
                      <h5 className="font-semibold mb-2">Top Locations:</h5>
                      <div className="flex flex-wrap gap-2">
                        {career.locations.map((location, locIndex) => (
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
                </motion.div>
              ))}

              {/* Reset Button */}
              <div className="text-center mt-8">
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