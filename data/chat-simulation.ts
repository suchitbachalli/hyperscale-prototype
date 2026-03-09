export interface ChatMessage {
  id: string;
  sender: 'agent' | 'customer';
  senderName?: string;
  content: string;
  timestamp?: string;
}

export interface ChatThread {
  id: string;
  domainId: string;
  title: string;
  messages: ChatMessage[];
}

export const chatThreads: ChatThread[] = [
  {
    id: 'thread-contacts',
    domainId: 'contacts',
    title: 'First Contact',
    messages: [
      {
        id: 'c1',
        sender: 'agent',
        content: `Hi Todd! Welcome to the Reynolds & Son implementation project. I'm your HyperScaleAWC implementation assistant — I'll be helping collect all the configuration data we need to build your CX1 eCommerce site.\n\nI already know from your contract that you're on Prophet 21 (Cloud), you've purchased CX1 eCommerce with the AD Adaptor, and your beta site is live at 190487rey-beta.cimm2.com.\n\nLet's start with your team's contact information. Can you confirm you're in the Eastern time zone?`,
      },
      {
        id: 'c2',
        sender: 'customer',
        senderName: 'Todd',
        content: `Yes EST. My GM Dawn Sprague will be the primary day-to-day contact. Her email is dsprague@reynoldsandson.com, phone 802-505-9196. Our IT admin Dave Gilding handles the technical side — dgilding@reynoldsandson.com.`,
      },
      {
        id: 'c3',
        sender: 'agent',
        content: `Got it! I've recorded:\n\n• Dawn Sprague — GM, Primary Contact (dsprague@reynoldsandson.com, 802-505-9196)\n• Dave Gilding — IT System Admin, Technical Contact (dgilding@reynoldsandson.com)\n• Todd Goulette — President, Management Contact\n\nShould all three of you receive weekly project updates and be copied on emails?`,
      },
      {
        id: 'c4',
        sender: 'customer',
        senderName: 'Todd',
        content: 'Yes all three on everything.',
      },
      {
        id: 'c5',
        sender: 'agent',
        content: `✅ Contacts complete! For go-live weekend, we'll need cell phones and availability windows for key people — I'll circle back on that closer to launch.\n\nNext up: let's confirm your contract scope. I see CX1 eCommerce, CIMM2 Admin Portal, and the AD Adaptor. Any add-on products? Mobile app, Site Analytics Pro, Punchout?`,
      },
      {
        id: 'c6',
        sender: 'customer',
        senderName: 'Todd',
        content: `No add-ons for now. We want to get the base site right first.`,
      },
      {
        id: 'c7',
        sender: 'agent',
        content: `Smart approach. I've marked all add-ons as "No" for now. You can always add these later. ✅ Contract & Add-Ons confirmed.`,
      },
    ],
  },
  {
    id: 'thread-erp',
    domainId: 'erp-connection',
    title: 'ERP Connection',
    messages: [
      {
        id: 'e1',
        sender: 'agent',
        content: `Dave, let's set up the P21 connection. I need the API endpoint URL, username, and password for both your Live and Play environments.`,
      },
      {
        id: 'e2',
        sender: 'customer',
        senderName: 'Dave',
        content: `Live: https://reynoldsandson-API.epicordistribution.com/\nUsername UNILOG1, password P21@proC476914\nPlay is the same but with -play- in the URL.`,
      },
      {
        id: 'e3',
        sender: 'agent',
        content: `I've captured:\n\nLIVE:\n  URL: https://reynoldsandson-API.epicordistribution.com/\n  Username: UNILOG1\n\nPLAY:\n  URL: https://reynoldsandson-play-API.epicordistribution.com/\n  Username: UNILOG1\n\nBefore I save — a few P21-specific questions:\n\n1. ✅ Are the Epicor B2B Seller APIs installed and configured?\n2. ✅ Is the Scheduled Import / B2B Seller Import configured?\n3. ✅ Is the Scheduled Task created and configured?\n4. ✅ Is the Web Import Timeout configured in System Settings?\n5. Are Pricing Contracts used? (Note: if yes, each customer must have a single price contract assigned)`,
      },
      {
        id: 'e4',
        sender: 'customer',
        senderName: 'Dave',
        content: 'Yes to all. We do use pricing contracts, one per customer.',
      },
      {
        id: 'e5',
        sender: 'agent',
        content: `✅ Perfect. Your ERP version is 24.2.5512.606 on Live and 25.1.5541.4 on Play — confirmed. Store Name is "Reynolds and Son, Inc." and DB names are az_108520_live and az_108520_play.\n\nFor order status, which codes should incoming eCommerce orders use?`,
      },
      {
        id: 'e6',
        sender: 'customer',
        senderName: 'Dave',
        content: 'We have BAL (Balance), COD, HOLD, and NO LIMIT.',
      },
      {
        id: 'e7',
        sender: 'agent',
        content: `✅ ERP Connection fully configured! Moving to Payment Gateway next — since you're on P21, you'll be using WorldPay/Element. Do you have your credentials handy?`,
      },
    ],
  },
  {
    id: 'thread-shipping',
    domainId: 'shipping',
    title: 'Shipping Configuration',
    messages: [
      {
        id: 's1',
        sender: 'agent',
        content: `Dawn, let's configure shipping. Will you be charging shipping at checkout?`,
      },
      {
        id: 's2',
        sender: 'customer',
        senderName: 'Dawn',
        content: `No, we don't charge shipping on the site.`,
      },
      {
        id: 's3',
        sender: 'agent',
        content: `Got it — shipping cost won't be calculated at checkout.\n\nHowever, I still need your Ship Via codes from P21 so customers can select their delivery method. Can you provide those?`,
      },
      {
        id: 's4',
        sender: 'customer',
        senderName: 'Dawn',
        content: `We have a bunch. Let me paste them...\n104811 BEST WAY\n110130 C.H. Robinson\n104449 FEDEX GROUND\n104451 FEDEX NDA - PPD & ADD\n104454 PICKUP - BARRE\n104452 PICKUP - Colchester\n104453 PICKUP - RUTLAND\n104458 R&S DELIVERY\n104461 UPS GROUND\n104463 UPS 2nd DAY - PREPAID & ADD\n104464 UPS NDA - PREPAID & ADD`,
      },
      {
        id: 's5',
        sender: 'agent',
        content: `I see 11 ship vias — and I notice you have 3 pickup locations (Barre, Colchester, Rutland) but your warehouse tab only lists one location (South Barre). Should I add Colchester and Rutland as pickup locations on the site, or are those just legacy codes?`,
      },
      {
        id: 's6',
        sender: 'customer',
        senderName: 'Dawn',
        content: `Good catch — Colchester and Rutland are closed. Just Barre.`,
      },
      {
        id: 's7',
        sender: 'agent',
        content: `✅ I'll keep PICKUP - BARRE active and flag the other two as inactive. I also see UPS codes — will you need UPS freight rate integration, or just the ship via dropdown?`,
      },
      {
        id: 's8',
        sender: 'customer',
        senderName: 'Dawn',
        content: `Just the dropdown, no rate calculation.`,
      },
      {
        id: 's9',
        sender: 'agent',
        content: `✅ Shipping configured! No freight charges, 11 ship vias loaded, UPS rate integration not needed.`,
      },
    ],
  },
  {
    id: 'thread-design',
    domainId: 'design',
    title: 'Design & Brand',
    messages: [
      {
        id: 'd1',
        sender: 'agent',
        content: `Dawn, let's get your brand assets set up. I need your logo files, brand colors, fonts, and banners.\n\nFor colors, I need hex codes for: 3 primary, 3 secondary, 6 tertiary, and neutral colors. Your current site uses a red/black/white palette — is that what you want for the new site?`,
      },
      {
        id: 'd2',
        sender: 'customer',
        senderName: 'Dawn',
        content: `Yes, staying with our brand. I'll upload our brand guide. Primary colors are #CC0000 (red), #333333 (dark gray), and #FFFFFF (white).`,
      },
      {
        id: 'd3',
        sender: 'agent',
        content: `✅ Primary colors validated:\n  🔴 #CC0000 — Reynolds Red\n  ⚫ #333333 — Charcoal\n  ⚪ #FFFFFF — White\n\nI still need 3 secondary and 6 tertiary colors. Check your brand guide or I can suggest complementary colors based on your primaries?\n\nYour meta tag title is "Reynolds & Son, Inc. – Industrial Supply & Air System Specialists" — that's 63 characters, a bit over the recommended 50 for SEO. Want to shorten it?`,
      },
      {
        id: 'd4',
        sender: 'customer',
        senderName: 'Dawn',
        content: `Keep it as is, it describes us well.`,
      },
      {
        id: 'd5',
        sender: 'agent',
        content: `Noted — keeping the full title. I've also captured your meta description: "Reynolds & Son delivers tailored industrial supply solutions, compressed air systems, and vending services for first-responder teams across Vermont and beyond."\n\nFor the maintenance page (shown if your site is ever down):\n  Company: Reynolds and Son\n  Email: sales@reynoldsandson.com\n  Phone: (800)-639-2901\n\n✅ Design metadata complete!`,
      },
    ],
  },
  {
    id: 'thread-whitelisting',
    domainId: 'whitelisting',
    title: 'Smart Validation',
    messages: [
      {
        id: 'w1',
        sender: 'agent',
        content: `Dave, I'm reviewing your whitelisting data. You need to whitelist these Unilog IPs in your P21 network configuration:\n\n  UNILOG:  182.72.168.202, 115.160.247.186\n  CIMMESB: 34.66.86.87, 35.193.59.255\n  STAGE:   35.239.114.135, 34.68.115.243\n  PROD:    34.132.104.253, 34.135.100.59\n\nSince you're on P21 Cloud (Epicor-hosted), you may need to contact Epicor support to whitelist these IPs rather than doing it through your own firewall. Have you confirmed with Epicor that they can whitelist external IPs for your cloud instance?`,
      },
      {
        id: 'w2',
        sender: 'customer',
        senderName: 'Dave',
        content: `Good point, I'll open a ticket with Epicor.`,
      },
      {
        id: 'w3',
        sender: 'agent',
        content: `I'll mark this as "pending — customer action" and check back in 3 days. ⏰ Reminder set for May 23.`,
      },
      {
        id: 'w4',
        sender: 'agent',
        content: `Hi Dave — just checking in on the IP whitelisting with Epicor. Were you able to get that ticket submitted?`,
        timestamp: '3 days later',
      },
      {
        id: 'w5',
        sender: 'customer',
        senderName: 'Dave',
        content: `Done! They whitelisted everything yesterday.`,
      },
      {
        id: 'w6',
        sender: 'agent',
        content: `✅ Whitelisting confirmed! Marking as complete.`,
      },
    ],
  },
];

