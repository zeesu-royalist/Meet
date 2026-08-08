import React from "react";
import { CheckIcon } from "./Icons";

const Pricing = ({ handleOpenModal }) => {
  return (
    <section className="zm-section zm-pricing-section" id="pricing">
      <div className="zm-container">
        {/* Section Header */}
        <div className="zm-section-center-header">
          <h2 className="zm-center-heading">Simple, Transparent Pricing</h2>
          <p className="zm-center-subtext">
            Choose the plan that fits your engineering journey. Easy online upgrade, cancel anytime with zero friction.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="zm-pricing-grid">
          {/* Card 1: Free Plan */}
          <div className="zm-pricing-card">
            <div className="zm-plan-badge-placeholder"></div>
            <h3 className="zm-plan-name">Free Plan</h3>
            <div className="zm-plan-price-row">
              <span className="zm-price-num">$0</span>
              <span className="zm-price-period">/month</span>
            </div>

            <button
              className="zm-plan-cta-btn zm-btn-light"
              onClick={() => handleOpenModal && handleOpenModal("create")}
            >
              Get Started
            </button>

            <div className="zm-plan-features-list">
              <div className="zm-plan-features-heading">Features</div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>Sub-50ms peer video & audio</span>
              </div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>Unlimited 1-on-1 pairing</span>
              </div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>Basic screen sharing (720p)</span>
              </div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>End-to-End DTLS encryption</span>
              </div>
            </div>
          </div>

          {/* Card 2: Premium Plan (Highlighted with Golden/Amber Gradient) */}
          <div className="zm-pricing-card zm-pricing-card-featured">
            <div className="zm-popular-badge">Most Popular</div>
            <h3 className="zm-plan-name">Premium Plan</h3>
            <div className="zm-plan-price-row">
              <span className="zm-price-num">$20.99</span>
              <span className="zm-price-period">/month</span>
            </div>

            <button
              className="zm-plan-cta-btn zm-btn-dark-hero"
              onClick={() => handleOpenModal && handleOpenModal("create")}
            >
              Start Premium
            </button>

            <div className="zm-plan-features-list">
              <div className="zm-plan-features-heading">Features</div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>Full HD 1080p60 screen sharing</span>
              </div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>Unlimited group rooms (up to 50)</span>
              </div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>Live code workspace & chat</span>
              </div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>Personalized analytics & recordings</span>
              </div>
            </div>
          </div>

          {/* Card 3: Team / Family Plan */}
          <div className="zm-pricing-card">
            <div className="zm-plan-badge-placeholder"></div>
            <h3 className="zm-plan-name">Team Plan</h3>
            <div className="zm-plan-price-row">
              <span className="zm-price-num">$14.99</span>
              <span className="zm-price-period">/user/month</span>
            </div>

            <button
              className="zm-plan-cta-btn zm-btn-light"
              onClick={() => handleOpenModal && handleOpenModal("create")}
            >
              Choose Team
            </button>

            <div className="zm-plan-features-list">
              <div className="zm-plan-features-heading">Features</div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>Everything in Premium</span>
              </div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>Dedicated WebRTC TURN servers</span>
              </div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>Admin controls & SSO</span>
              </div>
              <div className="zm-feature-check-item">
                <CheckIcon size={16} className="zm-check-icon" />
                <span>24/7 Priority engineering support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
