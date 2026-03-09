import React, { useRef, useState, useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { TestimonialProps } from '../types'

const TestimonialCard: React.FC<TestimonialProps> = ({ company, quote, description, avatar }) => {
  const cardStyle: React.CSSProperties = {
    background: 'rgba(217, 217, 217, 0.58)',
    border: '1px solid white',
    boxShadow: '12px 17px 51px rgba(0,0,0,0.22)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    borderRadius: '17px',
  }

  return (
    <div
      style={cardStyle}
      data-testimonial-card
      className="
      flex-shrink-0
      w-[clamp(364px,91vw,546px)]
      h-[clamp(360px,68vh,620px)]
      p-[clamp(16px,2vw,26px)]
      flex flex-col justify-between
      transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
      cursor-pointer
      "
    >
      <div className="flex flex-col h-full min-h-0">

        <div className="mb-[clamp(14px,1.8vw,22px)] flex items-center justify-center">
          <img
            src={avatar}
            alt={`${company} logo`}
            className="h-[clamp(56px,7vw,92px)] w-auto max-w-[78%] object-contain"
          />
        </div>

        <div className="flex-1 min-h-0 flex items-start overflow-hidden">
          <p className="w-full font-medium italic text-primary leading-[1.52] text-[clamp(9.75px,0.96vw,13.5px)]">
            "{quote} {description}"
          </p>
        </div>

      </div>

      <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase text-accent tracking-tighter">
          {company}
        </span>

        <div className="flex gap-1">
          {[1,2,3,4,5].map((s)=>(
            <div key={s} className="w-1 h-1 rounded-full bg-accent/40"/>
          ))}
        </div>
      </div>

    </div>
  )
}

const Testimonials: React.FC = () => {

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [startScrollToCenter,setStartScrollToCenter] = useState(0)
  const [maxScrollToCenter,setMaxScrollToCenter] = useState(0)
  const [sectionHeightPx,setSectionHeightPx] = useState<number|null>(null)

  const [layoutReady,setLayoutReady] = useState(false)

  useEffect(()=>{

    const calculateBounds = ()=>{

      if(!trackRef.current) return

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const cards = Array.from(
        trackRef.current.querySelectorAll<HTMLElement>('[data-testimonial-card]')
      )

      if(cards.length===0) return

      const first = cards[0]
      const last = cards[cards.length-1]

      const centerOffset = (el:HTMLElement)=>{
        const left = el.offsetLeft
        const width = el.offsetWidth
        return left + width/2 - viewportWidth/2
      }

      const start = Math.max(0,centerOffset(first))
      const end = Math.max(start,centerOffset(last))

      setStartScrollToCenter(start)
      setMaxScrollToCenter(end)

      const intro = viewportHeight * 0.9
      const horizontal = (end-start)*1.35
      const extra = viewportHeight * 0.35

      setSectionHeightPx(viewportHeight + intro + horizontal + extra)

      setLayoutReady(true)
    }

    calculateBounds()

    const timer = setTimeout(calculateBounds,120)

    window.addEventListener('resize',calculateBounds)

    return ()=>{
      window.removeEventListener('resize',calculateBounds)
      clearTimeout(timer)
    }

  },[])

  const {scrollYProgress} = useScroll({
    target:containerRef,
    offset:['start start','end end']
  })

  const smoothProgress = useSpring(scrollYProgress,{
    stiffness:42,
    damping:30,
    mass:0.9,
    restDelta:0.001
  })

  const titleOpacity = useTransform(
    smoothProgress,
    [0,0.06,0.18,0.30],
    [0,1,1,0]
  )

  const titleScale = useTransform(
    smoothProgress,
    [0.18,0.30],
    [1,0.72]
  )

  const titleY = useTransform(
    smoothProgress,
    [0,0.06],
    ['80px','0px']
  )

  const cardsY = useTransform(
    smoothProgress,
    [0.08,0.30],
    ['80vh','0vh']
  )

  const cardsOpacity = useTransform(
    smoothProgress,
    [0.12,0.26],
    [0,1]
  )

  const horizontalX = useTransform(
    smoothProgress,
    [0,0.36,0.44,0.92],
    [
      `-${startScrollToCenter}px`,
      `-${startScrollToCenter}px`,
      `-${startScrollToCenter}px`,
      `-${maxScrollToCenter}px`
    ]
  )

  const holdAfterLastOpacity = useTransform(
    smoothProgress,
    [0.90,0.92,1],
    [1,1,0]
  )

  const scrollHintOpacity = useTransform(
    smoothProgress,
    [0.28,0.36,0.88,0.94],
    [0,0.4,0.4,0]
  )

  const sectionStyle = useMemo(()=>{
    return sectionHeightPx
      ? {height:`${sectionHeightPx}px`}
      : {height:'640vh'}
  },[sectionHeightPx])

  const testimonials:TestimonialProps[] = [

    {
      author:'',
      role:'',
      company:'Fairly',
      quote:'As the Market Manager for Fairly (rental management platform), I rely on expert local property caretakers to be the boots-on-the-ground contacts for homeowners and guests.',
      description:"I am so glad I partnered with VIS Home Services to represent our Aspen market! Florencia, Geremias are professional, responsive, reliable, and deeply knowledgeable local hosts. We're excited to continue partnering with them for our new rental homes, knowing they offer extensive services and have an outstanding local reputation - they know everyone in Aspen! VIS Home Services is an invaluable asset to any rental property in town.",
      avatar:'https://res.cloudinary.com/deit2ncmp/image/upload/v1773074619/fairly_c5xwlf.png'
    },

    {
      author:'',
      role:'',
      company:'Elevated',
      quote:'VIS consistently delivers exceptional housekeeping and maintenance services.',
      description:'Every property is left absolutely spotless after each clean, which has helped us consistently earn 5-star reviews from our guests. Their inspectors are incredibly meticulous, carefully identifying even the smallest maintenance issues and ensuring they are addressed immediately. Their attention to detail and commitment to excellence truly set them apart.',
      avatar:'https://res.cloudinary.com/deit2ncmp/image/upload/v1773074619/elevated_k6m9ou.png'
    },

    {
      author:'',
      role:'',
      company:'Aspen Business Services',
      quote:'Aspen Business Services highly recommends Village Integral Services (VIS) for their exceptional professionalism and technical competence.',
      description:'From routine maintenance to time-sensitive repairs, their team consistently delivers dependable results across our residential and commercial portfolios. They are a reliable partner that directly contributes to operational stability and tenant satisfaction.',
      avatar:'https://res.cloudinary.com/deit2ncmp/image/upload/v1773074619/aspen_business_services_notnu6.png'
    },

    {
      author:'',
      role:'',
      company:'Summit Property Group',
      quote:'VIS has become a trusted extension of our local operations in Aspen.',
      description:'Their team communicates clearly, responds quickly, and maintains an exceptional standard across every service touchpoint. From guest readiness to ongoing property care, they consistently help us protect the quality of our homes and deliver a seamless ownership experience.',
      avatar:'https://dummyimage.com/600x180/ffffff/005B43.png&text=LOGO'
    }

  ]

  return (

    <section
      ref={containerRef}
      id="testimonials"
      className="relative bg-cream"
      style={sectionStyle}
    >

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-[clamp(96px,14vh,148px)]">

        <motion.div
          style={{
            opacity:titleOpacity,
            scale:titleScale,
            y:titleY
          }}
          className="absolute z-20 text-center pointer-events-none w-full"
        >

          <h3 className="text-[30px] md:text-8xl font-black text-primary tracking-[0.4em] uppercase mb-4 drop-shadow-sm pl-[0.4em]">
            TESTIMONIALS
          </h3>

          <motion.div
            className="h-1.5 bg-accent mx-auto rounded-full"
            style={{width:'120px'}}
          />

        </motion.div>

        <motion.div
          style={{
            y: layoutReady ? cardsY : '80vh',
            opacity: layoutReady ? cardsOpacity : 0
          }}
          className="relative z-10 w-full"
        >

          <motion.div
            ref={trackRef}
            style={{x:horizontalX}}
            className="
            flex
            gap-[clamp(14px,3vw,40px)]
            px-[clamp(18px,8vw,20vw)]
            py-6
            w-max
            "
          >

            {testimonials.map((t,i)=>(
              <TestimonialCard key={i} {...t}/>
            ))}

            <div className="flex-shrink-0 w-[5vw]" />

          </motion.div>

        </motion.div>

        <div className="absolute bottom-12 w-48 h-0.5 bg-dark/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            style={{
              scaleX:scrollYProgress,
              transformOrigin:'left'
            }}
          />
        </div>

        <motion.div
          style={{opacity:scrollHintOpacity}}
          className="absolute bottom-16 text-[10px] font-black tracking-[0.5em] uppercase text-dark/30"
        >
          Keep scrolling to see all stories
        </motion.div>

        <motion.div
          style={{opacity:holdAfterLastOpacity}}
          className="absolute top-6 right-6 text-[10px] font-black tracking-[0.25em] uppercase text-dark/20"
        >
          Scroll to continue
        </motion.div>

      </div>

    </section>
  )
}

export default Testimonials
