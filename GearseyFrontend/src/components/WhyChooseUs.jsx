import React from "react";
import {
  Shield,
  CheckCircle,
  Truck,
  Headphones,
  Users,
  Package,
  Store,
  MapPin,
  Star,
} from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Buyer Protection",
      description: "100% secure transactions with money-back guarantee",
      color: "text-primary-500",
    },
    {
      icon: CheckCircle,
      title: "Verified Sellers",
      description: "All sellers undergo strict verification process",
      color: "text-tertiary-500",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick shipping across Pakistan with tracking",
      color: "text-secondary-500",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service assistance",
      color: "text-warning-500",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Happy Customers",
      color: "text-primary-500",
    },
    {
      icon: Package,
      value: "2M+",
      label: "Parts Sold",
      color: "text-tertiary-500",
    },
    {
      icon: Store,
      value: "5,000+",
      label: "Verified Sellers",
      color: "text-secondary-500",
    },
    {
      icon: MapPin,
      value: "100+",
      label: "Cities Covered",
      color: "text-error-500",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-tl from-bg via-surface/30 to-bg overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#495061 1px, transparent 1px), linear-gradient(90deg, #495061 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-black text-font-main mb-4">
            Why Choose <span className="text-secondary-500">Gearsey</span>?
          </h2>
          <p className="text-lg md:text-xl text-font-secondary max-w-3xl mx-auto">
            Pakistan's most trusted automotive parts marketplace with verified
            sellers and guaranteed quality
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-surface rounded-xl p-6 border border-border hover:border-primary-500 transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-font-main mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-font-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16"></div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-surface-elevated rounded-xl p-6 border border-border text-center animate-scale-in"
                style={{
                  animationDelay: `${0.4 + index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <Icon size={32} className={`${stat.color} mx-auto mb-3`} />
                <div className="text-3xl md:text-4xl font-black text-font-main mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-font-secondary font-semibold">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial */}
        <div
          className="max-w-4xl mx-auto bg-gradient-to-br from-surface to-surface-elevated rounded-2xl p-8 md:p-12 border border-border shadow-2xl animate-slide-up"
          style={{
            animationDelay: "0.8s",
            animationFillMode: "both",
          }}
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className="text-secondary-500 fill-secondary-500"
              />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-center mb-6">
            <p className="text-lg md:text-xl text-font-main leading-relaxed italic">
              "Gearsey has revolutionized how I source parts for my workshop.
              The quality is guaranteed, delivery is fast, and the prices are
              unbeatable. My customers are happier than ever!"
            </p>
          </blockquote>

          {/* Author */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-tertiary-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-black text-white">MA</span>
            </div>
            <p className="text-font-secondary font-semibold">
              — Muhammad Ahmed, Auto Mechanic, Karachi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
