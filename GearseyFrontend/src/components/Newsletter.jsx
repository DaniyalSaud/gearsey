import React, { useState } from "react";
import {
  Bell,
  Tag,
  TrendingUp,
  Wrench,
  Mail,
  Users,
  Star,
  ShieldCheck,
  Send,
} from "lucide-react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const benefits = [
    {
      icon: Bell,
      text: "Get notified about new auctions and rare parts",
      color: "text-warning-500",
    },
    {
      icon: Tag,
      text: "Exclusive discounts and early access to sales",
      color: "text-secondary-500",
    },
    {
      icon: TrendingUp,
      text: "Weekly market trends and price insights",
      color: "text-primary-500",
    },
    {
      icon: Wrench,
      text: "Expert tips and maintenance guides",
      color: "text-tertiary-500",
    },
  ];

  const trustIndicators = [
    {
      icon: Users,
      text: "10,000+ subscribers",
      color: "text-tertiary-500",
    },
    {
      icon: Star,
      text: "4.9/5 rating",
      color: "text-secondary-500",
    },
    {
      icon: ShieldCheck,
      text: "No spam guarantee",
      color: "text-success-500",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };

  return (
    <section className="relative py-10 bg-surface overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#495061 1px, transparent 1px), linear-gradient(90deg, #495061 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-tertiary-500/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="relative z-10 max-w-4xl max-h-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-elevated rounded-2xl border border-border shadow-2xl p-8 md:p-12 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full mb-4">
              <Mail size={18} className="text-secondary-500" />
              <span className="text-sm font-semibold text-font-secondary">
                Newsletter
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-font-main mb-3">
              Stay Updated with{" "}
              <span className="text-secondary-500">Gearsey</span>
            </h2>
            <p className="text-lg text-font-secondary max-w-2xl mx-auto">
              Join 10,000+ automotive enthusiasts and get the latest parts,
              auctions, and deals delivered to your inbox
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border/50 hover:border-primary-500/50 transition-all"
                >
                  <Icon
                    size={20}
                    className={`${benefit.color} mt-0.5 flex-shrink-0`}
                  />
                  <span className="text-sm text-font-secondary">
                    {benefit.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Subscribe Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isSubscribed}
                className="flex-1 px-5 py-3.5 bg-surface border border-border rounded-lg text-font-main placeholder:text-font-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting || isSubscribed}
                className={`px-8 py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                  isSubscribed
                    ? "bg-success-500 text-white"
                    : "bg-primary-500 hover:bg-primary-700 text-white active:scale-95"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </>
                ) : isSubscribed ? (
                  <>
                    <ShieldCheck size={20} />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Privacy Notice */}
          <p className="text-center text-xs text-font-secondary/70 mb-6">
            We respect your privacy. Unsubscribe at any time.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-border">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <Icon size={18} className={indicator.color} />
                  <span className="text-sm font-semibold text-font-secondary">
                    {indicator.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
