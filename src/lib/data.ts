import type { Project, TimelineItem, SkillGroup, Achievement, NowItem } from '@/types'

export const featuredBuilds: Project[] = [
  {
    id: 'bbs',
    title: 'Beyond Binary Solutions',
    description: 'A software company. Founded July 2026.',
    longDescription:
      'Started to build the products I wanted to exist — software products, websites, SaaS applications, AI solutions, and startup products. Not a side project. A company. Currently heads-down building.',
    tech: ['Next.js', 'TypeScript', 'React', 'Node.js', 'AI'],
    links: {},
    featured: true,
    category: 'software',
    role: 'Founder',
    stat: 'Est. July 2026',
  },
  {
    id: 'findora',
    title: 'Findora',
    description: 'Campus lost-and-found, reimagined',
    longDescription:
      'Built and launched a lost-and-found platform for IIT Madras students. Handles item reporting, claim verification, and dispute resolution — replacing fragmented WhatsApp groups and notice boards. Still actively maintained.',
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    links: { live: 'https://findora.live', github: 'https://github.com/RohitPulamarasetty/Findora' },
    featured: true,
    category: 'software',
    role: 'Solo Builder',
    stat: 'Live · April 2026',
  },
  {
    id: 'grade-suite',
    title: 'IITM Grade Suite',
    description: 'CGPA planning for 1,000+ students',
    longDescription:
      'Academic planning tool that automates CGPA calculation, grade prediction, and target-score planning for IIT Madras BS students — replacing manual spreadsheet work every semester. Reached 1,000+ users.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    links: { live: 'https://iitm-grade-suite.pages.dev', github: 'https://github.com/RohitPulamarasetty/iitm-grade-suite' },
    featured: true,
    category: 'software',
    role: 'Solo Builder',
    stat: '1,000+ Users · May 2026',
  },
]

export const projects: Project[] = [
  {
    id: 'uidai',
    title: 'UIDAI Aadhaar Stress & Risk Diagnostics',
    description:
      'Analyzed 68M+ enrollment and update transactions across three national datasets to identify operational bottlenecks, workload patterns, and district-level risk KPIs.',
    longDescription: '',
    tech: ['PostgreSQL', 'Tableau'],
    links: { github: 'https://github.com/RohitPulamarasetty/Aadhaar-Data-Analysis' },
    featured: false,
    category: 'data',
    stat: '68M+ records',
  },
  {
    id: 'sales-dashboard',
    title: 'Sales & Customer Dashboard',
    description:
      'Interactive Tableau dashboard tracking $733K in sales, $93K profit, and 12.5K units sold — with KPI views, profitability analysis, and drill-down filters.',
    longDescription: '',
    tech: ['Tableau'],
    links: { github: 'https://github.com/RohitPulamarasetty/Retail-Sales-Analysis' },
    featured: false,
    category: 'data',
    stat: '$733K tracked',
  },
  {
    id: 'pizza-sales',
    title: 'Pizza Sales Analysis',
    description:
      'Analyzed 21K+ customer orders using SQL joins, aggregations, and business reporting queries to surface top-performing products and peak demand periods.',
    longDescription: '',
    tech: ['MySQL', 'Excel'],
    links: { github: 'https://github.com/RohitPulamarasetty/Pizza-Sales-SQL' },
    featured: false,
    category: 'data',
    stat: '21K+ orders',
  },
]

export const timeline: TimelineItem[] = [
  {
    id: 'iitm',
    year: '2024 – Present',
    title: "Bachelor's in Data Science and Applications",
    organization: 'Indian Institute of Technology Madras',
    description:
      'CGPA: 8.7/10 · Coursework: Statistics, Database Management Systems, Machine Learning, Business Analytics',
    type: 'education',
  },
  {
    id: 'findora-launch',
    year: 'April 2026',
    title: 'Launched Findora',
    organization: 'IIT Madras',
    description:
      'Built and launched a lost-and-found platform for IIT Madras students. Replaced fragmented WhatsApp groups with a proper system. Still actively maintained and improved.',
    type: 'work',
  },
  {
    id: 'grade-suite-launch',
    year: 'May 2026',
    title: 'Launched IITM Grade Suite',
    organization: 'IIT Madras',
    description:
      'Academic planning tool for CGPA calculation and grade prediction. Reached 1,000+ students. Still actively maintained and improved.',
    type: 'work',
  },
  {
    id: 'paradox',
    year: 'May – June 2026',
    title: 'Volunteer — Paradox',
    organization: 'IIT Madras BS Fest',
    description:
      'Contributed as a volunteer during the annual IIT Madras BS fest.',
    type: 'activity',
  },
  {
    id: 'bbs-founded',
    year: 'July 2026',
    title: 'Founded Beyond Binary Solutions',
    organization: 'Beyond Binary Solutions',
    description:
      'Started a software company to build products, websites, SaaS applications, AI solutions, and startup products. Currently building.',
    type: 'work',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    category: 'Product',
    skills: ['Product Thinking', 'KPI Development', 'Dashboard Design', 'User Flows', 'Business Analytics'],
  },
  {
    category: 'Development',
    skills: ['Next.js', 'TypeScript', 'JavaScript', 'Python', 'HTML/CSS', 'Supabase', 'Git'],
  },
  {
    category: 'Data & Analytics',
    skills: ['SQL', 'PostgreSQL', 'MySQL', 'Pandas', 'NumPy', 'Matplotlib', 'EDA', 'Reporting'],
  },
  {
    category: 'Visualization & BI',
    skills: ['Tableau', 'Power BI', 'Excel', 'Jupyter Notebook'],
  },
]

export const achievements: Achievement[] = [
  {
    id: 'hackathon-win',
    title: 'Winner — Data Analytics Hackathon',
    organization: 'TopDataWorks',
    description:
      'Cleaned and merged multi-source datasets across two challenge levels and delivered structured insight reports.',
    type: 'award',
  },
  {
    id: 'uidai-hackathon',
    title: 'Participant — UIDAI Data Hackathon',
    organization: 'data.gov.in',
    description:
      'Applied SQL cleaning and KPI engineering on Aadhaar enrollment records as part of a national data challenge.',
    type: 'participation',
  },
  {
    id: 'grade-suite-users',
    title: '1,000+ Active Users',
    organization: 'IITM Grade Suite',
    description:
      'Built and shipped an academic planning tool used by over a thousand IIT Madras BS students.',
    type: 'milestone',
  },
  {
    id: 'cgpa',
    title: 'CGPA: 8.7/10',
    organization: 'IIT Madras',
    description:
      'Maintaining strong academic performance while actively building products, leading projects, and running a company.',
    type: 'milestone',
  },
]

export const nowItems: NowItem[] = [
  {
    category: 'Building',
    items: ['Beyond Binary Solutions', 'Findora', 'IITM Grade Suite'],
  },
  {
    category: 'Learning',
    items: ['AI Systems', 'Product Development', 'Full Stack Engineering'],
  },
  {
    category: 'Exploring',
    items: ['SaaS', 'Startups', 'Automation'],
  },
]
