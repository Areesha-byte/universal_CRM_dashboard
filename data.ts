/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Customer, Lead, Task, Meeting, Activity, User, Employee } from './types';

export const CURRENT_USER: User = {
  id: 'u-1',
  name: 'Lord Sterling Thorne',
  email: 's.thorne@aurelia.executive',
  role: 'Managing Partner & Executive Director',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
};

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'c-1',
    name: 'Julian Mercer',
    company: 'Aetherius Aerospace',
    email: 'j.mercer@aetherius.co',
    phone: '+1 (415) 888-0912',
    status: 'Active',
    tier: 'Diamond',
    lifetimeValue: 1850000,
    joinedDate: '2024-01-15',
    country: 'United States',
    website: 'https://aetherius.co',
    notes: 'Primary contact for the private space shuttle fleet acquisition. Prefers direct phone communication on weekends. High-priority VIP client.',
    deals: [
      { id: 'd-1', title: 'Suborbital Logistics Fleet Purchase', value: 1200000, status: 'won', date: '2025-05-12' },
      { id: 'd-2', title: 'Maintenance and Ops Retainer Year 2', value: 650000, status: 'won', date: '2026-02-18' },
      { id: 'd-3', title: 'Orbital Lounge Customization', value: 450000, status: 'active', date: '2026-06-01' }
    ],
    activities: [
      {
        id: 'act-1',
        type: 'customer',
        title: 'Contract Executed',
        description: 'Signed Year 2 Maintenance agreement for orbital logistics.',
        timestamp: '2 hours ago',
        user: { name: 'Julian Mercer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' }
      },
      {
        id: 'act-2',
        type: 'meeting',
        title: 'Executive Luncheon',
        description: 'Discussed bespoke cabin interiors for custom orbits.',
        timestamp: 'Yesterday',
        user: { name: 'Lord Sterling Thorne', avatar: CURRENT_USER.avatar }
      }
    ]
  },
  {
    id: 'c-2',
    name: 'Elena Rostova',
    company: 'Rostov Sovereign Capital',
    email: 'elena.r@rostovcapital.ch',
    phone: '+41 22 790 1488',
    status: 'Active',
    tier: 'Diamond',
    lifetimeValue: 3200000,
    joinedDate: '2023-11-02',
    country: 'Switzerland',
    website: 'https://rostovcapital.ch',
    notes: 'Managing Partner of Swiss venture fund. Focuses on premium luxury development funds and deeptech hardware. Always expects concierge-level support.',
    deals: [
      { id: 'd-4', title: 'Alpine Chalet Portfolio Venture', value: 2000000, status: 'won', date: '2024-08-30' },
      { id: 'd-5', title: 'Geneva Port Terminal Expansion Option', value: 1200000, status: 'won', date: '2025-11-14' }
    ],
    activities: [
      {
        id: 'act-3',
        type: 'revenue',
        title: 'Quarterly Dividend Wire Received',
        description: 'Successfully deposited CHF 250,000 to the central vault.',
        timestamp: '1 day ago',
        user: { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' }
      }
    ]
  },
  {
    id: 'c-3',
    name: 'Alaric Thorne',
    company: 'Elysium Estates',
    email: 'a.thorne@elysium.realestate',
    phone: '+44 20 7946 0192',
    status: 'Active',
    tier: 'Platinum',
    lifetimeValue: 950000,
    joinedDate: '2024-06-20',
    country: 'United Kingdom',
    website: 'https://elysium.realestate',
    notes: 'Luxury property developer. Exploring virtual reality real-estate client galleries. Frequently meets in Mayfair.',
    deals: [
      { id: 'd-6', title: 'Mayfair High-Rise VR Tour Project', value: 450000, status: 'won', date: '2025-01-10' },
      { id: 'd-7', title: 'Elysium French Riviera Interactive App', value: 500000, status: 'won', date: '2026-04-05' }
    ],
    activities: [
      {
        id: 'act-4',
        type: 'task',
        title: 'Design Mockup Uploaded',
        description: 'Uploaded Riviera render concept to the private viewer.',
        timestamp: '3 days ago',
        user: { name: 'Alaric Thorne', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' }
      }
    ]
  },
  {
    id: 'c-4',
    name: 'Isabella Rossellini',
    company: 'Sartorial Luxury Group',
    email: 'isabella@sartorial.it',
    phone: '+39 02 8192 384',
    status: 'Active',
    tier: 'Platinum',
    lifetimeValue: 1120000,
    joinedDate: '2024-09-10',
    country: 'Italy',
    website: 'https://sartorial.it',
    notes: 'CEO of luxury fashion brand group. Expanding digital high-end VIP loyalty programs. Requires supreme privacy.',
    deals: [
      { id: 'd-8', title: 'Milano Bespoke Concierge Web Hub', value: 800000, status: 'won', date: '2025-03-22' },
      { id: 'd-9', title: 'Sartorial Private Vault App Integration', value: 320000, status: 'won', date: '2026-05-19' }
    ],
    activities: []
  },
  {
    id: 'c-5',
    name: 'Marcus Vance',
    company: 'Vanguard Deeptech',
    email: 'marcus@vanguard.tech',
    phone: '+1 (650) 412-8700',
    status: 'Pending',
    tier: 'Gold',
    lifetimeValue: 480000,
    joinedDate: '2025-10-15',
    country: 'United States',
    website: 'https://vanguard.tech',
    notes: 'Series B Deeptech firm founder. Building luxury biometric authentication devices for private yachts.',
    deals: [
      { id: 'd-10', title: 'Biometric Yacht Interface Design', value: 480000, status: 'active', date: '2026-05-15' }
    ],
    activities: [
      {
        id: 'act-5',
        type: 'lead',
        title: 'Lead Progress Update',
        description: 'Vanguard Biometric deal moved to active proposal stage.',
        timestamp: '5 days ago',
        user: { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150' }
      }
    ]
  },
  {
    id: 'c-6',
    name: 'Genevieve Sterling',
    company: 'Sterling Yacht Charters',
    email: 'g.sterling@sterlingcharters.com',
    phone: '+377 93 45 67 89',
    status: 'Inactive',
    tier: 'Diamond',
    lifetimeValue: 2450000,
    joinedDate: '2023-04-01',
    country: 'Monaco',
    website: 'https://sterlingcharters.mc',
    notes: 'Owner of elite superyacht leasing agency in Monaco. Account currently dormant pending seasonal refresh.',
    deals: [
      { id: 'd-11', title: 'Monaco Grand Prix Luxury Suite App', value: 1450000, status: 'won', date: '2023-08-11' },
      { id: 'd-12', title: 'Sterling Fleet Real-Time Tracker', value: 1000000, status: 'won', date: '2024-05-14' }
    ],
    activities: []
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'l-1',
    name: 'Sébastien Foucan',
    company: 'Riviera Heli-Air',
    email: 's.foucan@riviera-heliair.fr',
    value: 750000,
    stage: 'negotiation',
    priority: 'high',
    score: 94,
    owner: 'Sterling Thorne',
    lastContacted: 'Today, 9:00 AM'
  },
  {
    id: 'l-2',
    name: 'Dr. Evelyn Sinclair',
    company: 'Chronos Cryogenics',
    email: 'sinclair@chronoscryo.org',
    value: 1200000,
    stage: 'proposal',
    priority: 'high',
    score: 89,
    owner: 'Sterling Thorne',
    lastContacted: 'Yesterday'
  },
  {
    id: 'l-3',
    name: 'Kenji Takahashi',
    company: 'Neo-Tokyo Sovereign',
    email: 'takahashi@neo-tokyo.org',
    value: 2300000,
    stage: 'qualified',
    priority: 'high',
    score: 97,
    owner: 'Sterling Thorne',
    lastContacted: '2 days ago'
  },
  {
    id: 'l-4',
    name: 'Zara Al-Mansoori',
    company: 'Orion Hydrogen Corp',
    email: 'zara@orionhydro.ae',
    value: 3400000,
    stage: 'new',
    priority: 'medium',
    score: 82,
    owner: 'Sterling Thorne',
    lastContacted: '3 days ago'
  },
  {
    id: 'l-5',
    name: 'Oliver Sterling',
    company: 'Gilt Asset Management',
    email: 'oliver@giltasset.co.uk',
    value: 500000,
    stage: 'proposal',
    priority: 'low',
    score: 74,
    owner: 'Sterling Thorne',
    lastContacted: '4 days ago'
  },
  {
    id: 'l-6',
    name: 'Charlotte Dubois',
    company: 'Bordeaux Grand Cru DAO',
    email: 'dubois@grandcrudao.fr',
    value: 950000,
    stage: 'negotiation',
    priority: 'medium',
    score: 87,
    owner: 'Sterling Thorne',
    lastContacted: '5 days ago'
  },
  {
    id: 'l-7',
    name: 'Maximilian Sterling',
    company: 'Sterling Private Vaults',
    email: 'max@sterlingvaults.de',
    value: 1500000,
    stage: 'won',
    priority: 'high',
    score: 100,
    owner: 'Sterling Thorne',
    lastContacted: 'June 18, 2026'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Review Aetherius Orbital Launch Agreement',
    description: 'Verify customized insurance liability limits and bespoke crew-cabin interior specifications before Julien signs.',
    dueDate: '2026-07-02',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Sterling Thorne',
    customerName: 'Aetherius Aerospace'
  },
  {
    id: 't-2',
    title: 'Wire transfer confirmation for Rostov Capital',
    description: 'Execute deep security check on Swiss private wire routing codes and confirm with Elena Rostova.',
    dueDate: '2026-06-30',
    priority: 'high',
    status: 'todo',
    assignedTo: 'Sterling Thorne',
    customerName: 'Rostov Sovereign Capital'
  },
  {
    id: 't-3',
    title: 'Design feedback for Mayfair luxury interactive viewer',
    description: 'Examine Alaric’s feedback on Mayfair high-rise penthouse lobby light tracing and immersive VR triggers.',
    dueDate: '2026-07-05',
    priority: 'medium',
    status: 'todo',
    assignedTo: 'Sterling Thorne',
    customerName: 'Elysium Estates'
  },
  {
    id: 't-4',
    title: 'Briefing call with Sartorial Luxury Group CEO',
    description: 'Draft the private loyalty ledger protocol brief and security details for Isabella.',
    dueDate: '2026-06-29',
    priority: 'high',
    status: 'completed',
    assignedTo: 'Sterling Thorne',
    customerName: 'Sartorial Luxury Group'
  },
  {
    id: 't-5',
    title: 'Send heli-charter proposal quote to Sébastien',
    description: 'Calculate helicopter flight operations retainer quote with Monaco premium discount.',
    dueDate: '2026-07-03',
    priority: 'low',
    status: 'todo',
    assignedTo: 'Sterling Thorne',
    customerName: 'Riviera Heli-Air'
  }
];

export const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 'm-1',
    title: 'Bespoke Orbital Customization Sync',
    customerName: 'Aetherius Aerospace',
    time: '11:00 AM - 12:30 PM',
    date: '2026-06-29',
    type: 'virtual',
    status: 'ongoing',
    duration: '1h 30m'
  },
  {
    id: 'm-2',
    title: 'Swiss Account Strategy Call',
    customerName: 'Rostov Sovereign Capital',
    time: '2:00 PM - 3:00 PM',
    date: '2026-06-29',
    type: 'virtual',
    status: 'scheduled',
    duration: '1h 00m'
  },
  {
    id: 'm-3',
    title: 'Riviera Heli-Air Pitch Presentation',
    customerName: 'Riviera Heli-Air',
    time: '10:00 AM - 11:30 AM',
    date: '2026-06-30',
    type: 'in_person',
    status: 'scheduled',
    duration: '1h 30m'
  },
  {
    id: 'm-4',
    title: 'Mayfair VR Showroom Final Signoff',
    customerName: 'Elysium Estates',
    time: '4:00 PM - 5:30 PM',
    date: '2026-07-02',
    type: 'in_person',
    status: 'scheduled',
    duration: '1h 30m'
  }
];

