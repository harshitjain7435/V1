/**
 * Application Constants
 * Centralized constants used throughout the application
 */

// Form Field Names
export const FORM_FIELDS = {
  CUSTOMER: {
    COMPANY_NAME: "companyName",
    CONTACT_PERSON: "contactPerson",
    EMAIL: "email",
    PHONE: "phone",
    REQUIRED_LOCATION: "requiredLocation",
    REQUIRED_CAPACITY: "requiredCapacity",
    DURATION: "duration",
    ADDITIONAL_NOTES: "additionalNotes",
  },
  WAREHOUSE_OWNER: {
    WAREHOUSE_NAME: "warehouseName",
    OWNER_NAME: "ownerName",
    EMAIL: "email",
    PHONE: "phone",
    WAREHOUSE_LOCATION: "warehouseLocation",
    TOTAL_CAPACITY: "totalCapacity",
    TYPE_OF_WAREHOUSE: "type_of_warehouse",
    DESCRIPTION: "description",
  },
};

// Duration Options
export const DURATION_OPTIONS = [
  { value: "short-term", label: "Short-term (1-6 months)" },
  { value: "long-term", label: "Long-term (6+ months)" },
] as const;

// Warehouse Types
export const WAREHOUSE_TYPES = [
  { value: "general", label: "General Storage" },
  { value: "cold", label: "Cold Storage" },
  { value: "industrial", label: "Industrial" },
] as const;

// Enquiry Types
export const ENQUIRY_TYPES = {
  CUSTOMER: "customer",
  WAREHOUSE_OWNER: "warehouse-owner",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  ENQUIRY: "/api/enquiry",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  VALIDATION_ERROR: "Please fill in all required fields correctly.",
  SERVER_ERROR: "Server error. Please try again later.",
  SUBMIT_ERROR: "Failed to submit enquiry. Please try again.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CUSTOMER_ENQUIRY_SUBMITTED:
    "Your enquiry has been submitted successfully! We'll contact you soon.",
  WAREHOUSE_LISTED:
    "Your warehouse has been listed successfully! We'll review it soon.",
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]{10,}$/,
  MIN_PHONE_LENGTH: 10,
  MIN_CAPACITY_LENGTH: 1,
} as const;

// UI Constants
export const UI = {
  BUTTON_LOADING_TEXT: "Submitting...",
  SPINNER_SIZE: "md" as const,
  ALERT_TIMEOUT: 5000, // 5 seconds
} as const;

// Route Paths
export const ROUTES = {
  HOME: "/",
  ENQUIRY: "/enquiry",
  API_ENQUIRY: "/api/enquiry",
} as const;

// Meta Tags
export const META = {
  SITE_NAME: "Xtoreverse",
  SITE_URL: "https://xtoreverse.com",
} as const;
