'use client';

import { useInView } from 'react-intersection-observer';
import { X, Check } from 'lucide-react';

const WhyChooseUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const otherAgencies = [
    'Slow communication',
    'Slow Delivery',
    'No Revisions',
    'Outsourced to mediocre talent'
  ];

  const farvueMedia = [
    'Constant, proactive communication',
    'Delivery on time',
    'Unlimited Revisions',
    'Experts with 2+ years of experience'
  ];

  return (
    <section 
      className='section-padding bg-gradient-to-br from-dark-900 via-primary-900/5 to-secondary-900/5'
      role='region'
      aria-label='Why choose FARVUE Media'
    >
      <div className='container-custom'>
        
        {/* Section Header */}
        <div className='text-center mb-16'>
          <p className='text-secondary-400 font-medium mb-4 tracking-wider uppercase text-sm'>
            Comparison
          </p>
          <h2 className='heading-lg mb-6 max-w-4xl mx-auto'>
            But, why would you want to work{' '}
            <span className='text-accent italic'>with us?</span>
          </h2>
        </div>

        {/* Comparison Grid */}
        <div 
          ref={ref}
          className='grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-20'
        >
          
          {/* Other Agencies Column */}
          <div 
            className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className='text-center mb-8'>
              <h3 className='text-2xl font-semibold text-gray-400 mb-2'>Other Agencies</h3>
            </div>
            
            <div className='space-y-4'>
              {otherAgencies.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 bg-dark-800/50 rounded-lg border border-dark-700 transition-all duration-500 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className='flex-shrink-0 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center'>
                    <X className='w-4 h-4 text-red-400' aria-hidden='true' />
                  </div>
                  <span className='text-gray-300'>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FARVUE Media Column */}
          <div 
            className={`transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className='text-center mb-8'>
              <h3 className='text-2xl font-semibold text-white mb-2'>FARVUE Media</h3>
              <div className='w-20 h-1 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full mx-auto'></div>
            </div>
            
            <div className='space-y-4'>
              {farvueMedia.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 bg-gradient-to-r from-secondary-900/20 to-accent-900/20 rounded-lg border border-secondary-500/30 transition-all duration-500 hover:shadow-glow ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className='flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center'>
                    <Check className='w-4 h-4 text-green-400' aria-hidden='true' />
                  </div>
                  <span className='text-white font-medium'>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Teaser */}
        <div 
          className={`text-center transition-all duration-700 delay-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className='text-secondary-400 font-medium mb-4 tracking-wider uppercase text-sm'>
            Testimonials
          </p>
          <h3 className='heading-md mb-6'>
            There&apos;s a reason people are{' '}
            <span className='text-accent italic'>raving</span>{' '}
            about us.
          </h3>
          
          {/* Preview testimonial cards */}
          <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12'>
            {[
              {
                name: 'Thomas',
                role: 'Digital Creator',
                preview: 'My results and online presence went through the roof more or less overnight...'
              },
              {
                name: 'Agency Owner',
                role: 'Business Owner',
                preview: 'These guys don\'t mess around, we saw results from month one...'
              },
              {
                name: 'Ferdinand Ritter',
                role: 'Agency Owner',
                preview: 'say how much we appreciate the amazing work you\'ve been doing with us...'
              }
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`card-gradient text-left transition-all duration-500 hover:shadow-glow ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                <div className='flex items-center space-x-3 mb-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center'>
                    <span className='text-white font-semibold text-sm'>
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-white text-sm'>{testimonial.name}</h4>
                    <p className='text-gray-400 text-xs'>{testimonial.role}</p>
                  </div>
                </div>
                <p className='text-gray-300 text-sm leading-relaxed'>
                  &quot;{testimonial.preview}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;