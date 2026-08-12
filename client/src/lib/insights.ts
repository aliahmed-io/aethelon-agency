export type InsightSource = {
  label: string;
  url: string;
};

export type InsightSection = {
  heading: string;
  paragraphs: string[];
};

export type InsightArticle = {
  slug: string;
  index: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  stat: string;
  statLabel: string;
  statSource: string;
  deck: string;
  sections: InsightSection[];
  proof: string[];
  sources: InsightSource[];
};

export const insightArticles: InsightArticle[] = [
  {
    slug: "custom-storefront-vs-hosted-platform",
    index: "01",
    title: "A custom storefront is not anti-Shopify. It is a decision about control.",
    excerpt: "Hosted commerce is excellent infrastructure. The case for custom is what happens above it: the speed, story, discovery, and buying experience your brand can own.",
    category: "Strategy",
    tags: ["Custom Commerce", "Shopify", "Strategy"],
    readTime: "9 min",
    date: "2026 / 01",
    stat: "Target / sub-500ms",
    statLabel: "edge-cached page-load ambition from the product brief",
    statSource: "Internal capability target — verify with real-user monitoring before publishing as a result.",
    deck: "The wrong comparison is custom versus Shopify. The useful comparison is constrained storefront versus a storefront designed around the way a business actually sells.",
    sections: [
      {
        heading: "Keep the commerce engine where it is strong",
        paragraphs: [
          "Shopify, Stripe, tax services, shipping providers, and inventory systems solve hard operational problems. Rebuilding those systems merely to say a store is custom is expensive theatre. A sensible architecture can keep the proven commerce engine while replacing the layer shoppers actually experience with a tailored Next.js frontend.",
          "That separation gives a team a clearer choice. Keep product, checkout, payments, and fulfillment dependable; make the storefront, product discovery, content model, and premium presentation distinctive. The result is not platform rejection. It is platform discipline."
        ]
      },
      {
        heading: "Where custom becomes commercially useful",
        paragraphs: [
          "Custom earns its keep when a brand needs a different path to confidence: product configuration, guided discovery, a gated premium vault, a room-photo assistant, or content that behaves like part of the product rather than a campaign afterthought. Those are not decoration. They are places where a template can force the business into someone else’s assumptions.",
          "A custom route also makes performance and crawlability explicit. Google recommends server-side or pre-rendering for JavaScript applications because it helps users and crawlers, and it recommends unique titles, meaningful status codes, crawlable links, and consistent canonical URLs. Those foundations are easier to design into a route system than to retrofit after a storefront has accumulated exceptions."
        ]
      },
      {
        heading: "The decision rule",
        paragraphs: [
          "Choose a hosted theme when the product, merchandising, and content model fit the theme and the priority is speed to market. Choose a custom storefront when the buying experience itself is part of the competitive advantage. In both cases, measure the same things: qualified product discovery, checkout completion, speed, indexation, repeat purchase, and the cost of each future change.",
          "The promise is not that custom automatically converts better. The promise is that the system can be shaped around the problem instead of asking the problem to fit a template."
        ]
      }
    ],
    proof: ["Next.js App Router for server-rendered content", "Shopify-compatible headless commerce", "Product, account, checkout, and premium-portal flows", "Performance and SEO budgets measured in production"],
    sources: [
      { label: "Google / JavaScript SEO basics", url: "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics" },
      { label: "Google / Ecommerce structured data", url: "https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce" }
    ]
  },
  {
    slug: "why-3d-product-previews-earn-their-bandwidth",
    index: "02",
    title: "Why 3D previews are useful when the product has something to explain.",
    excerpt: "A good product visualizer does not exist to impress a visitor. It reduces uncertainty around shape, scale, material, configuration, or fit before the cart is involved.",
    category: "Product Experience",
    tags: ["3D / AR", "Product UX", "Conversion"],
    readTime: "7 min",
    date: "2026 / 02",
    stat: "More interactions",
    statLabel: "Google says 3D/AR products often receive more interactions than 2D-only products",
    statSource: "Google Merchant Center guidance; availability depends on market, product, and feed eligibility.",
    deck: "Three dimensions matter most when a shopper is trying to answer a physical question that a flat image cannot settle.",
    sections: [
      {
        heading: "Use the model to answer a question",
        paragraphs: [
          "A desktop 3D preview is useful for a chair whose back angle matters, a light whose material changes with rotation, or a product with configurable finishes. On mobile, a one-tap AR handoff can help someone understand scale in a room without installing another app. Google describes 3D as a way to view products from different angles and zoom into detail, and AR as a way to visualize a product in a real environment.",
          "That makes the design brief specific. Do not ask for 3D because it is fashionable. Ask which uncertainty the shopper has, then build the smallest visual interaction that resolves it."
        ]
      },
      {
        heading: "The commercial upside is confidence",
        paragraphs: [
          "The strongest 3D experience sits beside the ordinary buying path. Price, delivery, variant selection, material information, reviews, and add-to-cart remain visible. The model earns its bandwidth by supporting those decisions rather than forcing the shopper into a cinematic detour.",
          "A serious implementation also includes a fallback: a strong image set, captions, keyboard-accessible controls, motion reduction, and a lazy-loaded asset. That makes the experience resilient across device, network, and accessibility conditions."
        ]
      },
      {
        heading: "Measure the moment, not the novelty",
        paragraphs: [
          "Track model opens, rotation depth, AR launches, variant changes, add-to-cart rate, returns, and the conversion path for shoppers who used the visualizer versus a matched control group. The target is not more time on page. It is fewer unanswered questions and a cleaner path to a confident purchase.",
          "If the visualizer cannot change a decision, it is a decorative expense. If it resolves a real product question, it becomes part of the product education system."
        ]
      }
    ],
    proof: ["Interactive desktop product preview", "Google Scene Viewer / iOS Quick Look handoff pattern", "Variant-aware model states", "Fallback images and reduced-motion behavior"],
    sources: [{ label: "Google Merchant Center / 3D and AR", url: "https://support.google.com/merchants/answer/13675100?hl=en" }]
  },
  {
    slug: "why-an-ai-shopping-assistant-is-good",
    index: "03",
    title: "Why an AI shopping assistant is good when it shortens a decision.",
    excerpt: "The useful chatbot is not a floating mascot. It understands a shopper’s context, keeps the catalog honest, and hands the person back to a product page with better next steps.",
    category: "AI Commerce",
    tags: ["AI", "Chatbot", "Product Discovery"],
    readTime: "8 min",
    date: "2026 / 03",
    stat: "Capability, not theatre",
    statLabel: "Google documents AI-powered search and recommendations for websites and apps",
    statSource: "Google Cloud Retail documentation; capability evidence, not a universal conversion benchmark.",
    deck: "An assistant is commercially useful when the question is too nuanced for a filter and too important for a guess.",
    sections: [
      {
        heading: "Turn a vague need into a useful shortlist",
        paragraphs: [
          "A shopper may ask for a quiet reading chair for a small room, a gift for someone who likes warm woods, or a skincare routine for a specific constraint. A traditional category tree can answer some of this. A well-scoped assistant can translate the rest into product attributes, explain its reasoning, and show a shortlist that remains tied to the real catalog.",
          "Google’s retail documentation describes machine-learning-powered search and recommendation capabilities for websites and mobile apps. The design opportunity is to make that intelligence visible as useful merchandising: a clear answer, product evidence, and an easy way to refine."
        ]
      },
      {
        heading: "Guardrails are part of the experience",
        paragraphs: [
          "A commerce assistant should not invent stock, make unsupported medical claims, or pretend it knows a product better than the catalog does. It needs retrieval from current product data, a visible uncertainty state, human-authored fallback answers, and a route to a real person when the question is sensitive or high-value.",
          "The experience should also be measurable. Log intent, suggested products, refinements, handoffs, add-to-cart events, and unanswered questions. Those signals become a product-data backlog as much as an AI backlog."
        ]
      },
      {
        heading: "Make the assistant earn its place",
        paragraphs: [
          "Start with one job: guided product discovery, order-status support, or pre-purchase education. Do not launch a general-purpose box that can do none of them reliably. A smaller assistant with clean retrieval and clear boundaries builds more trust than a larger one that improvises.",
          "The measure of success is not conversation length. It is a shorter route from intent to a product the shopper can understand and choose."
        ]
      }
    ],
    proof: ["Catalog-grounded answers", "Explicit uncertainty and human handoff states", "Conversation-to-product analytics", "Admin review of unanswered intents"],
    sources: [{ label: "Google Cloud / Retail AI search and recommendations", url: "https://docs.cloud.google.com/retail/docs" }]
  },
  {
    slug: "why-ai-advanced-search-is-good",
    index: "04",
    title: "Why advanced AI search is good before it is clever.",
    excerpt: "Better search is not only vector embeddings. It is tolerant input, useful autocomplete, understandable filters, merchandising rules, and a result page that knows what the shopper meant.",
    category: "AI Commerce",
    tags: ["AI Search", "Semantic Search", "UX"],
    readTime: "8 min",
    date: "2026 / 04",
    stat: "31 guidelines",
    statLabel: "Baymard condensed search findings from testing 19 leading ecommerce sites",
    statSource: "Baymard Ecommerce Search research; use as UX evidence, not as a promised lift.",
    deck: "The search field is a product surface. If it mishandles intent, the catalog can be excellent and still feel empty.",
    sections: [
      {
        heading: "Exact-match search is not enough",
        paragraphs: [
          "People search in descriptions, attributes, use cases, colors, room names, misspellings, and half-remembered phrases. A 768-dimensional semantic index can help connect ‘minimalist reading chair’ to products whose catalog language says lounge, oak, compact, or low-back. But the index only becomes valuable when it is paired with a catalog that has clean attributes and an interface that explains the result.",
          "Baymard’s research condensed findings into 31 search UX guidelines after testing 19 leading ecommerce sites and documenting more than 700 search-specific usability issues. More than half of the guidelines concern the search field, autocomplete, and results interaction—not only the underlying search logic."
        ]
      },
      {
        heading: "Build a search system, not a demo",
        paragraphs: [
          "A credible system combines typo tolerance, lexical matching, semantic retrieval, synonyms, zero-result recovery, category-aware filters, and a way for merchandisers to override poor results. It should support natural language without making exact product names harder to find.",
          "The interface should show what happened: matched attributes, active filters, related terms, and a clear route back to the full catalog. That makes AI feel like a helpful layer over a reliable system rather than a black box in the middle of the store."
        ]
      },
      {
        heading: "Measure discovery quality",
        paragraphs: [
          "Track zero-result rate, search exits, reformulations, autocomplete selection, filter use, product views, add-to-cart, and revenue per search session. Review the queries that fail every week. Those queries reveal missing attributes, missing content, and the language customers actually use.",
          "The goal is not to make search sound intelligent. The goal is to make more of the catalog findable without making the shopper work for it."
        ]
      }
    ],
    proof: ["768-dimensional semantic index pattern", "Typo-tolerant lexical fallback", "Query analytics and zero-result review", "Merchandiser override layer"],
    sources: [{ label: "Baymard / Ecommerce Search UX research", url: "https://baymard.com/research/ecommerce-search" }]
  },
  {
    slug: "cart-recovery-that-respects-intent",
    index: "05",
    title: "Cart recovery works better when it respects intent.",
    excerpt: "An abandoned cart is not a permission slip to shout. Recovery should answer why the shopper paused, remove friction, and stop when the person has made a choice.",
    category: "Growth Systems",
    tags: ["Recovery", "Lifecycle", "Checkout"],
    readTime: "7 min",
    date: "2026 / 05",
    stat: "70.19%",
    statLabel: "Baymard’s tracked global average cart-abandonment rate",
    statSource: "Baymard checkout research; an aggregate benchmark, not a forecast for a particular store.",
    deck: "Recovery is not a campaign. It is the continuation of a buying journey that was interrupted for a reason.",
    sections: [
      {
        heading: "Start with the interruption",
        paragraphs: [
          "Price, delivery uncertainty, account friction, comparison shopping, distraction, and a broken checkout all look like the same thing in a basic analytics report. The first job is to distinguish them. Baymard reports a tracked global average abandonment rate of 70.19%, while its checkout benchmark says 65% of analyzed sites have mediocre-or-worse checkout performance. The scale of the opportunity is real; the cause is always specific to the store.",
          "That is why a recovery system needs context: cart contents, stock status, delivery promise, discount history, customer status, and the point where the journey stopped."
        ]
      },
      {
        heading: "Use a small, deliberate sequence",
        paragraphs: [
          "A practical baseline is a one-hour reminder that restores the cart and answers the most likely question, followed by a 24-hour message with useful product context or support. The system should suppress messages after purchase, respect consent, avoid discounting by reflex, and escalate only when there is a reason.",
          "The best recovery copy is often plain: ‘You left these behind. Need help with delivery, fit, or payment?’ That creates a route back without treating every pause as a negotiation."
        ]
      },
      {
        heading: "Measure profit, not opens",
        paragraphs: [
          "Track recovered revenue, margin after incentives, unsubscribe rate, complaint rate, time to purchase, and assisted conversion by sequence step. A high open rate with low profit is not recovery; it is activity. Test the checkout and the message together because fixing the underlying friction is usually more durable than sending more reminders.",
          "Baymard’s research says a large ecommerce site could potentially improve conversion by 35% through checkout usability improvements. Treat that as potential opportunity, never as a promise."
        ]
      }
    ],
    proof: ["1-hour and 24-hour recovery sequence pattern", "Cart and checkout event tracking", "Consent-aware suppression", "Margin-aware incentive rules"],
    sources: [{ label: "Baymard / Checkout Usability research", url: "https://baymard.com/research/checkout-usability" }]
  },
  {
    slug: "newsletter-and-lifecycle-email",
    index: "06",
    title: "A newsletter is useful when it behaves like a relationship, not a broadcast.",
    excerpt: "Email earns attention when it helps people decide, return, learn, or maintain a product. The list is an owned channel only when the value is clear and consent is respected.",
    category: "Growth Systems",
    tags: ["Newsletter", "Email", "Retention"],
    readTime: "7 min",
    date: "2026 / 06",
    stat: "$36 : $1",
    statLabel: "Litmus average email-marketing ROI benchmark",
    statSource: "Litmus; results vary by industry, permission, list quality, frequency, testing, and analytics.",
    deck: "The right question is not ‘How often can we email?’ It is ‘What useful reason does this person have to hear from us?’",
    sections: [
      {
        heading: "Build the list around permission and usefulness",
        paragraphs: [
          "Litmus reports an average email marketing ROI of $36 for every dollar spent, but the same source emphasizes that performance changes with industry, list size, permission practices, frequency, creative, testing, and analytics. That makes the number a benchmark, not a forecast.",
          "A useful newsletter tells a subscriber what they will get: new product context, considered edits, care guidance, access, or a point of view. A plain-language opt-in and a clear unsubscribe are not compliance chores; they are part of the trust experience."
        ]
      },
      {
        heading: "Create a lifecycle, not a pile of campaigns",
        paragraphs: [
          "A strong system distinguishes welcome, browse, cart, post-purchase, replenishment, launch, and re-engagement moments. The content should change with the relationship. Someone who just bought needs care and delivery information; someone browsing a category may need a guide or a comparison; a long-term customer may value access and relevance over a discount.",
          "A prompt-to-HTML campaign generator can speed production, but it should not remove review. Every message still needs brand voice, accurate product data, accessible markup, deliverability checks, and a human decision about whether the email deserves to exist."
        ]
      },
      {
        heading: "Judge the channel by contribution",
        paragraphs: [
          "Measure revenue per recipient, margin, list growth, unsubscribe and complaint rates, click-to-purchase time, repeat purchase, and assisted conversions. Compare segments rather than celebrating a blended average. The goal is a durable audience that wants the next useful note, not an ever-growing list that quietly loses trust.",
          "Email becomes an ecommerce advantage when it carries the product story beyond the first visit without pretending every subscriber has the same reason to care."
        ]
      }
    ],
    proof: ["Consent-first newsletter capture", "Welcome, cart, post-purchase, and re-engagement flows", "Markdown content and prompt-to-HTML campaign workflow", "Revenue and deliverability measurement"],
    sources: [{ label: "Litmus / Email Marketing ROI", url: "https://www.litmus.com/resources/email-marketing-roi" }]
  },
  {
    slug: "seo-for-commerce-that-compounds",
    index: "07",
    title: "SEO for ecommerce is a product system, not a metadata sprint.",
    excerpt: "Search visibility compounds when product data, page architecture, performance, internal linking, structured data, and useful editorial content agree with each other.",
    category: "Performance & SEO",
    tags: ["SEO", "Next.js", "Technical SEO"],
    readTime: "10 min",
    date: "2026 / 07",
    stat: "3 phases",
    statLabel: "Google describes Search processing as crawling, rendering, and indexing",
    statSource: "Google Search Central JavaScript SEO basics.",
    deck: "A search-ready store gives both shoppers and crawlers a clear answer to three questions: what is this page, how does it connect to the catalog, and why should it be trusted?",
    sections: [
      {
        heading: "Make the important content present early",
        paragraphs: [
          "Google explains that JavaScript pages move through crawling, rendering, and indexing, and says server-side or pre-rendering is still a great idea because it improves speed and helps crawlers that do not run JavaScript. That is a strong argument for rendering product, category, article, and organization content in the initial response rather than hiding the store behind a client-only app shell.",
          "In practical terms, give every important URL a unique title, useful meta description, one clear heading, descriptive copy, crawlable links, stable status code, canonical URL, and a sensible internal-link path."
        ]
      },
      {
        heading: "Use structured data to reduce ambiguity",
        paragraphs: [
          "Google says structured data can improve its understanding of ecommerce pages and calls out BreadcrumbList, Organization, Product/ProductGroup, Review, and VideoObject as especially relevant. Markup is not a ranking guarantee, but it gives the search engine a more precise description of the information already visible on the page.",
          "The same rule applies to XML sitemaps: Google recommends absolute URLs, wants canonical pages rather than every filtered duplicate, and describes a sitemap as a hint—not a guarantee of crawling or indexing."
        ]
      },
      {
        heading: "Build a measurement loop",
        paragraphs: [
          "Track indexed pages, impressions, qualified clicks, query groups, non-brand traffic, product-rich-result coverage, Core Web Vitals, crawl errors, and assisted conversions. Review templates, not just individual URLs. A recurring pattern of empty category pages, duplicate filters, or thin product content is a product backlog, not an SEO mystery.",
          "The SEO plan for Commerce Studio is therefore technical and editorial: native routes, canonical metadata, sitemap and robots files, Product and Article schema where truthful, fast imagery, meaningful internal links, and a knowledge hub that answers questions before the shopper asks them."
        ]
      }
    ],
    proof: ["Next.js server-rendered route segments", "Canonical and sitemap controls", "Organization, Article, Breadcrumb, Product, and Review schema patterns", "Core Web Vitals and indexation monitoring plan"],
    sources: [
      { label: "Google / JavaScript SEO basics", url: "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics" },
      { label: "Google / Ecommerce structured data", url: "https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce" },
      { label: "Google / Canonicalization", url: "https://developers.google.com/search/docs/crawling-indexing/canonicalization" },
      { label: "Google / Build and submit a sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap" }
    ]
  },
  {
    slug: "ecommerce-strategy-before-the-redesign",
    index: "08",
    title: "The ecommerce strategy is the part that tells the build what not to do.",
    excerpt: "Good strategy turns a list of features into a sequence of decisions: who is buying, what uncertainty blocks them, and which system change creates the most leverage first.",
    category: "Strategy",
    tags: ["Strategy", "UX", "Operations"],
    readTime: "8 min",
    date: "2026 / 08",
    stat: "32 improvements",
    statLabel: "Baymard says the average site has 32 unique checkout improvements available",
    statSource: "Baymard checkout benchmark; directional opportunity, not a promised result.",
    deck: "A redesign without a strategy is a larger surface area for the same uncertainty.",
    sections: [
      {
        heading: "Start with the constraint",
        paragraphs: [
          "A brand can say it needs a new storefront when the real problem is an unclear catalog, a slow internal workflow, weak repeat purchase, or product pages that do not answer fit questions. Strategy names the constraint before the interface starts collecting features.",
          "Baymard’s checkout research found that the average site has 32 unique checkout improvements available. That number is useful because it makes the point: there is rarely one magic redesign. There is a system of smaller decisions, and sequencing them matters."
        ]
      },
      {
        heading: "Turn capabilities into a priority ladder",
        paragraphs: [
          "A practical ladder starts with foundations—catalog model, payment, inventory, tax, fulfillment, analytics, and accessibility—then moves to decision support such as filters, reviews, semantic search, content, and visualization. Only after that should the team add premium surfaces like a gated vault, AI workspace vision, or cinematic motion.",
          "That does not make the premium layer less ambitious. It makes it more credible because the foundation can carry the attention it creates."
        ]
      },
      {
        heading: "Measure the whole system",
        paragraphs: [
          "Use a small set of business measures: qualified discovery, product comprehension, checkout completion, recovered carts, repeat purchase, support load, fulfillment time, margin, and cost to release. Add experience measures such as Largest Contentful Paint, accessibility issues, zero-result search, and error rates.",
          "The strategy is working when the next release becomes easier to choose—not because there are fewer ideas, but because the system makes the important ones obvious."
        ]
      }
    ],
    proof: ["Constraint-led discovery", "Commerce-system prioritization", "Analytics and UX evidence in the same backlog", "Foundation-first release sequencing"],
    sources: [{ label: "Baymard / Checkout Usability research", url: "https://baymard.com/research/checkout-usability" }]
  },
  {
    slug: "reviews-comments-and-earned-trust",
    index: "09",
    title: "Reviews and comments are useful when the system earns the trust they display.",
    excerpt: "Social proof is not a wall of praise. It is verified context, honest variation, visible answers, and a moderation system that lets a brand learn from criticism.",
    category: "Trust & Content",
    tags: ["Reviews", "Comments", "Trust"],
    readTime: "8 min",
    date: "2026 / 09",
    stat: "+270%",
    statLabel: "Northwestern reports higher purchase likelihood with five reviews versus none in its study",
    statSource: "Spiegel Research Center; study first published in 2017, directional rather than universal.",
    deck: "The most persuasive review system is not the one with the highest average rating. It is the one a skeptical shopper can believe.",
    sections: [
      {
        heading: "A little evidence can change the decision",
        paragraphs: [
          "Northwestern’s Spiegel Research Center reports that purchase likelihood for a product with five reviews was 270% greater than for a product with no reviews in its study context. It also found conversion effects varied by price point and that purchase likelihood peaked in a 4.0–4.7 rating range rather than at a perfect five.",
          "The lesson is not to chase a number. It is to make the product experience legible through specific, believable detail: what the item feels like, how it fits, what surprised someone, and who it is not for."
        ]
      },
      {
        heading: "Comments are a product-data loop",
        paragraphs: [
          "A moderated comment or Q&A system lets prospective customers ask the question the product page forgot. It also gives the team a signal about unclear sizes, missing photos, packaging issues, and repeat support requests. That is valuable only when the business is willing to surface useful answers rather than hide friction.",
          "Verification, consent, rate limits, moderation, abuse reporting, and transparent edits are part of the feature. Never invent reviews, ratings, comments, or testimonials. A blank state is more credible than fabricated proof."
        ]
      },
      {
        heading: "Design trust for search as well",
        paragraphs: [
          "Google identifies Review structured data as relevant to ecommerce, but the markup must describe visible, truthful content. Connect the review system to Product pages, moderation history, and customer permissions. Use structured data only where it is eligible and accurate.",
          "The strategic payoff is larger than a star widget: better product education, better merchandising feedback, more honest expectation-setting, and a storefront that feels like it knows the product."
        ]
      }
    ],
    proof: ["Verified review collection", "Moderated comments and product Q&A", "Sentiment analysis for admin alerts", "Review schema only for visible truthful content"],
    sources: [
      { label: "Northwestern / How online reviews influence sales", url: "https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/" },
      { label: "Google / Ecommerce structured data", url: "https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce" }
    ]
  },
  {
    slug: "ai-workspace-vision-for-product-fit",
    index: "10",
    title: "AI workspace vision is good when it helps a shopper imagine the fit.",
    excerpt: "A room-photo assistant can make product discovery more personal, but the output should be guidance with evidence—not a confident hallucination about someone’s home.",
    category: "AI Commerce",
    tags: ["AI", "Vision", "Personalization"],
    readTime: "6 min",
    date: "2026 / 10",
    stat: "Input → context",
    statLabel: "A room photo can turn a generic catalog question into a context-aware shortlist",
    statSource: "Product capability pattern from the supplied Commerce Studio brief; validate accuracy with human review and testing.",
    deck: "The best personalization starts with the shopper’s context, but it never pretends the model can see more than the image and catalog allow.",
    sections: [
      {
        heading: "Make the photo useful",
        paragraphs: [
          "A shopper can upload a room photo and ask which pieces will work with the lighting, space, and style. The assistant can identify visible constraints, ask a follow-up question, and return a shortlist with reasons. That is more useful than showing a generic ‘recommended for you’ rail with no explanation.",
          "The experience should make its limits obvious. A photo does not reveal structural measurements, exact color under every light, or a person’s budget. Ask for the missing detail instead of guessing."
        ]
      },
      {
        heading: "Trust is the conversion feature",
        paragraphs: [
          "Explain how images are used, whether they are stored, and how a shopper can delete them. Keep the output tied to current product data and visible attributes. If the model is uncertain, say so. If a product is not actually in stock, do not recommend it simply because it matches the image.",
          "The strongest proof is a useful path: photo → explanation → shortlist → product page → saved configuration or cart."
        ]
      }
    ],
    proof: ["Image upload and privacy explanation", "Catalog-grounded visual analysis", "Explainable shortlist output", "Human-readable uncertainty states"],
    sources: [{ label: "Google Cloud / Retail AI capabilities", url: "https://docs.cloud.google.com/retail/docs" }]
  },
  {
    slug: "the-operating-system-behind-a-better-store",
    index: "11",
    title: "The best ecommerce features also make the business easier to run.",
    excerpt: "Inventory history, tax, fulfillment, campaign tooling, sentiment alerts, and daily strategy briefs are not back-office extras. They determine how quickly the storefront can stay true.",
    category: "Operations",
    tags: ["Operations", "Inventory", "AI"],
    readTime: "8 min",
    date: "2026 / 11",
    stat: "One ledger",
    statLabel: "Every RESTOCK, SALE, and RETURN should be explainable in the inventory history",
    statSource: "Operational design principle from the supplied Commerce Studio brief; measure accuracy and reconciliation in production.",
    deck: "A storefront cannot stay elegant if the systems behind it make every update feel like a fire drill.",
    sections: [
      {
        heading: "Make changes traceable",
        paragraphs: [
          "An immutable inventory ledger that records restocks, sales, and returns gives the team a shared explanation for what happened. A nested product CMS makes categories, attributes, and variants easier to manage. Automated tax and shipping workflows reduce the amount of product truth that lives in a spreadsheet or a person’s memory.",
          "That matters to the customer because the visible promise—available, ships by Friday, available in this finish—depends on operations being able to support it."
        ]
      },
      {
        heading: "AI should surface decisions, not hide them",
        paragraphs: [
          "An AI COO can turn sales velocity and inventory turnover into a daily strategy brief. A sentiment analyst can flag a cluster of negative review language before it becomes a returns problem. A campaign generator can reduce production time. None of these should become autonomous truth machines.",
          "The best workflow is alert → evidence → human decision → recorded action. That keeps the business accountable while reducing the time it takes to notice a pattern."
        ]
      }
    ],
    proof: ["Immutable inventory event history", "Order and shipping workflow", "AI strategy briefs with evidence links", "Sentiment alerts with human review"],
    sources: [{ label: "Google / Ecommerce structured data context", url: "https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce" }]
  },
  {
    slug: "global-commerce-without-global-confusion",
    index: "12",
    title: "Global commerce is a clarity problem before it is a translation problem.",
    excerpt: "Language, currency, tax, delivery, and support must agree on every route. A second language that still shows the wrong tax model is not localization; it is new friction.",
    category: "Commerce Systems",
    tags: ["Localization", "Tax", "International"],
    readTime: "6 min",
    date: "2026 / 12",
    stat: "2 additional languages",
    statLabel: "A manageable first step for full-UI localization in the supplied system brief",
    statSource: "Internal capability scope — validate translation quality, tax logic, and regional legal requirements before launch.",
    deck: "Internationalization is a promise that the business understands the buyer’s context all the way through fulfillment.",
    sections: [
      {
        heading: "Translate the system, not just the labels",
        paragraphs: [
          "Localization touches navigation, product attributes, checkout instructions, support content, delivery language, email, legal pages, and account flows. A route can look translated and still fail if the product name, size convention, tax presentation, or return policy is not locally understandable.",
          "Start with the countries the operation can actually serve well. Then make the language and tax model explicit at the point of choice, not only in a footer."
        ]
      },
      {
        heading: "Make the promise operational",
        paragraphs: [
          "A global tax engine can map inclusive VAT and exclusive sales tax models, but the storefront still needs clear copy and a checkout that shows what the customer will pay. Shipping labels, inventory, payment webhooks, customer support, and post-purchase email must use the same region context.",
          "The measure of localization is not the number of translated strings. It is fewer questions, fewer checkout surprises, and fewer operational exceptions after the order is placed."
        ]
      }
    ],
    proof: ["Locale-aware routing", "Inclusive and exclusive tax display", "Localized checkout and transactional content", "Fulfillment and support context carried after purchase"],
    sources: [{ label: "Google / Canonicalization and regional variants", url: "https://developers.google.com/search/docs/crawling-indexing/canonicalization" }]
  }
];

export const insightTopics = [
  "All",
  "Strategy",
  "AI Commerce",
  "3D / AR",
  "Growth Systems",
  "Performance & SEO",
  "Trust & Content",
  "Operations",
  "Commerce Systems",
] as const;

export const getInsight = (slug: string) => insightArticles.find((article) => article.slug === slug);
