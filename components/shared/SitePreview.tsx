'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Search, User, HelpCircle, ChevronRight, Phone, Mail, MapPin, Facebook, Linkedin, Twitter, Youtube, ExternalLink } from 'lucide-react';

interface SitePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SitePreview({ isOpen, onClose }: SitePreviewProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-hs-border shadow-2xl"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2a] border-b border-hs-border">
              <div className="flex gap-1.5">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-hs-rose/60 hover:bg-hs-rose transition-colors" />
                <div className="w-3 h-3 rounded-full bg-hs-amber/60" />
                <div className="w-3 h-3 rounded-full bg-hs-teal/60" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-1 bg-hs-surface rounded-lg text-xs font-mono text-hs-muted max-w-md w-full">
                  <div className="w-3 h-3 rounded-full bg-hs-teal/40" />
                  <span>https://190487rey-beta.cimm2.com/</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-hs-teal px-2 py-0.5 bg-hs-teal/10 rounded border border-hs-teal/20">BETA</span>
                <ExternalLink className="w-3.5 h-3.5 text-hs-muted" />
              </div>
            </div>

            {/* Site content */}
            <div className="flex-1 overflow-auto bg-white">
              {/* Top utility bar */}
              <div className="flex items-center justify-end px-6 py-1.5 bg-[#f5f5f5] border-b border-gray-200">
                <div className="flex items-center gap-1 text-[11px] text-[#333F48]">
                  <Phone className="w-3 h-3" />
                  <span>Contact <span className="font-semibold">800-639-2901</span></span>
                </div>
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#333F48]">Reynolds</span>
                  <span className="text-xl text-[#333F48]">&amp;</span>
                  <span className="text-xl font-bold text-[#333F48]">Son</span>
                  <div className="ml-1">
                    <p className="text-[8px] text-[#333F48] leading-tight">SUPPLIES.</p>
                    <p className="text-[8px] text-[#333F48] leading-tight">SUPPORT.</p>
                    <p className="text-[8px] text-[#F1B434] font-bold leading-tight">SOLUTIONS.</p>
                  </div>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-md mx-8">
                  <div className="flex items-center border border-gray-300 rounded">
                    <input
                      type="text"
                      placeholder="Enter Keyword or Part Number"
                      className="flex-1 px-3 py-2 text-sm text-gray-600 bg-transparent outline-none"
                      readOnly
                    />
                    <button className="px-3 py-2 bg-[#F1B434] text-white">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  {[
                    { icon: User, label: 'Sign In' },
                    { icon: ShoppingCart, label: 'Cart' },
                    { icon: HelpCircle, label: 'Help' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-0.5">
                      <div className="w-10 h-10 bg-[#F1B434] rounded flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#333F48]" />
                      </div>
                      <span className="text-[8px] text-[#333F48]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main nav */}
              <div className="flex items-center gap-0 px-6 bg-[#333F48]">
                {['SHOP PRODUCTS', 'BRANDS', 'MANUFACTURERS', 'ABOUT US', 'SERVICES'].map((item) => (
                  <button key={item} className="flex items-center gap-1 px-4 py-3 text-white text-xs font-semibold hover:bg-white/10 transition-colors">
                    {item}
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>

              {/* Hero banner */}
              <div className="relative h-64 bg-gradient-to-r from-[#1a1a2e] via-[#333F48] to-[#4a4a5e] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(241,180,52,0.3), transparent 60%)' }} />
                <div className="text-center z-10">
                  <p className="text-[#F1B434] text-sm font-semibold tracking-widest mb-2">REYNOLDS &amp; SON</p>
                  <h2 className="text-5xl font-bold text-white tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>TURNOUT GEAR</h2>
                  <p className="text-white/60 text-sm mt-2 mb-4">Professional Fire Service Equipment &amp; Industrial Supply</p>
                  <button className="px-6 py-2 border-2 border-[#F1B434] text-[#F1B434] text-xs font-bold tracking-wider hover:bg-[#F1B434] hover:text-[#333F48] transition-colors">
                    LEARN MORE
                  </button>
                </div>
                {/* Slide dots */}
                <div className="absolute bottom-4 flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F1B434]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                </div>
              </div>

              {/* Registration CTA */}
              <div className="flex items-center justify-center gap-3 py-4 bg-white border-b border-gray-200">
                <span className="text-sm font-bold text-[#F1B434]">NOT REGISTERED WITH REYNOLDS?</span>
                <span className="text-sm font-bold text-[#333F48]">SIGN UP FOR CUSTOM PRICING</span>
                <ChevronRight className="w-4 h-4 text-[#F1B434]" />
              </div>

              {/* Tagline banner */}
              <div className="py-8 bg-[#333F48] text-center">
                <h3 className="text-3xl font-bold">
                  <span className="text-white">SUPPLIES. SUPPORT. </span>
                  <span className="text-[#F1B434]">SOLUTIONS.</span>
                </h3>
              </div>

              {/* Our Services */}
              <div className="py-8 px-6 bg-white">
                <h3 className="text-2xl font-bold text-center mb-6">
                  <span className="text-[#333F48]">Our </span>
                  <span className="text-[#F1B434]">Services</span>
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { name: 'Industrial', desc: 'Industrial supply solutions for manufacturing & facilities' },
                    { name: 'Vending & VMI', desc: 'Vendor managed inventory & smart vending solutions' },
                    { name: 'Fire Service', desc: 'Professional fire service equipment & gear' },
                    { name: 'Compressed Air', desc: 'Air system specialists & compressor services' },
                  ].map((service) => (
                    <div key={service.name} className="group relative h-40 bg-gradient-to-br from-[#333F48] to-[#4a5568] rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:shadow-lg transition-shadow">
                      <h4 className="text-white font-bold text-sm mb-1">{service.name}</h4>
                      <p className="text-white/60 text-[10px] mb-3">{service.desc}</p>
                      <button className="px-4 py-1.5 border border-[#F1B434] text-[#F1B434] text-[10px] font-bold tracking-wider group-hover:bg-[#F1B434] group-hover:text-[#333F48] transition-colors">
                        LEARN MORE
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#333F48] px-6 py-8">
                <div className="grid grid-cols-4 gap-6 text-xs text-white/70">
                  <div>
                    <h4 className="font-bold text-white mb-3">Helpful Links</h4>
                    {['Sign In', 'Register', 'My Account', 'Shopping Cart', 'FAQ', 'Request a Quote'].map(link => (
                      <p key={link} className="mb-1.5 hover:text-[#F1B434] cursor-pointer">{link}</p>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-3">Legal</h4>
                    {['Privacy Policy', 'Terms and Use', 'Cookie Policy', 'Return Policy'].map(link => (
                      <p key={link} className="mb-1.5 hover:text-[#F1B434] cursor-pointer">{link}</p>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-3">Contact Us</h4>
                    <p className="font-semibold text-white mb-1">Reynolds and Son</p>
                    <div className="flex items-start gap-1 mb-1">
                      <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                      <span>47 Bridge Street, PO Box 380<br />South Barre, VT 05670</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <Phone className="w-3 h-3 shrink-0" />
                      <span>800-639-2901</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 shrink-0" />
                      <span>sales@reynoldsandson.com</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-3">Stay Connected</h4>
                    <p className="mb-3">Sign up for offers &amp; latest news</p>
                    <div className="flex gap-2">
                      {[Facebook, Linkedin, Twitter, Youtube].map((Icon, i) => (
                        <div key={i} className="w-7 h-7 rounded bg-white/10 flex items-center justify-center hover:bg-[#F1B434]/30 cursor-pointer transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-white/40 text-center">
                  Copyright 2025 Reynolds and Son. All Rights Reserved. B2B eCommerce platform powered by Unilog.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
