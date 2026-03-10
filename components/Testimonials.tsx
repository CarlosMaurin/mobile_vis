import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TestimonialProps } from '../types';

type TestimonialItem = TestimonialProps & {
  logo?: string;
  logoAlt?: string;
};

type TestimonialCardProps = TestimonialItem;

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  company,
  quote,
  description,
  logo,
  logoAlt,
}) => {
  const cardStyle: React.CSSProperties = {
    background: 'rgba(217, 217, 217, 0.58)',
    border: '1px solid white',
    boxShadow: '12px 17px 51px rgba(0, 0, 0, 0.22)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    borderRadius: '17px',
  };

  const unifiedText = description ? `${quote} ${description}` : quote;

  return (
    <div
      style={cardStyle}
      data-testimonial-card
      className="
        flex-shrink-0
        w-[clamp(350px,90vw,525px)]
        min-h-[clamp(340px,56vh,400px)]
        p-[clamp(16px,2.2vw,28px)]
        flex flex-col justify-between
        transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer
      "
    >
      <div className="flex flex-col h-full">
        {/* Logo block with fixed dimensions to keep card measurements stable */}
        <div className="mb-5 h-[84px] flex items-center justify-start flex-shrink-0">
          <div className="h-[84px] w-[200px] flex items-center justify-start">
            {logo ? (
              <img
                src={logo}
                alt={logoAlt || `${company} logo`}
                loading="eager"
                decoding="async"
                className="block max-h-[64px] max-w-[180px] w-auto h-auto object-contain"
                draggable={false}
              />
            ) : (
              <div className="h-[64px] w-[180px] flex items-center justify-start">
                <span className="text-[20px] md:text-[24px] font-black uppercase tracking-tight text-primary/80 leading-none">
                  {company}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex items-start">
          <p
            className="text-[clamp(12.35px,1.12vw,15.2px)] text-primary leading-[1.55] break-words"
            style={{
              fontFamily: 'LemonMilk, sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
            }}
          >
            "{unifiedText}"
          </p>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-black/5 flex items-center justify-between flex-shrink-0">
        <span className="text-[10px] font-black uppercase text-accent tracking-tighter">
          {company}
        </span>
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
  const [logosReady, setLogosReady] = useState(false);

  const testimonials: TestimonialItem[] = [
    {
      author: 'Fairly',
      role: 'Client',
      company: 'Fairly',
      quote:
        'As the Market Manager for Fairly (rental management platform), I rely on expert local property caretakers to be the boots-on-the-ground contacts for homeowners and guests.',
      description:
        "I am so glad I partnered with VIS Home Services to represent our Aspen market! Florencia, Geremias are professional, responsive, reliable, and deeply knowledgeable local hosts. We're excited to continue partnering with them for our new rental homes, knowing they offer extensive services and have an outstanding local reputation - they know everyone in Aspen! VIS Home Services is an invaluable asset to any rental property in town.",
      avatar: '',
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773136153/fairly_yy3vvm.png',
      logoAlt: 'Fairly logo',
    },
    {
      author: 'Elevated Escapes',
      role: 'Client',
      company: 'Elevated Escapes',
      quote:
        'VIS consistently delivers exceptional housekeeping and maintenance services.',
      description:
        'Every property is left absolutely spotless after each clean, which has helped us consistently earn 5-star reviews from our guests. Their inspectors are incredibly meticulous, carefully identifying even the smallest maintenance issues and ensuring they are addressed immediately. Their attention to detail and commitment to excellence truly set them apart.',
      avatar: '',
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773136155/elevated_fguh1b.png',
      logoAlt: 'Elevated Escapes logo',
    },
    {
      author: 'Aspen',
      role: 'Client',
      company: 'Aspen',
      quote:
        'Aspen Business Services highly recommends Village Integral Services (VIS) for their exceptional professionalism and technical competence.',
      description:
        'From routine maintenance to time-sensitive repairs, their team consistently delivers dependable results across our residential and commercial portfolios. They are a reliable partner that directly contributes to operational stability and tenant satisfaction.',
      avatar: '',
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773136153/aspen_business_services_hjrtfw.png',
      logoAlt: 'Aspen Business Services logo',
    },
    {
      author: 'SelfStay',
      role: 'Client',
      company: 'SelfStay',
      quote:
        'As the Market Manager for Fairly (rental management platform), I rely on expert local property caretakers to be the boots-on-the-ground contacts for homeowners and guests.',
      description:
        "I am so glad I partnered with VIS Home Services to represent our Aspen market! Florencia, Geremias are professional, responsive, reliable, and deeply knowledgeable local hosts. We're excited to continue partnering with them for our new rental homes, knowing they offer extensive services and have an outstanding local reputation - they know everyone in Aspen! VIS Home Services is an invaluable asset to any rental property in town.",
      avatar: '',
    },
  ];

  const logoUrls = useMemo(() => {
    return testimonials
      .map((item) => item.logo)
      .filter((logo): logo is string => Boolean(logo));
  }, [testimonials]);

  useEffect(() => {
    if (logoUrls.length === 0) {
      setLogosReady(true);
      return;
    }

    let isCancelled = false;

    const preloadLogos = async () => {
      try {
        await Promise.all(
          logoUrls.map(
            (src) =>
              new Promise<void>((resolve) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => resolve();
                img.src = src;
              })
          )
        );

        if (!isCancelled) {
          setLogosReady(true);
        }
      } catch {
        if (!isCancelled) {
          setLogosReady(true);
        }
      }
    };

    preloadLogos();

    return () => {
      isCancelled = true;
    };
  }, [logoUrls]);

  const calculateBounds = useCallback(() => {
    if (!trackRef.current) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const cards = Array.from(
      trackRef.current.querySelectorAll<HTMLElement>('[data-testimonial-card]')
    );

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

    const centerOffset = (el: HTMLElement) => {
      const left = el.offsetLeft;
      const width = el.offsetWidth;
      return left + width / 2 - viewportWidth / 2;
    };

    const start = Math.max(0, centerOffset(first));
    const end = Math.max(start, centerOffset(last));

    setStartScrollToCenter(start);
    setMaxScrollToCenter(end);

    const intro = viewportHeight * 0.9;
    const horizontal = (end - start) * 1.35;
    const extra = viewportHeight * 0.35;

    setSectionHeightPx(viewportHeight + intro + horizontal + extra);
  }, []);

  useEffect(() => {
    if (!logosReady) return;

    calculateBounds();

    const timeout1 = setTimeout(calculateBounds, 120);
    const timeout2 = setTimeout(calculateBounds, 300);

    window.addEventListener('resize', calculateBounds);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      window.removeEventListener('resize', calculateBounds);
    };
  }, [logosReady, calculateBounds]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 30,
    restDelta: 0.001,
  });

  const titleOpacity = useTransform(smoothProgress, [0, 0.06, 0.18, 0.3], [0, 1, 1, 0]);
  const titleScale = useTransform(smoothProgress, [0.18, 0.3], [1, 0.7]);
  const titleY = useTransform(smoothProgress, [0, 0.06], ['80px', '0px']);

  const cardsY = useTransform(smoothProgress, [0.12, 0.32], ['100vh', '0vh']);
  const cardsOpacity = useTransform(smoothProgress, [0.18, 0.3], [0, 1]);

  const horizontalX = useTransform(
    smoothProgress,
    [0, 0.34, 0.42, 0.92],
    [
      `-${startScrollToCenter}px`,
      `-${startScrollToCenter}px`,
      `-${startScrollToCenter}px`,
      `-${maxScrollToCenter}px`,
    ]
  );

  const holdAfterLastOpacity = useTransform(smoothProgress, [0.9, 0.92, 1], [1, 1, 0]);
  const scrollHintOpacity = useTransform(
    smoothProgress,
    [0.28, 0.36, 0.88, 0.94],
    [0, 0.4, 0.4, 0]
  );

  const sectionStyle = useMemo<React.CSSProperties>(() => {
    return sectionHeightPx ? { height: `${sectionHeightPx}px` } : { height: '640vh' };
  }, [sectionHeightPx]);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative bg-cream"
      style={sectionStyle}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-[clamp(72px,10vh,120px)]">
        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
          className="absolute z-20 text-center pointer-events-none w-full"
        >
          <h3 className="text-[30px] md:text-8xl font-black text-primary tracking-[0.4em] uppercase mb-4 drop-shadow-sm pl-[0.4em]">
            TESTIMONIALS
          </h3>
          <motion.div
            className="h-1.5 bg-accent mx-auto rounded-full"
            style={{ width: '120px' }}
          />
        </motion.div>

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

        <div className="absolute bottom-12 w-48 h-0.5 bg-dark/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
          />
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
