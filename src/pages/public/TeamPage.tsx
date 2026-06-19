import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe, Heart, ExternalLink, Link2, Users, Zap, Shield, Star, MapPin, Calendar } from 'lucide-react'

const leadership = [
  {
    name: 'Emmanuel Kollie',
    role: 'CEO & Co-founder',
    photo: '/team/emmanuel-kollie.png',
    country: '🇱🇷 Liberia',
    bio: 'Serial entrepreneur with 10+ years in African tech. Previously founded two fintech startups. Passionate about connecting Africa through technology.',
    skills: ['Product Vision', 'Fundraising', 'Strategy'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    joined: '2022',
  },
  {
    name: 'Amara Sesay',
    role: 'CTO & Co-founder',
    photo: '/team/amara-sesay.png',
    country: '🇸🇱 Sierra Leone',
    bio: 'Full-stack engineer and AI researcher. Built the matching algorithm from scratch. Former Google engineer with a passion for African innovation.',
    skills: ['AI/ML', 'Architecture', 'Engineering'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    joined: '2022',
  },
  {
    name: 'Fatima Diallo',
    role: 'Chief Design Officer',
    photo: '/team/fatima-diallo.png',
    country: '🇸🇳 Senegal',
    bio: 'Award-winning UX designer who has worked with Airbnb and Spotify. Brings world-class design sensibility to African user experiences.',
    skills: ['UX Design', 'Brand', 'Research'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    joined: '2022',
  },
  {
    name: 'Kofi Asante',
    role: 'Chief Revenue Officer',
    photo: '/team/kofi-asante.png',
    country: '🇬🇭 Ghana',
    bio: 'Growth expert who scaled two African startups to $10M+ ARR. Expert in mobile money monetisation and African market expansion.',
    skills: ['Growth', 'Revenue', 'Partnerships'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    joined: '2023',
  },
  {
    name: 'Grace Kamara',
    role: 'Head of Marketing',
    photo: '/team/grace-kamara.png',
    country: '🇱🇷 Liberia',
    bio: 'Digital marketing strategist with deep roots in African social media culture. Grew SmartzConnect from 0 to 2M users in 18 months.',
    skills: ['Marketing', 'Social Media', 'Brand'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    joined: '2023',
  },
  {
    name: 'Ibrahim Touré',
    role: 'Head of Partnerships',
    photo: '/team/ibrahim-toure.png',
    country: '🇨🇮 Côte d\'Ivoire',
    bio: 'Business development expert with a network spanning 30+ African countries. Leads our MTN, Orange, and government partnerships.',
    skills: ['BD', 'Telco', 'Government'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    joined: '2023',
  },
  {
    name: 'Nadia Mensah',
    role: 'Head of Marketplace',
    photo: '/team/nadia-mensah.png',
    country: '🇬🇭 Ghana',
    bio: 'E-commerce veteran who built and scaled two African marketplaces. Leads SmartzMarket\'s seller ecosystem and buyer protection programs.',
    skills: ['E-commerce', 'Operations', 'Logistics'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    joined: '2023',
  },
  {
    name: 'Mariama Bah',
    role: 'Head of Creator Economy',
    photo: '/team/mariama-bah.png',
    country: '🇬🇳 Guinea',
    bio: 'Former TikTok creator with 500K followers. Now leads SmartzTV\'s creator program, helping African creators monetise their content.',
    skills: ['Creator Economy', 'Live Streaming', 'Monetisation'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    joined: '2024',
  },
  {
    name: 'Blessing Osei',
    role: 'Head of Safety & Trust',
    photo: '/team/blessing-osei.png',
    country: '🇳🇬 Nigeria',
    bio: 'Trust & safety expert from Meta. Leads our AI-powered content moderation and user verification systems across 47 countries.',
    skills: ['Trust & Safety', 'AI Moderation', 'Policy'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    joined: '2024',
  },
]

const advisors = [
  { name: 'Dr. Kwame Mensah', role: 'Africa Tech Advisor', photo: '/team/dr-kwame.png', country: '🇬🇭', org: 'Former Google Africa' },
  { name: 'Aisha Kamara', role: 'Investor & Advisor', photo: '/team/aisha-kamara.png', country: '🇱🇷', org: 'Liberia Investment Fund' },
  { name: 'Prof. Sow Diallo', role: 'AI Research Advisor', photo: '/team/prof-sow.png', country: '🇸🇳', org: 'Université de Dakar' },
  { name: 'Ngozi Okonkwo', role: 'Legal & Compliance', photo: '/team/ngozi-okonkwo.png', country: '🇳🇬', org: 'Pan-African Law Group' },
]

const values = [
  { emoji: '🌍', title: 'Africa First', desc: 'Every decision starts with: "Is this right for Africa?" We build for our continent, by our continent.' },
  { emoji: '💕', title: 'Genuine Connection', desc: 'Technology should bring people closer, not replace human connection. Authenticity is our north star.' },
  { emoji: '🛡️', title: 'Safety Always', desc: 'We invest more in safety than any other African social platform. Every user deserves to feel safe.' },
  { emoji: '🚀', title: 'Move Fast', desc: 'We ship fast, learn faster. 47 people moving with startup urgency and scale-up discipline.' },
]

const stats = [
  { v: '47', l: 'Team Members' },
  { v: '12', l: 'Countries' },
  { v: '2022', l: 'Founded' },
  { v: '$5M+', l: 'Raised' },
]

export default function TeamPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className="dark:bg-[#080510] bg-gray-50 min-h-screen pt-16 sm:pt-20">

      {/* ── Hero ── */}
      <section className="py-12 sm:py-20 dark:bg-[#0D0A14] bg-white border-b dark:border-white/5 border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-love-soft border border-pink-500/25 mb-5">
              <Users className="w-4 h-4 text-brand-pink" />
              <span className="text-sm font-semibold text-brand-pink">The people behind SmartzConnect</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl dark:text-white text-gray-900 mb-5 leading-tight">
              Built by Africans,<br /><span className="text-gradient-love">For Africa</span>
            </h1>
            <p className="text-base sm:text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto mb-8">
              We are a team of 47 passionate builders from 12 African countries, united by a mission to connect our continent through technology.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {stats.map(s => (
                <div key={s.l} className="dark:bg-white/5 bg-white rounded-2xl px-4 py-4 border dark:border-white/8 border-gray-100 text-center">
                  <p className="font-display font-black text-2xl sm:text-3xl text-gradient-love">{s.v}</p>
                  <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">

        {/* ── Values ── */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-16 sm:mb-20">
          <h2 className="font-display font-black text-2xl sm:text-3xl dark:text-white text-gray-900 text-center mb-8">
            Our <span className="text-gradient-love">Values</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
                className="dark:bg-[#130E1E] bg-white rounded-2xl p-6 border dark:border-white/6 border-gray-100 text-center hover:shadow-lg hover:border-pink-500/20 transition-all">
                <div className="text-4xl mb-3">{v.emoji}</div>
                <h3 className="font-bold dark:text-white text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Leadership Team ── */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl dark:text-white text-gray-900">
                Leadership <span className="text-gradient-love">Team</span>
              </h2>
              <p className="dark:text-gray-400 text-gray-600 mt-1 text-sm sm:text-base">The people driving SmartzConnect's mission forward.</p>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold dark:text-gray-500 text-gray-400">
              <Star className="w-3.5 h-3.5 text-brand-pink" /> {leadership.length} leaders
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {leadership.map((member, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.06 }}
                className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-100 hover:shadow-xl hover:border-pink-500/20 transition-all group overflow-hidden">

                {/* Photo header */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br from-pink-500/10 to-purple-500/10">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement
                      t.style.display = 'none'
                      t.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl">${member.country.split(' ')[0]}</div>`
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Country badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {member.country}
                  </div>
                  {/* Name overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="font-bold text-white text-base leading-tight">{member.name}</p>
                    <p className="text-xs text-pink-300 font-semibold">{member.role}</p>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Calendar className="w-3 h-3 dark:text-gray-500 text-gray-400" />
                    <span className="text-[10px] dark:text-gray-500 text-gray-400">Since {member.joined}</span>
                  </div>

                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-4 line-clamp-3">{member.bio}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.skills.map(s => (
                      <span key={s} className="text-[10px] font-semibold px-2.5 py-1 rounded-full dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-600 border dark:border-white/5 border-gray-200">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t dark:border-white/5 border-gray-100">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-500 transition-colors">
                      <Link2 className="w-3.5 h-3.5 dark:text-gray-400 text-gray-500" />
                    </a>
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:bg-sky-500/10 hover:text-sky-500 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 dark:text-gray-400 text-gray-500" />
                    </a>
                    <a href="https://wa.me/231776679963" target="_blank" rel="noopener noreferrer"
                      className="ml-auto text-xs font-semibold text-brand-pink hover:underline">
                      Contact →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Advisors ── */}
        <div className="mb-16 sm:mb-20">
          <h2 className="font-display font-black text-2xl sm:text-3xl dark:text-white text-gray-900 mb-8">
            Our <span className="text-gradient-love">Advisors</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {advisors.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.08 }}
                className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-100 hover:shadow-lg hover:border-pink-500/20 transition-all overflow-hidden group">
                <div className="h-32 sm:h-40 overflow-hidden bg-gradient-to-br from-pink-500/10 to-purple-500/10">
                  <img
                    src={a.photo}
                    alt={a.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement
                      t.style.display = 'none'
                    }}
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="font-bold text-sm dark:text-white text-gray-900 leading-tight">{a.name}</p>
                  <p className="text-xs text-brand-pink font-semibold mt-0.5">{a.role}</p>
                  <p className="text-[10px] dark:text-gray-500 text-gray-400 mt-1">{a.country} · {a.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Join CTA ── */}
        <div className="dark:bg-[#130E1E] bg-white rounded-3xl p-8 sm:p-12 border dark:border-white/8 border-gray-100 text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 pointer-events-none" />
          <div className="relative">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="font-display font-black text-2xl sm:text-3xl dark:text-white text-gray-900 mb-3">Join Our Team</h2>
            <p className="dark:text-gray-400 text-gray-600 mb-6 max-w-lg mx-auto text-sm sm:text-base">
              We are always looking for passionate builders who want to shape the future of African technology. Remote-first, Africa-focused.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/about#careers" className="btn-love px-6 py-3 rounded-xl font-bold inline-flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" /> View Open Roles
              </Link>
              <a href="https://wa.me/231776679963" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl dark:bg-white/5 bg-gray-100 dark:text-white text-gray-900 font-semibold hover:text-brand-pink transition-colors inline-flex items-center justify-center gap-2">
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
