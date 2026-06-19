import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, Heart, Star, ShoppingCart, MapPin, Shield, X, Plus, Minus, Package, Truck, Tag, TrendingUp } from 'lucide-react'

const categories = ['All', 'Fashion', 'Electronics', 'Food', 'Art', 'Beauty', 'Home', 'Services', 'Digital']

const products = [
  { id: 1,  name: 'Kente Fabric Set',         price: 45,  originalPrice: 60,  rating: 4.9, reviews: 128, seller: 'Amara K.',    location: 'Monrovia, LR', emoji: '🧣', category: 'Fashion',     verified: true,  badge: '🔥 Hot',   sold: 342, inStock: true  },
  { id: 2,  name: 'Wireless Earbuds Pro',      price: 89,  originalPrice: null, rating: 4.7, reviews: 64,  seller: 'TechHub GH', location: 'Accra, GH',    emoji: '🎧', category: 'Electronics', verified: true,  badge: null,       sold: 89,  inStock: true  },
  { id: 3,  name: 'Shea Butter Cream 500ml',   price: 18,  originalPrice: null, rating: 5.0, reviews: 312, seller: 'Fatima D.',  location: 'Dakar, SN',    emoji: '🧴', category: 'Beauty',      verified: true,  badge: '⭐ Top',   sold: 1204,inStock: true  },
  { id: 4,  name: 'Afrobeats Digital Art',     price: 25,  originalPrice: null, rating: 4.8, reviews: 47,  seller: 'Kofi A.',    location: 'Lagos, NG',    emoji: '🎨', category: 'Art',         verified: false, badge: null,       sold: 23,  inStock: true  },
  { id: 5,  name: 'Jollof Rice Spice Kit',     price: 12,  originalPrice: 15,  rating: 4.6, reviews: 89,  seller: 'Mama Nadia', location: 'Freetown, SL', emoji: '🌶️', category: 'Food',        verified: true,  badge: '🆕 New',  sold: 156, inStock: true  },
  { id: 6,  name: 'Ankara Wrap Dress',         price: 65,  originalPrice: 85,  rating: 4.9, reviews: 203, seller: 'Zara M.',    location: 'Lagos, NG',    emoji: '👗', category: 'Fashion',     verified: true,  badge: '🔥 Hot',   sold: 567, inStock: true  },
  { id: 7,  name: 'Handmade Beaded Necklace',  price: 32,  originalPrice: null, rating: 4.7, reviews: 91,  seller: 'Grace K.',   location: 'Monrovia, LR', emoji: '📿', category: 'Fashion',     verified: true,  badge: null,       sold: 78,  inStock: true  },
  { id: 8,  name: 'African Drum (Djembe)',      price: 120, originalPrice: null, rating: 4.9, reviews: 34,  seller: 'Ibrahim T.', location: 'Abidjan, CI',  emoji: '🥁', category: 'Art',         verified: true,  badge: '🎵 Music', sold: 12,  inStock: false },
  { id: 9,  name: 'Logo Design Service',       price: 50,  originalPrice: null, rating: 5.0, reviews: 67,  seller: 'Emmanuel M.',location: 'Accra, GH',    emoji: '💻', category: 'Services',    verified: true,  badge: '⭐ Top',   sold: 234, inStock: true  },
  { id: 10, name: 'Moringa Powder 1kg',        price: 22,  originalPrice: 28,  rating: 4.8, reviews: 145, seller: 'Blessing O.',location: 'Lagos, NG',    emoji: '🌿', category: 'Food',        verified: true,  badge: '🌱 Organic',sold: 389,inStock: true  },
  { id: 11, name: 'Smart Home LED Kit',        price: 75,  originalPrice: null, rating: 4.5, reviews: 28,  seller: 'TechHub GH', location: 'Accra, GH',    emoji: '💡', category: 'Electronics', verified: true,  badge: null,       sold: 45,  inStock: true  },
  { id: 12, name: 'Afro Hair Care Bundle',     price: 38,  originalPrice: 50,  rating: 4.9, reviews: 267, seller: 'Mariama B.', location: 'Conakry, GN',  emoji: '💆', category: 'Beauty',      verified: true,  badge: '🔥 Hot',   sold: 892, inStock: true  },
]

