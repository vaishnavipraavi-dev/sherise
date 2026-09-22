import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Heart,
  Home,
  Instagram,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import productSetCutout from "@/assets/product-set-cutout.png";
import productImage from "@/assets/p2.png";
import pouchImage from "@/assets/p3.png";
import pouchCutout from "@/assets/pouch-cutout.png";
import productCutout from "@/assets/product-cutout.png";
import { articles, cartAmount, ecommerceConfig, formatMoney, nav, product, productById } from "@/data/site";

type CartItem = { productId: string; quantity: number };
type Order = {
  id: string;
  date: string;
  quantity: number;
  amount: number | null;
  paymentMethod: string;
  customerName: string;
  mobile: string;
  address: string;
  status: string;
};
type Store = {
  cart: CartItem[];
  quantity: number;
  wishlist: string[];
  orders: Order[];
  cartOpen: boolean;
  setCartOpen(v: boolean): void;
  add(n?: number, productId?: string): void;
  buyNow(n?: number, productId?: string): void;
  remove(productId?: string): void;
  setQuantity(n: number, productId?: string): void;
  toggleWishlist(id?: string): void;
  isWishlisted(id?: string): boolean;
  addOrder(order: Order): void;
};

const StoreContext = createContext<Store | null>(null);
const storage = {
  cart: "sherise_cart",
  wishlist: "sherise_wishlist",
  orders: "sherise_orders",
};

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const useStore = () => {
  const value = useContext(StoreContext);
  if (!value) throw new Error("Store unavailable");
  return value;
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(() => readStorage(storage.cart, []));
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage(storage.wishlist, []));
  const [orders, setOrders] = useState<Order[]>(() => readStorage(storage.orders, []));
  const [cartOpen, setCartOpen] = useState(false);
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => window.localStorage.setItem(storage.cart, JSON.stringify(cart)), [cart]);
  useEffect(() => window.localStorage.setItem(storage.wishlist, JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => window.localStorage.setItem(storage.orders, JSON.stringify(orders)), [orders]);

  const setQuantity = (n: number, productId = product.id) => {
    const next = Math.max(0, Number.isFinite(n) ? n : 0);
    setCart((items) => next === 0
      ? items.filter((item) => item.productId !== productId)
      : items.some((item) => item.productId === productId)
        ? items.map((item) => item.productId === productId ? { ...item, quantity: next } : item)
        : [...items, { productId, quantity: next }]);
  };
  const add = (n = 1, productId = product.id) => {
    setCart((items) => {
      const current = items.find((item) => item.productId === productId)?.quantity ?? 0;
      const next = { productId, quantity: Math.max(1, current + n) };
      return current ? items.map((item) => item.productId === productId ? next : item) : [...items, next];
    });
    setCartOpen(true);
    toast.success("Added to your bag");
  };
  const buyNow = (n = 1, productId = product.id) => {
    setCart([{ productId, quantity: Math.max(1, n) }]);
    setCartOpen(false);
    void navigate({ to: "/checkout" });
  };
  const remove = (productId = product.id) => {
    setCart((items) => items.filter((item) => item.productId !== productId));
    toast("Removed from your bag");
  };
  const toggleWishlist = (id = product.id) => {
    setWishlist((items) => {
      const exists = items.includes(id);
      toast(exists ? "Removed from wishlist" : "Saved to wishlist");
      return exists ? items.filter((item) => item !== id) : [...items, id];
    });
  };
  const addOrder = (order: Order) => setOrders((items) => [order, ...items]);

  const value = useMemo<Store>(
    () => ({
      cart,
      quantity,
      wishlist,
      orders,
      cartOpen,
      setCartOpen,
      add,
      buyNow,
      remove,
      setQuantity,
      toggleWishlist,
      isWishlisted: (id = product.id) => wishlist.includes(id),
      addOrder,
    }),
    [cart, quantity, wishlist, orders, cartOpen],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function ButtonLink({ to, children, pale = false }: { to: string; children: ReactNode; pale?: boolean }) {
  return <Link to={to} className={pale ? "btn-secondary" : "btn-primary"}>{children}</Link>;
}

function Announcement() {
  const messages = ["Comfort that moves with you", "Release. Renew & Rise.", "Free shipping threshold is configurable"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % messages.length), 3500);
    return () => clearInterval(id);
  }, []);
  return <div className="announcement" aria-live="polite">{messages[i]}</div>;
}

