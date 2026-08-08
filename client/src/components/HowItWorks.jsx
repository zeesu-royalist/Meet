import React from "react";
import { motion } from "framer-motion";
import {
  ZapIcon,
  ArrowUpRightIcon,
  CodeIcon,
  ScreenShareIcon,
  MicIcon,
  ShieldCheckIcon,
  ClockIcon,
  UsersIcon,
} from "./Icons";
import {
  viewportConfig,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
} from "./animations";

const HowItWorks = () => {
  return (
    <section className="zm-section zm-how-it-works-section" id="solutions">
      {/* Background Ambient Glow Circle */}
      <div className="zm-bg-glow-blob zm-blob-hub-1"></div>

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
            Unified Hub
          </div>
          <h2 className="zm-center-heading">Better Tools, Smarter Insights</h2>
          <p className="zm-center-subtext">
            ZeesuMeet seamlessly connects your local workspace, browser feeds, and communication channels into one unified WebRTC real-time sync hub.
          </p>
        </motion.div>

        {/* Diagram Card Container */}
        <motion.div
          className="zm-hub-diagram-card"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <div className="zm-hub-diagram-grid">
            {/* Left Box - 3 Items */}
            <motion.div
              className="zm-hub-side-card"
              variants={fadeInLeft}
            >
              <motion.div className="zm-hub-item" whileHover={{ scale: 1.02, x: 4 }}>
                <div className="zm-hub-item-icon">
                  <ScreenShareIcon size={16} />
                </div>
                <span>Your Screen & IDE</span>
              </motion.div>

              <motion.div className="zm-hub-item" whileHover={{ scale: 1.02, x: 4 }}>
                <div className="zm-hub-item-icon">
                  <CodeIcon size={16} />
                </div>
                <span>Live Code Editor</span>
              </motion.div>

              <motion.div className="zm-hub-item" whileHover={{ scale: 1.02, x: 4 }}>
                <div className="zm-hub-item-icon">
                  <MicIcon size={16} />
                </div>
                <span>HD Audio Streams</span>
              </motion.div>
            </motion.div>

            {/* Middle Connecting Hub */}
            <div className="zm-hub-center-connector">
              <svg className="zm-connector-lines" viewBox="0 0 160 120">
                {/* Curved paths from Left to Center */}
                <motion.path
                  d="M 0 30 Q 50 30, 80 60"
                  stroke="#7663e8"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 4"
                  className="zm-line-anim"
                />
                <motion.path
                  d="M 0 60 L 80 60"
                  stroke="#7663e8"
                  strokeWidth="2.5"
                  fill="none"
                />
                <motion.path
                  d="M 0 90 Q 50 90, 80 60"
                  stroke="#7663e8"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 4"
                  className="zm-line-anim"
                />

                {/* Curved paths from Center to Right */}
                <motion.path
                  d="M 80 60 Q 110 30, 160 30"
                  stroke="#7663e8"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 4"
                  className="zm-line-anim"
                />
                <motion.path
                  d="M 80 60 L 160 60"
                  stroke="#7663e8"
                  strokeWidth="2.5"
                  fill="none"
                />
                <motion.path
                  d="M 80 60 Q 110 90, 160 90"
                  stroke="#7663e8"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 4"
                  className="zm-line-anim"
                />
              </svg>

              {/* Glowing Center Badge with Pulse Animation */}
              <div className="zm-hub-center-badge">
                <motion.div
                  className="zm-hub-glow"
                  animate={{
                    scale: [1, 1.18, 1],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.div>
                <motion.div
                  className="zm-hub-badge-inner"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <ZapIcon size={24} />
                </motion.div>
              </div>
            </div>

            {/* Right Box - 3 Items */}
            <motion.div
              className="zm-hub-side-card"
              variants={fadeInRight}
            >
              <motion.div className="zm-hub-item" whileHover={{ scale: 1.02, x: -4 }}>
                <div className="zm-hub-item-icon">
                  <ShieldCheckIcon size={16} />
                </div>
                <span>Smart Encryption</span>
              </motion.div>

              <motion.div className="zm-hub-item" whileHover={{ scale: 1.02, x: -4 }}>
                <div className="zm-hub-item-icon">
                  <ClockIcon size={16} />
                </div>
                <span>Latency Inspector</span>
              </motion.div>

              {/* Highlighted Item with Arrow Badge */}
              <motion.div
                className="zm-hub-item zm-hub-item-highlight"
                whileHover={{ scale: 1.03, x: -4 }}
              >
                <div className="zm-hub-item-icon zm-icon-highlight">
                  <UsersIcon size={16} />
                </div>
                <span>Peer Data Channels</span>
                <motion.div
                  className="zm-item-arrow-badge"
                  whileHover={{ rotate: 45 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowUpRightIcon size={14} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
