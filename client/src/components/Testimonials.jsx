import React from "react";

const Testimonials = () => {
  return (
    <section className="zm-section zm-testimonials-section" id="testimonials">
      <div className="zm-container">
        {/* Header Row */}
        <div className="zm-testimonials-header">
          <div className="zm-testimonials-header-left">
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
        </div>

        {/* Masonry / Grid Layout matching reference image */}
        <div className="zm-testimonials-masonry-grid">
          {/* Top-Left Card: Text Quote */}
          <div className="zm-t-card zm-t-card-text">
            <div className="zm-t-author-row">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
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
          </div>

          {/* Center Column: Large Vertical Photo Card */}
          <div className="zm-t-card zm-t-card-photo zm-t-center-photo">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
              alt="Jessica Watson"
              className="zm-t-full-img"
            />
            <div className="zm-t-photo-overlay-badge">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
                alt="Jessica Watson Avatar"
                className="zm-t-mini-avatar"
              />
              <div>
                <div className="zm-t-overlay-name">Jessica Watson</div>
                <div className="zm-t-overlay-role">University Student</div>
              </div>
            </div>
          </div>

          {/* Top-Right Card: Text Quote */}
          <div className="zm-t-card zm-t-card-text">
            <div className="zm-t-author-row">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
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
          </div>

          {/* Bottom-Left Photo Card */}
          <div className="zm-t-card zm-t-card-photo">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
              alt="Michael Green"
              className="zm-t-full-img"
            />
            <div className="zm-t-photo-overlay-badge">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
                alt="Michael Green Avatar"
                className="zm-t-mini-avatar"
              />
              <div>
                <div className="zm-t-overlay-name">Michael Green</div>
                <div className="zm-t-overlay-role">Lead Developer</div>
              </div>
            </div>
          </div>

          {/* Bottom-Right Photo Card */}
          <div className="zm-t-card zm-t-card-photo">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop"
              alt="Sophia Williams"
              className="zm-t-full-img"
            />
            <div className="zm-t-photo-overlay-badge">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop"
                alt="Sophia Williams Avatar"
                className="zm-t-mini-avatar"
              />
              <div>
                <div className="zm-t-overlay-name">Sophia Williams</div>
                <div className="zm-t-overlay-role">Senior Frontend Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
