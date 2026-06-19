import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Heart, X, Star, Zap, MapPin, Briefcase, ChevronDown, RotateCcw, SlidersHorizontal, MessageCircle, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const profiles = [
  { id: 1,  name: 'Amara',    age: 24, emoji: '👩🏾', country: 'Liberia',       flag: '🇱🇷', job: 'Fashion Designer',    distance: '2km',  bio: 'Creative soul who loves art, music, and good food. Looking for someone to explore life with 💕', tags: ['Art', 'Music', 'Travel', 'Foodie'], verified: true,  premium: true,  match: 94, online: true  },
  { id: 2,  name: 'Kofi',     age: 27, emoji: '👨🏿', country: 'Ghana',         flag: '🇬🇭', job: 'Software Engineer',   distance: '5km',  bio: 'Tech guy by day, chef by night. I build apps and cook jollof rice. Let\'s vibe 🔥', tags: ['Tech', 'Cooking', 'Gaming', 'Gym'], verified: true,  premium: false, match: 88, online: true  },
  { id: 3,  name: 'Fatima',   age: 22, emoji: '👩🏽', country: 'Senegal',       flag: '🇸🇳', job: 'Medical Student',     distance: '8km',  bio: 'Future doctor with a big heart. I love dancing, reading, and long walks on the beach 🌊', tags: ['Health', 'Dance', 'Books', 'Beach'], verified: true,  premium: true,  match: 91, online: false },
  { id: 4,  name: 'Emmanuel', age: 29, emoji: '👨🏾', country: 'Nigeria',       flag: '🇳🇬', job: 'Entrepreneur',        distance: '12km', bio: 'Building the next big thing in Africa. Passionate about business, fitness, and family 💪', tags: ['Business', 'Fitness', 'Family', 'Travel'], verified: false, premium: false, match: 79, online: true  },
  { id: 5,  name: 'Aisha',    age: 25, emoji: '👩🏿', country: 'Sierra Leone',  flag: '🇸🇱', job: 'Content Creator',     distance: '3km',  bio: 'SmartzTV creator with 50K followers. I make people laugh and smile every day 😄', tags: ['Comedy', 'Content', 'Fashion', 'Music'], verified: true,  premium: true,  match: 96, online: true  },
  { id: 6,  name: 'David',    age: 31, emoji: '👨🏽', country: 'Kenya',         flag: '🇰🇪', job: 'Architect',           distance: '15km', bio: 'Designing beautiful spaces and beautiful relationships. Let\'s build something together 🏗️', tags: ['Design', 'Architecture', 'Art', 'Coffee'], verified: true,  premium: false, match: 83, online: false },
  { id: 7,  name: 'Grace',    age: 23, emoji: '👩🏾', country: 'Cameroon',      flag: '🇨🇲', job: 'Teacher',             distance: '6km',  bio: 'Shaping young minds by day, exploring the city by night. Education is my passion ✨', tags: ['Education', 'Kids', 'Hiking', 'Cooking'], verified: false, premium: false, match: 85, online: true  },
  { id: 8,  name: 'Ibrahim',  age: 28, emoji: '👨🏿', country: 'Côte d\'Ivoire', flag: '🇨🇮', job: 'Musician',            distance: '9km',  bio: 'Afrobeats producer and performer. Music is my love language 🎵 Let\'s make memories', tags: ['Music', 'Art', 'Travel', 'Dance'], verified: true,  premium: true,  match: 90, online: false },
]

const bgColors = [
  'from-pink-400/20 to-rose-600/15',
  'from-purple-400/20 to-violet-600/15',
  'from-fuchsia-400/20 to-pink-600/15',
  'from-amber-400/20 to-orange-600/15',
  'from-emerald-400/20 to-teal-600/15',
  'from-blue-400/20 to-indigo-600/15',
]

