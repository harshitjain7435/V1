import { CustomerEnquiry, WarehouseOwnerEnquiry } from "./types";

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function validateCustomerEnquiry(
  data: Partial<CustomerEnquiry>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.companyName?.trim()) {
    errors.push("Company name is required");
  }

  if (!data.contactPerson?.trim()) {
    errors.push("Contact person is required");
  }

  if (!data.email?.trim()) {
    errors.push("Email is required");
  } else if (!validateEmail(data.email)) {
    errors.push("Email format is invalid");
  }

  if (!data.phone?.trim()) {
    errors.push("Phone number is required");
  } else if (!validatePhone(data.phone)) {
    errors.push("Phone number format is invalid");
  }

  if (!data.requiredLocation?.trim()) {
    errors.push("Required location is required");
  }

  if (!data.requiredCapacity?.trim()) {
    errors.push("Required capacity is required");
  }

  if (!data.duration) {
    errors.push("Duration is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateWarehouseOwnerEnquiry(
  data: Partial<WarehouseOwnerEnquiry>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.warehouseName?.trim()) {
    errors.push("Warehouse name is required");
  }

  if (!data.ownerName?.trim()) {
    errors.push("Owner name is required");
  }

  if (!data.email?.trim()) {
    errors.push("Email is required");
  } else if (!validateEmail(data.email)) {
    errors.push("Email format is invalid");
  }

  if (!data.phone?.trim()) {
    errors.push("Phone number is required");
  } else if (!validatePhone(data.phone)) {
    errors.push("Phone number format is invalid");
  }

  if (!data.warehouseLocation?.trim()) {
    errors.push("Warehouse location is required");
  }

  if (!data.totalCapacity?.trim()) {
    errors.push("Total capacity is required");
  }

  if (!data.type_of_warehouse) {
    errors.push("Warehouse type is required");
  }

  if (!data.description?.trim()) {
    errors.push("Description is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
