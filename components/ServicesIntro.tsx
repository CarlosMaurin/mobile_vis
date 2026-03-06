import React from 'react';
import { motion } from 'framer-motion';

const ServicesIntro: React.FC = () => {
  return (
    <section className="bg-cream overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24 md:py-32 lg:py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <h2
            className="font-serif text-primary tracking-tight mx-auto"
            style={{
              /**
               * ✅ 100% adaptable:
               * - maxWidth: usa casi todo el ancho, pero con un límite "bonito"
               * - fontSize: se adapta a cualquier dispositivo sin saltos bruscos (clamp)
               * - textWrap balance: distribuye mejor las palabras (titulares grandes se ven perfectos)
               */
              maxWidth: 'min(94vw, 78rem)',
              fontSize: 'clamp(2.1rem, 4.2vw, 4.75rem)',
              lineHeight: 1.08,
              textWrap: 'balance' as any,
            }}
          >
            Comprehensive property care for residential and commercial spaces — working with owners and vacation rental companies, protecting properties and enhancing guest experiences. This is VIS.
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="h-1 bg-accent mx-auto rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesIntro;
