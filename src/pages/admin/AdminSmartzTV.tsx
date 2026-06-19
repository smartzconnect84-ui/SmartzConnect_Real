import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tv, Eye, CheckCircle, XCircle, Play, Users, TrendingUp, Star, Search } from 'lucide-react'

interface Video {
  id: string; title: string; creator: string; creatorAvatar: string; country: string; flag: string
  category: string; views: string; duration: string; type: 'live' | 'upload'
  status: 'pending' | 'approved' | 'rejected' | 'live'; thumbnail: string; submitted: string
}

const videos: Video[] = [
  { id: 'v1', title: 'Afrobeats Mix 2024 🔥',          creator: 'Kofi A.',     creatorAvatar: '👨🏿', country: 'Ghana',   flag: '🇬🇭', category: 'Music',     views: '12.4K', duration: '45:22', type: 'upload', status: 'live',     thumbnail: '🎵', submitted: 'Live now' },
  { id: 'v2', title: 'Liberian Street Food Tour',       creator: 'Amara K.',    creatorAvatar: '👩🏾', country: 'Liberia', flag: '🇱🇷', category: 'Food',      views: '8.2K',  duration: '22:15', type: 'upload', status: 'approved', thumbnail: '🍲', submitted: '2h ago' },
  { id: 'v3', title: 'Tech Startup Tips for Africa',    creator: 'Emmanuel M.', creatorAvatar: '👨🏾', country: 'Nigeria', flag: '🇳🇬', category: 'Business',  views: '0',     duration: '18:40', type: 'upload', status: 'pending',  thumbnail: '💻', submitted: '3h ago' },
  { id: 'v4', title: 'Controversial Political Content', creator: 'Unknown',     creatorAvatar: '👤',  country: 'Unknown', flag: '🌍', category: 'Politics',  views: '2.1K',  duration: '31:00', type: 'upload', status: 'rejected', thumbnail: '⚠️', submitted: '5h ago' },
  { id: 'v5', title: 'African Fashion Week Highlights', creator: 'Fatima D.',   creatorAvatar: '👩🏽', country: 'Senegal', flag: '🇸🇳', category: 'Fashion',   views: '0',     duration: '15:30', type: 'upload', status: 'pending',  thumbnail: '👗', submitted: '6h ago' },
  { id: 'v6', title: 'SmartzConnect Dating Tips',       creator: 'Zainab O.',   creatorAvatar: '👩🏾', country: 'Kenya',   flag: '🇰🇪', category: 'Lifestyle', views: '5.8K',  duration: '12:00', type: 'live',   status: 'live',     thumbnail: '💕', submitted: 'Live now' },
]

const statusColors = {
  pending:  'bg-amber-500/15 text-amber-500 border-amber-500/25',
  approved: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/25',
  rejected: 'bg-red-500/15 text-red-500 border-red-500/25',
  live:     'bg-pink-500/15 text-brand-pink border-pink-500/25',
}

export default function AdminSmartzTV() {
  const [list, setList] = useState(videos)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = list.filter(v => {
    const matchFilter = filter === 'all' || v.status === filter
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.creator.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const approve = (id: string) => setList(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' as const } : v))
  const reject  = (id: string) => setList(prev => prev.map(v => v.id === id ? { ...v, status: 'rejected' as const } : v))

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div>
        <h1 className="font-display font-black text-2xl dark:text-white text-gray-900">SmartzTV</h1>
        <p className="text-sm dark:text-gray-400 text-gray-500 mt-0.5">Moderate videos, manage creators, and monitor live streams</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Videos',  value: '48.2K', icon: Tv,         color: 'from-pink-500 to-rose-600' },
          { label: 'Live Now',      value: list.filter(v => v.status === 'live').length.toString(), icon: Play, color: 'from-red-500 to-rose-600' },
          { label: 'Total Views',   value: '12.4M', icon: Eye,        color: 'from-purple-500 to-violet-600' },
          { label: 'Creators',      value: '8,420', icon: Users,      color: 'from-fuchsia-500 to-pink-600' },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-4">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-lg`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <p className="font-display font-black text-2xl dark:text-white text-gray-900">{s.value}</p>
              <p className="text-[11px] dark:text-gray-400 text-gray-500 mt-0.5">{s.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 dark:text-gray-500 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search videos or creators..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl dark:bg-[#130E1E] bg-white border dark:border-white/8 border-gray-200 text-xs dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'live', 'pending', 'approved', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-love-gradient text-white' : 'dark:bg-[#130E1E] bg-white border dark:border-white/8 border-gray-200 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Videos grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((v, i) => (
          <motion.div key={v.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 overflow-hidden">
            {/* Thumbnail */}
            <div className="relative h-32 dark:bg-white/5 bg-gray-50 flex items-center justify-center text-5xl border-b dark:border-white/5 border-gray-100">
              {v.thumbnail}
              {v.status === 'live' && (
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
                </div>
              )}
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">{v.duration}</div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold dark:text-white text-gray-900 mb-1 line-clamp-1">{v.title}</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">{v.creatorAvatar}</span>
                <span className="text-[11px] dark:text-gray-300 text-gray-700 font-semibold">{v.creator}</span>
                <span className="text-sm">{v.flag}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] dark:text-gray-400 text-gray-500 flex items-center gap-1"><Eye className="w-3 h-3" /> {v.views}</span>
                  <span className="text-[10px] dark:bg-white/5 bg-gray-100 px-1.5 py-0.5 rounded dark:text-gray-400 text-gray-600">{v.category}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[v.status]}`}>{v.status}</span>
              </div>
              {v.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => approve(v.id)} className="flex-1 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button onClick={() => reject(v.id)} className="flex-1 py-2 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              )}
              {v.status !== 'pending' && (
                <button className="w-full py-2 rounded-xl dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-600 text-xs font-semibold flex items-center justify-center gap-1 hover:text-brand-pink transition-colors">
                  <Eye className="w-3.5 h-3.5" /> View Details
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
