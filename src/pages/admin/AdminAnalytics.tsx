import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3, Users, DollarSign, TrendingUp, Heart, MessageCircle,
  Tv, ShoppingBag, Car, Zap, Globe, RefreshCw, Download
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// Retention cohort data — rows = cohort month, cols = months retained (0–5)
const retentionCohorts = [
  { cohort: 'Jan', size: 18400, rates: [100, 72, 58, 49, 43, 39] },
  { cohort: 'Feb', size: 21200, rates: [100, 74, 61, 52, 46, 41] },
  { cohort: 'Mar', size: 24800, rates: [100, 76, 63, 54, 48, null] },
  { cohort: 'Apr', size: 29000, rates: [100, 78, 65, 56, null, null] },
  { cohort: 'May', size: 34000, rates: [100, 79, 66, null, null, null] },
  { cohort: 'Jun', size: 38800, rates: [100, 81, null, null, null, null] },
  { cohort: 'Jul', size: 43000, rates: [100, null, null, null, null, null] },
]

const retentionColor = (v: number | null) => {
  if (v === null) return 'dark:bg-white/3 bg-gray-100 dark:text-gray-700 text-gray-300'
  if (v >= 80) return 'bg-emerald-500/80 text-white'
  if (v >= 65) return 'bg-emerald-500/50 text-white'
  if (v >= 50) return 'bg-amber-500/60 text-white'
  if (v >= 35) return 'bg-orange-500/50 text-white'
  return 'bg-red-500/40 text-white'
}

// Geography data
const geoData = [
  { flag: '🇱🇷', country: 'Liberia',        users: 284920, revenue: '$28,400', growth: '+18%', pct: 100, color: '#ec4899' },
  { flag: '🇬🇭', country: 'Ghana',           users: 198400, revenue: '$19,840', growth: '+14%', pct: 70,  color: '#a855f7' },
  { flag: '🇳🇬', country: 'Nigeria',         users: 176200, revenue: '$17,620', growth: '+22%', pct: 62,  color: '#f97316' },
  { flag: '🇸🇳', country: 'Senegal',         users: 142800, revenue: '$14,280', growth: '+11%', pct: 50,  color: '#06b6d4' },
  { flag: '🇰🇪', country: 'Kenya',           users: 118600, revenue: '$11,860', growth: '+16%', pct: 42,  color: '#10b981' },
  { flag: '🇨🇮', country: "Côte d'Ivoire",   users: 94200,  revenue: '$9,420',  growth: '+9%',  pct: 33,  color: '#f59e0b' },
  { flag: '🇸🇱', country: 'Sierra Leone',    users: 72400,  revenue: '$7,240',  growth: '+31%', pct: 25,  color: '#8b5cf6' },
  { flag: '🇨🇲', country: 'Cameroon',        users: 58200,  revenue: '$5,820',  growth: '+27%', pct: 20,  color: '#ec4899' },
  { flag: '🇿🇦', country: 'South Africa',    users: 44800,  revenue: '$4,480',  growth: '+8%',  pct: 16,  color: '#14b8a6' },
  { flag: '🌍', country: 'Rest of World',    users: 228072, revenue: '$22,807', growth: '+19%', pct: 80,  color: '#6366f1' },
]

// Feature usage
const featureUsage = [
  { icon: Heart,         label: 'Discover / Match', dau: '1.84M', wau: '2.1M', pct: 76, color: 'bg-pink-500',    trend: '+4.2%' },
  { icon: MessageCircle, label: 'Private Chat',      dau: '1.62M', wau: '1.9M', pct: 67, color: 'bg-purple-500', trend: '+2.8%' },
  { icon: Users,         label: 'Social Feed',       dau: '1.45M', wau: '1.8M', pct: 60, color: 'bg-fuchsia-500',trend: '+5.1%' },
  { icon: Tv,            label: 'SmartzTV',          dau: '892K',  wau: '1.1M', pct: 37, color: 'bg-violet-500', trend: '+12.4%' },
  { icon: ShoppingBag,   label: 'Marketplace',       dau: '724K',  wau: '980K', pct: 30, color: 'bg-amber-500',  trend: '+8.7%' },
  { icon: Car,           label: 'SmartzRide',        dau: '482K',  wau: '620K', pct: 20, color: 'bg-emerald-500',trend: '+23.1%' },
  { icon: Zap,           label: 'Spin & Chat',       dau: '384K',  wau: '510K', pct: 16, color: 'bg-rose-500',   trend: '+6.3%' },
  { icon: MessageCircle, label: 'Group Chat',        dau: '312K',  wau: '440K', pct: 13, color: 'bg-indigo-500', trend: '+3.9%' },
]

