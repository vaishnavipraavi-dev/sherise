import { useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "@/lib/router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  Droplets,
  Feather,
  Heart,
  Home,
  Leaf,
  LocateFixed,
  Lock,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  UserRound,
} from "lucide-react";
import productImage from "@/assets/p2.png";
import productSetImage from "@/assets/p1.png";
import pouchImage from "@/assets/p3.png";
const slowMorningImage = "https://i.pinimg.com/1200x/ba/fa/db/bafadb9cf9a0942c8fb4e6464f3df854.jpg";
const homeHeroImage = "https://i.pinimg.com/1200x/8e/2d/c4/8e2dc457609daf668649b48c8ecf8208.jpg";
import { articles, cartAmount, createOrderId, ecommerceConfig, formatMoney, product, productById, products } from "@/data/site";
import { ButtonLink, EmptyBag, ProductVisual, QuantityAdd, QuantityStepper, productImageFor, useStore } from "./store";

const trustItems = [
  [Feather, "Soft & Comfortable"],
  [ShieldCheck, "Secure Payments"],
  [Truck, "Fast Delivery Ready"],
  [PackageCheck, "Easy Ordering"],
] as const;

export function HomePage() {
  return <>
    <section className="hero image-hero" style={{ "--hero-image": `url(${homeHeroImage})` } as CSSProperties}><div className="hero-copy"><p className="badge">PERIOD CARE, MADE FOR YOU</p><h1>Rise Above<br /><em>Period Discomfort.</em></h1><p>{product.description}</p><div className="hero-actions"><ButtonLink to="/shop">SHOP NOW <ArrowRight /></ButtonLink><ButtonLink to="/why-sherise" pale>WHY SHERISE?</ButtonLink></div></div></section>
    <TrustStrip />
    <section className="product-show section"><div className="section-heading"><p className="eyebrow">ONE ESSENTIAL. THOUGHTFULLY MADE.</p><h2>Meet Your Period-Day Essential</h2></div><div className="showcase"><ProductVisual compact variant="set" /><div className="product-copy"><div className="badge-row"><span>COMFORT PICK</span><span>MEDIUM FLOW</span></div><h2>{product.name}</h2><p>{product.description}</p><div className="facts">{product.facts.map((x) => <span key={x}>{x}</span>)}</div><p className="price">{formatMoney(product.price)} <small>Retail pricing is configurable</small></p><QuantityAdd /><ButtonLink to="/product/sherise-sanitary-pads" pale>VIEW PRODUCT DETAILS</ButtonLink></div></div></section>
    <Benefits />
    <PurposeSection />
    <section className="statement"><div><p className="eyebrow">SHERISE</p><h2>Made for your period.<br /><em>Designed for your confidence.</em></h2><p>SheRise brings thoughtful period care into everyday life with a focus on comfort, confidence and ease.</p><ButtonLink to="/shop">SHOP SHERISE</ButtonLink></div><ProductVisual compact variant="pouch" /></section>
    <section className="editorial section"><div className="editorial-art art-rest"><img src={slowMorningImage} alt="Slow morning comfort" /></div><div className="editorial-copy"><p className="eyebrow">YOUR DAY, YOUR RHYTHM</p><h2>Comfort for every version of you.</h2><p>From quiet mornings to days that do not slow down, SheRise is designed around real routines and everyday confidence.</p><ul><li><Check /> Soft, considered period care</li><li><Check /> Designed to move with your day</li><li><Check /> A simple essential, without the noise</li></ul></div></section>
    <Steps />
    <Education />
  </>;
}

export function TrustStrip() {
  return <section className="trust-strip">{trustItems.map(([Icon, title]) => <div key={title}><Icon /><span>{title}</span></div>)}</section>;
}

