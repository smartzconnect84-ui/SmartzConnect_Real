import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users2, Plus, Crown, Shield, Eye, Edit, Trash2, Mail, X } from 'lucide-react'

interface TeamMember {
  id: string; name: string; email: string; avatar: string; role: 'super_admin' | 'admin' | 'moderator' | 'support'
  permissions: string[]; status: 'active' | 'inactive'; joined: string; lastActive: string
}

const team: TeamMember[] = [
  { id: 'm1', name: 'Shedrick K. Nungehn', email: 'admin@smartzconnect.com',    avatar: '👨🏾', role: 'super_admin', permissions: ['all'],                                                    status: 'active',   joined: 'Jan 2024', lastActive: '2m ago' },
  { id: 'm2', name: 'Amara Johnson',        email: 'amara.j@smartzconnect.com',  avatar: '👩🏾', role: 'admin',       permissions: ['users', 'reports', 'content', 'marketplace'],             status: 'active',   joined: 'Feb 2024', lastActive: '1h ago' },
  { id: 'm3', name: 'Kofi Mensah',          email: 'kofi.m@smartzconnect.com',   avatar: '👨🏿', role: 'admin',       permissions: ['rides', 'drivers', 'analytics'],                          status: 'active',   joined: 'Mar 2024', lastActive: '3h ago' },
  { id: 'm4', name: 'Fatima Diallo',        email: 'fatima.d@smartzconnect.com', avatar: '👩🏽', role: 'moderator',   permissions: ['reports', 'content', 'safety'],                           status: 'active',   joined: 'Apr 2024', lastActive: '30m ago' },
  { id: 'm5', name: 'Emmanuel Osei',        email: 'emm.o@smartzconnect.com',    avatar: '👨🏾', role: 'moderator',   permissions: ['reports', 'content'],                                     status: 'active',   joined: 'May 2024', lastActive: '2d ago' },
  { id: 'm6', name: 'Zainab Kamara',        email: 'zainab.k@smartzconnect.com', avatar: '👩🏾', role: 'support',     permissions: ['users_view', 'support_tickets'],                          status: 'inactive', joined: 'Jun 2024', lastActive: '1w ago' },
]

const roleConfig = {
  super_admin: { label: 'Super Admin', color: 'bg-amber-500/15 text-amber-500 border-amber-500/25',   icon: Crown },
  admin:       { label: 'Admin',       color: 'bg-pink-500/15 text-brand-pink border-pink-500/25',    icon: Shield },
  moderator:   { label: 'Moderator',   color: 'bg-purple-500/15 text-brand-purple border-purple-500/25', icon: Eye },
  support:     { label: 'Support',     color: 'bg-blue-500/15 text-blue-400 border-blue-500/25',      icon: Mail },
}

export default function AdminTeam() {
  const [members] = useState(team)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'moderator' })

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-2xl dark:text-white text-gray-900">Team Management</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-0.5">Manage admin team members and their permissions</p>
        </div>
        <button onClick={() => setShowInvite(!showInvite)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-love-gradient text-white text-xs font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all">
          <Plus className="w-3.5 h-3.5" /> Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Team',  value: members.length.toString(),                                    color: 'from-pink-500 to-rose-600' },
          { label: 'Admins',      value: members.filter(m => m.role === 'admin' || m.role === 'super_admin').length.toString(), color: 'from-amber-500 to-orange-600' },
          { label: 'Moderators',  value: members.filter(m => m.role === 'moderator').length.toString(), color: 'from-purple-500 to-violet-600' },
          { label: 'Support',     value: members.filter(m => m.role === 'support').length.toString(),   color: 'from-blue-500 to-indigo-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-4">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-lg`}>
              <Users2 className="w-4 h-4 text-white" />
            </div>
            <p className="font-display font-black text-2xl dark:text-white text-gray-900">{s.value}</p>
            <p className="text-[11px] dark:text-gray-400 text-gray-500 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Invite form */}
      <AnimatePresence>
        {showInvite && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm dark:text-white text-gray-900">Invite Team Member</h3>
              <button onClick={() => setShowInvite(false)} className="w-7 h-7 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center">
                <X className="w-3.5 h-3.5 dark:text-gray-400 text-gray-600" />
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold dark:text-gray-300 text-gray-700 mb-1.5 block">Full Name</label>
                <input value={inviteForm.name} onChange={e => setInviteForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Team member name"
                  className="w-full px-3 py-2.5 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-200 text-xs dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold dark:text-gray-300 text-gray-700 mb-1.5 block">Email</label>
                <input value={inviteForm.email} onChange={e => setInviteForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="email@smartzconnect.com"
                  className="w-full px-3 py-2.5 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-200 text-xs dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold dark:text-gray-300 text-gray-700 mb-1.5 block">Role</label>
                <select value={inviteForm.role} onChange={e => setInviteForm(p => ({ ...p, role: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-200 text-xs dark:text-white text-gray-900 focus:outline-none focus:border-brand-pink transition-colors">
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="support">Support</option>
                </select>
              </div>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-love-gradient text-white text-xs font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all">
              <Mail className="w-3.5 h-3.5" /> Send Invitation
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team table */}
      <div className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-white/5 border-gray-100">
                {['Member', 'Role', 'Permissions', 'Status', 'Last Active', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold dark:text-gray-500 text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => {
                const cfg = roleConfig[m.role]
                const RoleIcon = cfg.icon
                return (
                  <motion.tr key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className="border-b dark:border-white/4 border-gray-50 hover:dark:bg-white/2 hover:bg-pink-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full dark:bg-white/8 bg-gray-100 flex items-center justify-center text-lg">{m.avatar}</div>
                        <div>
                          <p className="text-xs font-semibold dark:text-white text-gray-900">{m.name}</p>
                          <p className="text-[10px] dark:text-gray-500 text-gray-400">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border w-fit ${cfg.color}`}>
                        <RoleIcon className="w-2.5 h-2.5" /> {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {m.permissions.slice(0, 3).map(p => (
                          <span key={p} className="px-1.5 py-0.5 rounded dark:bg-white/5 bg-gray-100 text-[9px] dark:text-gray-400 text-gray-600 capitalize">{p}</span>
                        ))}
                        {m.permissions.length > 3 && <span className="text-[9px] dark:text-gray-500 text-gray-400">+{m.permissions.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${m.status === 'active' ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/25' : 'dark:bg-white/8 bg-gray-100 dark:text-gray-400 text-gray-600 dark:border-white/10 border-gray-200'}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] dark:text-gray-400 text-gray-500">{m.lastActive}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="w-7 h-7 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:bg-blue-500/10 transition-colors">
                          <Edit className="w-3.5 h-3.5 dark:text-gray-400 text-gray-600" />
                        </button>
                        {m.role !== 'super_admin' && (
                          <button className="w-7 h-7 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:bg-red-500/10 transition-colors">
                            <Trash2 className="w-3.5 h-3.5 dark:text-gray-400 text-gray-600" />
                          </button>
                        )}
                      </div>
                    </td>
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
