import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Home, Handshake, Building2 } from "lucide-react";

type Item = {
  title: string;
  description: string;
  image: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const EXPAND_MS = 700; // debe matchear duration-700 del flex

const WorkProcess: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  // ✅ “Texto listo” = recién visible cuando el panel terminó de expandir
  const [textReadyIndex, setTextReadyIndex] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const items: Item[] = useMemo(
    () => [
      {
        title: "Residential Owners",
        description: "Homeowners & Second Home Owners / Short-Term Rental Owners.",
        image:
          "https://res.cloudinary.com/deit2ncmp/image/upload/v1771612192/6_ucrlsk.png",
        Icon: Home,
      },
      {
        title: "Strategic Alliances",
        description: "Real Estate Agents / Airbnb & Vacation Rental Companies.",
        image:
          "https://res.cloudinary.com/deit2ncmp/image/upload/v1771612192/7_keqamy.png",
        Icon: Handshake,
      },
      {
        title: "Managed Communities",
        description: "HOAs, Boards & Commercial Property Managers.",
        image:
          "https://res.cloudinary.com/deit2ncmp/image/upload/v1771612193/8_zasi3z.png",
        Icon: Building2,
      },
    ],
    []
  );

  const onSelect = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  useEffect(() => {
    // cada vez que cambia el activo, escondemos texto hasta que termine el expand
    if (timerRef.current) window.clearTimeout(timerRef.current);

    // Ocultamos inmediatamente
    setTextReadyIndex(-1);

    if (prefersReducedMotion) {
      // sin animación: mostrar ya
      setTextReadyIndex(activeIndex);
      return;
    }

    timerRef.current = window.setTimeout(() => {
      setTextReadyIndex(activeIndex);
    }, EXPAND_MS);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [activeIndex, prefersReducedMotion]);

  return (
    <section
      id="work-process"
      className="
        w-full bg-white relative z-30 overflow-hidden
        scroll-mt-[110px] md:scroll-mt-[120px]
        py-[clamp(2.25rem,6vh,5rem)]
      "
    >
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,4vw,3rem)]">
        <div className="flex flex-col lg:flex-row items-stretch gap-[clamp(1.25rem,3vw,2.25rem)]">
          {/* Texto (mobile arriba / desktop derecha) */}
          <aside
            className="
              order-1 lg:order-2
              w-full lg:w-[clamp(280px,30vw,390px)]
              flex flex-col
              justify-start lg:justify-center
              text-left lg:text-right
              self-stretch
            "
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:pl-4"
            >
              <h3 className="font-lemonmilk font-bold uppercase text-primary tracking-[0.28em] text-[clamp(0.95rem,1.25vw,1.15rem)]">
                Who we work with?
              </h3>

              <div className="mt-4 w-14 h-1 bg-accent/35 rounded-full lg:ml-auto" />

              <p
                className="
                  mt-5
                  font-sans text-dark/55 leading-relaxed tracking-wide italic
                  text-[clamp(1.00rem,1.35vw,1.15rem)]
                  max-w-[40ch]
                  lg:ml-auto
                "
              >
                Our comprehensive approach ensures every stage of the property lifecycle is handled with expertise and precision.
              </p>
            </motion.div>
          </aside>

          {/* Acordeón */}
          <div className="order-2 lg:order-1 flex-1">
            <div
              className="
                relative w-full overflow-hidden
                rounded-[1.75rem]
                border border-dark/12
                bg-white
                shadow-[0_18px_45px_rgba(0,0,0,0.10)]
              "
            >
              <div
                className="flex items-stretch w-full h-[clamp(320px,42vw,480px)] min-h-[300px]"
                style={{ perspective: "1200px" }}
              >
                {items.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  const Icon = item.Icon;

                  // Tilt sutil hacia afuera según lado
                  const side = idx < activeIndex ? -1 : idx > activeIndex ? 1 : 0;
                  const baseTilt = prefersReducedMotion ? 0 : isActive ? 0 : 8;
                  const tiltY = side === 0 ? 0 : baseTilt * side;

                  // ✅ texto visible solo cuando ya terminó el expand
                  const showText = isActive && textReadyIndex === idx;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => onSelect(idx)}
                      className="
                        group relative h-full overflow-hidden
                        focus:outline-none
                        transition-[flex] duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                      "
                      style={{
                        flex: isActive ? "6 1 0%" : "1 1 0%",
                        minWidth: 70,
                      }}
                      aria-pressed={isActive}
                    >
                      {/* Wrapper tilt */}
                      <motion.div
                        className="absolute inset-0"
                        initial={false}
                        animate={{
                          rotateY: tiltY,
                          translateZ: isActive ? 14 : 0,
                        }}
                        whileHover={
                          prefersReducedMotion
                            ? {}
                            : isActive
                              ? {}
                              : { rotateY: tiltY * 0.55, translateZ: 10 }
                        }
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          transformStyle: "preserve-3d",
                          willChange: "transform",
                        }}
                      >
                        {/* Imagen */}
                        <motion.div
                          className="absolute inset-0"
                          animate={prefersReducedMotion ? {} : { scale: isActive ? 1.03 : 1.12 }}
                          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            backgroundImage: `url('${item.image}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            willChange: "transform",
                          }}
                        />

                        {/* Overlay global */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Contraste extra NO activos */}
                        <motion.div
                          className="absolute inset-0"
                          initial={false}
                          animate={{ opacity: isActive ? 0 : 0.50 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.60) 55%, rgba(0,0,0,0.82) 100%)",
                          }}
                        />

                        {/* Filtros: NO activos apagados + hover invita */}
                        <div
                          className="absolute inset-0 transition-all duration-500 ease-out group-hover:bg-black/10"
                          style={{
                            filter: isActive
                              ? "saturate(1.05) brightness(1.0)"
                              : "grayscale(0.60) saturate(0.85) brightness(0.82)",
                          }}
                        />

                        {/* Divisor marcado */}
                        <div
                          className={`absolute inset-y-0 left-0 ${idx === 0 ? "hidden" : "block"}`}
                          style={{
                            width: "2px",
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.22) 100%)",
                          }}
                        />

                        {/* Marco + sombra del activo */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          style={{
                            boxShadow: isActive ? "0 34px 80px rgba(0,0,0,0.50)" : "0 0 0 rgba(0,0,0,0)",
                            border: isActive ? "1px solid rgba(255,255,255,0.48)" : "1px solid rgba(255,255,255,0)",
                          }}
                        />

                        {/* Overlay reforzado del activo */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.92) 100%)",
                          }}
                        />

                        {/* TEXTO: siempre montado y ubicado. Solo aparece al final del expand */}
                        <div className="absolute inset-0 flex items-end justify-start p-[clamp(1.05rem,2.3vw,1.75rem)]">
                          <div
                            className="max-w-[580px]"
                            style={{
                              opacity: showText ? 1 : 0,
                              transition: "none", // ✅ nada de transiciones raras
                              pointerEvents: "none",
                            }}
                          >
                            <p className="font-lemonmilk font-extrabold text-white tracking-wide leading-tight text-[clamp(1.35rem,2.4vw,2.05rem)]">
                              {item.title}
                            </p>
                            <p className="mt-2 font-sans font-semibold text-white leading-relaxed text-[clamp(1.00rem,1.55vw,1.25rem)]">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* PILL vertical NO activos */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          initial={false}
                          animate={{ opacity: isActive ? 0 : 1 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <div
                            className="
                              flex items-center justify-center gap-2
                              px-3 py-2
                              rounded-full
                              border border-white/25
                              bg-black/38
                              backdrop-blur-md
                              shadow-[0_14px_34px_rgba(0,0,0,0.45)]
                              transition-all duration-500 ease-out
                              group-hover:bg-black/48
                              group-hover:border-white/35
                            "
                            style={{ transform: "rotate(-90deg)" }}
                          >
                            <Icon className="w-4 h-4 text-white/90" />
                            <span className="font-lemonmilk font-bold tracking-[0.20em] text-white/90 text-[clamp(0.72rem,1.0vw,0.92rem)] uppercase">
                              {item.title}
                            </span>
                          </div>
                        </motion.div>

                        {/* Ícono “hint” NO activos */}
                        <motion.div
                          className="absolute left-0 right-0 bottom-4 flex justify-center pointer-events-none"
                          initial={false}
                          animate={{ opacity: isActive ? 0 : 1 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_12px_28px_rgba(0,0,0,0.30)]">
                            <Icon className="w-5 h-5 text-white/80" />
                          </div>
                        </motion.div>
                      </motion.div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;