export function Benefits() {
  const data = [[Feather, "Comfort First", "Designed to keep everyday period care comfortable."], [Heart, "Moves With You", "For busy days, restful nights and everything between."], [ShieldCheck, "Confidence Through Every Flow", "Thoughtful protection for period days."], [Sparkles, "Made for Women", "Period care designed around real everyday needs."]] as const;
  return <section className="benefits section"><div className="section-heading"><p className="eyebrow">WHY SHERISE</p><h2>Made with You in Mind</h2></div><div className="benefit-grid">{data.map(([Icon, title, copy], index) => <article key={title}><span className="number">0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>;
}

export function PurposeSection() {
  const craftedForWomenImage = "https://i.pinimg.com/736x/09/f9/49/09f9498aa9df38b209a5a6ec3fcbafb6.jpg";
  const kindToSkinImage = "https://i.pinimg.com/236x/50/c0/5d/50c05d902e34af8236db67fcdb023987.jpg";
  const kindToPlanetImage = "https://i.pinimg.com/736x/c5/e2/5c/c5e25c5f330082186623565b2c108150.jpg";
  const data = [
    [Heart, "Crafted for women", "Comfort-focused period care made for everyday confidence.", craftedForWomenImage, "purpose-women"],
    [Feather, "Kind to skin", "Soft essentials designed to feel gentle through busy days and restful nights.", kindToSkinImage, "purpose-skin"],
    [Leaf, "Kind to planet", "Thoughtful care with a cleaner, calmer visual story for modern routines.", kindToPlanetImage, "purpose-planet"],
  ] as const;
  return <section className="purpose section"><div className="section-heading"><p className="eyebrow">SHERISE PROMISE</p><h2>Made with a Purpose</h2><p>Period care that feels soft, looks premium and keeps real women at the center.</p></div><div className="purpose-grid">{data.map(([Icon, title, copy, image, tone]) => <article className={tone} key={title}><div className="purpose-art"><Icon /><img src={image} alt={title} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>;
}

export function Steps() {
  return <section className="steps section"><div className="section-heading"><p className="eyebrow">PERIOD CARE, MADE SIMPLE</p><h2>A complete shopping flow that feels easy.</h2></div><div className="step-grid">{["Choose SheRise", "Add to Bag", "Secure Checkout", "Track Order"].map((x, i) => <div key={x}><b>0{i + 1}</b><span>{x}</span></div>)}</div></section>;
}

export function Education() {
  return <section className="education section"><div className="section-heading split"><div><p className="eyebrow">THE PERIOD EDIT</p><h2>Let's Talk Periods</h2></div><ButtonLink to="/period-guide" pale>EXPLORE THE GUIDE</ButtonLink></div><div className="article-grid">{articles.map((article, index) => <Link to="/blog/$slug" params={{ slug: article.slug }} className="article-card" key={article.slug}><div className={`article-art article-${index}`}><img src={article.image} alt={article.title} /></div><p className="eyebrow">{article.category}</p><h3>{article.title}</h3><p>{article.excerpt}</p><span>READ MORE <ArrowRight /></span></Link>)}</div></section>;
}

export function ShopPage() {
  const { toggleWishlist, isWishlisted, buyNow } = useStore();
  return <><PageHero eyebrow="SHOP SHERISE" title="Period Care, Made for You." copy="Choose from the current SheRise product formats shown in the supplied package assets." /><section className="section shop-section"><div className="shop-tools"><span>{products.length} products</span><label>Sort by <select><option>Featured</option><option>Newest</option></select></label></div><div className="product-grid">{products.map((item) => <article className="product-card" key={item.id}><Link to="/product/sherise-sanitary-pads"><div className="product-card-image"><img src={productImageFor(item.id)} alt={item.name} /></div></Link><button className={`heart-btn ${isWishlisted(item.id) ? "active" : ""}`} aria-label="Add to wishlist" onClick={() => toggleWishlist(item.id)}><Heart /></button><p className="eyebrow">{item.id === product.id ? "COMFORT PICK" : "SHERISE"}</p><Link to="/product/sherise-sanitary-pads"><h2>{item.name}</h2></Link><p>{item.variant}</p><Rating /><strong>{formatMoney(item.price)} <small>MRP {formatMoney(item.mrp)}</small></strong><QuantityAdd productId={item.id} /><button className="btn-secondary wide" onClick={() => buyNow(1, item.id)}>BUY NOW</button><ButtonLink to="/product/sherise-sanitary-pads" pale>QUICK VIEW</ButtonLink></article>)}</div></section></>;
}

export function ProductPage() {
  const [active, setActive] = useState(0);
  const [pin, setPin] = useState("");
  const { toggleWishlist, isWishlisted, buyNow } = useStore();
  const validPin = /^\d{6}$/.test(pin);
  const galleryImages = [
    ["Main package", productImage],
    ["Product range", productSetImage],
    ["Single pack", pouchImage],
  ] as const;
  const selectedImage = galleryImages[active]?.[1] ?? productImage;
  return <><section className="pdp section"><div className="gallery"><div className="main-image"><button className="gallery-nav" onClick={() => setActive((active + galleryImages.length - 1) % galleryImages.length)} aria-label="Previous image">‹</button><img src={selectedImage} alt="Original SheRise sanitary pad package" /><button className="gallery-nav next" onClick={() => setActive((active + 1) % galleryImages.length)} aria-label="Next image">›</button></div><div className="thumbs">{galleryImages.map(([x, src], i) => <button className={active === i ? "active" : ""} onClick={() => setActive(i)} key={x}><img src={src} alt={x} /></button>)}</div></div><div className="pdp-info"><p className="breadcrumb"><Link to="/">Home</Link> / Sanitary Pads / {product.name}</p><p className="eyebrow">SHERISE PERIOD CARE</p><h1>{product.name}</h1><p className="tagline">"{product.tagline}"</p><Rating /><p>{product.description}</p><div className="pdp-price"><span>MRP {formatMoney(product.mrp)}</span><strong>{formatMoney(product.price)}</strong><b>{product.discountPercent === null ? "Discount configurable" : `${product.discountPercent}% OFF`}</b><small>Inclusive of all taxes</small></div><div className="pdp-facts">{product.facts.map((fact) => <div key={fact}><Check /><span>{fact}</span></div>)}</div><QuantityAdd /><button className="btn-secondary wide" onClick={() => buyNow(1)}>BUY NOW</button><button className={`wishlist-inline ${isWishlisted() ? "active" : ""}`} onClick={() => toggleWishlist()}><Heart /> Wishlist</button><div className="mini-trust">{trustItems.map(([Icon, text]) => <span key={text}><Icon />{text}</span>)}</div><div className="pincode"><label>Check Delivery Availability</label><div><input value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="Enter PIN code" /><button className="btn-secondary">CHECK</button></div>{pin && <small>{validPin ? "PIN format looks valid. Delivery estimate will appear after shipping integration." : "Enter a valid six-digit Indian PIN code."}</small>}</div></div></section><ProductDetails /><div className="mobile-buy"><div><strong>{product.name}</strong><span>{formatMoney(product.price)}</span></div><QuantityAdd /></div></>;
}

function ProductDetails() {
  const entries = [["Description", product.description], ["Features", "XXL length, 320 mm size, two-count pack and medium-flow indication, as shown on the supplied packaging."], ["How to Use", "Remove the pad from its wrapper, place the adhesive side securely on clean underwear, and adjust for comfort."], ["Disposal", "Wrap used pads securely in their wrapper or paper and place them in an appropriate waste bin. Do not flush."], ["Shipping", "Standard delivery fee and free-shipping threshold are configurable. Exact delivery dates require a shipping provider integration."], ["FAQ", "Product, order and period-care questions are available on the FAQ page."]];
  return <section className="details section"><h2>Everything you need to know</h2>{entries.map(([title, copy]) => <details key={title}><summary>{title}<ChevronDown /></summary><p>{copy}</p></details>)}</section>;
}

export function CartPage() {
  const { cart, quantity, setQuantity, remove } = useStore();
  return <><PageHero eyebrow="YOUR BAG" title="A softer day starts here." copy="Review your SheRise essentials before checkout." /><section className="cart-page section">{quantity === 0 ? <EmptyBag /> : <><div>{cart.map((item) => { const current = productById(item.productId); return <div className="cart-page-line" key={item.productId}><img src={productImageFor(current.id)} alt={current.name} /><div><h2>{current.name}</h2><p>{current.variant}</p><QuantityStepper value={item.quantity} onChange={(next) => setQuantity(next, current.id)} /><button onClick={() => remove(current.id)} className="text-link">Remove</button></div><strong>{formatMoney(current.price)}</strong></div>; })}</div><OrderSummary cta="PROCEED TO CHECKOUT" to="/checkout" showCoupon /></>}</section></>;
}

function OrderSummary({ cta, to, showCoupon = false }: { cta?: string; to?: string; showCoupon?: boolean }) {
  const { cart, quantity } = useStore();
  const subtotal = cartAmount(cart);
  const shipping = subtotal !== null && subtotal >= ecommerceConfig.freeShippingThreshold ? 0 : ecommerceConfig.standardShippingFee;
  const total = subtotal === null ? null : subtotal + shipping;
  return (
    <aside className="order-summary">
      <h2>Order Summary</h2>
      {cart.map((item) => { const current = productById(item.productId); return <div className="summary-product" key={item.productId}><img src={productImageFor(current.id)} alt="" /><span>{current.name}<small>x {item.quantity}</small></span></div>; })}
      {showCoupon && (
        <div className="coupon">
          <label>Have a coupon?</label>
          <div><input placeholder="ENTER CODE" /><button>APPLY</button></div>
          <small>Coupon rules are configurable. No demo codes are hardcoded.</small>
        </div>
      )}
      <p><span>Subtotal</span><b>{formatMoney(subtotal)}</b></p>
      <p><span>Discount</span><b>Configurable</b></p>
      <p><span>Shipping</span><b>{subtotal === null ? "Calculated later" : shipping === 0 ? "Free" : formatMoney(shipping)}</b></p>
      <p className="total"><span>Total</span><b>{formatMoney(total)}</b></p>
      <div className="payment-badges"><span>UPI</span><span>Cards</span><span>Net Banking</span><span>COD</span></div>
      {cta && to ? <ButtonLink to={to}>{cta}</ButtonLink> : null}
      <small>Backend must verify product price, discounts, shipping and payment before production order creation.</small>
    </aside>
  );
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, quantity, addOrder } = useStore();
  const [payment, setPayment] = useState("cod");
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", pin: "", house: "", street: "", landmark: "", city: "", state: "", type: "Home", save: false });
  const mobileValid = /^[6-9]\d{9}$/.test(form.mobile);
  const pinValid = /^\d{6}$/.test(form.pin);
  const ready = quantity > 0 && form.name && mobileValid && pinValid && form.house && form.street && form.city && form.state;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!ready || processing) return;
    setProcessing(true);
    const orderId = createOrderId();
    addOrder({ id: orderId, date: new Date().toLocaleDateString("en-IN"), quantity, amount: cartAmount(cart), paymentMethod: payment.toUpperCase(), customerName: form.name, mobile: form.mobile, address: `${form.house}, ${form.street}, ${form.city}, ${form.state} - ${form.pin}`, status: payment === "cod" ? "Confirmed" : "Payment Pending" });
    setTimeout(() => void navigate({ to: "/order-success", search: { order: orderId } }), 700);
  };
  if (quantity === 0) return <><CheckoutHeader /><section className="section"><EmptyBag /></section></>;
  return <><CheckoutHeader /><section className="checkout section"><form onSubmit={submit} className="checkout-form"><Progress current={payment ? 2 : 1} /><CheckoutBlock title="Contact Information"><label>Full Name *<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label><label>Mobile Number *<input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })} inputMode="tel" required /></label>{form.mobile && !mobileValid && <small className="field-error">Enter a valid Indian mobile number.</small>}<label>Email Address<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label></CheckoutBlock><CheckoutBlock title="Shipping Address"><div className="form-grid"><label>Pincode *<input value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, "").slice(0, 6) })} inputMode="numeric" required /></label><label>House / Flat / Building *<input value={form.house} onChange={(e) => setForm({ ...form, house: e.target.value })} required /></label><label>Street / Area *<input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} required /></label><label>Landmark<input value={form.landmark} onChange={(e) => setForm({ ...form, landmark: e.target.value })} /></label><label>City *<input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required /></label><label>State *<input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required /></label></div>{form.pin && !pinValid && <small className="field-error">Enter a valid six-digit Indian PIN code.</small>}<p className="country">Country: India</p><div className="segmented">{["Home", "Work", "Other"].map((x) => <button type="button" className={form.type === x ? "active" : ""} onClick={() => setForm({ ...form, type: x })} key={x}>{x}</button>)}</div><label className="check-row"><input type="checkbox" checked={form.save} onChange={(e) => setForm({ ...form, save: e.target.checked })} /> Save this address</label></CheckoutBlock><CheckoutBlock title="Delivery Method"><div className="delivery-option"><Truck /><span><b>Standard Delivery</b><small>{formatMoney(ecommerceConfig.standardShippingFee)} unless cart qualifies for free shipping. Exact delivery dates require shipping integration.</small></span></div></CheckoutBlock><CheckoutBlock title="Payment"><PaymentMethods payment={payment} setPayment={setPayment} /></CheckoutBlock><button className="btn-primary place-order" disabled={!ready || processing}>{processing ? "PROCESSING..." : "PLACE ORDER"}</button></form><OrderSummary /></section></>;
}

