import React, { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { TestimonialProps } from '../types';

const TestimonialCard: React.FC<TestimonialProps> = ({ logo, company, quote }) => {
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
        w-[clamp(280px,42vw,480px)]
        p-[clamp(20px,2.5vw,32px)]
        flex flex-col justify-between
        transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer
      "
    >
      {/* Logo centrado arriba */}
      <div className="flex justify-center items-center mb-[clamp(14px,1.8vw,22px)]">
        <img
          src={logo}
          alt={company}
          className="h-[clamp(28px,3.5vw,44px)] w-auto object-contain"
        />
      </div>

      {/* Texto del testimonio — todo unificado en verde */}
      <div className="flex-1">
        <p className="font-serif text-[clamp(12px,1.15vw,15px)] text-primary leading-relaxed italic font-medium">
          "{quote}"
        </p>
      </div>

      {/* Footer: nombre empresa + puntos */}
      <div className="mt-[clamp(12px,1.5vw,20px)] pt-[clamp(10px,1.2vw,16px)] border-t border-black/5 flex items-center justify-between">
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

  // ✅ FIX 1: useMotionValue en lugar de useState para los offsets.
  // horizontalX se crea UNA sola vez y lee reactivamente los valores actualizados
  // sin necesidad de recrear el useTransform (lo que causaba el salto brusco).
  const startMV = useMotionValue(0);
  const endMV = useMotionValue(0);
  const [sectionHeightPx, setSectionHeightPx] = useState<number | null>(null);

  const calculateBounds = () => {
    if (!trackRef.current) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const cards = Array.from(trackRef.current.querySelectorAll<HTMLElement>('[data-testimonial-card]'));

    if (cards.length === 0) {
      const fallbackMax = Math.max(0, trackRef.current.scrollWidth - viewportWidth);
      startMV.set(0);
      endMV.set(fallbackMax);
      const intro = viewportHeight * 0.9;
      const horizontal = fallbackMax * 1.35;
      const extra = viewportHeight * 0.35;
      setSectionHeightPx(viewportHeight + intro + horizontal + extra);
      return;
    }

    const first = cards[0];
    const last = cards[cards.length - 1];

    const centerOffset = (el: HTMLElement) => {
      const left = el.offsetLeft;
      const width = el.offsetWidth;
      return left + width / 2 - viewportWidth / 2;
    };

    const start = Math.max(0, centerOffset(first));
    const end = Math.max(start, centerOffset(last));

    // Actualiza motion values directamente — sin re-render, sin salto
    startMV.set(start);
    endMV.set(end);

    const intro = viewportHeight * 0.9;
    const horizontal = (end - start) * 1.35;
    const extra = viewportHeight * 0.35;
    setSectionHeightPx(viewportHeight + intro + horizontal + extra);
  };

  // ✅ FIX 2: useLayoutEffect para el cálculo inicial.
  // Corre de forma sincrónica ANTES del primer paint del browser,
  // así la sección ya tiene la altura correcta desde el inicio (sin layout shift).
  useLayoutEffect(() => {
    calculateBounds();
  }, []);

  // useEffect solo para resize
  useEffect(() => {
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

  // ✅ FIX 3: useTransform con múltiples inputs (smoothProgress + motion values).
  // Framer Motion re-ejecuta la función cuando cualquiera de los inputs cambia,
  // pero el transform existe una sola vez → sin saltos, sin re-renders.
  const horizontalX = useTransform(
    [smoothProgress, startMV, endMV],
    ([p, s, e]: number[]) => {
      if (p <= 0.42) return `-${s}px`;
      if (p >= 0.92) return `-${e}px`;
      const t = (p - 0.42) / (0.92 - 0.42);
      return `-${s + (e - s) * t}px`;
    }
  );

  const holdAfterLastOpacity = useTransform(smoothProgress, [0.9, 0.92, 1], [1, 1, 0]);
  const scrollHintOpacity = useTransform(smoothProgress, [0.28, 0.36, 0.88, 0.94], [0, 0.4, 0.4, 0]);

  const sectionStyle = useMemo<React.CSSProperties>(() => {
    return sectionHeightPx ? { height: `${sectionHeightPx}px` } : { height: '640vh' };
  }, [sectionHeightPx]);

  const testimonials: TestimonialProps[] = [
    {
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773074619/fairly_c5xwlf.png',
      company: 'Fairly',
      quote: "As the Market Manager for Fairly (rental management platform), I rely on expert local property caretakers to be the boots-on-the-ground contacts for homeowners and guests. I am so glad I partnered with VIS Home Services to represent our Aspen market! Florencia, Geremias are professional, responsive, reliable, and deeply knowledgeable local hosts. We're excited to continue partnering with them for our new rental homes, knowing they offer extensive services and have an outstanding local reputation - they know everyone in Aspen! VIS Home Services is an invaluable asset to any rental property in town.",
    },
    {
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773074619/elevated_k6m9ou.png',
      company: 'Elevated',
      quote: 'VIS consistently delivers exceptional housekeeping and maintenance services. Every property is left absolutely spotless after each clean, which has helped us consistently earn 5-star reviews from our guests. Their inspectors are incredibly meticulous, carefully identifying even the smallest maintenance issues and ensuring they are addressed immediately. Their attention to detail and commitment to excellence truly set them apart.',
    },
    {
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773074619/aspen_business_services_notnu6.png',
      company: 'Aspen Business Services',
      quote: 'Aspen Business Services highly recommends Village Integral Services (VIS) for their exceptional professionalism and technical competence. From routine maintenance to time-sensitive repairs, their team consistently delivers dependable results across our residential and commercial portfolios. They are a reliable partner that directly contributes to operational stability and tenant satisfaction.',
    },
    {
      // CUARTA CARD — reemplazar logo, quote y company cuando estén disponibles
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773074619/fairly_c5xwlf.png',
      company: 'Your Company',
      quote: "Working with VIS Home Services has been a game-changer for our property operations in Aspen. Their team brings an unmatched level of care, responsiveness, and local expertise that we simply haven't found elsewhere. From day-to-day upkeep to last-minute requests, they handle everything seamlessly — giving us total peace of mind and allowing us to focus on what matters most.",
    },
  ];

  return (
    <section ref={containerRef} id="testimonials" className="relative bg-cream" style={sectionStyle}>
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
