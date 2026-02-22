"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-gray-950 text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid md:grid-cols-4 gap-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              {/* <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                WM
              </div>
              <span>Xtoreverse</span> */}
            </h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Enterprise-grade warehouse marketplace connecting businesses with
              flexible logistics solutions. Built for scale, managed with care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-cyan-400 text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/enquiry"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Submit Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6 text-cyan-400 text-sm uppercase tracking-wide">
              For Customers
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="hover:text-cyan-400 transition-colors duration-200 cursor-pointer">
                Find Warehouse Space
              </li>
              <li className="hover:text-cyan-400 transition-colors duration-200 cursor-pointer">
                Compare Facilities
              </li>
              <li className="hover:text-cyan-400 transition-colors duration-200 cursor-pointer">
                Get Competitive Quotes
              </li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h4 className="font-semibold mb-6 text-cyan-400 text-sm uppercase tracking-wide">
              For Owners
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="hover:text-cyan-400 transition-colors duration-200 cursor-pointer">
                List Your Space
              </li>
              <li className="hover:text-cyan-400 transition-colors duration-200 cursor-pointer">
                Manage Listings
              </li>
              <li className="hover:text-cyan-400 transition-colors duration-200 cursor-pointer">
                Monitor Inquiries
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-12 mt-12">
          {/* Contact Info */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <h4 className="font-semibold mb-3 text-sm text-cyan-400 uppercase tracking-wide">
                Email
              </h4>
              <a
                href="mailto:support@xtoreverse.com"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-light"
              >
                support@xtoreverse.com
              </a>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <h4 className="font-semibold mb-3 text-sm text-cyan-400 uppercase tracking-wide">
                Phone
              </h4>
              <a
                href="tel:+91 97847074543"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-light"
              >
                +91 97847074543
              </a>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <h4 className="font-semibold mb-3 text-sm text-cyan-400 uppercase tracking-wide">
                Address
              </h4>
              <p className="text-gray-300 text-sm font-light">
                403, Grace Chambers, Near Gurudwara, <br/>
                Chakala, Andheri East, Mumbai
              </p>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              © {currentYear} Xtoreverse. All rights reserved. | Enterprise
              Warehouse Marketplace
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
