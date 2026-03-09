export interface IntakeDomain {
  id: string;
  name: string;
  progress: number;
  status: 'complete' | 'in-progress' | 'not-started';
  fieldCount: number;
}

export const intakeDomains: IntakeDomain[] = [
  { id: 'contacts', name: 'CONTACTS', progress: 100, status: 'complete', fieldCount: 15 },
  { id: 'contract-scope', name: 'CONTRACT SCOPE', progress: 100, status: 'complete', fieldCount: 12 },
  { id: 'add-on-products', name: 'ADD-ON PRODUCTS', progress: 100, status: 'complete', fieldCount: 8 },
  { id: 'whitelisting', name: 'WHITELISTING', progress: 100, status: 'complete', fieldCount: 10 },
  { id: 'recaptcha-maps', name: 'RECAPTCHA & MAPS', progress: 100, status: 'complete', fieldCount: 6 },
  { id: 'smtp', name: 'SMTP EMAIL RELAY', progress: 100, status: 'complete', fieldCount: 8 },
  { id: 'ssl', name: 'SSL CERTIFICATE', progress: 100, status: 'complete', fieldCount: 10 },
  { id: 'erp-connection', name: 'ERP CONNECTION', progress: 100, status: 'complete', fieldCount: 18 },
  { id: 'erp-integration', name: 'ERP INTEGRATION', progress: 100, status: 'complete', fieldCount: 14 },
  { id: 'api-endpoints', name: 'API ENDPOINTS', progress: 100, status: 'complete', fieldCount: 12 },
  { id: 'payment-gateway', name: 'PAYMENT GATEWAY', progress: 100, status: 'complete', fieldCount: 16 },
  { id: 'tax', name: 'TAX', progress: 100, status: 'complete', fieldCount: 8 },
  { id: 'shipping', name: 'SHIPPING', progress: 100, status: 'complete', fieldCount: 22 },
  { id: 'registration', name: 'REGISTRATION', progress: 100, status: 'complete', fieldCount: 18 },
  { id: 'items-uom', name: 'ITEMS & UOM', progress: 100, status: 'complete', fieldCount: 10 },
  { id: 'pricing', name: 'PRICING', progress: 100, status: 'complete', fieldCount: 14 },
  { id: 'availability', name: 'AVAILABILITY', progress: 100, status: 'complete', fieldCount: 8 },
  { id: 'my-account', name: 'MY ACCOUNT', progress: 100, status: 'complete', fieldCount: 12 },
  { id: 'checkout-logged', name: 'CHECKOUT (LOGGED)', progress: 100, status: 'complete', fieldCount: 20 },
  { id: 'checkout-guest', name: 'CHECKOUT (GUEST)', progress: 78, status: 'in-progress', fieldCount: 18 },
  { id: 'qa-testing', name: 'QA TESTING DATA', progress: 100, status: 'complete', fieldCount: 10 },
  { id: 'warehouses', name: 'WAREHOUSES', progress: 100, status: 'complete', fieldCount: 12 },
  { id: 'social-media', name: 'SOCIAL MEDIA', progress: 100, status: 'complete', fieldCount: 8 },
  { id: 'blog-chat', name: 'BLOG & CHAT', progress: 100, status: 'complete', fieldCount: 10 },
  { id: 'data-content', name: 'DATA CONTENT', progress: 100, status: 'complete', fieldCount: 14 },
  { id: 'design', name: 'DESIGN', progress: 100, status: 'complete', fieldCount: 24 },
  { id: 'features', name: 'FEATURES', progress: 100, status: 'complete', fieldCount: 16 },
  { id: 'redirects', name: '301 REDIRECTS', progress: 100, status: 'complete', fieldCount: 19 },
  { id: 'termly', name: 'TERMLY', progress: 100, status: 'complete', fieldCount: 6 },
];

export const overallProgress = {
  percentage: 94,
  domainsComplete: 28,
  domainsTotal: 29,
  fieldsCollected: 356,
  fieldsTotal: 378,
};
