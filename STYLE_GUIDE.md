# Style Guide & Code Standards

## 📐 Code Organization

### Component Structure

```typescript
"use client";  // If using client-side features

import { useState, useEffect } from "react";
import Link from "next/link";
import type { FC, ReactNode } from "react";

// Types first
interface ComponentProps {
  title: string;
  variant?: "primary" | "secondary";
  children?: ReactNode;
}

// Component definition
export const ComponentName: FC<ComponentProps> = ({
  title,
  variant = "primary",
  children,
}) => {
  const [state, setState] = useState(false);

  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
};

// No default export
```

### File Naming
- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Pages: `lowercase.tsx` (e.g., `page.tsx`)
- Utils: `camelCase.ts` (e.g., `validation.ts`)
- Styles: `camelCase.css` (e.g., `globals.css`)

---

## 🎨 Tailwind CSS Conventions

### Spacing
```typescript
// Consistency rules
py-16      // Section spacing (64px)
p-6        // Component padding (24px)
gap-6      // Component gap (24px)
gap-8      // Larger gap (32px)
mb-4       // Margin bottom (16px)
```

### Colors
```typescript
// Use consistent color naming
bg-cyan-500       // Primary action
text-cyan-500     // Primary text
bg-gray-50        // Light background
text-gray-900     // Dark text
text-gray-600     // Light text
hover:bg-cyan-600 // Hover state
```

### Responsive Design
```typescript
// Mobile-first approach
className="block md:flex"           // Stack mobile, flex on desktop
className="text-lg md:text-2xl"     // Larger text on desktop
className="px-4 sm:px-6 lg:px-8"   // Progressive padding
className="grid md:grid-cols-2"     // Grid on medium+
```

### Component Classes
```typescript
const buttonClasses = `
  px-6 py-3 
  rounded-lg 
  font-semibold 
  transition-colors 
  focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`;
```

---

## 🔤 TypeScript Standards

### Type Definitions
```typescript
// ✅ DO: Use interfaces for components
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  disabled?: boolean;
}

// ❌ DON'T: Use type for component props
type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

// ✅ DO: Use const assertions for unions
const VARIANTS = {
  primary: "bg-cyan-500",
  outline: "border border-cyan-500",
} as const;

// ✅ DO: Type arrays
const items: string[] = [];
const users: User[] = [];

// ❌ DON'T: Use any type
const data: any = {};  // AVOID

// ✅ DO: Use unknown for dynamic data
const data: unknown = {}; // BETTER
```

### Function Declarations
```typescript
// ✅ DO: Named function with types
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ✅ DO: Arrow functions with proper typing
const handleSubmit = async (data: FormData): Promise<void> => {
  // ...
};

// ✅ DO: Return type annotations
export function getUser(id: number): User | null {
  // ...
}
```

---

## ⚛️ React Best Practices

### Hooks Usage
```typescript
// ✅ DO: Hooks at top level
export const MyComponent: FC = () => {
  const [state, setState] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    // effect
  }, []);

  return <div>{state}</div>;
};

// ❌ DON'T: Hooks in conditions
if (condition) {
  const [state, setState] = useState("");  // WRONG
}

// ✅ DO: Proper dependency arrays
useEffect(() => {
  // runs once on mount
}, []);

useEffect(() => {
  // runs when `id` changes
}, [id]);

useEffect(() => {
  // runs on every render (avoid!)
});
```

### Event Handlers
```typescript
// ✅ DO: Type event parameters
const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const value = e.target.value;
  setState(value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  // submit
};

// ✅ DO: Use optional chaining
const handleClick = (e?: React.MouseEvent<HTMLButtonElement>): void => {
  if (e?.target instanceof HTMLButtonElement) {
    // handle
  }
};
```

### Props Drilling Prevention
```typescript
// ✅ DO: Use composition over prop drilling
<Layout>
  <Header>
    <Navbar />
  </Header>
  <Main>
    <PageContent />
  </Main>
  <Footer />
</Layout>

// ❌ DON'T: Pass props through many levels
<Layout navbar={navbar} footer={footer} header={header} />
```

---

## 📝 Naming Conventions

### Variables
```typescript
// ✅ DO: Descriptive names
const isLoading = true;
const userEmail = "user@example.com";
const submitButtonText = "Submit";
const hasPermission = false;

// ❌ DON'T: Single letters (except loops/iterations)
const x = true;        // AVOID
const a = "user@...";  // AVOID
const d = data;        // AVOID

// ✅ DO: Boolean naming
const is[...]        // isActive, isLoading
const has[...]       // hasError, hasPermission
const should[...]    // shouldRedirect, shouldValidate
const can[...]       // canSubmit, canDelete
```