function CheckoutHeader() {
  return <header className="checkout-header"><Link to="/" className="brand"><span>She</span>Rise</Link><strong><Lock /> Secure Checkout</strong></header>;
}

function CheckoutBlock({ title, children }: { title: string; children: ReactNode }) {
  return <section className="checkout-block"><h2>{title}</h2>{children}</section>;
}

function Progress({ current }: { current: number }) {
  return <div className="checkout-progress">{["BAG", "ADDRESS", "PAYMENT", "DONE"].map((step, index) => <span className={index <= current ? "active" : ""} key={step}>{step}</span>)}</div>;
}

function PaymentMethods({ payment, setPayment }: { payment: string; setPayment: (value: string) => void }) {
  const methods = ["upi", "credit card", "debit card", "net banking", "cod"];
  return <div className="payment-methods">{methods.map((method) => <button type="button" className={payment === method ? "active" : ""} onClick={() => setPayment(method)} key={method}>{method.toUpperCase()}</button>)}{payment === "upi" && <div className="payment-panel"><label>UPI ID<input placeholder="name@bank" /></label><button type="button" className="btn-secondary">VERIFY / PAY</button><p>Google Pay, PhonePe and Paytm can be connected through a payment gateway.</p></div>}{payment.includes("card") && <div className="payment-panel"><label>Card Number<input inputMode="numeric" placeholder="Handled by gateway in production" /></label><label>Name on Card<input /></label><div className="form-grid"><label>Expiry<input placeholder="MM/YY" /></label><label>CVV<input inputMode="numeric" /></label></div><small>Raw card details must never be stored in frontend state or localStorage.</small></div>}{payment === "net banking" && <div className="payment-panel"><label>Select Bank<select><option>Choose bank during gateway checkout</option></select></label></div>}{payment === "cod" && <div className="payment-panel"><p>Pay when your order is delivered.</p></div>}</div>;
}

