'use client';

import { useInView } from 'react-intersection-observer';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleGetStarted = (planName: string) => {
    // In a real application, this would handle plan selection and redirect to checkout
    window.open(`https://calendly.com/farvuemedia?plan=${planName.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
  };

  const pricingPlans = [
    {
      name: 'Short Form Package',
      price: 2000,
      period: '/month',
      description: 'Perfect for creators focusing on short-form content',
      features: [
        '25 reels',
        'Cover Art for each reel',
        'Motion Graphics, sfx, transitions',
        'Color grading & typography',
        'Unlimited Revision',
        'Trending clips'
      ],
      buttonText: 'Get Started',
      popular: false,
      buttonClass: 'btn-secondary',
    },
    {
      name: 'Long Form Package',
      price: 2200,
      period: '/month',
      description: 'Most popular choice for serious content creators',
      features: [
        '4 Long Form Videos (10 mins)',
        '4 Thumbnails',
        'Unlimited Revisions',
        'Motion Graphics, sfx, transitions',
        'Color grading & typography',
        'Trending clips'
      ],
      buttonText: 'Get Started',
      popular: true,
      buttonClass: 'btn-primary',
    },
    {
      name: 'Low Budget Short form Pack',
      price: 1500,
      period: '/month',
      description: 'Great starting point for new creators',
      features: [
        '25 reels',
        'Cover Art for each reel',
        'Minimal animations, sfx, transitions',
        'Color grading & typography',
        '3 revisions per reel'
      ],
      buttonText: 'Get Started',
      popular: false,
      buttonClass: 'btn-secondary',
    },
  ];

  return (
    <section 
      id='pricing' 
      className='section-padding bg-dark-900'
      role='region'
      aria-label='Pricing plans'
    >
      <div className='container-custom'>
        
        {/* Section Header */}
        <div className='text-center mb-16'>
          <p className='text-secondary-400 font-medium mb-4 tracking-wider uppercase text-sm'>
            Pricing
          </p>
          <h2 className='text-h2 font-bold leading-tight mb-6'>
            Simplest{' '}
            <span className='text-accent-red u-underline'>Pricing</span>
          </h2>
          <p className='lead max-w-3xl mx-auto'>
            Pricing that makes your life easier to build assets and create content
          </p>
        </div>

        {/* Pricing Cards */}
        <div 
          ref={ref}
          className='grid grid--pricing max-w-7xl mx-auto'
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 z-10'>
                  <div className='bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1'>
                    <Star className='w-4 h-4 fill-current' aria-hidden='true' />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div
                className={`h-full p-8 rounded-2xl border transition-all duration-300 hover:shadow-card-hover ${
                  plan.popular
                    ? 'bg-accent-500 border-accent-400 shadow-glow text-white'
                    : 'bg-dark-800 border-dark-700 hover:border-secondary-500'
                }`}
              >
                {/* Plan Header */}
                <div className='mb-8'>
                  <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className='flex items-baseline'>
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-white'}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm ml-1 ${plan.popular ? 'text-white/80' : 'text-gray-400'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`mt-2 text-sm ${plan.popular ? 'text-white/80' : 'text-gray-400'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className='space-y-4 mb-8' role='list'>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-start space-x-3'>
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        plan.popular ? 'bg-white/20' : 'bg-secondary-500/20'
                      }`}>
                        <Check 
                          className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-secondary-400'}`} 
                          aria-hidden='true' 
                        />
                      </div>
                      <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleGetStarted(plan.name)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${
                    plan.popular 
                      ? 'bg-white text-accent-500 hover:bg-gray-100 focus:ring-white' 
                      : 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500'
                  }`}
                  aria-label={`Select ${plan.name} plan for $${plan.price} per month`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className='mt-16 text-center'>
          <p className='text-gray-400 text-sm mb-4'>
            All plans include free consultation and 24/7 support
          </p>
          <div className='flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-500'>
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ Money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;