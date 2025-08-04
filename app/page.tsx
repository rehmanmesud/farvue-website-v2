import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main id='main-content' className='min-h-screen bg-dark-900'>
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Pricing />
      <WhyChooseUs />
      <Testimonials />
      <Team />
      <FAQ />
      <Footer />
    </main>
  );
}