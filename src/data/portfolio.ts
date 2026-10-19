/**
 * Central portfolio content — edit this file to update the site.
 * Source: profile.md and CONTENT.md. Nothing here is invented; where a
 * value is unknown it is left undefined and the UI hides it.
 */
import type {
  Education,
  NavTab,
  Profile,
  Project,
  Publication,
  Role,
  SkillGroup,
  SocialLink,
} from '../types/portfolio'

export const navTabs: NavTab[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' },
]

export const profile: Profile = {
  name: 'PraveenKumar A',
  firstName: 'PraveenKumar',
  title: 'Full Stack Software Engineer',
  company: 'Revenue Maxima',
  tagline:
    'Building scalable hospitality platforms, intelligent business systems, and AI-powered digital experiences.',
  intro:
    'I build reliable web applications end to end — from database design and FastAPI services to React interfaces and cloud deployment. Currently engineering a unified, full-stack hospitality platform.',
  about: [
    'I am a Software Engineer focused on building scalable, reliable, and user-centric web applications. My experience spans frontend development, backend API engineering, database design, and deployment workflows, using React.js, TypeScript, Python, FastAPI, PostgreSQL, and Docker.',
    'I have hands-on experience developing hospitality technology — booking engines, property management systems, and customer relationship management platforms. I enjoy translating business requirements into practical software, designing maintainable architectures, and solving real-world engineering problems.',
    'I am continuously strengthening my foundations in data structures and algorithms, system design, software testing, and cloud technologies. My goal is to build impactful products, contribute to high-performing engineering teams, and ship software that creates measurable business value.',
  ],
  email: 'apraveenkumar720@gmail.com',
  resumeUrl: '/img/PraveenKumar_A_Resume.pdf',
  resumeFileName: 'PraveenKumar_A_Resume.pdf',
  photoUrl: '/img/Praveenkumar_2.webp',
  availability: undefined,
  focus: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'AWS', 'API Architecture', 'AI Applications'],
  mindset: [
    'Business requirement',
    'System & data design',
    'Backend architecture',
    'API development',
    'Frontend engineering',
    'Third-party integrations',
    'Testing & optimization',
    'Cloud deployment',
    'Production software',
  ],
  interests: [
    'Full Stack Engineering',
    'Backend Architecture',
    'System Design',
    'Scalable SaaS Platforms',
    'API Engineering',
    'Cloud Architecture',
    'AI Application Development',
    'Intelligent Automation',
    'Hospitality Technology',
    'Data-driven Products',
  ],
  aiDirection: [
    'AI hospitality assistants',
    'Guest concierge systems',
    'Guest sentiment analysis',
    'Personalized recommendations',
    'CRM next-best-action',
    'AI-assisted support',
    'Automated workflows',
    'Natural-language interfaces',
    'LLM-powered internal tools',
    'Revenue intelligence',
  ],
  closingLine: 'Build with purpose. Engineer for scale. Use AI where it creates real value.',
}

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', handle: 'praveenkumar2k33', icon: 'linkedin', url: 'https://www.linkedin.com/in/praveenkumar2k33/' },
  { label: 'GitHub', handle: 'PraveenKumara2k33', icon: 'github', url: 'https://github.com/PraveenKumara2k33' },
  { label: 'LeetCode', handle: 'apraveenkumar', icon: 'leetcode', url: 'https://leetcode.com/u/apraveenkumar/' },
  { label: 'HackerRank', handle: 'apraveenkumar720', icon: 'hackerrank', url: 'https://www.hackerrank.com/profile/apraveenkumar720' },
  { label: 'SkillRack', handle: 'Resume #320627', icon: 'skillrack', url: 'https://www.skillrack.com/faces/resume.xhtml?id=320627&key=b613186118ca2f8cfe1ceba5d9d4b9614c38cfda' },
  { label: 'Instagram', handle: 'pravxxn_verse', icon: 'instagram', url: 'https://www.instagram.com/pravxxn_verse/' },
]

