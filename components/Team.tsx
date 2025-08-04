'use client';

import { useInView } from 'react-intersection-observer';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const Team = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleBookCall = () => {
    window.open('https://calendly.com/farvuemedia', '_blank');
  };

  const teamMembers = [
    {
      name: 'Rehmanmesud',
      role: 'Founder & Lead Strategist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format',
      bio: 'Founder of FARVUE Media. With a deep passion for storytelling and over 3 years of creative leadership, Rehman helps creators scale with strategy-backed, high-retention video content.',
      skills: ['Creative Direction', 'Content Strategy', 'After Effects', 'Premiere Pro'],
      social: {
        linkedin: 'https://linkedin.com/in/rehmanmesud',
        twitter: 'https://twitter.com/rehmanmesud',
        instagram: 'https://instagram.com/rehmanmesud'
      }
    },
    {
      name: 'Fazal Mesud',
      role: 'Co-Founder & Design Head',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&auto=format',
      bio: 'Co-founder of FARVUE Media. Fazal blends creativity and psychology to craft thumbnails and visuals that stop the scroll and elevate creator brands.',
      skills: ['Photoshop', 'Illustrator', 'Figma', 'Visual Branding'],
      social: {
        linkedin: 'https://linkedin.com/in/fazalmesud',
        twitter: 'https://twitter.com/fazalmesud',
        instagram: 'https://instagram.com/fazalmesud'
      }
    }
  ];

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
            Duo
          </p>
          <h2 className='heading-lg mb-6'>
            Meet the{' '}
            <span className='text-accent italic'>incredible</span>{' '}
            duo.
          </h2>
          <p className='text-gray-300 text-lg max-w-3xl mx-auto mb-8'>
            We pride ourselves of being the best of the best and we encapsulates that.
          </p>
          
          <button
            onClick={handleBookCall}
            className='btn-primary text-lg px-8 py-4 shadow-glow'
            aria-label='Book a 30-minute consultation call'
          >
            Book a 30-min call →
          </button>
        </div>

        {/* Team Grid */}
        <div 
          ref={ref}
          className='grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto'
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group transition-all duration-700 ${
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
                      <div className='flex space-x-4'>
                        <a
                          href={member.social.linkedin}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-secondary-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500'
                          aria-label={`${member.name}'s LinkedIn profile`}
                        >
                          <Linkedin className='w-5 h-5' />
                        </a>
                        <a
                          href={member.social.twitter}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-secondary-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500'
                          aria-label={`${member.name}'s Twitter profile`}
                        >
                          <Twitter className='w-5 h-5' />
                        </a>
                        <a
                          href={member.social.instagram}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-secondary-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500'
                          aria-label={`${member.name}'s Instagram profile`}
                        >
                          <Instagram className='w-5 h-5' />
                        </a>
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

        {/* Team Stats */}
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
              <div className='text-3xl lg:text-4xl font-bold text-accent-500 mb-2'>
                {stat.value}
              </div>
              <div className='text-gray-400 text-sm uppercase tracking-wider'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;