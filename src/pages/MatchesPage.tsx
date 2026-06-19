import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, MessageCircle, Star, MapPin, Wifi, WifiOff, Filter, X, Sparkles } from 'lucide-react'

interface Match {
  id: string; name: string; age: number; emoji: string; country: string; flag: string
  lastMsg: string; lastTime: string; unread: number; online: boolean
  verified: boolean; premium: boolean; matchScore: number; distance: string
  mutualInterests: string[]
}

const matches: Match[] = [
  { id: '1', name: 'Amara Koroma',   age: 24, emoji: '👩🏾', country: 'Sierra Leone', flag: '🇸🇱', lastMsg: 'Hey! I saw you liked my photo 😊', lastTime: '2m',  unread: 2, online: true,  verified: true,  premium: true,  matchScore: 97, distance: '2 km',  mutualInterests: ['Music', 'Travel', 'Food'] },
  { id: '2', name: 'Fatima Diallo',  age: 26, emoji: '👩🏽', country: 'Senegal',      flag: '🇸🇳', lastMsg: 'Are you free this weekend?',      lastTime: '15m', unread: 1, online: true,  verified: true,  premium: false, matchScore: 94, distance: '5 km',  mutualInterests: ['Art', 'Dance'] },
  { id: '3', name: 'Grace Kamara',   age: 22, emoji: '👩🏿', country: 'Liberia',      flag: '🇱🇷', lastMsg: 'That was so funny 😂😂',           lastTime: '1h',  unread: 0, online: false, verified: false, premium: false, matchScore: 91, distance: '8 km',  mutualInterests: ['Movies', 'Cooking'] },
  { id: '4', name: 'Nadia Mensah',   age: 28, emoji: '👩🏾', country: 'Ghana',        flag: '🇬🇭', lastMsg: 'I love your taste in music!',     lastTime: '3h',  unread: 0, online: true,  verified: true,  premium: true,  matchScore: 89, distance: '12 km', mutualInterests: ['Music', 'Fitness'] },
  { id: '5', name: 'Aisha Touré',    age: 23, emoji: '👩🏽', country: 'Guinea',       flag: '🇬🇳', lastMsg: 'When are we meeting? 😍',          lastTime: '5h',  unread: 3, online: false, verified: false, premium: false, matchScore: 86, distance: '20 km', mutualInterests: ['Travel', 'Books'] },
  { id: '6', name: 'Mariama Bah',    age: 25, emoji: '👩🏿', country: 'Guinea',       flag: '🇬🇳', lastMsg: 'Sent you a voice note 🎤',         lastTime: '1d',  unread: 1, online: false, verified: true,  premium: false, matchScore: 83, distance: '30 km', mutualInterests: ['Fashion', 'Art'] },
  { id: '7', name: 'Blessing Osei',  age: 27, emoji: '👩🏾', country: 'Nigeria',      flag: '🇳🇬', lastMsg: 'You seem really interesting!',    lastTime: '2d',  unread: 0, online: true,  verified: true,  premium: true,  matchScore: 81, distance: '45 km', mutualInterests: ['Tech', 'Music'] },
  { id: '8', name: 'Kadiatou Sow',   age: 21, emoji: '👩🏽', country: 'Senegal',      flag: '🇸🇳', lastMsg: 'Just matched! Say hi 👋',          lastTime: '3d',  unread: 0, online: false, verified: false, premium: false, matchScore: 78, distance: '60 km', mutualInterests: ['Dance', 'Food'] },
]

const tabs = ['All', 'Online', 'Unread', 'New']

