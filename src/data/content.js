import {
  ServerCog, Globe, Network, ShieldCheck, Cloud, Wrench, Compass, Users, Code2, Gauge, ShoppingCart,
  HardDrive, Router, Monitor, Wifi, Sparkles, Bot, Workflow, BarChart3, Lock, BrainCircuit, Handshake,
  HeartHandshake, MapPin, Radar, Info, UsersRound,
} from 'lucide-react'

export const CONTACT = {
  phone: '07 5329 7997',
  phoneHref: 'tel:+61753297997',
  email: 'info@simplyict.com.au',
  location: 'North Lakes, QLD 4509',
  hours: 'Mon – Fri, 8:30am – 5:30pm',
}

export const NAV = [
  {
    label: 'Managed IT',
    href: '#services',
    items: [
      { label: 'Managed IT Services', desc: '24/7 monitoring, helpdesk & strategy', icon: ServerCog },
      { label: 'Co-Managed IT', desc: 'Back up your in-house IT team', icon: Users },
      { label: 'Cybersecurity', desc: 'Protection, backups & recovery', icon: ShieldCheck },
      { label: 'Cloud Services', desc: 'Microsoft 365, Azure & migrations', icon: Cloud },
      { label: 'On-site Support', desc: 'Local technicians when you need them', icon: Wrench },
      { label: 'IT Consulting & Strategy', desc: 'Roadmaps and budgeting that make sense', icon: Compass },
    ],
  },
  {
    label: 'Web Services',
    href: '#services',
    items: [
      { label: 'Web Design', desc: 'Fast WordPress sites that convert', icon: Code2 },
      { label: 'Hosting & Maintenance', desc: 'Secure hosting, updates & daily backups', icon: Globe },
      { label: 'SEO & Performance', desc: 'Get found and load fast', icon: Gauge },
      { label: 'E-Commerce', desc: 'Online stores that sell', icon: ShoppingCart },
    ],
  },
  {
    label: 'Infrastructure',
    href: '#services',
    items: [
      { label: 'Servers & Storage', desc: 'Reliable on-prem & hybrid servers', icon: HardDrive },
      { label: 'Networking', desc: 'Switching, routing & firewalls', icon: Router },
      { label: 'Workstations', desc: 'Supplied, imaged & managed', icon: Monitor },
      { label: 'WiFi Installation', desc: 'Business-grade wireless coverage', icon: Wifi },
    ],
  },
  {
    label: 'AI Services',
    href: '#services',
    badge: 'New',
    items: [
      { label: 'AI Strategy & Consulting', desc: 'Find where AI pays off', icon: BrainCircuit },
      { label: 'Microsoft Copilot Rollout', desc: 'Deploy & train your team', icon: Sparkles },
      { label: 'AI Chatbots & Virtual Agents', desc: '24/7 assistants on your knowledge', icon: Bot },
      { label: 'Workflow Automation', desc: 'Remove repetitive admin', icon: Workflow },
      { label: 'AI Data & Insights', desc: 'Dashboards, forecasts & answers', icon: BarChart3 },
      { label: 'AI Security & Governance', desc: 'Safe, compliant AI use', icon: Lock },
    ],
  },
  {
    label: 'About',
    href: '#why',
    items: [
      { label: 'About Us', desc: '30+ years of making tech human', icon: Info },
      { label: 'Our Team', desc: 'Meet the people behind the support', icon: UsersRound },
    ],
  },
  { label: 'Contact', href: '#contact' },
]

export const STATS = [
  { value: 30, suffix: '+', label: 'Years experience' },
  { value: 500, suffix: '+', label: 'Businesses served' },
  { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime guarantee' },
  { value: 100, suffix: '%', label: 'Australian owned' },
]

export const SERVICES = [
  {
    icon: ServerCog,
    title: 'Managed IT Services',
    desc: 'Proactive monitoring, helpdesk and strategy that keep your systems running — and your people working.',
    points: ['24/7 monitoring & helpdesk', 'Cybersecurity & backups', 'Cloud & on-site support'],
    cta: 'Explore managed IT',
  },
  {
    icon: Globe,
    title: 'Web Services',
    desc: 'Beautiful, fast WordPress websites — designed, hosted, secured and ranked so your business shines online.',
    points: ['Web design & e-commerce', 'Hosting, updates & daily backups', 'SEO & performance'],
    cta: 'Explore web services',
  },
  {
    icon: Network,
    title: 'Hardware & Infrastructure',
    desc: 'Servers, networking, workstations and Wi-Fi — supplied, installed and managed for peak performance.',
    points: ['Servers & storage', 'Networking & firewalls', 'Workstations & business Wi-Fi'],
    cta: 'Explore infrastructure',
  },
  {
    icon: Sparkles,
    title: 'AI Services',
    badge: 'New',
    desc: 'Practical AI that saves your team hours every week — rolled out safely, explained in plain English.',
    points: ['Microsoft Copilot rollout & training', 'AI chatbots & workflow automation', 'AI security & governance'],
    cta: 'Explore AI services',
  },
]

export const AI_SERVICES = [
  { icon: BrainCircuit, title: 'AI Strategy & Consulting', desc: 'Find where AI delivers real return in your business, with a clear, costed roadmap.' },
  { icon: Sparkles, title: 'Microsoft Copilot Rollout', desc: 'Deploy, configure and train your team on Copilot for Microsoft 365.' },
  { icon: Bot, title: 'AI Chatbots & Virtual Agents', desc: '24/7 website and internal assistants trained on your own knowledge.' },
  { icon: Workflow, title: 'Workflow Automation', desc: 'Automate repetitive tasks across email, documents, CRM and accounts.' },
  { icon: BarChart3, title: 'AI Data & Insights', desc: 'Turn your business data into dashboards, forecasts and plain answers.' },
  { icon: Lock, title: 'AI Security & Governance', desc: 'Policies, data protection and safe-use controls for every AI tool.' },
]

export const WHY = [
  { icon: Handshake, title: 'One accountable partner', desc: 'A single team for IT, web and infrastructure — no finger-pointing between vendors when something matters.' },
  { icon: HeartHandshake, title: 'Humans first', desc: 'Friendly people who explain things in plain English. Support you can reach, and advice you can trust.' },
  { icon: MapPin, title: 'Australian owned & local', desc: 'Based in North Lakes, QLD, we serve businesses across Australia with local response and local accountability.' },
  { icon: Radar, title: 'Proactive, not reactive', desc: 'We monitor, patch and plan ahead so most problems never reach you in the first place.' },
]

export const PROCESS = [
  { n: '01', title: 'Free consultation', desc: 'We listen to your goals and map your current setup — no jargon, no obligation.' },
  { n: '02', title: 'Honest recommendations', desc: 'A clear plan with transparent pricing. We tell you what you need — and what you don’t.' },
  { n: '03', title: 'Smooth implementation', desc: 'We deploy, document and communicate. Minimal disruption to your day.' },
  { n: '04', title: 'Ongoing partnership', desc: 'Monitoring, support and monthly reporting keep everything healthy and improving.' },
]

export const TECH = [
  'Microsoft 365', 'Azure', 'Microsoft Copilot', 'Google Workspace', 'WordPress', 'Cisco', 'Fortinet',
  'Ubiquiti', 'Dell', 'HP', 'OpenAI', 'Sophos', 'Veeam', 'Cloudflare',
]
