import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useTransform,
  useScroll,
  AnimatePresence,
  MotionValue,
  useSpring,
} from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { ServiceCardProps } from '../types';

interface AnimatedServiceCardProps extends ServiceCardProps {
  progress: MotionValue<number>;
  range: [number, number];
  onExplore: () => void;
  className?: string;
  style?: any;
}

const ServiceCard: React.FC<AnimatedServiceCardProps> = ({
  number,
  category,
  title,
  description,
  progress,
  range,
  onExplore,
  className = '',
  style = {},
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const translateY = useTransform(progress, range, [60, 0]);
  const scale = useTransform(progress, range, [0.975, 1]);

  const PAD = 'clamp(18px, 2.2vw, 34px)';
  const FOOTER_SAFE = 'clamp(72px, 10vh, 110px)';

  const borderStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    padding: '6px',
    borderRadius: '2.25rem',
    background: 'conic-gradient(#316765, #7CA87A, #316765, #7CA87A, #316765)',
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
    zIndex: 5,
  };

  return (
    <motion.div
      style={{
        opacity,
        y: translateY,
        scale,
        height: 'clamp(320px, 44vh, 460px)',
        ...style,
      }}
      className={`group relative w-full bg-[#2E2D3A] rounded-[2.25rem] overflow-hidden shadow-2xl ${className}`}
    >
      <div style={borderStyle} />

      <div
        className="relative z-10 h-full"
        style={{
          padding: PAD,
        }}
      >
        <div
          className="h-full"
          style={{
            paddingBottom: FOOTER_SAFE,
          }}
        >
          <div>
            <div
              className="inline-flex items-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 font-bold uppercase tracking-[0.18em] text-accent"
              style={{
                padding: 'clamp(5px, 0.55vw, 8px) clamp(11px, 0.9vw, 14px)',
                fontSize: 'clamp(8.5px, 0.55vw, 10px)',
                marginBottom: 'clamp(12px, 1.1vw, 18px)',
              }}
            >
              {category}
            </div>

            <h3
              className="font-serif text-white tracking-tight"
              style={{
                fontSize: 'clamp(1.35rem, 1.5vw, 2.2rem)',
                lineHeight: 1.08,
                marginBottom: 'clamp(10px, 1.1vw, 16px)',
                textWrap: 'balance' as any,
              }}
            >
              {title}
            </h3>

            <p
              className="text-white/60"
              style={{
                fontSize: 'clamp(0.84rem, 0.95vw, 1.02rem)',
                lineHeight: 1.6,
                maxWidth: '42ch',
              }}
            >
              {description}
            </p>
          </div>
        </div>

        <div
          className="absolute flex items-end justify-between"
          style={{
            left: PAD,
            right: PAD,
            bottom: PAD,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExplore();
            }}
            className="group/btn relative inline-flex items-center gap-3 bg-primary hover:bg-accent text-white font-bold transition-all duration-300 shadow-lg overflow-hidden whitespace-nowrap"
            style={{
              borderRadius: 999,
              padding: 'clamp(9px, 0.85vw, 12px) clamp(14px, 1.2vw, 18px)',
              fontSize: 'clamp(10.5px, 0.8vw, 12px)',
            }}
          >
            <span
              className="relative z-10 flex-shrink-0 bg-white grid place-items-center overflow-hidden transition-colors duration-300 group-hover/btn:text-accent text-primary"
              style={{
                width: 'clamp(18px, 1.35vw, 24px)',
                height: 'clamp(18px, 1.35vw, 24px)',
                borderRadius: 999,
              }}
            >
              <svg
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 ease-in-out group-hover/btn:translate-x-[150%] group-hover/btn:-translate-y-[150%]"
                style={{
                  width: 'clamp(10px, 0.9vw, 12px)',
                  height: 'clamp(10px, 0.9vw, 12px)',
                }}
              >
                <path
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  fill="currentColor"
                />
              </svg>

              <svg
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute transition-transform duration-300 ease-in-out translate-x-[-150%] translate-y-[150%] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 delay-75"
                style={{
                  width: 'clamp(10px, 0.9vw, 12px)',
                  height: 'clamp(10px, 0.9vw, 12px)',
                }}
              >
                <path
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  fill="currentColor"
                />
              </svg>
            </span>

            <span className="relative z-10">Explore More</span>
          </button>

          <span
            className="font-serif font-black select-none pointer-events-none"
            style={{
              position: 'absolute',
              right: 'clamp(10px, 1.2vw, 18px)',
              bottom: 'clamp(-10px, -1.2vw, -14px)',
              fontSize: 'clamp(44px, 4.6vw, 74px)',
              color: 'rgba(255,255,255,0.055)',
            }}
          >
            {number.replace('#', '')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const [wrapperHeightPx, setWrapperHeightPx] = useState<number>(0);
  const [navOffsetPx, setNavOffsetPx] = useState<number>(110);

  useEffect(() => {
    const calc = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      let screens = 5.2;
      if (vw >= 768) screens = 4.8;
      if (vw >= 1024) screens = 4.4;
      if (vw >= 1366) screens = 4.9;
      if (vh < 720) screens += 0.5;

      setWrapperHeightPx(Math.round(vh * screens));
      setNavOffsetPx(vw >= 768 ? 120 : 104);
    };

    calc();
    window.addEventListener('resize', calc);
    window.addEventListener('orientationchange', calc);
    return () => {
      window.removeEventListener('resize', calc);
      window.removeEventListener('orientationchange', calc);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    mass: 0.5,
  });

  const bigTitleOpacity = useTransform(smoothProgress, [0, 0.12], [0, 0.07]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.12], [0, 1]);
  const titleY = useTransform(smoothProgress, [0, 0.12], [10, 0]);

  const titleMobileOpacity = useTransform(smoothProgress, [0, 0.12], [0, 1]);
  const titleMobileY = useTransform(smoothProgress, [0, 0.12], [14, 0]);

  const mCard1Range: [number, number] = [0.12, 0.4];
  const mCard2Range: [number, number] = [0.42, 0.7];
  const mCard3Range: [number, number] = [0.72, 1.0];

  const mCard1X = useTransform(smoothProgress, mCard1Range, ['105vw', '0vw']);
  const mCard2X = useTransform(smoothProgress, mCard2Range, ['105vw', '0vw']);
  const mCard3X = useTransform(smoothProgress, mCard3Range, ['105vw', '0vw']);

  const serviceData = useMemo(
    () => [
      {
        id: 1,
        title: 'Property Management & Maintenance',
        content: [
          'Residential Property Management (Second Home Owners)',
          'Short-Term Rental Property Management (inspecciones pre y post estadía)',
          'Custodial Services / Property Maintenance para edificios comerciales',
          'Asistencia a Property Managers, Boards y HOAs',
          'Weekly Property Inspections & Reports',
          'Preventive Maintenance & Handyman Services',
          'Vendor Management (plumbing, electrical, painting, snow removal, landscaping, etc.)',
        ],
      },
      {
        id: 2,
        title: 'Cleaning Services',
        content: [
          'Residential Cleaning (Checkout Clean, Move-Out Clean, Deep Clean)',
          'Commercial Cleaning (Restaurants, Offices, Common Areas)',
          'Specialized Cleaning Services:',
          'Window & Gutter Cleaning',
          'Carpet & Upholstery Steam Cleaning',
          'Exterior Pressure Washing',
        ],
      },
      {
        id: 3,
        title: 'Concierge Services',
        content: [
          'Guest support during stays',
          'Transportation coordination',
          'Restaurant & event reservations',
          'Ski passes, rentals & excursions',
          'Babysitting & Pet Sitting coordination',
        ],
      },
    ],
    []
  );

  const closeModal = () => setSelectedService(null);

  return (
    <section id="services" className="bg-cream scroll-mt-28 md:scroll-mt-36">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: wrapperHeightPx ? `${wrapperHeightPx}px` : '520vh' }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden px-6">
          <div className="max-w-7xl mx-auto w-full h-full">
            <div className="h-full flex flex-col justify-center pt-28 md:pt-32 pb-16 md:pb-20">
              <div className="hidden md:block relative mb-10 lg:mb-12">
                <motion.h2
                  style={{ opacity: bigTitleOpacity }}
                  className="pointer-events-none select-none absolute left-0 -top-10 font-black text-dark tracking-tighter uppercase leading-none"
                >
                  <span style={{ fontSize: 'clamp(3.2rem, 6.2vw, 6.0rem)' }}>
                    OUR SERVICES
                  </span>
                </motion.h2>

                <motion.div style={{ opacity: titleOpacity, y: titleY }} className="relative">
                  <h2
                    className="font-bold text-primary tracking-tight uppercase"
                    style={{ fontSize: 'clamp(1.9rem, 2.9vw, 3.1rem)' }}
                  >
                    OUR SERVICES
                  </h2>
                  <div className="w-16 h-1 bg-accent rounded-full mt-4" />
                </motion.div>
              </div>

              <div className="md:hidden mb-10">
                <motion.div style={{ opacity: titleMobileOpacity, y: titleMobileY }} className="text-center">
                  <h2 className="text-4xl font-bold text-primary tracking-tight uppercase mb-4">
                    OUR SERVICES
                  </h2>
                  <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
                </motion.div>
              </div>

              <div className="hidden md:grid grid-cols-3 gap-10 lg:gap-12 items-stretch">
                <ServiceCard
                  number="#01"
                  category="Estate Management"
                  title="Property Management & Maintenance"
                  description="From preventive technical support to seamless vendor coordination, we handle every operational detail. Our dedicated team acts as your local eyes and ears."
                  direction="left"
                  progress={smoothProgress}
                  range={[0.1, 0.3]}
                  onExplore={() => setSelectedService(1)}
                />
                <ServiceCard
                  number="#02"
                  category="Hygiene Standards"
                  title="Cleaning Services"
                  description="Professional cleaning services for homes and commercial spaces, including routine, deep, and specialized cleaning, delivering spotless results and consistently high standards."
                  direction="up"
                  progress={smoothProgress}
                  range={[0.3, 0.55]}
                  onExplore={() => setSelectedService(2)}
                />
                <ServiceCard
                  number="#03"
                  category="Guest Hospitality"
                  title="Concierge Services"
                  description="Personalized concierge services for owners and guests, including guest assistance, reservations, and lifestyle support, creating seamless experiences and complete peace of mind."
                  direction="right"
                  progress={smoothProgress}
                  range={[0.55, 0.8]}
                  onExplore={() => setSelectedService(3)}
                />
              </div>

              <div className="md:hidden relative flex-1 flex items-center justify-center">
                <div className="relative w-full" style={{ height: 'clamp(320px, 44vh, 460px)' }}>
                  <ServiceCard
                    number="#01"
                    category="Estate Management"
                    title="Property Management & Maintenance"
                    description="From preventive technical support to seamless vendor coordination, we handle every operational detail. Our dedicated team acts as your local eyes and ears."
                    direction="up"
                    progress={smoothProgress}
                    range={mCard1Range}
                    onExplore={() => setSelectedService(1)}
                    style={{
                      x: mCard1X,
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      position: 'absolute',
                      inset: 0,
                      zIndex: 10,
                    }}
                  />

                  <ServiceCard
                    number="#02"
                    category="Hygiene Standards"
                    title="Cleaning Services"
                    description="Professional cleaning services for homes and commercial spaces, including routine, deep, and specialized cleaning, delivering spotless results and consistently high standards."
                    direction="up"
                    progress={smoothProgress}
                    range={mCard2Range}
                    onExplore={() => setSelectedService(2)}
                    style={{
                      x: mCard2X,
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      position: 'absolute',
                      inset: 0,
                      zIndex: 20,
                    }}
                  />

                  <ServiceCard
                    number="#03"
                    category="Guest Hospitality"
                    title="Concierge Services"
                    description="Personalized concierge services for owners and guests, including guest assistance, reservations, and lifestyle support, creating seamless experiences and complete peace of mind."
                    direction="up"
                    progress={smoothProgress}
                    range={mCard3Range}
                    onExplore={() => setSelectedService(3)}
                    style={{
                      x: mCard3X,
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      position: 'absolute',
                      inset: 0,
                      zIndex: 30,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedService !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-[200] bg-dark/60 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[201] flex justify-center"
              style={{
                paddingTop: `${navOffsetPx}px`,
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingBottom: '18px',
              }}
              onClick={closeModal}
            >
              <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center">
                <div
                  className="w-full rounded-[2.25rem] shadow-2xl overflow-hidden bg-white"
                  style={{
                    maxWidth: 'min(720px, 92vw)',
                    maxHeight: `calc(100vh - ${navOffsetPx}px - 10px)`,
                    overflowY: 'auto',
                  }}
                >
                  <div className="relative" style={{ padding: 'clamp(16px, 1.8vw, 30px)' }}>
                    <button
                      onClick={closeModal}
                      className="absolute top-5 right-5 p-2 rounded-full bg-cream hover:bg-dark hover:text-white transition-all duration-300"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-[10px] text-accent font-black uppercase tracking-[0.2em] mb-4">
                      Service Details
                    </div>

                    <h2
                      className="text-primary mb-8 leading-tight"
                      style={{
                        fontSize: 'clamp(1.6rem, 2.1vw, 2.4rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {serviceData.find((s) => s.id === selectedService)?.title}
                    </h2>

                    {selectedService === 2 ? (
                      <div className="space-y-4">
                        <div className="space-y-4">
                          {[
                            'Residential Cleaning (Checkout Clean, Move-Out Clean, Deep Clean)',
                            'Commercial Cleaning (Restaurants, Offices, Common Areas)',
                          ].map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.06 + idx * 0.04,
                                duration: 0.22,
                                ease: 'easeOut',
                              }}
                              className="flex items-start gap-4"
                            >
                              <div className="mt-1 flex-shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-accent" />
                              </div>
                              <p
                                className="text-dark/70 font-medium"
                                style={{
                                  fontSize: 'clamp(0.83rem, 0.95vw, 0.92rem)',
                                  lineHeight: 1.6,
                                }}
                              >
                                {item}
                              </p>
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.16,
                            duration: 0.22,
                            ease: 'easeOut',
                          }}
                          className="rounded-[1.25rem] border border-accent/20 bg-accent/10"
                          style={{ padding: 'clamp(14px, 1.4vw, 18px)' }}
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-[1px]" />
                              <h3
                                className="text-primary"
                                style={{
                                  fontSize: 'clamp(1rem, 1.05vw, 1.1rem)',
                                  fontWeight: 700,
                                  lineHeight: 1.3,
                                }}
                              >
                                Specialized Cleaning Services
                              </h3>
                            </div>

                            <span className="px-4 py-1.5 rounded-full bg-accent/80 text-white font-black uppercase tracking-[0.18em] text-[10px] whitespace-nowrap">
                              HIGH-IMPACT
                            </span>
                          </div>

                          <div className="space-y-3 pl-1">
                            {[
                              'Window & Gutter Cleaning',
                              'Carpet & Upholstery Steam Cleaning',
                              'Exterior Pressure Washing',
                            ].map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.2 + idx * 0.04,
                                  duration: 0.22,
                                  ease: 'easeOut',
                                }}
                                className="flex items-start gap-4"
                              >
                                <div className="mt-1 flex-shrink-0">
                                  <CheckCircle2 className="w-5 h-5 text-accent" />
                                </div>
                                <p
                                  className="text-dark/70 font-medium"
                                  style={{
                                    fontSize: 'clamp(0.83rem, 0.95vw, 0.92rem)',
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {item}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {serviceData
                          .find((s) => s.id === selectedService)
                          ?.content.map((item, idx) => (
                            <motion.div
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.06 + idx * 0.04,
                                duration: 0.22,
                                ease: 'easeOut',
                              }}
                              key={idx}
                              className="flex items-start gap-4"
                            >
                              <div className="mt-1 flex-shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-accent" />
                              </div>
                              <p
                                className="text-dark/70 font-medium"
                                style={{
                                  fontSize: 'clamp(0.83rem, 0.95vw, 0.92rem)',
                                  lineHeight: 1.6,
                                }}
                              >
                                {item}
                              </p>
                            </motion.div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
