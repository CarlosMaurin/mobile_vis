import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TestimonialProps } from '../types';

const TestimonialCard: React.FC<TestimonialProps> = ({ author, role, company, quote, description, avatar }) => {
  // Styles derived from the requested snippet to provide "shading and light"
  const cardStyle: React.CSSProperties = {
    background: 'rgba(217, 217, 217, 0.58)',
    border: '1px solid white',
    boxShadow: '12px 17px 51px rgba(0, 0, 0, 0.22)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    borderRadius: '17px',
  };

  return (
    <div
      style={cardStyle}
      data-testimonial-card
      className="
        flex-shrink-0
        w-[clamp(240px,70vw,420px)]
        p-[clamp(16px,2.2vw,28px)]
        flex flex-col justify-between
        transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer
      "
    >
      <div>
        <div className="flex items-center gap-4 mb-6">
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-accent shadow-md"
          />
          <div>
            <h5 className="font-bold text-dark text-sm">{author}</h5>
            <p className="text-[10px] text-dark/40 uppercase tracking-widest font-black">
              {role}, {company}
            </p>
          </div>
        </div>

        <p className='font-serif text-[clamp(18px,2.1vw,28px)] text-primary leading-tight mb-4 italic font-medium'>
          "{quote}"
        </p>

        <p className="text-[clamp(12px,1.15vw,14px)] text-dark/60 leading-relaxed font-medium">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase text-accent tracking-tighter">{company}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="w-1 h-1 rounded-full bg-accent/40" />
          ))}
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [startScrollToCenter, setStartScrollToCenter] = useState(0);
  const [maxScrollToCenter, setMaxScrollToCenter] = useState(0);
  const [sectionHeightPx, setSectionHeightPx] = useState<number | null>(null);

  useEffect(() => {
    const calculateBounds = () => {
      if (!trackRef.current) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const cards = Array.from(trackRef.current.querySelectorAll<HTMLElement>('[data-testimonial-card]'));

      // Fallback if cards are not yet measurable
      if (cards.length === 0) {
        const fallbackMax = Math.max(0, trackRef.current.scrollWidth - viewportWidth);
        setStartScrollToCenter(0);
        setMaxScrollToCenter(fallbackMax);

        const intro = viewportHeight * 0.9;
        const horizontal = fallbackMax * 1.35;
        const extra = viewportHeight * 0.35;
        setSectionHeightPx(viewportHeight + intro + horizontal + extra);
        return;
      }

      const first = cards[0];
      const last = cards[cards.length - 1];

      // px needed so that the card is centered in the viewport
      const centerOffset = (el: HTMLElement) => {
        const left = el.offsetLeft;
        const width = el.offsetWidth;
        return left + width / 2 - viewportWidth / 2;
      };

      const start = Math.max(0, centerOffset(first));
      const end = Math.max(start, centerOffset(last));

      setStartScrollToCenter(start);
      setMaxScrollToCenter(end);

      // Reduce "sensitivity" by making the vertical scroll distance proportional to horizontal travel.
      const intro = viewportHeight * 0.9;
      const horizontal = (end - start) * 1.35;
      const extra = viewportHeight * 0.35; // small scroll after last card is centered
      setSectionHeightPx(viewportHeight + intro + horizontal + extra);
    };

    calculateBounds();
    const timer = setTimeout(calculateBounds, 150);

    window.addEventListener('resize', calculateBounds);
    return () => {
      window.removeEventListener('resize', calculateBounds);
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    // Softer spring to avoid the "too jumpy" feel on trackpads.
    stiffness: 55,
    damping: 30,
    restDelta: 0.001,
  });

  // Fase 1: El título "TESTIMONIALS"
  const titleOpacity = useTransform(smoothProgress, [0, 0.06, 0.18, 0.3], [0, 1, 1, 0]);
  const titleScale = useTransform(smoothProgress, [0.18, 0.3], [1, 0.7]);
  const titleY = useTransform(smoothProgress, [0, 0.06], ['80px', '0px']);

  // Fase 2: Entrada de las cards (Vertical)
  const cardsY = useTransform(smoothProgress, [0.12, 0.32], ['100vh', '0vh']);
  const cardsOpacity = useTransform(smoothProgress, [0.18, 0.3], [0, 1]);

  // Fase 3: Scroll Horizontal
  // Mantiene la primera centrada un ratito, y mueve hasta centrar la última.
  // Luego deja un scroll extra (0.92 -> 1.0) para recién ahí soltar el sticky.
  const horizontalX = useTransform(smoothProgress, [0, 0.34, 0.42, 0.92], [
    `-${startScrollToCenter}px`,
    `-${startScrollToCenter}px`,
    `-${startScrollToCenter}px`,
    `-${maxScrollToCenter}px`,
  ]);

  const holdAfterLastOpacity = useTransform(smoothProgress, [0.9, 0.92, 1], [1, 1, 0]);
  const scrollHintOpacity = useTransform(smoothProgress, [0.28, 0.36, 0.88, 0.94], [0, 0.4, 0.4, 0]);

  const sectionStyle = useMemo<React.CSSProperties>(() => {
    return sectionHeightPx ? { height: `${sectionHeightPx}px` } : { height: '640vh' };
  }, [sectionHeightPx]);

  const testimonials: TestimonialProps[] = [
    {
      author: 'Felix Ohswald',
      role: 'CEO & Founder',
      company: 'GoStudent',
      quote: 'The most important part of growing your business is establishing a foundation of trustworthy employees.',
      description: "Even if you are hiring quickly, it's vital that every new hire embodies the company culture.",
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    },
    {
      author: 'Benedict Kurz',
      role: 'CEO & Co-Founder',
      company: 'Knowunity',
      quote: 'We were able to fill several of our most critical key positions with top-tier talent...',
      description: "What impressed us most was the unique combination of speed, precision, and the team's deep market expertise.",
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    },
    {
      author: 'Laurent Martinot',
      role: 'CEO & Founder',
      company: 'Sunrise',
      quote: 'If recruiting were an Olympic sport, Highflyers would already have several gold medals...',
      description:
        'Efficient, sharp, and always in a good mood. They somehow manage to make job talks feel like coffee with a friend.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150',
    },
    {
      author: 'Sebastian Haupt',
      role: 'CEO & Founder',
      company: 'SelfStay',
      quote: 'Outstanding hospitality services. We’ve already partnered with them multiple times.',
      description: 'The results have been excellent every time. A perfect match in both expertise and culture fit.',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    },
    {
      author: 'Julia Chen',
      role: 'Operations Director',
      company: 'LuxSpace',
      quote: 'Reliability is hard to come by, but V.I.S. delivers it consistently every single week.',
      description: 'Their attention to detail and proactive approach has transformed how we manage our properties.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    },
    {
      author: 'Marco Rossi',
      role: 'Asset Manager',
      company: 'Equinox Realty',
      quote: 'The concierge services are a game-changer for our high-end rental portfolio.',
      description: 'Guests always leave glowing reviews about the personalized attention they receive during their stay.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    },
    {
      author: 'Sarah Jenkins',
      role: 'Board President',
      company: 'Highland HOA',
      quote: 'V.I.S. understands the unique needs of a residential community better than anyone.',
      description: 'From groundskeeping to general maintenance, they keep our community looking impeccable year-round.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    },
    {
      author: 'Thomas Weber',
      role: 'General Manager',
      company: 'Alpine Retreats',
      quote: 'A true partner in hospitality. They treat our property as if it were their own.',
      description: 'We have seen a significant increase in guest satisfaction since we started working with their team.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    },
  ];

  return (
    <section ref={containerRef} id="testimonials" className="relative bg-cream" style={sectionStyle}>
      {/* padding-top para evitar choque visual con el navbar */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-[clamp(72px,10vh,120px)]">
        {/* Título animado */}
        <motion.div style={{ opacity: titleOpacity, scale: titleScale, y: titleY }} className="absolute z-20 text-center pointer-events-none w-full">
          <h3 className="text-[30px] md:text-8xl font-black text-primary tracking-[0.4em] uppercase mb-4 drop-shadow-sm pl-[0.4em]">
            TESTIMONIALS
          </h3>
          <motion.div className="h-1.5 bg-accent mx-auto rounded-full" style={{ width: '120px' }} />
        </motion.div>

        {/* Contenedor de Cards - Animación Vertical + Horizontal */}
        <motion.div style={{ y: cardsY, opacity: cardsOpacity }} className="relative z-10 w-full">
          <motion.div
            ref={trackRef}
            style={{ x: horizontalX }}
            className="flex gap-[clamp(14px,3vw,40px)] px-[clamp(18px,10vw,25vw)] py-10 w-max"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
            <div className="flex-shrink-0 w-[5vw]" />
          </motion.div>
        </motion.div>

        {/* Indicador visual de progreso del scroll */}
        <div className="absolute bottom-12 w-48 h-0.5 bg-dark/5 rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary" style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} />
        </div>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-16 text-[10px] font-black tracking-[0.5em] uppercase text-dark/30"
        >
          Keep scrolling to see all stories
        </motion.div>

        {/* Hint mini: la sección suelta el sticky cuando la última está centrada + un scroll extra */}
        <motion.div
          style={{ opacity: holdAfterLastOpacity }}
          className="absolute top-6 right-6 text-[10px] font-black tracking-[0.25em] uppercase text-dark/20"
        >
          Scroll to continue
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;