export function Header() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const { quantity, wishlist, setCartOpen } = useStore();
  return (
    <>
      <Announcement />
      <header className="site-header">
        <div className="nav-wrap">
          <button className="icon-btn mobile-only" aria-label="Open menu" onClick={() => setMenu(true)}><Menu /></button>
          <Link to="/" className="brand" aria-label="SheRise home"><span>She</span>Rise<small>Release. Renew & Rise.</small></Link>
          <nav className="desktop-nav" aria-label="Primary">{nav.map(([label, to]) => <Link key={to} to={to} activeProps={{ className: "active" }} activeOptions={{ exact: to === "/" }}>{label}</Link>)}</nav>
          <div className="nav-actions">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearch(true)}><Search /></button>
            <Link to="/account" className="icon-btn desktop-icon" aria-label="Account"><UserRound /></Link>
            <Link to="/wishlist" className="icon-btn desktop-icon count-icon" aria-label="Wishlist"><Heart />{wishlist.length > 0 && <b>{wishlist.length}</b>}</Link>
            <button className="icon-btn cart-button" aria-label={`Cart with ${quantity} items`} onClick={() => setCartOpen(true)}><ShoppingBag />{quantity > 0 && <b>{quantity}</b>}</button>
          </div>
        </div>
      </header>
      {menu && <div className="overlay"><aside className="mobile-panel"><button className="icon-btn close" onClick={() => setMenu(false)} aria-label="Close menu"><X /></button><div className="brand">SheRise</div><nav>{[...nav, ["Account", "/account"] as const, ["Wishlist", "/wishlist"] as const].map(([label, to]) => <Link key={to} to={to} onClick={() => setMenu(false)}>{label}<ArrowRight /></Link>)}</nav></aside></div>}
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const suggestions = [
    { type: "Product", label: product.name, to: "/product/sherise-sanitary-pads" },
    ...articles.map((article) => ({ type: article.category, label: article.title, to: `/blog/${article.slug}` })),
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search">
      <button className="icon-btn close" onClick={onClose} aria-label="Close search"><X /></button>
      <div>
        <p className="eyebrow">SEARCH SHERISE</p>
        <label htmlFor="site-search">What are you looking for?</label>
        <div className="search-field"><Search /><input autoFocus id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, blog articles and period guides" /></div>
        <div className="search-results">{suggestions.map((item) => <Link key={item.to} to={item.to} onClick={onClose}><small>{item.type}</small><span>{item.label}</span></Link>)}</div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { cart, quantity, cartOpen, setCartOpen, setQuantity, remove } = useStore();
  const subtotal = cartAmount(cart);
  const moreForFreeShipping = subtotal === null ? null : Math.max(0, ecommerceConfig.freeShippingThreshold - subtotal);
  const progress = subtotal === null ? 35 : Math.min(100, (subtotal / ecommerceConfig.freeShippingThreshold) * 100);
  return (
    <>
      {cartOpen && <div className="drawer-scrim" onClick={() => setCartOpen(false)} />}
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <div className="drawer-head"><div><p className="eyebrow">YOUR BAG</p><h2>Comfort, on its way.</h2></div><button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>
        {quantity === 0 ? <EmptyBag compact /> : <>
          {cart.map((item) => {
            const current = productById(item.productId);
            return <div className="cart-line" key={item.productId}><img src={productImageFor(current.id)} alt={current.name} /><div><h3>{current.name}</h3><p>{current.variant}</p><strong>{formatMoney(current.price)}</strong><QuantityStepper value={item.quantity} onChange={(next) => setQuantity(next, current.id)} /><button className="text-link" onClick={() => remove(current.id)}>Remove</button></div></div>;
          })}
          <div className="shipping"><span>{moreForFreeShipping === null ? "Free-shipping threshold is configurable" : moreForFreeShipping === 0 ? "Your bag qualifies for free shipping" : `Add ₹${moreForFreeShipping} more for free shipping`}</span><div><i style={{ width: `${progress}%` }} /></div></div>
          <div className="drawer-total"><span>Subtotal</span><strong>{formatMoney(subtotal)}</strong></div>
          <ButtonLink to="/cart">VIEW CART</ButtonLink>
          <ButtonLink to="/checkout" pale>CHECKOUT</ButtonLink>
          <button className="text-link" onClick={() => setCartOpen(false)}>Continue Shopping</button>
        </>}
      </aside>
    </>
  );
}

