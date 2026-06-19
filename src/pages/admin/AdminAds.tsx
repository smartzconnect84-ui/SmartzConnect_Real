import { useState } from 'react'
import { motion } from 'framer-motion'
import { Megaphone, Eye, TrendingUp, DollarSign, Plus, CheckCircle, XCircle, Clock, BarChart3 } from 'lucide-react'

interface Ad {
  id: string; title: string; advertiser: string; type: 'banner' | 'video' | 'sponsored'
  budget: string; spent: string; impressions: string; clicks: string; ctr: string
  status: 'active' | 'paused' | 'pending' | 'ended'; startDate: string; endDate: string
  placement: string
}

const ads: Ad[] = [
  { id: 'a1', title: 'MTN MoMo — Send Money Fast',     advertiser: 'MTN Liberia',    type: 'banner',    budget: '$500',  spent: '$312',  impressions: '284K', clicks: '8,420', ctr: '2.96%', status: 'active',  startDate: 'Jun 1',  endDate: 'Jun 30',  placement: 'Feed' },
  { id: 'a2', title: 'Orange Money — New Features',    advertiser: 'Orange LR',      type: 'banner',    budget: '$300',  spent: '$189',  impressions: '142K', clicks: '4,260', ctr: '3.00%', status: 'active',  startDate: 'Jun 5',  endDate: 'Jun 25',  placement: 'Discover' },
  { id: 'a3', title: 'Liberia Fashion Week 2024',      advertiser: 'LR Fashion Co.', type: 'sponsored', budget: '$200',  spent: '$0',    impressions: '0',    clicks: '0',     ctr: '0%',    status: 'pending', startDate: 'Jun 20', endDate: 'Jun 27',  placement: 'Marketplace' },
  { id: 'a4', title: 'SmartzRide Driver Recruitment',  advertiser: 'SmartzConnect',  type: 'video',     budget: '$1000', spent: '$720',  impressions: '892K', clicks: '22,300',ctr: '2.50%', status: 'active',  startDate: 'May 15', endDate: 'Jul 15',  placement: 'SmartzTV' },
  { id: 'a5', title: 'Monrovia Real Estate Listings',  advertiser: 'LR Realty',      type: 'banner',    budget: '$150',  spent: '$150',  impressions: '98K',  clicks: '2,940', ctr: '3.00%', status: 'ended',   startDate: 'May 1',  endDate: 'May 31',  placement: 'Feed' },
]

const statusColors = {
  active:  'bg-emerald-500/15 text-emerald-500 border-emerald-500/25',
  paused:  'bg-amber-500/15 text-amber-500 border-amber-500/25',
  pending: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  ended:   'dark:bg-white/8 bg-gray-100 dark:text-gray-400 text-gray-600 dark:border-white/10 border-gray-200',
}
const typeColors = {
  banner:    'bg-pink-500/15 text-brand-pink border-pink-500/25',
  video:     'bg-purple-500/15 text-brand-purple border-purple-500/25',
  sponsored: 'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/25',
}

export default function AdminAdvertisements() {
  const [list, setList] = useState(ads)
  const [filter, setFilter] = useState('all')

  const filtered = list.filter(a => filter === 'all' || a.status === filter)
  const approve = (id: string) => setList(prev => prev.map(a => a.id === id ? { ...a, status: 'active' as const } : a))
  const pause   = (id: string) => setList(prev => prev.map(a => a.id === id ? { ...a, status: 'paused' as const } : a))

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-2xl dark:text-white text-gray-900">Advertisements</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-0.5">Manage ad campaigns and track performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-love-gradient text-white text-xs font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all">
          <Plus className="w-3.5 h-3.5" /> New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Ad Revenue (MTD)', value: '$7,191',  icon: DollarSign, color: 'from-pink-500 to-rose-600' },
          { label: 'Active Campaigns', value: list.filter(a => a.status === 'active').length.toString(), icon: Megaphone, color: 'from-purple-500 to-violet-600' },
          { label: 'Total Impressions', value: '1.4M',   icon: Eye,        color: 'from-fuchsia-500 to-pink-600' },
          { label: 'Avg CTR',           value: '2.87%',  icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
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

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'active', 'pending', 'paused', 'ended'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-love-gradient text-white' : 'dark:bg-[#130E1E] bg-white border dark:border-white/8 border-gray-200 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Ads table */}
      <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-white/5 border-gray-100">
                {['Campaign', 'Type', 'Budget', 'Spent', 'Impressions', 'Clicks', 'CTR', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold dark:text-gray-500 text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="border-b dark:border-white/4 border-gray-50 hover:dark:bg-white/2 hover:bg-pink-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold dark:text-white text-gray-900">{a.title}</p>
                    <p className="text-[10px] dark:text-gray-500 text-gray-400">{a.advertiser} · {a.placement}</p>
                  </td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${typeColors[a.type]}`}>{a.type}</span></td>
                  <td className="px-4 py-3 text-xs font-semibold dark:text-white text-gray-900">{a.budget}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-emerald-500">{a.spent}</td>
                  <td className="px-4 py-3 text-xs dark:text-gray-300 text-gray-700">{a.impressions}</td>
                  <td className="px-4 py-3 text-xs dark:text-gray-300 text-gray-700">{a.clicks}</td>
                  <td className="px-4 py-3 text-xs font-bold text-brand-pink">{a.ctr}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[a.status]}`}>{a.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:bg-blue-500/10 transition-colors">
                        <BarChart3 className="w-3.5 h-3.5 dark:text-gray-400 text-gray-600" />
                      </button>
                      {a.status === 'pending' && (
                        <button onClick={() => approve(a.id)} className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        </button>
                      )}
                      {a.status === 'active' && (
                        <button onClick={() => pause(a.id)} className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center hover:bg-amber-500/20 transition-colors">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
