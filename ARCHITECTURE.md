# Warehouse Marketplace - Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   Next.js Frontend                        │   │
│  │                                                            │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │   │
│  │  │   Landing   │  │   Enquiry   │  │   Components    │   │   │
│  │  │    Page     │  │    Page     │  │   (UI/Layout)   │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │   │
│  │         ▲               ▲                     ▲             │   │
│  │         │               │                     │             │   │
│  │         └───────────────┼─────────────────────┘             │   │
│  │                         │                                   │   │
│  │           ┌─────────────▼─────────────┐                   │   │
│  │           │   Form Submission (API)   │                   │   │
│  │           └─────────────┬─────────────┘                   │   │
│  └──────────────────────────┼──────────────────────────────────┘   │
│                             │                                       │
│  ───────────────────────────┼───────────────────────────────────    │
│                             │ HTTP Request                          │
│  ───────────────────────────▼───────────────────────────────────    │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                   Next.js Backend                          │   │
│  │                                                             │   │
│  │  ┌──────────────────────────────────────────────────────┐  │   │
│  │  │              API Route: /api/enquiry               │  │   │
│  │  │                                                      │  │   │
│  │  │  POST /api/enquiry                                 │  │   │
│  │  │   ├─ Receive JSON payload                          │  │   │
│  │  │   ├─ Validate data (types + business rules)       │  │   │
│  │  │   ├─ Generate unique ID                           │  │   │
│  │  │   └─ Save to JSON file (data/enquiries.json)      │  │   │
│  │  │                                                      │  │   │
│  │  │  GET /api/enquiry                                 │  │   │
│  │  │   └─ Retrieve all enquiries (admin)              │  │   │
│  │  └──────────────────────────────────────────────────────┘  │   │
│  │                          ▼                                   │   │
│  │  ┌──────────────────────────────────────────────────────┐  │   │
│  │  │              Data Storage Layer                      │  │   │
│  │  │                                                      │  │   │
│  │  │  📁 data/enquiries.json (MVP)                      │  │   │
│  │  │     [Customer Enquiries, Warehouse Listings]       │  │   │
│  │  │                                                      │  │   │
│  │  │  🔄 For Production:                                │  │   │
│  │  │     - PostgreSQL                                   │  │   │
│  │  │     - MongoDB                                      │  │   │
│  │  │     - Firebase                                     │  │   │
│  │  └──────────────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App (layout.tsx)
├── Navbar
├── Main Content
│   ├── Home Page (/)
│   │   ├── Hero
│   │   ├── WhyChooseUs
│   │   │   └── FeatureCard (x3)
│   │   ├── SolutionsSection
│   │   │   ├── Card (For Businesses)
│   │   │   └── Card (For Owners)
│   │   └── CTASection
│   │
│   └── Enquiry Page (/enquiry)
│       └── EnquiryPage
│           └── Tabs
│               ├── Tab 1: Customer Form
│               │   └── CustomerEnquiryForm
│               │       ├── Input (x4)
│               │       ├── Select
│               │       ├── Textarea
│               │       ├── Alert (conditional)
│               │       └── Button (submit)
│               │
│               └── Tab 2: Warehouse Owner Form
│                   └── WarehouseOwnerEnquiryForm
│                       ├── Input (x4)
│                       ├── Select (x2)
│                       ├── Textarea
│                       ├── Alert (conditional)
│                       └── Button (submit)
│
└── Footer
```

## Data Flow

### Form Submission Flow

```
User Input
    ▼
Form Component State
    ▼
Client-side Validation (validation.ts)
    ├─ If invalid: Show errors ❌
    │
    └─ If valid ✓
        ▼
    API Request (POST /api/enquiry)
        ▼
    Server Validation
        ├─ If invalid: Return 400 ❌
        │
        └─ If valid ✓
            ▼
        Generate ID & Timestamp
            ▼
        Save to data/enquiries.json
            ▼
        Return 201 + Enquiry Data ✅
            ▼
    Client receives response
        ├─ If success: Show confirmation message ✅
        └─ If error: Show error message ❌
```

## Type System

```
Types (lib/types.ts)
├── CustomerEnquiry
│   ├── id (optional)
│   ├── type: "customer"
│   ├── companyName
│   ├── contactPerson
│   ├── email
│   ├── phone
│   ├── requiredLocation
│   ├── requiredCapacity
│   ├── duration ("short-term" | "long-term")
│   ├── additionalNotes
│   └── submittedAt
│
├── WarehouseOwnerEnquiry
│   ├── id (optional)
│   ├── type: "warehouse-owner"
│   ├── warehouseName
│   ├── ownerName
│   ├── email
│   ├── phone
│   ├── warehouseLocation
│   ├── totalCapacity
│   ├── type_of_warehouse ("cold" | "general" | "industrial")
│   ├── description
│   └── submittedAt
│
├── Enquiry (union: CustomerEnquiry | WarehouseOwnerEnquiry)
│
└── ApiResponse<T>
    ├── success: boolean
    ├── message: string
    ├── data?: T
    └── error?: string