export function Footer() {
  const whatsappHref = ecommerceConfig.whatsappNumber
    ? `https://wa.me/${ecommerceConfig.whatsappNumber}?text=${encodeURIComponent("Hi SheRise, I need help with my order.")}`
    : "/contact";
  return (
    <>
      <nav className="bottom-nav" aria-label="Mobile shopping navigation">
        <Link to="/"><Home /><span>Home</span></Link>
        <Link to="/shop"><ShoppingBag /><span>Shop</span></Link>
        <Link to="/wishlist"><Heart /><span>Wishlist</span></Link>
        <button onClick={() => window.dispatchEvent(new Event("sherise-open-search"))}><Search /><span>Search</span></button>
        <Link to="/cart"><ShoppingBag /><span>Bag</span></Link>
      </nav>
      <section className="newsletter"><div><p className="eyebrow">A NOTE FROM OUR CIRCLE</p><h2>Period talk, self-care & a little love.</h2><p>Join the SheRise circle for product updates, period-care tips and special offers.</p></div><form onSubmit={(e) => e.preventDefault()}><label className="sr-only" htmlFor="email">Email</label><input id="email" type="email" placeholder="Your email address" required /><button className="btn-dark">JOIN THE CIRCLE</button></form></section>
      <footer><div className="footer-main"><div><div className="brand large">SheRise<small>Release. Renew & Rise.</small></div><p>Thoughtful period care made to support softer, confident days.</p><div className="social"><Instagram /><MessageCircle /></div></div><FooterLinks title="SHOP" items={[["Shop SheRise", "/shop"], ["Sanitary Pads", "/product/sherise-sanitary-pads"], ["Wishlist", "/wishlist"]]} /><FooterLinks title="ACCOUNT" items={[["Login", "/login"], ["Register", "/register"], ["My Account", "/account"], ["Track Order", "/track-order"]]} /><FooterLinks title="DISCOVER" items={[["Why SheRise", "/why-sherise"], ["Our Story", "/our-story"], ["Period Guide", "/period-guide"], ["Blog", "/blog"]]} /><FooterLinks title="HELP" items={[["Contact Us", "/contact"], ["FAQs", "/faq"], ["Shipping & Returns", "/shipping-returns"]]} /><FooterLinks title="LEGAL" items={[["Privacy Policy", "/privacy-policy"], ["Terms & Conditions", "/terms"]]} /></div><div className="footer-bottom"><span>© 2026 SheRise. All Rights Reserved.</span><span>Payment gateway and shipping provider integration pending.</span></div></footer>
      <a className="whatsapp" href={whatsappHref} aria-label="WhatsApp support"><MessageCircle /></a>
    </>
  );
}

function FooterLinks({ title, items }: { title: string; items: string[][] }) {
  return <div><h3>{title}</h3>{items.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</div>;
}

export function Layout({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState(false);
  useEffect(() => {
    const open = () => setSearch(true);
    window.addEventListener("sherise-open-search", open);
    return () => window.removeEventListener("sherise-open-search", open);
  }, []);
  return <StoreProvider><Header /><main>{children}</main><Footer /><CartDrawer />{search && <SearchOverlay onClose={() => setSearch(false)} />}</StoreProvider>;
}

export function ProductVisual({ compact = false, variant = "main" }: { compact?: boolean; variant?: "main" | "set" | "pouch" }) {
  const image = variant === "set" ? productSetCutout : variant === "pouch" ? pouchCutout : productCutout;
  return (
    <div className={`product-visual ${compact ? "compact" : ""} visual-${variant}`}>
      <span className="petal petal-one" />
      <span className="petal petal-two" />
      <span className="petal petal-three" />
      <span className="spark">*</span>
      <img src={image} alt="Original SheRise sanitary pad package in pink, coral, lavender and blue packaging" />
      <span className="float-tag tag-one">XXL</span>
      <span className="float-tag tag-two">320 mm</span>
      <span className="float-tag tag-three">Medium</span>
      <span className="float-tag tag-four">2 Count</span>
    </div>
  );
}

export function QuantityStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return <div className="stepper"><button onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus /></button><span>{value}</span><button onClick={() => onChange(value + 1)} aria-label="Increase quantity"><Plus /></button></div>;
}

export function QuantityAdd({ label = "ADD TO CART", buy = false, productId = product.id }: { label?: string; buy?: boolean; productId?: string }) {
  const [count, setCount] = useState(1);
  const { add, buyNow } = useStore();
  const current = productById(productId);
  return <div className="buy-row"><QuantityStepper value={count} onChange={setCount} /><button className="btn-primary" onClick={() => buy ? buyNow(count, productId) : add(count, productId)} disabled={!current.inStock}>{current.inStock ? label : "OUT OF STOCK"}</button></div>;
}

export function productImageFor(productId: string) {
  if (productId === "sherise-premium-multi-pack") return productSetCutout;
  if (productId === "sherise-single-pack") return pouchCutout;
  return productImage;
}

export function EmptyBag({ compact = false }: { compact?: boolean }) {
  return <div className={`empty-cart ${compact ? "compact" : ""}`}><ShoppingBag /><h2>Your bag feels a little light.</h2><p>Let's add some comfort.</p><ButtonLink to="/shop">SHOP NOW</ButtonLink></div>;
}