// Revenue breakdown
const revenueBreakdown = [
  { source: 'VIP Subscriptions',    amount: '$42,145', pct: 50, color: 'bg-amber-500' },
  { source: 'Premium Subscriptions',amount: '$25,287', pct: 30, color: 'bg-pink-500' },
  { source: 'Marketplace Fees',     amount: '$8,429',  pct: 10, color: 'bg-purple-500' },
  { source: 'SmartzTV Gifts',       amount: '$5,058',  pct: 6,  color: 'bg-violet-500' },
  { source: 'Advertisements',       amount: '$3,372',  pct: 4,  color: 'bg-fuchsia-500' },
]

// User growth 12-month
const growthData = [180,210,248,290,340,388,430,480,520,570,610,660].map(v => v * 1000)
const revenueData = [28400,34200,41800,52300,61900,58700,72400,84291,79800,91200,88400,96700]

// ─── SVG Line Chart (reused from Dashboard) ──────────────────────────────────
function MiniLineChart({ data, color, height = 80 }: { data: number[]; color: string; height?: number }) {
  const W = 400, H = height
  const PAD = { top: 8, right: 8, bottom: 8, left: 8 }
  const cW = W - PAD.left - PAD.right
  const cH = H - PAD.top - PAD.bottom
  const min = Math.min(...data) * 0.95
  const max = Math.max(...data) * 1.02
  const xs = (i: number) => PAD.left + (i / (data.length - 1)) * cW
  const ys = (v: number) => PAD.top + cH - ((v - min) / (max - min)) * cH
  const pts = data.map((v, i) => ({ x: xs(i), y: ys(v) }))
  const line = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x},${pt.y}`
    const prev = pts[i - 1]
    const cpx = (prev.x + pt.x) / 2
    return `${acc} C ${cpx},${prev.y} ${cpx},${pt.y} ${pt.x},${pt.y}`
  }, '')
  const area = `${line} L ${pts[pts.length-1].x},${H} L ${pts[0].x},${H} Z`
  const gid = `g-${color.replace('#','')}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Donut Chart ─────────────────────────────────────────────────────────────
