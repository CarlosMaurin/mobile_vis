import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { B2CCardProps } from "../types"

const B2CCard: React.FC<B2CCardProps> = ({ type, title, number, image }) => {
  return (
    <div
      className="
        relative w-full overflow-hidden group
        rounded-[2.2rem]
        shadow-[0_18px_45px_rgba(0,0,0,0.18)]
      "
      style={{
        height: "clamp(320px, 52vh, 440px)",
        maxHeight: "calc(100vh - 240px)",
      }}
    >
      <img
        src={image}
        alt={title}
        className="
          absolute inset-0 w-full h-full object-cover
          transition-transform duration-700 group-hover:scale-[1.06]
        "
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/35 to-transparent" />

      <div
        className="absolute inset-0 flex flex-col justify-between"
        style={{ padding: "clamp(18px, 2.1vw, 28px)" }}
      >
        <div className="flex justify-between items-start">
          <span
            className="
              rounded-full backdrop-blur-md border border-white/20
              text-white font-black uppercase tracking-[0.22em]
            "
            style={{
              background:
                type === "B2B"
                  ? "rgba(0, 91, 67, 0.70)"
                  : "rgba(0, 148, 112, 0.70)",
              padding: "clamp(6px, 0.8vw, 9px) clamp(12px, 1.2vw, 16px)",
              fontSize: "clamp(9px, 0.65vw, 10px)",
            }}
          >
            {type}
          </span>

          <span
            className="font-serif font-black select-none"
            style={{
              color: "rgba(255,255,255,0.10)",
              fontSize: "clamp(40px, 4.8vw, 72px)",
              lineHeight: 1,
            }}
          >
            {number}
          </span>
        </div>

        <h4
          className="font-serif font-bold text-white leading-tight"
          style={{
            fontSize: "clamp(18px, 2.0vw, 30px)",
            maxWidth: "22ch",
            textShadow: "0 6px 22px rgba(0,0,0,0.35)",
          }}
        >
          {title}
        </h4>
      </div>
    </div>
  )
}

