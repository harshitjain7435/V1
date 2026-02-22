# Warehouse Marketplace

A production-ready business website for a warehouse marketplace platform built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Overview

Warehouse Marketplace is a professional SaaS marketing website that connects businesses needing warehouse space with warehouse owners looking to monetize their capacity. The platform provides:

- **Landing Page**: Marketing content with hero section, features, and call-to-action
- **Enquiry System**: Dynamic forms for customers and warehouse owners
- **API Backend**: Secure enquiry submission with validation
- **SEO Optimization**: Complete metadata, sitemap, and robots.txt
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript strict mode

## 🏗️ Project Structure

```
warehouse-marketplace/
├── app/
│   ├── api/
│   │   └── enquiry/
│   │       └── route.ts           # Enquiry submission API
│   ├── enquiry/
│   │   └── page.tsx               # Enquiry form page
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Global styles
│   ├── robots.ts                  # SEO robots.txt
│   └── sitemap.ts                 # SEO sitemap
├── components/
│   ├── Button.tsx                 # Reusable button component
│   ├── Card.tsx                   # Card component
│   ├── Input.tsx                  # Form input component
│   ├── Textarea.tsx               # Textarea component
│   ├── Select.tsx                 # Select dropdown component
│   ├── Tabs.tsx                   # Tab component
│   ├── Alert.tsx                  # Alert notification
│   ├── Spinner.tsx                # Loading spinner
│   ├── Navbar.tsx                 # Navigation bar
│   ├── Footer.tsx                 # Footer
│   ├── Hero.tsx                   # Hero section
│   ├── FeatureCard.tsx            # Feature card for grid layouts
│   ├── WhyChooseUs.tsx            # Why choose us section
│   ├── SolutionsSection.tsx       # Solutions for customers and owners
│   ├── CTASection.tsx             # Call-to-action section
│   ├── CustomerEnquiryForm.tsx    # Customer enquiry form
│   ├── WarehouseOwnerEnquiryForm.tsx # Warehouse owner form
│   └── EnquiryPage.tsx            # Enquiry page container
├── lib/
│   ├── types.ts                   # TypeScript interfaces
│   └── validation.ts              # Form validation logic
├── data/
│   └── enquiries.json             # Submitted enquiries (generated at runtime)
├── public/
│   └── favicon.ico                # Favicon
├── package.json
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── next.config.ts                 # Next.js configuration
├── postcss.config.js              # PostCSS configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn package manager

### Installation

1. **Navigate to project directory**
   ```bash
   cd d:\Projects\V1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏃 Running the Project

### Development Mode

```bash
npm run dev
```

Development server runs on `http://localhost:3000` with hot-reload enabled.

### Production Build

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

Verify TypeScript types without running the build.

## 📋 Pages & Routes

### Public Routes

- `/` - **Landing Page**
  - Hero section with value proposition
  - Why choose us section
  - Solutions for customers and owners
  - Call-to-action section

- `/enquiry` - **Enquiry Form Page**
  - Two-tab interface (customer / warehouse owner)
  - Form validation
  - Success/error notifications
  - Contact information

### API Routes

- `POST /api/enquiry` - Submit enquiry
  - Request: JSON with enquiry data
  - Response: Saved enquiry with ID
  - Storage: Local JSON file (`data/enquiries.json`)

- `GET /api/enquiry` - Retrieve all enquiries (admin)
  - Returns array of submitted enquiries

## 🔧 Configuration

### Environment Variables

No environment variables required for MVP. For production, add:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://warehousemarketplace.com
NODE_ENV=production
```

### Tailwind CSS

Configured in `tailwind.config.ts`:
- Primary color: Cyan-500 (`#0ea5e9`)
- Dark accent: `#0c4a6e`
- Rounded corners: `rounded-lg`
- Shadows: `shadow-sm` / `shadow-md`

### TypeScript

Strict mode enabled in `tsconfig.json`:
- `"strict": true`
- Full type checking and inference
- No `any` types allowed

## 📝 Form Validation

### Customer Enquiry

- Company Name (required)
- Contact Person (required)
- Email (required, valid format)
- Phone (required, valid format)
- Required Location (required)
- Required Capacity (required)
- Duration (required: short-term or long-term)
- Additional Notes (optional)

### Warehouse Owner Enquiry

- Warehouse Name (required)
- Owner Name (required)
- Email (required, valid format)
- Phone (required, valid format)
- Warehouse Location (required)
- Total Capacity (required)
- Warehouse Type (required: cold, general, industrial)
- Description (required)

**Validation Rules:**
- Email: Standard email format validation
- Phone: 10+ characters, supports international formats
- All required fields must be filled

## 🗄️ Data Storage

Enquiries are stored in `data/enquiries.json`:

```json
[
  {
    "id": "ENQ-1708000000000",
    "type": "customer",
    "companyName": "Acme Corp",
    "contactPerson": "John Doe",
    "email": "john@acme.com",
    "phone": "+123456789",
    "requiredLocation": "New York",
    "requiredCapacity": "5000",
    "duration": "short-term",
    "additionalNotes": "Need urgent space",
    "submittedAt": "2024-02-15T10:30:00.000Z"
  }
]
```