```

## File Organization

```
warehouse-marketplace/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles
│   ├── robots.ts                # SEO robots config
│   ├── sitemap.ts               # SEO sitemap
│   ├── enquiry/
│   │   └── page.tsx             # Enquiry page
│   └── api/
│       └── enquiry/
│           └── route.ts         # Form API endpoint
│
├── components/                   # Reusable React components
│   ├── index.ts                 # Component exports
│   ├── Button.tsx               # Button component
│   ├── Input.tsx                # Input field
│   ├── Textarea.tsx             # Textarea field
│   ├── Select.tsx               # Select dropdown
│   ├── Card.tsx                 # Card container
│   ├── Tabs.tsx                 # Tab navigation
│   ├── Alert.tsx                # Alert notification
│   ├── Spinner.tsx              # Loading spinner
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer
│   ├── Hero.tsx                 # Hero section
│   ├── FeatureCard.tsx          # Feature card
│   ├── WhyChooseUs.tsx          # Why choose us section
│   ├── SolutionsSection.tsx     # Solutions section
│   ├── CTASection.tsx           # Call-to-action section
│   ├── CustomerEnquiryForm.tsx  # Customer form
│   ├── WarehouseOwnerEnquiryForm.tsx # Owner form
│   └── EnquiryPage.tsx          # Enquiry page container
│
├── lib/                         # Utilities and helpers
│   ├── types.ts                 # TypeScript interfaces
│   ├── validation.ts            # Form validation
│   ├── config.ts                # Site configuration
│   └── constants.ts             # App constants
│
├── public/                      # Static files
│   └── favicon.ico
│
├── data/                        # Data storage (generated at runtime)
│   └── enquiries.json
│
├── Configuration Files
│   ├── package.json             # Dependencies
│   ├── tsconfig.json            # TypeScript config
│   ├── tailwind.config.ts       # Tailwind CSS config
│   ├── next.config.ts           # Next.js config
│   └── postcss.config.js        # PostCSS config
│
├── Documentation
│   ├── README.md                # Full documentation
│   └── SETUP.md                 # Quick setup guide
│
└── Configuration
    ├── .gitignore               # Git ignore rules
    ├── .env.example             # Environment template
    └── setup.sh                 # Setup script
```

## API Contract

### POST /api/enquiry - Customer Enquiry

**Request:**
```json
{
  "type": "customer",
  "companyName": "Acme Corp",
  "contactPerson": "John Doe",
  "email": "john@acme.com",
  "phone": "+123456789",
  "requiredLocation": "New York",
  "requiredCapacity": "5000",
  "duration": "short-term",
  "additionalNotes": "Urgent requirement",
  "submittedAt": "2024-02-15T10:30:00.000Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {
    "id": "ENQ-1708000000000",
    "type": "customer",
    "companyName": "Acme Corp",
    "contactPerson": "John Doe",
    "email": "john@acme.com",
    "phone": "+1 (234) 567-890",
    "requiredLocation": "New York",
    "requiredCapacity": "5000",
    "duration": "short-term",
    "additionalNotes": "Urgent requirement",
    "submittedAt": "2024-02-15T10:30:00.000Z"
  }
}
```

### POST /api/enquiry - Warehouse Listing

**Request:**
```json
{
  "type": "warehouse-owner",
  "warehouseName": "Prime Storage",
  "ownerName": "Jane Smith",
  "email": "jane@primeStorage.com",
  "phone": "+1 (345) 678-901",
  "warehouseLocation": "Brooklyn",
  "totalCapacity": "10000",
  "type_of_warehouse": "general",
  "description": "Modern warehouse with loading dock",
  "submittedAt": "2024-02-15T10:30:00.000Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {
    "id": "ENQ-1708000000001",
    "type": "warehouse-owner",
    "warehouseName": "Prime Storage",
    "ownerName": "Jane Smith",
    "email": "jane@primeStorage.com",
    "phone": "+1 (345) 678-901",
    "warehouseLocation": "Brooklyn",
    "totalCapacity": "10000",
    "type_of_warehouse": "general",
    "description": "Modern warehouse with loading dock",
    "submittedAt": "2024-02-15T10:30:00.000Z"
  }
}
```

## Styling System

```
Design System
├── Color Palette
│   ├── Primary: Cyan-500 (#0ea5e9)
│   ├── Dark Accent: #0c4a6e
│   ├── Light Background: Blue-50 (#f0f9ff)
│   ├── White: #ffffff
│   └── Gray Scale: Gray-50 to Gray-900
│
├── Typography
│   ├── H1: 36px / md: 60px
│   ├── H2: 30px / md: 36px
│   ├── H3: 20px
│   ├── Body: 16px
│   └── Small: 14px
│
├── Spacing
│   ├── Section Padding: 64px (py-16)
│   ├── Component Padding: 24px (p-6)
│   ├── Gap: 24px / 32px
│   └── Margins: 8px to 48px
│
├── Border Radius
│   └── All: 8px (rounded-lg)
│
├── Shadows
│   ├── Small: shadow-sm
│   ├── Medium: shadow-md
│   └── Hover: Increased shadow
│
└── Interactions
    ├── Transitions: 150-300ms
    ├── Hover States: Color shift
    ├── Focus States: Ring outline
    └── Disabled States: Reduced opacity
```

## Production Checklist

### Pre-Launch
- [ ] Update company information
- [ ] Test all forms on mobile/desktop
- [ ] Verify SEO metadata
- [ ] Check accessibility (WCAG AA)
- [ ] Performance optimization

### Post-Launch
- [ ] Monitor error rates
- [ ] Track form submissions
- [ ] Gather user feedback
- [ ] Plan feature iterations

### Data Protection
- [ ] Implement email notifications
- [ ] Add database backups
- [ ] Encrypt sensitive data
- [ ] Implement GDPR compliance
- [ ] Create privacy policy

---

**Architecture maintained with clarity and scalability in mind.**
