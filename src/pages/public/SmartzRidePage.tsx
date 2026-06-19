import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Car, MapPin, Shield, Clock, Star, DollarSign, Smartphone, Users, Zap, CheckCircle } from 'lucide-react'

const features = [
  { icon: MapPin,      title: 'Real-Time Tracking',    desc: 'Track your driver live on the map. Know exactly when they arrive.',                                  color: 'from-emerald-500 to-teal-600' },
  { icon: Shield,      title: 'Safety First',           desc: 'All drivers are verified with ID checks, background screening, and vehicle inspection.',             color: 'from-blue-500 to-indigo-600' },
  { icon: Clock,       title: 'Fast Pickup',            desc: 'Average pickup time under 5 minutes in supported cities. Get moving fast.',                         color: 'from-amber-500 to-orange-600' },
  { icon: DollarSign,  title: 'Affordable Fares',       desc: 'Transparent pricing with no surge surprises. Pay with Mobile Money, card, or cash.',                color: 'from-pink-500 to-rose-600' },
  { icon: Smartphone,  title: 'In-App Chat',            desc: 'Message your driver directly through the app without sharing your phone number.',                   color: 'from-violet-500 to-purple-600' },
  { icon: Star,        title: 'Rate & Review',          desc: 'Rate every ride and help maintain quality standards across the platform.',                          color: 'from-yellow-500 to-amber-600' },
]

const cities = [
  { name: 'Monrovia',   country: '🇱🇷', drivers: '1,240', status: 'active' },
  { name: 'Accra',      country: '🇬🇭', drivers: '3,800', status: 'active' },
  { name: 'Lagos',      country: '🇳🇬', drivers: '8,200', status: 'active' },
  { name: 'Nairobi',    country: '🇰🇪', drivers: '4,100', status: 'active' },
  { name: 'Dakar',      country: '🇸🇳', drivers: '2,300', status: 'active' },
  { name: 'Freetown',   country: '🇸🇱', drivers: '890',   status: 'active' },
  { name: 'Abidjan',    country: '🇨🇮', drivers: '2,700', status: 'active' },
  { name: 'Douala',     country: '🇨🇲', drivers: '1,500', status: 'active' },
]

const rideTypes = [
  { name: 'SmartzGo',    desc: 'Affordable everyday rides',  emoji: '🚗', price: 'From $1.50', eta: '3 min' },
  { name: 'SmartzPlus',  desc: 'Comfortable premium rides',  emoji: '🚙', price: 'From $3.00', eta: '5 min' },
  { name: 'SmartzXL',    desc: 'Group rides up to 6 people', emoji: '🚐', price: 'From $4.50', eta: '7 min' },
  { name: 'SmartzMoto',  desc: 'Fast motorbike rides',       emoji: '🏍️', price: 'From $0.80', eta: '2 min' },
]

const stats = [
  { value: '18K+',  label: 'Active Drivers',    icon: '🚗' },
  { value: '2.1M',  label: 'Rides Completed',   icon: '✅' },
  { value: '4.8★',  label: 'Average Rating',    icon: '⭐' },
  { value: '8',     label: 'Cities & Growing',  icon: '🏙️' },
]

