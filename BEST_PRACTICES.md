# Enterprise SaaS Design - Best Practices & Standards

## Design Philosophy

### Core Principles
1. **Professional First**: Every element should feel enterprise-ready
2. **Intentional Motion**: Animations serve purpose, not distraction
3. **Accessibility**: Never sacrifice usability for aesthetics
4. **Performance**: Smooth 60fps animations on all devices
5. **Consistency**: Unified design language across all pages

## Animation Standards

### Duration Guidelines
- **Quick interactions** (hover, tap): 0.15-0.2s
- **Section transitions**: 0.3-0.4s
- **Page loading animations**: 0.5-0.6s
- **Long-form content**: 0.6-0.8s

### Easing Functions
- **Entrance animations**: `easeOut` (or spring for playful)
- **Exit animations**: `easeIn`
- **Interactive elements**: Spring physics (stiffness: 300-400)
- **Smooth scrolls**: Linear for continuous, easeInOut for discrete

### Stagger Patterns
```
First child: no delay
Each subsequent: +0.1s

Total duration = base_duration + (num_children * 0.1s)
```

## Color Usage

### Text Colors
- **Primary text**: `text-gray-900` (on light backgrounds)
- **Secondary text**: `text-gray-600` (secondary information)
- **Muted text**: `text-gray-500` (helper text, captions)
- **Interactive text**: `text-cyan-600` (links, interactive)

### Background Colors
- **Main background**: `bg-white` or `from-slate-50`
- **Section alternate**: `bg-gray-50`
- **Featured sections**: Gradients `from-cyan-500 to-blue-600`
- **Dark mode ready**: `bg-gray-900`, `bg-slate-900`

### Hover States
```tsx
// Links
hover:text-cyan-600

// Buttons
hover:bg-cyan-600, hover:shadow-lg

// Cards
hover:shadow-md, hover:border-gray-200

// Interactive elements
hover:scale-105, hover:translate-y
```

## Typography Standards

### Heading Hierarchy
```
h1: text-5xl md:text-6xl font-bold
h2: text-4xl md:text-5xl font-bold
h3: text-2xl font-bold
h4: text-xl font-semibold
h5: text-lg font-semibold
p:  text-base font-light or font-normal
```

### Font Weights
- **300**: Light (elegant body text)
- **400**: Normal (default body)
- **500**: Medium (labels, UI)
- **600**: Semibold (emphasis)
- **700**: Bold (headings)
- **800**: Extra bold (major headings)

### Line Heights
- **Headings**: `leading-tight` (1.25)
- **Body**: `leading-relaxed` (1.625)
- **Small text**: `leading-normal` (1.5)

## Spacing System

### Base Unit: 4px (Tailwind's default)

### Standard Spacing
- **Micro**: `gap-2` (8px)
- **Small**: `gap-3` (12px)
- **Standard**: `gap-4` (16px) or `gap-6` (24px)
- **Large**: `gap-8` (32px)
- **XL**: `gap-12` (48px)

### Section Spacing
- **Dense sections**: `py-8`
- **Standard sections**: `py-16`
- **Featured sections**: `py-24`
- **Extra space**: `py-32`

## Component Patterns

### Button States
```
Default: cyan-500, shadow-md
Hover:   cyan-600, shadow-lg, scale-1.03
Active:  scale-0.97
Focus:   ring-2 ring-cyan-500 ring-offset-2
Disabled: opacity-50, cursor-not-allowed
```

### Input States
```
Default:  border-gray-200, bg-white
Focus:    border-cyan-500, ring-2 ring-cyan-500
Error:    border-red-400, bg-red-50
Filled:   border-gray-300
Disabled: bg-gray-50, cursor-not-allowed
```

### Card States
```
Default:  border-gray-100, shadow-sm
Hover:    border-gray-200, shadow-md, lift effect
Premium:  gradient on hover, cyan glow
Active:   border-cyan-500, shadow-lg
```

## Responsive Design

### Breakpoints
- **Mobile**: 320px (default)
- **Tablet**: `sm` 640px
- **Laptop**: `md` 768px
- **Desktop**: `lg` 1024px
- **Wide**: `xl` 1280px

