import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Zap, Globe, Users, Heart, Shield, Award,
  Eye, Target, CheckCircle, Car, ShoppingBag,
  Megaphone, Truck, ArrowRight, Star, Sparkles,
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

const team = [
  { name: 'Marcus Johnson',   role: 'CEO & Co-Founder',    location: 'Monrovia, Liberia', emoji: '👨🏿‍💼' },
  { name: 'Amara Koroma',     role: 'CTO & Co-Founder',    location: 'Monrovia, Liberia', emoji: '👩🏾‍💻' },
  { name: 'Emmanuel Mensah',  role: 'Head of Product',     location: 'Accra, Ghana',      emoji: '👨🏿‍🎨' },
  { name: 'Fatima Al-Hassan', role: 'Head of Marketing',   location: 'Lagos, Nigeria',    emoji: '👩🏾‍📊' },
  { name: 'James Kollie',     role: 'Lead Engineer',       location: 'Monrovia, Liberia', emoji: '👨🏾‍💻' },
  { name: 'Aisha Diallo',     role: 'Head of Safety',      location: 'Dakar, Senegal',    emoji: '👩🏾‍⚖️' },
]

const values = [
  { icon: Globe,  title: 'Global by Design',      desc: 'Built for Africa, designed for the world. Every feature works across 195+ countries.' },
  { icon: Heart,  title: 'Community First',        desc: 'We build for real people — their connections, livelihoods, and stories matter most.' },
  { icon: Shield, title: 'Safety Always',          desc: 'Trust and safety are non-negotiable. Every user deserves a safe, respectful experience.' },
  { icon: Award,  title: 'African Excellence',     desc: 'We are proud of our roots. SmartzConnect celebrates African culture, talent, and innovation.' },
]

const features = [
  {
    icon: Heart,
    emoji: '💕',
    name: 'SmartzDating',
    desc: 'Connect with singles worldwide and build meaningful relationships across cultures and borders.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: Megaphone,
    emoji: '📣',
    name: 'SmartzAds',
    desc: 'Promote your products, services, events, and businesses to targeted audiences and increase visibility.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: ShoppingBag,
    emoji: '🛒',
    name: 'SmartzMarket',
    desc: 'Buy, sell, and discover products in a trusted online marketplace built for the African community.',
    color: 'from-orange-500 to-amber-600',
  },
  {
    icon: Car,
    emoji: '🚗',
    name: 'SmartzRide',
    desc: 'Access convenient transportation services and connect riders with drivers efficiently and safely.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Truck,
    emoji: '📦',
    name: 'SmartzDelivery',
    desc: 'Send and receive packages, food, and other deliveries quickly, reliably, and at your convenience.',
    color: 'from-green-500 to-emerald-600',
  },
]

const steps = [
  { num: '01', title: 'Create Your Account',      desc: 'Sign up in minutes and build your profile.' },
  { num: '02', title: 'Complete Your Profile',    desc: 'Add your interests, business info, or dating preferences to help others discover you.' },
  { num: '03', title: 'Explore the Platform',     desc: 'Join communities, connect with people, browse the marketplace, or discover available services.' },
  { num: '04', title: 'Start Connecting',         desc: 'Send messages, make new friends, grow your network, promote your business, or find meaningful relationships.' },
  { num: '05', title: 'Unlock Opportunities',     desc: 'Use SmartzAds, SmartzMarket, SmartzRide, SmartzDelivery, and SmartzDating to maximise your experience.' },
]

const stats = [
  { value: '2M+',  label: 'Active Users' },
  { value: '195+', label: 'Countries' },
  { value: '500K+', label: 'Matches Made' },
  { value: '$2M+', label: 'Marketplace Sales' },
]