type Product = typeof products[0]

function ProductDrawer({ product, onClose, cart, onAddToCart }: {
  product: Product
  onClose: () => void
  cart: Record<number, number>
  onAddToCart: (id: number, qty: number) => void
}) {
  const [qty, setQty] = useState(1)
  const inCart = cart[product.id] || 0

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="dark:bg-[#130E1E] bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Handle */}
        <div className="w-10 h-1 rounded-full dark:bg-white/20 bg-gray-300 mx-auto mt-4 mb-2 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-white/6 border-gray-100">
          <h3 className="font-bold dark:text-white text-gray-900">Product Details</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {/* Product image */}
          <div className="h-48 dark:bg-gradient-to-br dark:from-pink-500/10 dark:to-purple-600/10 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl flex items-center justify-center text-8xl mb-5 border dark:border-white/5 border-gray-100">
            {product.emoji}
          </div>

          {/* Info */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="font-display font-black text-xl dark:text-white text-gray-900 mb-1">{product.name}</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold dark:text-white text-gray-900">{product.rating}</span>
                  <span className="text-xs dark:text-gray-400 text-gray-500">({product.reviews} reviews)</span>
                </div>
                <span className="text-xs dark:text-gray-500 text-gray-400">· {product.sold} sold</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-display font-black text-2xl text-brand-pink">${product.price}</p>
              {product.originalPrice && (
                <p className="text-xs dark:text-gray-500 text-gray-400 line-through">${product.originalPrice}</p>
              )}
            </div>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-3 p-3 dark:bg-white/4 bg-gray-50 rounded-xl mb-4 border dark:border-white/6 border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-love-gradient flex items-center justify-center text-lg flex-shrink-0">
              {product.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold dark:text-white text-gray-900">{product.seller}</p>
                {product.verified && <Shield className="w-3.5 h-3.5 text-brand-pink" />}
              </div>
              <p className="text-xs dark:text-gray-400 text-gray-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {product.location}
              </p>
            </div>
          </div>

          {/* Shipping */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 flex items-center gap-2 p-3 dark:bg-white/4 bg-gray-50 rounded-xl border dark:border-white/6 border-gray-100">
              <Truck className="w-4 h-4 text-emerald-500" />
              <div>
                <p className="text-[10px] dark:text-gray-500 text-gray-400">Delivery</p>
                <p className="text-xs font-semibold dark:text-white text-gray-900">3–7 days</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2 p-3 dark:bg-white/4 bg-gray-50 rounded-xl border dark:border-white/6 border-gray-100">
              <Package className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-[10px] dark:text-gray-500 text-gray-400">Status</p>
                <p className={`text-xs font-semibold ${product.inStock ? 'text-emerald-500' : 'text-red-400'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>

          {/* Qty selector */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-semibold dark:text-white text-gray-900">Quantity</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors">
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold dark:text-white text-gray-900 w-6 text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="w-8 h-8 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center hover:text-brand-pink transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <button onClick={() => { onAddToCart(product.id, qty); onClose() }} disabled={!product.inStock}
            className="w-full py-4 rounded-2xl bg-love-gradient text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            {inCart > 0 ? `Update Cart (${inCart + qty})` : `Add to Cart · $${(product.price * qty).toFixed(2)}`}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<Record<number, number>>({})
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'rating'>('popular')

  const toggleFav = (id: number) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  const addToCart = (id: number, qty: number) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + qty }))
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)

  let filtered = products.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  if (sortBy === 'price_asc')  filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sortBy === 'price_desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sortBy === 'rating')     filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  if (sortBy === 'popular')    filtered = [...filtered].sort((a, b) => b.sold - a.sold)

  return (
    <div className="h-full flex flex-col dark:bg-[#0D0A14] bg-gray-50">

      {/* Header */}
      <div className="px-4 sm:px-6 py-4 dark:bg-[#130E1E] bg-white border-b dark:border-white/6 border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-display text-xl font-black dark:text-white text-gray-900">Marketplace 🛍️</h1>
            <p className="text-xs dark:text-gray-500 text-gray-500">{filtered.length} products · Africa & beyond</p>
          </div>
          <div className="flex items-center gap-2">
            {cartCount > 0 && (
              <div className="relative">
                <button className="w-9 h-9 rounded-xl dark:bg-white/5 bg-gray-100 border dark:border-white/8 border-gray-200 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 dark:text-gray-400 text-gray-600" />
                </button>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-love-gradient text-white text-[9px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
            )}
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs dark:bg-white/5 bg-gray-100 border dark:border-white/8 border-gray-200 dark:text-gray-300 text-gray-700 rounded-xl px-2 py-2 focus:outline-none focus:border-brand-pink">
              <option value="popular">Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-gray-500 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products, sellers..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-200 dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors text-sm" />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${activeCategory === cat ? 'bg-love-gradient text-white shadow-md shadow-pink-500/20' : 'dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-600 hover:text-brand-pink'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 px-4 sm:px-6 py-2.5 dark:bg-[#0D0A14] bg-gray-50 border-b dark:border-white/4 border-gray-100 flex-shrink-0 overflow-x-auto scrollbar-hide">
        {[
          { icon: TrendingUp, label: '50K+ listings', color: 'text-emerald-500' },
          { icon: Shield, label: 'Verified sellers', color: 'text-blue-500' },
          { icon: Truck, label: 'Pan-Africa delivery', color: 'text-purple-500' },
          { icon: Tag, label: 'Best prices', color: 'text-amber-500' },
        ].map(s => (
          <div key={s.label} className="flex items-center gap-1.5 flex-shrink-0">
            <s.icon className={`w-3 h-3 ${s.color}`} />
            <span className="text-[10px] dark:text-gray-400 text-gray-500 whitespace-nowrap">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Product grid */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="dark:text-gray-400 text-gray-500">No products found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                onClick={() => setSelectedProduct(product)}
                className="dark:bg-[#130E1E] bg-white rounded-2xl border dark:border-white/6 border-gray-100 overflow-hidden hover:border-brand-pink/40 hover:shadow-lg hover:shadow-pink-500/5 transition-all cursor-pointer group">

                {/* Image */}
                <div className="relative h-32 dark:bg-gradient-to-br dark:from-pink-500/10 dark:to-purple-600/10 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-200">{product.emoji}</span>
                  {product.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-love-gradient text-white shadow-sm">{product.badge}</span>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-2xl">
                      <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">Out of Stock</span>
                    </div>
                  )}
                  <button onClick={e => { e.stopPropagation(); toggleFav(product.id) }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full dark:bg-black/40 bg-white/90 flex items-center justify-center hover:scale-110 transition-all shadow-sm">
                    <Heart className={`w-3.5 h-3.5 ${favorites.includes(product.id) ? 'text-brand-pink fill-brand-pink' : 'dark:text-gray-400 text-gray-500'}`} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-bold dark:text-white text-gray-900 mb-1 truncate leading-tight">{product.name}</p>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] dark:text-gray-400 text-gray-600">{product.rating}</span>
                    <span className="text-[10px] dark:text-gray-500 text-gray-400">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="w-2.5 h-2.5 dark:text-gray-500 text-gray-400" />
                    <span className="text-[9px] dark:text-gray-500 text-gray-400 truncate">{product.location}</span>
                    {product.verified && <Shield className="w-2.5 h-2.5 text-brand-pink ml-auto flex-shrink-0" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-brand-pink">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[9px] dark:text-gray-600 text-gray-400 line-through ml-1">${product.originalPrice}</span>
                      )}
                    </div>
                    <button onClick={e => { e.stopPropagation(); addToCart(product.id, 1) }} disabled={!product.inStock}
                      className="w-7 h-7 rounded-lg bg-love-gradient flex items-center justify-center hover:scale-110 transition-all shadow-md shadow-pink-500/20 disabled:opacity-40">
                      <ShoppingCart className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Product Drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDrawer
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            cart={cart}
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
