// ── Interfaces ──────────────────────────────────────────────

export interface ProductCategory {
  id: string;
  name: string;
  parentId: string | null;
  depth: number;
  itemCount: number;
}

export interface ProductItem {
  partNumber: string;
  name: string;
  brand: string;
  manufacturer: string;
  categoryId: string;
  categoryPath: string;
  upc: string | null;
  description: string | null;
  shortDescription: string;
  imageCount: number;
  hasKeywords: boolean;
  hasSpecs: boolean;
  hasFAQ: boolean;
  hasBreadcrumb: boolean;
  hasWeight: boolean;
  hasOffers: boolean;
  hasUnitCodes: boolean;
  hasDigitalAssets: boolean;
  scoreBefore: number;
  scoreAfter: number;
  riskTier: 'LOW' | 'MEDIUM' | 'HIGH';
  enrichments: string[];
}

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface CatalogInfo {
  name: string;
  id: string;
  totalItems: number;
  source: string;
  lastSync: string;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  partNumber: string;
  type: 'ai' | 'validate' | 'publish' | 'import';
}

// ── Pipeline Stages ─────────────────────────────────────────

export const pipelineStages: PipelineStage[] = [
  { id: 'import', name: 'Import', description: 'Pull from PIM catalog', color: 'blue' },
  { id: 'enrich', name: 'Enrich', description: 'AI description & FAQ', color: 'amber' },
  { id: 'validate', name: 'Validate', description: 'Schema.org scoring', color: 'teal' },
  { id: 'publish', name: 'Publish', description: 'Push to workspace', color: 'rose' },
];

// ── Catalog Info ────────────────────────────────────────────

export const catalogInfo: CatalogInfo = {
  name: 'Reynolds & Son P21 Catalog',
  id: 'reynolds-p21-140036',
  totalItems: 24,
  source: 'Prophet 21 (Cloud) v24.2',
  lastSync: '2025-10-12T14:30:00Z',
};

// ── Taxonomy ────────────────────────────────────────────────

export const taxonomyCategories: ProductCategory[] = [
  // Root
  { id: 'root', name: 'Product Catalog', parentId: null, depth: 0, itemCount: 24 },

  // L1: Industrial Supplies
  { id: 'industrial', name: 'Industrial Supplies', parentId: 'root', depth: 1, itemCount: 10 },
  { id: 'safety', name: 'Safety Equipment', parentId: 'industrial', depth: 2, itemCount: 4 },
  { id: 'hard-hats', name: 'Hard Hats & Head Protection', parentId: 'safety', depth: 3, itemCount: 2 },
  { id: 'safety-glasses', name: 'Safety Glasses & Goggles', parentId: 'safety', depth: 3, itemCount: 1 },
  { id: 'hi-vis', name: 'High-Vis Apparel', parentId: 'safety', depth: 3, itemCount: 1 },
  { id: 'hand-tools', name: 'Hand Tools', parentId: 'industrial', depth: 2, itemCount: 3 },
  { id: 'wrenches', name: 'Wrenches & Sockets', parentId: 'hand-tools', depth: 3, itemCount: 2 },
  { id: 'screwdrivers', name: 'Screwdrivers & Drivers', parentId: 'hand-tools', depth: 3, itemCount: 1 },
  { id: 'cutting', name: 'Cutting Tools', parentId: 'industrial', depth: 2, itemCount: 2 },
  { id: 'saw-blades', name: 'Saw Blades', parentId: 'cutting', depth: 3, itemCount: 1 },
  { id: 'drill-bits', name: 'Drill Bits', parentId: 'cutting', depth: 3, itemCount: 1 },
  { id: 'abrasives', name: 'Abrasives', parentId: 'industrial', depth: 2, itemCount: 1 },

  // L1: Fire Service
  { id: 'fire', name: 'Fire Service', parentId: 'root', depth: 1, itemCount: 6 },
  { id: 'turnout', name: 'Turnout Gear', parentId: 'fire', depth: 2, itemCount: 3 },
  { id: 'helmets', name: 'Helmets', parentId: 'turnout', depth: 3, itemCount: 1 },
  { id: 'boots', name: 'Boots', parentId: 'turnout', depth: 3, itemCount: 1 },
  { id: 'coats', name: 'Coats & Pants', parentId: 'turnout', depth: 3, itemCount: 1 },
  { id: 'scba', name: 'SCBA Equipment', parentId: 'fire', depth: 2, itemCount: 1 },
  { id: 'hose', name: 'Fire Hose & Nozzles', parentId: 'fire', depth: 2, itemCount: 1 },
  { id: 'rescue', name: 'Rescue Tools', parentId: 'fire', depth: 2, itemCount: 1 },

  // L1: Compressed Air
  { id: 'air', name: 'Compressed Air', parentId: 'root', depth: 1, itemCount: 4 },
  { id: 'compressors', name: 'Air Compressors', parentId: 'air', depth: 2, itemCount: 1 },
  { id: 'air-treatment', name: 'Air Treatment', parentId: 'air', depth: 2, itemCount: 1 },
  { id: 'pneumatic', name: 'Pneumatic Tools', parentId: 'air', depth: 2, itemCount: 1 },
  { id: 'fittings', name: 'Fittings & Connectors', parentId: 'air', depth: 2, itemCount: 1 },

  // L1: Vending & VMI
  { id: 'vending', name: 'Vending & VMI', parentId: 'root', depth: 1, itemCount: 4 },
  { id: 'vend-machines', name: 'Vending Machines', parentId: 'vending', depth: 2, itemCount: 2 },
  { id: 'inventory-mgmt', name: 'Inventory Management', parentId: 'vending', depth: 2, itemCount: 2 },
];

// ── Products ────────────────────────────────────────────────

export const productItems: ProductItem[] = [
  // Industrial > Safety > Hard Hats
  {
    partNumber: 'RS-HH-001',
    name: 'Bullard UST Full-Brim Hard Hat',
    brand: 'Bullard',
    manufacturer: 'Bullard',
    categoryId: 'hard-hats',
    categoryPath: 'Industrial Supplies > Safety Equipment > Hard Hats',
    upc: '849160028319',
    description: 'OSHA-compliant Type I Class E full-brim hard hat with 6-point ratchet suspension and UV-resistant shell. Rated for 20kV electrical protection.',
    shortDescription: 'Full-brim hard hat with ratchet suspension',
    imageCount: 3,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: false,
    scoreBefore: 78,
    scoreAfter: 93,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (5 pairs)', 'UOM normalized'],
  },
  {
    partNumber: 'RS-HH-002',
    name: 'MSA V-Gard Cap Style Hard Hat',
    brand: 'MSA Safety',
    manufacturer: 'MSA Safety',
    categoryId: 'hard-hats',
    categoryPath: 'Industrial Supplies > Safety Equipment > Hard Hats',
    upc: '641817075612',
    description: null,
    shortDescription: 'V-Gard cap style hard hat',
    imageCount: 1,
    hasKeywords: false,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: false,
    hasWeight: true,
    hasOffers: false,
    hasUnitCodes: false,
    hasDigitalAssets: false,
    scoreBefore: 52,
    scoreAfter: 78,
    riskTier: 'HIGH',
    enrichments: ['Description generated from specs', 'FAQ generated (4 pairs)', 'UOM normalized'],
  },
  // Safety Glasses
  {
    partNumber: 'RS-SG-001',
    name: '3M SecureFit 400 Safety Glasses',
    brand: '3M',
    manufacturer: '3M',
    categoryId: 'safety-glasses',
    categoryPath: 'Industrial Supplies > Safety Equipment > Safety Glasses',
    upc: '078371662308',
    description: 'Pressure diffusion temple technology provides a comfortable secure fit. Anti-fog coating on polycarbonate lens meets ANSI Z87.1-2015.',
    shortDescription: 'Anti-fog safety glasses with SecureFit tech',
    imageCount: 2,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: false,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: true,
    scoreBefore: 75,
    scoreAfter: 91,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (6 pairs)'],
  },
  // Hi-Vis
  {
    partNumber: 'RS-HV-001',
    name: 'Ergodyne GloWear 8310HL Type R Class 2 Vest',
    brand: 'Ergodyne',
    manufacturer: 'Tenacious Holdings',
    categoryId: 'hi-vis',
    categoryPath: 'Industrial Supplies > Safety Equipment > High-Vis Apparel',
    upc: '720476251038',
    description: 'ANSI/ISEA 107-2015 Type R Class 2 hi-vis safety vest with hook-and-loop closure, 2-inch reflective tape, and mesh construction.',
    shortDescription: 'Class 2 hi-vis safety vest',
    imageCount: 2,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: false,
    scoreBefore: 80,
    scoreAfter: 95,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (5 pairs)'],
  },
  // Wrenches
  {
    partNumber: 'RS-WR-001',
    name: 'Snap-on FHCNF72G 3/4" Drive Ratchet',
    brand: 'Snap-on',
    manufacturer: 'Snap-on Inc.',
    categoryId: 'wrenches',
    categoryPath: 'Industrial Supplies > Hand Tools > Wrenches & Sockets',
    upc: null,
    description: '72-tooth ratchet mechanism with dual 80 flexhead. Sealed head design for contamination resistance. Chrome finish.',
    shortDescription: '3/4" drive sealed head ratchet',
    imageCount: 2,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: false,
    scoreBefore: 72,
    scoreAfter: 88,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (4 pairs)'],
  },
  {
    partNumber: 'RS-WR-002',
    name: 'Proto J1208T-500 Torque Wrench 3/8"',
    brand: 'Proto',
    manufacturer: 'Stanley Black & Decker',
    categoryId: 'wrenches',
    categoryPath: 'Industrial Supplies > Hand Tools > Wrenches & Sockets',
    upc: '662679083267',
    description: null,
    shortDescription: '3/8" drive torque wrench 10-50 ft-lb',
    imageCount: 1,
    hasKeywords: false,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: false,
    hasWeight: true,
    hasOffers: false,
    hasUnitCodes: false,
    hasDigitalAssets: false,
    scoreBefore: 48,
    scoreAfter: 74,
    riskTier: 'HIGH',
    enrichments: ['Description generated from specs', 'FAQ generated (3 pairs)', 'UOM normalized'],
  },
  // Screwdrivers
  {
    partNumber: 'RS-SD-001',
    name: 'Klein Tools 32500 Multi-Bit Screwdriver',
    brand: 'Klein Tools',
    manufacturer: 'Klein Tools Inc.',
    categoryId: 'screwdrivers',
    categoryPath: 'Industrial Supplies > Hand Tools > Screwdrivers & Drivers',
    upc: '092644325007',
    description: 'Cushion-grip 11-in-1 multi-bit screwdriver with 8 interchangeable bits stored in handle. Tip types include Phillips, slotted, square, and Torx.',
    shortDescription: '11-in-1 multi-bit screwdriver',
    imageCount: 3,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: true,
    scoreBefore: 82,
    scoreAfter: 95,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (5 pairs)'],
  },
  // Saw Blades
  {
    partNumber: 'RS-SB-001',
    name: 'LENOX METALMAX Diamond Cutoff Wheel 4.5"',
    brand: 'LENOX',
    manufacturer: 'Stanley Black & Decker',
    categoryId: 'saw-blades',
    categoryPath: 'Industrial Supplies > Cutting Tools > Saw Blades',
    upc: '082472209464',
    description: 'Diamond-edge cutoff wheel lasts 30X longer than thin abrasive wheels. Cuts metal, stainless, PVC, rebar, and more without disintegrating.',
    shortDescription: '4.5" diamond cutoff wheel',
    imageCount: 2,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: false,
    hasOffers: true,
    hasUnitCodes: false,
    hasDigitalAssets: false,
    scoreBefore: 68,
    scoreAfter: 85,
    riskTier: 'MEDIUM',
    enrichments: ['Description rewritten', 'FAQ generated (4 pairs)', 'UOM normalized'],
  },
  // Drill Bits
  {
    partNumber: 'RS-DB-001',
    name: 'Milwaukee SHOCKWAVE 35pc Impact Drill Bit Set',
    brand: 'Milwaukee',
    manufacturer: 'Milwaukee Tool',
    categoryId: 'drill-bits',
    categoryPath: 'Industrial Supplies > Cutting Tools > Drill Bits',
    upc: '045242478842',
    description: null,
    shortDescription: '35-piece impact-rated drill bit set',
    imageCount: 1,
    hasKeywords: false,
    hasSpecs: false,
    hasFAQ: false,
    hasBreadcrumb: false,
    hasWeight: false,
    hasOffers: false,
    hasUnitCodes: false,
    hasDigitalAssets: false,
    scoreBefore: 45,
    scoreAfter: 71,
    riskTier: 'HIGH',
    enrichments: ['Description generated from name', 'FAQ generated (3 pairs)', 'UOM normalized', 'Keywords extracted'],
  },
  // Abrasives
  {
    partNumber: 'RS-AB-001',
    name: 'Norton Blaze R980P Grinding Disc 4.5"x7/8"',
    brand: 'Norton',
    manufacturer: 'Saint-Gobain Abrasives',
    categoryId: 'abrasives',
    categoryPath: 'Industrial Supplies > Abrasives',
    upc: '662611240918',
    description: 'Ceramic alumina grain grinding disc with self-sharpening technology. 13,300 RPM max. OSHA and ANSI compliant.',
    shortDescription: '4.5" ceramic grinding disc',
    imageCount: 1,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: false,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: false,
    scoreBefore: 70,
    scoreAfter: 86,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (4 pairs)'],
  },
  // Fire Service > Turnout > Helmets
  {
    partNumber: 'RS-FH-001',
    name: 'Cairns 1044 Traditional Fire Helmet',
    brand: 'MSA Cairns',
    manufacturer: 'MSA Safety',
    categoryId: 'helmets',
    categoryPath: 'Fire Service > Turnout Gear > Helmets',
    upc: '641817015366',
    description: 'NFPA 1971-2018 certified traditional-style fire helmet with thermoplastic shell, adjustable headband, and bourke eye shields.',
    shortDescription: 'Traditional NFPA fire helmet',
    imageCount: 4,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: true,
    scoreBefore: 83,
    scoreAfter: 96,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (6 pairs)'],
  },
  // Boots
  {
    partNumber: 'RS-FB-001',
    name: 'Globe Supreme 14" Structural Fire Boot',
    brand: 'Globe',
    manufacturer: 'MSA Safety',
    categoryId: 'boots',
    categoryPath: 'Fire Service > Turnout Gear > Boots',
    upc: null,
    description: 'NFPA 1971 certified pull-on structural firefighting boot with Crosstech moisture barrier. Oil, chemical, and puncture resistant.',
    shortDescription: '14" structural fire boot',
    imageCount: 2,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: false,
    scoreBefore: 73,
    scoreAfter: 89,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (5 pairs)'],
  },
  // Coats & Pants
  {
    partNumber: 'RS-TC-001',
    name: 'Lion Janesville V-Force Turnout Coat',
    brand: 'Lion',
    manufacturer: 'Lion Group',
    categoryId: 'coats',
    categoryPath: 'Fire Service > Turnout Gear > Coats & Pants',
    upc: null,
    description: null,
    shortDescription: 'V-Force structural turnout coat',
    imageCount: 2,
    hasKeywords: false,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: false,
    hasWeight: false,
    hasOffers: false,
    hasUnitCodes: false,
    hasDigitalAssets: false,
    scoreBefore: 47,
    scoreAfter: 75,
    riskTier: 'HIGH',
    enrichments: ['Description generated from specs', 'FAQ generated (4 pairs)', 'UOM normalized', 'Keywords extracted'],
  },
  // SCBA
  {
    partNumber: 'RS-SC-001',
    name: 'Scott Air-Pak X3 Pro SCBA',
    brand: 'Scott Safety',
    manufacturer: '3M / Scott Safety',
    categoryId: 'scba',
    categoryPath: 'Fire Service > SCBA Equipment',
    upc: '804138501270',
    description: 'NFPA 1981-2019 edition SCBA with integrated PASS. E-Z Flo C5 regulator, AV-3000 HT facepiece, 45-minute carbon fiber cylinder.',
    shortDescription: 'NFPA self-contained breathing apparatus',
    imageCount: 3,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: true,
    scoreBefore: 81,
    scoreAfter: 94,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (6 pairs)'],
  },
  // Hose
  {
    partNumber: 'RS-FN-001',
    name: 'Elkhart Brass SM-20FG Fog Nozzle',
    brand: 'Elkhart Brass',
    manufacturer: 'Elkhart Brass Mfg.',
    categoryId: 'hose',
    categoryPath: 'Fire Service > Fire Hose & Nozzles',
    upc: null,
    description: 'Select-O-Matic fog nozzle, 60-200 GPM adjustable, 1.5" NH thread. Flush without shutting down. Chrome-plated brass construction.',
    shortDescription: '1.5" adjustable fog nozzle 60-200 GPM',
    imageCount: 1,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: false,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: false,
    hasDigitalAssets: false,
    scoreBefore: 68,
    scoreAfter: 84,
    riskTier: 'MEDIUM',
    enrichments: ['Description rewritten', 'FAQ generated (4 pairs)', 'UOM normalized'],
  },
  // Rescue
  {
    partNumber: 'RS-RT-001',
    name: 'Holmatro SP 4240 CL Spreader',
    brand: 'Holmatro',
    manufacturer: 'Holmatro Rescue Equipment',
    categoryId: 'rescue',
    categoryPath: 'Fire Service > Rescue Tools',
    upc: null,
    description: 'Battery-operated rescue spreader with 292 kN spreading force. Compact design at 15.7 kg. Pentheon battery system compatible.',
    shortDescription: 'Battery-powered rescue spreader',
    imageCount: 2,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: false,
    hasUnitCodes: true,
    hasDigitalAssets: false,
    scoreBefore: 72,
    scoreAfter: 87,
    riskTier: 'MEDIUM',
    enrichments: ['Description rewritten', 'FAQ generated (5 pairs)'],
  },
  // Compressed Air > Compressors
  {
    partNumber: 'RS-AC-001',
    name: 'Ingersoll Rand 2475N7.5-P Two-Stage Compressor',
    brand: 'Ingersoll Rand',
    manufacturer: 'Ingersoll Rand',
    categoryId: 'compressors',
    categoryPath: 'Compressed Air > Air Compressors',
    upc: '663023508184',
    description: '7.5 HP two-stage reciprocating air compressor with 80-gallon vertical tank. 175 PSI max, 24 CFM at 90 PSI. Cast iron construction.',
    shortDescription: '7.5 HP 80-gal two-stage air compressor',
    imageCount: 2,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: false,
    scoreBefore: 80,
    scoreAfter: 93,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (5 pairs)'],
  },
  // Air Treatment
  {
    partNumber: 'RS-AT-001',
    name: 'Parker Balston 75-60 Compressed Air Dryer',
    brand: 'Parker Balston',
    manufacturer: 'Parker Hannifin',
    categoryId: 'air-treatment',
    categoryPath: 'Compressed Air > Air Treatment',
    upc: null,
    description: 'Regenerative desiccant air dryer for -40°F dewpoint. 60 SCFM capacity. Includes pre-filter and auto drain.',
    shortDescription: 'Regenerative desiccant air dryer 60 SCFM',
    imageCount: 1,
    hasKeywords: false,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: false,
    hasWeight: true,
    hasOffers: false,
    hasUnitCodes: false,
    hasDigitalAssets: false,
    scoreBefore: 55,
    scoreAfter: 79,
    riskTier: 'MEDIUM',
    enrichments: ['Description rewritten', 'FAQ generated (3 pairs)', 'UOM normalized', 'Keywords extracted'],
  },
  // Pneumatic Tools
  {
    partNumber: 'RS-PT-001',
    name: 'Chicago Pneumatic CP7748 1/2" Impact Wrench',
    brand: 'Chicago Pneumatic',
    manufacturer: 'Atlas Copco',
    categoryId: 'pneumatic',
    categoryPath: 'Compressed Air > Pneumatic Tools',
    upc: '015451770485',
    description: 'Composite 1/2" impact wrench delivering 922 ft-lb max torque. S2S power management for speed and power control. 2.5 lb lightweight.',
    shortDescription: '1/2" composite air impact wrench',
    imageCount: 2,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: false,
    scoreBefore: 77,
    scoreAfter: 91,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (4 pairs)'],
  },
  // Fittings
  {
    partNumber: 'RS-FC-001',
    name: 'Parker 26 Series Quick Coupler Set 1/4" NPT',
    brand: 'Parker',
    manufacturer: 'Parker Hannifin',
    categoryId: 'fittings',
    categoryPath: 'Compressed Air > Fittings & Connectors',
    upc: '074706260017',
    description: null,
    shortDescription: '1/4" NPT industrial quick coupler set',
    imageCount: 1,
    hasKeywords: false,
    hasSpecs: false,
    hasFAQ: false,
    hasBreadcrumb: false,
    hasWeight: false,
    hasOffers: true,
    hasUnitCodes: false,
    hasDigitalAssets: false,
    scoreBefore: 46,
    scoreAfter: 72,
    riskTier: 'HIGH',
    enrichments: ['Description generated from name', 'FAQ generated (3 pairs)', 'UOM normalized', 'Keywords extracted'],
  },
  // Vending & VMI > Vending Machines
  {
    partNumber: 'RS-VM-001',
    name: 'AutoCrib RoboCrib VX1000 Industrial Vending',
    brand: 'AutoCrib',
    manufacturer: 'AutoCrib Inc.',
    categoryId: 'vend-machines',
    categoryPath: 'Vending & VMI > Vending Machines',
    upc: null,
    description: 'Coil-based industrial vending machine with 1,000+ item capacity. Real-time inventory tracking with cloud dashboard. RFID/badge access control.',
    shortDescription: 'Industrial coil vending machine 1000+ items',
    imageCount: 3,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: false,
    hasOffers: false,
    hasUnitCodes: false,
    hasDigitalAssets: true,
    scoreBefore: 67,
    scoreAfter: 83,
    riskTier: 'MEDIUM',
    enrichments: ['Description rewritten', 'FAQ generated (5 pairs)', 'UOM normalized'],
  },
  {
    partNumber: 'RS-VM-002',
    name: 'CribMaster AccuPort Locker System',
    brand: 'CribMaster',
    manufacturer: 'Stanley Black & Decker',
    categoryId: 'vend-machines',
    categoryPath: 'Vending & VMI > Vending Machines',
    upc: null,
    description: 'Electronic locker-based dispensing system for high-value PPE and tools. Configurable compartments from 2" to 24" height.',
    shortDescription: 'Electronic locker dispensing system',
    imageCount: 2,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: false,
    hasWeight: false,
    hasOffers: false,
    hasUnitCodes: false,
    hasDigitalAssets: false,
    scoreBefore: 58,
    scoreAfter: 80,
    riskTier: 'MEDIUM',
    enrichments: ['Description rewritten', 'FAQ generated (4 pairs)', 'UOM normalized'],
  },
  // Inventory Management
  {
    partNumber: 'RS-IM-001',
    name: 'MSC ControlPoint VMI Software License',
    brand: 'MSC Industrial',
    manufacturer: 'MSC Industrial Direct',
    categoryId: 'inventory-mgmt',
    categoryPath: 'Vending & VMI > Inventory Management',
    upc: null,
    description: null,
    shortDescription: 'VMI software with min/max auto-replenishment',
    imageCount: 0,
    hasKeywords: false,
    hasSpecs: false,
    hasFAQ: false,
    hasBreadcrumb: false,
    hasWeight: false,
    hasOffers: true,
    hasUnitCodes: false,
    hasDigitalAssets: false,
    scoreBefore: 38,
    scoreAfter: 65,
    riskTier: 'HIGH',
    enrichments: ['Description generated from name', 'FAQ generated (3 pairs)', 'Keywords extracted'],
  },
  {
    partNumber: 'RS-IM-002',
    name: 'Fastenal Managed Inventory FAST 5000 Scanner',
    brand: 'Fastenal',
    manufacturer: 'Fastenal Company',
    categoryId: 'inventory-mgmt',
    categoryPath: 'Vending & VMI > Inventory Management',
    upc: '687438215902',
    description: 'Handheld barcode scanner for bin-level inventory tracking. Bluetooth 5.0, 12-hour battery. Syncs with Fastenal managed inventory portal.',
    shortDescription: 'Bluetooth inventory scanning device',
    imageCount: 2,
    hasKeywords: true,
    hasSpecs: true,
    hasFAQ: false,
    hasBreadcrumb: true,
    hasWeight: true,
    hasOffers: true,
    hasUnitCodes: true,
    hasDigitalAssets: false,
    scoreBefore: 79,
    scoreAfter: 92,
    riskTier: 'LOW',
    enrichments: ['Description rewritten', 'FAQ generated (5 pairs)'],
  },
];

