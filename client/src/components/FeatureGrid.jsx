import React from "react";
import { motion } from "framer-motion";
import {
  UsersIcon,
  CodeIcon,
  ZapIcon,
  VideoIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "./Icons";
import {
  viewportConfig,
  staggerContainer,
  fadeInUp,
} from "./animations";

const features = [
  {
    icon: <UsersIcon size={20} />,
    title: "Live Cursors & Presence",
    description: "Track peer focus, active selections, and live member presence in your shared room.",
  },
  {
    icon: <CodeIcon size={20} />,
    title: "Multi-User Editing",
    description: "Collaborate simultaneously on code, sprint documents, and whiteboard canvases with zero friction.",
  },
  {
    icon: <ZapIcon size={20} />,
    title: "Instant WebRTC Sync",
    description: "Sub-50ms glass-to-glass latency with direct P2P data channels built for pair programming.",
  },
  {
    icon: <VideoIcon size={20} />,
    title: "Smart Audio & Video",
    description: "Adaptive background noise suppression and crystal-clear 1080p60 screen sharing.",
  },
  {
    icon: <ClockIcon size={20} />,
    title: "Version History",
    description: "Revisit past session code snapshots and session recordings with automated time-travel notes.",
  },
  {
    icon: <ShieldCheckIcon size={20} />,
    title: "End-to-End Encryption",
    description: "DTLS-SRTP protocols guarantee your stream channels and shared assets remain 100% private.",
  },
];

const FeatureGrid = () => {
  return (
    <section className="zm-section zm-feature-grid-section">
      <div className="zm-container">
        <motion.div
          className="zm-feature-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="zm-feature-card"
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <motion.div
                className="zm-feature-icon-badge"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="zm-feature-title">{feature.title}</h3>
              <p className="zm-feature-desc">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;
