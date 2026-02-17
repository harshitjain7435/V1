import type { Metadata } from "next";
import { EnquiryPage } from "@/components/EnquiryPage";

export const metadata: Metadata = {
  title: "Submit Enquiry",
  description:
    "Submit your warehouse enquiry or list your warehouse space on FlexiSpace.",
  openGraph: {
    title: "Submit Enquiry - FlexiSpace",
    description: "Find warehouse space or list your warehouse for rent.",
    url: "https://warehousemarketplace.com/enquiry",
    type: "website",
  },
};

export default function EnquiryRoute() {
  return <EnquiryPage />;
}
