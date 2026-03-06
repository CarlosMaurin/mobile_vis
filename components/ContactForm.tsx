import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactForm: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax background movement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        min-h-[140svh]
        flex items-center justify-center
        overflow-hidden
        px-4
        pt-24 pb-20
        md:pt-28 md:pb-24
        scroll-mt-28 md:scroll-mt-40
      "
    >
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <motion.img
          alt="Majestic snow-capped mountains"
          src="https://res.cloudinary.com/deit2ncmp/image/upload/v1771612196/9_amopac.png"
          loading="lazy"
          style={{ y: bgY }}
          className="
            absolute inset-0
            w-full h-[112%]
            object-cover
            scale-110
            blur-[1.5px]
            brightness-[0.85]
            contrast-[1.05]
            will-change-transform
          "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[920px]"
      >
        {/* Card (20% taller allowance) */}
        <div
          className="
            backdrop-blur-2xl bg-white/10
            border border-white/20
            shadow-2xl
            rounded-[2rem]
            overflow-hidden
            max-h-[calc(120svh-120px)]
            md:max-h-[calc(120svh-150px)]
          "
        >
          <div className="h-full overflow-auto">
            <div className="p-5 sm:p-6 md:p-7">
              {/* Two columns + subtle vertical divider */}
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Vertical divider (like red example, subtle) */}
                <div className="hidden lg:block pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[90%] w-px bg-white/10" />

                {/* LEFT */}
                <div className="text-white lg:pr-8">
                  <h2 className="text-2xl md:text-3xl font-lemonmilk tracking-wider">
                    Get in touch
                  </h2>

                  <p className="mt-3 text-white/75 leading-relaxed text-sm md:text-[14px]">
                    If you have any questions regarding our Services or need help, please fill out the form here.
                  </p>

                  <div className="mt-5 h-px w-20 bg-white/25" />

                  <p className="mt-4 text-white/55 text-xs md:text-sm leading-relaxed">
                    We do our best to respond within 1 business day.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-white/75 hover:text-white/90 transition-colors">
                      <span className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-white/70" />
                      </span>
                      <div className="leading-tight">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/55 font-bold">
                          Email
                        </div>
                        <div className="text-sm text-white/85">geremias@vis.com</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-white/75 hover:text-white/90 transition-colors">
                      <span className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-white/70" />
                      </span>
                      <div className="leading-tight">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/55 font-bold">
                          Phone
                        </div>
                        <div className="text-sm text-white/85">+5493813567537</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-white/75 hover:text-white/90 transition-colors">
                      <span className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-white/70" />
                      </span>
                      <div className="leading-tight">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/55 font-bold">
                          Address
                        </div>
                        <div className="text-sm text-white/85">Aspen, CO</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <form className="space-y-3 lg:pl-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold uppercase tracking-[0.22em] text-white/70 pl-1">
                        First Name<span className="text-accent ml-1">*</span>
                      </label>
                      <input
                        name="firstName"
                        required
                        type="text"
                        autoComplete="given-name"
                        className="
                          w-full bg-black/20 border border-white/10
                          rounded-xl px-3 py-2
                          text-white placeholder-white/30
                          focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent
                          transition-all backdrop-blur-sm hover:bg-black/30
                          text-[12.5px]
                        "
                        placeholder="First name"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold uppercase tracking-[0.22em] text-white/70 pl-1">
                        Last Name<span className="text-accent ml-1">*</span>
                      </label>
                      <input
                        name="lastName"
                        required
                        type="text"
                        autoComplete="family-name"
                        className="
                          w-full bg-black/20 border border-white/10
                          rounded-xl px-3 py-2
                          text-white placeholder-white/30
                          focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent
                          transition-all backdrop-blur-sm hover:bg-black/30
                          text-[12.5px]
                        "
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  {/* Email + Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold uppercase tracking-[0.22em] text-white/70 pl-1">
                        Email<span className="text-accent ml-1">*</span>
                      </label>
                      <input
                        name="email"
                        required
                        type="email"
                        autoComplete="email"
                        className="
                          w-full bg-black/20 border border-white/10
                          rounded-xl px-3 py-2
                          text-white placeholder-white/30
                          focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent
                          transition-all backdrop-blur-sm hover:bg-black/30
                          text-[12.5px]
                        "
                        placeholder="name@company.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold uppercase tracking-[0.22em] text-white/70 pl-1">
                        Company Name
                        <span className="text-white/40 ml-2 normal-case tracking-normal font-semibold">
                          (optional)
                        </span>
                      </label>
                      <input
                        name="companyName"
                        type="text"
                        autoComplete="organization"
                        className="
                          w-full bg-black/20 border border-white/10
                          rounded-xl px-3 py-2
                          text-white placeholder-white/30
                          focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent
                          transition-all backdrop-blur-sm hover:bg-black/30
                          text-[12.5px]
                        "
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="block text-[9px] font-bold uppercase tracking-[0.22em] text-white/70 pl-1">
                      Message<span className="text-accent ml-1">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      className="
                        w-full bg-black/20 border border-white/10
                        rounded-xl px-3 py-2
                        text-white placeholder-white/30
                        focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent
                        transition-all backdrop-blur-sm hover:bg-black/30
                        text-[12.5px] resize-none
                        h-[clamp(140px,22svh,280px)]
                      "
                      placeholder="Write your message..."
                    />
                  </div>

                  {/* Centered footer */}
                  <div className="pt-3 flex flex-col items-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="
                        w-full
                        max-w-[260px]
                        px-10 py-3
                        bg-accent text-white
                        font-lemonmilk tracking-widest font-bold
                        rounded-full shadow-xl
                        transition-all duration-300 hover:bg-accent/90
                        text-[13px]
                      "
                    >
                      Submit
                    </motion.button>

                    <p className="mt-3 text-[11px] text-white/45 leading-relaxed text-center">
                      Fields marked with <span className="text-accent">*</span> are required.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactForm;