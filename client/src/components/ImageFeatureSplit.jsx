import React from "react";
import { motion } from "framer-motion";
import {
  ClockIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  ZapIcon,
  VideoIcon,
} from "./Icons";
import {
  viewportConfig,
  staggerContainer,
  fadeInUp,
  fadeInLeft,
  scaleIn,
} from "./animations";

const rightFeatures = [
  {
    icon: <ClockIcon size={18} />,
    title: "Track Session Time",
    description: "Monitor your session duration, frame rates, and active pairing time.",
  },
  {
    icon: <TrendingUpIcon size={18} />,
    title: "Analyze Your Latency",
    description: "Real-time WebRTC pings measure peer route health for zero delay.",
  },
  {
    icon: <ShieldCheckIcon size={18} />,
    title: "Set Focus Goals",
    description: "Mute background chatter and concentrate on pair programming tasks.",
  },
  {
    icon: <ZapIcon size={18} />,
    title: "Build Stronger Habits",
    description: "Maintain consistent daily standups and agile pairing sessions.",
  },
];

const ImageFeatureSplit = () => {
  return (
    <section className="zm-section zm-image-split-section">
      <div className="zm-container">
        <div className="zm-image-split-grid">
          {/* Left Column: Image with Gradient Overlay Label Card */}
          <motion.div
            className="zm-split-image-col"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInLeft}
          >
            <div className="zm-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Engineering Team Collaborating"
                className="zm-split-img"
              />
              <motion.div
                className="zm-image-overlay-card"
                variants={scaleIn}
              >
                <div className="zm-overlay-badge">
                  <VideoIcon size={16} stroke="#ffffff" />
                </div>
                <h3>How ZeesuMeet Builds Habits</h3>
                <p>
                  Build seamless video pairing habits with our zero-download workspace and instant room links every single day.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: 2x2 Feature List Grid */}
          <motion.div
            className="zm-split-features-col"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            <div className="zm-split-features-grid">
              {rightFeatures.map((feat, idx) => (
                <motion.div
                  key={idx}
                  className="zm-split-feature-item"
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="zm-split-feature-icon-badge"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feat.icon}
                  </motion.div>
                  <h4 className="zm-split-feature-title">{feat.title}</h4>
                  <p className="zm-split-feature-desc">{feat.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImageFeatureSplit;
