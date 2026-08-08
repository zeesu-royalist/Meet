import React from "react";
import { VideoIcon, UsersIcon } from "./Icons";

const FinalCTA = ({ handleOpenModal }) => {
  return (
    <section className="zm-section zm-final-cta-section">
      <div className="zm-container">
        <div className="zm-final-cta-card">
          {/* Left Column: Heading, Subtext, Buttons */}
          <div className="zm-final-cta-content">
            <h2 className="zm-final-cta-heading">
              Your Better Collaboration <br />
              Starts Here
            </h2>
            <p className="zm-final-cta-subtext">
              Join thousands of engineering teams building faster with zero-friction WebRTC video calls. Available on web, iOS, and Android.
            </p>
            <div className="zm-final-cta-buttons">
              <button
                className="zm-btn-cta-dark"
                onClick={() => handleOpenModal && handleOpenModal("create")}
              >
                <VideoIcon size={18} /> Create Room Now
              </button>
              <button
                className="zm-btn-cta-outline"
                onClick={() => handleOpenModal && handleOpenModal("join")}
              >
                <UsersIcon size={18} /> Join Session
              </button>
            </div>
          </div>

          {/* Right Column: Phone Mockup UI with Circular Stat */}
          <div className="zm-final-cta-phone-col">
            <div className="zm-final-phone-mockup">
              <div className="zm-final-phone-notch"></div>
              <div className="zm-final-phone-screen">
                <div className="zm-final-phone-user-row">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
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
                  
                  {/* Circular Stat Indicator */}
                  <div className="zm-final-ring-box">
                    <svg className="zm-final-ring-svg" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="zm-final-ring-bg"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="zm-final-ring-fill"
                        strokeDasharray="251.32"
                        strokeDashoffset="30"
                      />
                    </svg>
                    <div className="zm-final-ring-text">
                      <span className="zm-final-percent">88%</span>
                      <span className="zm-final-stat-label">Quality</span>
                    </div>
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

export default FinalCTA;