export default function SmartzRidePage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="dark:bg-[#080510] bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/25 mb-6">
                <Car className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">SmartzRide</span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl dark:text-white text-gray-900 leading-tight mb-5">
                Ride Smarter<br />Across <span className="text-gradient-love">Africa</span>
              </h1>
              <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed mb-8 max-w-lg">
                Safe, affordable, and reliable rides at your fingertips. Book in seconds, pay with Mobile Money, and get moving.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/register" className="btn-love px-7 py-3.5 rounded-2xl text-sm font-bold inline-flex items-center gap-2">
                  <Car className="w-4 h-4" /> Book a Ride
                </Link>
                <Link to="/register" className="px-7 py-3.5 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 text-sm font-semibold hover:text-brand-pink transition-all inline-flex items-center gap-2">
                  <Users className="w-4 h-4" /> Become a Driver
                </Link>
              </div>
            </motion.div>

            {/* App mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="dark:bg-[#130E1E] bg-white rounded-3xl p-6 border dark:border-white/8 border-gray-100 shadow-2xl max-w-sm mx-auto">
                <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-2xl p-4 mb-4 relative overflow-hidden">
                  <div className="text-center py-6">
                    <div className="text-6xl mb-2">🗺️</div>
                    <p className="text-white/70 text-xs">Finding drivers near you...</p>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-white text-xs font-semibold">3 drivers nearby · 2 min away</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {rideTypes.slice(0, 4).map((r, i) => (
                    <div key={i} className="dark:bg-white/5 bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-2xl mb-1">{r.emoji}</div>
                      <p className="text-xs font-bold dark:text-white text-gray-900">{r.name}</p>
                      <p className="text-[10px] text-emerald-500 font-semibold">{r.eta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 dark:bg-[#0D0A14] bg-white border-y dark:border-white/5 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="font-display font-black text-2xl sm:text-3xl text-gradient-love">{s.value}</p>
                <p className="text-sm dark:text-gray-400 text-gray-500">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ride types */}
      <section ref={ref} className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
            <h2 className="font-display font-black text-3xl sm:text-4xl dark:text-white text-gray-900 mb-3">
              Choose Your <span className="text-gradient-love">Ride</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {rideTypes.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
                className="dark:bg-[#130E1E] bg-white rounded-2xl p-6 border dark:border-white/6 border-gray-100 hover:shadow-xl hover:border-emerald-500/30 transition-all text-center group cursor-pointer">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{r.emoji}</div>
                <h3 className="font-bold dark:text-white text-gray-900 mb-1">{r.name}</h3>
                <p className="text-xs dark:text-gray-400 text-gray-500 mb-3">{r.desc}</p>
                <p className="text-sm font-black text-emerald-500">{r.price}</p>
                <p className="text-xs dark:text-gray-500 text-gray-400">ETA: {r.eta}</p>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
                  className="dark:bg-[#130E1E] bg-white rounded-2xl p-6 border dark:border-white/6 border-gray-100 hover:shadow-xl transition-all group">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold dark:text-white text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 dark:bg-[#0D0A14] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-black text-3xl dark:text-white text-gray-900 mb-3">
              Available in <span className="text-gradient-love">8 Cities</span>
            </h2>
            <p className="dark:text-gray-400 text-gray-600">Expanding across Africa every month</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cities.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.06 }}
                className="dark:bg-[#130E1E] bg-gray-50 rounded-2xl p-4 text-center border dark:border-white/6 border-gray-100">
                <div className="text-3xl mb-2">{c.country}</div>
                <p className="font-bold dark:text-white text-gray-900 text-sm">{c.name}</p>
                <p className="text-xs text-emerald-500 font-semibold">{c.drivers} drivers</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] text-emerald-500">Active</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Driver CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="dark:bg-[#130E1E] bg-white rounded-3xl p-10 border dark:border-white/8 border-gray-100 shadow-xl grid sm:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display font-black text-3xl dark:text-white text-gray-900 mb-3">Drive with SmartzRide</h2>
              <p className="dark:text-gray-400 text-gray-600 mb-5">Earn on your schedule. Keep 80% of every fare. Get paid weekly via Mobile Money.</p>
              <ul className="space-y-2 mb-6">
                {['Flexible hours — drive when you want', 'Weekly payouts via MTN/Orange MoMo', 'Free driver training & support', 'Fuel discount partnerships'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm dark:text-gray-300 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25">
                <Zap className="w-4 h-4" /> Apply as Driver
              </Link>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🚗</div>
              <p className="font-display font-black text-4xl text-emerald-500">$800+</p>
              <p className="dark:text-gray-400 text-gray-600 text-sm">Average monthly earnings</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