export default function MatchesPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [selected, setSelected] = useState<Match | null>(null)

  const filtered = matches.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.country.toLowerCase().includes(search.toLowerCase())
    if (activeTab === 'Online') return matchesSearch && m.online
    if (activeTab === 'Unread') return matchesSearch && m.unread > 0
    if (activeTab === 'New')    return matchesSearch && ['2m','15m','1h'].includes(m.lastTime)
    return matchesSearch
  })

  return (
    <div className="h-full flex dark:bg-[#0A0710] bg-gray-50">

      {/* ── Match list panel ── */}
      <div className={`flex flex-col w-full lg:w-80 xl:w-96 flex-shrink-0 dark:bg-[#0D0A14] bg-white border-r dark:border-white/6 border-gray-100 ${selected ? 'hidden lg:flex' : 'flex'}`}>

        {/* Header */}
        <div className="px-4 pt-5 pb-3 border-b dark:border-white/6 border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-display font-black text-xl dark:text-white text-gray-900">Matches 💕</h1>
              <p className="text-xs dark:text-gray-400 text-gray-500">{matches.length} people like you</p>
            </div>
            <button className="w-9 h-9 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors">
              <Filter className="w-4 h-4 dark:text-gray-400 text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-gray-500 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search matches…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-200 dark:text-white text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-brand-pink transition-colors" />
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-love-gradient text-white shadow-sm' : 'dark:text-gray-400 text-gray-500 hover:text-brand-pink'}`}>
                {tab}
                {tab === 'Unread' && <span className="ml-1 text-[9px] bg-brand-pink text-white rounded-full px-1">{matches.filter(m => m.unread > 0).length}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Match list */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center px-6">
                <p className="text-3xl mb-2">💔</p>
                <p className="text-sm dark:text-gray-400 text-gray-500">No matches found</p>
              </div>
            ) : filtered.map((m, i) => (
              <motion.button key={m.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                onClick={() => setSelected(m)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:dark:bg-white/4 hover:bg-pink-50/50 transition-all border-b dark:border-white/4 border-gray-50 text-left ${selected?.id === m.id ? 'dark:bg-white/6 bg-pink-50' : ''}`}>

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full dark:bg-white/8 bg-pink-50 flex items-center justify-center text-2xl">
                    {m.emoji}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 dark:border-[#0D0A14] border-white ${m.online ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-sm font-bold dark:text-white text-gray-900 truncate">{m.name}</span>
                    {m.verified && <span className="text-[10px] text-blue-400">✓</span>}
                    {m.premium && <span className="text-[10px]">👑</span>}
                    <span className="text-xs">{m.flag}</span>
                  </div>
                  <p className="text-xs dark:text-gray-400 text-gray-500 truncate">{m.lastMsg}</p>
                </div>

                {/* Meta */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-[10px] dark:text-gray-500 text-gray-400">{m.lastTime}</span>
                  {m.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-brand-pink text-white text-[9px] font-black flex items-center justify-center">
                      {m.unread}
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-emerald-500">{m.matchScore}%</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Match detail / chat panel ── */}
      <div className={`flex-1 flex flex-col ${selected ? 'flex' : 'hidden lg:flex'}`}>
        {selected ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 dark:bg-[#0D0A14] bg-white border-b dark:border-white/6 border-gray-100">
              <button onClick={() => setSelected(null)} className="lg:hidden w-8 h-8 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center">
                <X className="w-4 h-4 dark:text-gray-400 text-gray-600" />
              </button>
              <div className="relative">
                <div className="w-10 h-10 rounded-full dark:bg-white/8 bg-pink-50 flex items-center justify-center text-xl">{selected.emoji}</div>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 dark:border-[#0D0A14] border-white ${selected.online ? 'bg-emerald-500' : 'bg-gray-400'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-sm dark:text-white text-gray-900">{selected.name}</p>
                  {selected.verified && <span className="text-[10px] text-blue-400">✓</span>}
                </div>
                <p className="text-xs dark:text-gray-400 text-gray-500 flex items-center gap-1">
                  {selected.online ? <><Wifi className="w-3 h-3 text-emerald-500" /> Online now</> : <><WifiOff className="w-3 h-3" /> {selected.lastTime} ago</>}
                  · {selected.flag} {selected.country} · {selected.distance}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">{selected.matchScore}% match</span>
                <Link to={`/app/chat/${selected.id}`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-love-gradient text-white text-xs font-bold shadow-md shadow-pink-500/20 hover:opacity-90 transition-opacity">
                  <MessageCircle className="w-3.5 h-3.5" /> Chat
                </Link>
              </div>
            </div>

            {/* Profile preview */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Profile card */}
              <div className="dark:bg-[#130E1E] bg-white rounded-2xl p-6 border dark:border-white/6 border-gray-100 text-center">
                <div className="w-24 h-24 rounded-full dark:bg-white/8 bg-pink-50 flex items-center justify-center text-5xl mx-auto mb-3">{selected.emoji}</div>
                <h2 className="font-display font-black text-xl dark:text-white text-gray-900">{selected.name}, {selected.age}</h2>
                <p className="text-sm dark:text-gray-400 text-gray-500 mb-1">{selected.flag} {selected.country} · {selected.distance} away</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {selected.verified && <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full font-semibold">✓ Verified</span>}
                  {selected.premium && <span className="text-xs bg-amber-500/15 text-amber-500 px-2 py-0.5 rounded-full font-semibold">👑 VIP</span>}
                  <span className="text-xs bg-emerald-500/15 text-emerald-500 px-2 py-0.5 rounded-full font-semibold">{selected.matchScore}% match</span>
                </div>

                {/* Mutual interests */}
                <div className="mb-5">
                  <p className="text-xs font-bold dark:text-gray-400 text-gray-500 mb-2 flex items-center justify-center gap-1"><Sparkles className="w-3 h-3" /> Mutual Interests</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selected.mutualInterests.map(i => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-love-soft text-brand-pink font-semibold">{i}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl dark:bg-white/5 bg-gray-50 dark:text-gray-300 text-gray-700 text-sm font-semibold hover:text-brand-pink transition-colors">
                    <Heart className="w-4 h-4" /> Super Like
                  </button>
                  <Link to={`/app/chat/${selected.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-love-gradient text-white text-sm font-bold shadow-md shadow-pink-500/20 hover:opacity-90 transition-opacity">
                    <MessageCircle className="w-4 h-4" /> Send Message
                  </Link>
                </div>
              </div>

              {/* Recent messages preview */}
              <div className="dark:bg-[#130E1E] bg-white rounded-2xl p-4 border dark:border-white/6 border-gray-100">
                <p className="text-xs font-bold dark:text-gray-400 text-gray-500 mb-3">Recent Messages</p>
                <div className="space-y-2">
                  {[selected.lastMsg, 'You matched! 🎉', 'Start a conversation…'].map((msg, i) => (
                    <div key={i} className={`flex ${i === 0 ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${i === 0 ? 'dark:bg-white/8 bg-gray-100 dark:text-gray-200 text-gray-800' : 'bg-love-gradient text-white'}`}>
                        {msg}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="text-6xl mb-4">💕</div>
            <h3 className="font-display font-black text-xl dark:text-white text-gray-900 mb-2">Select a Match</h3>
            <p className="text-sm dark:text-gray-400 text-gray-500">Choose someone from your matches to view their profile and start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}
