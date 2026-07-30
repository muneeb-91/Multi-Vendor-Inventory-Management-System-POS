import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  UserPlus,
  Printer,
  MoreHorizontal,
  ShoppingBag,
} from "lucide-react";
import { catalogue, categories } from "../../data";
import OrderSuccessful from "../../components/vendor/OrderSuccessful";


const TAX_RATE   = 0.085;
const DISCOUNT   = 10;

const fmt = (n) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CreateOrder = () => {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [search, setSearch]   = useState("");
  const [ordered, setOrdered] = useState(false);
  const [cartItems, setCartItems] = useState([
    { ...catalogue[0], qty: 2 },
    { ...catalogue[1], qty: 1 },
  ]);

  const visible = catalogue.filter((p) => {
    const matchCat    = activeCategory === "All Items" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) =>
    setCartItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0)
    );

  const removeItem = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal    = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const tax         = subtotal * TAX_RATE;
  const total       = subtotal + tax - DISCOUNT;
  const totalQty    = cartItems.reduce((s, i) => s + i.qty, 0);

  if (ordered) {
    return <OrderSuccessful />
  }

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        to="/vendor/orders"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Link>

      <h1 className="text-2xl font-bold text-primary">Create Order</h1>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* ── LEFT: Product browser ─────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Filters row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-secondary text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative sm:ml-auto">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full sm:w-48 pl-9 pr-4 py-1.5 rounded-lg border border-gray-200 text-sm placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
          </div>

          {/* ── Product grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {visible.map((p) => {
              const inCart     = cartItems.find((i) => i.id === p.id);
              const outOfStock = p.stock === 0;

              return (
                <button
                  key={p.id}
                  onClick={() => addToCart(p)}
                  disabled={outOfStock}
                  className={`relative bg-white border rounded-xl p-3 text-left flex flex-col gap-2.5 transition-all group w-full ${
                    outOfStock
                      ? "opacity-50 cursor-not-allowed border-gray-100"
                      : inCart
                      ? "border-secondary ring-2 ring-secondary/20 cursor-pointer shadow-sm"
                      : "border-gray-100 cursor-pointer hover:border-secondary/40 hover:shadow-sm"
                  }`}
                >
                  {/* Out of stock badge */}
                  {outOfStock && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-md">
                      OUT OF STOCK
                    </span>
                  )}

                  {/* Qty badge */}
                  {inCart && !outOfStock && (
                    <span className="absolute top-2 right-2 w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-white text-[10px] font-bold z-10">
                      {inCart.qty}
                    </span>
                  )}

                  {/* Icon box */}
                  <div className={`w-full rounded-lg flex items-center justify-center py-4 transition-colors ${
                    inCart ? "bg-secondary/8" : "bg-gray-50 group-hover:bg-secondary/5"
                  }`}>
                    <p.Icon className={`w-7 h-7 transition-colors ${
                      inCart ? "text-secondary" : "text-gray-400 group-hover:text-secondary/70"
                    }`} />
                  </div>

                  {/* Text info — fixed width container prevents overflow */}
                  <div className="w-full overflow-hidden">
                    <p className="text-xs font-semibold text-primary leading-snug line-clamp-2 wrap-break-words">
                      {p.name}
                    </p>
                    <p className="text-[10px] font-mono text-gray-400 mt-0.5 truncate">
                      {p.sku}
                    </p>
                    <p className="text-sm font-bold text-primary mt-1.5">
                      {fmt(p.price)}
                    </p>
                  </div>
                </button>
              );
            })}

            {visible.length === 0 && (
              <div className="col-span-full py-16 text-center text-sm text-gray-400">
                No products found.
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Current Order panel ────────────────────────── */}
        <div className="w-full lg:w-80 shrink-0 bg-white border border-gray-100 rounded-xl flex flex-col sticky top-20">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-primary">Current Order</h2>
            <span className="font-mono text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">
              #ORD-8924
            </span>
          </div>

          {/* Customer */}
          <div className="px-5 pt-4 pb-3 border-b border-gray-100 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Customer Details
              </p>
              <button className="flex items-center gap-1 text-xs text-secondary hover:underline cursor-pointer">
                <UserPlus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="text-sm text-gray-700">Acme Corp</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.1 1.11h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
              </svg>
              <span className="text-sm text-gray-700">+1 (555) 019-2834</span>
            </div>
          </div>

          {/* Cart items */}
          <div className="flex-1 px-5 py-3 space-y-3 overflow-y-auto max-h-56">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
                <ShoppingBag className="w-8 h-8 text-gray-200" />
                <p className="text-sm">Tap a product to add</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="space-y-2 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary leading-tight truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">{fmt(item.price)} / ea</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-sm font-semibold text-primary">
                        {fmt(item.price * item.qty)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-400 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                    >
                      <Minus className="w-3 h-3 text-gray-500" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-primary">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals */}
          <div className="px-5 py-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal ({totalQty} {totalQty === 1 ? "item" : "items"})</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Tax (8.5%)</span>
              <span>{fmt(tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-secondary">
              <span>Discount</span>
              <span>-{fmt(DISCOUNT)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-primary pt-2 border-t border-gray-100">
              <span>Total</span>
              <span className="text-xl">{fmt(total)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-5 pb-5 space-y-2">
            <button
              onClick={() => cartItems.length > 0 && setOrdered(true)}
              disabled={cartItems.length === 0}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors ${
                cartItems.length > 0
                  ? "bg-secondary hover:bg-secondary/90 text-white cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 9V7a5 5 0 0 0-10 0v2M5 9h14l1 12H4L5 9z"/>
              </svg>
              Complete Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
