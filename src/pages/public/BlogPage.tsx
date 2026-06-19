import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Calendar, Clock, ArrowRight, Tag, TrendingUp, BookOpen, Heart } from 'lucide-react'

const categories = ['All', 'Product', 'Dating Tips', 'Tech', 'Culture', 'Business', 'SmartzTV', 'Community']

const posts = [
  {
    id: '1', slug: 'ai-matching-africa', category: 'Product', featured: true,
    title: 'How Our AI Matching Algorithm Finds Your Perfect Match Across Africa',
    excerpt: 'We built a compatibility engine trained on 50M+ African relationship patterns. Here\'s how it works and why it\'s 3x more accurate than Western dating apps.',
    author: 'Emmanuel Kollie', authorEmoji: '👨🏿', authorRole: 'CEO & Co-founder',
    date: 'June 15, 2026', readTime: '8 min read', emoji: '🤖',
    tags: ['AI', 'Matching', 'Technology'], views: '24.5K', likes: 892,
  },
  {
    id: '2', slug: 'smartztv-creators-earning', category: 'SmartzTV', featured: false,
    title: '10 SmartzTV Creators Who Earned $10,000+ Last Month',
    excerpt: 'From Monrovia to Lagos, these creators are building real income streams through live streaming, virtual gifts, and brand partnerships on SmartzTV.',
    author: 'Amara Sesay', authorEmoji: '👩🏾', authorRole: 'Head of Creator Relations',
    date: 'June 12, 2026', readTime: '6 min read', emoji: '📺',
    tags: ['Creators', 'Earnings', 'SmartzTV'], views: '18.2K', likes: 654,
  },
  {
    id: '3', slug: 'dating-tips-west-africa', category: 'Dating Tips', featured: false,
    title: '7 Dating Tips That Actually Work in West Africa',
    excerpt: 'Dating in West Africa has its own beautiful culture and traditions. Our relationship experts share tips that respect African values while embracing modern connection.',
    author: 'Grace Kamara', authorEmoji: '👩🏿', authorRole: 'Relationship Coach',
    date: 'June 10, 2026', readTime: '5 min read', emoji: '💕',
    tags: ['Dating', 'Culture', 'Relationships'], views: '31.8K', likes: 1204,
  },
  {
    id: '4', slug: 'smartzride-driver-guide', category: 'Business', featured: false,
    title: 'The Complete Guide to Earning with SmartzRide in 2026',
    excerpt: 'Everything you need to know about becoming a SmartzRide driver — from registration to maximising your earnings with our new surge pricing system.',
    author: 'Ibrahim Touré', authorEmoji: '👨🏾', authorRole: 'Head of Partnerships',
    date: 'June 8, 2026', readTime: '10 min read', emoji: '🚗',
    tags: ['SmartzRide', 'Earnings', 'Drivers'], views: '12.4K', likes: 445,
  },
  {
    id: '5', slug: 'africa-summit-2026', category: 'Community', featured: false,
    title: 'SmartzConnect Africa Summit 2026: What to Expect',
    excerpt: 'The biggest gathering of African tech, culture, and community is coming to Monrovia this August. Here\'s everything you need to know about registering.',
    author: 'Fatima Diallo', authorEmoji: '👩🏽', authorRole: 'Head of Events',
    date: 'June 5, 2026', readTime: '4 min read', emoji: '🌍',
    tags: ['Summit', 'Events', 'Community'], views: '9.7K', likes: 387,
  },
  {
    id: '6', slug: 'mobile-money-payments', category: 'Tech', featured: false,
    title: 'Why We Built Africa-First Payments with MTN MoMo & Orange Money',
    excerpt: 'Over 60% of Africans are unbanked. Here\'s how we built a payment system that works for everyone — from Monrovia to Nairobi — without a bank account.',
    author: 'Kofi Asante', authorEmoji: '👨🏾', authorRole: 'Head of Payments',
    date: 'June 2, 2026', readTime: '7 min read', emoji: '💳',
    tags: ['Payments', 'MoMo', 'Fintech'], views: '15.6K', likes: 521,
  },
  {
    id: '7', slug: 'marketplace-seller-success', category: 'Business', featured: false,
    title: 'From Side Hustle to Full-Time: How Fatima Built a $50K Business on SmartzMarket',
    excerpt: 'Fatima Diallo started selling handmade jewellery from her bedroom in Dakar. 18 months later, she ships to 12 countries and employs 5 people.',
    author: 'Nadia Mensah', authorEmoji: '👩🏾', authorRole: 'Marketplace Lead',
    date: 'May 28, 2026', readTime: '9 min read', emoji: '🛍️',
    tags: ['Marketplace', 'Success Story', 'Business'], views: '22.1K', likes: 876,
  },
  {
    id: '8', slug: 'safety-features-2026', category: 'Product', featured: false,
    title: 'New Safety Features: How We\'re Making SmartzConnect the Safest Dating App in Africa',
    excerpt: 'AI-powered profile verification, real-time content moderation, and our new SOS button for SmartzRide. Here\'s our commitment to your safety.',
    author: 'Emmanuel Kollie', authorEmoji: '👨🏿', authorRole: 'CEO & Co-founder',
    date: 'May 25, 2026', readTime: '6 min read', emoji: '🛡️',
    tags: ['Safety', 'Product', 'Trust'], views: '8.9K', likes: 312,
  },
]

