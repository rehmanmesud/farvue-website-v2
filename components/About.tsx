'use client';

import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleViewPage = () => {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const clients = [
    {
      name: 'William Nazarkevich',
      role: 'Content Creator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format',
    },
    {
      name: 'Sarah Mitchell',
      role: 'YouTuber',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=60&h=60&fit=crop&crop=face&auto=format',
    },
    {
      name: 'Marcus Chen',
      role: 'Business Consultant',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format',
    },
    {
      name: 'Alex Thompson',
      role: 'Entrepreneur',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=60&h=60&fit=crop&crop=face&auto=format',
    },
  ];

  return (
    <section 
      id='about' 
      className='section-padding bg-dark-900'
      role='region'
      aria-label='About FARVUE Media'
    >
      <div className='container-custom'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          
          {/* Left Column - Main Content */}
          <div 
            ref={ref}
            className={`transition-all duration-1000 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className='heading-lg mb-8'>
              Here at FARVUE we focus on returns. We&apos;re dedicated to scaling your brand with{' '}
              <span className='text-accent'>Editing</span> &{' '}
              <span className='text-accent'>Designing</span>. Break free and take your brand to the next level.
            </h2>
            
            <button
              onClick={handleViewPage}
              className='btn-primary group'
              aria-label='View our services and portfolio'
            >
              View our Services
              <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200' aria-hidden='true' />
            </button>
          </div>

          {/* Right Column - Client Testimonials */}
          <div 
            className={`transition-all duration-1000 delay-300 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className='grid grid-cols-2 gap-4'>
              {clients.map((client, index) => (
                <div
                  key={client.name}
                  className={`card hover:shadow-glow transition-all duration-500 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className='flex items-center space-x-3'>
                    <img
                      src={client.avatar}
                      alt={`${client.name} - ${client.role}`}
                      className='w-12 h-12 rounded-full ring-2 ring-secondary-500/30'
                      loading='lazy'
                    />
                    <div>
                      <h4 className='font-semibold text-white text-sm'>{client.name}</h4>
                      <p className='text-gray-400 text-xs'>{client.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Long Form Editing Section */}
        <div className='mt-20 pt-16 border-t border-dark-700'>
          <div className='text-center mb-12'>
            <p className='text-secondary-400 font-medium mb-4 tracking-wider uppercase text-sm'>
              Editing Work
            </p>
            <h3 className='heading-md mb-6'>
              Long form editing{' '}
              <span className='text-accent italic'>work.</span>
            </h3>
            <p className='text-gray-300 text-lg max-w-3xl mx-auto'>
              We&apos;ve worked across a number of creators and here are our best long form 
              editing works. Check it out.
            </p>
          </div>

          {/* Work Preview Grid - Placeholder for actual work samples */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3].map((item, index) => (
              <div
                key={item}
                className={`card-gradient group cursor-pointer transition-all duration-500 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
                role='button'
                tabIndex={0}
                aria-label={`View work sample ${item}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    // Handle work sample view
                  }
                }}
              >
                <div className='aspect-video bg-gradient-to-br from-primary-900/30 to-secondary-900/30 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300'>
                  <div className='w-12 h-12 bg-white/10 rounded-full flex items-center justify-center'>
                    <div className='w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-1'></div>
                  </div>
                </div>
                <h4 className='font-semibold text-white mb-2'>Sample Project {item}</h4>
                <p className='text-gray-400 text-sm'>High-retention long-form content editing</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;