export const liveDataPreview = {
  customer: {
    name: 'Reynolds & Son, Inc.',
    timezone: 'EST',
    currentUrl: 'https://www.reynoldsandson.com/',
    betaUrl: 'https://190487rey-beta.cimm2.com/',
  },
  erp: {
    name: 'Prophet 21',
    version: '24.2.5512.606',
    hosting: 'Cloud (Epicor)',
    live: {
      baseUrl: 'https://reynoldsandson-API.epicordistribution.com/',
      username: 'UNILOG1',
      storeName: 'Reynolds and Son, Inc.',
      dbName: 'az_108520_live',
    },
    orderStatuses: ['BAL', 'COD', 'HOLD', 'NO LIMIT'],
    pricingContracts: true,
  },
  paymentGateway: {
    name: 'WorldPay',
    transactionType: 'AUTH',
    cards: ['Mastercard (10)', 'AMEX (9)', 'Visa (4)'],
    live: { accountId: '1043904', acceptorId: '529000203169' },
  },
  warehouse: {
    locations: [{
      code: '100002',
      name: 'Reynolds & Son - So Barre',
      address: '47 Bridge Street, South Barre, VT 05670',
      lat: 44.17859, lng: -72.5086,
      hours: 'M-Th 7am-4pm, Fri 7am-3pm',
      manager: 'Dawn Sprague',
    }],
  },
  registration: {
    newsletter: true,
    retail: false,
    onAccount: true,
    accessOption: 'Manual review (Option 2)',
    allowPO: true,
    catalogAssignment: 'Customer-specific',
    cpnAdd: true,
    cpnWriteBackToERP: true,
    newCustomerCreateInERP: false,
    creditAppLink: true,
  },
};