export function OrderSuccessPage() {
  const { orders } = useStore();
  const order = orders[0];
  return <><section className="success-hero"><div className="success-mark"><Check /></div><h1>Your order is confirmed!</h1><p>Thank you for choosing SheRise. Your period-care essentials are on their way.</p></section><section className="order-card section"><div className="petal-confetti" /><dl>{[["Order ID", order?.id ?? "Demo order pending"], ["Date", order?.date ?? new Date().toLocaleDateString("en-IN")], ["Product", product.name], ["Quantity", String(order?.quantity ?? 1)], ["Amount", formatMoney(order?.amount ?? null)], ["Payment Method", order?.paymentMethod ?? "COD"], ["Shipping Address", order?.address ?? "Address captured during checkout"]].map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><div className="hero-actions"><ButtonLink to="/track-order">TRACK ORDER</ButtonLink><ButtonLink to="/shop" pale>CONTINUE SHOPPING</ButtonLink></div></section></>;
}

export function TrackOrderPage() {
  const { orders } = useStore();
  const [orderId, setOrderId] = useState(orders[0]?.id ?? "");
  const [mobile, setMobile] = useState(orders[0]?.mobile ?? "");
  const found = orders.find((order) => order.id === orderId);
  return <><PageHero eyebrow="ORDER TRACKING" title="Where's My SheRise Order?" copy="Enter your order ID and mobile number to view the current order status." /><section className="track section"><div className="track-form"><label>Order ID<input value={orderId} onChange={(e) => setOrderId(e.target.value)} /></label><label>Mobile Number<input value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} inputMode="tel" /></label><button className="btn-primary">TRACK ORDER</button></div><Timeline active={found ? 1 : 0} /><p className="center-note">Actual shipment tracking will appear after backend and shipping provider integration.</p></section></>;
}

