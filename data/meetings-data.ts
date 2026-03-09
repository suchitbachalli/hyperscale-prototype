// ── Interfaces ──────────────────────────────────────────────

export interface MeetingNote {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: string[];
  domain: string;
  domainLabel: string;
  summary: string[];
  extractedData: Record<string, string>;
  agentContext: string;
  fieldsUpdated: number;
}

export interface CalendarSlot {
  day: string;
  dayLabel: string;
  time: string;
  available: boolean;
  label?: string;
}

// ── Calendar Availability (Jen Wilburn's week) ──────────────

export const calendarWeek = {
  weekOf: 'Oct 6 - 10, 2025',
  days: ['Mon 10/6', 'Tue 10/7', 'Wed 10/8', 'Thu 10/9', 'Fri 10/10'],
};

export const calendarSlots: CalendarSlot[] = [
  // Monday
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '9:00 AM', available: false, label: 'Team Standup' },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '9:30 AM', available: true },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '10:00 AM', available: false, label: 'Onboarding Call' },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '10:30 AM', available: false, label: 'Onboarding Call' },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '11:00 AM', available: true },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '11:30 AM', available: true },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '12:00 PM', available: false, label: 'Lunch' },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '12:30 PM', available: false, label: 'Lunch' },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '1:00 PM', available: true },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '1:30 PM', available: true },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '2:00 PM', available: false, label: 'Sprint Review' },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '2:30 PM', available: false, label: 'Sprint Review' },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '3:00 PM', available: true },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '3:30 PM', available: true },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '4:00 PM', available: true },
  { day: 'Mon 10/6', dayLabel: 'Mon', time: '4:30 PM', available: false, label: 'Wrap-up' },
  // Tuesday
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '9:00 AM', available: false, label: 'Team Standup' },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '9:30 AM', available: true },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '10:00 AM', available: true },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '10:30 AM', available: true },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '11:00 AM', available: false, label: 'Customer Call' },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '11:30 AM', available: false, label: 'Customer Call' },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '12:00 PM', available: false, label: 'Lunch' },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '12:30 PM', available: false, label: 'Lunch' },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '1:00 PM', available: true },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '1:30 PM', available: false, label: 'Design Review' },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '2:00 PM', available: false, label: 'Design Review' },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '2:30 PM', available: true },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '3:00 PM', available: true },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '3:30 PM', available: true },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '4:00 PM', available: true },
  { day: 'Tue 10/7', dayLabel: 'Tue', time: '4:30 PM', available: false, label: 'Wrap-up' },
  // Wednesday
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '9:00 AM', available: false, label: 'Team Standup' },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '9:30 AM', available: false, label: 'All Hands' },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '10:00 AM', available: false, label: 'All Hands' },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '10:30 AM', available: true },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '11:00 AM', available: true },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '11:30 AM', available: true },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '12:00 PM', available: false, label: 'Lunch' },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '12:30 PM', available: false, label: 'Lunch' },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '1:00 PM', available: true },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '1:30 PM', available: true },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '2:00 PM', available: true },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '2:30 PM', available: false, label: 'P21 Training' },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '3:00 PM', available: false, label: 'P21 Training' },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '3:30 PM', available: true },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '4:00 PM', available: true },
  { day: 'Wed 10/8', dayLabel: 'Wed', time: '4:30 PM', available: false, label: 'Wrap-up' },
  // Thursday
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '9:00 AM', available: false, label: 'Team Standup' },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '9:30 AM', available: true },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '10:00 AM', available: true },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '10:30 AM', available: false, label: 'Beta QA' },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '11:00 AM', available: false, label: 'Beta QA' },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '11:30 AM', available: true },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '12:00 PM', available: false, label: 'Lunch' },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '12:30 PM', available: false, label: 'Lunch' },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '1:00 PM', available: true },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '1:30 PM', available: true },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '2:00 PM', available: true },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '2:30 PM', available: true },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '3:00 PM', available: false, label: 'Impl Review' },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '3:30 PM', available: false, label: 'Impl Review' },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '4:00 PM', available: true },
  { day: 'Thu 10/9', dayLabel: 'Thu', time: '4:30 PM', available: false, label: 'Wrap-up' },
  // Friday
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '9:00 AM', available: false, label: 'Team Standup' },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '9:30 AM', available: true },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '10:00 AM', available: true },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '10:30 AM', available: true },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '11:00 AM', available: true },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '11:30 AM', available: false, label: 'Weekly Sync' },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '12:00 PM', available: false, label: 'Lunch' },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '12:30 PM', available: false, label: 'Lunch' },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '1:00 PM', available: true },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '1:30 PM', available: true },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '2:00 PM', available: true },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '2:30 PM', available: true },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '3:00 PM', available: true },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '3:30 PM', available: false, label: 'Retro' },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '4:00 PM', available: false, label: 'Retro' },
  { day: 'Fri 10/10', dayLabel: 'Fri', time: '4:30 PM', available: false, label: 'EOW' },
];

// ── Meeting Notes ───────────────────────────────────────────

