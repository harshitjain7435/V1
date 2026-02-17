/**
 * Next.js Environment Configuration
 * Provides runtime environment variables
 */

export const siteConfig = {
  // Site Metadata
  name: "FlexiSpace",
  description:
    "Connect with flexible warehousing solutions or monetize your warehouse space",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // Contact Information
  contact: {
    email: "hello@flexispace.com",
    phone: "+1 (234) 567-890",
    hours: "Mon-Fri 9AM-6PM EST",
  },

  // Company Information
  company: {
    name: "FlexiSpace",
    address: "123 Business Street, Commerce City, CC 12345",
  },

  // Social Links (optional)
  social: {
    // linkedin: "https://linkedin.com/company/warehouse-marketplace",
    // twitter: "https://twitter.com/warehousemarketplace",
  },

  // Navigation
  navigation: [
    { label: "Home", href: "/" },
    { label: "Submit Enquiry", href: "/enquiry" },
  ],

  // Footer Links
  footerLinks: {
    company: [
      { label: "Home", href: "/" },
      { label: "Submit Enquiry", href: "/enquiry" },
    ],
    customers: [
      { label: "Find Warehouse Space", href: "#" },
      { label: "Compare Facilities", href: "#" },
      { label: "Get Quotes", href: "#" },
    ],
    owners: [
      { label: "List Your Space", href: "#" },
      { label: "Manage Listings", href: "#" },
      { label: "Receive Inquiries", href: "#" },
    ],
  },

  // Features
  features: [
    {
      icon: "🔍",
      title: "Verified Listings",
      description:
        "All warehouse spaces are verified and inspected for quality and safety standards.",
    },
    {
      icon: "💰",
      title: "Competitive Pricing",
      description:
        "Get the best rates directly from warehouse owners without intermediaries.",
    },
    {
      icon: "⚡",
      title: "Quick Deployment",
      description:
        "From inquiry to contract in days. Fast-track your warehouse solution.",
    },
  ],

  // Stats
  stats: [
    { value: "500+", label: "Warehouse Spaces" },
    { value: "1000+", label: "Happy Customers" },
    { value: "50M+", label: "Sq Ft Capacity" },
  ],

  // SEO
  seo: {
    ogImage: "https://warehousemarketplace.com/og-image.jpg",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    keywords: [
      "warehouse",
      "warehousing",
      "storage",
      "logistics",
      "warehouse rental",
      "warehouse space",
    ],
  },

  // API
  api: {
    timeout: 30000, // 30 seconds
    retries: 3,
  },
};

export default siteConfig;
