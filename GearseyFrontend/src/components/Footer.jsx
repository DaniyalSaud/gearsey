import React from "react";
import { NavLink } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Mail,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-elevated border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-tertiary-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-black text-white">G</span>
              </div>
              <span className="text-2xl font-black text-font-main">
                Gearsey
              </span>
            </div>
            <p className="text-font-secondary text-sm leading-relaxed mb-6">
              Pakistan's most trusted automotive parts marketplace connecting
              buyers with verified sellers.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Github, href: "#", label: "Github" },
                { Icon: Mail, href: "#", label: "mail" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-surface hover:bg-primary-500 border border-border hover:border-primary-500 rounded-lg flex items-center justify-center transition-all group"
                >
                  <Icon
                    size={18}
                    className="text-font-secondary group-hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-font-main font-bold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Browse Parts", to: "/filter" },
                { label: "Live Auctions", to: "/auctions" },
                { label: "Become a Seller", to: "/sell" },
                { label: "My Account", to: "/dashboard" },
              ].map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className="text-font-secondary hover:text-secondary-500 transition-colors text-sm block"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-font-main font-bold text-lg mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Engine Parts", category: "engines" },
                { label: "Brake System", category: "suspension" },
                { label: "Lighting", category: "electrical" },
                { label: "Body Parts", category: "body" },
              ].map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={`/filter?category=${link.category}`}
                    className="text-font-secondary hover:text-tertiary-500 transition-colors text-sm block"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-font-main font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {[
                { label: "Help Center", to: "/help" },
                { label: "Contact Us", to: "/contact" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms of Service", to: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className="text-font-secondary hover:text-primary-500 transition-colors text-sm block"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-font-secondary text-sm">
              © {currentYear} Gearsey. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-font-secondary text-sm">
                Secure payments powered by
              </span>
              <div className="flex items-center gap-3">
                {["JazzCash", "Easypaisa", "Bank Transfer"].map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1.5 bg-surface border border-border rounded text-xs font-semibold text-font-main"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