export const ecosystem: string[] = [
  'Booking Engine',
  'Property Management',
  'Point of Sale',
  'Housekeeping',
  'HRMS',
  'CRM',
  'Channel Manager',
  'Hospitality Websites',
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    icon: 'frontend',
    primary: [
      {
        label: 'Core',
        items: ['React 18/19', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Vite'],
      },
      { label: 'State & forms', items: ['Redux Toolkit', 'RTK Query', 'React Router', 'React Hook Form', 'Zod'] },
    ],
    capabilities: [
      'Component architecture',
      'Reusable UI systems',
      'Responsive design',
      'Dashboards',
      'Role-based interfaces',
      'Performance optimization',
    ],
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: 'backend',
    primary: [
      { label: 'Primary', items: ['Python', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'Alembic', 'Uvicorn', 'JWT'] },
      { label: 'Additional', items: ['Java', 'Spring Boot', 'Servlets', 'JSP', 'Hibernate', 'Node.js'] },
    ],
    capabilities: [
      'REST API design',
      'JWT auth & RBAC',
      'Validation',
      'Pagination, filtering, sorting',
      'Transactions',
      'External integrations',
      'Background processing',
    ],
  },
  {
    id: 'database',
    title: 'Database Engineering',
    icon: 'database',
    primary: [{ label: 'Databases', items: ['PostgreSQL', 'MySQL', 'Oracle', 'SQL'] }],
    capabilities: [
      'Relational schema design',
      'Migrations with Alembic',
      'Indexing',
      'Data integrity',
      'Server-side pagination',
      'Query optimization',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'cloud',
    primary: [
      { label: 'AWS', items: ['ECS Fargate', 'S3', 'CloudFront', 'API Gateway', 'KMS'] },
      { label: 'Tooling', items: ['Docker', 'Git', 'GitHub', 'Postman'] },
    ],
    capabilities: [
      'Containerized apps',
      'Environment-based config',
      'Caching',
      'API security',
      'Logging',
      'Production debugging',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Intelligent Apps',
    icon: 'ai',
    primary: [
      {
        label: 'Focus',
        items: ['AI API integration', 'LLM applications', 'Chatbots', 'Intelligent assistants', 'Recommendations', 'Sentiment analysis'],
      },
    ],
    capabilities: ['AI-assisted CRM', 'Natural-language interfaces', 'AI automation', 'Personalization', 'Hospitality AI'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    icon: 'architecture',
    primary: [
      { label: 'Patterns', items: ['REST architecture', 'Modular architecture', 'Multi-property SaaS', 'API-driven apps'] },
    ],
    capabilities: ['Payment integrations', 'OTA integrations', 'Background jobs', 'Caching strategy', 'JWT security'],
  },
]

export const aiMatrix: { capability: string; application: string }[] = [
  { capability: 'AI Concierge', application: 'Guest assistance and recommendations' },
  { capability: 'Guest Intelligence', application: 'Understand guest preferences and behavior' },
  { capability: 'Sentiment Analysis', application: 'Analyze reviews and feedback' },
  { capability: 'Next Best Action', application: 'Recommend sales and service actions' },
  { capability: 'AI CRM Assistant', application: 'Summarize guest history and interactions' },
  { capability: 'Revenue Intelligence', application: 'Identify business and booking patterns' },
]

export const experience: Role[] = [
  {
    id: 'revenue-maxima',
    company: 'Revenue Maxima',
    title: 'Full Stack Software Engineer',
    period: 'Current',
    current: true,
    logo: '/assets/skills/REVENUE_MAXIMA_LOGO.webp',
    summary:
      'Working on a multi-product hospitality technology platform that unifies hotel operations, distribution, customer engagement, workforce management, and business processes.',
    highlights: [
      'Build features across the Booking Engine, PMS, POS, Housekeeping, HRMS, CRM, Channel Manager, and hotel websites.',
      'Develop FastAPI services with SQLAlchemy and PostgreSQL alongside React + TypeScript interfaces.',
      'Integrate payment gateways, OTA channels, and authentication services into booking and operations flows.',
      'Manage application state with a Redux Toolkit store and handle API calls, caching and loading states with RTK Query.',
      'Work with AWS infrastructure — ECS Fargate, S3, CloudFront and API Gateway — and containerised deployments with Docker.',
    ],
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker'],
    modules: [
      {
        id: 'booking',
        name: 'Booking Engine',
        points: [
          'Room search, availability and inventory',
          'Rate plans, guest details and booking workflows',
          'Tax & GST handling and payment processing',
          'Booking confirmation, authentication and API integration',
        ],
        stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'FastAPI', 'PostgreSQL', 'Payment integrations'],
      },
      {
        id: 'pms',
        name: 'PMS',
        points: [
          'Reservations, check-in and check-out',
          'Room inventory & status, rate plans, tax slabs, GST config',
          'Guest management and multi-property operations',
          'Operational dashboards and night audit workflows',
        ],
      },
      {
        id: 'pos',
        name: 'POS',
        points: [
          'Menus, categories and modifiers',
          'Table management, floor maps and orders',
          'Kitchen Display System, payments, GST & taxes',
          'Thermal receipts and room charge integration',
        ],
      },
      {
        id: 'housekeeping',
        name: 'Housekeeping',
        points: [
          'Room status and cleaning workflows',
          'Task and staff assignment',
          'Room readiness and operational tracking',
          'Housekeeping dashboards',
        ],
      },
      {
        id: 'hrms',
        name: 'HRMS',
        points: [
          'Employee and organization management',
          'Attendance, work shifts and payroll',
          'Employee lifecycle workflows',
          'HR dashboards with role-based access',
        ],
      },
      {
        id: 'crm',
        name: 'CRM',
        points: [
          'Guest profiles, guest journey, leads and sales',
          'Segments, loyalty, feedback, reviews and complaints',
          'Vouchers, offers, contracts, service & support',
          'AI direction: profile summaries, sentiment, next-best-action',
        ],
      },
      {
        id: 'channel',
        name: 'Channel Manager',
        points: [
          'Channel, inventory and availability sync',
          'Rate and booking synchronization',
          'Rate parity across channels',
          'Multi-channel distribution via API integrations',
        ],
      },
      {
        id: 'websites',
        name: 'Websites',
        points: [
          'Hotel websites, property pages and room showcases',
          'Direct booking journeys, offers and dining',
          'Responsive, conversion-focused interfaces',
          'Performance and SEO-friendly structure',
        ],
      },
    ],
    environment: [
      { label: 'frontend', items: ['React', 'TypeScript', 'JavaScript', 'Redux Toolkit', 'RTK Query', 'Tailwind CSS', 'SCSS', 'Vite'] },
      { label: 'backend', items: ['Python', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'Alembic'] },
      { label: 'database', items: ['PostgreSQL'] },
      { label: 'infra', items: ['AWS', 'Docker', 'ECS Fargate', 'S3', 'CloudFront', 'API Gateway', 'KMS'] },
      { label: 'integrations', items: ['REST APIs', 'Payment gateways', 'OTA', 'Auth services', 'Third-party APIs'] },
    ],
  },
  {
    id: 'aadasteck',
    company: 'Aadasteck',
    title: 'Software Engineering Trainee',
    period: 'Dec 2024 – Aug 2025',
    mode: 'Chennai, India',
    logo: '/assets/skills/aadasteck.svg',
    summary:
      'Developed and maintained full-stack application components using Java, Spring Boot, React.js, Angular, HTML, CSS, and Oracle Database with MVC architecture.',
    highlights: [
      'Developed and maintained full-stack application components using Java, Spring Boot, React.js, Angular, HTML, CSS, and Oracle Database.',
      'Applied MVC architecture to organize application components and improve code maintainability across frontend and backend workflows.',
      'Tested CRUD operations across application modules, validating data creation, retrieval, updates, and deletion to support functional reliability.',
      'Debugged application issues and investigated frontend–backend integration errors, including API communication and database-related issues.',
    ],
    stack: ['Java', 'Spring Boot', 'React.js', 'Angular', 'HTML', 'CSS', 'Oracle Database', 'REST APIs', 'MVC Architecture'],
  },
  {
    id: 'cognizant',
    company: 'Cognizant Technology Solutions',
    title: 'Java Full Stack Trainee',
    period: 'Jun 2024 – Jul 2024',
    mode: 'Remote',
    logo: '/assets/skills/cognizant.svg',
    summary: 'Enterprise Java full stack training focused on backend development and database integration.',
    highlights: [
      'Built backend modules with Java, Spring Boot, Servlets, JSP and Hibernate on MySQL.',
      'Practised enterprise application architecture and software development workflows.',
      'Wrote unit tests with JUnit and managed builds with Maven.',
    ],
    stack: ['Java', 'Spring Boot', 'JSP', 'Servlets', 'Hibernate', 'MySQL', 'Maven', 'JUnit'],
  },
  {
    id: 'senchola',
    company: 'Senchola Technology Solutions',
    title: 'Frontend & WordPress Developer',
    period: 'Sep 2023 – May 2024',
    mode: 'Remote',
    logo: '/assets/skills/senchola.svg',
    summary: 'Built web interfaces and business tooling for client projects as part of a collaborative team.',
    highlights: [
      'Contributed to a restaurant management application covering inventory and workforce workflows.',
      'Integrated an AI chatbot and a dynamic gallery into WordPress sites.',
      'Delivered responsive interfaces with React.js, PHP, MySQL and REST APIs.',
    ],
    stack: ['React.js', 'PHP', 'MySQL', 'WordPress', 'JavaScript', 'Bootstrap', 'REST APIs'],
  },
  {
    id: 'internpe',
    company: 'Internpe',
    title: 'Web Development Intern',
    period: 'Aug 2023 – Sep 2023',
    mode: 'Remote',
    logo: '/assets/skills/Interpe.svg',
    summary: 'Front-end fundamentals through a series of small, shipped projects.',
    highlights: ['Built a ToDo list, calculator, e-commerce landing page and a Connect Four game.', 'Used DOM APIs and LocalStorage for state persistence.'],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'LocalStorage', 'Git'],
  },
]

export const projects: Project[] = [
  {
    id: 'revenue-maxima',
    title: 'Revenue Maxima Hospitality Platform',
    category: 'Enterprise Hospitality SaaS',
    role: 'Full Stack Software Engineer',
    team: 'Product engineering team',
    summary:
      'A multi-product SaaS platform that brings booking, property operations, point of sale, workforce and guest relationships for hotels into one ecosystem.',
    filters: ['Full Stack', 'AI'],
    featured: true,
    modules: ['Booking Engine', 'PMS', 'POS', 'Housekeeping', 'HRMS', 'CRM', 'Channel Manager', 'Hospitality Websites'],
    features: [
      'Multi-property data model with role-based access',
      'JWT authentication and authorization',
      'Payment gateway and OTA channel integrations',
      'Redux Toolkit store with RTK Query for API calls and caching',
      'Containerized deployment on AWS',
    ],
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Python', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker', 'JWT'],
    roadmap: [
      'AI guest assistant & concierge',
      'Guest intelligence',
      'Sentiment analysis',
      'CRM AI assistant',
      'Next-best-action',
      'Personalized offers',
      'Revenue intelligence',
      'Automated guest communication',
    ],
  },
  {
    id: 'restaurant',
    title: 'Restaurant Management System',
    category: 'Full Stack Business Application',
    role: 'Developer',
    team: '4 members',
    summary: 'An operations tool for restaurants that ties sales, inventory and staffing together with cost and profit reporting.',
    filters: ['Full Stack'],
    image: '/assets/projects/restaurant/Main.webp',
    gallery: [
      '/assets/projects/restaurant/Main.webp',
      '/assets/projects/restaurant/sales.webp',
      '/assets/projects/restaurant/costing.webp',
      '/assets/projects/restaurant/Ingredients.webp',
      '/assets/projects/restaurant/Builder.webp',
    ],
    features: ['Sales analytics', 'Inventory management', 'Workforce management', 'Process workflows', 'Cost & profit analysis', 'Reporting with Chart.js'],
    modules: ['Sales Analytics', 'Inventory Control', 'Workforce Shifts', 'Cost & Profit', 'Recipe Builder', 'Chart.js Reporting'],
    stack: ['React.js', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Chart.js'],
  },
  {
    id: 'ecommerce',
    title: 'Real-Time E-Commerce Platform',
    category: 'Full Stack Web Application',
    role: 'Sole developer',
    team: 'Individual project',
    summary: 'A storefront with live interactions over WebSockets, authentication and a complete checkout flow.',
    filters: ['Full Stack', 'Real-time'],
    image: '/assets/projects/ecommerce/e-commercemain.webp',
    gallery: [
      '/assets/projects/ecommerce/e-commercemain.webp',
      '/assets/projects/ecommerce/Home.webp',
      '/assets/projects/ecommerce/Buy.webp',
      '/assets/projects/ecommerce/Checkout.webp',
      '/assets/projects/ecommerce/Compare.webp',
    ],
    features: ['Product catalogue', 'Real-time interactions with Socket.IO', 'Authentication', 'Checkout workflow', 'REST API integration'],
    modules: ['Live Storefront', 'Socket.IO Sync', 'JWT Auth Flow', 'Checkout Engine', 'Product Compare', 'REST API Gateway'],
    stack: ['React.js', 'Node.js', 'Socket.IO', 'Tailwind CSS', 'REST APIs'],
  },
  {
    id: 'portfolio-main',
    title: 'Portfolio Website v1 (Previous Portfolio)',
    category: 'Frontend · Live on Netlify',
    role: 'Designer & Frontend Developer',
    team: 'Individual project',
    summary:
      'My first developer portfolio, still live on Netlify: a multi-page React site with kinetic typography, a solar-system skills orbit, a skewed auto-scrolling skills marquee and separate pages for each project and qualification.',
    filters: ['Frontend'],
    image: '/assets/projects/portfolio_logo-800.webp',
    gallery: ['/assets/projects/portfolio_logo-800.webp'],
    features: [
      'Kinetic typography and smooth Framer Motion page transitions',
      'Solar-system orbit visualisation of skills',
      'Skewed, continuously scrolling skills marquee',
      'Multi-page routing with React Router for projects and qualifications',
      'Responsive layout deployed on Netlify'
    ],
    modules: ['Kinetic Typography', 'Solar Skills Orbit', 'Skewed Marquee', 'Page Transitions', 'React Router Pages', 'Netlify Deploy'],
    stack: ['React.js', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Vite'],
    liveUrl: 'https://apraveenkumar.netlify.app/',
  },
]

export const education: Education[] = [
  {
    id: 'btech',
    qualification: 'B.Tech, Information Technology',
    institution: 'Velammal Institute of Technology',
    period: '2019 – 2023',
    logo: '/assets/skills/velammal.svg',
    score: { label: 'CGPA', value: '8.56 / 10' },
    subjects: ['Data Structures', 'Algorithms', 'Operating Systems', 'DBMS', 'Artificial Intelligence', 'OOP', 'Computer Networks'],
    notable: 'Published an IEEE conference paper during studies.',
    gpaTrend: [
      { label: 'S1', value: 7.1 },
      { label: 'S2', value: 9.0 },
      { label: 'S3', value: 8.4 },
      { label: 'S4', value: 9.5 },
      { label: 'S5', value: 9.1 },
      { label: 'S6', value: 7.9 },
      { label: 'S7', value: 8.0 },
      { label: 'S8', value: 8.6 },
    ],
  },
  {
    id: 'hsc',
    qualification: 'Higher Secondary (HSC)',
    institution: 'Ayyanar Matric Higher Secondary School',
    period: '2018 – 2019',
    logo: '/assets/skills/school.svg',
    score: { label: 'Score', value: '74.5%' },
    subjects: ['Computer Science', 'Mathematics'],
    breakdown: [
      {
        title: 'HSC +2',
        rows: [
          { label: 'Tamil', value: '86' },
          { label: 'English', value: '81' },
          { label: 'Mathematics', value: '50' },
          { label: 'Physics', value: '69' },
          { label: 'Chemistry', value: '80' },
          { label: 'Computer Science', value: '81' },
        ],
      },
      {
        title: 'HSC +1',
        rows: [
          { label: 'Tamil', value: '77' },
          { label: 'English', value: '67' },
          { label: 'Mathematics', value: '50' },
          { label: 'Physics', value: '69' },
          { label: 'Chemistry', value: '66' },
          { label: 'Computer Science', value: '87' },
        ],
      },
    ],
  },
  {
    id: 'sslc',
    qualification: 'Secondary School (SSLC)',
    institution: 'Ayyanar Matric Higher Secondary School',
    period: '2017 – 2018',
    logo: '/assets/skills/school.svg',
    score: { label: 'Score', value: '87.2%' },
    breakdown: [
      {
        title: 'SSLC',
        rows: [
          { label: 'Tamil', value: '88' },
          { label: 'English', value: '80' },
          { label: 'Mathematics', value: '82' },
          { label: 'Science', value: '91' },
          { label: 'Social Studies', value: '95' },
        ],
      },
    ],
  },
]

export const publications: Publication[] = [
  {
    id: 'ieee-black-box',
    title: 'Black Box Testing Design for Vehicle Surveillance and Tracking',
    venue: 'IEEE Conference Proceedings',
    year: '2023',
    type: 'Research paper',
    url: 'https://ieeexplore.ieee.org/document/10099824',
    image: '/assets/skills/BlackBox.webp',
    summary:
      'An IoT vehicle black box combining sensors, GPS tracking and GSM communication for surveillance, crash detection and remote engine control, with a companion mobile app and graphical data analysis.',
    keywords: ['IoT', 'Sensors', 'GPS tracking', 'GSM', 'Crash detection', 'Mobile integration'],
  },
]
