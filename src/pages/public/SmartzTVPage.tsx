import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Tv, Play, Users, Star, Gift, TrendingUp, Mic, Video, Heart, Crown, Zap, Globe } from 'lucide-react'

const features = [
  { icon: Video,     title: 'Go Live Instantly',       desc: 'Stream to thousands of viewers across Africa with one tap. No equipment needed — just your phone.',  color: 'from-violet-500 to-purple-600' },
  { icon: Gift,      title: 'Earn from Gifts',          desc: 'Fans send virtual gifts during your streams. Convert them to real cash via Mobile Money.',             color: 'from-pink-500 to-rose-600' },
  { icon: Users,     title: 'Build Your Fanbase',       desc: 'Grow a loyal community of followers who tune in for your content every day.',                         color: 'from-blue-500 to-indigo-600' },
  { icon: TrendingUp,title: 'Trending Discovery',       desc: 'Get featured on the Trending page and reach millions of new viewers organically.',                     color: 'from-amber-500 to-orange-600' },
  { icon: Mic,       title: 'Audio Rooms',              desc: 'Host live audio conversations, debates, and Q&As with your community.',                               color: 'from-emerald-500 to-teal-600' },
  { icon: Crown,     title: 'Creator Monetisation',     desc: 'Subscriptions, tips, brand deals, and exclusive content — multiple income streams in one place.',     color: 'from-yellow-500 to-amber-600' },
]

const creators = [
  { name: 'DJ Amara',    country: '🇱🇷 Liberia',    viewers: '12.4K',  category: 'Music',    emoji: '👩🏾', verified: true },
  { name: 'Chef Kofi',   country: '🇬🇭 Ghana',      viewers: '8.7K',   category: 'Cooking',  emoji: '👨🏿', verified: true },
  { name: 'Fatima Live', country: '🇸🇳 Senegal',    viewers: '21.3K',  category: 'Fashion',  emoji: '👩🏽', verified: true },
  { name: 'Tech Bro',    country: '🇳🇬 Nigeria',    viewers: '5.2K',   category: 'Tech',     emoji: '👨🏾', verified: false },
  { name: 'Aisha Vibes', country: '🇸🇱 Sierra Leone', viewers: '15.8K', category: 'Comedy',  emoji: '👩🏿', verified: true },
  { name: 'David Arts',  country: '🇰🇪 Kenya',      viewers: '9.1K',   category: 'Art',      emoji: '👨🏽', verified: false },
]

const stats = [
  { value: '50K+',  label: 'Daily Live Streams', icon: '📺' },
  { value: '2.4M',  label: 'Monthly Viewers',    icon: '👁️' },
  { value: '$180K', label: 'Paid to Creators',   icon: '💰' },
  { value: '47',    label: 'Countries Reached',  icon: '🌍' },
]

export default function SmartzTVPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="dark:bg-[#080510] bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-purple-900/20 to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/15 border border-violet-500/25 mb-6">
                <Tv className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-violet-400">SmartzConnect TV</span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl dark:text-white text-gray-900 leading-tight mb-5">
                Africa's Live<br /><span className="text-gradient-love">Streaming</span><br />Platform
              </h1>
              <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed mb-8 max-w-lg">
                Go live, build your audience, and earn real money from your passion. SmartzTV is where African creators become stars.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/register" className="btn-love px-7 py-3.5 rounded-2xl text-sm font-bold inline-flex items-center gap-2">
                  <Play className="w-4 h-4" fill="white" /> Start Streaming Free
                </Link>
                <Link to="/register" className="px-7 py-3.5 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 text-sm font-semibold hover:text-brand-pink transition-all inline-flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Watch Live Now
                </Link>
              </div>
            </motion.div>

            {/* Live preview mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="relative">
              <div className="dark:bg-[#130E1E] bg-white rounded-3xl overflow-hidden border dark:border-white/8 border-gray-100 shadow-2xl">
                {/* Stream header */}
                <div className="relative bg-gradient-to-br from-violet-900 to-purple-900 aspect-video flex items-center justify-center">
                  <div className="text-8xl">👩🏾</div>
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 text-white text-xs font-semibold">
                      <Users className="w-3 h-3" /> 12.4K
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm">DJ Amara 🎵</p>
                    <p className="text-white/70 text-xs">Afrobeats Friday Night Mix</p>
                  </div>
                </div>
                {/* Chat */}
                <div className="p-4 space-y-2">
                  {[
                    { user: 'Kofi', msg: '🔥🔥🔥 this beat is crazy!', color: 'text-pink-400' },
                    { user: 'Fatima', msg: 'Sent 50 roses 🌹', color: 'text-amber-400' },
                    { user: 'Emmanuel', msg: 'From Lagos with love ❤️', color: 'text-emerald-400' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className={`font-bold ${c.color}`}>{c.user}:</span>
                      <span className="dark:text-gray-300 text-gray-600">{c.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 dark:bg-[#0D0A14] bg-white border-y dark:border-white/5 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="font-display font-black text-2xl sm:text-3xl text-gradient-love">{s.value}</p>
                <p className="text-sm dark:text-gray-400 text-gray-500">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={ref} className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
            <h2 className="font-display font-black text-3xl sm:text-4xl dark:text-white text-gray-900 mb-3">
              Everything You Need to <span className="text-gradient-love">Create & Earn</span>
            </h2>
            <p className="dark:text-gray-400 text-gray-600 max-w-xl mx-auto">Professional streaming tools built for African creators.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
                  className="dark:bg-[#130E1E] bg-white rounded-2xl p-6 border dark:border-white/6 border-gray-100 hover:shadow-xl transition-all group">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-base dark:text-white text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Live creators */}
      <section className="py-16 dark:bg-[#0D0A14] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-black text-2xl dark:text-white text-gray-900">
              🔴 Live Right Now
            </h2>
            <Link to="/register" className="text-sm font-semibold text-brand-pink hover:underline">See all →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {creators.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.06 }}
                className="dark:bg-[#130E1E] bg-gray-50 rounded-2xl p-4 text-center border dark:border-white/6 border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
                <div className="relative inline-block mb-3">
                  <div className="text-4xl">{c.emoji}</div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 dark:border-[#130E1E] border-white animate-pulse" />
                </div>
                <p className="text-xs font-bold dark:text-white text-gray-900 truncate">{c.name}</p>
                <p className="text-[10px] dark:text-gray-500 text-gray-400 mb-1">{c.country}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-love-soft text-brand-pink font-semibold">{c.category}</span>
                <p className="text-[10px] dark:text-gray-400 text-gray-500 mt-1 flex items-center justify-center gap-1">
                  <Users className="w-2.5 h-2.5" /> {c.viewers}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="dark:bg-[#130E1E] bg-white rounded-3xl p-10 border dark:border-white/8 border-gray-100 shadow-xl">
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="font-display font-black text-3xl dark:text-white text-gray-900 mb-3">Ready to Go Live?</h2>
            <p className="dark:text-gray-400 text-gray-600 mb-6">Join 50,000+ creators already earning on SmartzTV. It's free to start.</p>
            <Link to="/register" className="btn-love px-8 py-4 rounded-2xl font-bold inline-flex items-center gap-2">
              <Zap className="w-4 h-4" /> Become a Creator
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
