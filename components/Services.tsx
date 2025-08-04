'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Video, Palette, Bot, Code, ArrowRight, Settings } from 'lucide-react';
import { getVisibleServices } from '@/lib/data/cms-services';

const Services = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for CMS-managed services
  const [cmsServices, setCmsServices] = useState(getVisibleServices());

  // Refresh services data from CMS (simulates real-time updates)
  useEffect(() => {
    const refreshServices = () => {
      setCmsServices(getVisibleServices());
    };
    
    // Refresh every 10 seconds to pick up admin changes
    const interval = setInterval(refreshServices, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Icon mapping for categories
  const getServiceIcon = (category: string) => {
    const icons = {
      editing: Video,
      design: Palette,
      automation: Bot,
      development: Code
    };
    return icons[category as keyof typeof icons] || Settings;
  };

  // Gradient mapping for categories
  const getServiceGradient = (category: string) => {
    const gradients = {
      editing: 'from-primary-900/20 to-secondary-900/20',
      design: 'from-accent-900/20 to-primary-900/20',
      automation: 'from-secondary-900/20 to-accent-900/20',
      development: 'from-primary-900/20 to-accent-900/20'
    };
    return gradients[category as keyof typeof gradients] || 'from-gray-900/20 to-slate-900/20';
  };

  // Icon color mapping for categories
  const getServiceIconColor = (category: string) => {
    const colors = {
      editing: 'text-primary-400',
      design: 'text-accent-400',
      automation: 'text-secondary-400',
      development: 'text-primary-500'
    };
    return colors[category as keyof typeof colors] || 'text-gray-400';
  };

  // Transform CMS services to component format
  const services = cmsServices.map(service => ({
    icon: getServiceIcon(service.category),
    title: service.name,
    description: service.description,
    features: service.subServices || service.features.slice(0, 5), // Use sub-services or first 5 features
    gradient: getServiceGradient(service.category),
    iconColor: getServiceIconColor(service.category),
    iconUrl: service.iconUrl,
    imageUrl: service.imageUrl
  }));

  const handleGetStarted = (serviceName: string) => {
    window.open(`https://calendly.com/farvuemedia?service=${serviceName.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
  };

  return (
    <section 
      id='services' 
      className='section-padding bg-gradient-to-br from-dark-900 via-primary-900/5 to-secondary-900/5'
      role='region'
      aria-label='Our services'
    >
      <div className='container-custom'>
        
        {/* Section Header */}
        <div className='text-center mb-16'>
          <p className='text-secondary-400 font-medium mb-4 tracking-wider uppercase text-sm'>
            Services
          </p>
          <h2 className='heading-lg mb-6'>
            Your {services.length} Core Service{services.length !== 1 ? 's' : ''}{' '}
            <span className='text-accent italic'>+ Subsections</span>
          </h2>
          <p className='text-gray-300 text-lg max-w-3xl mx-auto'>
            From high-impact video editing to AI automation and custom web development - 
            we&apos;ve got everything you need to scale your business.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={ref}
          className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16'
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className={`group transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`h-full p-8 rounded-2xl bg-gradient-to-br ${service.gradient} border border-dark-700 hover:border-secondary-500/50 transition-all duration-300 hover:shadow-glow`}>
                  
                  {/* Service Icon */}
                  <div className='mb-6'>
                    <div className='w-16 h-16 bg-dark-800/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      <IconComponent className={`w-8 h-8 ${service.iconColor}`} aria-hidden='true' />
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className='mb-6'>
                    <h3 className='text-2xl font-semibold text-white mb-4'>{service.title}</h3>
                    <p className='text-gray-300 leading-relaxed mb-6'>
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className='space-y-2' role='list'>
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className='flex items-center space-x-2 text-sm text-gray-400'>
                          <div className='w-1.5 h-1.5 bg-secondary-400 rounded-full flex-shrink-0'></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleGetStarted(service.title)}
                    className='inline-flex items-center text-secondary-400 hover:text-secondary-300 font-medium group-hover:translate-x-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded'
                    aria-label={`Get started with ${service.title} service`}
                  >
                    Get Started
                    <ArrowRight className='w-4 h-4 ml-2' aria-hidden='true' />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div 
          className={`text-center transition-all duration-700 delay-600 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className='bg-gradient-to-r from-primary-900/20 via-secondary-900/20 to-accent-900/20 rounded-2xl p-8 lg:p-12 border border-secondary-500/20'>
            <h3 className='heading-md mb-4'>
              Ready to scale your brand to{' '}
              <span className='text-accent italic'>new heights?</span>
            </h3>
            <p className='text-gray-300 text-lg mb-8 max-w-2xl mx-auto'>
              It might be the start of something big! Let&apos;s discuss how we can help 
              transform your content and grow your audience.
            </p>
            <button
              onClick={() => handleGetStarted('consultation')}
              className='btn-primary text-lg px-8 py-4 shadow-glow'
              aria-label='Book a free consultation call'
            >
              Book a call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;