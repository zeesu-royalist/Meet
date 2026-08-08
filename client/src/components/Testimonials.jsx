import React from "react";
import { motion } from "framer-motion";
import {
  viewportConfig,
  staggerContainer,
  fadeInUp,
} from "./animations";

const Testimonials = () => {
  return (
    <section className="zm-section zm-testimonials-section" id="testimonials">
      <div className="zm-container">
        {/* Header Row */}
        <motion.div
          className="zm-testimonials-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <div className="zm-testimonials-header-left">
            <div className="zm-eyebrow-pill">
              <span className="zm-eyebrow-dot"></span>
              Wall of Love
            </div>
            <h2 className="zm-testimonials-heading">
              Empowering Thousands <br />
              Through Better Real-Time Sync
            </h2>
          </div>
          <div className="zm-testimonials-header-right">
            <p className="zm-testimonials-subtitle">
              ZeesuMeet helps developers, engineering leads, and peer coders improve focus and build seamless real-time video habits with personalized room insights.
            </p>
          </div>
        </motion.div>

        {/* Masonry / Grid Layout matching reference image */}
        <motion.div
          className="zm-testimonials-masonry-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Top-Left Card: Text Quote */}
          <motion.div
            className="zm-t-card zm-t-card-text"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <span className="zm-quote-watermark">“</span>
            <div className="zm-t-author-row">
              <img
                src="https://images.unsplash.com/photo-1758598304200-f89a1d8ebedb?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Emily Carter"
                className="zm-t-avatar"
              />
              <div>
                <div className="zm-t-author-name">Emily Carter</div>
                <div className="zm-t-author-role">Marketing Manager</div>
              </div>
            </div>
            <p className="zm-t-quote">
              "ZeesuMeet transformed our daily standups. From real-time screen shares to instant video notes, it keeps our team focused and aligned in one place."
            </p>
          </motion.div>

          {/* Center Column: Large Vertical Photo Card */}
          <motion.div
            className="zm-t-card zm-t-card-photo zm-t-center-photo"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1661541247532-a06915d0d3ab?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Jessica Watson"
              className="zm-t-full-img"
            />
            <motion.div
              className="zm-t-photo-overlay-badge"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
                alt="Jessica Watson Avatar"
                className="zm-t-mini-avatar"
              />
              <div>
                <div className="zm-t-overlay-name">Jessica Watson</div>
                <div className="zm-t-overlay-role">University Student</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Top-Right Card: Text Quote */}
          <motion.div
            className="zm-t-card zm-t-card-text"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <span className="zm-quote-watermark">“</span>
            <div className="zm-t-author-row">
              <img
                src="https://images.unsplash.com/photo-1642736468716-cc5836558a74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="David Chen"
                className="zm-t-avatar"
              />
              <div>
                <div className="zm-t-author-name">David Chen</div>
                <div className="zm-t-author-role">Product Designer</div>
              </div>
            </div>
            <p className="zm-t-quote">
              "Direct WebRTC audio and glass-like screen clarity. It feels like standing right next to my teammate in front of a physical whiteboard."
            </p>
          </motion.div>

          {/* Bottom-Left Photo Card */}
          <motion.div
            className="zm-t-card zm-t-card-photo"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src="https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Michael Green"
              className="zm-t-full-img"
            />
            <motion.div
              className="zm-t-photo-overlay-badge"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
                alt="Michael Green Avatar"
                className="zm-t-mini-avatar"
              />
              <div>
                <div className="zm-t-overlay-name">Michael Green</div>
                <div className="zm-t-overlay-role">Lead Developer</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom-Right Photo Card */}
          <motion.div
            className="zm-t-card zm-t-card-photo"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src="https://images.unsplash.com/photo-1628645339131-0c39c7527856?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sophia Williams"
              className="zm-t-full-img"
            />
            <motion.div
              className="zm-t-photo-overlay-badge"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop"
                alt="Sophia Williams Avatar"
                className="zm-t-mini-avatar"
              />
              <div>
                <div className="zm-t-overlay-name">Sophia Williams</div>
                <div className="zm-t-overlay-role">Senior Frontend Engineer</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