export default function AboutPage() {
  return (
    <div className="pt-20 dark:bg-[#0D0A14] bg-white min-h-screen">

      {/* ── Hero ── */}
      <section className="section-padding overflow-hidden">
        <div className="container-max text-center">
          <motion.div {...fadeUp()}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 mb-6">
              <Zap className="w-4 h-4 text-brand-pink" />
              <span className="text-sm font-medium text-brand-pink">Our Story</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold dark:text-white text-gray-900 mb-6">
              Built in Africa.{' '}
              <span className="text-gradient-love">Built for the World.</span>
            </h1>
            <p className="text-xl dark:text-gray-400 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              SmartzConnect was born in Monrovia, Liberia with a bold vision: to become Africa's leading
              global digital ecosystem — connecting people, businesses, communities, and opportunities
              through innovative technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="section-padding dark:bg-[#080510] bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp()}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Eye className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">Our Vision</span>
              </div>
              <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-6">
                Africa's Leading Digital Ecosystem
              </h2>
              <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed mb-6">
                To become Africa's leading global digital ecosystem, connecting people, businesses,
                communities, and opportunities through innovative technology that inspires meaningful
                relationships, economic growth, and worldwide collaboration.
              </p>
              <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed">
                From Monrovia to Lagos, Accra to Nairobi, Dakar to Johannesburg — and beyond to the
                African diaspora worldwide — SmartzConnect is home.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4">
              {stats.map(stat => (
                <div key={stat.label} className="p-6 rounded-3xl dark:bg-[#1C1530] bg-white border dark:border-white/6 border-gray-200 text-center">
                  <div className="text-3xl font-display font-bold text-gradient-love mb-2">{stat.value}</div>
                  <div className="text-sm dark:text-gray-400 text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="section-padding dark:bg-[#0D0A14] bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp()}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 mb-6">
                <Target className="w-4 h-4 text-brand-pink" />
                <span className="text-sm font-medium text-brand-pink">Our Mission</span>
              </div>
              <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-8">
                Empowering People &{' '}
                <span className="text-gradient-love">Businesses</span>
              </h2>
              <div className="p-8 rounded-3xl dark:bg-[#1C1530] bg-gray-50 border dark:border-white/6 border-gray-200">
                <p className="text-xl dark:text-gray-300 text-gray-700 leading-relaxed italic">
                  "Our mission is to empower individuals and businesses by providing a secure, inclusive,
                  and innovative platform where people can build meaningful relationships, grow professional
                  networks, promote businesses, access digital services, and discover opportunities without
                  borders. Built in Liberia, SmartzConnect is designed for the world."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section-padding dark:bg-[#080510] bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp(0.2)} className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: '💕', label: 'Dating' },
                  { emoji: '💼', label: 'Business' },
                  { emoji: '🛒', label: 'Marketplace' },
                  { emoji: '🚗', label: 'Transport' },
                  { emoji: '📦', label: 'Delivery' },
                  { emoji: '📡', label: 'Streaming' },
                  { emoji: '🤝', label: 'Networking' },
                  { emoji: '📱', label: 'Social Feed' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 p-4 rounded-2xl dark:bg-[#1C1530] bg-white border dark:border-white/6 border-gray-200">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-sm font-semibold dark:text-white text-gray-900">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp()} className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Why Choose Us</span>
              </div>
              <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-6">
                One Platform.{' '}
                <span className="text-gradient-love">Endless Possibilities.</span>
              </h2>
              <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed mb-6">
                SmartzConnect is more than a social network — it's a complete digital ecosystem. We combine
                social networking, international dating, business promotion, online marketplaces,
                transportation services, and delivery solutions into one powerful platform.
              </p>
              <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed">
                Whether you're looking for love, growing a business, expanding your network, or accessing
                everyday services, SmartzConnect provides everything you need in one connected experience.
                Built with a global vision and African innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section-padding dark:bg-[#0D0A14] bg-white">
        <div className="container-max">
          <div className="text-center mb-14">
            <motion.div {...fadeUp()}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 mb-6">
                <Star className="w-4 h-4 text-brand-pink" />
                <span className="text-sm font-medium text-brand-pink">Our Features</span>
              </div>
              <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-4">
                Everything You Need,{' '}
                <span className="text-gradient-love">All in One Place</span>
              </h2>
              <p className="text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
                SmartzConnect offers a unique collection of integrated services designed to simplify digital
                life. Plus social networking, private messaging, blogging, community engagement, business
                networking, and content sharing — all in one platform.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.name}
                  {...fadeUp(i * 0.1)}
                  className="group p-6 rounded-3xl dark:bg-[#1C1530] bg-gray-50 border dark:border-white/6 border-gray-200 hover:border-brand-pink/30 transition-all card-hover"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{f.emoji}</span>
                    <h3 className="font-display font-bold text-lg dark:text-white text-gray-900">{f.name}</h3>
                  </div>
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
            {/* Bonus card */}
            <motion.div
              {...fadeUp(0.5)}
              className="sm:col-span-2 lg:col-span-0 p-6 rounded-3xl bg-love-gradient text-white flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-4">🌍</div>
                <h3 className="font-display font-bold text-xl mb-3">And So Much More</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Social networking, private messaging, blogging, community groups, business networking,
                  and content sharing — all within one connected African platform.
                </p>
              </div>
              <Link to="/register"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:gap-3 transition-all">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How to Get Started ── */}
      <section className="section-padding dark:bg-[#080510] bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-14">
            <motion.div {...fadeUp()}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">How to Get Started</span>
              </div>
              <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-4">
                Join in{' '}
                <span className="text-gradient-love">5 Simple Steps</span>
              </h2>
              <p className="text-lg dark:text-gray-400 text-gray-600">
                Getting started with SmartzConnect is simple. Sign up today and become part of a growing
                global community where connections create opportunities.
              </p>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                {...fadeUp(i * 0.1)}
                className="flex items-start gap-6 p-6 rounded-2xl dark:bg-[#1C1530] bg-white border dark:border-white/6 border-gray-200 group hover:border-brand-pink/30 transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-love-gradient flex items-center justify-center text-white font-black text-sm shadow-lg">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold dark:text-white text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-padding dark:bg-[#0D0A14] bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <motion.div {...fadeUp()}>
              <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-4">
                Our <span className="text-gradient-love">Values</span>
              </h2>
              <p className="text-lg dark:text-gray-400 text-gray-600">
                The principles that guide everything we build and every community we serve.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  {...fadeUp(i * 0.1)}
                  className="p-6 rounded-3xl dark:bg-[#1C1530] bg-gray-50 border dark:border-white/6 border-gray-200 text-center card-hover"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-brand-pink" />
                  </div>
                  <h3 className="font-semibold dark:text-white text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{v.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-padding dark:bg-[#080510] bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <motion.div {...fadeUp()}>
              <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-4">
                Meet the <span className="text-gradient-love">Team</span>
              </h2>
              <p className="text-lg dark:text-gray-400 text-gray-600">
                A passionate team of Africans building for Africa and the world.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(i * 0.08)}
                className="p-4 rounded-2xl dark:bg-[#1C1530] bg-white border dark:border-white/6 border-gray-200 text-center card-hover"
              >
                <div className="text-4xl mb-3">{member.emoji}</div>
                <p className="text-sm font-semibold dark:text-white text-gray-900 leading-tight">{member.name}</p>
                <p className="text-xs text-brand-pink mt-1">{member.role}</p>
                <p className="text-xs dark:text-gray-500 text-gray-400 mt-1">{member.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding dark:bg-[#0D0A14] bg-white">
        <div className="container-max text-center">
          <motion.div {...fadeUp()}>
            <div className="max-w-2xl mx-auto p-10 rounded-3xl bg-love-gradient text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/flyer.png')] opacity-5 bg-cover bg-center" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">🌍</div>
                <h2 className="font-display text-4xl font-bold mb-4">
                  Join the Movement
                </h2>
                <p className="text-lg text-white/85 mb-8 max-w-lg mx-auto leading-relaxed">
                  Join SmartzConnect today and become part of a growing global community where
                  connections create opportunities. Your story starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/register"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-brand-pink font-bold hover:bg-white/90 transition-all shadow-xl">
                    <Users className="w-5 h-5" />
                    Join SmartzConnect Free
                  </Link>
                  <Link to="/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
