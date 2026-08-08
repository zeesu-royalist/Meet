import React from "react";
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

const HowItWorks = () => {
  return (
    <section className="zm-section zm-how-it-works-section" id="solutions">
      <div className="zm-container">
        <div className="zm-section-center-header">
          <h2 className="zm-center-heading">Better Tools, Smarter Insights</h2>
          <p className="zm-center-subtext">
            ZeesuMeet seamlessly connects your local workspace, browser feeds, and communication channels into one unified WebRTC real-time sync hub.
          </p>
        </div>

        {/* Diagram Card Container */}
        <div className="zm-hub-diagram-card">
          <div className="zm-hub-diagram-grid">
            {/* Left Box - 3 Items */}
            <div className="zm-hub-side-card">
              <div className="zm-hub-item">
                <div className="zm-hub-item-icon">
                  <ScreenShareIcon size={16} />
                </div>
                <span>Your Screen & IDE</span>
              </div>

              <div className="zm-hub-item">
                <div className="zm-hub-item-icon">
                  <CodeIcon size={16} />
                </div>
                <span>Live Code Editor</span>
              </div>

              <div className="zm-hub-item">
                <div className="zm-hub-item-icon">
                  <MicIcon size={16} />
                </div>
                <span>HD Audio Streams</span>
              </div>
            </div>

            {/* Middle Connecting Hub */}
            <div className="zm-hub-center-connector">
              <svg className="zm-connector-lines" viewBox="0 0 160 120">
                {/* Curved paths from Left to Center */}
                <path d="M 0 30 Q 50 30, 80 60" stroke="#7663e8" strokeWidth="2" fill="none" strokeDasharray="4 4" className="zm-line-anim" />
                <path d="M 0 60 L 80 60" stroke="#7663e8" strokeWidth="2.5" fill="none" />
                <path d="M 0 90 Q 50 90, 80 60" stroke="#7663e8" strokeWidth="2" fill="none" strokeDasharray="4 4" className="zm-line-anim" />
                
                {/* Curved paths from Center to Right */}
                <path d="M 80 60 Q 110 30, 160 30" stroke="#7663e8" strokeWidth="2" fill="none" strokeDasharray="4 4" className="zm-line-anim" />
                <path d="M 80 60 L 160 60" stroke="#7663e8" strokeWidth="2.5" fill="none" />
                <path d="M 80 60 Q 110 90, 160 90" stroke="#7663e8" strokeWidth="2" fill="none" strokeDasharray="4 4" className="zm-line-anim" />
              </svg>

              <div className="zm-hub-center-badge">
                <div className="zm-hub-glow"></div>
                <div className="zm-hub-badge-inner">
                  <ZapIcon size={24} />
                </div>
              </div>
            </div>

            {/* Right Box - 3 Items */}
            <div className="zm-hub-side-card">
              <div className="zm-hub-item">
                <div className="zm-hub-item-icon">
                  <ShieldCheckIcon size={16} />
                </div>
                <span>Smart Encryption</span>
              </div>

              <div className="zm-hub-item">
                <div className="zm-hub-item-icon">
                  <ClockIcon size={16} />
                </div>
                <span>Latency Inspector</span>
              </div>

              {/* Highlighted Item with Arrow Badge */}
              <div className="zm-hub-item zm-hub-item-highlight">
                <div className="zm-hub-item-icon zm-icon-highlight">
                  <UsersIcon size={16} />
                </div>
                <span>Peer Data Channels</span>
                <div className="zm-item-arrow-badge">
                  <ArrowUpRightIcon size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
