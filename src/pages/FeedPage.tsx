import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image, Video, Smile, Send, Heart, MessageCircle, Share2, MoreHorizontal, Plus, X, Bookmark, TrendingUp, UserPlus } from 'lucide-react'

const stories = [
  { name: 'Your Story', emoji: '➕', isAdd: true, seen: false },
  { name: 'Amara', emoji: '👩🏾', active: true, seen: false, bg: 'from-pink-500 to-rose-500' },
  { name: 'Kofi', emoji: '🎵', active: true, seen: false, bg: 'from-purple-500 to-violet-500' },
  { name: 'Fatima', emoji: '👩🏾‍💼', active: false, seen: true, bg: 'from-amber-500 to-orange-500' },
  { name: 'Aisha', emoji: '👩🏾‍🎓', active: true, seen: false, bg: 'from-emerald-500 to-teal-500' },
  { name: 'Emmanuel', emoji: '👨🏿', active: true, seen: false, bg: 'from-blue-500 to-indigo-500' },
  { name: 'Grace', emoji: '💃', active: false, seen: true, bg: 'from-fuchsia-500 to-pink-500' },
]

const initialPosts = [
  {
    id: 1, author: 'Amara Kollie', handle: '@amara_k', emoji: '👩🏾', location: 'Monrovia, Liberia', time: '2 min ago',
    content: 'Just launched my new fashion collection! 🎉 So excited to share this with the SmartzConnect community. Check out the marketplace! 🛍️',
    image: null, likes: 142, comments: 28, shares: 12, liked: false, saved: false,
    reactions: ['❤️', '🔥', '👏'], verified: true, premium: true,
  },
  {
    id: 2, author: 'Emmanuel Mensah', handle: '@emm_dev', emoji: '👨🏿', location: 'Accra, Ghana', time: '15 min ago',
    content: 'Live coding session tonight at 8PM WAT on SmartzTV! We\'re building a full-stack app from scratch. Come learn with me 💻🌍',
    image: null, likes: 89, comments: 15, shares: 34, liked: true, saved: false,
    reactions: ['💻', '🔥', '❤️'], verified: false, premium: false,
  },
  {
    id: 3, author: 'Fatima Diallo', handle: '@fatima_d', emoji: '👩🏾‍💼', location: 'Dakar, Senegal', time: '1 hr ago',
    content: 'Grateful for this amazing community 💕 SmartzConnect has connected me with so many incredible people across Africa. This is what technology should do — bring us together! 🌍',
    image: null, likes: 234, comments: 47, shares: 89, liked: false, saved: true,
    reactions: ['💕', '🌍', '🙏'], verified: true, premium: true,
  },
  {
    id: 4, author: 'Kofi Asante', handle: '@kofi_beats', emoji: '👨🏾‍🎤', location: 'Lagos, Nigeria', time: '3 hrs ago',
    content: 'New beat just dropped! 🎵 Afrobeats x Highlife fusion. Listen on SmartzTV and let me know what you think! 🎶',
    image: null, likes: 567, comments: 93, shares: 156, liked: true, saved: false,
    reactions: ['🎵', '🔥', '❤️'], verified: true, premium: true,
  },
]

const trending = ['#AfricaTech', '#SmartzTV', '#Afrobeats', '#NaijaFashion', '#AccraTech', '#MonroviaVibes']

const suggested = [
  { name: 'Blessing Osei', handle: '@blessing_o', emoji: '👩🏾', mutual: 12, verified: true },
  { name: 'Ibrahim Touré', handle: '@ibrahim_t', emoji: '👨🏽', mutual: 8, verified: false },
  { name: 'Mariama Bah', handle: '@mariama_b', emoji: '👩🏿', mutual: 5, verified: true },
]

