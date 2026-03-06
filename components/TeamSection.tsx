import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Plus, X, ExternalLink } from 'lucide-react';
import { TeamMemberProps } from '../types';

const TeamCard: React.FC<TeamMemberProps> = ({ name, role, image, bgImage, bio }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);

  const isFlorencia = name.toLowerCase().includes('florencia padilla');

  return (
    <div
      ref={cardRef}
      className="
        relative w-full rounded-[3.5rem] overflow-hidden
        shadow-[0_20px_50px_rgba(0,0,0,0.2)]
        group bg-dark/20
      "
      style={{
        height: 'clamp(560px, 100vh, 820px)',
        maxHeight: 'calc(100vh - 80px)',
      }}
    >
      {/* Parallax Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 h-[130%] -top-[15%]">
        <img
          src={bgImage}
          alt="Nature Background"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-700" />
      </motion.div>

      {/* Center layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6 md:p-8 pointer-events-none">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="pill"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              whileHover={{ scale: 1.03 }}
              className="
                pointer-events-auto cursor-default
                flex flex-row items-center gap-3 md:gap-4
                bg-white/20 backdrop-blur-[20px]
                border border-white/40 rounded-full
                shadow-2xl
              "
              style={{
                padding: 'clamp(8px, 1vw, 12px)',
                paddingRight: 'clamp(14px, 1.4vw, 20px)',
              }}
            >
              <img
                src={image}
                alt={name}
                className="rounded-full aspect-square object-cover border-2 border-white shadow-md flex-shrink-0"
                style={{
                  width: 'clamp(40px, 3.2vw, 58px)',
                  height: 'clamp(40px, 3.2vw, 58px)',
                }}
              />

              <div className="text-white text-left">
                <h4
                  className="font-bold leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(12px, 1.05vw, 16px)' }}
                >
                  {name}
                </h4>
                <p
                  className="opacity-85 mt-0.5 uppercase tracking-widest font-medium"
                  style={{ fontSize: 'clamp(9px, 0.7vw, 11px)' }}
                >
                  {role}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                className="
                  rounded-full aspect-square
                  bg-primary text-white
                  flex items-center justify-center
                  hover:bg-accent transition-colors
                  shadow-lg flex-shrink-0
                "
                style={{
                  width: 'clamp(34px, 2.8vw, 44px)',
                  height: 'clamp(34px, 2.8vw, 44px)',
                }}
                aria-label="Open bio"
              >
                <Plus style={{ width: 'clamp(14px, 1.2vw, 18px)', height: 'clamp(14px, 1.2vw, 18px)' }} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="
                pointer-events-auto relative
                bg-white/14 backdrop-blur-[36px]
                border border-white/30
                shadow-2xl
                rounded-[2.75rem]
                flex flex-col items-center text-center
                overflow-hidden
              "
              style={{
                width: 'min(750px, 98%)',
                maxHeight: 'min(720px, 95%)',
                padding: 'clamp(16px, 1.8vw, 26px)',
              }}
            >
              {/* ✅ Agent Profile button (palette + glass) */}
              {isFlorencia && (
                <a
                  href="https://www.cbmmre.com/agents/florencia-padilla"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    absolute top-4 left-4
                    inline-flex items-center gap-2
                    rounded-full
                    backdrop-blur-[22px]
                    border
                    text-white font-black
                    transition-all
                    shadow-lg
                    hover:scale-[1.02] active:scale-[0.98]
                  "
                  style={{
                    // palette-driven glass: primary tint + accent border
                    background: 'rgba(0, 91, 67, 0.28)', // #005B43 (primary) with alpha
                    borderColor: 'rgba(0, 209, 178, 0.28)', // #00D1B2 (accent) with alpha
                    padding: 'clamp(8px, 0.9vw, 10px) clamp(12px, 1.1vw, 14px)',
                    fontSize: 'clamp(10px, 0.75vw, 11px)',
                    letterSpacing: '0.10em',
                  }}
                  aria-label="Open Florencia Padilla agent profile"
                >
                  <ExternalLink style={{ width: 14, height: 14 }} />
                  Agent Profile
                </a>
              )}

              {/* Close */}
              <button
                onClick={() => setIsExpanded(false)}
                className="
                  absolute top-4 right-4
                  rounded-full bg-white/20 hover:bg-white/35
                  flex items-center justify-center text-white
                  transition-all border border-white/30
                "
                style={{
                  width: 'clamp(36px, 3vw, 44px)',
                  height: 'clamp(36px, 3vw, 44px)',
                }}
                aria-label="Close bio"
              >
                <X style={{ width: 20, height: 20 }} />
              </button>

              {/* Avatar */}
              <motion.img
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.10 }}
                src={image}
                alt={name}
                className="rounded-full object-cover border-4 border-accent/50 shadow-2xl"
                style={{
                  width: 'clamp(70px, 6.2vw, 108px)',
                  height: 'clamp(70px, 6.2vw, 108px)',
                  marginTop: 'clamp(6px, 0.6vw, 10px)',
                  marginBottom: 'clamp(10px, 1.2vw, 14px)',
                }}
              />

              {/* Content */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.16 }}
                className="w-full"
                style={{ maxWidth: '52ch' }}
              >
                <h4
                  className="font-serif text-white font-bold drop-shadow-md"
                  style={{
                    fontSize: 'clamp(16.5px, 1.5vw, 23px)',
                    marginBottom: '6px',
                  }}
                >
                  {name}
                </h4>

                <p
                  className="text-primary uppercase font-black drop-shadow-sm"
                  style={{
                    fontSize: 'clamp(9px, 0.7vw, 10px)',
                    letterSpacing: '0.24em',
                    marginBottom: 'clamp(10px, 1.1vw, 14px)',
                  }}
                >
                  {role}
                </p>

                {/* ✅ Bio with aesthetic scrollbar */}
                <div
                  className="vis-bio-scroll text-white/90 italic drop-shadow-sm"
                  style={{
                    fontSize: 'clamp(12.2px, 0.92vw, 14.2px)',
                    lineHeight: 1.6,
                    maxHeight: 'clamp(170px, 26vh, 300px)',
                    overflowY: 'auto',
                    paddingRight: '8px',
                    textWrap: 'pretty' as any,
                  }}
                >
                  “{bio}”
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TeamSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-24 px-6 max-w-7xl mx-auto">
      {/* ✅ Scoped scrollbar styling (only affects .vis-bio-scroll) */}
      <style>{`
        .vis-bio-scroll {
          scrollbar-width: thin;                 /* Firefox */
          scrollbar-color: rgba(0, 209, 178, 0.42) rgba(255, 255, 255, 0.12);
        }
        .vis-bio-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .vis-bio-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.10);
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          margin: 6px 0;
        }
        .vis-bio-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            rgba(0, 209, 178, 0.55),
            rgba(0, 148, 112, 0.55)
          );
          border-radius: 999px;
          border: 2px solid rgba(0, 91, 67, 0.18);
        }
        .vis-bio-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            180deg,
            rgba(0, 209, 178, 0.75),
            rgba(0, 148, 112, 0.75)
          );
        }
      `}</style>

      {/* Title Section */}
      <div className="mb-14 md:mb-16 relative h-24 md:h-28">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.07 }}
          viewport={{ once: true }}
          className="font-black text-dark tracking-tighter uppercase leading-none select-none absolute inset-0"
          style={{ fontSize: 'clamp(3.2rem, 6.2vw, 6.0rem)' }}
        >
          About Us
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-bold text-primary tracking-tight uppercase absolute top-1/2 left-2 -translate-y-1/2 md:left-4"
          style={{ fontSize: 'clamp(2.0rem, 3.2vw, 3.5rem)' }}
        >
          About Us
        </motion.h2>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
        <TeamCard
          name="Geremías Guntern"
          role="CEO and Founder"
          image="https://res.cloudinary.com/deit2ncmp/image/upload/v1766538554/WhatsApp_Image_2025-12-23_at_5.04.28_PM_y1mocm.jpg"
          bgImage="https://res.cloudinary.com/deit2ncmp/image/upload/v1771612192/2_3_ypzcqu.png"
          bio="I’m a 33-year-old Argentine entrepreneur and Business Administration graduate. I’m the Founder and CEO of VIS Home Services, a property management and concierge company dedicated to elevating the experience of homeowners and guests throughout the Aspen Valley. Since 2020, I’ve grown VIS from a one-person project to managing over 25 properties valued at $100M+, providing high-quality maintenance, cleaning, and personalized concierge services. My mission is to deliver exceptional service while giving back to the community that welcomed me."
        />

        <TeamCard
          name="Florencia Padilla"
          role="Managing Partner"
          image="https://dl6bglhcfn2kh.cloudfront.net/9474/113986/FlorenciaPadilla-Web.jpg?version=1761504148"
          bgImage="https://res.cloudinary.com/deit2ncmp/image/upload/v1771612192/1_3_b9h6k4.png"
          bio="Florencia is a licensed real estate agent in Aspen and a certified travel agent. As a Property Specialist at VIS Home Services, she ensures every property is perfectly cared for during rentals, helping owners explore sales or investment opportunities. She also brings her travel expertise to create personalized experiences for tenants, making each stay in Aspen smooth, enjoyable, and memorable. With her attention to detail, warmth, and dedication, Florencia makes both homeowners and guests feel truly supported and valued."
        />
      </div>
    </section>
  );
};

export default TeamSection;