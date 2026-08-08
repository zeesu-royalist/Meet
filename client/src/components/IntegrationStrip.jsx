import React from "react";
import { motion } from "framer-motion";
import {
  GithubIcon,
  CodeIcon,
  SparklesIcon,
  ZapIcon,
  LayoutGridIcon,
} from "./Icons";
import {
  viewportConfig,
  staggerContainer,
  fadeInUp,
} from "./animations";

const partners = [
  { icon: <CodeIcon size={20} />, name: "VS Code" },
  { icon: <GithubIcon size={20} />, name: "GitHub" },
  { icon: <SparklesIcon size={20} />, name: "Vercel" },
  { icon: <ZapIcon size={20} />, name: "Linear" },
  { icon: <LayoutGridIcon size={20} />, name: "Figma" },
];

const IntegrationStrip = () => {
  return (
    <section className="zm-section zm-integration-section">
      <div className="zm-container">
        <motion.div
          className="zm-integration-strip-card"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <div className="zm-integration-label-col">
            <span className="zm-integration-label">
              Compatible With 10+ Platforms & Tools
            </span>
          </div>
          <motion.div
            className="zm-integration-logos-row"
            variants={staggerContainer}
          >
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                className="zm-partner-logo"
                variants={fadeInUp}
                whileHover={{ scale: 1.12, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {partner.icon}
                <span>{partner.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationStrip;
