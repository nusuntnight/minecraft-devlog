import React, { useState, useEffect } from 'react';
import {
  Code,
  Server,
  Gamepad2,
  Trophy,
  Calendar,
  ChevronRight,
  Github,
  ExternalLink
} from 'lucide-react';

// TextType Component
const TextType = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-purple-200 ml-1">|</span>
    </span>
  );
};

const MinecraftDevResume = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const skills = [
    { name: 'Java Programming', level: 60, icon: <Code className="w-5 h-5" /> },
    { name: 'Bukkit/Spigot API', level: 5, icon: <Server className="w-5 h-5" /> },
    { name: 'Plugin Development', level: 1, icon: <Gamepad2 className="w-5 h-5" /> },
    { name: 'Server Management', level: 95, icon: <Server className="w-5 h-5" /> },
    { name: 'Database Integration', level: 0, icon: <Code className="w-5 h-5" /> },
    { name: 'Command Systems', level: 0, icon: <Code className="w-5 h-5" /> }
  ];

  const achievements = [
    {
      title: "First Working Mini Plugin",
      description: "Successfully created and deployed my first working Bukkit plugin with basic functionality",
      date: "2025-07",
      type: "milestone"
    }
  ];

  const projects = [
    {
      name: "NightBoard",
      description: "Coming soon - Tablist and scoreboard customization, lightweight and modern",
      tech: ["Java", "Bukkit API", "FastBoard API"],
      status: "In development",
      downloads: "N/A"
    },
    {
      name: "AntiXRay",
      description: "Coming soon - Anti XRay system, obfuscating ores and tricking hackers",
      tech: ["Java", "YAML"],
      status: "Planning",
      downloads: "N/A"
    },
    {
      name: "ServerProtect",
      description: "Coming soon - Auto setup your server in-game and select different options to protect your server. (eg. Anti Dupe, Lag Protection)",
      tech: ["Java", "Possibly NMS", "Possibly ProtocolLib"],
      status: "Planning",
      downloads: "N/A"
    }
  ];

  const learningPath = [
    { phase: "Foundation", topics: ["Java Basics", "OOP Concepts", "IDE Setup"], completed: true },
    { phase: "Minecraft Basics", topics: ["Bukkit API", "Event System", "Commands"], completed: true },
    { phase: "Intermediate", topics: ["Database Integration", "Configuration Files", "Permissions"], completed: false },
    { phase: "Advanced", topics: ["Async Programming", "Performance Optimization", "Custom GUIs"], completed: false },
    { phase: "Expert", topics: ["NMS/Reflection", "Custom Protocols", "Advanced Networking"], completed: false }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'rgba(105, 43, 224, 0.2)' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#d6c5f7' }}>About Me</h3>
                <p className="text-lg leading-relaxed" style={{ color: '#f3eefc' }}>
                  I'm a passionate beginner in Minecraft plugin development, diving deep into the world of Java programming 
                  and the Bukkit/Spigot API. My journey started with curiosity about how servers work, and now I'm building 
                  my own plugins from scratch.
                </p>
              </div>
              
              <div className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'rgba(105, 43, 224, 0.2)' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#d6c5f7' }}>Current Focus</h3>
                <ul className="space-y-2" style={{ color: '#f3eefc' }}>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" style={{ color: '#ba9df1' }} />
                    Learning Java fundamentals
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" style={{ color: '#ba9df1' }} />
                    Understanding Bukkit API
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" style={{ color: '#ba9df1' }} />
                    Building first functional plugins
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" style={{ color: '#ba9df1' }} />
                    Server management best practices
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="animate-fade-in">
            <div className="grid gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'rgba(105, 43, 224, 0.2)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(186, 157, 241, 0.3)' }}>
                        {skill.icon}
                      </div>
                      <h3 className="text-xl font-semibold" style={{ color: '#f3eefc' }}>{skill.name}</h3>
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#f8f8f8ff' }}>{skill.level}%</span>
                  </div>
                  <div className="w-full rounded-full h-3" style={{ backgroundColor: 'rgba(105, 43, 224, 0.3)' }}>
                    <div 
                      className="h-3 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${skill.level}%`,
                        background: 'linear-gradient(90deg, #692be0, #ba9df1)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="animate-fade-in">
            <div className="grid gap-6">
              {projects.map((project, index) => (
                <div key={index} className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'rgba(105, 43, 224, 0.2)' }}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold" style={{ color: '#f3eefc' }}>{project.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'In development' ? 'bg-yellow-500 text-yellow-900' :
                      project.status === 'Planning' ? 'bg-blue-500 text-blue-900' : 'bg-green-500 text-green-900'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="mb-4" style={{ color: '#d6c5f7' }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 rounded-full text-sm font-medium" 
                            style={{ backgroundColor: 'rgba(186, 157, 241, 0.3)', color: '#f3eefc' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#ba9df1' }}>Downloads: {project.downloads}</span>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(186, 157, 241, 0.3)' }}>
                        <Github className="w-4 h-4" style={{ color: '#f3eefc' }} />
                      </button>
                      <button className="p-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(186, 157, 241, 0.3)' }}>
                        <ExternalLink className="w-4 h-4" style={{ color: '#f3eefc' }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="animate-fade-in">
            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'rgba(105, 43, 224, 0.2)' }}>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(186, 157, 241, 0.3)' }}>
                      <Trophy className="w-6 h-6" style={{ color: '#fbbf24' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#f3eefc' }}>{achievement.title}</h3>
                      <p className="mb-3" style={{ color: '#d6c5f7' }}>{achievement.description}</p>
                      <div className="flex items-center text-sm" style={{ color: '#ba9df1' }}>
                        <Calendar className="w-4 h-4 mr-2" />
                        {achievement.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'learning':
        return (
          <div className="animate-fade-in">
            <div className="space-y-6">
              {learningPath.map((phase, index) => (
                <div key={index} className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'rgba(105, 43, 224, 0.2)' }}>
                  <div className="flex items-center mb-4">
                    <div className={`w-4 h-4 rounded-full mr-4 ${
                      phase.completed ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <h3 className="text-xl font-bold" style={{ color: '#f3eefc' }}>{phase.phase}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} className={`px-3 py-1 rounded-full text-sm font-medium ${
                        phase.completed 
                          ? 'bg-green-500/30 text-green-200' 
                          : 'bg-gray-500/30 text-gray-300'
                      }`}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #692be0 0%, #814de5 25%, #9d75eb 50%, #ba9df1 75%, #d6c5f7 100%)'
    }}>
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: '#ba9df1' }}></div>
        <div className="absolute top-32 right-20 w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#9d75eb' }}></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#d6c5f7' }}></div>
        <div className="absolute bottom-40 right-1/3 w-5 h-5 rounded-full animate-pulse" style={{ backgroundColor: '#814de5' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            {/* Profile Picture */}
            <div className="mb-6">
              <div className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 mx-auto rounded-full border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden"
                   style={{ 
                     background: 'linear-gradient(135deg, #692be0, #814de5)',
                     boxShadow: '0 20px 40px rgba(105, 43, 224, 0.5), 0 0 20px rgba(105, 43, 224, 0.3)'
                   }}>
                <img 
                  src="/assets/profile.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover object-center"
                  style={{
                    imageRendering: 'crisp-edges',
                    imageRendering: '-webkit-optimize-contrast',
                    imageRendering: 'pixelated'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('flex');
                    e.target.parentElement.innerHTML = '<div class="text-4xl md:text-5xl font-bold text-white">MC</div>';
                  }}
                />
              </div>
            </div>

            <div className="inline-block p-4 rounded-2xl backdrop-blur-sm mb-6" style={{ backgroundColor: 'rgba(105, 43, 224, 0.3)' }}>
              <Gamepad2 className="w-16 h-16" style={{ color: '#ba9df1' }} />
            </div>

            {/* Typing Effect Title */}
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent drop-shadow-lg min-h-[4rem]">
              <TextType text="Minecraft Developer" speed={80}/>
            </h1>

            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#d6c5f7' }}>
              Beginning my journey in Minecraft plugin development. Learning the fundamentals
              and building my first plugins step by step.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center space-x-2 mb-8">
            {['overview', 'skills', 'projects', 'achievements', 'learning'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === section
                    ? 'text-white shadow-lg'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: activeSection === section ? '#692be0' : 'rgba(157, 117, 235, 0.3)',
                  color: activeSection === section ? 'white' : '#f3eefc',
                  boxShadow: activeSection === section ? '0 10px 20px rgba(105, 43, 224, 0.5)' : 'none'
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t" style={{ borderColor: 'rgba(186, 157, 241, 0.3)' }}>
        <p style={{ color: '#d6c5f7' }}>
          Built using React & AI help
        </p>
      </footer>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        .neon-text {
          text-shadow: 0 0 5px #692be0, 0 0 10px #692be0, 0 0 15px #692be0;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MinecraftDevResume;