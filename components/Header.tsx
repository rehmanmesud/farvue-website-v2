'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About Us', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQs', href: '#faqs' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookCall = () => {
    // In a real application, this would open a booking modal or redirect to a booking page
    window.open('https://calendly.com/farvuemedia', '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-700'
          : 'bg-transparent'
      }`}
      role='banner'
    >
      <nav
        className='container-custom'
        role='navigation'
        aria-label='Main navigation'
      >
        <div className='flex items-center justify-between h-16 lg:h-20'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <a
              href='#'
              className='flex items-center space-x-2 text-xl lg:text-2xl font-bold text-white hover:text-secondary-400 transition-colors duration-200'
              aria-label='FARVUE Media - Home'
            >
              <div className='w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm lg:text-base'>F</span>
              </div>
              <span className='hidden sm:block'>FARVUE Media</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className='text-white hover:text-secondary-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500'
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className='hidden lg:block'>
            <button
              onClick={handleBookCall}
              className='btn-primary'
              aria-label='Book a consultation call'
            >
              Book a call
            </button>
          </div>

          {/* Mobile menu button */}
          <div className='lg:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary-400 hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500 transition-colors duration-200'
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {isMenuOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className='lg:hidden'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='mobile-menu'
          >
            <div className='px-2 pt-2 pb-3 space-y-1 bg-dark-900/95 backdrop-blur-md border-t border-dark-700 mt-4 rounded-lg'>
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className='text-white hover:text-secondary-400 hover:bg-dark-800 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500'
                  role='menuitem'
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </button>
              ))}
              <div className='pt-4 pb-2'>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleBookCall();
                  }}
                  className='btn-primary w-full'
                  role='menuitem'
                  aria-label='Book a consultation call'
                >
                  Book a call
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;