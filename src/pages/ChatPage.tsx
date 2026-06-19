import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Phone, Video, MoreVertical, Send, Smile, Paperclip,
  Mic, Image, Heart, ThumbsUp, Laugh, Check, CheckCheck, Play
} from 'lucide-react'

interface Message {
  id: string; text: string; time: string; mine: boolean
  status: 'sent' | 'delivered' | 'read'; type: 'text' | 'voice' | 'image' | 'emoji'
  reaction?: string; duration?: string
}

const chatData: Record<string, { name: string; emoji: string; online: boolean; flag: string; matchScore: number }> = {
  '1': { name: 'Amara Koroma',  emoji: '👩🏾', online: true,  flag: '🇸🇱', matchScore: 97 },
  '2': { name: 'Fatima Diallo', emoji: '👩🏽', online: true,  flag: '🇸🇳', matchScore: 94 },
  '3': { name: 'Grace Kamara',  emoji: '👩🏿', online: false, flag: '🇱🇷', matchScore: 91 },
}

const initialMessages: Message[] = [
  { id: '1', text: 'Hey! I saw you liked my photo 😊',                    time: '10:02', mine: false, status: 'read',      type: 'text' },
  { id: '2', text: 'Hi! Yes, you have an amazing smile 😍',               time: '10:04', mine: true,  status: 'read',      type: 'text' },
  { id: '3', text: 'Aww thank you! Where are you from?',                  time: '10:05', mine: false, status: 'read',      type: 'text' },
  { id: '4', text: "I'm from Monrovia, Liberia 🇱🇷 You?",                 time: '10:06', mine: true,  status: 'read',      type: 'text' },
  { id: '5', text: 'Sierra Leone! We are neighbours 😄',                  time: '10:07', mine: false, status: 'read',      type: 'text', reaction: '❤️' },
  { id: '6', text: 'That is so cool! I love Freetown',                    time: '10:08', mine: true,  status: 'read',      type: 'text' },
  { id: '7', text: '',                                                     time: '10:10', mine: false, status: 'read',      type: 'voice', duration: '0:12' },
  { id: '8', text: 'Are you free this weekend? Maybe we can video call?', time: '10:15', mine: false, status: 'read',      type: 'text' },
  { id: '9', text: 'Yes! Saturday works for me 🙌',                       time: '10:16', mine: true,  status: 'delivered', type: 'text' },
]

const reactions = ['❤️', '😂', '😮', '😢', '👍', '🔥']

