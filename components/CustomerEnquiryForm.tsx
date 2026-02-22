"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { Spinner } from "./Spinner";
import { staggerContainer, staggerItem } from "@/lib/animations";
import {
  validateCustomerEnquiry,
  validateEmail,
  validatePhone,
} from "@/lib/validation";
import { CustomerEnquiry } from "@/lib/types";

interface CustomerFormProps {
  onSubmitSuccess?: () => void;
}

export const CustomerEnquiryForm: React.FC<CustomerFormProps> = ({
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<CustomerEnquiry>>({
    type: "customer",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    requiredLocation: "",
    requiredCapacity: "",
    duration: undefined,
    additionalNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setSubmitMessage("");

    const validation = validateCustomerEnquiry(formData);

    if (!validation.valid) {
      const errorMap: Record<string, string> = {};
      validation.errors.forEach((error) => {
        if (error.includes("Company")) errorMap.companyName = error;
        else if (error.includes("Contact")) errorMap.contactPerson = error;
        else if (error.includes("Email")) errorMap.email = error;
        else if (error.includes("Phone")) errorMap.phone = error;
        else if (error.includes("location")) errorMap.requiredLocation = error;
        else if (error.includes("capacity")) errorMap.requiredCapacity = error;
        else if (error.includes("Duration")) errorMap.duration = error;
      });
      setErrors(errorMap);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(
          "Your warehouse enquiry has been submitted successfully. Our team will contact you within 24 hours."
        );
        setFormData({
          type: "customer",
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          requiredLocation: "",
          requiredCapacity: "",
          duration: undefined,
          additionalNotes: "",
        });
        setErrors({});
        onSubmitSuccess?.();
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.message || "Failed to submit enquiry");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {submitStatus !== "idle" && (
        <motion.div variants={staggerItem}>
          <Alert
            type={submitStatus}
            message={submitMessage}
            onClose={() => setSubmitStatus("idle")}
          />
        </motion.div>
      )}

      <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerItem}>
        <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter your company name"
          required
          error={errors.companyName}
        />

        <Input
          label="Contact Person"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          placeholder="Enter contact person name"
          required
          error={errors.contactPerson}
        />
      </motion.div>

      <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerItem}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          error={errors.email}
        />

        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 97847074543"
          required
          error={errors.phone}
        />
      </motion.div>

      <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerItem}>
        <Input
          label="Required Location"
          name="requiredLocation"
          value={formData.requiredLocation}
          onChange={handleChange}
          placeholder="City/Region"
          required
          error={errors.requiredLocation}
        />

        <Input
          label="Required Capacity (Sq Ft)"
          name="requiredCapacity"
          value={formData.requiredCapacity}
          onChange={handleChange}
          placeholder="e.g., 5000"
          required
          error={errors.requiredCapacity}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Select
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          options={[
            { value: "short-term", label: "Short-term (1-6 months)" },
            { value: "long-term", label: "Long-term (6+ months)" },
          ]}
          required
          error={errors.duration}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Textarea
          label="Additional Requirements"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Describe your specific warehouse requirements, amenities needed, etc..."
          rows={4}
        />
      </motion.div>

      <motion.div
        variants={staggerItem}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          disabled={loading}
          className="!w-full !flex !items-center !justify-center !gap-2 !py-4 !text-lg !bg-cyan-500 !text-white !hover:bg-cyan-600"
        >
          {loading && <Spinner size="sm" />}
          {loading ? "Submitting..." : "Submit Enquiry"}
        </Button>
      </motion.div>
    </motion.form>
  );
};
