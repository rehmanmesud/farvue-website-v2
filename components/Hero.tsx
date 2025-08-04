'use client';

import { useState, useEffect } from 'react';
import { Star, Play } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBookCall = () => {
    window.open('https://calendly.com/farvuemedia', '_blank');
  };

  const handleLearnMore = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Mock client avatars - in a real app, these would be actual client images
  const clientAvatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format',
    'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face&auto=format',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=face&auto=format',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format'
  ];

  return (
    <section 
      className='relative min-h-screen flex items-center justify-center bg-dark-900 overflow-hidden'
      role='banner'
      aria-label='Hero section'
    >
      {/* Animated background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900/20 to-secondary-900/20'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 to-transparent'></div>
      </div>

      {/* Animated particles/dots background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-secondary-500 rounded-full animate-pulse'></div>
        <div className='absolute top-3/4 right-1/4 w-1 h-1 bg-accent-500 rounded-full animate-pulse delay-300'></div>
        <div className='absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse delay-700'></div>
      </div>

      <div className='relative z-10 container-custom text-center'>
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Client testimonial preview */}
          <div className='mb-8 flex flex-col items-center space-y-4'>
            <div className='flex -space-x-2'>
              {clientAvatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Client ${index + 1}`}
                  className='w-10 h-10 rounded-full border-2 border-dark-900 ring-2 ring-secondary-500/30'
                  loading='eager'
                />
              ))}
            </div>
            <div className='flex items-center space-x-1 text-sm text-gray-300'>
              <div className='flex text-yellow-400'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-4 h-4 fill-current' aria-hidden='true' />
                ))}
              </div>
              <span className='ml-2'>Loved by creators worldwide</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className='heading-xl mb-6 max-w-5xl mx-auto'>
            Ready to{' '}
            <span className='text-accent relative'>
              scale
              <div className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full'></div>
            </span>{' '}
            your brand with editing?
          </h1>

          {/* Subtitle */}
          <p className='text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed'>
            Working with personal brands to make them attract their dream customers 
            through designing and editing.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <button
              onClick={handleBookCall}
              className='btn-primary text-lg px-8 py-4 shadow-glow'
              aria-label='Book a consultation call to get started'
            >
              Book a call
            </button>
            <button
              onClick={handleLearnMore}
              className='btn-outline text-lg px-8 py-4 group'
              aria-label='Learn more about our services'
            >
              <Play className='w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200' aria-hidden='true' />
              Learn More
            </button>
          </div>

          {/* Trust indicators */}
          <div className='mt-16 pt-8 border-t border-dark-700'>
            <p className='text-sm text-gray-400 mb-4'>You&apos;re in good hands:</p>
            <div className='flex flex-wrap justify-center items-center space-x-8 opacity-60'>
              <div className='text-sm font-medium'>500+ Videos Edited</div>
              <div className='text-sm font-medium'>50+ Happy Clients</div>
              <div className='text-sm font-medium'>2+ Years Experience</div>
              <div className='text-sm font-medium'>24/7 Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
        <div className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce'></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;