// ── Terminal Lines (pre-scripted simulation output) ─────────

export function generateTerminalLines(items: ProductItem[]): string[] {
  const lines: string[] = [
    '🔌 HyperScaleAWC PIM Agent v1.0',
    '',
    `  Connecting to PIM catalog: ${catalogInfo.id}...`,
    `  → GET /catalogs/${catalogInfo.id}/items?limit=24`,
    `  → 200 OK — ${items.length} items retrieved`,
    `  → Taxonomy loaded: 4 top-level, ${taxonomyCategories.filter(c => c.depth >= 2).length} leaf categories`,
    '',
    '─────────────────────────────────────',
    `▶ Phase 1: Import (${items.length} items)`,
  ];

  // Import lines
  for (const item of items) {
    lines.push(`  → Importing: ${item.name} (${item.partNumber})...`);
    lines.push(`    Brand: ${item.brand} | Category: ${item.categoryPath.split(' > ').pop()}`);
    lines.push(`    ${item.imageCount} image(s), ${item.upc ? 'UPC: ' + item.upc : 'No UPC'}`);
    lines.push(`  ✅ Imported ${item.partNumber}`);
  }

  lines.push('');
  lines.push('─────────────────────────────────────');
  lines.push(`▶ Phase 2: AI Enrichment (${items.length} items)`);

  // Enrich lines
  for (const item of items) {
    lines.push(`  → Enriching ${item.partNumber}: ${item.enrichments[0]}...`);
    if (item.enrichments.length > 1) {
      lines.push(`    AI: ${item.enrichments[1]}`);
    }
    if (item.enrichments.length > 2) {
      lines.push(`    AI: ${item.enrichments[2]}`);
    }
    lines.push(`  ✅ Enriched ${item.partNumber} (${item.enrichments.length} actions)`);
  }

  lines.push('');
  lines.push('─────────────────────────────────────');
  lines.push(`▶ Phase 3: Schema.org Validation (${items.length} items)`);

  // Validate lines
  for (const item of items) {
    const req = Math.round(item.scoreAfter * 0.5);
    const rec = Math.round(item.scoreAfter * 0.3);
    const enh = item.scoreAfter - req - rec;
    lines.push(`  → Scoring ${item.partNumber}...`);
    lines.push(`    Required: ${req}/50 | Recommended: ${rec}/30 | Enhanced: ${enh}/20`);
    lines.push(`    Score: ${item.scoreAfter}/100 — Risk: ${item.riskTier} ${item.riskTier === 'LOW' ? '✅' : item.riskTier === 'MEDIUM' ? '⚠️' : '🔴'}`);
  }

  lines.push('');
  lines.push('─────────────────────────────────────');
  lines.push(`▶ Phase 4: Publish to Workspace (${items.length} items)`);

  // Publish lines
  for (const item of items) {
    lines.push(`  → Publishing ${item.partNumber}...`);
    lines.push(`    JSON-LD generated (${(1.2 + Math.random() * 1.8).toFixed(1)} KB)`);
    lines.push(`  ✅ Published ${item.partNumber}`);
  }

  const avgScore = Math.round(items.reduce((sum, i) => sum + i.scoreAfter, 0) / items.length);
  lines.push('');
  lines.push('═════════════════════════════════════');
  lines.push(`✅ Pipeline Complete — ${items.length}/${items.length} items published`);
  lines.push(`   Avg Compliance Score: ${avgScore}/100`);
  lines.push(`   HIGH risk: ${items.filter(i => i.riskTier === 'HIGH').length} | MEDIUM: ${items.filter(i => i.riskTier === 'MEDIUM').length} | LOW: ${items.filter(i => i.riskTier === 'LOW').length}`);
  lines.push(`   AI enrichments: ${items.reduce((s, i) => s + i.enrichments.length, 0)} total actions`);
  lines.push(`   Time saved: ~12 hours manual data entry`);

  return lines;
}