// Story viewer modal
function StoryViewer({ story, onClose }: { story: typeof stories[0]; onClose: () => void }) {
  const [progress, setProgress] = useState(0)
  const [reply, setReply] = useState('')

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={onClose}>
      <div className="relative w-full max-w-sm h-full sm:h-[85vh] sm:rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Story background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${story.bg || 'from-pink-500 to-purple-600'} flex items-center justify-center`}>
          <span className="text-8xl">{story.emoji}</span>
        </div>
        {/* Progress bar */}
        <div className="absolute top-3 left-3 right-3 h-1 bg-white/30 rounded-full overflow-hidden">
          <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 5 }} onAnimationComplete={onClose} />
        </div>
        {/* Header */}
        <div className="absolute top-6 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">{story.emoji}</div>
            <div>
              <p className="text-white text-xs font-bold">{story.name}</p>
              <p className="text-white/60 text-[10px]">Just now</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        {/* Reply */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
          <input value={reply} onChange={e => setReply(e.target.value)} placeholder={`Reply to ${story.name}...`}
            className="flex-1 px-4 py-2.5 rounded-full bg-white/15 backdrop-blur-sm text-white placeholder:text-white/50 text-sm focus:outline-none focus:bg-white/25 transition-colors" />
          <button className="w-10 h-10 rounded-full bg-love-gradient flex items-center justify-center flex-shrink-0">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeedPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [activeStory, setActiveStory] = useState<typeof stories[0] | null>(null)
  const [followed, setFollowed] = useState<string[]>([])

  const toggleLike = (id: number) => setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
  const toggleSave = (id: number) => setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p))

  const handlePost = () => {
    if (!newPost.trim()) return
    const post = {
      id: Date.now(), author: 'You', handle: '@you', emoji: '😊', location: 'Your Location', time: 'Just now',
      content: newPost, image: null, likes: 0, comments: 0, shares: 0, liked: false, saved: false,
      reactions: ['❤️'], verified: false, premium: false,
    }
    setPosts(prev => [post, ...prev])
    setNewPost('')
  }

  return (
    <div className="h-full overflow-y-auto dark:bg-[#0D0A14] bg-gray-50">
      {/* Story viewer */}
      <AnimatePresence>
        {activeStory && <StoryViewer story={activeStory} onClose={() => setActiveStory(null)} />}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4">
        <div className="flex gap-5">

          {/* Main feed */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Stories bar */}
            <div className="dark:bg-[#130E1E] bg-white rounded-2xl p-3 sm:p-4 border dark:border-white/6 border-gray-100">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                {stories.map((s, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => !s.isAdd && setActiveStory(s)}
                    className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
                      s.isAdd ? 'bg-love-gradient shadow-lg shadow-pink-500/25' :
                      !s.seen ? `ring-2 ring-brand-pink ring-offset-2 dark:ring-offset-[#130E1E] ring-offset-white bg-gradient-to-br ${s.bg} shadow-md` :
                      'dark:bg-white/5 bg-gray-100 opacity-60'
                    }`}>
                      {s.emoji}
                      {s.active && !s.isAdd && !s.seen && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 dark:border-[#130E1E] border-white" />
                      )}
                    </div>
                    <span className="text-[10px] dark:text-gray-400 text-gray-600 font-medium w-14 text-center truncate">{s.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Post composer */}
            <div className="dark:bg-[#130E1E] bg-white rounded-2xl p-4 border dark:border-white/6 border-gray-100">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-love-gradient flex items-center justify-center text-lg flex-shrink-0">😊</div>
                <textarea value={newPost} onChange={e => setNewPost(e.target.value)}
                  placeholder="What's on your mind? 💕"
                  rows={2}
                  className="flex-1 px-4 py-2.5 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-200 dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors text-sm resize-none" />
              </div>
              <div className="flex items-center justify-between pt-3 border-t dark:border-white/6 border-gray-100">
                <div className="flex gap-1 sm:gap-2">
                  {[
                    { icon: Image, label: 'Photo', color: 'text-pink-400' },
                    { icon: Video, label: 'Video', color: 'text-purple-400' },
                    { icon: Smile, label: 'Feeling', color: 'text-fuchsia-400' },
                  ].map(({ icon: Icon, label, color }) => (
                    <button key={label} className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg dark:bg-white/5 bg-gray-50 text-[10px] sm:text-xs font-medium ${color} hover:opacity-80 transition-opacity`}>
                      <Icon className="w-3.5 h-3.5" /><span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
                <button onClick={handlePost} disabled={!newPost.trim()}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-love-gradient text-white text-xs font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity">
                  <Send className="w-3.5 h-3.5" /><span className="hidden sm:inline">Post</span>
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">

                {/* Post header */}
                <div className="flex items-center justify-between p-4 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full dark:bg-white/8 bg-pink-50 flex items-center justify-center text-xl">{post.emoji}</div>
                      {post.premium && <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[8px]">👑</div>}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold dark:text-white text-gray-900">{post.author}</p>
                        {post.verified && <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-bold">✓</span>}
                      </div>
                      <p className="text-xs dark:text-gray-500 text-gray-400">{post.handle} · {post.location} · {post.time}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-lg dark:bg-white/5 bg-gray-50 flex items-center justify-center hover:bg-pink-500/10 transition-colors">
                    <MoreHorizontal className="w-4 h-4 dark:text-gray-400 text-gray-600" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-4 pb-3">
                  <p className="text-sm dark:text-gray-200 text-gray-800 leading-relaxed">{post.content}</p>
                  <div className="flex gap-1 mt-2">{post.reactions.map(r => <span key={r} className="text-base">{r}</span>)}</div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between px-4 py-2 border-t dark:border-white/5 border-gray-100 text-xs dark:text-gray-500 text-gray-400">
                  <span>{post.likes.toLocaleString()} likes</span>
                  <span>{post.comments} comments · {post.shares} shares</span>
                </div>

                {/* Actions */}
                <div className="flex items-center border-t dark:border-white/5 border-gray-100">
                  <button onClick={() => toggleLike(post.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all hover:dark:bg-white/4 hover:bg-pink-50/50 ${post.liked ? 'text-brand-pink' : 'dark:text-gray-400 text-gray-600'}`}>
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-current text-brand-pink' : ''}`} />
                    <span className="hidden sm:inline">Like</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium dark:text-gray-400 text-gray-600 hover:dark:bg-white/4 hover:bg-pink-50/50 transition-all">
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Comment</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium dark:text-gray-400 text-gray-600 hover:dark:bg-white/4 hover:bg-pink-50/50 transition-all">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  <button onClick={() => toggleSave(post.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all hover:dark:bg-white/4 hover:bg-pink-50/50 ${post.saved ? 'text-brand-pink' : 'dark:text-gray-400 text-gray-600'}`}>
                    <Bookmark className={`w-4 h-4 ${post.saved ? 'fill-current text-brand-pink' : ''}`} />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right sidebar — desktop only */}
          <div className="hidden lg:flex flex-col gap-4 w-72 flex-shrink-0">

            {/* Trending */}
            <div className="dark:bg-[#130E1E] bg-white rounded-2xl p-5 border dark:border-white/6 border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-brand-pink" />
                <h3 className="font-bold text-sm dark:text-white text-gray-900">Trending</h3>
              </div>
              <div className="space-y-2">
                {trending.map((tag, i) => (
                  <button key={tag} className="w-full flex items-center justify-between py-1.5 hover:text-brand-pink transition-colors group">
                    <span className="text-sm font-semibold dark:text-gray-300 text-gray-700 group-hover:text-brand-pink">{tag}</span>
                    <span className="text-[10px] dark:text-gray-500 text-gray-400">#{i + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested people */}
            <div className="dark:bg-[#130E1E] bg-white rounded-2xl p-5 border dark:border-white/6 border-gray-100">
              <h3 className="font-bold text-sm dark:text-white text-gray-900 mb-4">People You May Know</h3>
              <div className="space-y-4">
                {suggested.map(person => (
                  <div key={person.handle} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full dark:bg-white/8 bg-pink-50 flex items-center justify-center text-xl flex-shrink-0">{person.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold dark:text-white text-gray-900 truncate">{person.name}</p>
                        {person.verified && <span className="text-[8px] bg-blue-500 text-white px-1 py-0.5 rounded-full font-bold flex-shrink-0">✓</span>}
                      </div>
                      <p className="text-[10px] dark:text-gray-500 text-gray-400">{person.mutual} mutual friends</p>
                    </div>
                    <button
                      onClick={() => setFollowed(prev => prev.includes(person.handle) ? prev.filter(h => h !== person.handle) : [...prev, person.handle])}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${followed.includes(person.handle) ? 'bg-love-soft text-brand-pink' : 'bg-love-gradient text-white'}`}>
                      {followed.includes(person.handle) ? '✓ Following' : '+ Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsored */}
            <div className="dark:bg-[#130E1E] bg-white rounded-2xl p-5 border dark:border-pink-500/20 border-gray-100 relative overflow-hidden">
              <div className="absolute top-3 right-3 text-[9px] font-bold dark:text-gray-600 text-gray-400 uppercase tracking-wide">Sponsored</div>
              <div className="text-3xl mb-3">🛍️</div>
              <h3 className="font-bold text-sm dark:text-white text-gray-900 mb-1">SmartzMarket</h3>
              <p className="text-xs dark:text-gray-400 text-gray-600 mb-3">Sell your products to 2M+ users across Africa. Free to list!</p>
              <button className="w-full py-2 rounded-xl bg-love-gradient text-white text-xs font-bold hover:opacity-90 transition-opacity">
                Start Selling →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
