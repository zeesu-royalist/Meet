import React from "react";
import { motion } from "framer-motion";
import { CheckIcon, ArrowRightIcon } from "./Icons";
import {
  viewportConfig,
  staggerContainer,
  fadeInUp,
  hoverButton,
} from "./animations";

const Pricing = ({ handleOpenModal }) => {
  return (
    <section className="zm-section zm-pricing-section" id="pricing">
      {/* Background Ambient Glow Circles */}
      <div className="zm-bg-glow-blob zm-blob-pricing-1"></div>
      <div className="zm-bg-glow-blob zm-blob-pricing-2"></div>

      <div className="zm-container">
        {/* Section Header */}
        <motion.div
          className="zm-section-center-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <div className="zm-eyebrow-pill">
            <span className="zm-eyebrow-dot"></span>
            Flexible Plans
          </div>
          <h2 className="zm-center-heading">Simple, Transparent Pricing</h2>
          <p className="zm-center-subtext">
            Choose the plan that fits your engineering journey. Easy online upgrade, cancel anytime with zero friction.
          </p>
        </motion.div>

        {/* 3 Pricing Cards Container */}
        <motion.div
          className="zm-pricing-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Card 1: Free Plan */}
          <motion.div
            className="zm-pricing-card"
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="zm-plan-badge-placeholder"></div>
            <h3 className="zm-plan-name">Free Plan</h3>
            <div className="zm-plan-price-row">
              <span className="zm-price-num">$0</span>
              <span className="zm-price-period">/month</span>
            </div>

            <motion.button
              className="zm-plan-cta-btn zm-btn-light"
              onClick={() => handleOpenModal && handleOpenModal("create")}
              {...hoverButton}
            >
              <span>Get Started</span>
              <ArrowRightIcon size={16} className="zm-btn-arrow-icon" />
            </motion.button>

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
          </motion.div>

          {/* Card 2: Premium Plan (Featured) */}
          <motion.div
            className="zm-pricing-card zm-pricing-card-featured"
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.04 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="zm-popular-badge"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Most Popular
            </motion.div>
            <h3 className="zm-plan-name">Premium Plan</h3>
            <div className="zm-plan-price-row">
              <span className="zm-price-num">$20.99</span>
              <span className="zm-price-period">/month</span>
            </div>

            <motion.button
              className="zm-plan-cta-btn zm-btn-dark-hero"
              onClick={() => handleOpenModal && handleOpenModal("create")}
              {...hoverButton}
            >
              <span>Start Premium</span>
              <ArrowRightIcon size={16} className="zm-btn-arrow-icon" />
            </motion.button>

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
          </motion.div>

          {/* Card 3: Team Plan */}
          <motion.div
            className="zm-pricing-card"
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="zm-plan-badge-placeholder"></div>
            <h3 className="zm-plan-name">Team Plan</h3>
            <div className="zm-plan-price-row">
              <span className="zm-price-num">$14.99</span>
              <span className="zm-price-period">/user/month</span>
            </div>

            <motion.button
              className="zm-plan-cta-btn zm-btn-light"
              onClick={() => handleOpenModal && handleOpenModal("create")}
              {...hoverButton}
            >
              <span>Choose Team</span>
              <ArrowRightIcon size={16} className="zm-btn-arrow-icon" />
            </motion.button>

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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
