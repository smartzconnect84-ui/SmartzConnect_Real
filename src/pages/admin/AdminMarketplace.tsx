import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, CheckCircle, XCircle, Eye, Search, Filter, Star, Package, TrendingUp } from 'lucide-react'

interface Product {
  id: string; name: string; seller: string; sellerAvatar: string; category: string
  price: string; images: string; status: 'pending' | 'approved' | 'rejected'
  submitted: string; country: string; flag: string; description: string
}

const products: Product[] = [
  { id: 'pr1', name: 'iPhone 14 Pro Max 256GB',    seller: 'Kofi A.',     sellerAvatar: '👨🏿', category: 'Electronics', price: '$350',  images: '📱', status: 'pending',  submitted: '30m ago', country: 'Ghana',   flag: '🇬🇭', description: 'Excellent condition, original box included.' },
  { id: 'pr2', name: 'Ankara Fashion Dress',        seller: 'Amara K.',    sellerAvatar: '👩🏾', category: 'Fashion',     price: '$45',   images: '👗', status: 'pending',  submitted: '1h ago',  country: 'Liberia', flag: '🇱🇷', description: 'Handmade Ankara dress, size M. Ships worldwide.' },
  { id: 'pr3', name: 'Organic Shea Butter 500g',    seller: 'Fatima D.',   sellerAvatar: '👩🏽', category: 'Beauty',      price: '$18',   images: '🧴', status: 'approved', submitted: '2h ago',  country: 'Senegal', flag: '🇸🇳', description: 'Pure unrefined shea butter from Senegal.' },
  { id: 'pr4', name: 'Afrobeats Vinyl Collection',  seller: 'Emmanuel M.', sellerAvatar: '👨🏾', category: 'Music',       price: '$120',  images: '🎵', status: 'approved', submitted: '3h ago',  country: 'Nigeria', flag: '🇳🇬', description: 'Rare vinyl collection, 20 albums.' },
  { id: 'pr5', name: 'Fake Gucci Bag',              seller: 'Unknown',     sellerAvatar: '👤',  category: 'Fashion',     price: '$200',  images: '👜', status: 'rejected', submitted: '4h ago',  country: 'Unknown', flag: '🌍', description: 'Luxury bag (flagged as counterfeit).' },
  { id: 'pr6', name: 'Samsung Galaxy S24 Ultra',    seller: 'David K.',    sellerAvatar: '👨🏽', category: 'Electronics', price: '$420',  images: '📱', status: 'pending',  submitted: '5h ago',  country: 'Liberia', flag: '🇱🇷', description: 'Brand new sealed box, warranty included.' },
]

const categories = ['All', 'Electronics', 'Fashion', 'Beauty', 'Music', 'Food', 'Art']
const statusColors = {
  pending:  'bg-amber-500/15 text-amber-500 border-amber-500/25',
  approved: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/25',
  rejected: 'bg-red-500/15 text-red-500 border-red-500/25',
}

export default function AdminMarketplace() {
  const [list, setList] = useState(products)
  const [filter, setFilter] = useState('all')
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = list.filter(p => {
    const matchFilter = filter === 'all' || p.status === filter
    const matchCat = category === 'All' || p.category === category
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchCat && matchSearch
  })

  const approve = (id: string) => setList(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' as const } : p))
  const reject  = (id: string) => setList(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' as const } : p))

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div>
        <h1 className="font-display font-black text-2xl dark:text-white text-gray-900">Marketplace</h1>
        <p className="text-sm dark:text-gray-400 text-gray-500 mt-0.5">Review and approve product listings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Listings', value: '50K+',  icon: ShoppingBag, color: 'from-pink-500 to-rose-600' },
          { label: 'Pending Review', value: list.filter(p => p.status === 'pending').length.toString(), icon: Package, color: 'from-amber-500 to-orange-600' },
          { label: 'Approved',       value: list.filter(p => p.status === 'approved').length.toString(), icon: CheckCircle, color: 'from-emerald-500 to-teal-600' },
          { label: 'Monthly Sales',  value: '$12.8K', icon: TrendingUp, color: 'from-purple-500 to-violet-600' },
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
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products or sellers..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl dark:bg-[#130E1E] bg-white border dark:border-white/8 border-gray-200 text-xs dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-love-gradient text-white' : 'dark:bg-[#130E1E] bg-white border dark:border-white/8 border-gray-200 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 dark:text-gray-400 text-gray-500 self-center" />
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${category === c ? 'bg-love-gradient text-white' : 'dark:bg-[#130E1E] bg-white border dark:border-white/8 border-gray-200 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 overflow-hidden">
            {/* Product image placeholder */}
            <div className="h-32 dark:bg-white/5 bg-gray-50 flex items-center justify-center text-5xl border-b dark:border-white/5 border-gray-100">
              {p.images}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold dark:text-white text-gray-900 truncate">{p.name}</h4>
                  <p className="text-[10px] dark:text-gray-400 text-gray-500 mt-0.5">{p.category}</p>
                </div>
                <span className="font-black text-sm text-brand-pink ml-2 flex-shrink-0">{p.price}</span>
              </div>
              <p className="text-[11px] dark:text-gray-400 text-gray-500 mb-3 line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{p.sellerAvatar}</span>
                  <span className="text-[11px] dark:text-gray-300 text-gray-700 font-semibold">{p.seller}</span>
                  <span className="text-sm">{p.flag}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[p.status]}`}>{p.status}</span>
              </div>
              {p.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => approve(p.id)} className="flex-1 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button onClick={() => reject(p.id)} className="flex-1 py-2 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              )}
              {p.status !== 'pending' && (
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
