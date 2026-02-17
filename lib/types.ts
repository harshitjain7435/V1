export interface CustomerEnquiry {
  id?: string;
  type: "customer";
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  requiredLocation: string;
  requiredCapacity: string;
  duration: "short-term" | "long-term";
  additionalNotes: string;
  submittedAt: string;
}

export interface WarehouseOwnerEnquiry {
  id?: string;
  type: "warehouse-owner";
  warehouseName: string;
  ownerName: string;
  email: string;
  phone: string;
  warehouseLocation: string;
  totalCapacity: string;
  type_of_warehouse: "cold" | "general" | "industrial";
  description: string;
  submittedAt: string;
}

export type Enquiry = CustomerEnquiry | WarehouseOwnerEnquiry;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
