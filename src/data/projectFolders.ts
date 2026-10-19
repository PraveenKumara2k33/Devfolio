import type { Project, ProjectFilter } from '../types/portfolio'
import { projects } from './portfolio'

export interface ProjectFileItem {
  id: string
  name: string
  filename: string
  spec: string
  points: string[]
  stack: string[]
  status: string
  image?: string
  gallery?: string[]
}

export interface ProjectFolder {
  id: string
  folderNumber: string
  title: string
  category: string
  role: string
  team: string
  summary: string
  filters: ProjectFilter[]
  featured?: boolean
  image?: string
  gallery?: string[]
  stack: string[]
  files: ProjectFileItem[]
  originalProject: Project
}

export const projectFolders: ProjectFolder[] = [
  {
    id: 'revenue-maxima',
    folderNumber: 'DIR 01',
    title: 'Revenue Maxima Hospitality Platform',
    category: 'Enterprise Hospitality SaaS',
    role: 'Full Stack Software Engineer',
    team: 'Product engineering team',
    summary:
      'A multi-product SaaS platform that brings booking, property operations, point of sale, workforce and guest relationships for hotels into one ecosystem.',
    filters: ['Full Stack', 'AI'],
    featured: true,
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Python', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker', 'JWT'],
    originalProject: projects[0],
    files: [
      {
        id: 'booking-engine',
        name: 'Booking Engine',
        filename: 'BookingEngine.tsx',
        spec: 'Real-time room availability, rate plan calculation, and direct hotel reservation gateway.',
        points: [
          'High-converting guest room search, date selection and real-time inventory allocation',
          'Dynamic multi-tier rate plans with automated room occupancy calculations',
          'Integrated tax slabs, GST breakdown, and online payment gateway processing',
          'Automated booking confirmation emails, voucher generation and PMS webhook sync',
        ],
        stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'FastAPI', 'PostgreSQL'],
        status: 'Live in Production',
      },
      {
        id: 'pms-core',
        name: 'Property Management (PMS)',
        filename: 'PropertyManagement.service.py',
        spec: 'Central operational dashboard handling front desk check-in/out, multi-property rooms, and night audits.',
        points: [
          'Front desk check-in and check-out workflows with identity verification',
          'Room status matrix (Clean, Dirty, Inspected, Out of Order) updated in real-time',
          'Multi-property centralized management with role-based staff access controls',
          'Automated daily night audit reconciliation and fiscal day-close transaction handling',
        ],
        stack: ['FastAPI', 'SQLAlchemy', 'PostgreSQL'],
        status: 'Live in Production',
      },
      {
        id: 'pos-terminal',
        name: 'Point of Sale (POS)',
        filename: 'POSTerminal.tsx',
        spec: 'Food & beverage billing system supporting floor table layouts, split bills, and kitchen tickets.',
        points: [
          'Interactive dining table management and room-service ordering interface',
          'Real-time Kitchen Order Ticket (KOT) routing to kitchen preparation stations',
          'Split-bill payments, discount coupon validation, and room-folio charge routing',
          'Offline-tolerant order queue with optimistic updates for uninterrupted service',
        ],
        stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'FastAPI', 'PostgreSQL'],
        status: 'Production Ready',
      },
      {
        id: 'housekeeping-sync',
        name: 'Housekeeping Operations',
        filename: 'HousekeepingSync.ts',
        spec: 'Mobile-responsive task scheduler coordinating room turnovers between front desk and cleaning staff.',
        points: [
          'Instant room readiness notifications sent between floor staff and front desk',
          'Automated room turnover task generation triggered immediately upon guest checkout',
          'Supervisor digital inspection checklists and maintenance repair tickets',
          'Guest room amenity and linen stock consumption logging',
        ],
        stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'FastAPI', 'PostgreSQL'],
        status: 'Production Service',
      },
      {
        id: 'hrms-workforce',
        name: 'Workforce HRMS',
        filename: 'WorkforceHRMS.py',
        spec: 'Staff scheduling, biometric attendance reconciliation, and payroll management.',
        points: [
          'Departmental shift roster management and automated schedule notifications',
          'Biometric punch-clock integration calculating regular and overtime hours',
          'Automated monthly salary calculation factoring statutory deductions and bonuses',
          'Employee leave application, approval hierarchy, and digital profile records',
        ],
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'React'],
        status: 'Production Service',
      },
      {
        id: 'crm-intelligence',
        name: 'CRM & Guest Intelligence',
        filename: 'GuestIntelligence.py',
        spec: 'Guest preferences repository, automated pre-arrival messaging, and loyalty tier management.',
        points: [
          'Comprehensive guest stay history, dietary preferences, and VIP status indicators',
          'Automated pre-arrival communications and personalized room upgrade suggestions',
          'Loyalty points accumulation, rewards tier calculation, and redemption tracking',
          'Post-stay feedback collection with sentiment trend tracking',
        ],
        stack: ['FastAPI', 'SQLAlchemy', 'PostgreSQL'],
        status: 'Active CRM',
      },
      {
        id: 'channel-manager',
        name: 'Channel Manager Sync',
        filename: 'ChannelManagerSync.py',
        spec: 'Two-way integration engine syncing inventory and rates with Booking.com, Agoda, and Expedia.',
        points: [
          'Two-way real-time XML and REST API synchronization across global OTAs',
          'Rate parity maintenance and minimum length-of-stay restriction broadcasts',
          'Instant room availability synchronization preventing accidental double-bookings',
          'Transaction-safe inventory updates preventing concurrent overbooking',
        ],
        stack: ['FastAPI', 'PostgreSQL', 'REST APIs', 'AWS'],
        status: 'Live Two-Way Sync',
      },
      {
        id: 'hospitality-website',
        name: 'Hospitality Webstore',
        filename: 'HospitalityStorefront.tsx',
        spec: 'High-conversion hotel property showcase with integrated direct booking flow.',
        points: [
          'Direct booking journeys reducing high third-party OTA commission fees',
          'High-resolution photo galleries, dining showcases, and amenity itineraries',
          'Sub-second first contentful paint (FCP) optimized with Vite and Tailwind CSS',
          'SEO-friendly structured schema metadata for high search engine visibility',
        ],
        stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        status: 'Live Storefront',
      },
    ],
  },
  {
    id: 'restaurant',
    folderNumber: 'DIR 02',
    title: 'Restaurant Management System',
    category: 'Full Stack Business Application',
    role: 'Developer',
    team: '4 members',
    summary:
      'An operations tool for restaurants that ties sales, inventory and staffing together with cost and profit reporting.',
    filters: ['Full Stack'],
    image: '/assets/projects/restaurant/Main.webp',
    gallery: [
      '/assets/projects/restaurant/Main.webp',
      '/assets/projects/restaurant/sales.webp',
      '/assets/projects/restaurant/costing.webp',
      '/assets/projects/restaurant/Ingredients.webp',
      '/assets/projects/restaurant/Builder.webp',
      '/assets/projects/restaurant/Labor.webp',
      '/assets/projects/restaurant/Overheads.webp',
    ],
    stack: ['React.js', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Chart.js'],
    originalProject: projects[1],
    files: [
      {
        id: 'sales-analytics',
        name: 'Sales Analytics Dashboard',
        filename: 'SalesAnalytics.tsx',
        spec: 'Visual revenue metrics, payment method distributions, and peak dining hours tracking.',
        points: [
          'Daily, weekly, and monthly revenue performance visualized using Chart.js',
          'Real-time order count tracking with live ticket average calculations',
          'Payment breakdown across Cash, Credit Cards, and UPI mobile transactions',
          'Exportable CSV and PDF financial reports for operational accounting',
        ],
        image: '/assets/projects/restaurant/sales.webp',
        stack: ['React.js', 'Chart.js', 'PHP', 'MySQL'],
        status: 'Verified ERP',
      },
      {
        id: 'inventory-ingredients',
        name: 'Inventory & Raw Ingredients',
        filename: 'InventoryIngredients.php',
        spec: 'Live stock tracking, threshold reorder warnings, and supplier replenishment records.',
        points: [
          'Real-time quantity tracking of kitchen ingredients down to grams and units',
          'Automated low-stock warning banners preventing kitchen stock-outs',
          'Supplier contact repository and purchase order generation',
          'Ingredient batch tracking and expiration date alerts minimizing food waste',
        ],
        image: '/assets/projects/restaurant/Ingredients.webp',
        stack: ['PHP', 'MySQL', 'React.js'],
        status: 'Verified ERP',
      },
      {
        id: 'workforce-labor',
        name: 'Workforce & Shift Scheduler',
        filename: 'WorkforceScheduler.tsx',
        spec: 'Kitchen and floor team shift allocations, hourly logs, and labor cost ratios.',
        points: [
          'Visual staff shift calendar for kitchen chefs and floor waitstaff',
          'Daily clock-in records and automated hourly wage expense tracking',
          'Labor-cost-to-sales percentage analytics displayed on manager dashboard',
          'Granular role-based view permissions protecting sensitive compensation data',
        ],
        image: '/assets/projects/restaurant/Labor.webp',
        stack: ['React.js', 'Bootstrap', 'PHP'],
        status: 'Verified ERP',
      },
      {
        id: 'cost-profit-analysis',
        name: 'Cost & Profit Margin Engine',
        filename: 'CostingProfitEngine.php',
        spec: 'Dish profit margin calculator factoring ingredient expenses and wastage impacts.',
        points: [
          'Dynamic dish cost calculations linked directly to raw ingredient purchase prices',
          'Automated profit margin percentage warnings for menu price adjustments',
          'Kitchen prep wastage logs calculating net bottom-line financial impact',
          'Target food cost benchmark tracking to optimize profitability',
        ],
        image: '/assets/projects/restaurant/costing.webp',
        stack: ['PHP', 'MySQL', 'Chart.js'],
        status: 'Verified ERP',
      },
      {
        id: 'recipe-builder',
        name: 'Recipe Builder & Standardization',
        filename: 'RecipeBuilder.tsx',
        spec: 'Standardized dish formulation tool with automatic cost calculations per serving.',
        points: [
          'Menu engineering interface defining precise ingredient weights and portions',
          'Automatic dish production cost recalculation upon vendor price adjustments',
          'Visual plating instructions and chef preparation guides',
          'Comprehensive allergen labeling (Gluten, Dairy, Nuts) ensuring diner safety',
        ],
        image: '/assets/projects/restaurant/Builder.webp',
        stack: ['React.js', 'Bootstrap', 'JavaScript'],
        status: 'Verified ERP',
      },
      {
        id: 'overheads-reporting',
        name: 'Overhead & P&L Reporting',
        filename: 'OverheadsReporting.tsx',
        spec: 'Fixed and variable expense accounting with consolidated profit & loss statements.',
        points: [
          'Tracking of utilities, rent, licenses, and fixed operating expenses',
          'Consolidated monthly P&L charts highlighting net operational cash flow',
          'Quarterly period-over-period comparative financial expense analysis',
          'Audit-ready record keeping with timestamped managerial modifications',
        ],
        image: '/assets/projects/restaurant/Overheads.webp',
        stack: ['Chart.js', 'Bootstrap', 'MySQL'],
        status: 'Verified ERP',
      },
    ],
  },
  {
    id: 'ecommerce',
    folderNumber: 'DIR 03',
    title: 'Real-Time E-Commerce Platform',
    category: 'Full Stack Web Application',
    role: 'Sole developer',
    team: 'Individual project',
    summary:
      'A storefront with live interactions over WebSockets, authentication and a complete checkout flow.',
    filters: ['Full Stack', 'Real-time'],
    image: '/assets/projects/ecommerce/e-commercemain.webp',
    gallery: [
      '/assets/projects/ecommerce/e-commercemain.webp',
      '/assets/projects/ecommerce/Home.webp',
      '/assets/projects/ecommerce/Buy.webp',
      '/assets/projects/ecommerce/Checkout.webp',
      '/assets/projects/ecommerce/Compare.webp',
      '/assets/projects/ecommerce/login-out.webp',
    ],
    stack: ['React.js', 'Node.js', 'Socket.IO', 'Tailwind CSS', 'REST APIs'],
    originalProject: projects[2],
    files: [
      {
        id: 'live-storefront',
        name: 'Live Storefront Catalog',
        filename: 'StorefrontCatalog.tsx',
        spec: 'Dynamic merchandise showcase with live inventory status and client-side search.',
        points: [
          'High-performance product showcase grid with responsive Tailwind CSS layout',
          'Instant client-side category filtering and multi-attribute search indexing',
          'Live stock indicator badges reflecting current availability in real-time',
          'Featured promotional banners and interactive flash discount showcases',
        ],
        image: '/assets/projects/ecommerce/Home.webp',
        stack: ['React.js', 'Tailwind CSS', 'Node.js'],
        status: 'Live Storefront',
      },
      {
        id: 'socket-sync',
        name: 'Socket.IO Live Synchronization',
        filename: 'SocketSyncService.ts',
        spec: 'Bi-directional WebSocket connection broadcasting live views and stock changes.',
        points: [
          'Real-time bi-directional WebSocket broadcast of item stock modifications',
          'Live active viewer count badges creating genuine purchase urgency',
          'Cart item reservation countdowns with automatic release upon expiry',
          'Resilient client reconnect handlers with heartbeat health ping checks',
        ],
        image: '/assets/projects/ecommerce/e-commercemain.webp',
        stack: ['Socket.IO', 'Node.js', 'React.js'],
        status: 'Live WebSockets',
      },
      {
        id: 'jwt-auth',
        name: 'JWT Authentication Gateway',
        filename: 'AuthController.js',
        spec: 'Secure token authentication, password hashing, and user profile persistence.',
        points: [
          'Secure JSON Web Token (JWT) session generation stored in httpOnly cookies',
          'User registration and login with bcrypt cryptographic password salting',
          'Protected user profile management and address book persistence',
          'Route guard middleware restricting access to authorized user accounts',
        ],
        image: '/assets/projects/ecommerce/login-out.webp',
        stack: ['Node.js', 'JWT', 'REST APIs'],
        status: 'Secure Auth',
      },
      {
        id: 'checkout-engine',
        name: 'Checkout & Transaction Engine',
        filename: 'CheckoutEngine.tsx',
        spec: 'Multi-step purchase workflow with shipping calculations and order confirmation.',
        points: [
          'Streamlined multi-step checkout funnel (Address, Shipping, Payment)',
          'Client-side address form validation with dynamic postal code lookups',
          'Automated order confirmation generation with itemized invoice receipts',
          'Simulated payment gateway processing with instant success feedback',
        ],
        image: '/assets/projects/ecommerce/Checkout.webp',
        stack: ['React.js', 'REST APIs', 'Tailwind CSS'],
        status: 'Checkout Verified',
      },
      {
        id: 'product-compare',
        name: 'Product Comparison Matrix',
        filename: 'ProductCompare.tsx',
        spec: 'Side-by-side technical spec comparison highlighting dynamic feature differentials.',
        points: [
          'Side-by-side technical spec comparison matrix for up to 4 products simultaneously',
          'Dynamic feature diffing highlighting attribute variations between models',
          'Direct one-click addition of preferred comparison items to shopping cart',
          'Persistent comparison drawer preserved across browser refresh sessions',
        ],
        image: '/assets/projects/ecommerce/Compare.webp',
        stack: ['React.js', 'Tailwind CSS', 'JavaScript'],
        status: 'Interactive Feature',
      },
      {
        id: 'cart-buy',
        name: 'Cart & Instant Order Flow',
        filename: 'CartGateway.ts',
        spec: 'Optimistic cart state manager with promo code discount validation.',
        points: [
          'Client-side optimistic cart updates providing immediate tactile feedback',
          'Dynamic quantity incrementation bounded by live backend inventory limits',
          'Promotional discount voucher code validation and price recalculation',
          'State persistence using local storage with server-side synchronization',
        ],
        image: '/assets/projects/ecommerce/Buy.webp',
        stack: ['React.js', 'Node.js', 'REST APIs'],
        status: 'Production Service',
      },
    ],
  },
  {
    id: 'portfolio-main',
    folderNumber: 'DIR 04',
    title: 'Portfolio Website v1 (Previous Portfolio)',
    category: 'Frontend · Live on Netlify',
    role: 'Designer & Frontend Developer',
    team: 'Individual project',
    summary:
      'My first developer portfolio, still live on Netlify: a multi-page React site with kinetic typography, a solar-system skills orbit, a skewed auto-scrolling skills marquee and separate pages for each project and qualification.',
    filters: ['Frontend'],
    image: '/assets/projects/portfolio_logo-800.webp',
    gallery: ['/assets/projects/portfolio_logo-800.webp'],
    stack: ['React.js', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Vite'],
    originalProject: projects[3],
    files: [
      {
        id: 'kinetic-typography',
        name: 'Kinetic Typography Engine',
        filename: 'KineticTypography.jsx',
        spec: 'Spring-physics letterform reveals, magnetic interactions, and responsive scaling.',
        points: [
          'Spring physics-driven letterform animations reacting dynamically to scroll',
          'Staggered text reveals powered by Framer Motion layout transformations',
          'Typography system paired with custom Google Fonts for high editorial contrast',
          'Optimized layout shifts avoiding Cumulative Layout Shift (CLS) penalties',
        ],
        image: '/assets/projects/portfolio_logo-800.webp',
        stack: ['React.js', 'JavaScript', 'Framer Motion', 'Tailwind CSS'],
        status: 'Kinetic UI',
      },
      {
        id: 'solar-orbits',
        name: 'Atomic Solar Orbit System',
        filename: 'SolarSystem.jsx',
        spec: 'Three concentric rotating planetary rings with counter-rotating tech planets.',
        points: [
          'Three concentric orbital rings calculated with mathematically balanced radii',
          'Counter-rotating upright planetary badges displaying verified skill logos',
          'Smooth continuous CSS animations with hover-pause physics for inspection',
          'Central glowing core with multi-stage ambient blur lighting effects',
        ],
        image: '/assets/projects/portfolio_logo-800.webp',
        stack: ['React.js', 'JavaScript', 'Framer Motion', 'SVG'],
        status: 'Interactive 3D',
      },
      {
        id: 'skewed-marquee',
        name: 'Skewed Continuous Marquee',
        filename: 'SkewedMarquee.jsx',
        spec: 'Infinite continuous vertical scroll skill marquee with 3D perspective transforms.',
        points: [
          'Continuous vertical auto-scrolling skill pill marquee running at 60fps',
          'Skewed 3D CSS perspective wrapper producing tangible physical depth',
          'Quadrupled loop sequence guaranteeing seamless infinite wrap-around',
          'Touch-friendly interactive pause allowing tactile inspection on mobile',
        ],
        image: '/assets/projects/portfolio_logo-800.webp',
        stack: ['React.js', 'JavaScript', 'CSS Transforms', 'Tailwind CSS'],
        status: 'Continuous Marquee',
      },
      {
        id: 'routed-pages',
        name: 'Project & Qualification Pages',
        filename: 'ProjectLayout.jsx',
        spec: 'Separate routed pages for each project and each qualification, with animated page transitions.',
        points: [
          'React Router pages for every project and every education/experience entry',
          'Shared layouts so each detail page keeps the same header, footer and styling',
          'Hash links that scroll straight to a section of the home page',
          'Framer Motion transitions when moving between pages',
        ],
        image: '/assets/projects/portfolio_logo-800.webp',
        stack: ['React.js', 'React Router', 'Framer Motion'],
        status: 'Routed Pages',
      },
      {
        id: 'design-tokens',
        name: 'Tailwind Design System Tokens',
        filename: 'DesignTokens.css',
        spec: 'Harmonious paper-and-ink palette, bespoke drop-shadows, and elevation tiers.',
        points: [
          'Harmonious color palette balancing warm paper sheets and crisp ink contrast',
          'Bespoke drop-shadow tokens simulating real tactile physical paper elevation',
          'Strict responsive grid utilities supporting mobile, tablet, and wide screens',
          'Accessible contrast compliance honoring prefers-reduced-motion preferences',
        ],
        image: '/assets/projects/portfolio_logo-800.webp',
        stack: ['Tailwind CSS', 'CSS Variables'],
        status: 'Design Tokens',
      },
      {
        id: 'vite-bundle',
        name: 'Vite High-Speed Bundling',
        filename: 'vite.config.js',
        spec: 'Sub-second Hot Module Replacement and production chunk-splitting architecture.',
        points: [
          'Lightning-fast development workflow with instant Hot Module Replacement (HMR)',
          'Optimised production build served as a static site',
          'Deployed on Netlify with a redirect rule so every route loads correctly',
          'Gzip-compressed assets for fast loading',
        ],
        image: '/assets/projects/portfolio_logo-800.webp',
        stack: ['Vite', 'Netlify'],
        status: 'Build Engine',
      },
    ],
  },
]
