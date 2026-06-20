import { useState, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Zap, RefreshCw, Heart, X, MessageCircle, Shield, Globe, MapPin, Sparkles, Send, Smile } from 'lucide-react'

const profiles = [
  { name: 'Amara K.',   age: 24, emoji: '👩🏾', country: 'Sierra Leone', flag: '🇸🇱', interests: ['Music', 'Travel', 'Food'],    bio: 'Love exploring new cultures and meeting amazing people! 🌍', online: true  },
  { name: 'Fatima D.',  age: 26, emoji: '👩🏽', country: 'Senegal',      flag: '🇸🇳', interests: ['Art', 'Dance', 'Fashion'],    bio: 'Artist by day, dancer by night 💃 Looking for genuine connections', online: true  },
  { name: 'Grace K.',   age: 22, emoji: '👩🏿', country: 'Liberia',      flag: '🇱🇷', interests: ['Movies', 'Cooking', 'Books'], bio: 'Foodie and movie buff 🎬 Let\'s talk about everything!', online: false },
  { name: 'Nadia M.',   age: 28, emoji: '👩🏾', country: 'Ghana',        flag: '🇬🇭', interests: ['Music', 'Fitness', 'Tech'],   bio: 'Tech girl who loves Afrobeats 🎵 Always up for a good chat', online: true  },
  { name: 'Aisha T.',   age: 23, emoji: '👩🏽', country: 'Guinea',       flag: '🇬🇳', interests: ['Travel', 'Books', 'Nature'],  bio: 'Wanderlust soul 🌿 Reading books and exploring the world', online: true  },
]

const segments = ['💕', '🔥', '⭐', '💎', '🎯', '✨', '🌟', '💫', '🎪', '🎭', '🎨', '🎵']
const SEGMENT_COUNT = segments.length
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT

type Phase = 'idle' | 'spinning' | 'matched' | 'chatting' | 'skipped'