const B2CSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [viewportWidth, setViewportWidth] = useState(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!viewportRef.current) return
    const el = viewportRef.current

    const ro = new ResizeObserver(() => {
      setViewportWidth(el.getBoundingClientRect().width)
    })
    ro.observe(el)
    setViewportWidth(el.getBoundingClientRect().width)

    return () => ro.disconnect()
  }, [])

  // ✅ Order EXACTLY as requested
  const items: B2CCardProps[] = useMemo(
    () => [
      {
        type: "B2B",
        title: "Services for Real Estate Agents and Property Managers",
        number: "01",
        image:
          "https://res.cloudinary.com/deit2ncmp/image/upload/v1771612193/3_hj2kqd.png",
      },
      {
        type: "B2B",
        title: "Custodial and maintenance support for HOAs, Boards and commercial buildings",
        number: "02",
        image:
          "https://res.cloudinary.com/deit2ncmp/image/upload/v1771612192/4_iuoyoy.png",
      },
      {
        type: "B2C",
        title: "Direct services for homeowners and second home owners",
        number: "03",
        image:
          "https://res.cloudinary.com/deit2ncmp/image/upload/v1771612193/5_imawv6.png",
      },
      {
        type: "B2C",
        title: "Guest-facing concierge services for short-term rentals",
        number: "04",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
      },
    ],
    []
  )

  const visibleCount = isMobile ? 1 : 3
  const gapPx = isMobile ? 20 : 32

  const slotWidth = useMemo(() => {
    if (!viewportWidth) return 0
    return (viewportWidth - gapPx * (visibleCount - 1)) / visibleCount
  }, [viewportWidth, gapPx, visibleCount])

  const step = slotWidth + gapPx

  // ✅ 3x for infinite loop
  const slides = useMemo(() => [...items, ...items, ...items], [items])

  const baseIndex = items.length
  const [index, setIndex] = useState(baseIndex)

  // ✅ this controls whether we animate or instantly jump
  const [animateTrack, setAnimateTrack] = useState(true)

  // ✅ keep an always-correct logical index for dots
  const logicalIndex = ((index % items.length) + items.length) % items.length

  const recenterIfNeeded = (nextIndex: number) => {
    // Move within central block so we never reach ends
    // We recenter when entering the outer third blocks.
    const leftEdge = items.length * 0.7
    const rightEdge = items.length * 2.3

    if (nextIndex < leftEdge) {
      // Jump forward one block (invisible)
      const jumped = nextIndex + items.length
      setAnimateTrack(false)
      setIndex(jumped)
      requestAnimationFrame(() => setAnimateTrack(true))
      return jumped
    }

    if (nextIndex > rightEdge) {
      // Jump backward one block (invisible)
      const jumped = nextIndex - items.length
      setAnimateTrack(false)
      setIndex(jumped)
      requestAnimationFrame(() => setAnimateTrack(true))
      return jumped
    }

    return nextIndex
  }

  const next = () => {
    setIndex((prev) => {
      const n = prev + 1
      // allow the visible slide animation
      // then recenter if needed (invisibly)
      return recenterIfNeeded(n)
    })
  }

  const prev = () => {
    setIndex((prev) => {
      const n = prev - 1
      return recenterIfNeeded(n)
    })
  }

  const trackX = -(index * step)

  const navBtnBase =
    "rounded-full border border-white/25 backdrop-blur-[18px] shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98]"

  return (
    <section id="clients" className="py-20 md:py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="mb-10 md:mb-12 relative h-24 md:h-32">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.07 }}
            viewport={{ once: true }}
            className="font-black text-dark tracking-tighter uppercase leading-none select-none absolute inset-0 whitespace-nowrap overflow-hidden"
            style={{ fontSize: "clamp(3.2rem, 6.5vw, 6.2rem)" }}
          >
            Solutions
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 18 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-bold text-primary tracking-tight uppercase absolute top-1/2 left-2 -translate-y-1/2 md:left-4 whitespace-nowrap"
            style={{ fontSize: "clamp(1.65rem, 3.2vw, 3.2rem)" }}
          >
            B2C & B2B Solutions
          </motion.h2>
        </div>

        {/* Carousel viewport */}
        <div className="relative">
          <div ref={viewportRef} className="overflow-hidden">
            <motion.div
              className="flex"
              style={{ gap: `${gapPx}px`, willChange: "transform" }}
              animate={{ x: trackX }}
              transition={
                !animateTrack
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 180,
                      damping: 36,
                      mass: 1.05,
                    }
              }
            >
              {slides.map((service, i) => (
                <div
                  key={`${service.number}-${i}`}
                  style={{
                    width: slotWidth ? `${slotWidth}px` : isMobile ? "100%" : "33.333%",
                    flex: "0 0 auto",
                  }}
                >
                  <B2CCard {...service} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ✅ nav: smaller + a bit closer to cards */}
          <div className="flex flex-col items-center gap-3 mt-4 md:mt-5">
            <div className="flex items-center gap-2.5">
              <button
                onClick={prev}
                className={navBtnBase}
                style={{
                  background: "rgba(0, 91, 67, 0.12)",
                  width: "clamp(36px, 3.0vw, 44px)",
                  height: "clamp(36px, 3.0vw, 44px)",
                }}
                aria-label="Previous"
              >
                <div className="flex items-center justify-center text-primary">
                  <ChevronLeft style={{ width: 18, height: 18 }} />
                </div>
              </button>

              <button
                onClick={next}
                className={navBtnBase}
                style={{
                  background: "rgba(0, 148, 112, 0.12)",
                  width: "clamp(36px, 3.0vw, 44px)",
                  height: "clamp(36px, 3.0vw, 44px)",
                }}
                aria-label="Next"
              >
                <div className="flex items-center justify-center text-primary">
                  <ChevronRight style={{ width: 18, height: 18 }} />
                </div>
              </button>
            </div>

            {/* dots */}
            <div className="flex items-center gap-2">
              {items.map((_, i) => {
                const active = i === logicalIndex
                return (
                  <button
                    key={i}
                    onClick={() => {
                      // jump to that slide within the middle block
                      setAnimateTrack(true)
                      setIndex(baseIndex + i)
                    }}
                    className="rounded-full transition-all"
                    style={{
                      width: active ? 20 : 8,
                      height: 8,
                      background: active
                        ? "rgba(0, 91, 67, 0.85)"
                        : "rgba(17, 24, 39, 0.18)",
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <div className="h-6 md:h-10" />
      </div>
    </section>
  )
}

export default B2CSection