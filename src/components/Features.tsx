import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Heart, MessageCircle, Zap, ShoppingBag, Tv, Car, Shield, Users, ArrowRight, Star } from 'lucide-react'

const features = [
  {
    icon: Heart, label: 'Discover & Match', tag: 'Most Popular',
    color: 'from-pink-500 to-rose-600', glow: 'shadow-pink-500/20',
    desc: 'Tinder-style swipe matching with AI-powered compatibility scores. Find your perfect match from millions of verified profiles across Africa and beyond.',
    bullets: ['Smart compatibility AI', 'Video profiles', 'Voice notes', 'Super Likes'],
    href: '/app/discover', size: 'large',
  },
  {
    icon: Tv, label: 'SmartzTV Live', tag: 'Earn Money',
    color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/20',
    desc: 'TikTok-style live streaming. Go live, receive virtual gifts, and earn real money.',
    bullets: ['Live streaming', 'Virtual gifts', 'Creator monetisation'],
    href: '/app/smartztv', size: 'medium',
  },
  {
    icon: Zap, label: 'Spin & Chat', tag: 'Unique',
    color: 'from-fuchsia-500 to-pink-600', glow: 'shadow-fuchsia-500/20',
    desc: 'Random matching roulette — spin and instantly connect with someone new.',
    bullets: ['Instant random match', 'Interest filters', 'Safe mode'],
    href: '/app/spin', size: 'small',
  },
  {
    icon: MessageCircle, label: 'Private Chat', tag: 'WhatsApp-style',
    color: 'from-purple-500 to-violet-600', glow: 'shadow-purple-500/20',
    desc: 'End-to-end encrypted messaging with voice notes, media sharing, and group rooms.',
    bullets: ['E2E encryption', 'Voice & video calls', 'Group rooms'],
    href: '/app/chat/1', size: 'small',
  },
  {
    icon: ShoppingBag, label: 'Marketplace', tag: 'Buy & Sell',
    color: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/20',
    desc: "Africa's social marketplace. List products, accept Mobile Money, reach millions.",
    bullets: ['MoMo payments', 'Seller verification', 'Buyer protection'],
    href: '/app/marketplace', size: 'medium',
  },
  {
    icon: Car, label: 'SmartzRide', tag: 'Uber-style',
    color: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-500/20',
    desc: 'Safe, affordable ride-hailing with verified drivers and real-time tracking.',
    bullets: ['Verified drivers', 'Real-time tracking', 'MoMo & cash'],
    href: '/app/ride', size: 'small',
  },
]

const trustStats = [
  { icon: Users,  value: '2M+',   label: 'Active Users',  color: 'text-pink-500' },
  { icon: Shield, value: '99.8%', label: 'Uptime',        color: 'text-emerald-500' },
  { icon: Heart,  value: '500K+', label: 'Matches Made',  color: 'text-rose-500' },
  { icon: Star,   value: '4.9★',  label: 'App Rating',    color: 'text-amber-500' },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const large  = features.filter(f => f.size === 'large')
  const medium = features.filter(f => f.size === 'medium')
  const small  = features.filter(f => f.size === 'small')

  return (
    <section id="features" className="py-16 sm:py-24 dark:bg-[#0D0A14] bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-pink-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-love-soft border border-pink-500/25 mb-5">
            <Zap className="w-4 h-4 text-brand-pink" />
            <span className="text-sm font-semibold text-brand-pink">Everything in one app</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl dark:text-white text-gray-900 mb-4 leading-tight">
            6 Powerful Features,<br className="hidden sm:block" />
            <span className="text-gradient-love"> One Platform</span>
          </h2>
          <p className="text-base sm:text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            SmartzConnect combines social networking, live streaming, marketplace, and ride-hailing into one seamless African super-app.
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12">

          {/* Large hero card — spans 2 cols on lg */}
          {large.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={f.label}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                className="lg:col-span-2 group relative dark:bg-[#130E1E] bg-gray-50 rounded-3xl p-7 sm:p-8 border dark:border-white/6 border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 cursor-pointer">

                {/* Glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${f.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`} />

                <div className="relative z-10 flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-xl ${f.glow}`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-pink bg-love-soft px-2.5 py-1 rounded-full">{f.tag}</span>
                        <h3 className="font-display font-black text-xl dark:text-white text-gray-900 mt-1">{f.label}</h3>
                      </div>
                    </div>
                    <p className="dark:text-gray-300 text-gray-700 leading-relaxed mb-5 text-sm sm:text-base">{f.desc}</p>
                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {f.bullets.map(b => (
                        <li key={b} className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-pink flex-shrink-0" />{b}
                        </li>
                      ))}
                    </ul>
                    <Link to={f.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-love-gradient text-white text-sm font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 transition-opacity">
                      Try it now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Visual mockup */}
                  <div className="hidden sm:flex flex-col gap-2 w-48 flex-shrink-0">
                    {[
                      { emoji: '👩🏾', name: 'Amara K.', score: '97%', flag: '🇸🇱' },
                      { emoji: '👩🏽', name: 'Fatima D.', score: '94%', flag: '🇸🇳' },
                      { emoji: '👩🏿', name: 'Grace K.', score: '91%', flag: '🇱🇷' },
                    ].map(p => (
                      <div key={p.name} className="flex items-center gap-2.5 dark:bg-white/5 bg-white rounded-xl px-3 py-2.5 border dark:border-white/6 border-gray-100">
                        <span className="text-2xl">{p.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold dark:text-white text-gray-900 truncate">{p.name} {p.flag}</p>
                          <p className="text-[10px] text-emerald-500 font-semibold">{p.score} match</p>
                        </div>
                        <Heart className="w-4 h-4 text-brand-pink" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Medium cards */}
          {medium.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={f.label}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}
                className="group relative dark:bg-[#130E1E] bg-gray-50 rounded-3xl p-6 border dark:border-white/6 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${f.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg ${f.glow} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-pink bg-love-soft px-2 py-0.5 rounded-full">{f.tag}</span>
                  <h3 className="font-display font-black text-lg dark:text-white text-gray-900 mt-2 mb-2">{f.label}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-4">{f.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {f.bullets.map(b => (
                      <li key={b} className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-pink flex-shrink-0" />{b}
                      </li>
                    ))}
                  </ul>
                  <Link to={f.href} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-pink hover:gap-2.5 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )
          })}

          {/* Small cards — 3 in a row on lg */}
          {small.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={f.label}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 + i * 0.08 }}
                className="group relative dark:bg-[#130E1E] bg-gray-50 rounded-2xl p-5 border dark:border-white/6 border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${f.color} opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity`} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-brand-pink">{f.tag}</span>
                      <h3 className="font-bold text-sm dark:text-white text-gray-900">{f.label}</h3>
                    </div>
                  </div>
                  <p className="text-xs dark:text-gray-400 text-gray-600 leading-relaxed mb-3">{f.desc}</p>
                  <Link to={f.href} className="inline-flex items-center gap-1 text-xs font-bold text-brand-pink hover:gap-2 transition-all">
                    Try it <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Trust stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {trustStats.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="dark:bg-[#130E1E] bg-gray-50 rounded-2xl p-5 text-center border dark:border-white/6 border-gray-100">
                <Icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
                <p className={`font-display font-black text-2xl ${s.color}`}>{s.value}</p>
                <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">{s.label}</p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