function DonutChart({ data }: { data: { pct: number; color: string; source: string }[] }) {
  const R = 60, cx = 80, cy = 80, stroke = 22
  let cumulative = 0
  const circumference = 2 * Math.PI * R
  const segments = data.map(d => {
    const offset = circumference * (1 - cumulative / 100)
    const dash = circumference * (d.pct / 100)
    cumulative += d.pct
    return { ...d, offset, dash }
  })
  return (
    <svg viewBox="0 0 160 160" className="w-36 h-36 sm:w-40 sm:h-40 -rotate-90">
      {segments.map((s, i) => (
        <circle key={i} cx={cx} cy={cy} r={R}
          fill="none" stroke={s.color.replace('bg-', '').includes('-') ? undefined : s.color}
          strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${circumference - s.dash}`}
          strokeDashoffset={s.offset}
          style={{ stroke: s.color === 'bg-amber-500' ? '#f59e0b' : s.color === 'bg-pink-500' ? '#ec4899' : s.color === 'bg-purple-500' ? '#a855f7' : s.color === 'bg-violet-500' ? '#8b5cf6' : '#e879f9' }}
        />
      ))}
    </svg>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminAnalytics() {
  const [geoSort, setGeoSort] = useState<'users' | 'revenue' | 'growth'>('users')
  const [refreshing, setRefreshing] = useState(false)

  const sortedGeo = [...geoData].sort((a, b) => {
    if (geoSort === 'revenue') return parseFloat(b.revenue.replace(/[$,]/g,'')) - parseFloat(a.revenue.replace(/[$,]/g,''))
    if (geoSort === 'growth') return parseInt(b.growth) - parseInt(a.growth)
    return b.users - a.users
  })

  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-black text-2xl dark:text-white text-gray-900">Analytics</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-0.5">Deep platform insights — retention, geography, feature usage</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 800) }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-white/5 bg-gray-100 border dark:border-white/8 border-gray-200 text-xs dark:text-gray-400 text-gray-500 hover:text-brand-pink transition-all ${refreshing ? 'opacity-60' : ''}`}>
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-love-gradient text-white text-xs font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Monthly Active Users', value: '2.42M',  change: '+12.4%', icon: Users,      color: 'from-pink-500 to-rose-600' },
          { label: 'Monthly Revenue',      value: '$84.3K', change: '+8.7%',  icon: DollarSign, color: 'from-purple-500 to-violet-600' },
          { label: 'Avg Session Length',   value: '18.4m',  change: '+2.1m',  icon: BarChart3,  color: 'from-fuchsia-500 to-pink-600' },
          { label: 'D30 Retention',        value: '43%',    change: '+4pp',   icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
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
              <span className="text-[10px] text-emerald-500 font-bold">{s.change}</span>
            </motion.div>
          )
        })}
      </div>

      {/* ── Growth Charts ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        {[
          { title: 'User Growth', subtitle: '12-month total users', value: '2.42M', change: '+12.4%', data: growthData, color: '#ec4899' },
          { title: 'Revenue Growth', subtitle: '12-month monthly revenue', value: '$84.3K', change: '+8.7%', data: revenueData, color: '#a855f7' },
        ].map(chart => (
          <div key={chart.title} className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-bold text-sm dark:text-white text-gray-900">{chart.title}</h3>
                <p className="text-xs dark:text-gray-400 text-gray-500">{chart.subtitle}</p>
              </div>
              <div className="text-right">
                <p className="font-display font-black text-xl dark:text-white text-gray-900">{chart.value}</p>
                <span className="text-[10px] text-emerald-500 font-bold">{chart.change}</span>
              </div>
            </div>
            <MiniLineChart data={chart.data} color={chart.color} height={100} />
            <div className="flex justify-between mt-1">
              {MONTHS.map(m => <span key={m} className="text-[8px] dark:text-gray-600 text-gray-400">{m}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* ── Retention Cohort Heatmap ── */}
      <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
        <div className="mb-4">
          <h3 className="font-bold text-sm dark:text-white text-gray-900">User Retention Cohort Analysis</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">% of users still active after N months — darker green = better retention</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr>
                <th className="text-left text-[10px] font-bold dark:text-gray-500 text-gray-400 uppercase tracking-wide pb-3 pr-4 w-20">Cohort</th>
                <th className="text-left text-[10px] font-bold dark:text-gray-500 text-gray-400 uppercase tracking-wide pb-3 pr-4 w-20">Size</th>
                {['Month 0','Month 1','Month 2','Month 3','Month 4','Month 5'].map(h => (
                  <th key={h} className="text-center text-[10px] font-bold dark:text-gray-500 text-gray-400 uppercase tracking-wide pb-3 px-1">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-1">
              {retentionCohorts.map((row, ri) => (
                <tr key={row.cohort}>
                  <td className="pr-4 py-1.5">
                    <span className="text-xs font-bold dark:text-white text-gray-900">{row.cohort} '24</span>
                  </td>
                  <td className="pr-4 py-1.5">
                    <span className="text-[11px] dark:text-gray-400 text-gray-500">{(row.size / 1000).toFixed(1)}K</span>
                  </td>
                  {row.rates.map((rate, ci) => (
                    <td key={ci} className="px-1 py-1.5">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: ri * 0.05 + ci * 0.03 }}
                        className={`rounded-lg px-2 py-1.5 text-center text-[11px] font-bold ${retentionColor(rate)}`}
                      >
                        {rate !== null ? `${rate}%` : '—'}
                      </motion.div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t dark:border-white/5 border-gray-100">
          <span className="text-[10px] dark:text-gray-500 text-gray-400 font-semibold">Retention scale:</span>
          {[
            { label: '≥80%', color: 'bg-emerald-500/80' },
            { label: '65–79%', color: 'bg-emerald-500/50' },
            { label: '50–64%', color: 'bg-amber-500/60' },
            { label: '35–49%', color: 'bg-orange-500/50' },
            { label: '<35%', color: 'bg-red-500/40' },
          ].map(l => (
            <span key={l.label} className="flex items-center gap-1.5 text-[10px] dark:text-gray-400 text-gray-500">
              <span className={`w-3 h-3 rounded ${l.color}`} /> {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Feature Usage ── */}
      <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
        <div className="mb-5">
          <h3 className="font-bold text-sm dark:text-white text-gray-900">Feature Usage Breakdown</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">Daily & weekly active users per feature</p>
        </div>
        <div className="space-y-4">
          {featureUsage.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={f.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-xl ${f.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold dark:text-white text-gray-900">{f.label}</span>
                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="dark:text-gray-400 text-gray-500">DAU: <span className="font-bold dark:text-white text-gray-900">{f.dau}</span></span>
                      <span className="dark:text-gray-400 text-gray-500">WAU: <span className="font-bold dark:text-white text-gray-900">{f.wau}</span></span>
                      <span className="text-emerald-500 font-bold">{f.trend}</span>
                    </div>
                  </div>
                  <div className="h-2 dark:bg-white/5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${f.pct}%` }}
                      transition={{ delay: i * 0.06 + 0.2, duration: 0.7, ease: 'easeOut' }}
                      className={`h-full rounded-full ${f.color}`}
                    />
                  </div>
                  <span className="text-[10px] dark:text-gray-500 text-gray-400">{f.pct}% of MAU</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Revenue Breakdown + Geography ── */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* Revenue donut */}
        <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
          <h3 className="font-bold text-sm dark:text-white text-gray-900 mb-1">Revenue Breakdown</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mb-5">By source — MTD $84,291</p>
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <DonutChart data={revenueBreakdown} />
            </div>
            <div className="flex-1 space-y-3">
              {revenueBreakdown.map((r, i) => (
                <motion.div key={r.source} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
                      <span className="text-xs dark:text-gray-300 text-gray-700">{r.source}</span>
                    </div>
                    <span className="text-xs font-bold dark:text-white text-gray-900">{r.amount}</span>
                  </div>
                  <div className="h-1.5 dark:bg-white/5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${r.pct}%` }}
                      transition={{ delay: i * 0.08 + 0.2, duration: 0.6 }}
                      className={`h-full rounded-full ${r.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Geography */}
        <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm dark:text-white text-gray-900">Geographic Distribution</h3>
              <p className="text-xs dark:text-gray-400 text-gray-500">Users & revenue by country</p>
            </div>
            <div className="flex gap-1">
              {(['users','revenue','growth'] as const).map(s => (
                <button key={s} onClick={() => setGeoSort(s)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${geoSort === s ? 'bg-love-gradient text-white' : 'dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            {sortedGeo.map((c, i) => (
              <motion.div key={c.country} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3">
                <span className="text-xl flex-shrink-0">{c.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold dark:text-white text-gray-900 truncate">{c.country}</span>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-[10px] dark:text-gray-400 text-gray-500">{c.users.toLocaleString()}</span>
                      <span className="text-[10px] text-emerald-500 font-bold">{c.growth}</span>
                    </div>
                  </div>
                  <div className="h-1.5 dark:bg-white/5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.pct}%` }}
                      transition={{ delay: i * 0.04 + 0.2, duration: 0.5 }}
                      className="h-full rounded-full"
                      style={{ background: c.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Engagement Heatmap (hour × day) ── */}
      <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
        <div className="mb-4">
          <h3 className="font-bold text-sm dark:text-white text-gray-900">Engagement Heatmap</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">Active users by hour of day × day of week (UTC+0)</p>
        </div>
        {(() => {
          const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
          const hours = Array.from({ length: 24 }, (_, i) => i)
          // Simulate realistic engagement — peaks at 8am, 12pm, 7-10pm
          const heat = (d: number, h: number) => {
            const base = d >= 5 ? 0.7 : 1.0 // weekends slightly lower
            const timeScore = h < 6 ? 0.1 : h < 9 ? 0.5 : h < 12 ? 0.8 : h < 14 ? 0.9 : h < 17 ? 0.6 : h < 22 ? 1.0 : 0.3
            return Math.min(1, base * timeScore * (0.7 + Math.random() * 0.3))
          }
          const heatColor = (v: number) => {
            if (v > 0.85) return 'bg-pink-500'
            if (v > 0.65) return 'bg-pink-400/80'
            if (v > 0.45) return 'bg-pink-300/60'
            if (v > 0.25) return 'bg-pink-200/40'
            return 'dark:bg-white/5 bg-gray-100'
          }
          return (
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="flex gap-1 mb-1 ml-10">
                  {hours.map(h => (
                    <div key={h} className="flex-1 text-center text-[8px] dark:text-gray-600 text-gray-400">
                      {h % 4 === 0 ? `${h}h` : ''}
                    </div>
                  ))}
                </div>
                {days.map((day, di) => (
                  <div key={day} className="flex items-center gap-1 mb-1">
                    <span className="w-9 text-[10px] dark:text-gray-500 text-gray-400 text-right pr-1 flex-shrink-0">{day}</span>
                    {hours.map(h => {
                      const v = heat(di, h)
                      return (
                        <div key={h} title={`${day} ${h}:00 — ${Math.round(v * 100)}% activity`}
                          className={`flex-1 h-5 rounded-sm ${heatColor(v)} transition-colors cursor-pointer hover:opacity-80`} />
                      )
                    })}
                  </div>
                ))}
                <div className="flex items-center gap-3 mt-3 ml-10">
                  <span className="text-[10px] dark:text-gray-500 text-gray-400">Low</span>
                  {['dark:bg-white/5 bg-gray-100','bg-pink-200/40','bg-pink-300/60','bg-pink-400/80','bg-pink-500'].map((c, i) => (
                    <span key={i} className={`w-4 h-4 rounded-sm ${c}`} />
                  ))}
                  <span className="text-[10px] dark:text-gray-500 text-gray-400">High</span>
                </div>
              </div>
            </div>
          )
        })()}
      </div>

      {/* ── Platform Health ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'API Uptime',        value: '99.8%',  sub: 'Last 30 days',    color: 'text-emerald-500', bar: 99.8 },
          { label: 'Avg Response Time', value: '142ms',  sub: 'P95 latency',     color: 'text-blue-400',    bar: 85 },
          { label: 'Error Rate',        value: '0.02%',  sub: 'Last 24 hours',   color: 'text-emerald-500', bar: 2 },
          { label: 'CDN Cache Hit',     value: '94.2%',  sub: 'Cloudflare',      color: 'text-purple-400',  bar: 94.2 },
        ].map((h, i) => (
          <motion.div key={h.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-4">
            <p className="text-xs dark:text-gray-400 text-gray-500 mb-1">{h.label}</p>
            <p className={`font-display font-black text-2xl ${h.color} mb-0.5`}>{h.value}</p>
            <p className="text-[10px] dark:text-gray-500 text-gray-400 mb-3">{h.sub}</p>
            <div className="h-1.5 dark:bg-white/5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${h.bar}%` }}
                transition={{ delay: i * 0.05 + 0.3, duration: 0.7 }}
                className={`h-full rounded-full ${h.color === 'text-emerald-500' ? 'bg-emerald-500' : h.color === 'text-blue-400' ? 'bg-blue-400' : 'bg-purple-400'}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}
