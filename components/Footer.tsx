'use client';

import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookCall = () => {
    window.open('https://calendly.com/farvuemedia', '_blank');
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Long Form Editing', href: '#services' },
        { name: 'Short Form Editing', href: '#services' },
        { name: 'Thumbnail Design', href: '#services' },
        { name: 'Brand Strategy', href: '#services' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Work', href: '#work' },
        { name: 'Team', href: '#team' },
        { name: 'Testimonials', href: '#testimonials' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'FAQs', href: '#faqs' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Contact', href: '#contact' },
        { name: 'Book a Call', action: handleBookCall },
      ]
    }
  ];

  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: 'https://twitter.com/farvuemedia',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: 'https://instagram.com/farvuemedia',
      color: 'hover:text-pink-400'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/farvuemedia',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      href: 'https://youtube.com/@farvuemedia',
      color: 'hover:text-red-500'
    },
  ];

  return (
    <footer 
      className='bg-dark-900 border-t border-dark-700'
      role='contentinfo'
      aria-label='Site footer'
    >
      <div className='container-custom'>
        
        {/* Main Footer Content */}
        <div className='py-16'>
          <div className='grid lg:grid-cols-4 gap-8 lg:gap-12'>
            
            {/* Brand Section */}
            <div className='lg:col-span-1'>
              <div className='flex items-center space-x-2 mb-6'>
                <div className='w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold text-lg'>F</span>
                </div>
                <span className='text-xl font-bold text-white'>FARVUE Media</span>
              </div>
              
              <p className='text-gray-300 mb-6 leading-relaxed'>
                Professional video editing and design services that help creators and businesses 
                scale their brand through high-quality content creation.
              </p>

              {/* Contact Info */}
              <div className='space-y-3 text-sm'>
                <div className='flex items-center space-x-3 text-gray-400'>
                  <Mail className='w-4 h-4 flex-shrink-0' aria-hidden='true' />
                  <a 
                    href='mailto:hello@farvue.media'
                    className='hover:text-secondary-400 transition-colors duration-200'
                    aria-label='Send email to FARVUE Media'
                  >
                    hello@farvue.media
                  </a>
                </div>
                <div className='flex items-center space-x-3 text-gray-400'>
                  <Phone className='w-4 h-4 flex-shrink-0' aria-hidden='true' />
                  <a 
                    href='tel:+1234567890'
                    className='hover:text-secondary-400 transition-colors duration-200'
                    aria-label='Call FARVUE Media'
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div className='flex items-center space-x-3 text-gray-400'>
                  <MapPin className='w-4 h-4 flex-shrink-0' aria-hidden='true' />
                  <span>Remote Worldwide</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className='lg:col-span-1'>
                <h3 className='text-white font-semibold mb-6'>{section.title}</h3>
                <ul className='space-y-3' role='list'>
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.action ? (
                        <button
                          onClick={link.action}
                          className='text-gray-400 hover:text-secondary-400 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded'
                          aria-label={link.name}
                        >
                          {link.name}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className='text-gray-400 hover:text-secondary-400 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded'
                          aria-label={`Navigate to ${link.name} section`}
                        >
                          {link.name}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='py-8 border-t border-dark-700'>
          <div className='grid lg:grid-cols-2 gap-8 items-center'>
            <div>
              <h3 className='text-xl font-semibold text-white mb-2'>Stay Updated</h3>
              <p className='text-gray-400'>
                Get the latest tips and insights on content creation and video editing.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent'
                aria-label='Email address for newsletter'
              />
              <button
                className='btn-primary px-6 py-3 whitespace-nowrap'
                aria-label='Subscribe to newsletter'
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className='py-8 border-t border-dark-700'>
          <div className='flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0'>
            
            {/* Copyright */}
            <div className='text-gray-400 text-sm'>
              © {currentYear} FARVUE Media. All rights reserved.
            </div>

            {/* Social Links */}
            <div className='flex items-center space-x-6'>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`text-gray-400 ${social.color} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent className='w-5 h-5' />
                  </a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className='flex items-center space-x-6 text-sm'>
              <button
                className='text-gray-400 hover:text-secondary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded'
                aria-label='View privacy policy'
              >
                Privacy Policy
              </button>
              <button
                className='text-gray-400 hover:text-secondary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded'
                aria-label='View terms of service'
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;