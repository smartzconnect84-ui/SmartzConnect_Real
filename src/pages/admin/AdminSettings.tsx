import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, ToggleLeft, ToggleRight, Globe, Shield, Bell, CreditCard, Smartphone, Save, RefreshCw } from 'lucide-react'

interface Toggle {
  id: string; label: string; description: string; enabled: boolean; category: string
}

const defaultToggles: Toggle[] = [
  { id: 't1',  label: 'User Registration',       description: 'Allow new users to register',                    enabled: true,  category: 'Platform' },
  { id: 't2',  label: 'Email Verification',       description: 'Require email verification on signup',           enabled: true,  category: 'Platform' },
  { id: 't3',  label: 'Social Login',             description: 'Allow Google/Facebook login',                    enabled: true,  category: 'Platform' },
  { id: 't4',  label: 'Discover / Matching',      description: 'Enable the Tinder-style swipe feature',          enabled: true,  category: 'Features' },
  { id: 't5',  label: 'Spin & Chat',              description: 'Enable random matching feature',                 enabled: true,  category: 'Features' },
  { id: 't6',  label: 'SmartzTV Live Streaming',  description: 'Allow users to go live',                         enabled: true,  category: 'Features' },
  { id: 't7',  label: 'Marketplace',              description: 'Enable product listings and sales',              enabled: true,  category: 'Features' },
  { id: 't8',  label: 'SmartzRide',               description: 'Enable ride-hailing service',                    enabled: true,  category: 'Features' },
  { id: 't9',  label: 'MTN MoMo Payments',        description: 'Accept MTN Mobile Money payments',               enabled: true,  category: 'Payments' },
  { id: 't10', label: 'Orange Money Payments',    description: 'Accept Orange Money payments',                   enabled: true,  category: 'Payments' },
  { id: 't11', label: 'Stripe Payments',          description: 'Accept international card payments',             enabled: false, category: 'Payments' },
  { id: 't12', label: 'Push Notifications',       description: 'Send push notifications via OneSignal',          enabled: true,  category: 'Notifications' },
  { id: 't13', label: 'Email Notifications',      description: 'Send email notifications to users',              enabled: true,  category: 'Notifications' },
  { id: 't14', label: 'Maintenance Mode',         description: 'Put platform in maintenance mode',               enabled: false, category: 'Platform' },
  { id: 't15', label: 'Profile Verification',     description: 'Allow users to request verification badge',      enabled: true,  category: 'Safety' },
  { id: 't16', label: 'Content Moderation AI',    description: 'Auto-flag inappropriate content with AI',        enabled: true,  category: 'Safety' },
]

const categories = ['All', 'Platform', 'Features', 'Payments', 'Notifications', 'Safety']
const categoryIcons: Record<string, React.ElementType> = {
  Platform: Globe, Features: Smartphone, Payments: CreditCard, Notifications: Bell, Safety: Shield
}

export default function AdminSettings() {
  const [toggles, setToggles] = useState(defaultToggles)
  const [activeCategory, setActiveCategory] = useState('All')
  const [saved, setSaved] = useState(false)

  const toggle = (id: string) => setToggles(prev => prev.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const filtered = toggles.filter(t => activeCategory === 'All' || t.category === activeCategory)

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-2xl dark:text-white text-gray-900">Platform Settings</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-0.5">Configure features, toggles, and platform behavior</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-lg transition-all ${saved ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-love-gradient text-white shadow-pink-500/20 hover:opacity-90'}`}>
          {saved ? <><RefreshCw className="w-3.5 h-3.5" /> Saved!</> : <><Save className="w-3.5 h-3.5" /> Save Changes</>}
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-love-gradient text-white' : 'dark:bg-[#130E1E] bg-white border dark:border-white/8 border-gray-200 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Toggles by category */}
      {(activeCategory === 'All' ? categories.slice(1) : [activeCategory]).map(cat => {
        const catToggles = filtered.filter(t => t.category === cat)
        if (catToggles.length === 0) return null
        const CatIcon = categoryIcons[cat] || Settings
        return (
          <div key={cat} className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b dark:border-white/5 border-gray-100">
              <CatIcon className="w-4 h-4 text-brand-pink" />
              <h3 className="font-bold text-sm dark:text-white text-gray-900">{cat}</h3>
            </div>
            <div className="divide-y dark:divide-white/4 divide-gray-50">
              {catToggles.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between px-5 py-4 hover:dark:bg-white/2 hover:bg-pink-50/30 transition-colors">
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-semibold dark:text-white text-gray-900">{t.label}</p>
                    <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">{t.description}</p>
                  </div>
                  <button onClick={() => toggle(t.id)} className="flex-shrink-0">
                    {t.enabled
                      ? <ToggleRight className="w-8 h-8 text-brand-pink" />
                      : <ToggleLeft className="w-8 h-8 dark:text-gray-600 text-gray-400" />
                    }
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