export default function BlogPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const featured = posts.find(p => p.featured)!
  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchSearch && (activeCategory === 'All' || p.category === activeCategory) && !p.featured
  })

  return (
    <div className="dark:bg-[#080510] bg-gray-50 min-h-screen pt-20">

      {/* Hero */}
      <section className="py-12 sm:py-16 dark:bg-[#0D0A14] bg-white border-b dark:border-white/5 border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-love-soft border border-pink-500/25 mb-5">
              <BookOpen className="w-4 h-4 text-brand-pink" />
              <span className="text-sm font-semibold text-brand-pink">SmartzConnect Blog</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl dark:text-white text-gray-900 mb-4">
              Stories, Tips & <span className="text-gradient-love">Insights</span>
            </h1>
            <p className="text-base sm:text-lg dark:text-gray-400 text-gray-600 mb-6 max-w-xl mx-auto">
              Product updates, dating tips, creator stories, and everything happening at SmartzConnect.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-gray-500 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles…"
                className="w-full pl-11 pr-4 py-3 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors" />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-love-gradient text-white shadow-md shadow-pink-500/20' : 'dark:bg-white/5 bg-white border dark:border-white/8 border-gray-200 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {activeCategory === 'All' && !search && (
          <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="dark:bg-[#130E1E] bg-white rounded-3xl p-7 sm:p-10 border dark:border-white/8 border-gray-100 shadow-xl shadow-pink-500/5 mb-8 group cursor-pointer hover:shadow-2xl hover:shadow-pink-500/10 transition-all">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-pink bg-love-soft px-2.5 py-1 rounded-full">⭐ Featured</span>
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full">{featured.category}</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-2xl dark:text-white text-gray-900 mb-3 leading-tight group-hover:text-brand-pink transition-colors">
                  {featured.title}
                </h2>
                <p className="dark:text-gray-400 text-gray-600 leading-relaxed mb-5 text-sm sm:text-base">{featured.excerpt}</p>
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{featured.authorEmoji}</span>
                    <div>
                      <p className="text-xs font-bold dark:text-white text-gray-900">{featured.author}</p>
                      <p className="text-[10px] dark:text-gray-500 text-gray-400">{featured.authorRole}</p>
                    </div>
                  </div>
                  <span className="text-xs dark:text-gray-500 text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {featured.date}</span>
                  <span className="text-xs dark:text-gray-500 text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Link to={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-love-gradient text-white text-sm font-bold shadow-md shadow-pink-500/20 hover:opacity-90 transition-opacity">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs dark:text-gray-500 text-gray-400">{featured.views} views · {featured.likes} likes</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center w-40 h-40 rounded-3xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-100 flex-shrink-0 text-7xl">
                {featured.emoji}
              </div>
            </div>
          </motion.div>
        )}

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post, i) => (
            <motion.article key={post.id}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.06 }}
              className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-100 overflow-hidden hover:shadow-xl hover:border-pink-500/20 transition-all group cursor-pointer">

              {/* Emoji header */}
              <div className="h-28 dark:bg-white/3 bg-gray-50 flex items-center justify-center text-6xl border-b dark:border-white/5 border-gray-100">
                {post.emoji}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-pink bg-love-soft px-2 py-0.5 rounded-full">{post.category}</span>
                  <span className="text-[10px] dark:text-gray-500 text-gray-400 flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {post.readTime}</span>
                </div>
                <h3 className="font-bold text-sm dark:text-white text-gray-900 leading-snug mb-2 group-hover:text-brand-pink transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs dark:text-gray-400 text-gray-600 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between pt-3 border-t dark:border-white/5 border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{post.authorEmoji}</span>
                    <span className="text-xs dark:text-gray-400 text-gray-500">{post.author.split(' ')[0]}</span>
                    <span className="text-[10px] dark:text-gray-600 text-gray-400">{post.date.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] dark:text-gray-500 text-gray-400">
                    <span className="flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> {post.views}</span>
                    <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" /> {post.likes}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📝</p>
            <p className="dark:text-gray-400 text-gray-500">No articles found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
