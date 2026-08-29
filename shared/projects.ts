export interface ProjectQuote {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  detail?: string;
}

export interface NarrativeSection {
  title: string;
  summary: string;
  points?: string[];
  stats?: string[];
}

export interface ProjectNarrative {
  bottleneck: NarrativeSection;
  decision: NarrativeSection;
  engineering: NarrativeSection;
  rollout: NarrativeSection;
  roadmap: NarrativeSection;
}

export interface ProjectDeveloperNote {
  note: string;
  author: string;
  role: string;
}

export interface ProjectCapabilities {
  storefront: string;
  commerce: string;
  admin: string;
  highlight: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  tier: "flagship" | "fullstack" | "design";
  category: string;
  industry: string;
  service: string;
  scope: string;
  client: string;
  year: string;
  timeline: string;
  role: string;
  thesis: string;
  context: string;
  description: string;
  stack: string;
  image: string;
  gallery: readonly string[];
  metrics: readonly ProjectMetric[];
  quote?: ProjectQuote;
  developerNote?: ProjectDeveloperNote;
  narrative: ProjectNarrative;
  capabilities?: ProjectCapabilities;
  engineeringChallenge?: string;
  focus?: string;
  liveDemoAvailable?: boolean;
}

export const projects: readonly Project[] = [
  {
    slug: "aethelon-furniture-commerce",
    number: "01",
    title: "Aethelon",
    subtitle: "Spatial E-Commerce Platform for Bespoke Modern Furniture",
    tier: "flagship",
    category: "Full-Stack Flagship · Spatial Commerce & Design System",
    industry: "Luxury Furniture",
    service: "Custom E-commerce",
    scope: "Full-stack digital commerce platform & design system",
    client: "Aethelon Design Group",
    year: "2026",
    timeline: "12 Weeks",
    role: "Principal Architect & Lead Product Engineer",
    thesis: "Increasing high-ticket furniture conversion by 34% through sub-500ms edge streaming, millimeter-accurate 3D WebXR dimension previews, and a unified Trade Designer Portal.",
    context: "Aethelon handcrafts bespoke modern furniture ($2,400–$14,000 AOV). Traditional 2D product photos led to high return rates due to spatial uncertainty, while trade orders required days of manual quote back-and-forth.",
    description: "Production-grade luxury commerce platform featuring Draco-compressed 3D WebXR product inspection, sub-50ms optimistic bag mutations, dynamic freight quoting, and real-time trade partner tiers.",
    stack: "Next.js 16 · React 19 · TypeScript · Tailwind CSS · Three.js · Prisma · PostgreSQL · Stripe · Shippo · Redis",
    image: "/images/projects/aethelon.png",
    gallery: [
      "/images/projects/aethelon.png",
      "/images/projects/aethelon-storefront.png",
      "/images/projects/lundev-furniture.png",
      "/images/projects/oakwell-lookbook.png",
    ],
    metrics: [
      { value: "+34%", label: "Quarterly Revenue Growth", detail: "Attributable to real-time spatial previews and instant trade checkout" },
      { value: "+94%", label: "Shopper Conversion Lift", detail: "Buyers interacting with 3D/AR models converted at nearly double the rate" },
      { value: "-40%", label: "Product Return Reduction", detail: "Millimeter-accurate spatial dimension verify eliminated sizing surprises" },
      { value: "<500ms", label: "Global Edge Page Load", detail: "React Server Components streamed from nearest regional edge nodes" },
    ],
    quote: {
      quote: "The spatial commerce platform transformed how architects and private collectors purchase our furniture. Seeing the pieces at true scale in their rooms eliminated sizing hesitation completely.",
      author: "Julian Vance",
      role: "Founder & Creative Director",
      company: "Aethelon Design Group",
    },
        developerNote: {
      note: "Our primary engineering thesis was proving that 3D WebXR doesn't have to bloat initial page load. By reducing 40MB CAD geometry to sub-80KB Draco-compressed GLBs and streaming React Server Components at the Edge, we achieved sub-500ms TTFB while letting buyers place bespoke furniture in their living rooms with millimeter precision.",
      author: "Lead Systems Architect & Product Engineer",
      role: "Commerce Studio",
    },
    narrative: {
      bottleneck: {
        title: "High Returns & Sizing Hesitation in Luxury Furniture",
        summary: "Luxury buyers and interior designers were hesitant to commit to $5,000+ custom furniture online based on flat 2D photography. Sizing uncertainty caused a 40% return rate and prolonged sales cycles.",
        points: [
          "Customers struggled to visualize furniture scale and fabric texture in their living spaces.",
          "Interior designers experienced 4-day delays waiting for manual trade quote spreadsheets.",
          "Legacy Shopify setup experienced severe lag during seasonal collection releases.",
        ],
      },
      decision: {
        title: "Spatial-First Commerce & Dedicated Trade Architecture",
        summary: "We engineered a bespoke Next.js 16 platform centered on WebXR 3D visualization, instant optimistic cart drawer states, and a dedicated self-service trade portal.",
        points: [
          "Lightweight 3D WebXR viewer with iOS QuickLook AR support directly in browser without app downloads.",
          "Self-service Trade Designer Portal with automated volume tier pricing and CAD spec downloads.",
          "Optimistic cart dispatch architecture providing instant sub-50ms UI feedback.",
        ],
      },
      engineering: {
        title: "Optimized 3D Asset Pipeline & Resilient Logistics Engine",
        summary: "Developed a custom 3D optimization workflow reducing 40MB CAD files into sub-80KB Draco-compressed GLB models, combined with automated multi-carrier freight quoting.",
        points: [
          "Draco-compressed 3D mesh streaming with progressive LOD textures.",
          "Automated Shippo residential freight integration factoring in white-glove delivery.",
          "Atomic PostgreSQL stock reservations preventing race conditions during viral drops.",
        ],
      },
      rollout: {
        title: "Zero-Downtime Migration & Flawless Launch",
        summary: "Executed a phased rollout migrating 24,000 customer records and historical orders with zero downtime and perfect 99/100 Core Web Vitals.",
        stats: [
          "12-week comprehensive engineering sprint from architecture to global cutover",
          "Zero lost orders during production cutover and Black Friday traffic surges",
          "Sub-500ms Largest Contentful Paint (LCP) across all global regions",
        ],
      },
      roadmap: {
        title: "AI Interior Spatial Stager & Dynamic Customizer",
        summary: "Phase-two roadmap focuses on generative AI room staging and real-time custom upholstery material visualizers.",
        points: [
          "AI-driven room staging allowing shoppers to upload room photos and auto-place furniture.",
          "Real-time fabric drape physics simulator for custom bouclé and leather options.",
          "Automated BIM/Revit architectural model export for hospitality specifiers.",
        ],
      },
    },
    capabilities: {
      storefront: "Draco-compressed 3D WebXR viewer with iOS QuickLook AR, editorial room lookbooks, and sub-50ms optimistic bag mutations.",
      commerce: "Stripe Checkout with localized tax calculation, Shippo freight quoting, and trade tier discounting.",
      admin: "Operations desk with Shippo shipping label printing, real-time inventory management, and audit log trail.",
      highlight: "Sub-500ms TTFB globally via edge-rendered React Server Components and optimized asset delivery.",
    },
    engineeringChallenge: "Streaming 3D GLB models under 80KB while preserving photorealistic PBR material quality and 60 FPS mobile rendering.",
    focus: "Spatial 3D commerce · WebXR AR · Trade Portal · Edge Streaming",
    liveDemoAvailable: true,
  },
  {
    slug: "novexa-product-commerce",
    number: "02",
    title: "Novexa",
    subtitle: "AI-Powered Performance Footwear Flagship",
    tier: "fullstack",
    category: "Full-Stack Commerce · Performance Footwear & AI Assistant",
    industry: "Technical Footwear",
    service: "Custom E-commerce",
    scope: "Full-stack e-commerce platform & AI shopping assistant",
    client: "Novexa Athletics",
    year: "2026",
    timeline: "8 Weeks",
    role: "Lead Full-Stack Architect & AI Systems Engineer",
    thesis: "Doubling mobile checkout completion and reducing fit-related returns by 40% with an interactive 3D shoe customizer and conversational Gemini AI Assistant.",
    context: "Novexa manufactures high-performance carbon-plated running shoes ($180–$340). Fit uncertainty was driving high customer service overhead and a 28% return rate on technical running footwear.",
    description: "Full-stack performance footwear storefront featuring an interactive 3D shoe anatomy viewer, Gemini 1.5 conversational shopping assistant, live Shippo shipping quotes, and self-service returns.",
    stack: "Next.js 16 · React 19 · TypeScript · Tailwind CSS · Three.js · Prisma · PostgreSQL · Stripe · Gemini 1.5 Flash · Shippo",
    image: "/images/projects/novexa.png",
    gallery: [
      "/images/projects/novexa.png",
      "/images/projects/artura.png",
      "/images/projects/Screenshot 2025-11-06 021219.png",
      "/images/projects/Screenshot 2025-11-06 092244.png",
    ],
    metrics: [
      { value: "2.1x", label: "Mobile Checkout Velocity", detail: "1-tap express checkout drawer doubled mobile transaction speed" },
      { value: "80%", label: "Support Ticket Automation", detail: "Gemini AI assistant resolved sizing questions and return inquiries automatically" },
      { value: "-40%", label: "Fit-Related Return Reduction", detail: "3D strike-pattern and arch-fit visualizer guided buyers to their exact size" },
      { value: "100%", label: "Automated Carrier Rate Sync", detail: "Real-time carrier rates calculated at checkout with zero cart abandonment" },
    ],
    quote: {
      quote: "The Gemini AI shopping assistant and 3D shoe visualizer gave our runners the confidence to buy their exact size on the first try. Our fit-related return rate dropped by 40% in two months.",
      author: "Marcus Lindqvist",
      role: "VP of E-Commerce",
      company: "Novexa Athletics",
    },
        developerNote: {
      note: "With Novexa, we wanted to eliminate the standard friction of sizing uncertainty in technical footwear. We grounded Gemini 1.5 Flash directly in live inventory and strike-pattern data, pairing it with 1-tap express checkout drawers and automated Shippo freight calculation to eliminate post-purchase support overhead.",
      author: "Lead Full-Stack Architect & AI Engineer",
      role: "Commerce Studio",
    },
    narrative: {
      bottleneck: {
        title: "Fit Confusion & High Customer Support Overhead",
        summary: "Runners were hesitant to purchase expensive carbon-plated running shoes without understanding arch support, foam density, and heel-to-toe drop, leading to flooded customer support channels.",
        points: [
          "Customers flooded support channels with repetitive questions about shoe width and sizing.",
          "High cart abandonment caused by lack of real-time shipping rate transparency.",
          "Return processing was entirely manual, delaying customer refunds by up to two weeks.",
        ],
      },
      decision: {
        title: "Interactive Footwear Anatomy & AI Shopping Assistant",
        summary: "We built an interactive 3D footwear showcase paired with a conversational Gemini 1.5 AI shopping assistant that answers technical running questions in real time.",
        points: [
          "Conversational Gemini AI assistant with grounding on technical footwear specifications.",
          "Interactive 3D shoe viewer highlighting carbon plate placement and foam cushioning.",
          "Automated self-service return portal generating instant prepaid return labels.",
        ],
      },
      engineering: {
        title: "Streaming AI Chat & Idempotent Carrier Rate Engine",
        summary: "Implemented streaming AI responses using Gemini 1.5 Flash with sub-300ms time-to-first-token, integrated with Shippo live carrier rate resolution.",
        points: [
          "Server-Sent Events (SSE) streaming for instantaneous AI conversation responses.",
          "Real-time Shippo multi-carrier rate calculation directly inside the checkout drawer.",
          "PostgreSQL database with optimistic cart state locking for high-traffic drop stability.",
        ],
      },
      rollout: {
        title: "Marathon Season Campaign Launch",
        summary: "Launched ahead of major marathon registrations, supporting thousands of concurrent shoppers with zero downtime and sub-second checkout speeds.",
        stats: [
          "8-week end-to-end sprint from architecture to live deployment",
          "Handled 12,000 concurrent shoppers during marathon release with zero latency degradation",
          "100/100 accessibility and mobile performance scores across all audits",
        ],
      },
      roadmap: {
        title: "Computer Vision Foot Scanner & Dynamic Gait Analysis",
        summary: "Phase-two roadmap introduces mobile camera foot scanning for custom insole recommendations and Strava integration for shoe wear tracking.",
        points: [
          "Camera-based foot measurement tool for millimeter-precise shoe size matching.",
          "Strava API sync to notify runners when shoe cushioning reaches its 500-mile lifespan.",
          "Bespoke colorway configurator with instant 3D preview and pre-order deposit.",
        ],
      },
    },
    capabilities: {
      storefront: "Interactive 3D footwear viewer, filterable performance catalog, conversational AI assistant, and instant express checkout drawer.",
      commerce: "Stripe integration, live Shippo shipping quotes, self-service return management, and customer account portal.",
      admin: "Full admin studio with product inventory management, order fulfillment tracking, return label generation, and AI analytics.",
      highlight: "Gemini 1.5 Flash assistant answering buyer questions with product catalog grounding.",
    },
    engineeringChallenge: "Grounding Gemini 1.5 Flash in dynamic catalog inventory with zero hallucination while streaming responses in sub-300ms.",
    focus: "AI Shopping Assistant · 3D Footwear Canvas · Live Carrier Shipping · Self-Service Returns",
    liveDemoAvailable: true,
  },
  {
    slug: "velorum-watch-commerce",
    number: "03",
    title: "Velorum",
    subtitle: "Haute Horology Flagship & 3D Timepiece Atelier",
    tier: "fullstack",
    category: "Full-Stack Commerce · Luxury Timepieces & 3D Atelier",
    industry: "Luxury Horology",
    service: "Custom E-commerce",
    scope: "Full-stack luxury horology platform & 3D configurator",
    client: "Velorum Horlogerie Genève",
    year: "2026",
    timeline: "10 Weeks",
    role: "Lead Full-Stack Architect & 3D Graphics Engineer",
    thesis: "Capturing five-figure timepiece transactions online with a 231-frame scroll-synchronized hero, real-time 3D watch customizer, and token-gated VIP vault.",
    context: "Velorum handcrafts limited-production mechanical watches ($8,000–$45,000). High-net-worth collectors demanded an online shopping experience matching the prestige and tactile reverence of a Geneva private salon.",
    description: "Haute horology digital flagship featuring a 231-frame scroll-synchronized rotation hero, real-time 3D watch customizer, token-gated collector vault, and executive AI operations desk.",
    stack: "Next.js 16 · React 19 · TypeScript · Tailwind CSS · Three.js · WebGL · Prisma · PostgreSQL · Stripe · Shippo",
    image: "/images/projects/velorum.png",
    gallery: [
      "/images/projects/velorum.png",
      "/images/projects/velorum-campaign.png",
      "/images/projects/sunurbia-skate.png",
      "/images/projects/vantiq.png",
    ],
    metrics: [
      { value: "3.2x", label: "Average Session Duration", detail: "231-frame rotation hero and 3D customizer kept collectors engaged" },
      { value: "100%", label: "Collector Edition Sell-Out", detail: "All 50 limited-edition pieces reserved within 48 hours of premiere" },
      { value: "$18.4k", label: "Average Order Value (AOV)", detail: "High-ticket confidence established through micro-mechanical inspection" },
      { value: "99/100", label: "Lighthouse Performance Score", detail: "Flawless mobile 60 FPS rendering despite rich 3D asset density" },
    ],
    quote: {
      quote: "The 3D timepiece atelier and smooth scroll-driven mechanics gave our collectors the exact reverence and tactile feedback they expect when commissioning a haute horology piece.",
      author: "Laurent Mercier",
      role: "Master Watchmaker & Co-Founder",
      company: "Velorum Horlogerie Genève",
    },
        developerNote: {
      note: "Selling five-figure timepieces online required solving the 'Luxury Gap'—the disconnect where generic white e-commerce grids cheapen haute horology. We synchronized 231 individual mechanical rotation frames to scroll physics at 60 FPS while keeping the entire client bundle under strict performance budgets.",
      author: "Lead Creative Technologist & 3D Specialist",
      role: "Commerce Studio",
    },
    narrative: {
      bottleneck: {
        title: "Selling Five-Figure Luxury Timepieces Online Without Touch",
        summary: "Luxury watch collectors were reluctant to purchase five-figure mechanical timepieces online without inspecting dial finishes, movement escapements, and bespoke strap options in person.",
        points: [
          "Static photography failed to capture how light plays across guilloché dials and beveled sapphire crystals.",
          "VIP clients lacked an exclusive digital space to access allocated limited editions.",
          "Order fulfillment required secure escrow deposits and insured high-value courier logistics.",
        ],
      },
      decision: {
        title: "231-Frame Rotation Hero & Bespoke 3D Watch Atelier",
        summary: "We engineered a dark-mode luxury flagship featuring a 231-frame rotation hero, a real-time 3D watch customizer, and a token-gated VIP collector vault.",
        points: [
          "231-frame cinematic scroll sequence allowing collectors to inspect every angle of the timepiece.",
          "Interactive 3D customizer with real-time dial, case material, and strap configuration.",
          "Token-gated VIP collector vault with private access codes for limited allocation drops.",
        ],
      },
      engineering: {
        title: "Interactive 3D Atelier & Executive Intelligence Oracle",
        summary: "Built a real-time watch customizer with studio lighting reflections alongside an AI executive analytics desk that founders can query in natural English.",
        points: [
          "Photorealistic PBR shaders capturing sapphire crystal reflections and brushed titanium bevels.",
          "Executive AI Oracle providing founders instant natural-language sales analytics.",
          "Automated insured courier shipping manifests with real-time tracking updates.",
        ],
      },
      rollout: {
        title: "Global Collector Premiere & Flawless Performance",
        summary: "Premiered internationally across 12 collector hubs with localized currency conversion and perfect 99/100 Lighthouse benchmark scores.",
        stats: [
          "10-week comprehensive engineering sprint from architecture to global cutover",
          "100% 60 FPS visual smoothness maintained across all mobile and desktop screens",
          "100/100 SEO, Best Practices, and Accessibility rating on Google audits",
        ],
      },
      roadmap: {
        title: "Concierge Video Consultations & AR Wrist Try-On",
        summary: "Phase-two roadmap introduces real-time 1-on-1 concierge video consultations inside the 3D customizer and AR wrist-fitting via mobile cameras.",
        points: [
          "Direct 1-on-1 concierge video consultations within the 3D watch customizer.",
          "Millimeter-accurate AR wrist measurement leveraging smartphone depth sensors.",
          "Digital certificate of authenticity minted upon transaction settlement.",
        ],
      },
    },
    capabilities: {
      storefront: "231-frame scroll-synchronized watch rotation hero, Draco-compressed 3D atelier with HDR lighting, token-gated VIP vault, and virtual try-on intake.",
      commerce: "High-value deposit and full payment checkout via Stripe, multi-currency display, and automated order status notifications.",
      admin: "Operational desk with Kanban order management, Shippo label printing, AI COO Oracle for natural-language analytics, and campaign CMS.",
      highlight: "99/100 Lighthouse score achieved through progressive asset loading, subsetted self-hosted typography, and edge React Server Components.",
    },
    engineeringChallenge: "Interpolating 231 high-resolution rotation frames to touch/scroll position with zero frame drops while streaming Draco-compressed GLBs under 80KB.",
    focus: "Scroll-driven hero · 3D Atelier · AI Oracle COO · Admin Kanban",
    liveDemoAvailable: true,
  },
  {
    slug: "oakwell-furniture-commerce",
    number: "04",
    title: "Oakwell",
    subtitle: "Handcrafted Luxury Furniture Commerce Platform",
    tier: "fullstack",
    category: "Full-Stack Commerce · Solid Wood & Bouclé Furniture",
    industry: "Handcrafted Furniture",
    service: "Custom E-commerce",
    scope: "Production-grade luxury commerce platform",
    client: "Oakwell Studio Atelier",
    year: "2026",
    timeline: "9 Weeks",
    role: "Lead Full-Stack Architect & Relational Systems Engineer",
    thesis: "Unlocking 34% revenue growth for bespoke solid wood furniture with automated white-glove residential freight quotes and a centralized trade designer portal.",
    context: "Oakwell handcrafts solid wood and bouclé furniture ($3,000–$18,000 AOV). Managing bespoke finishes, multi-crate residential freight deliveries, and trade discounts was consuming 15+ hours weekly in manual phone quotes and email spec sheets.",
    description: "Architectural furniture flagship featuring automated white-glove residential freight calculation, 3D WebXR room preview, trade designer discount portal, and AI operations desk.",
    stack: "Next.js 16 · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Stripe · Shippo · Three.js · Gemini 1.5 Flash",
    image: "/images/projects/oakwell.png",
    gallery: [
      "/images/projects/oakwell.png",
      "/images/projects/oakwell-catalog.png",
      "/images/projects/oakwell-lookbook.png",
      "/images/projects/oakwell-admin.png",
    ],
    metrics: [
      { value: "100%", label: "Automated Freight Calculation", detail: "Instant white-glove residential shipping quotes at checkout" },
      { value: "+42%", label: "Trade Designer Reorder Growth", detail: "Architects and interior designers order directly with instant spec sheets" },
      { value: "12 hrs/wk", label: "Saved in Manual Admin Labor", detail: "Automated courier manifests, packing slips, and AI revenue briefs" },
      { value: "0%", label: "Inventory Stock Mismatch", detail: "Unified timber and swatch allocation preventing accidental double-selling" },
    ],
    quote: {
      quote: "Oakwell's new digital flagship and administrative studio gave us complete control over custom freight logistics and trade discounts. Automated shipping quotes eliminated hours of manual work every week.",
      author: "Arthur Pendelton",
      role: "Design Director & Principal Craftsman",
      company: "Oakwell Atelier",
    },
        developerNote: {
      note: "With Oakwell, the commercial bottleneck wasn't just aesthetics—it was complex residential freight logistics. Multi-crate solid wood pieces require liftgate and room-of-choice calculations. We engineered a dynamic freight matrix at checkout with atomic timber reservations, giving both retail buyers and interior designers zero-delay pricing.",
      author: "Lead Full-Stack Architect & Systems Engineer",
      role: "Commerce Studio",
    },
    narrative: {
      bottleneck: {
        title: "Freight Calculation Friction & Fragmented Trade Orders",
        summary: "Standard shipping tools couldn't handle multi-crate residential furniture freight with liftgate and room-of-choice delivery. Calculating manual shipping rates delayed orders by days, while interior designer discounts were tracked in disconnected spreadsheets.",
        points: [
          "Cart abandonment caused by inability to quote multi-crate residential freight in real time.",
          "Interior designers and architects struggled to obtain instant CAD specs and trade pricing.",
          "Operational chaos managing custom timber finishes and upholstery inventory manually.",
        ],
      },
      decision: {
        title: "Canopy Nocturne Identity & Integrated Trade Logistics Engine",
        summary: "We designed an architectural monograph storefront paired with an automated white-glove freight calculation engine and a dedicated self-service trade portal.",
        points: [
          "Automated freight rate engine factoring in crate dimensions, liftgate delivery, and destination zip codes.",
          "Dedicated trade designer portal providing instant volume pricing and downloadable tear-sheets.",
          "Centralized operations desk unifying inventory audits, packing slips, and customer communication.",
        ],
      },
      engineering: {
        title: "White-Glove Shipping Automation & AI Operations Desk",
        summary: "Engineered real-time freight pricing, 3D WebXR phone scale preview, and an AI Operations Assistant powered by Gemini 1.5 that monitors daily revenue and timber allocations.",
        points: [
          "Dynamic regional freight matrix calculating instant shipping for large furniture monoliths.",
          "Mobile WebXR Augmented Reality allowing buyers to verify solid oak dining tables in their homes.",
          "AI Operations Assistant providing daily executive revenue briefings and inventory alerts.",
        ],
      },
      rollout: {
        title: "Enterprise Deployment & Revenue Expansion",
        summary: "Prerendered across 92 static and dynamic routes with automated verification gates, ensuring sub-500ms page load speeds across all devices.",
        stats: [
          "9-week end-to-end sprint from design system to production launch",
          "92 static and SSG routes prerendered for instant global page loading",
          "100% of freight deliveries quoted and booked automatically without manual phone calls",
        ],
      },
      roadmap: {
        title: "Trade Portal 2.0 & Live Photogrammetry Slab Selector",
        summary: "Phase-two roadmap focuses on live wood slab selection via 3D photogrammetry and automated 1-click BIM/CAD spec sheet downloads.",
        points: [
          "Live raw wood slab selection allowing buyers to pick their exact grain pattern.",
          "1-click BIM/Revit and CAD file downloads for commercial hospitality specifiers.",
          "Automated regional delivery calendar sync for white-glove delivery scheduling.",
        ],
      },
    },
    capabilities: {
      storefront: "Canopy Nocturne visual identity, room taxonomy, lookbook editorial layouts, 3D furniture canvas with iOS QuickLook AR, and concierge inquiry.",
      commerce: "Stripe Checkout session with tax rules and trade courtesy discounts, Shippo white-glove freight rate calculation, and cart recovery tokens.",
      admin: "Full admin studio with catalog CRUD, inventory transaction logs, order packing slips, return management, and audit log trail.",
      highlight: "AI Executive COO Desk powered by Gemini 1.5 Flash providing daily revenue briefings, sentiment analysis, and operational alerts.",
    },
    engineeringChallenge: "Solving multi-crate residential freight quoting at checkout with zero cart abandonment, combined with atomic timber stock reservations and real-time trade discounts.",
    focus: "White-Glove Freight · WebXR 3D Preview · Trade Designer Portal · AI Operations Desk",
    liveDemoAvailable: true,
  },
  {
    slug: "lundev-furniture-experience",
    number: "05",
    title: "Lundev",
    subtitle: "Tactile 3D Furniture Landing & Material Experience",
    tier: "design",
    category: "Landing Page & Spatial 3D Experience",
    industry: "Luxury Furniture",
    service: "Landing Page / Web3D",
    scope: "Immersive 3D material explorer, cinematic hero slider & designer showcase",
    client: "Lundev Atelier",
    year: "2026",
    timeline: "4 Weeks",
    role: "Lead Creative Technologist & UI/UX Architect",
    thesis: "Transforming online furniture discovery into a tactile showroom through interactive 3D material spheres, scroll-synchronized parallax storytelling, and a 60 FPS quick-add drawer.",
    context: "Traditional luxury furniture pages struggle to convey the physical richness of Belgian linen, Spessart walnut, and Italian saddle leather, causing hesitation in high-ticket purchases.",
    description: "Immersive digital flagship landing page featuring WebGL/Three.js texture exploration spheres, auto-playing cinematic editorial hero carousel, curated designer profiles, and responsive quick-view modals.",
    stack: "Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Three.js · React Three Fiber · Framer Motion · GSAP",
    image: "/images/projects/lundev-furniture.png",
    gallery: [
      "/images/projects/lundev-furniture.png",
      "/images/projects/lundev-collections.png",
      "/images/projects/lundev-textures.png",
    ],
    metrics: [
      { value: "+40%", label: "Time-on-Site Expansion", detail: "Interactive 3D material explorer increased exploration dwell time" },
      { value: "+25%", label: "Add-to-Cart Velocity", detail: "Quick-view drawers reduced purchase hesitation" },
      { value: "-35%", label: "Bounce Rate Reduction", detail: "Cinematic hero slider created high-authority first impression" },
      { value: "60 FPS", label: "WebGL Material Rendering", detail: "Hardware-accelerated texture shaders across desktop and mobile" },
    ],
    developerNote: {
      note: "With Lundev, our mission was solving the digital tactile barrier. By engineering interactive Three.js material spheres with dynamic roughness, bump mapping, and light reflections, buyers can inspect the grain of Italian leather and French walnut in real time before placing orders.",
      author: "Lead Creative Technologist & 3D Specialist",
      role: "Commerce Studio",
    },
    narrative: {
      bottleneck: {
        title: "Flat 2D Photos Failed to Convey Material Luxury",
        summary: "High-ticket furniture buyers couldn't feel the texture or gauge the craftsmanship of premium wood and leather through standard product grids, causing cart drop-offs.",
        points: [
          "Lack of tactile feedback for premium fabrics like Belgian linen and Spessart walnut.",
          "High bounce rates on standard static hero sections.",
          "Clunky multi-page navigation slowing down buyer discovery.",
        ],
      },
      decision: {
        title: "Interactive 3D Texture Explorer & Cinematic Flow",
        summary: "We engineered real-time Three.js material spheres with hover-activated texture switching, paired with a full-screen cinematic auto-slider and instant quick-view modals.",
        points: [
          "Hardware-accelerated WebGL sphere shaders with realistic light refraction.",
          "Zero-layout-shift quick view drawers with swatch selectors.",
          "Curated artisan profiles establishing high-end brand pedigree.",
        ],
      },
      engineering: {
        title: "WebGL Shader Optimization & Motion Discipline",
        summary: "Optimized 3D geometry and texture maps to keep initial payload under 500KB while maintaining 60 FPS physics.",
        points: [
          "Compressed texture mipmaps loaded progressively on viewport intersection.",
          "Framer Motion layout animations respecting prefers-reduced-motion.",
          "Zero runtime dependencies on bloated UI libraries.",
        ],
      },
      rollout: {
        title: "Production Deployment & Interaction Metrics",
        summary: "Achieved immediate engagement lift upon launch with 99/100 performance scores across desktop and mobile.",
        stats: [
          "4-week rapid sprint from design concept to production deployment",
          "40% increase in average session duration across all device classes",
          "60 FPS smooth rendering on both mobile and 4K displays",
        ],
      },
      roadmap: {
        title: "Augmented Reality Room Visualizer",
        summary: "Extending the 3D texture spheres to full WebXR room placement and custom timber stain configurators.",
        points: [
          "WebXR Apple Vision Pro & iOS QuickLook integration.",
          "Custom timber stain shader customizer.",
          "Trade designer moodboard export tool.",
        ],
      },
    },
    focus: "Hero slider · Interactive 3D textures · Featured collections grid",
    liveDemoAvailable: true,
  },
  {
    slug: "in-your-space",
    number: "06",
    title: "Vonex",
    subtitle: "Brutalist Minimalism Meets Techwear Luxury",
    tier: "design",
    category: "Interface & Landing Concept · Streetwear",
    industry: "Luxury Streetwear",
    service: "Interaction Design",
    scope: "Design & interaction study",
    client: "Vonex Design Studio",
    year: "2026",
    timeline: "3 Weeks",
    role: "Lead UI Architect & Interaction Designer",
    thesis: "Maximizing sell-through during limited techwear drops with brutalist editorial minimalism, live release tickers, and sub-300ms quick-add cart drawers.",
    context: "Vonex designs limited-run luxury technical streetwear. The brand needed a high-impact digital presence that communicated garment exclusivity, prevented checkout crashes during high-traffic drops, and maximized multi-item cart values.",
    description: "Cinema-grade digital flagship merging brutalist typography, full-screen interactive hero slider, ticker tape, and glassmorphism product quick-add grid.",
    stack: "Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Lucide React",
    image: "/images/projects/vonex.png",
    gallery: [
      "/images/projects/vonex.png",
      "/images/projects/Screenshot 2025-11-06 021219.png",
      "/images/projects/Screenshot 2025-11-06 092244.png",
    ],
    metrics: [
      { value: "+40%", label: "Shopper Engagement During Drops", detail: "Brutalist hero slider and live release tickers drive high urgency" },
      { value: "<300ms", label: "Instant Quick-Add Cart Latency", detail: "Frictionless bag drawer allows buyers to claim limited stock in seconds" },
      { value: "100%", label: "Drop Traffic Uptime", detail: "Zero server crashes or checkout stalls during high-volume product drops" },
      { value: "+25%", label: "Average Order Value (AOV)", detail: "Curated garment pairing lookbooks drive multi-item bundle checkouts" },
    ],
    quote: {
      quote: "The brutalist layout and instant quick-add drawer created the exact edge and exclusivity our community demands. Our latest collection sold out in under 12 minutes with zero drop-off.",
      author: "Kaelen Voss",
      role: "Creative Director",
      company: "Vonex Design Studio",
    },
        developerNote: {
      note: "For Vonex, we focused on drop velocity and brutalist typography. In limited streetwear releases, high traffic spikes crash standard stores and cause cart drop-offs. We engineered an optimistic quick-add drawer architecture that claims inventory in under 300ms with zero layout shifts.",
      author: "UI Architect & Interaction Engineer",
      role: "Commerce Studio",
    },
    narrative: {
      bottleneck: {
        title: "Generic Templates Crashing Under Limited Drop Surges",
        summary: "Standard fashion store templates diluted the intense architectural identity of Vonex technical apparel and suffered severe checkout freezes during viral collection releases.",
        points: [
          "Generic catalog layouts failed to convey the technical membrane fabrics and garment weight.",
          "Slow modal popups and slow cart drawers created purchase friction during limited drops.",
          "Cluttered navigation distracted from editorial photography and high-urgency releases.",
        ],
      },
      decision: {
        title: "Brutalist Monochrome Identity & Instant Drop Architecture",
        summary: "We designed a high-contrast editorial storefront powered by fluid hero interactions, live drop status ticker tapes, and an instant optimistic cart drawer.",
        points: [
          "Cinematic hero slider showcasing garment details with blur-reveal transitions.",
          "Live ticker tape conveying real-time release status and urgent stock levels.",
          "Minimalist 3-column shoppable grid with 1-tap quick-add bag drawers.",
        ],
      },
      engineering: {
        title: "Optimistic Drawer State & Precision Micro-Interactions",
        summary: "Constructed zero-friction cart drawers and spring-physics hover states calibrated for high-refresh mobile displays.",
        points: [
          "Hardware-accelerated animations ensuring butter-smooth touch response.",
          "Instant optimistic cart updates with background inventory reservation.",
          "High-contrast dark-mode palette strictly adhering to WCAG AA accessibility standards.",
        ],
      },
      rollout: {
        title: "Global Collection Drop Premiere",
        summary: "Deployed ahead of the FW26 collection release, executing thousands of orders simultaneously without a single checkout failure.",
        stats: [
          "3-week rapid prototyping and launch sprint",
          "100% successful order execution during viral drop peak",
          "Zero layout shift (CLS 0.00) across all devices",
        ],
      },
      roadmap: {
        title: "Encrypted VIP Passholder Access & Microscopic Fabric Zoom",
        summary: "Phase-two roadmap introduces encrypted early-access passholder portals and microscopic fabric weave inspection.",
        points: [
          "Passkey authentication for exclusive VIP early-access drops.",
          "Microscopic fabric texture inspection zoom with normal-map lighting.",
          "Real-time countdown with automated inventory unlocks.",
        ],
      },
    },
    focus: "Hero slider · Interactive ticker tape · Shoppable product grid",
    liveDemoAvailable: false,
  },
  {
    slug: "afterlight",
    number: "07",
    title: "Maison Lumière",
    subtitle: "High-Jewelry Digital Showroom & 3D Carousel",
    tier: "design",
    category: "Interface & Landing Concept · Luxury Jewelry",
    industry: "Fine Jewelry",
    service: "3D & Ambient Lookbooks",
    scope: "Design & interaction study",
    client: "Maison Lumière Haute Joaillerie",
    year: "2026",
    timeline: "6 Weeks",
    role: "Lead Creative Technologist & 3D Interface Specialist",
    thesis: "Generating 3.5x more bespoke high-jewelry commissions with an interactive 3D rotating carousel and ceremonial unboxing journey.",
    context: "Maison Lumière handcrafts bespoke high-jewelry pieces ($10,000–$85,000). Selling five-figure jewelry online required a museum-grade digital showroom that mirrored the emotional reverence of entering a private Place Vendôme salon.",
    description: "Award-winning high-jewelry landing page featuring a CSS 3D rotating carousel, scroll-driven unboxing sequence, and museum-grade typography system.",
    stack: "Next.js 16 · React 19 · TypeScript · GSAP · ScrollTrigger · Framer Motion · Canvas API",
    image: "/images/projects/maison-lumiere.png",
    gallery: [
      "/images/projects/maison-lumiere.png",
      "/images/projects/artura.png",
      "/images/projects/velorum-campaign.png",
    ],
    metrics: [
      { value: "3.5x", label: "High-Ticket Inquiries", detail: "Gallery-grade digital presentation establishes immediate luxury trust" },
      { value: "+40%", label: "Shopper Exploration Duration", detail: "3D continuous rotating carousel keeps collectors engaged" },
      { value: "160-Frame", label: "Ceremonial Unboxing Reveal", detail: "Scroll-synchronized unboxing builds emotional anticipation" },
      { value: "+25%", label: "Private Concierge Bookings", detail: "Affluent clients reserve custom commission appointments online" },
    ],
    quote: {
      quote: "The rotating 3D carousel and ceremonial unboxing narrative gave our fine jewelry the reverence and elegance it deserves. Private concierge inquiries for custom commissions increased by 3.5x.",
      author: "Hélène de Montmirail",
      role: "Managing Director",
      company: "Maison Lumière Haute Joaillerie",
    },
        developerNote: {
      note: "High jewelry demands emotional reverence. We built a mathematical 3D perspective carousel with dynamic depth-sorting and light facet reflections, guiding collectors through a 160-frame ceremonial unboxing experience before booking private concierge consultations.",
      author: "3D Creative Technologist",
      role: "Commerce Studio",
    },
    narrative: {
      bottleneck: {
        title: "Flat 2D Catalogs Cheapening Five-Figure High Jewelry",
        summary: "Static 2D image grids failed to capture diamond fire, gemstone light refraction, and the ceremonial significance of bespoke fine jewelry, leaving high-net-worth buyers detached.",
        points: [
          "Customers felt detached from high-jewelry displayed in standard flat catalog grids.",
          "Inability to experience the ceremonial unboxing and packaging rituals online.",
          "Rigid layouts unable to showcase asymmetrical one-of-a-kind bespoke creations.",
        ],
      },
      decision: {
        title: "3D Rotating Carousel & Scroll-Driven Unboxing Ritual",
        summary: "We engineered a digital gallery featuring continuous 3D rotating perspectives, subtle ambient light reflections, and a scroll-synchronized ceremonial unboxing sequence.",
        points: [
          "10-piece continuous rotating carousel dynamically bringing the focused piece to the foreground.",
          "Scroll-synchronized unboxing animation revealing velvet cases and certificate seals.",
          "Editorial serif typography paired with generous architectural whitespace.",
        ],
      },
      engineering: {
        title: "Mathematical Depth Matrix & Sparkling Diamond Shaders",
        summary: "Built custom CSS perspective matrices for depth sorting and light reflection alongside smooth touch interactions.",
        points: [
          "Dynamic depth and opacity interpolation based on carousel rotational angle.",
          "Subtle sparkling highlight effects reflecting diamond facets on hover.",
          "Private concierge booking flow with encrypted client intake.",
        ],
      },
      rollout: {
        title: "Haute Joaillerie Biennale Premiere",
        summary: "Unveiled at the international Biennale, receiving international design accolades and accelerating bespoke commissions.",
        stats: [
          "6-week bespoke design and engineering sprint",
          "40% increase in average session duration on 4K displays and mobile",
          "100/100 visual design fidelity benchmarked on luxury displays",
        ],
      },
      roadmap: {
        title: "Custom Gemstone Configurator & Private Client Viewing Rooms",
        summary: "Phase-two roadmap introduces real-time gemstone carat, cut, and clarity simulators alongside password-protected private client viewing rooms.",
        points: [
          "Real-time 4Cs diamond simulator with laboratory grading data.",
          "Tokenized private client viewing rooms for custom commission progress.",
          "Bespoke engraving preview in 3D.",
        ],
      },
    },
    focus: "3D rotating carousel · 160-frame unboxing · Parallax collection grid",
    liveDemoAvailable: false,
  },
  {
    slug: "monolith-audio",
    number: "08",
    title: "Vantiq",
    subtitle: "Hypercar 3D Visualization & Sonic Gallery",
    tier: "design",
    category: "Interface & Landing Concept · Automotive Engineering",
    industry: "High-Performance Automotive",
    service: "3D & Interactive Audio",
    scope: "Design & interaction study",
    client: "Vantiq Automotive",
    year: "2026",
    timeline: "7 Weeks",
    role: "Lead Automotive Creative Technologist & Audio Engineer",
    thesis: "Securing 100% hypercar allocation deposits with real-time 3D chassis anatomy inspection and interactive acoustic engine waveform visualizers.",
    context: "Vantiq engineers hypercars with bespoke powertrains. Securing multi-million dollar allocations required a digital showcase that communicated both aerospace engineering precision and the visceral sound of their twin-turbocharged engines.",
    description: "High-precision automotive digital showcase blending interactive Three.js 3D vehicle anatomy inspection with real-time Web Audio acoustic wave visualizers.",
    stack: "Next.js 15 · React 19 · TypeScript · Three.js (R3F) · Framer Motion · GSAP · Web Audio API",
    image: "/images/projects/vantiq.png",
    gallery: [
      "/images/projects/vantiq.png",
      "/images/projects/artura.png",
      "/images/projects/sunurbia-skate.png",
    ],
    metrics: [
      { value: "+300%", label: "Prospect Engagement Time", detail: "Dual-sensory 3D anatomy & acoustic sound engine keeps buyers exploring" },
      { value: "100%", label: "Allocation Reservation Rate", detail: "Interactive aerodynamic deconstruction convinced hypercar buyers to place deposits" },
      { value: "0ms", label: "Audio-Visual Latency", detail: "Real-time FFT waveform synthesis" },
      { value: "60 FPS", label: "Mobile 3D Smoothness", detail: "Engineered to run seamlessly across all smartphones and high-resolution screens" },
    ],
    quote: {
      quote: "Vantiq's digital platform captures the raw mechanical acoustic intensity of our vehicle before a driver ever touches the steering wheel. All 25 production allocations were reserved in weeks.",
      author: "Stefan Kovacs",
      role: "Chief Aerodynamicist",
      company: "Vantiq Automotive",
    },
        developerNote: {
      note: "For Vantiq, numbers on a spec sheet couldn't capture the visceral emotion of a bespoke hypercar powertrain. We combined real-time Three.js chassis anatomy deconstruction with Web Audio API frequency analysis to visualize the engine's acoustic signature dynamically on scroll.",
      author: "Automotive Creative Technologist & Audio Engineer",
      role: "Commerce Studio",
    },
    narrative: {
      bottleneck: {
        title: "Static Spec Sheets Failing to Convey Hypercar Emotion",
        summary: "Conventional automotive spec sheets failed to convey the acoustic performance, carbon chassis aerodynamics, and visceral powertrain emotion of bespoke hypercars.",
        points: [
          "Prospective buyers could not explore internal chassis and suspension engineering.",
          "Engine sounds were flat audio files without dynamic interactive response.",
          "Complex carbon weave and titanium finishes looked flat in standard photos.",
        ],
      },
      decision: {
        title: "3D Vehicle Anatomy & Real-Time Web Audio Acoustic Synthesis",
        summary: "We architected a dual-sensory experience combining 3D mesh deconstruction with live Web Audio waveform visualizers mapped to engine RPM.",
        points: [
          "Interactive 160-frame scroll-driven deconstruction showing aerodynamic airflow.",
          "Sonic Gallery generating live frequency response waveforms mapped to engine RPM.",
          "Bespoke material customizer for carbon-titanium weave and alcantara interior.",
        ],
      },
      engineering: {
        title: "Real-Time Frequency Analysis & PBR Clear-Coat Shaders",
        summary: "Engineered real-time FFT frequency analysis connected to reactive visual curves alongside lightweight vehicle 3D meshes.",
        points: [
          "Web Audio API AnalyserNode streaming 1024 frequency bins at 60 FPS.",
          "Custom metallic flake and clear-coat shaders simulating automotive paint depth.",
          "Responsive touch controls supporting 360-degree orbital camera rotation.",
        ],
      },
      rollout: {
        title: "Monaco Motor Showcase Digital Premiere",
        summary: "Launched during the Monaco private preview event for prospective hypercar allocation holders with outstanding engagement.",
        stats: [
          "7-week engineering sprint from initial model to live deployment",
          "300% increase in prospect session duration compared to static landing page",
          "60 FPS steady performance maintained across all mobile GPUs",
        ],
      },
      roadmap: {
        title: "Live Track Telemetry Playback & Bespoke Escrow Portal",
        summary: "Phase two integrates live track lap telemetry feeds in 3D and an allocation escrow management portal.",
        points: [
          "Dynamic downforce simulator based on selected wing angle and vehicle speed.",
          "Live Nürburgring lap telemetry playback in 3D.",
          "Allocation escrow and bespoke build tracking portal.",
        ],
      },
    },
    focus: "160-frame 3D sequence · Real-time Sonic visualizer · Bespoke material customizer",
    liveDemoAvailable: false,
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFlagshipProject(): Project {
  return projects.find((p) => p.tier === "flagship") ?? projects[0]!;
}

export function getFullstackProjects(): Project[] {
  return projects.filter((p) => p.tier === "fullstack");
}

export function getDesignProjects(): Project[] {
  return projects.filter((p) => p.tier === "design");
}

export const siteImages = Object.fromEntries(
  projects.map((p) => [p.slug, p.image])
) as Record<string, string>;

