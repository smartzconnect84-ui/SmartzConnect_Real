import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Users, DollarSign, Car, AlertTriangle, TrendingUp, TrendingDown,
  Heart, ShoppingBag, Tv, UserCheck, Clock, Eye, ArrowRight, RefreshCw
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// 12-month series (index 0 = Jan)
const revenueData  = [28400, 34200, 41800, 52300, 61900, 58700, 72400, 84291, 79800, 91200, 88400, 96700]
const usersData    = [180000,210000,248000,290000,340000,388000,430000,480000,520000,570000,610000,660000]
const ridesData    = [420, 580, 710, 890, 1020, 980, 1140, 1247, 1190, 1380, 1290, 1450]

const stats = [
  { label: 'Total Users',       value: '2,418,392', change: '+12.4%', up: true,  icon: Users,         gradient: 'from-pink-500 to-rose-600',     bg: 'dark:bg-pink-500/10 bg-pink-50',      border: 'dark:border-pink-500/20 border-pink-200' },
  { label: 'Revenue (MTD)',     value: '$84,291',   change: '+8.7%',  up: true,  icon: DollarSign,    gradient: 'from-purple-500 to-violet-600',  bg: 'dark:bg-purple-500/10 bg-purple-50',  border: 'dark:border-purple-500/20 border-purple-200' },
  { label: 'Active Rides',      value: '1,247',     change: '+23.1%', up: true,  icon: Car,           gradient: 'from-fuchsia-500 to-pink-600',   bg: 'dark:bg-fuchsia-500/10 bg-fuchsia-50',border: 'dark:border-fuchsia-500/20 border-fuchsia-200' },
  { label: 'Open Reports',      value: '34',        change: '-5.2%',  up: false, icon: AlertTriangle, gradient: 'from-amber-500 to-orange-600',   bg: 'dark:bg-amber-500/10 bg-amber-50',    border: 'dark:border-amber-500/20 border-amber-200' },
  { label: 'New Matches',       value: '18,492',    change: '+31.2%', up: true,  icon: Heart,         gradient: 'from-rose-500 to-pink-600',      bg: 'dark:bg-rose-500/10 bg-rose-50',      border: 'dark:border-rose-500/20 border-rose-200' },
  { label: 'Marketplace Sales', value: '$12,840',   change: '+15.6%', up: true,  icon: ShoppingBag,   gradient: 'from-violet-500 to-purple-600',  bg: 'dark:bg-violet-500/10 bg-violet-50',  border: 'dark:border-violet-500/20 border-violet-200' },
  { label: 'Live Streams',      value: '284',       change: '+44.8%', up: true,  icon: Tv,            gradient: 'from-indigo-500 to-blue-600',    bg: 'dark:bg-indigo-500/10 bg-indigo-50',  border: 'dark:border-indigo-500/20 border-indigo-200' },
  { label: 'Verified Users',    value: '891,204',   change: '+9.3%',  up: true,  icon: UserCheck,     gradient: 'from-emerald-500 to-teal-600',   bg: 'dark:bg-emerald-500/10 bg-emerald-50',border: 'dark:border-emerald-500/20 border-emerald-200' },
]

const recentUsers = [
  { name: 'Amara Koroma',    email: 'amara@example.com',  country: '🇱🇷', plan: 'Premium', status: 'active',    joined: '2h ago',  avatar: '👩🏾' },
  { name: 'Kofi Asante',     email: 'kofi@example.com',   country: '🇬🇭', plan: 'VIP',     status: 'active',    joined: '5h ago',  avatar: '👨🏿' },
  { name: 'Fatima Diallo',   email: 'fatima@example.com', country: '🇸🇳', plan: 'Free',    status: 'active',    joined: '1d ago',  avatar: '👩🏽' },
  { name: 'Emmanuel Mensah', email: 'emm@example.com',    country: '🇳🇬', plan: 'Premium', status: 'suspended', joined: '2d ago',  avatar: '👨🏾' },
  { name: 'Zainab Osei',     email: 'zainab@example.com', country: '🇰🇪', plan: 'Free',    status: 'active',    joined: '3d ago',  avatar: '👩🏾' },
  { name: 'David Kamara',    email: 'david@example.com',  country: '🇱🇷', plan: 'VIP',     status: 'active',    joined: '4d ago',  avatar: '👨🏽' },
]