**For Production:**
- Integrate with database (PostgreSQL, MongoDB, etc.)
- Add authentication and authorization
- Implement email notifications
- Add admin dashboard for enquiry management
- Add payment/subscription system

## 🎨 Design System

### Colors

- **Primary**: Cyan-500 (`#0ea5e9`)
- **Dark Accent**: `#0c4a6e`
- **Light Background**: `#f0f9ff` (blue-50)
- **Sections**: White / Gray-50 / Gray-100 alternation
- **Text**: Gray-900 (dark) / Gray-600 (light)

### Components

All components are fully typed with TypeScript interfaces and include:
- ARIA labels for accessibility
- Semantic HTML
- Smooth transitions
- Focus states
- Error states
- Loading states

### Typography

- System font stack for performance
- H1: 2.25rem (36px) / md: 3.75rem (60px)
- H2: 1.875rem (30px) / md: 2.25rem (36px)
- H3: 1.25rem (20px)
- Body: 1rem (16px) / Large: 1.25rem (20px)

## ♿ Accessibility

- ARIA labels on all interactive elements
- Semantic HTML (main, nav, section, article, etc.)
- Focus states on all buttons and inputs
- Keyboard navigation support
- Color contrast ratios meet WCAG AA standards
- Alt text on images
- Proper heading hierarchy

## 🔍 SEO

### Metadata

- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card meta tags
- Canonical URLs
- Meta descriptions
- Viewport configuration

### Sitemap

Auto-generated at `sitemap.xml` for search engines.

### Robots.txt

Auto-generated to control search engine crawling.

### Image Optimization

- `next/image` component for automatic optimization
- Lazy loading enabled
- Responsive image sizes

## 📦 Dependencies

### Production
- **next** (^15.1.0) - React framework
- **react** (^19.0.0) - UI library
- **react-dom** (^19.0.0) - React DOM

### Development
- **typescript** (^5.3.3) - Type safety
- **tailwindcss** (^3.4.1) - Utility-first CSS
- **postcss** (^8.4.32) - CSS processing
- **autoprefixer** (^10.4.17) - Vendor prefixes
- **@types/node** - Node.js types
- **@types/react** - React types
- **@types/react-dom** - React DOM types

## 🛡️ Security

- No sensitive data in frontend
- Form validation on client and server
- CSRF protection ready (add CSRF middleware for production)
- Secure headers recommendations:
  - Content-Security-Policy
  - X-Content-Type-Options
  - X-Frame-Options
  - X-XSS-Protection

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Next.js
4. Deploy with one click
5. Automatic CI/CD

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Self-Hosted

```bash
npm run build
npm start
```

## 📈 Performance Optimizations

- ✅ Image optimization with next/image
- ✅ Automatic code splitting
- ✅ CSS-in-JS with Tailwind (no runtime)
- ✅ Static generation where possible
- ✅ Minification and compression
- ✅ Tree-shaking of unused code

## 🔐 Production Checklist

- [ ] Replace placeholder company info with real details
- [ ] Add email notification system (SendGrid, Nodemailer, etc.)
- [ ] Set up database (PostgreSQL recommended)
- [ ] Add admin authentication
- [ ] Enable HTTPS
- [ ] Configure email templates
- [ ] Add payment processing (if needed)
- [ ] Set up error monitoring (Sentry)
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Set up CDN for static assets
- [ ] Configure domain and SSL certificate
- [ ] Add analytics (Google Analytics, Mixpanel)
- [ ] Create privacy policy and terms of service pages
- [ ] Set up backup strategy
- [ ] Document API for partners

## 📞 Support Features

### Contact Information

- **Email**: hello@warehousemarketplace.com
- **Phone**: +91123456789
- **Hours**: Mon-Fri 9AM-6PM EST

### FAQ & Help

Add `/faq` page for frequently asked questions.

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows (find PID, then: taskkill /PID <PID>)
```

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Types Not Found

```bash
# Regenerate types
npm run type-check
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

## 👨‍💻 Development Notes

### Code Quality

- **Linting**: ESLint configured (add via `npm install eslint`)
- **Formatting**: Prettier ready (add via `npm install prettier`)
- **Type Safety**: Full TypeScript strict mode
- **Testing**: Ready for Jest setup

### Recommended VSCode Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin

### Git Commit Message Format

```
feat: Add enquiry form validation
fix: Handle API error responses
docs: Update README with deployment guide
style: Format code with Prettier
refactor: Extract form validation logic
test: Add unit tests for validation
chore: Update dependencies
```

## 🎯 Next Steps

1. **Customize Branding**
   - Update logo in Navbar and Footer
   - Change company name and contact info
   - Update OG images

2. **Add Email Integration**
   - Set up SendGrid or similar service
   - Send confirmation emails to users
   - Send notifications to admin

3. **Database Integration**
   - Replace JSON file storage
   - Add user authentication
   - Implement enquiry management dashboard

4. **Analytics & Monitoring**
   - Add Google Analytics
   - Set up error tracking (Sentry)
   - Monitor performance

5. **Launch & Promote**
   - Set up custom domain
   - Enable SSL/TLS
   - Submit sitemap to search engines
   - Configure DNS records

---

**Built with ❤️ for warehouse logistics**
