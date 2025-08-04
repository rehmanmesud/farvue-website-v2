'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Twitter, Instagram, Github, Globe, RefreshCw } from 'lucide-react';
import { getTeamData, getTeamSettings, refreshTeamData } from '@/lib/data/cms-team';

const Team = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for CMS-managed team data
  const [teamMembers, setTeamMembers] = useState(getTeamData());
  const [teamSettings, setTeamSettings] = useState(getTeamSettings());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const refreshedData = refreshTeamData();
      setTeamMembers(refreshedData.members.filter(m => m.isVisible).sort((a, b) => a.order - b.order));
      setTeamSettings(refreshedData.settings);
      console.log('✅ Team data refreshed from admin changes');
    } catch (error) {
      console.error('❌ Failed to refresh team data:', error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  // Refresh team data from CMS (real-time updates)
  useEffect(() => {
    const refreshTeam = () => {
      const refreshedData = refreshTeamData();
      setTeamMembers(refreshedData.members.filter(m => m.isVisible).sort((a, b) => a.order - b.order));
      setTeamSettings(refreshedData.settings);
    };
    
    // Refresh every 3 seconds to pick up admin changes
    const interval = setInterval(refreshTeam, 3000);
    
    // Also refresh when the page becomes visible (tab switching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshTeam();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleBookCall = () => {
    window.open(teamSettings.buttonUrl || 'https://calendly.com/farvuemedia', '_blank');
  };

  // Get social media icon component
  const getSocialIcon = (platform: string) => {
    const icons = {
      linkedin: Linkedin,
      twitter: Twitter,
      instagram: Instagram,
      github: Github,
      website: Globe
    };
    return icons[platform as keyof typeof icons] || Globe;
  };

  // If team section is not visible, don't render
  if (!teamSettings.isVisible) return null;

  return (
    <section 
      className='section-padding bg-dark-900'
      role='region'
      aria-label='Meet our team'
    >
      <div className='container-custom'>
        
        {/* Section Header */}
        <div className='text-center mb-16'>
          <p className='text-secondary-400 font-medium mb-4 tracking-wider uppercase text-sm'>
            {teamSettings.sectionLabel}
          </p>
          <h2 className='text-h2 font-bold leading-tight mb-6'>
            {teamSettings.heading.split(' ').map((word, index) => 
              word === 'incredible' ? (
                <span key={index} className='text-accent-red u-underline'>{word}</span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h2>
          <p className='lead max-w-3xl mx-auto mb-6'>
            {teamSettings.description}
          </p>
          
          {/* CMS Refresh Button */}
          <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8'>
            <button
              onClick={handleBookCall}
              className='btn-primary text-lg px-8 py-4 shadow-glow'
              aria-label='Book a consultation call'
            >
              {teamSettings.buttonText}
            </button>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isRefreshing 
                  ? 'bg-secondary-600 text-white cursor-not-allowed' 
                  : 'bg-secondary-500 hover:bg-secondary-600 text-white'
              }`}
              aria-label="Refresh team data from admin panel changes"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Team'}
            </button>
          </div>
        </div>

        {/* Team Grid - Centered regardless of member count */}
        <div 
          ref={ref}
          className='flex flex-wrap justify-center gap-8 max-w-6xl mx-auto'
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`w-full max-w-sm group transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className='bg-dark-800 rounded-2xl overflow-hidden border border-dark-700 hover:border-secondary-500/50 transition-all duration-300 hover:shadow-glow'>
                
                {/* Member Image */}
                <div className='relative aspect-square overflow-hidden bg-gradient-to-br from-primary-900/20 to-secondary-900/20'>
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    loading='lazy'
                  />
                  
                  {/* Overlay with social links */}
                  <div className='absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='absolute bottom-6 left-6 right-6'>
                      <div className='flex justify-center space-x-4'>
                        {Object.entries(member.social).map(([platform, url]) => {
                          if (!url) return null;
                          const IconComponent = getSocialIcon(platform);
                          return (
                            <a
                              key={platform}
                              href={url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-secondary-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500'
                              aria-label={`${member.name}'s ${platform} profile`}
                            >
                              <IconComponent className='w-5 h-5' />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className='p-6'>
                  <div className='text-center mb-4'>
                    <h3 className='text-xl font-semibold text-white mb-1'>{member.name}</h3>
                    <p className='text-secondary-400 font-medium'>{member.role}</p>
                  </div>
                  
                  <p className='text-gray-300 text-sm leading-relaxed mb-6 text-center'>
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className='space-y-3'>
                    <p className='text-xs font-medium text-secondary-400 uppercase tracking-wider'>
                      Skills
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className='px-3 py-1 bg-dark-700 text-gray-300 text-xs rounded-full border border-dark-600'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats - Only show if enabled in settings */}
        {teamSettings.showStats && (
          <div 
            className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-dark-700 transition-all duration-700 delay-600 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              { label: 'Years Experience', value: '5+' },
              { label: 'Videos Edited', value: '500+' },
              { label: 'Happy Clients', value: '50+' },
              { label: 'Total Views', value: '10M+' }
            ].map((stat, index) => (
              <div key={stat.label} className='text-center'>
                <div className='text-3xl lg:text-4xl font-bold text-accent-red mb-2'>
                  {stat.value}
                </div>
                <div className='text-gray-400 text-sm uppercase tracking-wider'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;