// ─── Swipe Card ──────────────────────────────────────────────────────────────
function SwipeCard({ profile, onSwipe, isTop, stackIndex }: {
  profile: typeof profiles[0]
  onSwipe: (dir: 'left' | 'right' | 'super') => void
  isTop: boolean
  stackIndex: number
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-250, 250], [-20, 20])
  const likeOpacity  = useTransform(x, [30, 120],  [0, 1])
  const nopeOpacity  = useTransform(x, [-120, -30], [1, 0])
  const superOpacity = useTransform(y, [-120, -30], [1, 0])
  const [expanded, setExpanded] = useState(false)
  const bg = bgColors[profile.id % bgColors.length]

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    if (info.offset.y < -100)      onSwipe('super')
    else if (info.offset.x > 100)  onSwipe('right')
    else if (info.offset.x < -100) onSwipe('left')
  }

  const scale = 1 - stackIndex * 0.04
  const translateY = stackIndex * 10

  return (
    <motion.div
      style={{ x: isTop ? x : 0, y: isTop ? y : translateY, rotate: isTop ? rotate : 0, scale, zIndex: 20 - stackIndex }}
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      className={`absolute inset-0 cursor-grab active:cursor-grabbing select-none`}
      whileDrag={{ scale: 1.03 }}
    >
      <div className={`w-full h-full rounded-3xl overflow-hidden dark:bg-[#1A1228] bg-white shadow-2xl border dark:border-white/8 border-gray-100 flex flex-col bg-gradient-to-br ${bg}`}>

        {/* Photo area */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-0">
          <div className="text-[110px] sm:text-[140px] leading-none select-none filter drop-shadow-2xl">
            {profile.emoji}
          </div>

          {/* Swipe overlays */}
          {isTop && (
            <>
              <motion.div style={{ opacity: likeOpacity }}
                className="absolute top-8 left-6 rotate-[-22deg] border-4 border-emerald-400 rounded-2xl px-4 py-2 bg-emerald-400/10 backdrop-blur-sm">
                <span className="text-2xl font-black text-emerald-400 tracking-widest">LIKE 💚</span>
              </motion.div>
              <motion.div style={{ opacity: nopeOpacity }}
                className="absolute top-8 right-6 rotate-[22deg] border-4 border-red-400 rounded-2xl px-4 py-2 bg-red-400/10 backdrop-blur-sm">
                <span className="text-2xl font-black text-red-400 tracking-widest">NOPE ✕</span>
              </motion.div>
              <motion.div style={{ opacity: superOpacity }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 border-4 border-blue-400 rounded-2xl px-4 py-2 bg-blue-400/10 backdrop-blur-sm">
                <span className="text-2xl font-black text-blue-400 tracking-widest">SUPER ⭐</span>
              </motion.div>
            </>
          )}

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              {profile.verified && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/90 text-white text-[10px] font-bold backdrop-blur-sm w-fit">
                  <Shield className="w-2.5 h-2.5" /> Verified
                </span>
              )}
              {profile.premium && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-bold backdrop-blur-sm w-fit">
                  👑 VIP
                </span>
              )}
              {profile.online && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold backdrop-blur-sm w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Online
                </span>
              )}
            </div>
            <div className="px-2.5 py-1 rounded-full bg-love-gradient text-white text-[10px] font-black backdrop-blur-sm shadow-lg">
              {profile.match}% Match
            </div>
          </div>

          {/* Expand button */}
          <button onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
            className="absolute bottom-4 right-4 w-8 h-8 rounded-full dark:bg-black/50 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
            <ChevronDown className={`w-4 h-4 dark:text-white text-gray-700 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Info panel */}
        <div className="px-5 py-4 dark:bg-[#130E1E]/95 bg-white/95 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-start justify-between mb-1.5">
            <div>
              <h3 className="font-display font-black text-2xl dark:text-white text-gray-900">
                {profile.name}, {profile.age}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 text-xs dark:text-gray-400 text-gray-500">
                  <MapPin className="w-3 h-3 text-brand-pink" /> {profile.distance} · {profile.flag} {profile.country}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-3">
            <Briefcase className="w-3 h-3 text-brand-pink flex-shrink-0" />
            <span className="text-xs dark:text-gray-300 text-gray-600">{profile.job}</span>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                <p className="text-xs dark:text-gray-300 text-gray-600 leading-relaxed mb-3">{profile.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-love-soft text-brand-pink text-[10px] font-bold border border-pink-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Filter Drawer ────────────────────────────────────────────────────────────
function FilterDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [ageRange, setAgeRange] = useState([18, 40])
  const [distance, setDistance] = useState(25)
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 dark:bg-[#130E1E] bg-white rounded-t-3xl p-6 max-w-lg mx-auto shadow-2xl">
            <div className="w-10 h-1 rounded-full dark:bg-white/20 bg-gray-300 mx-auto mb-6" />
            <h3 className="font-display font-black text-lg dark:text-white text-gray-900 mb-5">Discovery Filters</h3>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold dark:text-white text-gray-900">Age Range</span>
                  <span className="text-sm text-brand-pink font-bold">{ageRange[0]}–{ageRange[1]}</span>
                </div>
                <input type="range" min={18} max={60} value={ageRange[1]} onChange={e => setAgeRange([ageRange[0], +e.target.value])}
                  className="w-full accent-pink-500" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold dark:text-white text-gray-900">Max Distance</span>
                  <span className="text-sm text-brand-pink font-bold">{distance}km</span>
                </div>
                <input type="range" min={1} max={100} value={distance} onChange={e => setDistance(+e.target.value)}
                  className="w-full accent-pink-500" />
              </div>
              <div>
                <span className="text-sm font-semibold dark:text-white text-gray-900 block mb-2">Show Me</span>
                <div className="flex gap-2">
                  {['Women', 'Men', 'Everyone'].map(g => (
                    <button key={g} className="flex-1 py-2 rounded-xl text-xs font-bold dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-700 hover:bg-love-gradient hover:text-white transition-all">
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={onClose} className="w-full mt-6 py-3.5 rounded-2xl bg-love-gradient text-white font-bold text-sm shadow-lg shadow-pink-500/25">
              Apply Filters ✓
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function DiscoverPage() {
  const [deck, setDeck] = useState(profiles)
  const [lastSwiped, setLastSwiped] = useState<typeof profiles[0] | null>(null)
  const [matchedWith, setMatchedWith] = useState<typeof profiles[0] | null>(null)
  const [filter, setFilter] = useState<'all' | 'nearby' | 'verified' | 'vip'>('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [swipeCount, setSwipeCount] = useState(0)
  const [superLikes, setSuperLikes] = useState(3)

  const filtered = deck.filter(p => {
    if (filter === 'nearby')   return parseInt(p.distance) <= 5
    if (filter === 'verified') return p.verified
    if (filter === 'vip')      return p.premium
    return true
  })

  const swipe = (dir: 'left' | 'right' | 'super') => {
    const top = filtered[filtered.length - 1]
    if (!top) return
    setLastSwiped(top)
    setDeck(prev => prev.filter(p => p.id !== top.id))
    setSwipeCount(c => c + 1)
    if (dir === 'super') setSuperLikes(s => Math.max(0, s - 1))
    if (dir === 'right' || dir === 'super') {
      if (Math.random() > 0.45) setMatchedWith(top)
    }
  }

  const undo = () => {
    if (lastSwiped) {
      setDeck(prev => [...prev, lastSwiped])
      setLastSwiped(null)
    }
  }

  const topThree = filtered.slice(-3)

  return (
    <div className="h-full flex flex-col dark:bg-[#0A0710] bg-gray-50 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-2 flex-shrink-0">
        <div>
          <h1 className="font-display font-black text-xl dark:text-white text-gray-900">Discover 💕</h1>
          <p className="text-xs dark:text-gray-400 text-gray-500">{filtered.length} people nearby · {swipeCount} swipes today</p>
        </div>
        <div className="flex items-center gap-2">
          {lastSwiped && (
            <button onClick={undo}
              className="w-9 h-9 rounded-xl dark:bg-white/5 bg-white border dark:border-white/8 border-gray-200 flex items-center justify-center hover:text-brand-pink transition-colors shadow-sm">
              <RotateCcw className="w-4 h-4 dark:text-gray-400 text-gray-500" />
            </button>
          )}
          <button onClick={() => setFilterOpen(true)}
            className="w-9 h-9 rounded-xl dark:bg-white/5 bg-white border dark:border-white/8 border-gray-200 flex items-center justify-center hover:text-brand-pink transition-colors shadow-sm">
            <SlidersHorizontal className="w-4 h-4 dark:text-gray-400 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 px-4 sm:px-6 pb-3 flex-shrink-0 overflow-x-auto scrollbar-hide">
        {(['all', 'nearby', 'verified', 'vip'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all flex-shrink-0 ${
              filter === f ? 'bg-love-gradient text-white shadow-md shadow-pink-500/20' : 'dark:bg-white/5 bg-white border dark:border-white/8 border-gray-200 dark:text-gray-400 text-gray-600'
            }`}>
            {f === 'all' ? '✨ All' : f === 'nearby' ? '📍 Nearby' : f === 'verified' ? '✓ Verified' : '👑 VIP'}
          </button>
        ))}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full dark:bg-blue-500/10 bg-blue-50 border dark:border-blue-500/20 border-blue-200 flex-shrink-0">
          <Star className="w-3 h-3 text-blue-400" />
          <span className="text-xs font-bold text-blue-400">{superLikes} Super</span>
        </div>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative px-4 sm:px-6 pb-2 min-h-0">
        <div className="relative w-full h-full max-w-sm mx-auto">
          {filtered.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-4">
              <div className="text-6xl">💔</div>
              <p className="font-display font-black text-xl dark:text-white text-gray-900">You've seen everyone!</p>
              <p className="text-sm dark:text-gray-400 text-gray-500">Check back later or expand your filters to discover more people.</p>
              <button onClick={() => { setDeck(profiles); setSwipeCount(0) }}
                className="btn-love px-6 py-3 rounded-xl text-sm font-bold">
                🔄 Refresh Deck
              </button>
            </div>
          ) : (
            topThree.map((profile, i) => {
              const isTop = i === topThree.length - 1
              const stackIndex = topThree.length - 1 - i
              return (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  onSwipe={swipe}
                  isTop={isTop}
                  stackIndex={stackIndex}
                />
              )
            })
          )}
        </div>
      </div>

      {/* Action buttons */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 py-3 flex-shrink-0">
          {/* Nope */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => swipe('left')}
            className="w-14 h-14 rounded-full bg-white dark:bg-[#1A1228] border-2 border-red-400/40 flex items-center justify-center shadow-lg hover:scale-110 hover:border-red-400 hover:shadow-red-400/20 transition-all group">
            <X className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
          </motion.button>

          {/* Super Like */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => swipe('super')} disabled={superLikes === 0}
            className="w-12 h-12 rounded-full bg-white dark:bg-[#1A1228] border-2 border-blue-400/40 flex items-center justify-center shadow-lg hover:scale-110 hover:border-blue-400 hover:shadow-blue-400/20 transition-all group disabled:opacity-40">
            <Star className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
          </motion.button>

          {/* Like */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => swipe('right')}
            className="w-16 h-16 rounded-full bg-love-gradient flex items-center justify-center shadow-xl shadow-pink-500/40 hover:scale-110 hover:shadow-pink-500/60 transition-all group">
            <Heart className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="white" />
          </motion.button>

          {/* Boost */}
          <motion.button whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-white dark:bg-[#1A1228] border-2 border-fuchsia-400/40 flex items-center justify-center shadow-lg hover:scale-110 hover:border-fuchsia-400 hover:shadow-fuchsia-400/20 transition-all group">
            <Zap className="w-5 h-5 text-fuchsia-400 group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>
      )}

      {/* Swipe hint */}
      {filtered.length > 0 && swipeCount === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="text-center text-[10px] dark:text-gray-600 text-gray-400 pb-2 flex-shrink-0">
          ← Swipe left to pass · Swipe right to like · Swipe up for super like →
        </motion.p>
      )}

      {/* Filter Drawer */}
      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />

      {/* ── Match Modal ── */}
      <AnimatePresence>
        {matchedWith && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setMatchedWith(null)}
          >
            <motion.div
              initial={{ scale: 0.4, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.4, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              onClick={e => e.stopPropagation()}
              className="dark:bg-[#130E1E] bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border dark:border-pink-500/20 border-pink-200 relative overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 pointer-events-none" />

              <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl mb-3">🎉</motion.div>
              <h2 className="font-display font-black text-3xl text-gradient-love mb-1">It's a Match!</h2>
              <p className="text-sm dark:text-gray-400 text-gray-500 mb-6">
                You and <span className="font-bold dark:text-white text-gray-900">{matchedWith.name}</span> liked each other!
              </p>

              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-6xl">{matchedWith.emoji}</motion.div>
                <div className="text-3xl">💕</div>
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.75 }}
                  className="text-6xl">🧑🏾</motion.div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="px-3 py-1 rounded-full bg-love-soft border border-pink-500/20">
                  <span className="text-xs font-bold text-brand-pink">{matchedWith.match}% Compatible</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <Link to="/app/matches"
                  onClick={() => setMatchedWith(null)}
                  className="w-full btn-love py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25">
                  <MessageCircle className="w-4 h-4" /> Send a Message
                </Link>
                <button onClick={() => setMatchedWith(null)}
                  className="w-full py-3 rounded-2xl text-sm font-semibold dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-700 hover:text-brand-pink transition-colors">
                  Keep Swiping 💕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
