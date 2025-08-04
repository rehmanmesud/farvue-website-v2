'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Play, ExternalLink, Filter } from 'lucide-react';

const Portfolio = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Work' },
    { id: 'longform', name: 'Long Form' },
    { id: 'shortform', name: 'Short Form' },
    { id: 'thumbnails', name: 'Thumbnails' },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Viral YouTube Video',
      category: 'longform',
      type: 'Long Form Editing',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop&auto=format',
      before: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=112&fit=crop&auto=format',
      after: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=112&fit=crop&auto=format',
      stats: '2.5M Views',
      description: 'Full YouTube video editing with motion graphics and color grading',
    },
    {
      id: 2,
      title: 'Instagram Reel Series',
      category: 'shortform',
      type: 'Short Form Editing',
      thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&h=225&fit=crop&auto=format',
      before: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=112&fit=crop&auto=format',
      after: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=112&fit=crop&auto=format',
      stats: '500K Views',
      description: 'High-retention Instagram reels with trending effects',
    },
    {
      id: 3,
      title: 'YouTube Thumbnail Design',
      category: 'thumbnails',
      type: 'Thumbnail Design',
      thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=225&fit=crop&auto=format',
      before: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=200&h=112&fit=crop&auto=format',
      after: 'https://images.unsplash.com/photo-1611605698320-d286de9eb8a1?w=200&h=112&fit=crop&auto=format',
      stats: '25% CTR',
      description: 'Eye-catching thumbnail design that increased click-through rate',
    },
    {
      id: 4,
      title: 'TikTok Viral Content',
      category: 'shortform',
      type: 'Short Form Editing',
      thumbnail: 'https://images.unsplash.com/photo-1611162618757-6b77c8c6bd21?w=400&h=225&fit=crop&auto=format',
      before: 'https://images.unsplash.com/photo-1611162618757-6b77c8c6bd21?w=200&h=112&fit=crop&auto=format',
      after: 'https://images.unsplash.com/photo-1611162618269-babe7b7b90b8?w=200&h=112&fit=crop&auto=format',
      stats: '1M Views',
      description: 'Trending TikTok content with fast-paced editing',
    },
    {
      id: 5,
      title: 'Educational YouTube Series',
      category: 'longform',
      type: 'Long Form Editing',
      thumbnail: 'https://images.unsplash.com/photo-1611162618479-ee6b4220013a?w=400&h=225&fit=crop&auto=format',
      before: 'https://images.unsplash.com/photo-1611162618479-ee6b4220013a?w=200&h=112&fit=crop&auto=format',
      after: 'https://images.unsplash.com/photo-1611162618744-84c2c9b09861?w=200&h=112&fit=crop&auto=format',
      stats: '750K Views',
      description: 'Educational content with animated graphics and explanations',
    },
    {
      id: 6,
      title: 'Brand Thumbnail Set',
      category: 'thumbnails',
      type: 'Thumbnail Design',
      thumbnail: 'https://images.unsplash.com/photo-1611605698288-85b77a9effa8?w=400&h=225&fit=crop&auto=format',
      before: 'https://images.unsplash.com/photo-1611605698288-85b77a9effa8?w=200&h=112&fit=crop&auto=format',
      after: 'https://images.unsplash.com/photo-1611605698293-2ecedf5ca6bc?w=200&h=112&fit=crop&auto=format',
      stats: '30% CTR',
      description: 'Consistent brand thumbnail designs for YouTube channel',
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const handlePlayVideo = (itemId: number) => {
    // In a real application, this would open a video player or modal
    console.log(`Playing portfolio item ${itemId}`);
  };

  const handleViewFullProject = (itemId: number) => {
    // In a real application, this would open a detailed project view
    console.log(`Viewing full project ${itemId}`);
  };

  return (
    <section 
      id='work' 
      className='section-padding bg-gradient-to-br from-dark-900 via-primary-900/5 to-secondary-900/5'
      role='region'
      aria-label='Our portfolio and work samples'
    >
      <div className='container-custom'>
        
        {/* Section Header */}
        <div className='text-center mb-12'>
          <p className='text-secondary-400 font-medium mb-4 tracking-wider uppercase text-sm'>
            Editing Work
          </p>
          <h2 className='heading-lg mb-6'>
            Our latest{' '}
            <span className='text-accent italic'>work.</span>
          </h2>
          <p className='text-gray-300 text-lg max-w-3xl mx-auto mb-8'>
            We&apos;ve worked across a number of creators and here are our best 
            editing works. Check it out.
          </p>

          {/* Filter Buttons */}
          <div className='flex flex-wrap justify-center gap-4'>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 ${
                  activeFilter === filter.id
                    ? 'bg-secondary-500 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-white border border-dark-600'
                }`}
                aria-label={`Filter portfolio by ${filter.name}`}
              >
                <Filter className='w-4 h-4 inline mr-2' aria-hidden='true' />
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div 
          ref={ref}
          className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className='bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-secondary-500/50 transition-all duration-300 hover:shadow-glow'>
                
                {/* Main Thumbnail */}
                <div className='relative aspect-video overflow-hidden'>
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} - ${item.type}`}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    loading='lazy'
                  />
                  
                  {/* Play Button Overlay */}
                  <div 
                    className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 cursor-pointer flex items-center justify-center'
                    onClick={() => handlePlayVideo(item.id)}
                    role='button'
                    tabIndex={0}
                    aria-label={`Play ${item.title} video`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handlePlayVideo(item.id);
                      }
                    }}
                  >
                    <div className='w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      <Play className='w-5 h-5 text-dark-900 ml-0.5' fill='currentColor' />
                    </div>
                  </div>

                  {/* Stats Badge */}
                  <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium'>
                    {item.stats}
                  </div>
                </div>

                {/* Before/After Section (for applicable items) */}
                {item.before && item.after && (
                  <div className='p-4 border-b border-dark-700'>
                    <div className='flex space-x-2'>
                      <div className='flex-1'>
                        <p className='text-xs text-gray-400 mb-2'>Original</p>
                        <img
                          src={item.before}
                          alt={`${item.title} - Before`}
                          className='w-full aspect-video object-cover rounded-lg'
                          loading='lazy'
                        />
                      </div>
                      <div className='flex-1'>
                        <p className='text-xs text-gray-400 mb-2'>My Style</p>
                        <img
                          src={item.after}
                          alt={`${item.title} - After`}
                          className='w-full aspect-video object-cover rounded-lg'
                          loading='lazy'
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className='p-6'>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-xs font-medium text-secondary-400 uppercase tracking-wider'>
                      {item.type}
                    </span>
                  </div>
                  
                  <h3 className='text-lg font-semibold text-white mb-2 group-hover:text-secondary-400 transition-colors duration-200'>
                    {item.title}
                  </h3>
                  
                  <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
                    {item.description}
                  </p>

                  <button
                    onClick={() => handleViewFullProject(item.id)}
                    className='inline-flex items-center text-secondary-400 hover:text-secondary-300 text-sm font-medium group-hover:translate-x-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded'
                    aria-label={`View full ${item.title} project`}
                  >
                    View Project
                    <ExternalLink className='w-4 h-4 ml-2' aria-hidden='true' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className='text-center mt-12'>
          <button
            className='btn-secondary'
            aria-label='View more portfolio items'
          >
            View More Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;