const recentActivity = [
  { icon: '🚨', text: 'New report filed against user @john_doe',          time: '5m ago',  color: 'bg-red-500' },
  { icon: '💳', text: 'VIP subscription payment approved — Amara K.',     time: '12m ago', color: 'bg-emerald-500' },
  { icon: '🚗', text: 'New driver application — Emmanuel M. (Monrovia)',  time: '28m ago', color: 'bg-blue-500' },
  { icon: '🛍️', text: 'Marketplace listing pending review — iPhone 14',   time: '45m ago', color: 'bg-violet-500' },
  { icon: '📺', text: 'New live stream started — Kofi A. (1.2K viewers)', time: '1h ago',  color: 'bg-pink-500' },
  { icon: '⚠️', text: 'Suspicious login detected — user @zara_m',         time: '2h ago',  color: 'bg-amber-500' },
  { icon: '💕', text: '500 new matches created in the last hour',          time: '2h ago',  color: 'bg-rose-500' },
  { icon: '📢', text: 'Broadcast sent to 2.4M users — system update',     time: '3h ago',  color: 'bg-indigo-500' },
]

const topCountries = [
  { flag: '🇱🇷', name: 'Liberia',       users: 284920, pct: 100 },
  { flag: '🇬🇭', name: 'Ghana',         users: 198400, pct: 70  },
  { flag: '🇳🇬', name: 'Nigeria',       users: 176200, pct: 62  },
  { flag: '🇸🇳', name: 'Senegal',       users: 142800, pct: 50  },
  { flag: '🇰🇪', name: 'Kenya',         users: 118600, pct: 42  },
  { flag: '🇨🇮', name: "Côte d'Ivoire", users: 94200,  pct: 33  },
]

const statusColors: Record<string, string> = {
  active:    'bg-emerald-500/15 text-emerald-500 border-emerald-500/25',
  suspended: 'bg-amber-500/15 text-amber-500 border-amber-500/25',
  banned:    'bg-red-500/15 text-red-500 border-red-500/25',
}
const planColors: Record<string, string> = {
  Free:    'dark:bg-white/8 bg-gray-100 dark:text-gray-400 text-gray-600',
  Premium: 'bg-pink-500/15 text-brand-pink',
  VIP:     'bg-amber-500/15 text-amber-500',
}

// ─── SVG Line Chart ───────────────────────────────────────────────────────────

interface LineChartProps {
  data: number[]
  labels: string[]
  color: string
  gradientId: string
  gradientFrom: string
  gradientTo: string
  formatY: (v: number) => string
  height?: number
}