function Timeline({ active }: { active: number }) {
  return <div className="timeline-status">{["Order Placed", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"].map((step, index) => <div className={index <= active ? "active" : ""} key={step}><PackageCheck /><span>{step}</span></div>)}</div>;
}

export function WishlistPage() {
  const { wishlist, toggleWishlist, add } = useStore();
  return <><PageHero eyebrow="WISHLIST" title="Saved for Softer Days." copy="Your locally saved SheRise favorites live here until account sync is connected." /><section className="section">{wishlist.length === 0 ? <div className="empty-cart"><Heart /><h2>Nothing saved yet</h2><ButtonLink to="/shop">EXPLORE SHERISE</ButtonLink></div> : <div className="single-product"><article className="product-card"><ProductVisual compact /><button className="heart-btn active" onClick={() => toggleWishlist()}><Heart /></button><h2>{product.name}</h2><p>{product.variant}</p><button className="btn-primary wide" onClick={() => add(1)}>ADD TO CART</button></article></div>}</section></>;
}

export function LoginPage() {
  return <AccountAuth mode="Login" copy="OTP login architecture is prepared. Real verification needs a backend service." />;
}

export function RegisterPage() {
  return <AccountAuth mode="Register" copy="Create an account shell for future orders, addresses and wishlist sync." />;
}

function AccountAuth({ mode, copy }: { mode: string; copy: string }) {
  return <><PageHero eyebrow="SHERISE ACCOUNT" title={`${mode} to SheRise`} copy={copy} /><section className="auth-card section"><label>Mobile Number<input inputMode="tel" placeholder="Indian mobile number" /></label><label>Email<input type="email" placeholder="you@example.com" /></label><button className="btn-primary">{mode.toUpperCase()}</button><small>OTP verification is not faked in this frontend demo.</small></section></>;
}

export function AccountPage() {
  const { orders, wishlist } = useStore();
  return <><PageHero eyebrow="MY ACCOUNT" title="Hello, SheRise friend" copy="Manage your orders, saved addresses, wishlist and profile when account backend is connected." /><section className="account section"><aside>{[["My Orders", "/account/orders"], ["Track Order", "/track-order"], ["Saved Addresses", "/account"], ["Wishlist", "/wishlist"], ["Profile", "/account"], ["Logout", "/login"]].map(([label, to]) => <Link key={label} to={to}>{label}<ArrowRight /></Link>)}</aside><div className="account-panel"><h2>Your Dashboard</h2><p>{orders.length ? `${orders.length} local order record found.` : "Your SheRise journey starts here."}</p><p>{wishlist.length} wishlist item saved locally.</p><ButtonLink to="/shop">SHOP NOW</ButtonLink></div></section></>;
}

export function OrdersPage() {
  const { orders } = useStore();
  return <><PageHero eyebrow="MY ORDERS" title="Your SheRise Orders" copy="Local demo order records appear here until the real backend is connected." /><section className="orders section">{orders.length === 0 ? <div className="empty-cart"><PackageCheck /><h2>Your SheRise journey starts here.</h2><ButtonLink to="/shop">SHOP NOW</ButtonLink></div> : orders.map((order) => <article key={order.id}><span>{order.id}</span><h2>{product.name}</h2><p>{order.date} - {formatMoney(order.amount)} - {order.status}</p><div><ButtonLink to="/track-order">TRACK ORDER</ButtonLink><ButtonLink to="/product/sherise-sanitary-pads" pale>BUY AGAIN</ButtonLink></div></article>)}</section></>;
}

export function WhyPage() {
  return <><PageHero eyebrow="WHY SHERISE" title="Because Period Care Should Feel Better." copy="Comfort, confidence and a brighter conversation around periods, thoughtfully brought together." /><Benefits /><section className="values section">{[["Comfort", "A gentle, considered experience for everyday period care."], ["Thoughtful Design", "Clear pack information and a product created around practical needs."], ["Everyday Confidence", "Support that fits into work, rest, movement and everything between."], ["Period Positivity", "A warm, open brand voice without shame or stigma."], ["Women-First Thinking", "Real routines and comfort stay at the centre of every decision."]].map((x, i) => <article key={x[0]}><b>0{i + 1}</b><h2>{x[0]}</h2><p>{x[1]}</p></article>)}</section></>;
}

export function StoryPage() {
  return <><PageHero eyebrow="OUR STORY" title="Release. Renew & Rise." copy="SheRise was created with a simple thought: period care should support women, not slow them down." /><section className="story section"><div className="story-art"><Sparkles /></div><div><p className="eyebrow">A STORY READY TO GROW</p><h2>Care that meets women where they are.</h2><p>This placeholder story should be replaced with the founder's approved story before launch.</p></div></section><section className="pillars section">{[["Mission", "To make period care feel supportive, clear and confidence-building."], ["Vision", "A future where period conversations are easier, kinder and free from stigma."], ["Values", "Comfort, care, honesty, optimism and women-first thinking."]].map((x) => <article key={x[0]}><h2>{x[0]}</h2><p>{x[1]}</p></article>)}</section></>;
}

export function GuidePage() {
  const items = [["Period Basics", "A period is a natural part of the menstrual cycle. Experiences vary from person to person."], ["Understanding Flow", "Flow can change across a period. Choose care based on your own comfort and needs."], ["Choosing Pad Size", "Consider your flow, activity, time of day and preferred coverage."], ["Period Hygiene", "Wash hands before and after changing a pad, and change products regularly based on flow and guidance."], ["Changing Your Pad", "Carry spares when you are away from home."], ["Disposal Tips", "Wrap used products securely and dispose of them in an appropriate bin. Never flush pads."]];
  return <><PageHero eyebrow="PERIOD GUIDE" title="Clear answers. Kinder conversations." copy="A calm, practical starting point for understanding periods and everyday care." /><section className="guide-grid section">{items.map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><Droplets /><h2>{title}</h2><p>{copy}</p></article>)}</section><aside className="health-note section"><Heart /><div><strong>A caring note</strong><p>This guide is general education, not medical advice. For pain, unusual symptoms or health concerns, consult a qualified healthcare professional.</p></div></aside></>;
}

export function BlogPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const shown = useMemo(() => articles.filter((article) => (cat === "All" || article.category === cat) && article.title.toLowerCase().includes(query.toLowerCase())), [cat, query]);
  return <><PageHero eyebrow="THE PERIOD EDIT" title="Good information, without the awkwardness." copy="Simple reads about periods, wellness, self-care and everyday life." /><section className="blog-controls section"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles" aria-label="Search articles" /><div>{["All", "Period Care", "Wellness", "Self-Care", "Lifestyle"].map((x) => <button className={cat === x ? "active" : ""} onClick={() => setCat(x)} key={x}>{x}</button>)}</div></section><section className="article-grid section">{shown.map((article, index) => <Link to="/blog/$slug" params={{ slug: article.slug }} className="article-card" key={article.slug}><div className={`article-art article-${index}`}><img src={article.image} alt={article.title} /></div><p className="eyebrow">{article.category}</p><h2>{article.title}</h2><p>{article.excerpt}</p><span>READ ARTICLE <ArrowRight /></span></Link>)}</section></>;
}