### Pattern Examples
```tsx
// Font sizing
className="text-base md:text-lg lg:text-xl"

// Grid layout
className="grid md:grid-cols-2 lg:grid-cols-3"

// Padding
className="px-4 sm:px-6 lg:px-8"

// Hidden elements
className="hidden md:block lg:flex"
```

## Accessibility Standards

### Color Contrast
- **AA**: 4.5:1 for normal text
- **AAA**: 7:1 for enhanced
- **Current system**: Meets WCAG AA

### Focus States (REQUIRED)
```tsx
className="focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
```

### Semantic HTML
```tsx
// ✓ Good
<button>Click me</button>
<form onSubmit={handleSubmit}>
<nav aria-label="Main">
<section aria-labelledby="section-title">

// ✗ Avoid
<div onClick={handler}>Click me</div>
<div role="button">
```

### ARIA Labels
```tsx
// Images
<img alt="descriptive text" />

// Buttons without text
<button aria-label="Close dialog">×</button>

// Form fields
<label htmlFor="email">Email</label>
<input id="email" />

// Dynamic regions
<div aria-live="polite" aria-label="Form status">
```

## Performance Checklist

- [ ] Use Next.js Image component for images
- [ ] Lazy load below-the-fold sections
- [ ] Animations use transform/opacity only
- [ ] CSS is minified in production
- [ ] JavaScript is code-split
- [ ] No layout thrashing in animations
- [ ] Prefetch critical resources
- [ ] Cache static assets
- [ ] Monitor Core Web Vitals

## Code Style Guidelines

### Component Structure
```tsx
"use client"; // If using client-side features

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

export const ComponentName: React.FC<ComponentProps> = ({
  title,
  children,
}) => {
  // State
  const [isOpen, setIsOpen] = useState(false);

  // Methods
  const handleToggle = () => setIsOpen(!isOpen);

  // Render
  return (
    <motion.div
      className="..."
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
};
```

### Naming Conventions
- **Components**: PascalCase (Hero.tsx, Button.tsx)
- **Utilities**: camelCase (formatDate.ts, animations.ts)
- **CSS Classes**: kebab-case (btn-primary, card-premium)
- **Variables**: camelCase (isLoading, formData)
- **Constants**: UPPER_SNAKE_CASE (API_URL, MAX_RETRIES)

### Comments
```tsx
// Use for WHY, not WHAT

// ✓ Good
// Delay opening to ensure smooth animation
useEffect(() => {
  const timer = setTimeout(() => setOpen(true), 300);
  return () => clearTimeout(timer);
}, []);

// ✗ Avoid
// Set isOpen to true
setIsOpen(true);
```

## Mobile First Approach

### Strategy
1. Design for mobile first (320px)
2. Add complexity for larger screens
3. Use `hidden` to remove on mobile
4. Use `sm:`, `md:`, etc. to add on larger screens

### Example
```tsx
// Mobile: full width, single column
// Tablet+: 2 columns
// Desktop+: 3 columns
className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"

// Mobile: stacked buttons
// Desktop+: side by side
className="flex flex-col sm:flex-row gap-4"
```

## Error Handling

### User-Facing Errors
```tsx
// Show friendly message
<Alert
  type="error"
  message="Something went wrong. Please try again."
/>
```

### Console Errors
```tsx
// Log for debugging
console.error("Detailed error:", error);

// Don't expose to users
```

## Documentation Standards

### Component Docs Template
```tsx
/**
 * ComponentName
 * 
 * Brief description of what it does
 * 
 * @param title - The title text
 * @param children - Content to display
 * 
 * @example
 * <ComponentName title="Hello">
 *   Content
 * </ComponentName>
 */
```

## Testing Checklist

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Keyboard navigation
- [ ] Screen reader (NVDA/JAWS)
- [ ] Animations on/off preference

## Deployment Checklist

- [ ] Build passes: `npm run build`
- [ ] Type check passes: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors
- [ ] All pages load correctly
- [ ] Images optimized
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] Environment variables set
- [ ] Analytics configured

---

## Quick Reference Commands

```bash
# Development
npm run dev

# Build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Production
npm start
```

---

Remember: **Consistency, performance, and accessibility** are the pillars of professional enterprise design.
