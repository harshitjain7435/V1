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
  validateWarehouseOwnerEnquiry,
  validateEmail,
  validatePhone,
} from "@/lib/validation";
import { WarehouseOwnerEnquiry } from "@/lib/types";

interface WarehouseOwnerFormProps {
  onSubmitSuccess?: () => void;
}

export const WarehouseOwnerEnquiryForm: React.FC<WarehouseOwnerFormProps> = ({
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<WarehouseOwnerEnquiry>>({
    type: "warehouse-owner",
    warehouseName: "",
    ownerName: "",
    email: "",
    phone: "",
    warehouseLocation: "",
    totalCapacity: "",
    type_of_warehouse: undefined,
    description: "",
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

    const validation = validateWarehouseOwnerEnquiry(formData);

    if (!validation.valid) {
      const errorMap: Record<string, string> = {};
      validation.errors.forEach((error) => {
        if (error.includes("Warehouse name")) errorMap.warehouseName = error;
        else if (error.includes("Owner")) errorMap.ownerName = error;
        else if (error.includes("Email")) errorMap.email = error;
        else if (error.includes("Phone")) errorMap.phone = error;
        else if (error.includes("location")) errorMap.warehouseLocation = error;
        else if (error.includes("capacity")) errorMap.totalCapacity = error;
        else if (error.includes("type")) errorMap.type_of_warehouse = error;
        else if (error.includes("Description")) errorMap.description = error;
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
          "Your warehouse listing has been submitted successfully! Our team will review and contact you within 24 hours to confirm."
        );
        setFormData({
          type: "warehouse-owner",
          warehouseName: "",
          ownerName: "",
          email: "",
          phone: "",
          warehouseLocation: "",
          totalCapacity: "",
          type_of_warehouse: undefined,
          description: "",
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
          label="Warehouse Name"
          name="warehouseName"
          value={formData.warehouseName}
          onChange={handleChange}
          placeholder="Enter warehouse name"
          required
          error={errors.warehouseName}
        />

        <Input
          label="Owner Name"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          placeholder="Your name"
          required
          error={errors.ownerName}
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
          placeholder="+123456789"
          required
          error={errors.phone}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Input
          label="Warehouse Location"
          name="warehouseLocation"
          value={formData.warehouseLocation}
          onChange={handleChange}
          placeholder="City/Address"
          required
          error={errors.warehouseLocation}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Input
          label="Total Capacity (Sq Ft)"
          name="totalCapacity"
          value={formData.totalCapacity}
          onChange={handleChange}
          placeholder="e.g., 10000"
          required
          error={errors.totalCapacity}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Select
          label="Warehouse Type"
          name="type_of_warehouse"
          value={formData.type_of_warehouse}
          onChange={handleChange}
          options={[
            { value: "general", label: "General Storage" },
            { value: "cold", label: "Cold Storage" },
            { value: "industrial", label: "Industrial" },
          ]}
          required
          error={errors.type_of_warehouse}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your warehouse, amenities, parking, loading facilities, climate control, etc..."
          rows={5}
          required
          error={errors.description}
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
          {loading ? "Submitting..." : "List Your Warehouse"}
        </Button>
      </motion.div>
    </motion.form>
  );
};
