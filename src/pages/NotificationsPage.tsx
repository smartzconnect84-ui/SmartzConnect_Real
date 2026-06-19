import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Heart, MessageCircle, Users, Star, Zap, Crown, Check, Trash2, Filter } from 'lucide-react'

interface Notification {
  id: string; type: 'match' | 'like' | 'message' | 'group' | 'system' | 'promo' | 'spin'
  title: string; body: string; time: string; read: boolean; emoji: string; action?: string
}

const allNotifications: Notification[] = [
  { id: '1',  type: 'match',   title: 'New Match! 💕',              body: 'Amara Koroma liked you back! You have a new match.',                    time: '2m ago',   read: false, emoji: '👩🏾', action: '/app/matches' },
  { id: '2',  type: 'message', title: 'New message from Fatima',    body: '"Are you free this weekend? Maybe we can video call? 😊"',              time: '8m ago',   read: false, emoji: '👩🏽', action: '/app/chat/2' },
  { id: '3',  type: 'like',    title: '3 people liked your profile', body: 'Grace K., Nadia M., and 1 other liked your profile today.',            time: '15m ago',  read: false, emoji: '❤️' },
  { id: '4',  type: 'spin',    title: 'Spin match waiting!',         body: 'Someone is waiting to chat with you from your last Spin & Chat.',      time: '30m ago',  read: false, emoji: '⚡', action: '/app/spin' },
  { id: '5',  type: 'group',   title: 'Liberia Connect is active',   body: '312 members are online in Liberia Connect right now.',                  time: '1h ago',   read: true,  emoji: '🇱🇷', action: '/app/groups' },
  { id: '6',  type: 'system',  title: 'Profile verified ✓',          body: 'Your profile has been verified. You now have a blue checkmark!',       time: '2h ago',   read: true,  emoji: '✅' },
  { id: '7',  type: 'promo',   title: 'Upgrade to VIP 👑',           body: 'Get 20% off VIP this week only. Unlimited swipes + verified badge.',   time: '3h ago',   read: true,  emoji: '👑', action: '/app/subscriptions' },
  { id: '8',  type: 'match',   title: 'New Match! 💕',              body: 'Blessing Osei liked you back! Start a conversation.',                   time: '5h ago',   read: true,  emoji: '👩🏾', action: '/app/matches' },
  { id: '9',  type: 'message', title: 'Voice note from Mariama',     body: 'Mariama Bah sent you a voice note. Tap to listen.',                    time: '6h ago',   read: true,  emoji: '🎤', action: '/app/chat/6' },
  { id: '10', type: 'group',   title: 'Africa Dating Tips',          body: 'New pinned message: "Communication is key in any relationship…"',      time: '8h ago',   read: true,  emoji: '💕', action: '/app/groups' },
  { id: '11', type: 'system',  title: 'SmartzConnect Summit 2026',   body: 'Registration is now open for the Africa Summit in Monrovia, August 15.', time: '1d ago', read: true,  emoji: '🌍' },
  { id: '12', type: 'like',    title: 'Super Like received! ⭐',     body: 'Someone sent you a Super Like. Upgrade to see who it was.',             time: '1d ago',   read: true,  emoji: '⭐', action: '/app/subscriptions' },
]

const tabs = [
  { key: 'all',     label: 'All',      icon: Bell },
  { key: 'match',   label: 'Matches',  icon: Heart },
  { key: 'message', label: 'Messages', icon: MessageCircle },
  { key: 'group',   label: 'Groups',   icon: Users },
  { key: 'system',  label: 'System',   icon: Zap },
]

const typeConfig: Record<string, { color: string; bg: string }> = {
  match:   { color: 'text-pink-500',    bg: 'bg-pink-500/10' },
  like:    { color: 'text-rose-500',    bg: 'bg-rose-500/10' },
  message: { color: 'text-purple-500',  bg: 'bg-purple-500/10' },
  group:   { color: 'text-blue-500',    bg: 'bg-blue-500/10' },
  system:  { color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  promo:   { color: 'text-amber-500',   bg: 'bg-amber-500/10' },
  spin:    { color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10' },
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [activeTab, setActiveTab] = useState('all')

  const unreadCount = notifications.filter(n => !n.read).length
  const filtered = notifications.filter(n => activeTab === 'all' || n.type === activeTab)

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const deleteNotif = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id))

  return (
    <div className="h-full flex flex-col dark:bg-[#0A0710] bg-gray-50">

      {/* Header */}
      <div className="px-4 pt-5 pb-3 dark:bg-[#0D0A14] bg-white border-b dark:border-white/6 border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display font-black text-xl dark:text-white text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-brand-pink" /> Notifications
              {unreadCount > 0 && (
                <span className="text-xs bg-brand-pink text-white rounded-full px-2 py-0.5 font-black">{unreadCount}</span>
              )}
            </h1>
            <p className="text-xs dark:text-gray-400 text-gray-500">{unreadCount} unread · {notifications.length} total</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={markAllRead}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl dark:bg-white/5 bg-gray-100 text-xs font-semibold dark:text-gray-400 text-gray-600 hover:text-brand-pink transition-colors">
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
            <button className="w-9 h-9 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors">
              <Filter className="w-4 h-4 dark:text-gray-400 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(tab => {
            const count = tab.key === 'all' ? unreadCount : notifications.filter(n => n.type === tab.key && !n.read).length
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === tab.key ? 'bg-love-gradient text-white shadow-sm' : 'dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
                {count > 0 && <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-brand-pink text-white'}`}>{count}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center px-6">
              <Bell className="w-10 h-10 dark:text-gray-700 text-gray-300 mb-3" />
              <p className="text-sm dark:text-gray-400 text-gray-500">No notifications here</p>
            </div>
          ) : filtered.map((notif, i) => {
            const cfg = typeConfig[notif.type] ?? typeConfig.system
            return (
              <motion.div key={notif.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-start gap-3 px-4 py-4 border-b dark:border-white/4 border-gray-50 hover:dark:bg-white/3 hover:bg-pink-50/30 transition-all cursor-pointer group ${!notif.read ? 'dark:bg-white/2 bg-pink-50/20' : ''}`}
                onClick={() => markRead(notif.id)}>

                {/* Unread dot */}
                {!notif.read && <div className="w-2 h-2 rounded-full bg-brand-pink flex-shrink-0 mt-2" />}
                {notif.read && <div className="w-2 h-2 flex-shrink-0" />}

                {/* Icon */}
                <div className={`w-11 h-11 rounded-2xl ${cfg.bg} flex items-center justify-center text-xl flex-shrink-0`}>
                  {notif.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold mb-0.5 ${!notif.read ? 'dark:text-white text-gray-900' : 'dark:text-gray-300 text-gray-700'}`}>
                    {notif.title}
                  </p>
                  <p className="text-xs dark:text-gray-400 text-gray-500 leading-relaxed">{notif.body}</p>
                  <p className="text-[10px] dark:text-gray-600 text-gray-400 mt-1">{notif.time}</p>
                </div>

                {/* Delete */}
                <button onClick={e => { e.stopPropagation(); deleteNotif(notif.id) }}
                  className="w-7 h-7 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400 flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5 dark:text-gray-500 text-gray-400" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
