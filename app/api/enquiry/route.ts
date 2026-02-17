import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { validateCustomerEnquiry, validateWarehouseOwnerEnquiry } from "@/lib/validation";
import { Enquiry, ApiResponse } from "@/lib/types";

const ENQUIRIES_DIR = path.join(process.cwd(), "data");
const ENQUIRIES_FILE = path.join(ENQUIRIES_DIR, "enquiries.json");

/**
 * Ensures the data directory and enquiries file exist
 */
async function ensureDataFileExists(): Promise<void> {
  try {
    await fs.mkdir(ENQUIRIES_DIR, { recursive: true });
    try {
      await fs.access(ENQUIRIES_FILE);
    } catch {
      // File doesn't exist, create it
      await fs.writeFile(ENQUIRIES_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error("Error creating data directory:", error);
    throw new Error("Failed to initialize data storage");
  }
}

/**
 * Reads all enquiries from the JSON file
 */
async function readEnquiries(): Promise<Enquiry[]> {
  try {
    const data = await fs.readFile(ENQUIRIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading enquiries:", error);
    return [];
  }
}

/**
 * Writes enquiries to the JSON file
 */
async function writeEnquiries(enquiries: Enquiry[]): Promise<void> {
  try {
    await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2));
  } catch (error) {
    console.error("Error writing enquiries:", error);
    throw new Error("Failed to save enquiry");
  }
}

/**
 * POST handler for enquiry submission
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Ensure data directory and file exist
    await ensureDataFileExists();

    // Parse request body
    const body = await request.json();

    // Validate based on enquiry type
    if (body.type === "customer") {
      const validation = validateCustomerEnquiry(body);
      if (!validation.valid) {
        return NextResponse.json(
          {
            success: false,
            message: "Validation failed",
            error: validation.errors.join(", "),
          } as ApiResponse<null>,
          { status: 400 }
        );
      }
    } else if (body.type === "warehouse-owner") {
      const validation = validateWarehouseOwnerEnquiry(body);
      if (!validation.valid) {
        return NextResponse.json(
          {
            success: false,
            message: "Validation failed",
            error: validation.errors.join(", "),
          } as ApiResponse<null>,
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enquiry type",
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    // Read existing enquiries
    const enquiries = await readEnquiries();

    // Add new enquiry with ID
    const newEnquiry: Enquiry = {
      ...body,
      id: `ENQ-${Date.now()}`,
    };

    enquiries.push(newEnquiry);

    // Write back to file
    await writeEnquiries(enquiries);

    // TODO: Send email notification to admin/team
    // await sendEmailNotification(newEnquiry);

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully",
        data: newEnquiry,
      } as ApiResponse<Enquiry>,
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing enquiry:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error occurred",
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

/**
 * GET handler for retrieving enquiries (admin only - add authentication in production)
 */
export async function GET(): Promise<NextResponse> {
  try {
    await ensureDataFileExists();
    const enquiries = await readEnquiries();

    return NextResponse.json(
      {
        success: true,
        message: "Enquiries retrieved successfully",
        data: enquiries,
      } as ApiResponse<Enquiry[]>,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving enquiries:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve enquiries",
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
