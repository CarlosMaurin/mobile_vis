import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesIntro from './components/ServicesIntro';
import Services from './components/Services';
import TeamSection from './components/TeamSection';
import B2CSection from './components/B2CSection';
import Testimonials from './components/Testimonials';
import WorkProcess from './components/WorkProcess';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [heroComplete, setHeroComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // Premium feel loading duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-cream min-h-screen font-sans text-dark selection:bg-primary selection:text-white">
      <Loader isLoading={isLoading} />

      {!isLoading && <Navbar />}

      <main>
        {/* ✅ Hero se monta cuando termina el loader, así se ve la animación */}
        {!isLoading && <Hero onComplete={() => setHeroComplete(true)} />}

        <div className="relative z-10 bg-cream">
          <ServicesIntro />
          <Services />
          <TeamSection />
          <B2CSection />

          <WorkProcess />
          <Testimonials />

          <ContactForm />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;