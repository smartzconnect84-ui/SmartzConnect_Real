import { motion } from 'framer-motion'
import { Zap, Globe, Users, Heart, Shield, Award } from 'lucide-react'

const team = [
  { name: 'Marcus Johnson', role: 'CEO & Co-Founder', location: 'Monrovia, Liberia', emoji: '👨🏿‍💼' },
  { name: 'Amara Koroma', role: 'CTO & Co-Founder', location: 'Monrovia, Liberia', emoji: '👩🏾‍💻' },
  { name: 'Emmanuel Mensah', role: 'Head of Product', location: 'Accra, Ghana', emoji: '👨🏿‍🎨' },
  { name: 'Fatima Al-Hassan', role: 'Head of Marketing', location: 'Lagos, Nigeria', emoji: '👩🏾‍📊' },
  { name: 'James Kollie', role: 'Lead Engineer', location: 'Monrovia, Liberia', emoji: '👨🏾‍💻' },
  { name: 'Aisha Diallo', role: 'Head of Safety', location: 'Dakar, Senegal', emoji: '👩🏾‍⚖️' },
]

const values = [
  { icon: Globe, title: 'Global by Design', desc: 'Built for Africa, designed for the world. Every feature works across 195+ countries.' },
  { icon: Heart, title: 'Community First', desc: 'We build for real people — their connections, livelihoods, and stories matter most.' },
  { icon: Shield, title: 'Safety Always', desc: 'Trust and safety are non-negotiable. Every user deserves a safe, respectful experience.' },
  { icon: Award, title: 'African Excellence', desc: 'We are proud of our roots. SmartzConnect celebrates African culture, talent, and innovation.' },
]

export default function AboutPage() {
  return (
    <div className="pt-20 dark:bg-[#0D0A14] bg-white min-h-screen">
      {/* Hero */}
      <section className="section-padding">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 mb-6">
              <Zap className="w-4 h-4 text-brand-pink" />
              <span className="text-sm font-medium text-brand-pink">Our Story</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold dark:text-white text-gray-900 mb-6">
              Built in Africa.{' '}
              <span className="text-gradient-love">Built for the World.</span>
            </h1>
            <p className="text-xl dark:text-gray-400 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              SmartzConnect was born in Monrovia, Liberia with a simple mission: give African people a world-class platform that celebrates their culture, connects their communities, and powers their economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding dark:bg-[#080510] bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed mb-6">
                We believe Africa deserves its own world-class social platform — one that understands its culture, speaks its languages, and serves its 1.4 billion people.
              </p>
              <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed mb-6">
                SmartzConnect is not just an app. It is a movement. A platform where Africans can connect, date, build businesses, create content, and move around their cities — all in one place.
              </p>
              <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed">
                From Monrovia to Lagos, Accra to Nairobi, Dakar to Johannesburg — and beyond to the African diaspora worldwide — SmartzConnect is home.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '2M+', label: 'Active Users' },
                { value: '195+', label: 'Countries' },
                { value: '500K+', label: 'Matches Made' },
                { value: '$2M+', label: 'Marketplace Sales' },
              ].map(stat => (
                <div key={stat.label} className="p-6 rounded-3xl dark:bg-[#1C1530] bg-white border dark:border-white/6 border-gray-200 text-center">
                  <div className="text-3xl font-display font-bold text-gradient-love mb-2">{stat.value}</div>
                  <div className="text-sm dark:text-gray-400 text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding dark:bg-[#0D0A14] bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-4">
              Our <span className="text-gradient-love">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-3xl dark:bg-[#1C1530] bg-gray-50 border dark:border-white/6 border-gray-200 text-center"
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

      {/* Team */}
      <section className="section-padding dark:bg-[#080510] bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-4">
              Meet the <span className="text-gradient-love">Team</span>
            </h2>
            <p className="text-lg dark:text-gray-400 text-gray-600">
              A passionate team of Africans building for Africa and the world.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
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

      {/* CTA */}
      <section className="section-padding dark:bg-[#0D0A14] bg-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold dark:text-white text-gray-900 mb-4">
              Join the <span className="text-gradient-love">movement</span>
            </h2>
            <p className="text-lg dark:text-gray-400 text-gray-600 mb-8 max-w-xl mx-auto">
              Be part of Africa&apos;s fastest-growing social platform. Your story starts here.
            </p>
            <a href="/register" className="btn-love inline-flex items-center gap-2">
              <Users className="w-5 h-5" />
              Join SmartzConnect Free
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
