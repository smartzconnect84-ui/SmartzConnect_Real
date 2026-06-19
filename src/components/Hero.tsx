import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Play, Star, Users, MapPin } from 'lucide-react'

const slides = [
  {
    image: '/hero-friends.jpg',
    badge: '🌍 Africa\'s #1 Social Platform',
    headline: 'Where Friendships\nBecome Forever',
    sub: 'Join millions of Africans building real connections, sharing moments, and creating memories that last a lifetime.',
    cta: 'Find Your People',
    ctaLink: '/register',
    accent: 'from-pink-600/70 via-purple-900/60 to-black/80',
    stat: { icon: Users, value: '2.4M+', label: 'Active Friends' },
  },
  {
    image: '/hero-date.jpg',
    badge: '💕 Smart Matching Technology',
    headline: 'Your Perfect Match\nIs Waiting',
    sub: 'Our AI-powered matching engine analyses 50+ compatibility factors to connect you with someone truly special.',
    cta: 'Start Matching',
    ctaLink: '/register',
    accent: 'from-rose-700/70 via-pink-900/60 to-black/80',
    stat: { icon: Heart, value: '180K+', label: 'Couples Matched' },
  },
  {
    image: '/hero-couple.jpg',
    badge: '👑 Love Stories Across Africa',
    headline: 'Real Love,\nReal Connections',
    sub: 'From Monrovia to Lagos, Nairobi to Accra — SmartzConnect is where African love stories begin and flourish.',
    cta: 'Join Free Today',
    ctaLink: '/register',
    accent: 'from-fuchsia-700/70 via-purple-900/60 to-black/80',
    stat: { icon: Star, value: '4.9★', label: 'App Rating' },
  },
  {
    image: '/hero-scroll.jpg',
    badge: '📱 Scroll, Connect, Vibe',
    headline: 'Your Social Feed,\nYour World',
    sub: 'Share your life, discover trending content, go live on SmartzTV, and stay connected with your community 24/7.',
    cta: 'Explore the Feed',
    ctaLink: '/register',
    accent: 'from-violet-700/70 via-indigo-900/60 to-black/80',
    stat: { icon: Play, value: '50K+', label: 'Daily Live Streams' },
  },
  {
    image: '/hero-networking.jpg',
    badge: '🤝 Professional Networking',
    headline: 'Connect, Grow &\nThrive Together',
    sub: 'Build your professional network, discover opportunities, and collaborate with Africa\'s brightest minds on one platform.',
    cta: 'Build Your Network',
    ctaLink: '/register',
    accent: 'from-emerald-700/70 via-teal-900/60 to-black/80',
    stat: { icon: MapPin, value: '47', label: 'Countries' },
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    if (!isPlaying) return
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [isPlaying, next])

  const slide = slides[current]
  const StatIcon = slide.stat.icon

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">

      {/* ── Slides ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`} />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-semibold mb-6"
            >
              {slide.badge}
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-5 whitespace-pre-line drop-shadow-2xl">
              {slide.headline}
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-lg drop-shadow-lg">
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link to={slide.ctaLink}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-love-gradient text-white font-bold text-sm shadow-2xl shadow-pink-500/40 hover:shadow-pink-500/60 hover:scale-105 transition-all">
                <Heart className="w-4 h-4" fill="white" />
                {slide.cta}
              </Link>
              <Link to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold text-sm hover:bg-white/25 transition-all">
                Learn More
              </Link>
            </div>

            {/* Stat pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="w-8 h-8 rounded-xl bg-love-gradient flex items-center justify-center">
                <StatIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-black text-lg leading-none">{slide.stat.value}</p>
                <p className="text-white/70 text-xs">{slide.stat.label}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation arrows ── */}
      <button onClick={() => { prev(); setIsPlaying(false) }}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white/30 transition-all group">
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button onClick={() => { next(); setIsPlaying(false) }}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white/30 transition-all group">
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => { setCurrent(i); setIsPlaying(false) }}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute bottom-8 right-6 z-20 text-white/60 text-xs font-mono">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* ── Floating social proof ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute top-1/3 right-6 sm:right-10 z-20 hidden sm:flex flex-col gap-3"
      >
        {[
          { emoji: '💕', text: 'New match!', sub: 'Amara & Kofi' },
          { emoji: '🎉', text: 'Just joined', sub: '2,847 today' },
        ].map((n, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.2 }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 text-white">
            <span className="text-xl">{n.emoji}</span>
            <div>
              <p className="text-xs font-bold leading-none">{n.text}</p>
              <p className="text-[10px] text-white/70 mt-0.5">{n.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
