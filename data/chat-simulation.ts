export interface ChatMessage {
  id: string;
  sender: 'agent' | 'customer';
  senderName?: string;
  type?: 'text' | 'call-prompt' | 'calendar-prompt' | 'meeting-notes';
  content: string;
  timestamp?: string;
  meetingData?: {
    title: string;
    date: string;
    duration: string;
    participants: string;
    bullets: string[];
  };
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
        content: `Yes EST. My GM Dawn Sprague will be the primary day-to-day contact. Her email is gm@example-distributor.com, phone 555-555-0100. Our IT admin Dave Gilding handles the technical side — it-admin@example-distributor.com.`,
      },
      {
        id: 'c3',
        sender: 'agent',
        content: `Got it! I've recorded:\n\n• Dawn Sprague — GM, Primary Contact (gm@example-distributor.com, 555-555-0100)\n• Dave Gilding — IT System Admin, Technical Contact (it-admin@example-distributor.com)\n• Todd Goulette — President, Management Contact\n\nShould all three of you receive weekly project updates and be copied on emails?`,
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
        content: `Live: https://example-erp-api.example.com/\nUsername [REDACTED], password [REDACTED]\nPlay is the same but with -play- in the URL.`,
      },
      {
        id: 'e2b',
        sender: 'agent',
        type: 'call-prompt',
        content: 'This looks like a complex ERP setup. Need help from your Unilog PM?',
      },
      {
        id: 'e2c',
        sender: 'agent',
        type: 'calendar-prompt',
        content: 'Schedule a call with Jen to walk through the ERP setup together.',
      },
      {
        id: 'e2d',
        sender: 'agent',
        type: 'meeting-notes',
        content: 'Meeting notes captured',
        meetingData: {
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
        },
      },
      {
        id: 'e3',
        sender: 'agent',
        content: `I've captured:\n\nLIVE:\n  URL: https://example-erp-api.example.com/\n  Username: [REDACTED]\n\nPLAY:\n  URL: https://example-erp-play.example.com/\n  Username: [REDACTED]\n\nBefore I save — a few P21-specific questions:\n\n1. ✅ Are the Epicor B2B Seller APIs installed and configured?\n2. ✅ Is the Scheduled Import / B2B Seller Import configured?\n3. ✅ Is the Scheduled Task created and configured?\n4. ✅ Is the Web Import Timeout configured in System Settings?\n5. Are Pricing Contracts used? (Note: if yes, each customer must have a single price contract assigned)`,
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
        content: `✅ Perfect. Your ERP version is 24.2.5512.606 on Live and 25.1.5541.4 on Play — confirmed. Store Name is "Reynolds and Son, Inc." and DB names are example_db_live and example_db_play.\n\nFor order status, which codes should incoming eCommerce orders use?`,
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
        content: `Dave, I'm reviewing your whitelisting data. You need to whitelist these Unilog IPs in your P21 network configuration:\n\n  UNILOG:  192.0.2.1, 192.0.2.2\n  CIMMESB: 198.51.100.1, 198.51.100.2\n  STAGE:   203.0.113.1, 203.0.113.2\n  PROD:    203.0.113.3, 203.0.113.4\n\nSince you're on P21 Cloud (Epicor-hosted), you may need to contact Epicor support to whitelist these IPs rather than doing it through your own firewall. Have you confirmed with Epicor that they can whitelist external IPs for your cloud instance?`,
      },
      {
        id: 'w1b',
        sender: 'agent',
        type: 'call-prompt',
        content: 'IP whitelisting on Epicor Cloud can be tricky. Want to loop in your PM?',
      },
      {
        id: 'w1c',
        sender: 'agent',
        type: 'calendar-prompt',
        content: 'Schedule a call with Jen to sort out the IP whitelisting.',
      },
      {
        id: 'w1d',
        sender: 'agent',
        type: 'meeting-notes',
        content: 'Meeting notes captured',
        meetingData: {
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
        },
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
  {
    id: 'thread-contract-scope',
    domainId: 'contract-scope',
    title: 'Contract Scope',
    messages: [
      { id: 'cs1', sender: 'agent', content: `Todd, let's confirm your contract scope. I see you've purchased:\n\n• CX1 eCommerce\n• CIMM2 Admin Portal\n• AD Adaptor (Epicor P21)\n\nGo-live date is set for October 17, 2025. Does that all look correct?` },
      { id: 'cs2', sender: 'customer', senderName: 'Todd', content: `Yes that's right. We also want to make sure the AD Adaptor covers real-time inventory sync — that was a big selling point for us.` },
      { id: 'cs3', sender: 'agent', content: `Confirmed — the AD Adaptor includes real-time inventory, pricing, and order sync with P21. Your implementation type is "Go Program" which means you get the full guided setup.\n\nYour Unilog IPM (Implementation Project Manager) is Jen Wilburn. She'll be scheduling your weekly check-in calls.\n\n✅ Contract scope validated.` },
    ],
  },
  {
    id: 'thread-add-on-products',
    domainId: 'add-on-products',
    title: 'Add-On Products',
    messages: [
      { id: 'ao1', sender: 'agent', content: `Todd, I want to walk through available add-ons for your CX1 site. Here's what's available:\n\n• Site Analytics Pro — advanced visitor tracking and conversion analytics\n• Punchout — cXML/OCI for enterprise procurement\n• Mobile App — native iOS/Android for your customers\n• Content Enrichment — AI-powered product descriptions\n\nAny interest in these?` },
      { id: 'ao2', sender: 'customer', senderName: 'Todd', content: `No add-ons for now. We want to get the base site right first.` },
      { id: 'ao3', sender: 'agent', content: `Smart approach. I've marked all add-ons as "No" for now. You can always add these later — most customers add Punchout within 6 months once their B2B customers start requesting it.\n\n✅ Add-On Products confirmed — none selected.` },
    ],
  },
  {
    id: 'thread-recaptcha-maps',
    domainId: 'recaptcha-maps',
    title: 'reCAPTCHA & Maps',
    messages: [
      { id: 'rm1', sender: 'agent', content: `Dave, we need Google API keys for two services on your site:\n\n1. **reCAPTCHA v3** — protects registration and contact forms from bots\n2. **Google Maps API** — powers the store locator / branch finder\n\nDo you have a Google Cloud console account where we can generate these keys?` },
      { id: 'rm2', sender: 'customer', senderName: 'Dave', content: `I have our Google Cloud account. Give me the specifics on what to enable and I'll set it up.` },
      { id: 'rm3', sender: 'agent', content: `Here's what you need:\n\n**reCAPTCHA:**\n1. Go to google.com/recaptcha/admin\n2. Register new site → reCAPTCHA v3\n3. Add domain: reynoldsandson.com + 190487rey-beta.cimm2.com\n4. Send me the Site Key and Secret Key\n\n**Maps:**\n1. In Google Cloud Console → Enable "Maps JavaScript API" and "Geocoding API"\n2. Create an API key restricted to your domains\n3. Send me the key` },
      { id: 'rm4', sender: 'customer', senderName: 'Dave', content: `Done. reCAPTCHA Site Key: RECAPTCHA_SITE_KEY_HERE, Secret: RECAPTCHA_SECRET_HERE. Maps key: GOOGLE_MAPS_KEY_HERE.` },
      { id: 'rm5', sender: 'agent', content: `✅ Both keys captured and validated:\n  reCAPTCHA v3: Active ✓\n  Maps JavaScript API: Active ✓\n  Geocoding API: Active ✓\n\nreCAPTCHA & Maps complete!` },
    ],
  },
  {
    id: 'thread-smtp',
    domainId: 'smtp',
    title: 'SMTP Email Relay',
    messages: [
      { id: 'sm1', sender: 'agent', content: `Dawn, your CX1 site will send transactional emails — order confirmations, shipping notifications, password resets, etc. We need SMTP relay credentials.\n\nDo you use an email service like SendGrid, Mailgun, or your own mail server?` },
      { id: 'sm2', sender: 'customer', senderName: 'Dawn', content: `We use Microsoft 365 for email. Can we relay through that?` },
      { id: 'sm3', sender: 'agent', content: `Yes! M365 supports SMTP relay. Here's what I need:\n\n• SMTP Host: smtp.office365.com\n• Port: 587 (TLS)\n• "From" email address (e.g., orders@reynoldsandson.com)\n• App password or OAuth credentials for that mailbox\n\nYou may need to enable SMTP AUTH for this mailbox in Exchange admin.` },
      { id: 'sm4', sender: 'customer', senderName: 'Dawn', content: `From address should be orders@reynoldsandson.com. Dave is setting up the app password now.` },
      { id: 'sm5', sender: 'customer', senderName: 'Dave', content: `App password created: SMTP host smtp.office365.com, port 587, TLS enabled. Username: orders@reynoldsandson.com` },
      { id: 'sm6', sender: 'agent', content: `✅ SMTP configured:\n  Host: smtp.office365.com:587 (TLS)\n  From: orders@reynoldsandson.com\n  Auth: App password\n\nI'll send a test email during QA. SMTP Email Relay complete!` },
    ],
  },
  {
    id: 'thread-ssl',
    domainId: 'ssl',
    title: 'SSL Certificate',
    messages: [
      { id: 'sl1', sender: 'agent', content: `Dave, for your production site we need an SSL certificate. A few questions:\n\n1. Will the site launch on **www.reynoldsandson.com** or a subdomain like shop.reynoldsandson.com?\n2. Do you already have an SSL certificate, or should we provision one?\n3. Who manages your DNS? (We'll need to add CNAME records)` },
      { id: 'sl2', sender: 'customer', senderName: 'Dave', content: `It'll be www.reynoldsandson.com — same as our current site. We use GoDaddy for DNS. We have a wildcard cert but I think it's easier if you provision a new one.` },
      { id: 'sl3', sender: 'agent', content: `Agreed — we'll provision a Let's Encrypt certificate for reynoldsandson.com and www.reynoldsandson.com. Auto-renews every 90 days.\n\nI'll need you to add these DNS records in GoDaddy when we're ready:\n  CNAME: www → [will provide at go-live]\n  A record: @ → [will provide at go-live]\n\nFor now, your beta site at 190487rey-beta.cimm2.com already has SSL.\n\n✅ SSL plan confirmed — will provision at go-live cutover.` },
    ],
  },
  {
    id: 'thread-erp-integration',
    domainId: 'erp-integration',
    title: 'ERP Integration Rules',
    messages: [
      { id: 'ei1', sender: 'agent', content: `Dave, now that the P21 connection is live, let's configure the integration rules. These control how data syncs between CX1 and P21.\n\n**Order Sync:**\n• When should orders push to P21? (Real-time vs batch)\n• Should we create the customer in P21 if they don't exist?\n\n**Inventory Sync:**\n• Frequency? (We recommend every 15 minutes)\n• Include all warehouses or just South Barre?` },
      { id: 'ei2', sender: 'customer', senderName: 'Dave', content: `Real-time for orders — we need them in P21 immediately. Don't auto-create customers, we want to review new accounts manually. Inventory every 15 min is fine, just South Barre.` },
      { id: 'ei3', sender: 'agent', content: `Got it. A few more:\n\n• **Price sync**: Real-time lookup or cached? (Real-time is slower but always accurate)\n• **Order status writeback**: Should order status changes in P21 update the customer's order page on the site?` },
      { id: 'ei4', sender: 'customer', senderName: 'Dave', content: `Real-time pricing — our customers negotiate specific pricing and we need that to be accurate. Yes on order status writeback.` },
      { id: 'ei5', sender: 'agent', content: `✅ ERP Integration configured:\n  Orders → P21: Real-time\n  New customers: Manual review required\n  Inventory sync: 15-min intervals, South Barre only\n  Pricing: Real-time lookup per customer\n  Order status: Bi-directional writeback\n\nERP Integration complete!` },
    ],
  },
  {
    id: 'thread-api-endpoints',
    domainId: 'api-endpoints',
    title: 'API Endpoints',
    messages: [
      { id: 'ap1', sender: 'agent', content: `Dave, I'm validating the P21 API endpoints we'll be hitting. Based on your AD Adaptor configuration, here are the endpoints I need to confirm:\n\n• /api/inventory — stock levels\n• /api/pricing — customer-specific pricing\n• /api/orders — order creation/status\n• /api/customers — customer lookup\n• /api/products — catalog sync\n\nAre all of these enabled on your P21 instance?` },
      { id: 'ap2', sender: 'customer', senderName: 'Dave', content: `Yes, all enabled. The B2B Seller APIs are fully configured. We also have /api/shipments for tracking.` },
      { id: 'ap3', sender: 'agent', content: `I've tested connectivity to all endpoints:\n\n  ✅ /api/inventory — 200 OK (avg 180ms)\n  ✅ /api/pricing — 200 OK (avg 220ms)\n  ✅ /api/orders — 200 OK (avg 150ms)\n  ✅ /api/customers — 200 OK (avg 130ms)\n  ✅ /api/products — 200 OK (avg 200ms)\n  ✅ /api/shipments — 200 OK (avg 160ms)\n\nAll endpoints responsive. API Endpoints validated!` },
    ],
  },
  {
    id: 'thread-payment-gateway',
    domainId: 'payment-gateway',
    title: 'Payment Gateway',
    messages: [
      { id: 'pg1', sender: 'agent', content: `Since you're on P21, you'll be using WorldPay (Element) for payment processing. I need your merchant credentials:\n\n• Account ID\n• Acceptor ID\n• Account Token\n• Terminal ID (if applicable)\n• Transaction type: AUTH or AUTH+CAPTURE?` },
      { id: 'pg2', sender: 'customer', senderName: 'Dave', content: `Account ID: XXXXXXX, Acceptor ID: XXXXXXXXXXXX. We use AUTH only — capture happens when we ship from P21. Terminal ID is the same as Account ID.` },
      { id: 'pg3', sender: 'agent', content: `Got it. Which card types should we accept?\n\nCurrently configured in your WorldPay account:\n  Mastercard (10) ✅\n  AMEX (9) ✅\n  Visa (4) ✅\n  Discover (8) — do you want this enabled?` },
      { id: 'pg4', sender: 'customer', senderName: 'Dave', content: `Yes add Discover too.` },
      { id: 'pg5', sender: 'agent', content: `✅ Payment Gateway configured:\n  Provider: WorldPay/Element\n  Mode: AUTH only (capture on shipment)\n  Cards: Visa, Mastercard, AMEX, Discover\n  Account ID: XXXXXXX\n\nPayment Gateway complete!` },
    ],
  },
  {
    id: 'thread-tax',
    domainId: 'tax',
    title: 'Tax Configuration',
    messages: [
      { id: 'tx1', sender: 'agent', content: `Dawn, how do you handle sales tax today? Options:\n\n1. **Tax calculated in P21** — we pass the tax from your ERP (most common for P21 customers)\n2. **Third-party tax service** — Avalara, Vertex, TaxJar\n3. **No tax on site** — handled offline` },
      { id: 'tx2', sender: 'customer', senderName: 'Dawn', content: `Tax is calculated in P21. We have tax rules set up there already for Vermont and all the states we ship to.` },
      { id: 'tx3', sender: 'agent', content: `Perfect — we'll pull tax calculations from P21 at checkout. The AD Adaptor handles this automatically.\n\nDo you offer tax-exempt purchasing? Many of your industrial customers probably have tax-exempt certificates on file.` },
      { id: 'tx4', sender: 'customer', senderName: 'Dawn', content: `Yes, about 60% of our accounts are tax-exempt. That's already set up per customer in P21.` },
      { id: 'tx5', sender: 'agent', content: `✅ Tax configured:\n  Source: P21 (ERP-calculated)\n  Tax-exempt: Honored per customer record in P21\n  No third-party tax service needed\n\nTax Configuration complete!` },
    ],
  },
  {
    id: 'thread-registration',
    domainId: 'registration',
    title: 'Customer Registration',
    messages: [
      { id: 'rg1', sender: 'agent', content: `Dawn, let's set up customer registration. Key decisions:\n\n1. **Who can register?** Open to anyone, or invite-only?\n2. **Approval process?** Auto-approve, or manual review?\n3. **Account types?** Retail (credit card only) vs On-Account (PO/terms)?` },
      { id: 'rg2', sender: 'customer', senderName: 'Dawn', content: `Anyone can request an account but we need to review them. We're B2B so most customers will be on-account with terms. We do want to allow retail/credit card customers too.` },
      { id: 'rg3', sender: 'agent', content: `Got it. For on-account customers:\n• Should they be able to enter PO numbers at checkout?\n• Do you want a credit application link in the registration form?\n• When a new on-account customer is approved, should we auto-create them in P21?` },
      { id: 'rg4', sender: 'customer', senderName: 'Dawn', content: `Yes to PO numbers, yes to credit app link. Don't auto-create in P21 — we do that manually after credit approval.` },
      { id: 'rg5', sender: 'agent', content: `✅ Registration configured:\n  Open registration: Yes (with manual review)\n  Retail customers: Allowed\n  On-account: Allowed (PO enabled)\n  Credit application: Linked in registration\n  Auto-create in P21: No (manual)\n  Newsletter opt-in: Enabled\n\nCustomer Registration complete!` },
    ],
  },
  {
    id: 'thread-items-uom',
    domainId: 'items-uom',
    title: 'Items & UOM',
    messages: [
      { id: 'iu1', sender: 'agent', content: `Dave, let's configure how items and units of measure display on your site.\n\n• How many active SKUs do you have in P21?\n• Do you sell items in multiple UOMs? (e.g., "Each" vs "Box of 12" vs "Pallet")\n• Should customers be able to switch between UOMs on the product page?` },
      { id: 'iu2', sender: 'customer', senderName: 'Dave', content: `About 45,000 active SKUs. Yes we have multi-UOM on maybe 30% of items. Customers should definitely be able to pick their UOM.` },
      { id: 'iu3', sender: 'agent', content: `45K SKUs — solid catalog. For the UOM selector:\n\n• Should the price update when they switch UOM? (e.g., $5.00/each vs $48.00/box of 12)\n• What's the default UOM — smallest or most commonly ordered?\n• Do you use Customer Part Numbers (CPNs)?` },
      { id: 'iu4', sender: 'customer', senderName: 'Dave', content: `Yes, price should update with UOM. Default to the selling UOM from P21. We do use CPNs — customers should see their part number alongside ours.` },
      { id: 'iu5', sender: 'agent', content: `✅ Items & UOM configured:\n  Active SKUs: ~45,000\n  Multi-UOM: Enabled (30% of catalog)\n  UOM selector: With live price update\n  Default UOM: P21 selling UOM\n  CPNs: Displayed alongside catalog number\n  CPN write-back to ERP: Enabled\n\nItems & UOM complete!` },
    ],
  },
  {
    id: 'thread-pricing',
    domainId: 'pricing',
    title: 'Pricing Setup',
    messages: [
      { id: 'pr1', sender: 'agent', content: `Dawn, pricing is critical for your B2B site. Based on your P21 setup:\n\n• You use pricing contracts (one per customer)\n• You have customer-specific pricing\n\nShould the site show:\n1. **Customer price only** (logged-in users see their negotiated price)\n2. **List price + customer price** (show the discount)\n3. **"Call for pricing"** for non-logged-in visitors?` },
      { id: 'pr2', sender: 'customer', senderName: 'Dawn', content: `Option 2 for logged-in customers — they love seeing the discount. For guests, show list price but not customer pricing.` },
      { id: 'pr3', sender: 'agent', content: `Smart — showing the discount drives loyalty. Additional pricing questions:\n\n• Do you have quantity break pricing? (buy 10+ get 5% off)\n• Should we show "Was/Now" for promotional pricing?\n• Do you want to display unit pricing? (e.g., $0.42/ft)` },
      { id: 'pr4', sender: 'customer', senderName: 'Dawn', content: `Yes to quantity breaks, we set those up in P21. Yes to Was/Now for promos. No unit pricing needed.` },
      { id: 'pr5', sender: 'agent', content: `✅ Pricing configured:\n  Logged-in: List price + customer price (shows savings)\n  Guest: List price only\n  Quantity breaks: Enabled (from P21)\n  Promotional pricing: Was/Now display\n  Unit pricing: Disabled\n  Source: Real-time P21 lookup\n\nPricing Setup complete!` },
    ],
  },
  {
    id: 'thread-availability',
    domainId: 'availability',
    title: 'Inventory Display',
    messages: [
      { id: 'av1', sender: 'agent', content: `Dawn, how should inventory availability display on your site?\n\nOptions:\n1. **Exact quantity** — "23 in stock"\n2. **Threshold labels** — "In Stock" / "Low Stock" / "Out of Stock"\n3. **Buckets** — "10+", "50+", "100+"\n\nAlso — what happens when something is out of stock? Allow backorders?` },
      { id: 'av2', sender: 'customer', senderName: 'Dawn', content: `Threshold labels — we don't want competitors seeing exact counts. Yes, allow backorders but show an estimated lead time.` },
      { id: 'av3', sender: 'agent', content: `What thresholds do you want?\n  "In Stock" when qty > ?\n  "Low Stock" when qty > ?\n  "Out of Stock" when qty = 0?` },
      { id: 'av4', sender: 'customer', senderName: 'Dawn', content: `In Stock above 10, Low Stock between 1-10, Out of Stock at zero.` },
      { id: 'av5', sender: 'agent', content: `✅ Availability configured:\n  Display: Threshold labels\n  In Stock: qty > 10\n  Low Stock: 1-10\n  Out of Stock: 0\n  Backorders: Allowed (with lead time)\n  Source: P21 real-time (15-min sync)\n\nInventory Display complete!` },
    ],
  },
  {
    id: 'thread-my-account',
    domainId: 'my-account',
    title: 'My Account Features',
    messages: [
      { id: 'ma1', sender: 'agent', content: `Dawn, let's configure the "My Account" section. Which features do you want enabled?\n\n• Order History & Reorder\n• Invoice Lookup & Pay Online\n• Saved Lists / Favorites\n• Quick Order Pad (enter part numbers)\n• Address Book\n• Quote Requests` },
      { id: 'ma2', sender: 'customer', senderName: 'Dawn', content: `All of those! Especially Quick Order Pad — our customers order the same stuff regularly. And invoice lookup is a must, our AR team gets calls about that constantly.` },
      { id: 'ma3', sender: 'agent', content: `All features enabled. For Quick Order Pad:\n• Should it support CSV upload? (paste a list of part#/qty)\n• Should it auto-suggest as they type part numbers?` },
      { id: 'ma4', sender: 'customer', senderName: 'Dawn', content: `Yes to both!` },
      { id: 'ma5', sender: 'agent', content: `✅ My Account configured:\n  Order History: ✓ (with reorder button)\n  Invoice Lookup: ✓ (pay online enabled)\n  Saved Lists: ✓\n  Quick Order Pad: ✓ (CSV + auto-suggest)\n  Address Book: ✓\n  Quote Requests: ✓\n\nMy Account complete!` },
    ],
  },
  {
    id: 'thread-checkout-logged',
    domainId: 'checkout-logged',
    title: 'Checkout (Logged In)',
    messages: [
      { id: 'cl1', sender: 'agent', content: `Dawn, let's configure checkout for logged-in customers. Key settings:\n\n• **Payment methods**: Credit card, PO/terms, or both?\n• **PO number**: Required or optional for on-account customers?\n• **Ship-to addresses**: From P21 address book, or let them enter new ones?\n• **Order notes**: Allow a free-text field?` },
      { id: 'cl2', sender: 'customer', senderName: 'Dawn', content: `Both payment methods. PO number required for on-account. Ship-to from P21 address book — don't let them add new ones, we need those managed in P21. Yes to order notes.` },
      { id: 'cl3', sender: 'agent', content: `Should logged-in customers see:\n• Estimated delivery date?\n• Their credit limit / available credit?\n• Option to split shipments across ship-to addresses?` },
      { id: 'cl4', sender: 'customer', senderName: 'Dawn', content: `Show estimated delivery. Don't show credit info on the site. No split shipments — keep it simple.` },
      { id: 'cl5', sender: 'agent', content: `✅ Checkout (Logged In) configured:\n  Payment: Credit card + PO/terms\n  PO required: Yes (on-account)\n  Ship-to: P21 address book only\n  Order notes: Enabled\n  Delivery estimate: Shown\n  Credit display: Hidden\n  Split shipments: Disabled\n\nCheckout (Logged In) complete!` },
    ],
  },
  {
    id: 'thread-checkout-guest',
    domainId: 'checkout-guest',
    title: 'Checkout (Guest)',
    messages: [
      { id: 'cg1', sender: 'agent', content: `Dawn, should guests be able to check out without creating an account? If yes, they'd be limited to credit card payment only (no PO/terms).` },
      { id: 'cg2', sender: 'customer', senderName: 'Dawn', content: `Yes allow guest checkout. Credit card only is fine. But I want a prompt encouraging them to create an account for better pricing.` },
      { id: 'cg3', sender: 'agent', content: `I'll add a "Create Account for Volume Pricing" banner in the guest checkout flow.\n\nFor guest orders:\n• Should they get a tracking number via email?\n• Do you want to limit the cart total for guests? (some B2B sites cap at $500 for fraud prevention)` },
      { id: 'cg4', sender: 'customer', senderName: 'Dawn', content: `Yes send tracking. And good idea — cap guest orders at $1,000.` },
      { id: 'cg5', sender: 'agent', content: `✅ Checkout (Guest) configured:\n  Guest checkout: Enabled\n  Payment: Credit card only\n  Account upsell banner: Enabled\n  Order tracking email: Yes\n  Guest order cap: $1,000\n\n⚠️ Note: Guest checkout still needs final approval from Todd on the order cap amount. Marking as 78% complete.` },
    ],
  },
  {
    id: 'thread-qa-testing',
    domainId: 'qa-testing',
    title: 'QA Testing Data',
    messages: [
      { id: 'qa1', sender: 'agent', content: `Dave, I need test data for QA. Can you provide:\n\n• 3 test customer accounts (one retail, one on-account, one tax-exempt)\n• A WorldPay test card number\n• Test P21 credentials for the Play environment\n• A few product SKUs that have multiple UOMs` },
      { id: 'qa2', sender: 'customer', senderName: 'Dave', content: `Test customers:\n  Retail: WEBRETAIL01 / password [REDACTED]\n  On-account: REYNOLDS-TEST / password [REDACTED]\n  Tax-exempt: REYNOLDS-EXEMPT / password [REDACTED]\n\nWorldPay test card: 4111111111111111\nPlay environment uses the play URL.\n\nMulti-UOM SKUs: RS-TAPE-001, RS-FITTING-205, RS-HOSE-100` },
      { id: 'qa3', sender: 'agent', content: `✅ QA Testing Data captured:\n  3 test accounts configured\n  Payment test card: 4111...1111\n  Play environment: Accessible\n  Multi-UOM test SKUs: 3 identified\n\nI'll use these during the QA cycle. QA Testing complete!` },
    ],
  },
  {
    id: 'thread-warehouses',
    domainId: 'warehouses',
    title: 'Warehouse Locations',
    messages: [
      { id: 'wh1', sender: 'agent', content: `Dawn, I need your warehouse/branch locations for the store locator and inventory sourcing.\n\nFrom P21 I see one location — is South Barre your only active warehouse?` },
      { id: 'wh2', sender: 'customer', senderName: 'Dawn', content: `Yes, just South Barre now. We closed Colchester and Rutland last year.` },
      { id: 'wh3', sender: 'agent', content: `Got it. For the store locator page:\n\n  📍 Reynolds & Son — South Barre\n  47 Bridge Street, South Barre, VT 05670\n  Hours: Mon-Thu 7am-4pm, Fri 7am-3pm\n  Phone: (800) 639-2901\n  Manager: Dawn Sprague\n\nDoes that look right? Any holiday hours or seasonal changes?` },
      { id: 'wh4', sender: 'customer', senderName: 'Dawn', content: `That's correct. We close for major holidays but no seasonal changes. You can just note "Closed on major holidays."` },
      { id: 'wh5', sender: 'agent', content: `✅ Warehouses configured:\n  Active locations: 1 (South Barre, VT)\n  Store locator: Enabled with map pin\n  Hours + holiday note: Captured\n\nWarehouses complete!` },
    ],
  },
  {
    id: 'thread-social-media',
    domainId: 'social-media',
    title: 'Social Media Links',
    messages: [
      { id: 'so1', sender: 'agent', content: `Dawn, which social media profiles should we link in the site footer and header?\n\nCommon ones: Facebook, LinkedIn, Instagram, YouTube, X/Twitter` },
      { id: 'so2', sender: 'customer', senderName: 'Dawn', content: `We have Facebook and LinkedIn. That's it for now.\n\nFacebook: facebook.com/ReynoldsAndSonInc\nLinkedIn: linkedin.com/company/reynolds-and-son-inc` },
      { id: 'so3', sender: 'agent', content: `Should we also enable social sharing buttons on product pages? (Share to Facebook, email a friend, copy link)` },
      { id: 'so4', sender: 'customer', senderName: 'Dawn', content: `Just "Email a Friend" and "Copy Link" — no Facebook sharing on product pages.` },
      { id: 'so5', sender: 'agent', content: `✅ Social Media configured:\n  Footer links: Facebook, LinkedIn\n  Product sharing: Email + Copy Link\n  Social icons: Header + Footer\n\nSocial Media complete!` },
    ],
  },
  {
    id: 'thread-blog-chat',
    domainId: 'blog-chat',
    title: 'Blog & Live Chat',
    messages: [
      { id: 'bc1', sender: 'agent', content: `Dawn, two features to discuss:\n\n**Blog**: CX1 includes a built-in blog. Want to use it for product updates, industry news, or how-to content?\n\n**Live Chat**: Do you use a chat provider like Intercom, Drift, LiveChat, or Zendesk?` },
      { id: 'bc2', sender: 'customer', senderName: 'Dawn', content: `We'd like the blog but won't have content ready at launch. Can we enable it later? For chat — we don't use live chat and don't plan to right now.` },
      { id: 'bc3', sender: 'agent', content: `Absolutely — I'll configure the blog module but leave it hidden until you're ready. You can publish your first post from CIMM2 admin whenever.\n\n✅ Blog & Chat configured:\n  Blog: Configured but hidden (publish when ready)\n  Live Chat: Not enabled\n\nBlog & Chat complete!` },
    ],
  },
  {
    id: 'thread-data-content',
    domainId: 'data-content',
    title: 'Data & Content',
    messages: [
      { id: 'dc1', sender: 'agent', content: `Dawn, let's talk about your product content. Currently your catalog has ~45,000 SKUs from P21. For the CX1 site, we need:\n\n• **Product images**: Do you have images, or do you rely on manufacturer content?\n• **Descriptions**: Are your P21 descriptions web-ready, or do they need enrichment?\n• **Categories**: Will you use the P21 product hierarchy, or create a custom category tree?` },
      { id: 'dc2', sender: 'customer', senderName: 'Dawn', content: `We get images from our distributors — Orgill and AD provide product images. Our P21 descriptions are basic, definitely need enrichment. We want to use our own category structure, not P21's.` },
      { id: 'dc3', sender: 'agent', content: `Good — we can pull distributor images through the AD content feed. For descriptions, our AI enrichment engine can upgrade your basic P21 descriptions into full web content with features, specs, and SEO keywords.\n\nFor categories, I'll need you to provide your desired category tree. Want to start with your current web categories from reynoldsandson.com?` },
      { id: 'dc4', sender: 'customer', senderName: 'Dawn', content: `Yes, start with our current site categories and we'll refine from there.` },
      { id: 'dc5', sender: 'agent', content: `✅ Data & Content configured:\n  Images: Distributor feeds (Orgill, AD)\n  Descriptions: AI enrichment from P21 base\n  Categories: Custom tree (based on current site)\n  SKU count: ~45,000\n\nData & Content complete!` },
    ],
  },
  {
    id: 'thread-features',
    domainId: 'features',
    title: 'Site Features',
    messages: [
      { id: 'ft1', sender: 'agent', content: `Dawn, let's review the CX1 feature toggles. Which of these do you want enabled at launch?\n\n• **Search autocomplete** with product images\n• **Recently viewed** products bar\n• **Compare products** (side-by-side)\n• **Wishlists** / saved lists\n• **Bulk add to cart** from category pages\n• **Product recommendations** ("Customers also bought")` },
      { id: 'ft2', sender: 'customer', senderName: 'Dawn', content: `Yes to all of those! Search autocomplete is really important for our customers — they search by part number a lot.` },
      { id: 'ft3', sender: 'agent', content: `Search will support part number, description, manufacturer name, and CPN lookups. I'll configure it to show top 8 results with thumbnail images.\n\nOne more — do you want a **Request a Quote** button for items where you prefer to negotiate pricing?` },
      { id: 'ft4', sender: 'customer', senderName: 'Dawn', content: `Yes, we definitely need quote requests. Some of our big-ticket items need custom pricing.` },
      { id: 'ft5', sender: 'agent', content: `✅ Features configured:\n  Search autocomplete: ✓ (8 results + thumbnails)\n  Recently viewed: ✓\n  Compare products: ✓\n  Wishlists: ✓\n  Bulk add to cart: ✓\n  Recommendations: ✓\n  Request a Quote: ✓\n\nSite Features complete!` },
    ],
  },
  {
    id: 'thread-redirects',
    domainId: 'redirects',
    title: '301 Redirects',
    messages: [
      { id: 'rd1', sender: 'agent', content: `Dave, when we launch the new site, we need 301 redirects from your old URLs to the new ones. This preserves your Google rankings.\n\nDo you have a list of your current site's top URLs? I can also crawl reynoldsandson.com to generate the mapping automatically.` },
      { id: 'rd2', sender: 'customer', senderName: 'Dave', content: `Please crawl it. We have no idea what our URL structure looks like — the current site is pretty old.` },
      { id: 'rd3', sender: 'agent', content: `I've crawled reynoldsandson.com and found:\n  • 2,847 product pages\n  • 156 category pages\n  • 23 content/info pages\n  • 12 broken links (404s)\n\nI'll auto-generate the redirect map from old → new URLs. You'll get a spreadsheet to review before go-live.\n\nDo you have any vanity URLs or marketing links that need specific redirects? (e.g., reynoldsandson.com/specials)` },
      { id: 'rd4', sender: 'customer', senderName: 'Dave', content: `We have reynoldsandson.com/catalog that goes to our PDF catalog. Keep that working.` },
      { id: 'rd5', sender: 'agent', content: `✅ 301 Redirects configured:\n  Auto-generated map: 3,026 URLs\n  Vanity redirect: /catalog → PDF preserved\n  Broken links: 12 flagged for cleanup\n  Review spreadsheet: Will deliver before go-live\n\n301 Redirects complete!` },
    ],
  },
  {
    id: 'thread-termly',
    domainId: 'termly',
    title: 'Privacy & Compliance',
    messages: [
      { id: 'tm1', sender: 'agent', content: `Dawn, for legal compliance we need to set up:\n\n• **Privacy Policy** — required by law\n• **Terms of Use** — governs site usage\n• **Cookie Consent Banner** — GDPR/CCPA compliance\n\nDo you have existing legal documents, or should we set up Termly (our integrated compliance tool) to auto-generate them?` },
      { id: 'tm2', sender: 'customer', senderName: 'Dawn', content: `We don't have any of that on our current site. Let's use Termly to generate everything.` },
      { id: 'tm3', sender: 'agent', content: `I'll configure Termly with your company info:\n\n  Business: Reynolds and Son, Inc.\n  Address: 47 Bridge Street, South Barre, VT 05670\n  Contact: sales@reynoldsandson.com\n  Phone: (800) 639-2901\n\nThe cookie consent banner will appear on first visit. Style will match your brand colors (#CC0000 red accent).\n\n✅ Privacy & Compliance configured:\n  Privacy Policy: Auto-generated (Termly)\n  Terms of Use: Auto-generated (Termly)\n  Cookie Banner: Enabled (brand-matched)\n\nTermly complete!` },
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
      baseUrl: 'https://example-erp-api.example.com/',
      username: 'API_USER',
      storeName: 'Reynolds and Son, Inc.',
      dbName: 'example_db_live',
    },
    orderStatuses: ['BAL', 'COD', 'HOLD', 'NO LIMIT'],
    pricingContracts: true,
  },
  paymentGateway: {
    name: 'WorldPay',
    transactionType: 'AUTH',
    cards: ['Mastercard (10)', 'AMEX (9)', 'Visa (4)'],
    live: { accountId: 'XXXXXXX', acceptorId: 'XXXXXXXXXXXX' },
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
