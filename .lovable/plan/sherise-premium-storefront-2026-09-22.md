# SheRise premium storefront

## Goal
Build a polished, mobile-first, multi-page feminine-care storefront centered on the uploaded SheRise sanitary-pad pack. Preserve the package identity and use the Plush screenshot only as inspiration for pacing, softness, product emphasis, and trust-building content.

## Visual direction
- Derive the palette from the real pack: blush, coral, warm white, deep indigo, and restrained periwinkle accents.
- Pair an elegant editorial serif with a clean sans-serif, loaded through the site document head.
- Use the uploaded pack photo as the product source of truth, presented on styled studio-like backgrounds without altering or recreating its branding.
- Create an original visual language with subtle petals, botanical lines, sparkles, rounded labels, and clean illustrations.
- Keep white space and contrasting pastel section bands so the site does not become uniformly pink.
- Make mobile the primary composition, then expand to tablet and desktop layouts.

## Shared storefront experience
- Build a rotating announcement strip, sticky header, desktop navigation, accessible mobile menu, search overlay, wishlist affordances, cart badge, slide-out cart, newsletter block, footer, and configurable WhatsApp button.
- Add reusable product, benefit, trust, article, accordion, and testimonial elements.
- Keep cart state functional in the frontend: add/remove items, quantity changes, subtotal, free-shipping placeholder progress, and cart page.
- Mark all prices, shipping thresholds, reviews, social handles, contact details, and unapproved brand-story material as placeholders or demo content.
- Do not claim completed checkout/payment processing; present a checkout-ready interface only.

## Pages and navigation
- **Home:** product-led hero, trust strip, single-product showcase, four benefit cards, brand statement, editorial lifestyle story, four-step period-care journey, lifestyle banner, education cards, demo testimonials, community gallery, newsletter, and footer.
- **Shop:** one real SheRise product only, with sort/filter-ready controls and quick add.
- **Product detail:** responsive gallery using the supplied photo, product facts, quantity, add-to-cart/buy interface, trust notes, detailed information tabs/accordions, and sticky mobile add bar.
- **Why SheRise:** comfort, thoughtful design, confidence, positivity, and women-first values with careful, non-comparative attribute presentation.
- **Our Story:** clearly editable placeholder story, mission, vision, values, and future-ready timeline.
- **Period Guide:** educational sections with a healthcare-professional disclaimer and no diagnostic claims.
- **Blog:** searchable/filterable listing plus working article detail pages for three relevant educational articles.
- **FAQ:** searchable categorized accordion content.
- **Contact:** accessible form and clearly labeled placeholders for WhatsApp, email, Instagram, and business hours.
- **Cart, privacy, terms, and shipping/returns:** complete presentation pages with editable policy placeholders.

## Images and content
- Upload the provided product photo through the project asset flow and use it throughout product-focused sections.
- Generate a small cohesive set of original lifestyle/editorial images and product-supporting backgrounds where imagery materially improves the page.
- Avoid copied Plush assets, unrelated stock imagery, fake certifications, fabricated reviews, medical claims, endorsements, and invented product variants.
- Keep the visible “NOT FOR SALE” marking confined to the supplied sample photo; never repeat it as product copy.

## Technical details
- Keep the existing TanStack Start routing architecture while matching the requested URLs; every navigation target gets a real route.
- Build shared React/TypeScript components and semantic Tailwind v4 tokens in the global design system.
- Add unique title, description, Open Graph text, canonical URL, and appropriate structured data to each content route.
- Ensure keyboard support, visible focus states, accessible dialogs/forms, 44px touch targets, meaningful alt text, lazy loading below the fold, and reduced-motion behavior.
- Verify the finished experience at 360px mobile and 1280px desktop, including menus, search, cart actions, article navigation, accordions, and absence of overflow or overlap.
