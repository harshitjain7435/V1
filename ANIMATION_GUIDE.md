# Developer Quick Reference - Premium SaaS Design System

## Animation Patterns Guide

### Basic Animations
```tsx
import { fadeInUp, fadeIn, scaleIn } from "@/lib/animations";
import { motion } from "framer-motion";

// Fade in with upward motion
<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content here
</motion.div>

// Simple fade
<motion.div variants={fadeIn} initial="hidden" animate="visible">
  Content here
</motion.div>

// Scale entrance
<motion.div variants={scaleIn} initial="hidden" animate="visible">
  Content here
</motion.div>
```

### Stagger Animations (Multiple Children)
```tsx
import { staggerContainer, staggerItem } from "@/lib/animations";

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={staggerItem}>Item 1</motion.div>
  <motion.div variants={staggerItem}>Item 2</motion.div>
  <motion.div variants={staggerItem}>Item 3</motion.div>
</motion.div>
```

### Scroll-Triggered Animations
```tsx
import { scrollFadeInUp } from "@/lib/animations";

<motion.div
  variants={scrollFadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  Appears when scrolled into view
</motion.div>
```

### Button Hover Animation
```tsx
import { buttonHover } from "@/lib/animations";

<motion.button {...buttonHover}>
  Click me
</motion.button>
```

### Hover Lift Effect
```tsx
import { hoverLift } from "@/lib/animations";

<motion.div {...hoverLift}>
  Lifts on hover
</motion.div>
```

## Component Styling System

### Colors
- **Primary**: `cyan-500` (#0ea5e9)
- **Primary Dark**: `cyan-600`
- **Accent**: `blue-600`
- **Success**: `green-500`
- **Error**: `red-500`

### Rounded Corners
- Standard: `rounded-lg`
- Premium/Featured: `rounded-xl`
- Full: `rounded-full`

### Shadows
- Light: `shadow-sm`
- Medium: `shadow-md`
- Premium: `shadow-lg`

### Spacing Standards
- Sections: `py-16` or `py-24` with `px-4 sm:px-6 lg:px-8`
- Cards: `p-6` (standard), `p-8` (premium)
- Components: `gap-6` or `gap-8`

## Form Components Pattern

### Input Field with Error Handling
```tsx
<Input
  label="Field Name"
  name="fieldName"
  value={value}
  onChange={handleChange}
  placeholder="Placeholder text"
  required
  error={errors.fieldName}
/>
```

### Select Dropdown
```tsx
<Select
  label="Choose Option"
  name="option"
  value={value}
  onChange={handleChange}
  options={[
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
  ]}
  error={errors.option}
/>
```

### Textarea
```tsx
<Textarea
  label="Comments"
  name="comments"
  value={value}
  onChange={handleChange}
  rows={4}
  error={errors.comments}
/>
```

## Alert Components

### Success Alert
```tsx
<Alert
  type="success"
  message="Operation completed successfully"
  onClose={() => setShowAlert(false)}
/>
```

### Error Alert
```tsx
<Alert
  type="error"
  message="Something went wrong"
  onClose={() => setShowAlert(false)}
/>
```

## Button Variants

### Primary Button
```tsx
<Button>Primary Action</Button>
```

### Outline Button
```tsx
<Button variant="outline">Secondary Action</Button>
```

### With Loading State
```tsx
<Button disabled={loading}>
  {loading && <Spinner size="sm" />}
  {loading ? "Loading..." : "Submit"}
</Button>
```

## Card Styling

### Standard Card
```tsx
<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

### Premium Card (with hover effects)
```tsx
<Card className="card-premium">
  <h3>Premium Title</h3>
  <p>Premium content</p>
</Card>
```

## Navbar Implementation

The navbar automatically:
- Detects scroll position
- Changes styling on scroll
- Shows glassmorphism effect
- Supports mobile menu

No additional setup needed - it's automatic!

## Hero Section Components

### Animated Grid
```tsx
import { AnimatedGrid } from "@/components/AnimatedGrid";

<section>
  <AnimatedGrid />
  {/* Your content */}
</section>
```

### Floating Glow Blobs
```tsx
import { FloatingGlobs } from "@/components/FloatingGlobs";

<section>
  <FloatingGlobs />
  {/* Your content */}
</section>
```

## Tabs with Animation

```tsx
const tabs = [
  { id: "tab1", label: "Tab 1", content: <Component1 /> },
  { id: "tab2", label: "Tab 2", content: <Component2 /> },
];

<Tabs tabs={tabs} defaultTab="tab1" />
```

The tab indicator animates smoothly with spring physics!

## Accessibility Features

All components include:
- ARIA labels
- Focus states with visible rings
- Semantic HTML
- Keyboard navigation support

Example:
```tsx
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  className="focus:ring-2 focus:ring-cyan-500"
>
  Close
</button>
```

## Performance Tips

1. **Use `once: true` for scroll animations**
   - Prevents re-triggering on scroll up
   - Better performance

2. **Use viewport margin**
   - `margin: "-100px"` triggers earlier
   - Smoother UX

3. **Avoid inline motion configs**
   - Import from `lib/animations.ts`
   - Reduces bundle size

4. **Use transform-based animations**
   - Avoid width/height changes
   - Better GPU acceleration

## Common Patterns

### Loading Spinner with Status
```tsx
const [loading, setLoading] = useState(false);

return (
  <>
    <Button disabled={loading}>
      {loading && <Spinner size="sm" />}
      {loading ? "Processing..." : "Submit"}
    </Button>
  </>
);
```

### Form with Alert
```tsx
const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

return (
  <form>
    {status !== "idle" && (
      <Alert
        type={status}
        message="Your message here"
        onClose={() => setStatus("idle")}
      />
    )}
    {/* form fields */}
  </form>
);
```

### Staggered List
```tsx
<motion.ul variants={scrollStaggerContainer}>
  {items.map(item => (
    <motion.li key={item.id} variants={scrollStaggerItem}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

## Troubleshooting

### Animations Not Showing
- Check `initial` and `animate` props
- Verify component is imported from Framer Motion
- Ensure variants are properly defined

### Scroll Animations Not Triggering
- Verify `whileInView` is set
- Check viewport margin value
- Confirm `once: true` if needed

### Performance Issues
- Reduce animation complexity
- Use fewer simultaneous animations
- Enable hardware acceleration with transforms

## Resources

- **Framer Motion Docs**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/
- **Next.js App Router**: https://nextjs.org/docs/app

---

Happy building! 🚀
