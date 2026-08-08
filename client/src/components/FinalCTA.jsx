import React from "react";
import { motion } from "framer-motion";
import { VideoIcon, UsersIcon, ArrowRightIcon } from "./Icons";
import {
  viewportConfig,
  fadeInUp,
  hoverButton,
  floatingAnimation,
} from "./animations";

const FinalCTA = ({ handleOpenModal }) => {
  return (
    <section className="zm-section zm-final-cta-section">
      {/* Background Ambient Glow Circle */}
      <div className="zm-bg-glow-blob zm-blob-cta-1"></div>

      <div className="zm-container">
        <motion.div
          className="zm-final-cta-card"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          {/* Left Column: Heading, Subtext, Buttons */}
          <div className="zm-final-cta-content">
            <div className="zm-eyebrow-pill zm-eyebrow-pill-dark">
              <span className="zm-eyebrow-dot"></span>
              Get Started Today
            </div>
            <h2 className="zm-final-cta-heading">
              Better Collaboration Starts Here
            </h2>
            <p className="zm-final-cta-subtext">
              Join our engineering teams building faster with zero-friction WebRTC video calls. Available on web, iOS, and Android.
            </p>
            <div className="zm-final-cta-buttons">
              <motion.button
                className="zm-btn-cta-dark"
                onClick={() => handleOpenModal && handleOpenModal("create")}
                {...hoverButton}
              >
                <VideoIcon size={18} />
                <span>Create Room Now</span>
                <ArrowRightIcon size={16} className="zm-btn-arrow-icon" />
              </motion.button>

              <motion.button
                className="zm-btn-cta-outline"
                onClick={() => handleOpenModal && handleOpenModal("join")}
                {...hoverButton}
              >
                <UsersIcon size={18} />
                <span>Join Session</span>
                <ArrowRightIcon size={16} className="zm-btn-arrow-icon" />
              </motion.button>
            </div>
          </div>

          {/* Right Column: Phone Mockup UI with Floating Animation */}
          <div className="zm-final-cta-phone-col">
            <motion.div
              className="zm-final-phone-mockup"
              {...floatingAnimation}
            >
              <div className="zm-final-phone-notch"></div>
              <div className="zm-final-phone-screen">
                <div className="zm-final-phone-user-row">
                  <img
                    src="https://images.unsplash.com/photo-1706712376565-8f0b52a0ed4c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="zm-final-user-avatar"
                  />
                  <div>
                    <div className="zm-final-user-name">Olivia Smith</div>
                    <div className="zm-final-user-status">Online in Room</div>
                  </div>
                </div>

                <div className="zm-final-phone-card">
                  <div className="zm-final-card-title">Optimal Screen Sync</div>

                  {/* Circular Stat Indicator with Stroke Animation */}
                  <div className="zm-final-ring-box">
                    <svg className="zm-final-ring-svg" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="zm-final-ring-bg"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="zm-final-ring-fill"
                        strokeDasharray="251.32"
                        initial={{ strokeDashoffset: 251.32 }}
                        whileInView={{ strokeDashoffset: 30 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="zm-final-ring-text">
                      <span className="zm-final-percent">88%</span>
                      <span className="zm-final-stat-label">Quality</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