function LineChart({ data, labels, color, gradientId, gradientFrom, gradientTo, formatY, height = 160 }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number; label: string } | null>(null)
  const [animated, setAnimated] = useState(false)
  const [pathLength, setPathLength] = useState(0)
  const pathRef = useRef<SVGPathElement>(null)

  const W = 600
  const H = height
  const PAD = { top: 16, right: 16, bottom: 28, left: 52 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const minV = Math.min(...data) * 0.9
  const maxV = Math.max(...data) * 1.05

  const xScale = (i: number) => PAD.left + (i / (data.length - 1)) * chartW
  const yScale = (v: number) => PAD.top + chartH - ((v - minV) / (maxV - minV)) * chartH

  // Build smooth cubic bezier path
  const points = data.map((v, i) => ({ x: xScale(i), y: yScale(v) }))
  const linePath = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x},${pt.y}`
    const prev = points[i - 1]
    const cpx = (prev.x + pt.x) / 2
    return `${acc} C ${cpx},${prev.y} ${cpx},${pt.y} ${pt.x},${pt.y}`
  }, '')
  const areaPath = `${linePath} L ${points[points.length - 1].x},${PAD.top + chartH} L ${points[0].x},${PAD.top + chartH} Z`

  // Y-axis ticks
  const yTicks = 4
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => minV + ((maxV - minV) * i) / yTicks)

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative w-full" style={{ height }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full h-full"
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.35" />
            <stop offset="100%" stopColor={gradientTo} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yTickValues.map((v, i) => (
          <g key={i}>
            <line
              x1={PAD.left} y1={yScale(v)}
              x2={W - PAD.right} y2={yScale(v)}
              stroke="currentColor" strokeOpacity="0.06" strokeWidth="1"
              className="dark:text-white text-gray-900"
            />
            <text
              x={PAD.left - 6} y={yScale(v) + 4}
              textAnchor="end" fontSize="9"
              fill="currentColor" fillOpacity="0.4"
              className="dark:text-white text-gray-900"
            >
              {formatY(v)}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {labels.map((l, i) => (
          <text
            key={l}
            x={xScale(i)} y={H - 6}
            textAnchor="middle" fontSize="9"
            fill="currentColor" fillOpacity="0.4"
            className="dark:text-white text-gray-900"
          >
            {l}
          </text>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* Line */}
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength || 9999,
            strokeDashoffset: animated ? 0 : (pathLength || 9999),
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        />

        {/* Dots + hover targets */}
        {points.map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r="4" fill={color} stroke="white" strokeWidth="2" opacity={animated ? 1 : 0}
              style={{ transition: `opacity 0.3s ${0.8 + i * 0.05}s` }} />
            <rect
              x={pt.x - 20} y={PAD.top} width={40} height={chartH}
              fill="transparent"
              onMouseEnter={() => setTooltip({ x: pt.x, y: pt.y, value: data[i], label: labels[i] })}
            />
          </g>
        ))}

        {/* Tooltip */}
        {tooltip && (() => {
          const tx = Math.min(Math.max(tooltip.x, 60), W - 60)
          return (
            <g>
              <line x1={tooltip.x} y1={PAD.top} x2={tooltip.x} y2={PAD.top + chartH}
                stroke={color} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 3" />
              <rect x={tx - 44} y={tooltip.y - 32} width={88} height={26} rx="6"
                fill="currentColor" fillOpacity="0.9" className="dark:text-[#1a1030] text-white" />
              <text x={tx} y={tooltip.y - 15} textAnchor="middle" fontSize="10" fontWeight="700"
                fill="currentColor" className="dark:text-white text-[#1a1030]">
                {formatY(tooltip.value)}
              </text>
              <text x={tx} y={tooltip.y - 5} textAnchor="middle" fontSize="8"
                fill="currentColor" fillOpacity="0.6" className="dark:text-white text-[#1a1030]">
                {tooltip.label}
              </text>
            </g>
          )
        })()}
      </svg>
    </div>
  )
}

// ─── Mini Sparkline ───────────────────────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const W = 80, H = 32
  const min = Math.min(...data), max = Math.max(...data)
  const xs = (i: number) => (i / (data.length - 1)) * W
  const ys = (v: number) => H - 4 - ((v - min) / (max - min + 1)) * (H - 8)
  const d = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)},${ys(v)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-20 h-8">
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Chart Card ───────────────────────────────────────────────────────────────

interface ChartCardProps {
  title: string
  subtitle: string
  value: string
  change: string
  up: boolean
  data: number[]
  labels: string[]
  color: string
  gradientId: string
  gradientFrom: string
  gradientTo: string
  formatY: (v: number) => string
}

function ChartCard({ title, subtitle, value, change, up, data, labels, color, gradientId, gradientFrom, gradientTo, formatY }: ChartCardProps) {
  const [range, setRange] = useState<'3m' | '6m' | '12m'>('12m')
  const sliced = range === '3m' ? data.slice(-3) : range === '6m' ? data.slice(-6) : data
  const slicedLabels = range === '3m' ? labels.slice(-3) : range === '6m' ? labels.slice(-6) : labels

  return (
    <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-bold dark:text-gray-400 text-gray-500 uppercase tracking-wide">{subtitle}</p>
          <p className="font-display font-black text-2xl dark:text-white text-gray-900 mt-0.5">{value}</p>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold mt-1 ${up ? 'text-emerald-500' : 'text-red-500'}`}>
            {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change} vs last period
          </span>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl dark:bg-white/5 bg-gray-100">
          {(['3m', '6m', '12m'] as const).map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${range === r ? 'bg-love-gradient text-white shadow-sm' : 'dark:text-gray-400 text-gray-500 hover:text-brand-pink'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>
      <LineChart
        data={sliced}
        labels={slicedLabels}
        color={color}
        gradientId={gradientId}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        formatY={formatY}
        height={160}
      />
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setLastUpdated(new Date())
      setRefreshing(false)
    }, 800)
  }

  const timeAgo = () => {
    const diff = Math.floor((Date.now() - lastUpdated.getTime()) / 1000)
    if (diff < 10) return 'just now'
    if (diff < 60) return `${diff}s ago`
    return `${Math.floor(diff / 60)}m ago`
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-2xl dark:text-white text-gray-900">Dashboard</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-0.5">
            Welcome back, Super Admin 👋 Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleRefresh}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-white/5 bg-gray-100 border dark:border-white/8 border-gray-200 text-xs dark:text-gray-400 text-gray-500 hover:text-brand-pink transition-all ${refreshing ? 'opacity-60' : ''}`}>
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl dark:bg-white/5 bg-gray-100 border dark:border-white/8 border-gray-200">
            <Clock className="w-3.5 h-3.5 dark:text-gray-400 text-gray-500" />
            <span className="text-xs dark:text-gray-400 text-gray-500">Updated {timeAgo()}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon
          const sparkData = Array.from({ length: 8 }, (_, j) => Math.random() * 40 + 60)
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`rounded-2xl p-4 border ${s.bg} ${s.border}`}>
              <div className="flex items-start justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <Sparkline data={sparkData} color={s.up ? '#10b981' : '#ef4444'} />
              </div>
              <p className="font-display font-black text-xl dark:text-white text-gray-900">{s.value}</p>
              <p className="text-[11px] dark:text-gray-400 text-gray-500 mt-0.5">{s.label}</p>
              <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold mt-1 ${s.up ? 'text-emerald-500' : 'text-red-500'}`}>
                {s.up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                {s.change}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* ── Live Charts ── */}
      <div className="grid xl:grid-cols-3 gap-4">
        <ChartCard
          title="Revenue"
          subtitle="Monthly Revenue"
          value="$84,291"
          change="+8.7%"
          up={true}
          data={revenueData}
          labels={MONTHS}
          color="#ec4899"
          gradientId="grad-revenue"
          gradientFrom="#ec4899"
          gradientTo="#ec4899"
          formatY={v => `$${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`}
        />
        <ChartCard
          title="Users"
          subtitle="Total Users"
          value="2,418,392"
          change="+12.4%"
          up={true}
          data={usersData}
          labels={MONTHS}
          color="#a855f7"
          gradientId="grad-users"
          gradientFrom="#a855f7"
          gradientTo="#a855f7"
          formatY={v => v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : v >= 1000 ? (v / 1000).toFixed(0) + 'k' : String(v)}
        />
        <ChartCard
          title="Rides"
          subtitle="Active Rides"
          value="1,247"
          change="+23.1%"
          up={true}
          data={ridesData}
          labels={MONTHS}
          color="#f97316"
          gradientId="grad-rides"
          gradientFrom="#f97316"
          gradientTo="#f97316"
          formatY={v => v >= 1000 ? (v / 1000).toFixed(1) + 'k' : String(Math.round(v))}
        />
      </div>

      {/* ── Combined multi-line chart ── */}
      <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm dark:text-white text-gray-900">Platform Overview</h3>
            <p className="text-xs dark:text-gray-400 text-gray-500">Revenue · Users · Rides — normalised to 0–100 scale</p>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-pink-500 inline-block" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-purple-500 inline-block" /> Users</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-orange-500 inline-block" /> Rides</span>
          </div>
        </div>
        {/* Normalise each series to 0-100 */}
        {(() => {
          const norm = (arr: number[]) => { const mn = Math.min(...arr), mx = Math.max(...arr); return arr.map(v => ((v - mn) / (mx - mn)) * 100) }
          const W = 600, H = 180
          const PAD = { top: 12, right: 16, bottom: 28, left: 32 }
          const cW = W - PAD.left - PAD.right
          const cH = H - PAD.top - PAD.bottom
          const xs = (i: number) => PAD.left + (i / 11) * cW
          const ys = (v: number) => PAD.top + cH - (v / 100) * cH
          const makePath = (arr: number[]) => norm(arr).map((v, i) => {
            const pt = { x: xs(i), y: ys(v) }
            if (i === 0) return `M ${pt.x},${pt.y}`
            const prev = { x: xs(i - 1), y: ys(norm(arr)[i - 1]) }
            const cpx = (prev.x + pt.x) / 2
            return `C ${cpx},${prev.y} ${cpx},${pt.y} ${pt.x},${pt.y}`
          }).join(' ')

          return (
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height: 180 }}>
              {/* Grid */}
              {[0, 25, 50, 75, 100].map(v => (
                <line key={v} x1={PAD.left} y1={ys(v)} x2={W - PAD.right} y2={ys(v)}
                  stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" className="dark:text-white text-gray-900" />
              ))}
              {/* X labels */}
              {MONTHS.map((m, i) => (
                <text key={m} x={xs(i)} y={H - 6} textAnchor="middle" fontSize="8"
                  fill="currentColor" fillOpacity="0.35" className="dark:text-white text-gray-900">{m}</text>
              ))}
              {/* Lines */}
              <path d={makePath(revenueData)} fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
              <path d={makePath(usersData)}   fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
              <path d={makePath(ridesData)}   fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )
        })()}
      </div>

      {/* ── Users table + Activity + Countries ── */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Recent users */}
        <div className="lg:col-span-2 dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b dark:border-white/6 border-gray-100">
            <h3 className="font-bold text-sm dark:text-white text-gray-900">Recent Users</h3>
            <button className="flex items-center gap-1 text-xs text-brand-pink hover:underline">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-white/5 border-gray-100">
                  {['User', 'Country', 'Plan', 'Status', 'Joined'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-[10px] font-bold dark:text-gray-500 text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u, i) => (
                  <motion.tr key={u.email} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="border-b dark:border-white/4 border-gray-50 hover:dark:bg-white/2 hover:bg-pink-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full dark:bg-white/8 bg-gray-100 flex items-center justify-center text-base">{u.avatar}</div>
                        <div>
                          <p className="text-xs font-semibold dark:text-white text-gray-900">{u.name}</p>
                          <p className="text-[10px] dark:text-gray-500 text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-base">{u.country}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${planColors[u.plan]}`}>{u.plan}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[u.status]}`}>{u.status}</span>
                    </td>
                    <td className="px-4 py-3 text-[11px] dark:text-gray-400 text-gray-500">{u.joined}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity feed */}
        <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm dark:text-white text-gray-900">Live Activity</h3>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
            </span>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2.5">
                <div className={`w-6 h-6 rounded-lg ${a.color} flex items-center justify-center text-xs flex-shrink-0 mt-0.5`}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] dark:text-gray-300 text-gray-700 leading-snug">{a.text}</p>
                  <p className="text-[9px] dark:text-gray-600 text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Top countries */}
      <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm dark:text-white text-gray-900">Top Countries by Users</h3>
          <Eye className="w-4 h-4 dark:text-gray-500 text-gray-400" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topCountries.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-xs font-semibold dark:text-white text-gray-900">{c.name}</span>
                </div>
                <span className="text-[10px] dark:text-gray-400 text-gray-500 font-semibold">{c.users.toLocaleString()}</span>
              </div>
              <div className="h-2 dark:bg-white/5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.pct}%` }}
                  transition={{ delay: i * 0.07 + 0.3, duration: 0.7, ease: 'easeOut' }}
                  className="h-full rounded-full bg-love-gradient"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
