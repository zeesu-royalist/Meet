import React from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  VideoIcon,
  CodeIcon,
  GithubIcon,
  ClockIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  UsersIcon,
} from "./Icons";
import {
  viewportConfig,
  staggerContainer,
  fadeInUp,
  floatingAnimation,
} from "./animations";

const BentoFeatures = () => {
  return (
    <section className="zm-section zm-bento-section" id="features">
      <div className="zm-container">
        {/* Section Header */}
        <motion.div
          className="zm-bento-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <div className="zm-bento-header-left">
            <div className="zm-eyebrow-pill">
              <span className="zm-eyebrow-dot"></span>
              Powerful Features
            </div>
            <h2 className="zm-bento-main-heading">
              Everything You Need for <br />
              Seamless Team Collaboration
            </h2>
          </div>
          <div className="zm-bento-header-right">
            <p className="zm-bento-subtitle">
              ZeesuMeet combines real-time video, instant code sync, and interactive sprint tools to help engineering teams connect faster and stay in sync every day.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="zm-bento-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Large Left Card - Phone Mockup with Circular Progress */}
          <motion.div
            className="zm-bento-card zm-bento-card-large-hero"
            variants={fadeInUp}
          >
            <div className="zm-bento-hero-text">
              <h3>Stay Focused, Stay Present</h3>
              <p>
                Experience ultra-low latency WebRTC streaming and real-time sprint tracking right on your browser or mobile screen.
              </p>
            </div>

            {/* Mobile Phone Mockup with Floating Animation */}
            <motion.div
              className="zm-phone-mockup-wrapper"
              {...floatingAnimation}
            >
              <div className="zm-phone-frame">
                <div className="zm-phone-notch"></div>
                <div className="zm-phone-content">
                  <div className="zm-phone-header">
                    <span className="zm-phone-app-name">ZeesuMeet Room</span>
                    <span className="zm-phone-status-dot"></span>
                  </div>

                  <div className="zm-phone-stat-title">Pairing Session</div>

                  {/* Circular Progress Ring with Animated Stroke */}
                  <div className="zm-circular-progress-box">
                    <svg className="zm-progress-svg" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        className="zm-progress-bg"
                      />
                      <motion.circle
                        cx="60"
                        cy="60"
                        r="48"
                        className="zm-progress-fill"
                        strokeDasharray="301.59"
                        initial={{ strokeDashoffset: 301.59 }}
                        whileInView={{ strokeDashoffset: 45 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="zm-progress-inner-text">
                      <span className="zm-progress-num">18:45</span>
                      <span className="zm-progress-label">Active Time</span>
                    </div>
                  </div>

                  <div className="zm-phone-badges-row">
                    <div className="zm-phone-badge">
                      <VideoIcon size={12} /> 1080p60
                    </div>
                    <div className="zm-phone-badge zm-phone-badge-active">
                      <UsersIcon size={12} /> 4 Peers
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column Layout */}
          <div className="zm-bento-right-col">
            {/* Top-Right Card */}
            <motion.div
              className="zm-bento-card zm-bento-card-top-right"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <div className="zm-bento-card-header">
                <h3>Plan Smarter Sessions</h3>
                <p>
                  Schedule architectural pairing, quick code reviews, and daily standups effortlessly.
                </p>
              </div>
              <div className="zm-mini-schedule-list">
                <motion.div
                  className="zm-schedule-item"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="zm-schedule-icon zm-icon-amber">
                    <CodeIcon size={16} />
                  </div>
                  <div className="zm-schedule-info">
                    <span className="zm-schedule-name">Sprint Pair Review</span>
                    <span className="zm-schedule-time">10:00 AM • Room DEV-92</span>
                  </div>
                </motion.div>

                <motion.div
                  className="zm-schedule-item"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="zm-schedule-icon zm-icon-purple">
                    <VideoIcon size={16} />
                  </div>
                  <div className="zm-schedule-info">
                    <span className="zm-schedule-name">Architecture Alignment</span>
                    <span className="zm-schedule-time">02:30 PM • Room ARCH-01</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom-Right 2-Split */}
            <div className="zm-bento-bottom-split">
              {/* Bottom-Left Card: Milestone / Progress Tracker */}
              <motion.div
                className="zm-bento-card zm-bento-card-milestone"
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <h3>Collaborate Every Milestone</h3>
                <p>Track team velocity & live commits during video pairing.</p>
                <div className="zm-app-icon-row">
                  <motion.div className="zm-app-pill" whileHover={{ scale: 1.15 }} title="VS Code"><CodeIcon size={16} /></motion.div>
                  <motion.div className="zm-app-pill" whileHover={{ scale: 1.15 }} title="GitHub"><GithubIcon size={16} /></motion.div>
                  <motion.div className="zm-app-pill" whileHover={{ scale: 1.15 }} title="Live Video"><VideoIcon size={16} /></motion.div>
                  <motion.div className="zm-app-pill" whileHover={{ scale: 1.15 }} title="Sync"><SparklesIcon size={16} /></motion.div>
                </div>
                <div className="zm-milestone-bar-box">
                  <div className="zm-milestone-label-row">
                    <span>Sprint Goal</span>
                    <span>92% Done</span>
                  </div>
                  <div className="zm-milestone-bar">
                    <motion.div
                      className="zm-milestone-fill"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "92%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-Right Card: Stats Leaderboard */}
              <motion.div
                className="zm-bento-card zm-bento-card-stats"
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <h3>Track Your Productivity</h3>
                <p>Automated session time & code sync metrics.</p>
                <div className="zm-stats-list">
                  <div className="zm-stats-row">
                    <span className="zm-stats-day">
                      <ClockIcon size={14} /> Day 1
                    </span>
                    <span className="zm-stats-value">4.8 hrs sync</span>
                  </div>
                  <div className="zm-stats-row">
                    <span className="zm-stats-day">
                      <TrendingUpIcon size={14} /> Day 2
                    </span>
                    <span className="zm-stats-value">6.2 hrs sync</span>
                  </div>
                  <div className="zm-stats-row">
                    <span className="zm-stats-day">
                      <CheckCircleIcon size={14} /> Day 3
                    </span>
                    <span className="zm-stats-value">5.5 hrs sync</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoFeatures;
