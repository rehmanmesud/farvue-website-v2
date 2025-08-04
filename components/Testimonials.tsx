'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Play, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const clients = [
    {
      name: 'Andrew Watt',
      followers: '74k followers',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
    },
    {
      name: 'Scott Henry',
      role: 'Lead Generation Consultant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
    },
    {
      name: 'Jay Vawzen',
      followers: '187k followers',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face&auto=format',
    },
    {
      name: 'Izan Garcia',
      followers: '553k followers',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format',
    },
  ];

  const testimonials = [
    {
      id: 1,
      client: 'Andrew Watt',
      content: 'My results and online presence went through the roof more or less overnight. Their editing style perfectly matches my brand and the turnaround time is incredible.',
      rating: 5,
      videoThumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop&auto=format',
    },
    {
      id: 2,
      client: 'Scott Henry',
      content: 'These guys don\'t mess around, we saw results from month one. If you want to scale your content, these are the people to work with.',
      rating: 5,
      videoThumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=225&fit=crop&auto=format',
    },
    {
      id: 3,
      client: 'Jay Vawzen',
      content: 'FARVUE Media has been instrumental in growing my channel. Their attention to detail and creative vision is exactly what I needed.',
      rating: 5,
      videoThumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&h=225&fit=crop&auto=format',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handlePlayVideo = (testimonialId: number) => {
    // In a real application, this would open a video modal or player
    console.log(`Playing testimonial video ${testimonialId}`);
  };

  return (
    <section 
      className='section-padding bg-dark-900'
      role='region'
      aria-label='Client testimonials'
    >
      <div className='container-custom'>
        
        {/* Client Avatars Row */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className='text-secondary-400 font-medium mb-8 tracking-wider uppercase text-sm'>
            Our Clients
          </p>
          <div className='flex justify-center items-center space-x-6 lg:space-x-12 mb-8'>
            {clients.map((client, index) => (
              <div
                key={client.name}
                className={`text-center transition-all duration-500 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={client.avatar}
                  alt={client.name}
                  className='w-16 h-16 lg:w-20 lg:h-20 rounded-full mx-auto mb-3 ring-2 ring-secondary-500/30 hover:ring-secondary-500/60 transition-all duration-300'
                  loading='lazy'
                />
                <h4 className='font-semibold text-white text-sm lg:text-base'>{client.name}</h4>
                <p className='text-gray-400 text-xs lg:text-sm'>
                  {client.role || client.followers}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Testimonial Section */}
        <div 
          ref={ref}
          className={`transition-all duration-700 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className='text-center mb-12'>
            <h2 className='heading-lg mb-6'>
              Hear it directly from{' '}
              <span className='text-accent italic'>our clients.</span>
            </h2>
            <p className='text-gray-300 text-lg max-w-3xl mx-auto'>
              Hear what our clients have to say. Our testimonials reflect 
              the satisfaction our clients have in our services.
            </p>
          </div>

          {/* Video Testimonials Carousel */}
          <div className='relative max-w-6xl mx-auto'>
            <div className='grid lg:grid-cols-2 gap-8 items-center'>
              
              {/* Video Player Area */}
              <div className='relative'>
                <div 
                  className='aspect-video bg-dark-800 rounded-xl overflow-hidden cursor-pointer group hover:shadow-glow transition-all duration-300'
                  onClick={() => handlePlayVideo(testimonials[currentSlide].id)}
                  role='button'
                  tabIndex={0}
                  aria-label={`Play testimonial video from ${testimonials[currentSlide].client}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePlayVideo(testimonials[currentSlide].id);
                    }
                  }}
                >
                  <img
                    src={testimonials[currentSlide].videoThumbnail}
                    alt={`${testimonials[currentSlide].client} testimonial video`}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    loading='lazy'
                  />
                  <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                        <Play className='w-6 h-6 text-dark-900 ml-1' fill='currentColor' />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className='flex justify-center space-x-4 mt-6'>
                  <button
                    onClick={prevSlide}
                    className='w-10 h-10 bg-dark-800 hover:bg-secondary-500 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500'
                    aria-label='Previous testimonial'
                  >
                    <ChevronLeft className='w-5 h-5 text-white' />
                  </button>
                  <button
                    onClick={nextSlide}
                    className='w-10 h-10 bg-dark-800 hover:bg-secondary-500 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500'
                    aria-label='Next testimonial'
                  >
                    <ChevronRight className='w-5 h-5 text-white' />
                  </button>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className='space-y-6'>
                <div className='flex text-yellow-400 mb-4'>
                  {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                    <Star key={i} className='w-5 h-5 fill-current' />
                  ))}
                </div>
                
                <blockquote className='text-xl lg:text-2xl text-white leading-relaxed font-medium'>
                  &quot;{testimonials[currentSlide].content}&quot;
                </blockquote>
                
                <div className='flex items-center space-x-4'>
                  <img
                    src={clients.find(c => c.name === testimonials[currentSlide].client)?.avatar}
                    alt={testimonials[currentSlide].client}
                    className='w-12 h-12 rounded-full ring-2 ring-secondary-500/30'
                    loading='lazy'
                  />
                  <div>
                    <p className='font-semibold text-white'>{testimonials[currentSlide].client}</p>
                    <p className='text-gray-400 text-sm'>
                      {clients.find(c => c.name === testimonials[currentSlide].client)?.role || 
                       clients.find(c => c.name === testimonials[currentSlide].client)?.followers}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className='flex justify-center space-x-2 mt-8'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                    index === currentSlide ? 'bg-secondary-500' : 'bg-dark-700 hover:bg-dark-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;