export const meetingNotes: MeetingNote[] = [
  {
    id: 'mtg-erp-001',
    title: 'ERP Connection Deep Dive',
    date: 'Sep 18, 2025',
    time: '2:00 PM EST',
    duration: '28 min',
    participants: ['Jen Wilburn (Unilog)', 'Dave (Reynolds & Son)'],
    domain: 'erp-connection',
    domainLabel: 'ERP Connection',
    summary: [
      'Confirmed P21 Cloud API endpoint URLs for both Live and Play environments',
      'Dave provided UNILOG1 service account credentials for API access',
      'Discussed order status codes: BAL, COD, HOLD, NO LIMIT — all mapped to CX1 schema',
      'Agreed to use pricing contracts with one contract per customer',
    ],
    extractedData: {
      'API Username': 'UNILOG1',
      'Live URL': 'reynoldsandson-API.epicordistribution.com',
      'Play URL': 'reynoldsandson-API.epicordistribution.com (play)',
      'Order Statuses': 'BAL, COD, HOLD, NO LIMIT',
      'Pricing Model': 'One contract per customer',
      'DB Names': 'az_108520_live, az_108520_play',
    },
    agentContext: 'Data from this call auto-populated ERP Connection and API Endpoints domains. 12 fields updated without manual entry.',
    fieldsUpdated: 12,
  },
  {
    id: 'mtg-whitelist-001',
    title: 'IP Whitelisting Resolution',
    date: 'Sep 22, 2025',
    time: '10:30 AM EST',
    duration: '18 min',
    participants: ['Jen Wilburn (Unilog)', 'Todd (Reynolds & Son)'],
    domain: 'whitelisting',
    domainLabel: 'Whitelisting',
    summary: [
      'Todd confirmed Epicor Cloud requires specific IP ranges for external API access',
      'Jen provided Unilog production IP range: 34.120.x.x/24 for GCP egress',
      'Agreed to add both primary and failover IP ranges to Epicor allow-list',
      'Todd will submit Epicor support ticket and confirm within 48 hours',
    ],
    extractedData: {
      'Primary IP Range': '34.120.x.x/24',
      'Failover IP Range': '35.190.x.x/24',
      'Epicor Support Ticket': 'EPC-2025-09-4412',
      'Estimated Completion': '48 hours',
    },
    agentContext: 'IP whitelisting data captured and stored in Whitelisting domain. Agent flagged this as a blocker dependency for ERP integration testing.',
    fieldsUpdated: 6,
  },
  {
    id: 'mtg-design-001',
    title: 'Design Review Kickoff',
    date: 'Sep 25, 2025',
    time: '1:30 PM EST',
    duration: '42 min',
    participants: ['Jen Wilburn (Unilog)', 'Dawn (Reynolds & Son)'],
    domain: 'design',
    domainLabel: 'Design & Brand',
    summary: [
      'Dawn shared brand guidelines: primary blue #333F48, accent gold #F1B434, white backgrounds',
      'Logo files provided in SVG and PNG formats — uploaded to shared OneDrive folder',
      'Homepage hero should feature Turnout Gear imagery (fire service is their premium category)',
      'Footer must include all 4 service divisions: Industrial, Fire Service, Compressed Air, Vending & VMI',
      'Dawn requested "SUPPLIES. SUPPORT. SOLUTIONS." tagline appear prominently',
    ],
    extractedData: {
      'Primary Color': '#333F48 (Steel Blue)',
      'Accent Color': '#F1B434 (Gold)',
      'Logo Format': 'SVG + PNG (OneDrive)',
      'Hero Category': 'Fire Service / Turnout Gear',
      'Tagline': 'SUPPLIES. SUPPORT. SOLUTIONS.',
      'Footer Sections': '4 service divisions required',
    },
    agentContext: 'Brand assets and design preferences captured into Design & Brand domain. 18 fields populated including color codes, typography preferences, and layout requirements.',
    fieldsUpdated: 18,
  },
  {
    id: 'mtg-shipping-001',
    title: 'Shipping Configuration',
    date: 'Oct 1, 2025',
    time: '11:00 AM EST',
    duration: '35 min',
    participants: ['Jen Wilburn (Unilog)', 'Dave (Reynolds & Son)'],
    domain: 'shipping',
    domainLabel: 'Shipping',
    summary: [
      'Reynolds ships from single warehouse in South Barre, VT (05670)',
      'Primary carriers: UPS Ground, FedEx Express for fire service urgency orders',
      'Free shipping threshold: $500 for standard orders, always free for fire service',
      'Dave confirmed they use P21 freight codes mapped to carrier service levels',
      'Hazmat shipping required for some compressed air chemicals — separate carrier rates',
    ],
    extractedData: {
      'Warehouse': 'South Barre, VT 05670',
      'Primary Carrier': 'UPS Ground',
      'Express Carrier': 'FedEx Express (fire service)',
      'Free Shipping': '$500+ standard, always for fire service',
      'Freight Codes': 'P21 mapped to carrier levels',
      'Hazmat': 'Yes — compressed air chemicals',
    },
    agentContext: 'Shipping preferences and carrier configuration captured. Agent auto-mapped P21 freight codes to CX1 shipping methods. 14 fields updated across Shipping and Tax domains.',
    fieldsUpdated: 14,
  },
];

// ── Meeting Notes for Chat (short version for inline display) ──

export const erpMeetingNoteSummary = {
  title: 'ERP Connection Deep Dive',
  date: 'Sep 18, 2025',
  duration: '28 min',
  participants: 'Jen Wilburn + Dave',
  bullets: [
    'P21 API endpoints confirmed for Live and Play',
    'Service account credentials captured',
    'Order status codes mapped: BAL, COD, HOLD, NO LIMIT',
    '12 fields auto-populated from call insights',
  ],
};

export const whitelistMeetingNoteSummary = {
  title: 'IP Whitelisting Resolution',
  date: 'Sep 22, 2025',
  duration: '18 min',
  participants: 'Jen Wilburn + Todd',
  bullets: [
    'Unilog production IP ranges provided for Epicor allow-list',
    'Primary + failover ranges documented',
    'Epicor support ticket submitted (EPC-2025-09-4412)',
    '6 fields auto-populated from call insights',
  ],
};
