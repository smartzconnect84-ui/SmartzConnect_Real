import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, CreditCard, Flag, BarChart3, Megaphone,
  ShoppingBag, Tv, Car, FileText, Shield, Settings, ChevronLeft,
  ChevronRight, Bell, Search, Moon, Sun, LogOut, Crown, Megaphone as Ad,
  Users2, ScrollText, Menu, X, Heart, Map
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',      path: '/admin',                  end: true },
  { icon: Users,           label: 'Users',           path: '/admin/users' },
  { icon: CreditCard,      label: 'Subscriptions',   path: '/admin/subscriptions' },
  { icon: Flag,            label: 'Reports',         path: '/admin/reports' },
  { icon: BarChart3,       label: 'Analytics',       path: '/admin/analytics' },
  { icon: Megaphone,       label: 'Broadcasts',      path: '/admin/broadcasts' },
  { icon: ShoppingBag,     label: 'Marketplace',     path: '/admin/marketplace' },
  { icon: Tv,              label: 'SmartzTV',        path: '/admin/smartztv' },
  { icon: Car,             label: 'Rides',           path: '/admin/rides' },
  { icon: FileText,        label: 'Content',         path: '/admin/content' },
  { icon: Shield,          label: 'Safety',          path: '/admin/safety' },
  { icon: Ad,              label: 'Advertisements',  path: '/admin/ads' },
  { icon: Settings,        label: 'Settings',        path: '/admin/settings' },
  { icon: Users2,          label: 'Team',            path: '/admin/team' },
  { icon: ScrollText,      label: 'Audit Logs',      path: '/admin/audit' },
  { icon: Map,             label: 'Page Tour',        path: '/admin/tour' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b dark:border-white/6 border-gray-200 flex-shrink-0 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-love-gradient flex items-center justify-center shadow-lg shadow-pink-500/25 flex-shrink-0">
          <Heart className="w-5 h-5 text-white" fill="white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-display font-bold text-sm dark:text-white text-gray-900 leading-none">SmartzConnect</p>
            <p className="text-[10px] dark:text-gray-500 text-gray-400 mt-0.5">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                  isActive
                    ? 'bg-love-gradient text-white shadow-lg shadow-pink-500/20'
                    : 'dark:text-gray-400 text-gray-600 hover:dark:bg-white/5 hover:bg-pink-50 hover:text-brand-pink'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                  {!collapsed && (
                    <span className="text-xs font-semibold truncate">{item.label}</span>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 rounded-lg dark:bg-gray-800 bg-white border dark:border-white/10 border-gray-200 text-xs font-semibold dark:text-white text-gray-900 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* CEO Panel link */}
      <div className="px-2 pb-2">
        <NavLink
          to="/admin/ceo"
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              isActive
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                : 'dark:bg-amber-500/10 bg-amber-50 dark:text-amber-400 text-amber-600 hover:dark:bg-amber-500/20 hover:bg-amber-100'
            } ${collapsed ? 'justify-center' : ''}`
          }
        >
          <Crown className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-xs font-bold">CEO Panel</span>}
        </NavLink>
      </div>

      {/* Bottom actions */}
      <div className={`px-2 pb-4 border-t dark:border-white/6 border-gray-200 pt-3 space-y-1 flex-shrink-0`}>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl dark:text-gray-400 text-gray-600 hover:dark:bg-white/5 hover:bg-pink-50 hover:text-brand-pink transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
          {!collapsed && <span className="text-xs font-semibold">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button
          onClick={() => navigate('/')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl dark:text-gray-400 text-gray-600 hover:dark:bg-white/5 hover:bg-pink-50 hover:text-brand-pink transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-xs font-semibold">Exit Admin</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen dark:bg-[#0D0A14] bg-gray-50 overflow-hidden">

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col dark:bg-[#080510] bg-white border-r dark:border-white/6 border-gray-200 flex-shrink-0 relative z-20"
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-16 w-6 h-6 rounded-full dark:bg-[#130E1E] bg-white border dark:border-white/10 border-gray-200 flex items-center justify-center shadow-md hover:border-brand-pink transition-colors z-30"
        >
          {collapsed
            ? <ChevronRight className="w-3 h-3 dark:text-gray-400 text-gray-600" />
            : <ChevronLeft className="w-3 h-3 dark:text-gray-400 text-gray-600" />
          }
        </button>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />
            <motion.aside
              initial={{ x: -220 }} animate={{ x: 0 }} exit={{ x: -220 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-[220px] dark:bg-[#080510] bg-white border-r dark:border-white/6 border-gray-200 z-40 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 dark:bg-[#080510] bg-white border-b dark:border-white/6 border-gray-200 flex-shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden w-8 h-8 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center">
              <Menu className="w-4 h-4 dark:text-gray-400 text-gray-600" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 dark:text-gray-500 text-gray-400" />
              <input
                placeholder="Search users, orders, reports..."
                className="pl-9 pr-4 py-2 rounded-xl dark:bg-white/5 bg-gray-100 border dark:border-white/8 border-gray-200 text-xs dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:bg-pink-500/10 transition-colors">
              <Bell className="w-4 h-4 dark:text-gray-400 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-pink" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l dark:border-white/8 border-gray-200">
              <div className="w-8 h-8 rounded-xl bg-love-gradient flex items-center justify-center text-sm">👑</div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold dark:text-white text-gray-900 leading-none">Super Admin</p>
                <p className="text-[10px] dark:text-gray-500 text-gray-400">admin@smartzconnect.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
