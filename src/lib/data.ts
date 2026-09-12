import type { CaseStudy, DataProject, TimelineItem, SkillGroup, Achievement, NowGroup } from '@/types'

export const caseStudies: CaseStudy[] = [
  {
    id: 'grade-suite',
    name: 'IITM Grade Suite',
    blurb:
      'I built a simple way for IITM students to calculate, predict, and plan their grades — straight from the official grading rules, updated every term.',
    role: 'Solo Builder',
    status: 'Live',
    tech: ['JavaScript', 'HTML', 'CSS'],
    links: { live: 'https://iitm-grade-suite.pages.dev', github: 'https://github.com/RohitPulamarasetty/iitm-grade-suite' },
    screenshot: '/screenshots/grade-suite-hero.jpg',
    stat: { value: '2,000+', label: 'Students' },
  },
  {
    id: 'bbs',
    name: 'Beyond Binary Solutions',
    blurb:
      'I started my own software studio to build for real businesses the way I’d want it built for me — fixed scope, and a direct line to the person actually writing the code.',
    role: 'Founder',
    status: 'Building',
    tech: ['Next.js', 'TypeScript', 'React', 'Node.js', 'AI'],
    links: { live: 'https://beyondbinarysolutions.com' },
    screenshot: '/screenshots/bbs-hero.jpg',
    stat: { value: 'Founder', label: 'Since 2026' },
  },
  {
    id: 'findora',
    name: 'Findora',
    blurb:
      'I rebuilt lost-and-found for IIT Madras — verified accounts, private messaging, no more scattered WhatsApp groups.',
    role: 'Solo Builder',
    status: 'Live',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    links: { live: 'https://findora.live', github: 'https://github.com/RohitPulamarasetty/Findora' },
    screenshot: '/screenshots/findora-hero.jpg',
    stat: { value: '<48h', label: 'Avg. recovery' },
  },
  {
    id: 'foundbrew',
    name: 'FoundBrew',
    blurb:
      'I built a community that helps people find who to build with, and gives that work a public record.',
    role: 'Founder',
    status: 'Live',
    tech: ['Next.js', 'TypeScript'],
    links: { live: 'https://foundbrew.beyondbinarysolutions.com' },
    screenshot: '/screenshots/foundbrew-hero.jpg',
    stat: { value: 'Live', label: 'Est. 2026' },
  },
]

export const dataProjects: DataProject[] = [
  {
    id: 'uidai',
    title: 'UIDAI Aadhaar Stress & Risk Diagnostics',
    description:
      'I analyzed 68M+ enrollment records across three national datasets to surface operational bottlenecks and district-level risk.',
    tech: ['PostgreSQL', 'Tableau'],
    stat: '68M+ records',
    links: { github: 'https://github.com/RohitPulamarasetty/Aadhaar-Data-Analysis' },
  },
  {
    id: 'sales-dashboard',
    title: 'Sales & Customer Dashboard',
    description:
      'I built a Tableau dashboard tracking $733K in sales, $93K profit, and 12.5K units sold, with drill-down profitability views.',
    tech: ['Tableau'],
    stat: '$733K tracked',
    links: { github: 'https://github.com/RohitPulamarasetty/Retail-Sales-Analysis' },
  },
  {
    id: 'pizza-sales',
    title: 'Pizza Sales Analysis',
    description:
      'I used SQL to analyze 21K+ customer orders and surface top-performing products and peak demand periods.',
    tech: ['MySQL', 'Excel'],
    stat: '21K+ orders',
    links: { github: 'https://github.com/RohitPulamarasetty/Pizza-Sales-SQL' },
  },
]

export const timeline: TimelineItem[] = [
  {
    id: 'iitm',
    date: '2024',
    title: 'Started BS in Data Science and Applications',
    organization: 'Indian Institute of Technology Madras',
    description: "I'm on track to graduate in 2028, holding an 8.7/10 CGPA.",
    type: 'education',
  },
  {
    id: 'findora-launch',
    date: 'Apr 2026',
    title: 'Launched Findora',
    organization: 'IIT Madras',
    description: 'I shipped a verified lost-and-found platform for the student community.',
    type: 'work',
  },
  {
    id: 'grade-suite-launch',
    date: 'May 2026',
    title: 'Launched IITM Grade Suite',
    organization: 'IIT Madras',
    description: 'I built an academic planning tool now used by 2,000+ students each term.',
    type: 'work',
  },
  {
    id: 'paradox',
    date: 'May–Jun 2026',
    title: 'Volunteered at Paradox',
    organization: 'IIT Madras BS Fest',
    description: 'I volunteered during the annual IIT Madras BS fest.',
    type: 'activity',
  },
  {
    id: 'bbs-founded',
    date: 'Jul 2026',
    title: 'Founded Beyond Binary Solutions',
    organization: 'Beyond Binary Solutions',
    description: 'I started a software studio to build products, client software, and AI systems.',
    type: 'work',
  },
  {
    id: 'foundbrew',
    date: 'Ongoing',
    title: 'Building FoundBrew',
    organization: 'Beyond Binary Solutions',
    description: "I'm building a community that helps people find who to build with.",
    type: 'work',
  },
  {
    id: 'next',
    date: "What's next",
    title: 'Going deeper into ML & Quant Finance',
    organization: '',
    description: "I'm studying machine learning and quantitative finance while I keep shipping.",
    type: 'activity',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    category: 'Data',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Statistics'],
  },
  {
    category: 'Analytics & BI',
    skills: ['Power BI', 'Tableau', 'Excel', 'Data Visualization'],
  },
  {
    category: 'Engineering',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js'],
  },
  {
    category: 'Backend',
    skills: ['Supabase', 'APIs', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'Product',
    skills: ['Product Thinking', 'Automation', 'Business Analytics'],
  },
  {
    category: 'Currently Exploring',
    skills: ['Machine Learning', 'AI Systems', 'Quantitative Finance'],
  },
]

export const achievements: Achievement[] = [
  {
    id: 'hackathon-win',
    title: 'Winner — Data Analytics Hackathon',
    organization: 'TopDataWorks',
    description: 'I cleaned and merged multi-source datasets across two challenge levels and delivered structured insight reports.',
  },
  {
    id: 'uidai-hackathon',
    title: 'Participant — UIDAI Data Hackathon',
    organization: 'data.gov.in',
    description: 'I applied SQL cleaning and KPI engineering to Aadhaar enrollment records for a national data challenge.',
  },
  {
    id: 'grade-suite-users',
    title: '2,000+ Students',
    organization: 'IITM Grade Suite',
    description: 'I built and shipped an academic planning tool used by thousands of IIT Madras BS students each term.',
  },
  {
    id: 'cgpa',
    title: 'CGPA 8.7 / 10',
    organization: 'IIT Madras',
    description: "I'm keeping strong academic performance while building products and running a company.",
  },
]

export const nowGroups: NowGroup[] = [
  {
    category: 'Building',
    items: ['Beyond Binary Solutions', 'FoundBrew', 'IITM Grade Suite', 'Findora'],
  },
  {
    category: 'Learning',
    items: ['Machine Learning', 'Quantitative Finance', 'Statistics', 'AI'],
  },
  {
    category: 'Exploring',
    items: ['Startups', 'Automation', 'Product Development'],
  },
]

export const socials = {
  github: 'https://github.com/RohitPulamarasetty',
  linkedin: 'https://linkedin.com/in/rohit-kumar-pulamarasetty',
  instagram: 'https://www.instagram.com/rohitpulamarasetty',
  email: 'rohitpulamarasetty@gmail.com',
}