export default function SpinChatPage() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [currentProfile, setCurrentProfile] = useState<typeof profiles[0] | null>(null)
  const [rotation, setRotation] = useState(0)
  const [spinCount, setSpinCount] = useState(0)
  const [messages, setMessages] = useState<{ text: string; mine: boolean; time: string }[]>([])
  const [input, setInput] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const controls = useAnimation()

  const spin = async () => {
    setPhase('spinning')
    const spins = 5 + Math.random() * 5
    const extraDeg = Math.random() * 360
    const totalDeg = rotation + spins * 360 + extraDeg
    setRotation(totalDeg)
    await controls.start({ rotate: totalDeg, transition: { duration: 3 + Math.random() * 2, ease: [0.17, 0.67, 0.12, 0.99] } })
    const profile = profiles[Math.floor(Math.random() * profiles.length)]
    setCurrentProfile(profile)
    setSpinCount(c => c + 1)
    setMessages([{ text: `Hey! We just matched on Spin & Chat 🎉 How are you?`, mine: false, time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) }])
    setPhase('matched')
  }

  const sendMsg = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { text: input, mine: true, time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) }])
    setInput('')
    setTimeout(() => {
      const replies = ["That's so interesting! Tell me more 😊", "Haha yes! I totally agree 😂", "Where are you from? 🌍", "You seem really cool! 💕", "I love that! We have so much in common 🔥"]
      setMessages(prev => [...prev, { text: replies[Math.floor(Math.random() * replies.length)], mine: false, time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) }])
    }, 1500)
  }

  const reset = () => { setPhase('idle'); setCurrentProfile(null); setMessages([]) }

  return (
    <div className="h-full flex flex-col dark:bg-[#0A0710] bg-gray-50 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 dark:bg-[#0D0A14] bg-white border-b dark:border-white/6 border-gray-100 flex-shrink-0">
        <div>
          <h1 className="font-display font-black text-xl dark:text-white text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-fuchsia-500" /> Spin & Chat
          </h1>
          <p className="text-xs dark:text-gray-400 text-gray-500">Spin the wheel, meet someone new instantly</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs dark:text-gray-400 text-gray-500 bg-fuchsia-500/10 text-fuchsia-500 px-2.5 py-1 rounded-full font-semibold">{spinCount} spins</span>
          <button onClick={() => setAnonymous(a => !a)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border ${anonymous ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-600 dark:border-white/8 border-gray-200'}`}>
            👤 {anonymous ? 'Anonymous ON' : 'Go Anonymous'}
          </button>
          <div className="flex items-center gap-1 text-xs dark:text-gray-400 text-gray-500">
            <Shield className="w-3.5 h-3.5 text-emerald-500" /> Safe
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* ── IDLE / SPIN phase ── */}
          {(phase === 'idle' || phase === 'spinning') && (
            <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-full py-8 px-4">

              {/* Wheel */}
              <div className="relative mb-8">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-10">
                  <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-brand-pink drop-shadow-lg" />
                </div>

                <motion.div animate={controls} className="w-56 h-56 sm:w-72 sm:h-72 rounded-full relative overflow-hidden shadow-2xl shadow-fuchsia-500/20 border-4 border-fuchsia-500/30">
                  {segments.map((seg, i) => (
                    <div key={i} className="absolute inset-0 flex items-center justify-center"
                      style={{ transform: `rotate(${i * SEGMENT_ANGLE}deg)`, clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.tan(Math.PI / SEGMENT_COUNT)}% 0%)` }}>
                      <div className={`absolute inset-0 ${i % 2 === 0 ? 'bg-gradient-to-br from-fuchsia-600 to-pink-600' : 'bg-gradient-to-br from-purple-700 to-fuchsia-700'}`} />
                      <span className="absolute text-xl" style={{ top: '15%', left: '50%', transform: `translateX(-50%) rotate(${SEGMENT_ANGLE / 2}deg)` }}>{seg}</span>
                    </div>
                  ))}
                  {/* Center hub */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#0A0710] border-4 border-fuchsia-500/50 flex items-center justify-center shadow-xl z-10">
                      <Sparkles className="w-6 h-6 text-fuchsia-400" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Stats row */}
              <div className="flex gap-6 mb-8 text-center">
                {[{ label: 'Online Now', value: '12,847', icon: '🟢' }, { label: 'Countries', value: '47', icon: '🌍' }, { label: 'Matches Today', value: '3,291', icon: '💕' }].map(s => (
                  <div key={s.label}>
                    <p className="text-lg font-black dark:text-white text-gray-900">{s.icon} {s.value}</p>
                    <p className="text-[10px] dark:text-gray-500 text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex gap-2 mb-6 flex-wrap justify-center">
                {[{ icon: Globe, label: 'Worldwide' }, { icon: MapPin, label: 'Nearby' }, { icon: Heart, label: 'Dating' }, { icon: MessageCircle, label: 'Friendship' }].map(({ icon: Icon, label }) => (
                  <button key={label} className="flex items-center gap-1.5 px-3 py-2 rounded-xl dark:bg-white/5 bg-white border dark:border-white/8 border-gray-200 text-xs font-semibold dark:text-gray-300 text-gray-700 hover:border-fuchsia-500/40 hover:text-fuchsia-500 transition-all">
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                ))}
              </div>

              <motion.button onClick={spin} disabled={phase === 'spinning'}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-black text-lg shadow-2xl shadow-fuchsia-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
                {phase === 'spinning' ? (
                  <><RefreshCw className="w-5 h-5 animate-spin" /> Finding someone…</>
                ) : (
                  <><Zap className="w-5 h-5" /> Spin & Match!</>
                )}
              </motion.button>
              <p className="text-xs dark:text-gray-500 text-gray-400 mt-3">Double-tap to skip · All chats are monitored for safety</p>
            </motion.div>
          )}

          {/* ── MATCHED phase ── */}
          {phase === 'matched' && currentProfile && (
            <motion.div key="matched" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-full py-8 px-4">

              {/* Match reveal */}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-center mb-6">
                <div className="text-6xl mb-3">🎉</div>
                <h2 className="font-display font-black text-2xl dark:text-white text-gray-900 mb-1">You matched!</h2>
                <p className="text-sm dark:text-gray-400 text-gray-500">Start chatting before the connection expires</p>
              </motion.div>

              {/* Profile card */}
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="dark:bg-[#130E1E] bg-white rounded-3xl p-6 border dark:border-white/8 border-gray-100 shadow-2xl shadow-fuchsia-500/10 w-full max-w-sm mb-6 text-center">
                <div className="w-20 h-20 rounded-full dark:bg-white/8 bg-pink-50 flex items-center justify-center text-5xl mx-auto mb-3">{currentProfile.emoji}</div>
                <h3 className="font-display font-black text-xl dark:text-white text-gray-900">{currentProfile.name}, {currentProfile.age}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-500 mb-1">{currentProfile.flag} {currentProfile.country}</p>
                <p className="text-sm dark:text-gray-300 text-gray-700 mb-4 leading-relaxed">{currentProfile.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentProfile.interests.map(i => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-500 font-semibold">{i}</span>
                  ))}
                </div>
              </motion.div>

              {/* Actions */}
              <div className="flex gap-3 w-full max-w-sm">
                <button onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-700 font-bold hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" /> Skip
                </button>
                <button onClick={() => setPhase('chatting')}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-bold shadow-lg shadow-fuchsia-500/25">
                  <MessageCircle className="w-4 h-4" /> Start Chat
                </button>
              </div>
            </motion.div>
          )}

          {/* ── CHATTING phase ── */}
          {phase === 'chatting' && currentProfile && (
            <motion.div key="chatting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3 dark:bg-[#0D0A14] bg-white border-b dark:border-white/6 border-gray-100 flex-shrink-0">
                <div className="w-10 h-10 rounded-full dark:bg-white/8 bg-pink-50 flex items-center justify-center text-xl">
                  {anonymous ? '🎭' : currentProfile.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm dark:text-white text-gray-900">
                    {anonymous ? 'Anonymous User' : currentProfile.name}
                    {anonymous && <span className="ml-2 text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded-full">ANON</span>}
                  </p>
                  <p className="text-xs text-emerald-500">🟢 Online · Spin match</p>
                </div>
                <button onClick={reset} className="flex items-center gap-1.5 px-3 py-2 rounded-xl dark:bg-white/5 bg-gray-100 text-xs font-semibold dark:text-gray-400 text-gray-600 hover:text-brand-pink transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" /> New Spin
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.mine ? 'bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white rounded-br-sm' : 'dark:bg-[#1E1530] bg-white dark:text-gray-100 text-gray-900 border dark:border-white/6 border-gray-100 rounded-bl-sm'}`}>
                      {msg.text}
                      <div className={`text-[10px] mt-1 opacity-60 ${msg.mine ? 'text-right' : 'text-left'}`}>{msg.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-3 py-3 dark:bg-[#0D0A14] bg-white border-t dark:border-white/6 border-gray-100 flex-shrink-0">
                <button className="w-9 h-9 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Smile className="w-4 h-4 dark:text-gray-400 text-gray-600" />
                </button>
                <input value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), sendMsg())}
                  placeholder="Say something nice…"
                  className="flex-1 px-4 py-2.5 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-200 dark:text-white text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-fuchsia-500 transition-colors" />
                <button onClick={sendMsg} className="w-10 h-10 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-md flex-shrink-0">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