export function ArticlePage({ slug }: { slug: string }) {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <PageHero eyebrow="NOT FOUND" title="This article is not available." copy="Return to the Period Edit to explore our current guides." />;
  return <article className="article-page section"><Link to="/blog" className="text-link">Back to the Period Edit</Link><p className="eyebrow">{article.category}</p><h1>{article.title}</h1><p className="lead">{article.excerpt}</p><div className="article-art feature"><img src={article.image} alt={article.title} /></div><h2>A simple place to begin</h2><p>Period care is personal. Pay attention to your own flow, comfort and daily routine rather than looking for one universal answer.</p><h2>Choose what supports your day</h2><p>Different moments may call for different coverage. Consider how much you move, how long you will be away from home and what feels comfortable to you.</p><aside>This article offers general education only. Speak with a qualified healthcare professional about pain, unusual symptoms or personal health concerns.</aside></article>;
}

export function FaqPage() {
  const [q, setQ] = useState("");
  const faqs = [["Product", "What size is the current SheRise pack?", "The supplied sample packaging shows XXL, 320 mm, two pads and a medium-flow indication."], ["Ordering", "Can I buy SheRise online now?", "The frontend shopping flow is connected. Real payment capture still needs gateway and backend integration."], ["Shipping", "When will my order arrive?", "Delivery timeframes will appear after shipping operations are connected."], ["Payments", "Which payment methods are prepared?", "UPI, cards, net banking and cash on delivery UI are prepared for integration."], ["Returns", "What is the return policy?", "The final hygiene-product return policy is awaiting client approval."]];
  return <><PageHero eyebrow="HELP, WITHOUT THE HASSLE" title="How can we help?" copy="Product, ordering and period-care answers in one calm place." /><section className="faq section"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" aria-label="Search frequently asked questions" />{faqs.filter((x) => x.join(" ").toLowerCase().includes(q.toLowerCase())).map(([cat, title, copy]) => <details key={title}><summary><span><small>{cat}</small>{title}</span><ChevronDown /></summary><p>{copy}</p></details>)}</section></>;
}