### Classes & Utilities
```typescript
// ✅ DO: Class-based naming
class UserService {}
class EmailValidator {}

// ✅ DO: Utility function naming
const validateEmail = () => {};
const formatDate = () => {};
const getUserById = () => {};
```

### Constants
```typescript
// ✅ DO: UPPERCASE for constants
const MAX_RETRIES = 3;
const API_TIMEOUT = 30000;
const DEFAULT_PAGE_SIZE = 20;

// ✅ DO: descriptive enum names
enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}
```

---

## 📋 Form Handling

### Form State Management
```typescript
// ✅ DO: Type form data
interface FormData {
  name: string;
  email: string;
  phone: string;
}

const [formData, setFormData] = useState<Partial<FormData>>({
  name: "",
  email: "",
  phone: "",
});

// ✅ DO: Separate error state
const [errors, setErrors] = useState<Record<string, string>>({});

// ✅ DO: Separate loading state
const [loading, setLoading] = useState(false);

// ✅ DO: Separate status state
const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
```

### Form Validation
```typescript
// ✅ DO: Return validation object
interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export const validateForm = (data: FormData): ValidationResult => {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push("Name is required");
  }

  if (!isValidEmail(data.email)) {
    errors.push("Email is invalid");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
```

---

## 🎯 API Handling

### Response Format
```typescript
// ✅ DO: Standardized response
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// ✅ DO: Type async functions
const submitForm = async (data: FormData): Promise<ApiResponse<Enquiry>> => {
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: "Failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
```

---

## 🧪 Testing Standards

### Unit Tests
```typescript
describe("validateEmail", () => {
  it("should validate correct email", () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });

  it("should reject invalid email", () => {
    expect(validateEmail("invalid-email")).toBe(false);
  });
});
```

---

## 📚 Documentation

### Component Documentation
```typescript
/**
 * Button component with primary and outline variants
 *
 * @param {ReactNode} children - Button text or content
 * @param {string} variant - Button variant: "primary" or "outline"
 * @param {boolean} disabled - Whether button is disabled
 * @param {() => void} onClick - Click handler
 *
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button: FC<ButtonProps> = ({ children, variant = "primary", disabled, onClick }) => {
  // ...
};
```

### Function Documentation
```typescript
/**
 * Validates email format using regex
 *
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 *
 * @example
 * validateEmail("user@example.com") // true
 * validateEmail("invalid") // false
 */
export const validateEmail = (email: string): boolean => {
  // ...
};
```

---

## 🚫 Code Smells to Avoid

### ❌ Anti-patterns

```typescript
// DON'T: Magic numbers
if (user.age > 18) { }  // What's special about 18?

// DO: Use constants
const LEGAL_AGE = 18;
if (user.age > LEGAL_AGE) { }

// DON'T: Nested ternaries
const result = a ? b ? c : d : e ? f : g;

// DO: Use if-statements or switch
const getResult = () => {
  if (a) return b ? c : d;
  return e ? f : g;
};

// DON'T: Long parameter lists
function createUser(name, email, phone, address, city, state, zip) {}

// DO: Use object parameter
interface UserData {
  name: string;
  email: string;
  phone: string;
  address: Address;
}
function createUser(data: UserData) {}

// DON'T: Empty try-catch
try {
  risky();
} catch (e) {
  // silent fail
}

// DO: Log and handle errors
try {
  risky();
} catch (error) {
  console.error("Operation failed:", error);
  // handle appropriately
}
```

---

## ✅ Best Practices Summary

| Rule | Guideline |
|------|-----------|
| **TypeScript** | Always use strict mode |
| **Props** | Always type component props with interface |
| **Naming** | Use descriptive, semantic names |
| **Spacing** | Follow Tailwind convention (py-16, p-6) |
| **Colors** | Use cyan-500 for primary, gray scale for neutrals |
| **Responsiveness** | Mobile-first with md:, lg: breakpoints |
| **Accessibility** | Add ARIA labels and semantic HTML |
| **Performance** | Use lazy loading for images, code splitting |
| **Documentation** | JSDoc for public functions and components |
| **Error Handling** | Never silently fail, always log and return errors |
| **Testing** | Write unit tests for utils and validations |
| **Commits** | Use descriptive commit messages |

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Follow these standards for clean, maintainable code!** ✨
