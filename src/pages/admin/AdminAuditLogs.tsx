import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollText, Search, Filter, Download, User, Shield, Settings, CreditCard, Flag, Car, ShoppingBag } from 'lucide-react'

interface AuditLog {
  id: string; action: string; actor: string; actorRole: string; actorAvatar: string
  target: string; details: string; ip: string; timestamp: string
  category: 'user' | 'payment' | 'content' | 'system' | 'safety' | 'ride' | 'marketplace'
  severity: 'info' | 'warning' | 'critical'
}

const logs: AuditLog[] = [
  { id: 'l1',  action: 'User Banned',           actor: 'Admin Amara',   actorRole: 'admin',       actorAvatar: '👩🏾', target: 'user@example.com',    details: 'Banned for repeated harassment violations',          ip: '102.89.12.44',  timestamp: '2024-06-10 14:32:01', category: 'user',        severity: 'critical' },
  { id: 'l2',  action: 'Payment Approved',       actor: 'Admin Kofi',    actorRole: 'admin',       actorAvatar: '👨🏿', target: 'MTN-2024-88291',       details: 'Approved VIP subscription payment for Amara K.',     ip: '102.89.12.45',  timestamp: '2024-06-10 14:15:22', category: 'payment',     severity: 'info' },
  { id: 'l3',  action: 'Feature Toggle',         actor: 'Super Admin',   actorRole: 'super_admin', actorAvatar: '👑',  target: 'SmartzRide',           details: 'Enabled SmartzRide feature for Liberia region',      ip: '102.89.12.40',  timestamp: '2024-06-10 13:58:44', category: 'system',      severity: 'warning' },
  { id: 'l4',  action: 'Content Removed',        actor: 'Mod Fatima',    actorRole: 'moderator',   actorAvatar: '👩🏽', target: 'Post #8821',           details: 'Removed post containing explicit content',           ip: '102.89.12.46',  timestamp: '2024-06-10 13:42:11', category: 'content',     severity: 'warning' },
  { id: 'l5',  action: 'Driver Approved',        actor: 'Admin Kofi',    actorRole: 'admin',       actorAvatar: '👨🏿', target: 'Driver Emmanuel W.',   details: 'Approved driver application after document review',  ip: '102.89.12.45',  timestamp: '2024-06-10 13:20:55', category: 'ride',        severity: 'info' },
  { id: 'l6',  action: 'Broadcast Sent',         actor: 'Super Admin',   actorRole: 'super_admin', actorAvatar: '👑',  target: '2.4M users',           details: 'Sent platform update notification to all users',     ip: '102.89.12.40',  timestamp: '2024-06-10 12:00:00', category: 'system',      severity: 'info' },
  { id: 'l7',  action: 'Product Rejected',       actor: 'Mod Fatima',    actorRole: 'moderator',   actorAvatar: '👩🏽', target: 'Listing #992',         details: 'Rejected counterfeit product listing',               ip: '102.89.12.46',  timestamp: '2024-06-10 11:45:33', category: 'marketplace', severity: 'warning' },
  { id: 'l8',  action: 'User Suspended',         actor: 'Admin Amara',   actorRole: 'admin',       actorAvatar: '👩🏾', target: 'user2@example.com',    details: 'Suspended for spam activity',                        ip: '102.89.12.44',  timestamp: '2024-06-10 11:20:18', category: 'user',        severity: 'warning' },
  { id: 'l9',  action: 'Report Resolved',        actor: 'Mod Emmanuel',  actorRole: 'moderator',   actorAvatar: '👨🏾', target: 'Report #r3',           details: 'Resolved spam report, user warned',                  ip: '102.89.12.47',  timestamp: '2024-06-10 10:55:42', category: 'safety',      severity: 'info' },
  { id: 'l10', action: 'Admin Login',            actor: 'Super Admin',   actorRole: 'super_admin', actorAvatar: '👑',  target: 'Admin Panel',          details: 'Successful login from Monrovia, Liberia',            ip: '102.89.12.40',  timestamp: '2024-06-10 09:00:00', category: 'system',      severity: 'info' },
]