export function ContactPage() {
  return <><PageHero eyebrow="CONTACT SHERISE" title="We'd Love to Hear From You." copy="Questions, feedback or partnership ideas: send us a note and the SheRise team can follow up." /><section className="contact section"><form onSubmit={(e) => e.preventDefault()}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Phone<input type="tel" placeholder="Optional" /></label><label>Subject<select><option>Product question</option><option>Ordering</option><option>Partnership</option><option>Other</option></select></label><label className="full">Message<textarea required placeholder="How can we help?" rows={5} /></label><button className="btn-primary">SEND MESSAGE</button></form><aside><h2>Let's connect</h2>{[["WhatsApp", ecommerceConfig.whatsappNumber || "Number to be confirmed"], ["Email", "Address to be confirmed"], ["Instagram", "Official handle to be confirmed"], ["Business hours", "Hours to be confirmed"]].map((x) => <div key={x[0]}><strong>{x[0]}</strong><span>{x[1]}</span></div>)}</aside></section></>;
}

export function PolicyPage({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return <><PageHero eyebrow="SHERISE POLICIES" title={title} copy={intro} /><section className="policy section"><p className="placeholder-note">Editable draft: review and approve this policy before launch.</p>{children ?? <><h2>Information to be confirmed</h2><p>This page is prepared for client-approved business terms. Final details, dates, addresses and legal language have not been supplied and are intentionally not invented.</p><h2>Questions</h2><p>Please use the contact page while official support details are being finalized.</p></>}</section></>;
}

function Rating() {
  return <div className="review-placeholder"><span><Star /><Star /><Star /><Star /><Star /></span> Review count pending</div>;
}

export function ErrorStatePage({ type = "404" }: { type?: string }) {
  const title = type === "payment" ? "Payment did not go through." : "This page needs a softer landing.";
  return <><PageHero eyebrow={type.toUpperCase()} title={title} copy="No technical errors are shown to customers. Choose a clear next step below." /><section className="empty-cart section"><CreditCard /><ButtonLink to="/checkout">TRY AGAIN</ButtonLink><ButtonLink to="/shop" pale>CONTINUE SHOPPING</ButtonLink></section></>;
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></section>;
}












