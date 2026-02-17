"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs } from "./Tabs";
import { CustomerEnquiryForm } from "./CustomerEnquiryForm";
import { WarehouseOwnerEnquiryForm } from "./WarehouseOwnerEnquiryForm";
import { Card } from "./Card";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export const EnquiryPage: React.FC = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const tabs = [
    {
      id: "customer",
      label: "Need Warehouse Space",
      content: (
        <CustomerEnquiryForm
          onSubmitSuccess={() => setSubmitSuccess(true)}
        />
      ),
    },
    {
      id: "owner",
      label: "List Your Warehouse",
      content: (
        <WarehouseOwnerEnquiryForm
          onSubmitSuccess={() => setSubmitSuccess(true)}
        />
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        className="mb-12"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Submit Your Enquiry
        </h1>
        <p className="text-xl text-gray-600 font-light">
          Whether you need warehouse space or want to list yours, our
          enterprise-grade platform connects you seamlessly.
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Card className="card-premium">
          <Tabs tabs={tabs} defaultTab="customer" />
        </Card>
      </motion.div>

      {submitSuccess && (
        <motion.div
          className="mt-8 p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 40 }}
            className="mb-3 text-3xl"
          >
            ✓
          </motion.div>
          <h2 className="font-bold text-2xl text-green-900 mb-3">Thank You!</h2>
          <p className="text-green-800 font-light text-lg">
            Your enquiry has been received successfully. Our enterprise team will
            contact you shortly to discuss your requirements and propose tailored
            solutions.
          </p>
        </motion.div>
      )}

      {/* Contact Info Section */}
      <motion.div
        className="mt-16 grid md:grid-cols-2 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200"
          variants={staggerItem}
          whileHover={{ y: -4 }}
        >
          <h3 className="font-bold text-lg text-gray-900 mb-3">Have Questions?</h3>
          <p className="text-gray-600 mb-6 font-light">
            Our enterprise support team is available to assist you with any
            enquiries or technical questions.
          </p>
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-semibold text-gray-900">Email:</span>
              <br />
              <a
                href="mailto:support@warehousemarketplace.com"
                className="text-cyan-500 hover:text-cyan-600 transition-colors font-medium"
              >
                support@warehousemarketplace.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-gray-900">Phone:</span>
              <br />
              <a
                href="tel:+1234567890"
                className="text-cyan-500 hover:text-cyan-600 transition-colors font-medium"
              >
                +1 (234) 567-890
              </a>
            </p>
            <p>
              <span className="font-semibold text-gray-900">Hours:</span>
              <br />
              <span className="text-gray-600">Mon-Fri 9AM-6PM EST</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200"
          variants={staggerItem}
          whileHover={{ y: -4 }}
        >
          <h3 className="font-bold text-lg text-gray-900 mb-6">
            Why Submit an Enquiry?
          </h3>
          <ul className="space-y-4">
            {[
              "Get matched with verified warehouse solutions",
              "Connect with pre-screened enterprise partners",
              "Secure competitive pricing and flexible terms",
              "Access dedicated account management support",
            ].map((benefit, idx) => (
              <motion.li
                key={idx}
                className="flex gap-3 items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-cyan-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="text-gray-700 font-light">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};