export default function ChatPage() {
  const { id } = useParams<{ id: string }>()
  const person = chatData[id ?? '1'] ?? chatData['1']
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [showReactions, setShowReactions] = useState<string | null>(null)
  const [showEmoji, setShowEmoji] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = () => {
    if (!input.trim()) return
    const msg: Message = { id: Date.now().toString(), text: input, time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }), mine: true, status: 'sent', type: 'text' }
    setMessages(prev => [...prev, msg])
    setInput('')
    setTimeout(() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'delivered' } : m)), 800)
    setTimeout(() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'read' } : m)), 2000)
  }

  const addReaction = (msgId: string, emoji: string) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, reaction: emoji } : m))
    setShowReactions(null)
  }

  const quickEmojis = ['😊', '😍', '🥰', '😂', '🔥', '💕', '👏', '🙌']

  return (
    <div className="h-full flex flex-col dark:bg-[#0A0710] bg-gray-50">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 dark:bg-[#0D0A14] bg-white border-b dark:border-white/6 border-gray-100 flex-shrink-0">
        <Link to="/app/matches" className="w-8 h-8 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors">
          <ArrowLeft className="w-4 h-4 dark:text-gray-400 text-gray-600" />
        </Link>
        <div className="relative">
          <div className="w-10 h-10 rounded-full dark:bg-white/8 bg-pink-50 flex items-center justify-center text-xl">{person.emoji}</div>
          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 dark:border-[#0D0A14] border-white ${person.online ? 'bg-emerald-500' : 'bg-gray-400'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-sm dark:text-white text-gray-900">{person.name}</p>
            <span className="text-xs">{person.flag}</span>
          </div>
          <p className="text-xs dark:text-gray-400 text-gray-500">
            {person.online ? '🟢 Online now' : 'Last seen recently'} · {person.matchScore}% match
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="w-9 h-9 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors">
            <Phone className="w-4 h-4 dark:text-gray-400 text-gray-600" />
          </button>
          <button className="w-9 h-9 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors">
            <Video className="w-4 h-4 dark:text-gray-400 text-gray-600" />
          </button>
          <button className="w-9 h-9 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors">
            <MoreVertical className="w-4 h-4 dark:text-gray-400 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1" onClick={() => { setShowReactions(null); setShowEmoji(false) }}>
        {/* Date divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px dark:bg-white/5 bg-gray-200" />
          <span className="text-[10px] dark:text-gray-500 text-gray-400 font-medium">Today</span>
          <div className="flex-1 h-px dark:bg-white/5 bg-gray-200" />
        </div>

        {messages.map((msg, i) => (
          <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'} group`}>
            <div className="relative max-w-[75%] sm:max-w-[60%]">
              {/* Reaction picker */}
              <AnimatePresence>
                {showReactions === msg.id && (
                  <motion.div initial={{ opacity: 0, scale: 0.8, y: 5 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }}
                    className={`absolute ${msg.mine ? 'right-0' : 'left-0'} -top-10 z-10 flex gap-1 dark:bg-[#1E1530] bg-white rounded-full px-2 py-1.5 shadow-xl border dark:border-white/10 border-gray-200`}>
                    {reactions.map(r => (
                      <button key={r} onClick={e => { e.stopPropagation(); addReaction(msg.id, r) }}
                        className="text-lg hover:scale-125 transition-transform">{r}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: i * 0.02 }}
                onDoubleClick={e => { e.stopPropagation(); setShowReactions(msg.id) }}
                className={`relative px-3.5 py-2.5 rounded-2xl cursor-pointer select-none ${
                  msg.mine
                    ? 'bg-love-gradient text-white rounded-br-sm'
                    : 'dark:bg-[#1E1530] bg-white dark:text-gray-100 text-gray-900 rounded-bl-sm border dark:border-white/6 border-gray-100'
                }`}>

                {msg.type === 'voice' ? (
                  <div className="flex items-center gap-2 min-w-[140px]">
                    <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <div className="flex-1 flex items-center gap-0.5">
                      {Array.from({ length: 20 }).map((_, j) => (
                        <div key={j} className="w-0.5 rounded-full bg-current opacity-60" style={{ height: `${Math.random() * 16 + 4}px` }} />
                      ))}
                    </div>
                    <span className="text-[10px] opacity-70">{msg.duration}</span>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                )}

                {/* Time + status */}
                <div className={`flex items-center gap-1 mt-1 ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-[10px] opacity-60">{msg.time}</span>
                  {msg.mine && (
                    msg.status === 'read' ? <CheckCheck className="w-3 h-3 text-blue-300" /> :
                    msg.status === 'delivered' ? <CheckCheck className="w-3 h-3 opacity-60" /> :
                    <Check className="w-3 h-3 opacity-60" />
                  )}
                </div>
              </motion.div>

              {/* Reaction bubble */}
              {msg.reaction && (
                <div className={`absolute -bottom-2 ${msg.mine ? 'right-2' : 'left-2'} text-sm bg-white dark:bg-[#1E1530] rounded-full px-1.5 py-0.5 shadow-md border dark:border-white/10 border-gray-200`}>
                  {msg.reaction}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick emoji bar */}
      <AnimatePresence>
        {showEmoji && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="flex gap-2 px-4 py-2 dark:bg-[#0D0A14] bg-white border-t dark:border-white/6 border-gray-100 overflow-x-auto">
            {quickEmojis.map(e => (
              <button key={e} onClick={() => setInput(prev => prev + e)} className="text-2xl hover:scale-125 transition-transform flex-shrink-0">{e}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 py-3 dark:bg-[#0D0A14] bg-white border-t dark:border-white/6 border-gray-100 flex-shrink-0">
        <button onClick={() => setShowEmoji(v => !v)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${showEmoji ? 'bg-love-gradient text-white' : 'dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
          <Smile className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors flex-shrink-0">
          <Paperclip className="w-4 h-4 dark:text-gray-400 text-gray-600" />
        </button>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Type a message…"
          className="flex-1 px-4 py-2.5 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-200 dark:text-white text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-brand-pink transition-colors" />
        {input.trim() ? (
          <button onClick={send}
            className="w-10 h-10 rounded-xl bg-love-gradient flex items-center justify-center shadow-md shadow-pink-500/25 hover:opacity-90 transition-opacity flex-shrink-0">
            <Send className="w-4 h-4 text-white" />
          </button>
        ) : (
          <button className="w-10 h-10 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors flex-shrink-0">
            <Mic className="w-4 h-4 dark:text-gray-400 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  )
}
