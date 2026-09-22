export type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  variant: string;
  facts: string[];
  description: string;
  mrp: number | null;
  price: number | null;
  discountPercent: number | null;
  sku: string;
  weight: string;
  material: string;
  packQuantity: string;
  inStock: boolean;
  stockQuantity: number | null;
  lowStockThreshold: number;
};

export const ecommerceConfig = {
  currency: "INR",
  freeShippingThreshold: 799,
  standardShippingFee: 49,
  whatsappNumber: "",
  codEnabled: true,
  razorpayEnabled: false,
};

export const products: Product[] = [
  {
    id: "sherise-sanitary-pads",
    name: "SheRise Sanitary Pads",
    slug: "sherise-sanitary-pads",
    tagline: "Release. Renew & Rise.",
    variant: "XXL • 320 mm",
    facts: ["XXL", "320 mm", "2 Count", "Medium Flow"],
    description: "Thoughtfully designed period care for softer, easier and more confident days.",
    mrp: null,
    price: null,
    discountPercent: null,
    sku: "SHERISE-XXL-320-2CT",
    weight: "To be confirmed",
    material: "To be confirmed",
    packQuantity: "2 Count",
    inStock: true,
    stockQuantity: null,
    lowStockThreshold: 5,
  },
  {
    id: "sherise-premium-multi-pack",
    name: "SheRise Premium Multi-Pack",
    slug: "sherise-premium-multi-pack",
    tagline: "Release. Renew & Rise.",
    variant: "Premium Multi-Pack",
    facts: ["24 Count", "Multi-Pack", "Period Care"],
    description: "A larger SheRise pack format prepared for everyday period-care shopping.",
    mrp: null,
    price: null,
    discountPercent: null,
    sku: "SHERISE-MULTI-24CT",
    weight: "To be confirmed",
    material: "To be confirmed",
    packQuantity: "24 Count",
    inStock: true,
    stockQuantity: null,
    lowStockThreshold: 5,
  },
  {
    id: "sherise-single-pack",
    name: "SheRise Single Pack",
    slug: "sherise-single-pack",
    tagline: "Release. Renew & Rise.",
    variant: "Single Pack",
    facts: ["Single Pack", "Period Care"],
    description: "A compact SheRise pack format for simple, on-the-go period-care needs.",
    mrp: null,
    price: null,
    discountPercent: null,
    sku: "SHERISE-SINGLE-PACK",
    weight: "To be confirmed",
    material: "To be confirmed",
    packQuantity: "Single Pack",
    inStock: true,
    stockQuantity: null,
    lowStockThreshold: 5,
  },
];

export const product = products[0];
export const productById = (id: string) => products.find((item) => item.id === id) ?? product;

export const articles = [
  { slug: "understanding-your-menstrual-cycle", category: "Period Care", title: "Understanding Your Menstrual Cycle", excerpt: "A simple, stigma-free guide to the phases of your cycle and what may change along the way.", image: "https://i.pinimg.com/1200x/1c/91/f8/1c91f8941e31cd6a8afe95469f71bc37.jpg" },
  { slug: "period-hygiene-simple-habits", category: "Wellness", title: "Period Hygiene: Simple Habits That Matter", excerpt: "Practical routines for feeling fresh, comfortable and prepared during your period.", image: "https://i.pinimg.com/1200x/3b/7d/ee/3b7dee5d51f0ba637597dfe06981eab7.jpg" },
  { slug: "choosing-the-right-pad", category: "Period Care", title: "Choosing the Right Pad for Your Flow", excerpt: "A straightforward look at pad length, flow and finding what feels right for your day.", image: "https://i.pinimg.com/1200x/b8/5a/8f/b85a8fac3d5807f75a9131f507e84172.jpg" },
];

export const nav = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Why SheRise", "/why-sherise"],
  ["Our Story", "/our-story"],
  ["Period Guide", "/period-guide"],
  ["Blog", "/blog"],
  ["FAQs", "/faq"],
  ["Contact", "/contact"],
] as const;

export function formatMoney(value: number | null) {
  return value === null ? "Price pending" : `₹${value.toLocaleString("en-IN")}`;
}

export function lineAmount(quantity: number, item = product) {
  return item.price === null ? null : item.price * quantity;
}

export function cartAmount(items: { productId: string; quantity: number }[]) {
  let hasPendingPrice = false;
  const total = items.reduce((sum, item) => {
    const found = productById(item.productId);
    if (found.price === null) {
      hasPendingPrice = true;
      return sum;
    }
    return sum + found.price * item.quantity;
  }, 0);
  return hasPendingPrice ? null : total;
}

export function createOrderId() {
  return `SR${Date.now().toString().slice(-8)}`;
}

