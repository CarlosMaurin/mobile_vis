import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

type TestimonialItem = {
  id: number;
  company: string;
  testimonial: string;
  logo?: string;
  isTextLogo?: boolean;
  textLogo?: string;
};

interface TestimonialCardProps {
  item: TestimonialItem;
  progress: MotionValue<number>;
  range: [number, number];
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  item,
  progress,
  range,
  index,
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [80, 0]);
  const scale = useTransform(progress, range, [0.96, 1]);

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
      }}
      className="absolute inset-0 flex items-center justify-center px-4 md:px-6"
    >
      <div
        className="relative w-full mx-auto rounded-[2rem] md:rounded-[2.25rem] bg-white shadow-[0_24px_70px_rgba(17,24,39,0.12)] overflow-hidden"
        style={{
          maxWidth: "min(860px, 92vw)",
          minHeight: "clamp(440px, 66vh, 620px)",
          zIndex: 20 + index,
        }}
      >
        <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.25rem] pointer-events-none border border-[rgba(49,103,101,0.12)]" />

        <div className="relative h-full flex flex-col justify-between p-6 md:p-8 lg:p-10">
          <div className="flex justify-center mb-6 md:mb-8">
            <div
              className="flex items-center justify-center"
              style={{
                minHeight: "clamp(56px, 7vh, 80px)",
                maxWidth: "clamp(180px, 24vw, 260px)",
              }}
            >
              {item.isTextLogo ? (
                <div
                  className="text-center"
                  style={{
                    color: "#316765",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontSize: "clamp(0.95rem, 1.3vw, 1.2rem)",
                    lineHeight: 1.15,
                  }}
                >
                  {item.textLogo}
                </div>
              ) : (
                <img
                  src={item.logo}
                  alt={`${item.company} logo`}
                  className="block object-contain"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "clamp(48px, 6vh, 72px)",
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex-1 flex items-center">
            <p
              className="text-center mx-auto"
              style={{
                color: "#316765",
                maxWidth: "68ch",
                fontSize: "clamp(0.92rem, 1.08vw, 1.08rem)",
                lineHeight: 1.72,
                fontWeight: 500,
                textWrap: "pretty",
              }}
            >
              “{item.testimonial}”
            </p>
          </div>

          <div className="pt-6 md:pt-8 flex justify-center">
            <div
              className="inline-flex items-center rounded-full bg-[rgba(124,168,122,0.12)] border border-[rgba(49,103,101,0.12)]"
              style={{
                padding: "10px 18px",
              }}
            >
              <span
                style={{
                  color: "#316765",
                  fontSize: "clamp(0.82rem, 0.95vw, 0.96rem)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {item.company}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wrapperHeightPx, setWrapperHeightPx] = useState<number>(0);

  const testimonials = useMemo<TestimonialItem[]>(
    () => [
      {
        id: 1,
        company: "Fairly",
        logo: "https://res.cloudinary.com/deit2ncmp/image/upload/v1773074619/fairly_c5xwlf.png",
        testimonial:
          "As the Market Manager for Fairly (rental management platform), I rely on expert local property caretakers to be the boots-on-the-ground contacts for homeowners and guests. I am so glad I partnered with VIS Home Services to represent our Aspen market! Florencia, Geremias are professional, responsive, reliable, and deeply knowledgeable local hosts. We're excited to continue partnering with them for our new rental homes, knowing they offer extensive services and have an outstanding local reputation - they know everyone in Aspen! VIS Home Services is an invaluable asset to any rental property in town.",
      },
      {
        id: 2,
        company: "Elevated",
        logo: "https://res.cloudinary.com/deit2ncmp/image/upload/v1773074619/elevated_k6m9ou.png",
        testimonial:
          "VIS consistently delivers exceptional housekeeping and maintenance services. Every property is left absolutely spotless after each clean, which has helped us consistently earn 5-star reviews from our guests. Their inspectors are incredibly meticulous, carefully identifying even the smallest maintenance issues and ensuring they are addressed immediately. Their attention to detail and commitment to excellence truly set them apart.",
      },
      {
        id: 3,
        company: "Aspen Business Services",
        logo: "https://res.cloudinary.com/deit2ncmp/image/upload/v1773074619/aspen_business_services_notnu6.png",
        testimonial:
          "Aspen Business Services highly recommends Village Integral Services (VIS) for their exceptional professionalism and technical competence. From routine maintenance to time-sensitive repairs, their team consistently delivers dependable results across our residential and commercial portfolios. They are a reliable partner that directly contributes to operational stability and tenant satisfaction.",
      },
      {
        id: 4,
        company: "Summit Residential Group",
        isTextLogo: true,
        textLogo: "Summit Residential Group",
        testimonial:
          "VIS has become a trusted extension of our local operations. Their team communicates clearly, responds quickly, and consistently upholds a very high standard across inspections, maintenance coordination, and property readiness. In a market like Aspen, having a partner with strong local relationships and dependable execution makes a meaningful difference, and VIS has delivered that value repeatedly.",
      },
    ],
    []
  );

  useEffect(() => {
    const calc = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const count = testimonials.length;

      let screensPerCard = 1.18;

      if (vw >= 768) screensPerCard = 1.12;
      if (vw >= 1024) screensPerCard = 1.05;
      if (vw >= 1440) screensPerCard = 1.0;
      if (vh < 760) screensPerCard += 0.08;

      const introOutroScreens = vw >= 1024 ? 1.55 : 1.35;
      const totalScreens = count * screensPerCard + introOutroScreens;

      setWrapperHeightPx(Math.round(vh * totalScreens));
    };

    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);

    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, [testimonials.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.55,
  });

  const titleOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(smoothProgress, [0, 0.1], [18, 0]);
  const bigTitleOpacity = useTransform(smoothProgress, [0, 0.12], [0, 0.06]);

  const cardRanges = useMemo(() => {
    const count = testimonials.length;
    const start = 0.12;
    const end = 0.92;
    const slot = (end - start) / count;

    return testimonials.map((_, i) => {
      const localStart = start + i * slot;
      const localEnd = localStart + slot * 0.78;
      return [localStart, localEnd] as [number, number];
    });
  }, [testimonials]);

  return (
    <section id="testimonials" className="bg-cream scroll-mt-28 md:scroll-mt-36">
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: wrapperHeightPx ? `${wrapperHeightPx}px` : "560vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="max-w-7xl mx-auto w-full h-full px-6">
            <div className="h-full flex flex-col justify-center pt-24 md:pt-28 pb-16">
              <div className="relative mb-10 md:mb-12">
                <motion.h2
                  style={{ opacity: bigTitleOpacity }}
                  className="hidden md:block pointer-events-none select-none absolute left-0 -top-10 font-black text-dark tracking-tighter uppercase leading-none"
                >
                  <span style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
                    TESTIMONIALS
                  </span>
                </motion.h2>

                <motion.div style={{ opacity: titleOpacity, y: titleY }} className="relative">
                  <h2
                    className="text-primary font-bold tracking-tight uppercase text-center md:text-left"
                    style={{ fontSize: "clamp(1.9rem, 2.8vw, 3.1rem)" }}
                  >
                    TESTIMONIALS
                  </h2>
                  <div className="w-16 h-1 bg-accent rounded-full mt-4 mx-auto md:mx-0" />
                </motion.div>
              </div>

              <div className="relative flex-1 min-h-0">
                {testimonials.map((item, index) => (
                  <TestimonialCard
                    key={item.id}
                    item={item}
                    progress={smoothProgress}
                    range={cardRanges[index]}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