const categoryIcons: Record<string, React.ElementType> = {
  user: User, payment: CreditCard, content: Flag, system: Settings, safety: Shield, ride: Car, marketplace: ShoppingBag
}
const severityColors = {
  info:     'bg-blue-500/15 text-blue-400 border-blue-500/25',
  warning:  'bg-amber-500/15 text-amber-500 border-amber-500/25',
  critical: 'bg-red-500/15 text-red-500 border-red-500/25',
}
const categoryColors: Record<string, string> = {
  user:        'bg-pink-500/15 text-brand-pink',
  payment:     'bg-emerald-500/15 text-emerald-500',
  content:     'bg-purple-500/15 text-brand-purple',
  system:      'bg-blue-500/15 text-blue-400',
  safety:      'bg-amber-500/15 text-amber-500',
  ride:        'bg-fuchsia-500/15 text-fuchsia-400',
  marketplace: 'bg-violet-500/15 text-violet-400',
}

export default function AdminAuditLogs() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = logs.filter(l => {
    const matchFilter = filter === 'all' || l.category === filter || l.severity === filter
    const matchSearch = l.action.toLowerCase().includes(search.toLowerCase()) || l.actor.toLowerCase().includes(search.toLowerCase()) || l.target.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-2xl dark:text-white text-gray-900">Audit Logs</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-0.5">Complete trail of all admin actions on the platform</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-love-gradient text-white text-xs font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all">
          <Download className="w-3.5 h-3.5" /> Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Actions', value: logs.length.toString(),                                    color: 'from-pink-500 to-rose-600' },
          { label: 'Critical',      value: logs.filter(l => l.severity === 'critical').length.toString(), color: 'from-red-500 to-rose-600' },
          { label: 'Warnings',      value: logs.filter(l => l.severity === 'warning').length.toString(),  color: 'from-amber-500 to-orange-600' },
          { label: 'Info',          value: logs.filter(l => l.severity === 'info').length.toString(),     color: 'from-blue-500 to-indigo-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-4">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-lg`}>
              <ScrollText className="w-4 h-4 text-white" />
            </div>
            <p className="font-display font-black text-2xl dark:text-white text-gray-900">{s.value}</p>
            <p className="text-[11px] dark:text-gray-400 text-gray-500 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 dark:text-gray-500 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search actions, actors, targets..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl dark:bg-[#130E1E] bg-white border dark:border-white/8 border-gray-200 text-xs dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 dark:text-gray-400 text-gray-500" />
          {['all', 'critical', 'warning', 'info', 'user', 'payment', 'system', 'safety'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-love-gradient text-white' : 'dark:bg-[#130E1E] bg-white border dark:border-white/8 border-gray-200 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Logs */}
      <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-white/5 border-gray-100">
                {['Action', 'Actor', 'Target', 'Category', 'Severity', 'IP Address', 'Timestamp'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold dark:text-gray-500 text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => {
                const CatIcon = categoryIcons[l.category]
                return (
                  <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-b dark:border-white/4 border-gray-50 hover:dark:bg-white/2 hover:bg-pink-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold dark:text-white text-gray-900">{l.action}</p>
                      <p className="text-[10px] dark:text-gray-500 text-gray-400 max-w-[200px] truncate">{l.details}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{l.actorAvatar}</span>
                        <div>
                          <p className="text-xs font-semibold dark:text-white text-gray-900">{l.actor}</p>
                          <p className="text-[9px] dark:text-gray-500 text-gray-400 capitalize">{l.actorRole.replace('_', ' ')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs dark:text-gray-300 text-gray-700 max-w-[120px] truncate">{l.target}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold w-fit ${categoryColors[l.category]}`}>
                        <CatIcon className="w-2.5 h-2.5" /> {l.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${severityColors[l.severity]}`}>{l.severity}</span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-[10px] dark:bg-white/5 bg-gray-100 px-1.5 py-0.5 rounded dark:text-gray-300 text-gray-700">{l.ip}</code>
                    </td>
                    <td className="px-4 py-3 text-[10px] dark:text-gray-400 text-gray-500 whitespace-nowrap">{l.timestamp}</td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
