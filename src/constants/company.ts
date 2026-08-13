export const COMPANY_INFO = {
  name: "Sri Parshwa Cards",
  shortName: "Parshwa Cards",
  brandName: "ELITE ATELIER",
  subBrand: "Atelier Éternel",
  tagline: "Invitations as Memorable as Your Day",
  subTagline: "Crafting timeless narratives through exquisite stationery design. Your story, impeccably told.",
  heroDescription: "A curated collection of wedding cards — traditional, modern and luxurious — crafted to make the perfect first impression.",
  announcement: "3000+ DESIGNS FROM ₹7 • CUSTOM PRINTING & GOLD FOILING • PAN-INDIA & WORLDWIDE DELIVERY",
  copyright: "© 2026 ELITE ATELIER • SRI PARSHWA CARDS. CRAFTED WITH ARTISTRY.",

  contact: {
    phonePrimary: "+91 98765 43210",
    phoneSecondary: "+91 80 2345 6789",
    whatsappNumber: "919876543210",
    whatsappUrl: "https://wa.me/919876543210?text=Hello%20Sri%20Parshwa%20Cards%2C%20I%20would%20like%20to%20enquire%20about%20wedding%20invitations.",
    email: "contact@sriparshwacards.com",
    address: "Sri Parshwa Cards, Commercial Street Area, Bangalore, Karnataka - 560001, India",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    country: "India",
    studioHours: "Monday – Saturday: 10:00 AM – 8:00 PM IST",
  },

  social: {
    whatsapp: "https://wa.me/919876543210",
    instagram: "https://instagram.com/sriparshwacards",
    facebook: "https://facebook.com/sriparshwacards",
    share: "https://sriparshwacards.com",
  },

  stats: [
    { value: "3,000+", label: "Unique Designs" },
    { value: "15+", label: "Years of Craft" },
    { value: "50k+", label: "Happy Couples" },
    { value: "Global", label: "Worldwide Shipping" },
  ],

  navLinks: [
    { to: "/", label: "Home" },
    { to: "/collections", label: "Wedding Invitations" },
    { to: "/occasions", label: "By Occasion" },
    { to: "/custom", label: "Custom Invitations" },
    { to: "/contact", label: "Contact Us" },
  ],

  footerCollections: [
    { to: "/collections#hindu", label: "Hindu Weddings" },
    { to: "/collections#muslim", label: "Muslim Weddings" },
    { to: "/collections#christian", label: "Christian Weddings" },
    { to: "/collections#sikh", label: "Sikh Weddings" },
    { to: "/collections#secular", label: "Secular & Modern" },
  ],

  footerCompany: [
    { to: "/about", label: "The Story" },
    { to: "/process", label: "Our Process" },
    { to: "/craftsmanship", label: "Materials & Craft" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact Us" },
  ],

  footerPricingTiers: [
    { to: "/pricing#budget", label: "Budget" },
    { to: "/pricing#economy", label: "Economy" },
    { to: "/pricing#standard", label: "Standard" },
    { to: "/pricing#premium", label: "Premium" },
    { to: "/pricing#luxury", label: "Luxury" },
    { to: "/pricing#exclusive", label: "Exclusive" },
  ],

  processSteps: [
    {
      num: "01",
      title: "Consultation",
      description: "Discuss your vision, themes, and preferences with our expert design consultants.",
    },
    {
      num: "02",
      title: "Design & Proofing",
      description: "Review custom digital proofs, refining details until the design is absolutely perfect.",
    },
    {
      num: "03",
      title: "Craft & Deliver",
      description: "Master artisans bring your design to life, delivered securely to your doorstep.",
    },
  ],
} as const;
