'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const handleBookCall = () => {
    window.open('https://calendly.com/farvuemedia', '_blank');
  };

  const faqItems = [
    {
      question: 'How many revision option will I get for per video edit?',
      answer: 'We offer unlimited revisions on all our packages until you\'re completely satisfied with the final result. Our goal is to ensure every video meets your exact specifications and brand standards.'
    },
    {
      question: 'How can I get started?',
      answer: 'Getting started is simple! Book a free consultation call where we\'ll discuss your needs, goals, and which package works best for you. After that, we\'ll set up your project workflow and begin creating amazing content for your brand.'
    },
    {
      question: 'Why should I trust you?',
      answer: 'We have 2+ years of experience working with content creators and businesses, with over 500 videos edited and 50+ happy clients. We provide constant communication, deliver on time, and offer unlimited revisions. Check out our testimonials and portfolio to see the quality of our work.'
    },
    {
      question: 'What Payment Method do you use?',
      answer: 'We accept all major payment methods including credit cards, PayPal, and bank transfers. Payment is processed securely through our payment platform. We typically work on a monthly subscription basis with the first payment due upon project start.'
    },
    {
      question: 'Can we have custom package for our content?',
      answer: 'Absolutely! We understand that every creator and business has unique needs. We can create custom packages tailored to your specific requirements, content volume, and budget. Contact us to discuss your custom needs.'
    },
    {
      question: 'Will we also get the source file of the work?',
      answer: 'Yes, you will receive all source files including project files, raw footage, graphics, and any other assets used in your videos. This ensures you have complete ownership and can make future edits if needed.'
    }
  ];

  return (
    <section 
      id='faqs' 
      className='section-padding bg-dark-900'
      role='region'
      aria-label='Frequently asked questions'
    >
      <div className='container-custom max-w-4xl mx-auto'>
        
        {/* FAQ Items */}
        <div 
          ref={ref}
          className='space-y-4 mb-16'
        >
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className='bg-dark-800 border border-dark-700 rounded-xl overflow-hidden hover:border-secondary-500/50 transition-colors duration-300'>
                <button
                  onClick={() => toggleItem(index)}
                  className='w-full px-6 py-6 text-left flex items-center justify-between hover:bg-dark-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-inset'
                  aria-expanded={openItems.includes(index)}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className='text-lg font-medium text-white pr-8'>
                    {item.question}
                  </span>
                  <div className='flex-shrink-0'>
                    {openItems.includes(index) ? (
                      <Minus className='w-5 h-5 text-secondary-400' aria-hidden='true' />
                    ) : (
                      <Plus className='w-5 h-5 text-secondary-400' aria-hidden='true' />
                    )}
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  role='region'
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className='px-6 pb-6 pt-2'>
                    <p className='text-gray-300 leading-relaxed'>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center transition-all duration-700 delay-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className='bg-gradient-to-r from-primary-900/20 via-secondary-900/20 to-accent-900/20 rounded-2xl p-8 lg:p-12 border border-secondary-500/20'>
            <h3 className='heading-md mb-4'>
              Ready to scale your brand to{' '}
              <span className='text-accent italic'>new heights?</span>
            </h3>
            <p className='text-gray-300 text-lg mb-8 max-w-2xl mx-auto'>
              It might be the start of something big!
            </p>
            <button
              onClick={handleBookCall}
              className='btn-primary text-lg px-8 py-4 shadow-glow'
              aria-label='Book a consultation call to get started'
            >
              Book a call
            </button>
          </div>
        </div>

        {/* Still have questions? */}
        <div className='text-center mt-12'>
          <p className='text-gray-400 mb-4'>Still have questions?</p>
          <p className='text-gray-300'>
            Can&apos;t find the answer you&apos;re looking for? Please{' '}
            <button
              onClick={handleBookCall}
              className='text-secondary-400 hover:text-secondary-300 underline font-medium focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded'
            >
              chat with our friendly team
            </button>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;