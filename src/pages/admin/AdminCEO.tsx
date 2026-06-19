import { motion } from 'framer-motion'
import { Crown, Users, DollarSign, Settings, BarChart3, Shield, TrendingUp, Globe, Lock, Key, AlertTriangle } from 'lucide-react'

const ceoStats = [
  { label: 'Platform Revenue',  value: '$1.24M',  change: '+18.4%', icon: DollarSign, color: 'from-amber-500 to-yellow-600' },
  { label: 'Total Users',       value: '2.42M',   change: '+12.1%', icon: Users,      color: 'from-pink-500 to-rose-600' },
  { label: 'Countries Active',  value: '47',      change: '+3',     icon: Globe,      color: 'from-purple-500 to-violet-600' },
  { label: 'Platform Health',   value: '99.8%',   change: 'uptime', icon: Shield,     color: 'from-emerald-500 to-teal-600' },
]

const adminTeam = [
  { name: 'Amara Johnson',  role: 'Admin',     avatar: '👩🏾', actions: 284, status: 'active' },
  { name: 'Kofi Mensah',    role: 'Admin',     avatar: '👨🏿', actions: 192, status: 'active' },
  { name: 'Fatima Diallo',  role: 'Moderator', avatar: '👩🏽', actions: 441, status: 'active' },
  { name: 'Emmanuel Osei',  role: 'Moderator', avatar: '👨🏾', actions: 128, status: 'active' },
]

const platformConfig = [
  { key: 'Platform Name',       value: 'SmartzConnect',          editable: true },
  { key: 'Version',             value: 'v2.4.1',                 editable: false },
  { key: 'Default Currency',    value: 'USD',                    editable: true },
  { key: 'Primary Market',      value: 'Liberia, Africa',        editable: true },
  { key: 'Support Email',       value: 'support@smartzconnect.com', editable: true },
  { key: 'Business Email',      value: 'business@smartzconnect.com', editable: true },
  { key: 'WhatsApp',            value: '+231 776 679 963',        editable: true },
  { key: 'Max Free Swipes/Day', value: '10',                     editable: true },
  { key: 'Premium Price',       value: '$9.99/mo',               editable: true },
  { key: 'VIP Price',           value: '$24.99/mo',              editable: true },
]

export default function AdminCEO() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* CEO Header */}
      <div className="dark:bg-gradient-to-r dark:from-amber-500/10 dark:to-yellow-500/5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl border dark:border-amber-500/20 border-amber-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-xl shadow-amber-500/30">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl dark:text-white text-gray-900">CEO Panel</h1>
            <p className="text-sm dark:text-amber-400 text-amber-600 font-semibold">Highest permission level · Full platform control</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {['Manage Admins', 'Override Permissions', 'Edit Subscriptions', 'Platform Config', 'Full Analytics', 'Audit Logs'].map(p => (
            <span key={p} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full dark:bg-amber-500/15 bg-amber-100 dark:text-amber-400 text-amber-700 text-xs font-semibold border dark:border-amber-500/25 border-amber-200">
              <Key className="w-3 h-3" /> {p}
            </span>
          ))}
        </div>
      </div>

      {/* CEO Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ceoStats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-4">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-lg`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <p className="font-display font-black text-2xl dark:text-white text-gray-900">{s.value}</p>
              <p className="text-[11px] dark:text-gray-400 text-gray-500 mt-0.5">{s.label}</p>
              <span className="text-[10px] text-emerald-500 font-semibold">{s.change}</span>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Admin oversight */}
        <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm dark:text-white text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-pink" /> Admin Team Overview
            </h3>
            <button className="text-xs text-brand-pink hover:underline">Manage Admins</button>
          </div>
          <div className="space-y-3">
            {adminTeam.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 p-3 rounded-xl dark:bg-white/4 bg-gray-50">
                <div className="w-9 h-9 rounded-full dark:bg-white/8 bg-gray-100 flex items-center justify-center text-xl">{a.avatar}</div>
                <div className="flex-1">
                  <p className="text-xs font-bold dark:text-white text-gray-900">{a.name}</p>
                  <p className="text-[10px] dark:text-gray-400 text-gray-500">{a.role} · {a.actions} actions this month</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <button className="text-[10px] text-brand-pink hover:underline">Override</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Platform config */}
        <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm dark:text-white text-gray-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-brand-pink" /> Platform Configuration
            </h3>
            <button className="text-xs text-brand-pink hover:underline">Edit All</button>
          </div>
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {platformConfig.map((c, i) => (
              <div key={c.key} className="flex items-center justify-between py-2 border-b dark:border-white/4 border-gray-50">
                <span className="text-[11px] dark:text-gray-400 text-gray-500">{c.key}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold dark:text-white text-gray-900">{c.value}</span>
                  {c.editable && <button className="text-[9px] text-brand-pink hover:underline">Edit</button>}
                  {!c.editable && <Lock className="w-2.5 h-2.5 dark:text-gray-600 text-gray-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CEO-only actions */}
      <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
        <h3 className="font-bold text-sm dark:text-white text-gray-900 mb-4 flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-400" /> CEO-Only Actions
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: Users,        label: 'Manage All Admins',      desc: 'Add, remove, or modify admin accounts',          color: 'from-pink-500 to-rose-600' },
            { icon: DollarSign,   label: 'Edit Subscription Plans', desc: 'Change pricing, features, and limits',           color: 'from-purple-500 to-violet-600' },
            { icon: BarChart3,    label: 'Full Revenue Report',     desc: 'View complete financial analytics',              color: 'from-amber-500 to-yellow-600' },
            { icon: Globe,        label: 'Region Management',       desc: 'Enable/disable features by country',             color: 'from-fuchsia-500 to-pink-600' },
            { icon: AlertTriangle,label: 'Emergency Shutdown',      desc: 'Temporarily disable platform features',          color: 'from-red-500 to-rose-600' },
            { icon: Key,          label: 'API Key Management',      desc: 'Manage Supabase, Cloudinary, OneSignal keys',    color: 'from-indigo-500 to-blue-600' },
          ].map((action, i) => {
            const Icon = action.icon
            return (
              <motion.button key={action.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-2xl dark:bg-white/4 bg-gray-50 border dark:border-white/6 border-gray-200 hover:border-brand-pink/40 hover:dark:bg-white/6 transition-all text-left group">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold dark:text-white text-gray-900">{action.label}</p>
                  <p className="text-[10px] dark:text-gray-400 text-gray-500 mt-0.5 leading-snug">{action.desc}</p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
