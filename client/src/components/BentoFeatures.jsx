import React from "react";
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

const BentoFeatures = () => {
  return (
    <section className="zm-section zm-bento-section" id="features">
      <div className="zm-container">
        {/* Section Header */}
        <div className="zm-bento-header">
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
        </div>

        {/* Bento Grid */}
        <div className="zm-bento-grid">
          {/* Large Left Card - Phone Mockup with Circular Progress */}
          <div className="zm-bento-card zm-bento-card-large-hero">
            <div className="zm-bento-hero-text">
              <h3>Stay Focused, Stay Present</h3>
              <p>
                Experience ultra-low latency WebRTC streaming and real-time sprint tracking right on your browser or mobile screen.
              </p>
            </div>

            {/* Mobile Phone Mockup */}
            <div className="zm-phone-mockup-wrapper">
              <div className="zm-phone-frame">
                <div className="zm-phone-notch"></div>
                <div className="zm-phone-content">
                  <div className="zm-phone-header">
                    <span className="zm-phone-app-name">ZeesuMeet Room</span>
                    <span className="zm-phone-status-dot"></span>
                  </div>

                  <div className="zm-phone-stat-title">Pairing Session</div>
                  
                  {/* Circular Progress Ring */}
                  <div className="zm-circular-progress-box">
                    <svg className="zm-progress-svg" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        className="zm-progress-bg"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        className="zm-progress-fill"
                        strokeDasharray="301.59"
                        strokeDashoffset="45"
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
            </div>
          </div>

          {/* Right Column Layout */}
          <div className="zm-bento-right-col">
            {/* Top-Right Card */}
            <div className="zm-bento-card zm-bento-card-top-right">
              <div className="zm-bento-card-header">
                <h3>Plan Smarter Sessions</h3>
                <p>
                  Schedule architectural pairing, quick code reviews, and daily standups effortlessly.
                </p>
              </div>
              <div className="zm-mini-schedule-list">
                <div className="zm-schedule-item">
                  <div className="zm-schedule-icon zm-icon-amber">
                    <CodeIcon size={16} />
                  </div>
                  <div className="zm-schedule-info">
                    <span className="zm-schedule-name">Sprint Pair Review</span>
                    <span className="zm-schedule-time">10:00 AM • Room DEV-92</span>
                  </div>
                </div>

                <div className="zm-schedule-item">
                  <div className="zm-schedule-icon zm-icon-purple">
                    <VideoIcon size={16} />
                  </div>
                  <div className="zm-schedule-info">
                    <span className="zm-schedule-name">Architecture Alignment</span>
                    <span className="zm-schedule-time">02:30 PM • Room ARCH-01</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-Right 2-Split */}
            <div className="zm-bento-bottom-split">
              {/* Bottom-Left Card: Milestone / Progress Tracker */}
              <div className="zm-bento-card zm-bento-card-milestone">
                <h3>Collaborate Every Milestone</h3>
                <p>Track team velocity & live commits during video pairing.</p>
                <div className="zm-app-icon-row">
                  <div className="zm-app-pill" title="VS Code"><CodeIcon size={16} /></div>
                  <div className="zm-app-pill" title="GitHub"><GithubIcon size={16} /></div>
                  <div className="zm-app-pill" title="Live Video"><VideoIcon size={16} /></div>
                  <div className="zm-app-pill" title="Sync"><SparklesIcon size={16} /></div>
                </div>
                <div className="zm-milestone-bar-box">
                  <div className="zm-milestone-label-row">
                    <span>Sprint Goal</span>
                    <span>92% Done</span>
                  </div>
                  <div className="zm-milestone-bar">
                    <div className="zm-milestone-fill" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </div>

              {/* Bottom-Right Card: Stats Leaderboard */}
              <div className="zm-bento-card zm-bento-card-stats">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