export const HISTORICAL_REVENUE = {
  weekly: [
    { label: 'Mon', value: 120000 },
    { label: 'Tue', value: 185000 },
    { label: 'Wed', value: 145000 },
    { label: 'Thu', value: 290000 },
    { label: 'Fri', value: 340000 },
    { label: 'Sat', value: 210000 },
    { label: 'Sun', value: 195000 }
  ],
  monthly: [
    { label: 'Jan', value: 850000 },
    { label: 'Feb', value: 1200000 },
    { label: 'Mar', value: 1050000 },
    { label: 'Apr', value: 1650000 },
    { label: 'May', value: 2100000 },
    { label: 'Jun', value: 2450000 }
  ],
  yearly: [
    { label: '2021', value: 4800000 },
    { label: '2022', value: 6900000 },
    { label: '2023', value: 11200000 },
    { label: '2024', value: 15800000 },
    { label: '2025', value: 24500000 },
    { label: '2026 (Est)', value: 36000000 }
  ]
};

export const RECENT_ACTIVITIES: Activity[] = [
  {
    id: 'act-101',
    type: 'revenue',
    title: 'Closed Deal Worth $1,200,000',
    description: 'Julian Mercer signed the suborbital launch fleet delivery contract.',
    timestamp: '2 hours ago',
    user: { name: 'Julian Mercer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' }
  },
  {
    id: 'act-102',
    type: 'lead',
    title: 'New Enterprise Lead Created',
    description: 'Zara Al-Mansoori (Orion Hydrogen) scored at 82% suitability.',
    timestamp: '4 hours ago',
    user: { name: 'Zara Al-Mansoori', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' }
  },
  {
    id: 'act-103',
    type: 'meeting',
    title: 'Geneva Port Strategy Scheduled',
    description: 'Swiss Sovereign fund partner Elena Rostova scheduled a Mayfair luncheon.',
    timestamp: '1 day ago',
    user: { name: 'Lord Sterling Thorne', avatar: CURRENT_USER.avatar }
  },
  {
    id: 'act-104',
    type: 'task',
    title: 'Mayfair Showroom Complete',
    description: 'VR showroom alpha designs have been signed-off successfully.',
    timestamp: '2 days ago',
    user: { name: 'Alaric Thorne', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' }
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Lady Arabella Sterling',
    role: 'Senior Wealth Advisor & Family Office Specialist',
    email: 'arabella.s@aurelia.executive',
    phone: '+44 20 7946 0881',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    department: 'Private Wealth Advisory',
    joinedDate: '2023-01-10',
    performanceScore: 98,
    status: 'Active',
    rating: 4.9,
    skills: ['Family Office', 'Trust Structures', 'Asset Preservation', 'High-End Art Advisory'],
    bio: 'Arabella specializes in handling Multi-Family Office structures and luxury physical asset trusts. She provides bespoke white-glove financial stewardship to our most selective Diamond tier sovereigns.'
  },
  {
    id: 'emp-2',
    name: 'Charles Montgomery',
    role: 'Director of Elite Client Acquisitions',
    email: 'c.montgomery@aurelia.executive',
    phone: '+44 20 7946 0542',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
    department: 'Business Development',
    joinedDate: '2023-05-18',
    performanceScore: 95,
    status: 'Active',
    rating: 4.8,
    skills: ['Offshore Brokerage', 'Sovereign Acquisitions', 'Strategic Negotiation', 'Cross-Border Capital'],
    bio: 'Charles leads high-value acquisition pipelines across continental Europe and the Middle East. With fifteen years of offshore brokerage expertise, he excels in structuring large-scale capital entries.'
  },
  {
    id: 'emp-3',
    name: 'Victoria Sinclair',
    role: 'Chief Compliance Officer & Risk Counsel',
    email: 'v.sinclair@aurelia.executive',
    phone: '+44 20 7946 0991',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    department: 'Legal & Risk Assurance',
    joinedDate: '2024-02-14',
    performanceScore: 96,
    status: 'Active',
    rating: 4.9,
    skills: ['Sovereign Compliance', 'Physical Vault Escrow', 'Global Taxation', 'Bespoke Non-Disclosure'],
    bio: 'Victoria oversees regulatory adherence, physical safe-deposit indices, and cross-jurisdictional tax laws. Her meticulous counsel guarantees complete discretion and institutional grade protection.'
  },
  {
    id: 'emp-4',
    name: 'Julian Drake',
    role: 'Executive Director of Digital Vault Protocols',
    email: 'j.drake@aurelia.executive',
    phone: '+44 20 7946 0225',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    department: 'Client Technology Systems',
    joinedDate: '2024-08-01',
    performanceScore: 92,
    status: 'Active',
    rating: 4.7,
    skills: ['Cybersecurity', 'Biometric Encryption', 'Private Ledger Architecture', 'Data Sovereignty'],
    bio: 'Julian manages our private portal tech structures and secure communications networks. He is responsible for establishing bespoke biometric authentication suites for our clients\' personal digital portals.'
  },
  {
    id: 'emp-5',
    name: 'Marcus Hawthorne',
    role: 'Aviation & Superyacht Charter Curator',
    email: 'm.hawthorne@aurelia.executive',
    phone: '+377 93 11 22 33',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
    department: 'Lifestyle Concierge',
    joinedDate: '2023-11-15',
    performanceScore: 94,
    status: 'On Leave',
    rating: 4.8,
    skills: ['Marine Charter', 'Private Aviation Escrow', 'Mediterranean Logistics', 'VIP Guest Hosting'],
    bio: 'Marcus crafts bespoke, end-to-end leasing packages and transit routes for superyachts and private aviation fleets in Monaco, the Caribbean, and Zurich, ensuring exceptional lifestyle logistics.'
  }
];