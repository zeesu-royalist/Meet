import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import {
  ZeesuMeetLogo,
  ArrowRightIcon,
  VideoIcon,
  CodeIcon,
  LayoutGridIcon,
  UsersIcon,
  ChatIcon,
  ShieldCheckIcon,
  MicIcon,
  ScreenShareIcon,
  HandIcon,
  MoreHorizontalIcon,
  PhoneOffIcon,
  SparklesIcon,
  CloseIcon,
  ZapIcon,
  LockIcon,
  CheckIcon,
  ChevronDownIcon,
  StarIcon,
  GithubIcon,
  TwitterIcon,
  DiscordIcon,
} from "../components/Icons";

const LobbyScreen = () => {
  const [email, setEmail] = useState(() => localStorage.getItem("zeesu_user_email") || "");
  const [room, setRoom] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' | 'join' | 'developer'
  const [activeFaq, setActiveFaq] = useState(null);

  const socket = useSocket();
  const navigate = useNavigate();

  const handleGenerateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoom(code);
  };

  const handleOpenModal = (mode = "create") => {
    setModalMode(mode);
    if (!room) {
      handleGenerateRoomCode();
    }
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!email.trim() || !room.trim()) {
        setErrorMsg("Please enter your name/email and a room code.");
        return;
      }
      setErrorMsg("");
      localStorage.setItem("zeesu_user_email", email.trim());

      if (socket) {
        socket.emit("room:join", { email: email.trim(), room: room.trim() });
      } else {
        navigate(`/room/${room.trim()}`, { state: { email: email.trim() } });
      }
    },
    [email, room, socket, navigate]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room: joinedRoom } = data;
      navigate(`/room/${joinedRoom}`, { state: { email } });
    },
    [navigate, email]
  );

  useEffect(() => {
    if (!socket) return;
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  const faqs = [
    {
      q: "Do I or my team need to install any apps?",
      a: "No! ZeesuMeet is 100% web-native. Anyone can join or host HD video calls instantly in any modern browser without downloading plugins or extensions.",
    },
    {
      q: "How does the WebRTC peer-to-peer connection work?",
      a: "Your audio and video streams travel directly between participants with zero media servers in between, minimizing latency to less than 50 milliseconds.",
    },
    {
      q: "Is ZeesuMeet secure and encrypted?",
      a: "Yes. All video, audio, and data channels use industry-standard WebRTC DTLS-SRTP end-to-end encryption to keep your conversations private.",
    },
    {
      q: "How many participants can join a single room?",
      a: "ZeesuMeet optimizes peer-to-peer meshes for agile team meetings of up to 10 active participants with instant video grid rendering.",
    },
  ];

  return (
    <div className="ZeesuMeet-landing">
      {/* HEADER / NAVBAR */}
      <div className="bc-navbar-container">
        <header className="bc-navbar">
          <div className="bc-nav-brand" onClick={() => navigate("/")}>
            <ZeesuMeetLogo size={28} />
            <span>
              Zeesu<span style={{ color: "var(--primary-purple-hover)" }}>Meet</span>
            </span>
          </div>

          <nav className="bc-nav-links">
            <a href="#features" className="bc-nav-link">Features</a>
            <a href="#solutions" className="bc-nav-link">Solutions</a>
            <a href="#testimonials" className="bc-nav-link">Testimonials</a>
            <a href="#faq" className="bc-nav-link">FAQ</a>
          </nav>

          <div className="bc-nav-right">
            <div
              className="bc-nav-right"
              style={{
                display: window.innerWidth <= 768 ? "none" : "flex",
              }}
            >
              <button
                className="bc-nav-ghost-btn"
                onClick={() => handleOpenModal("join")}
              >
                Sign In
              </button>
            </div>
            <button className="bc-nav-join-btn" onClick={() => handleOpenModal("join")}>
              Join now <ArrowRightIcon size={16} />
            </button>
          </div>
        </header>
      </div>

      {/* HERO SECTION */}
      <section className="bc-hero-section">
        <div className="bc-hero-headline-container">
          <h1 className="bc-hero-headline">
            Seamless<span className="bc-hero-highlight">video calls</span>that
            <br />
            bring teams together
            <div className="bc-hero-inline-group">
              <div className="bc-hero-community-pill-wrapper">
                <span className="bc-paren">(</span>
                <div className="bc-community-pill">
                  <div className="bc-avatar-stack">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                      alt="ZeesuMeet User"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                      alt="ZeesuMeet User"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop"
                      alt="ZeesuMeet User"
                    />
                  </div>
                  <span className="bc-community-text">
                    Next-gen <strong>P2P video meetings</strong> helping developers connect, collaborate and build.
                  </span>
                </div>
                <span className="bc-paren">)</span>
              </div>
            </div>
          </h1>
        </div>

        {/* CTA BUTTONS */}
        <div className="bc-hero-ctas">
          <button className="bc-btn-primary" onClick={() => handleOpenModal("create")}>
            <VideoIcon size={18} /> Create a room
          </button>
          <button
            className="bc-btn-secondary"
            onClick={() => {
              window.location.href = "https://zeesu-royalist.github.io";
            }}
          >
            <CodeIcon size={18} /> Meet developer
          </button>
        </div>
      </section>

      {/* VIDEO CALLING PRODUCT PREVIEW */}
      <section className="bc-preview-container">
        <div className="bc-preview-outer-frame">
          <div className="bc-app-window">
            {/* App Top Header Bar */}
            <div className="bc-app-header">
              <div className="bc-app-brand">
                <ZeesuMeetLogo size={22} />
                <span>ZeesuMeet</span>
              </div>

              <div className="bc-app-room-tag">
                <span className="bc-app-room-title">Team Sync</span>
                <span className="bc-app-room-timer">00:15:24</span>
                <ShieldCheckIcon size={14} style={{ color: "#10b981" }} />
              </div>

              <div className="bc-app-top-actions">
                <button className="bc-top-icon-btn" title="Grid View">
                  <LayoutGridIcon size={16} />
                </button>
                <button className="bc-top-icon-btn" title="Participants">
                  <UsersIcon size={16} />
                </button>
                <button className="bc-top-icon-btn" title="Chat">
                  <ChatIcon size={16} />
                </button>
                <button className="bc-app-leave-btn" onClick={() => handleOpenModal("join")}>
                  Leave
                </button>
              </div>
            </div>

            {/* Video Call Grid Layout */}
            <div className="bc-app-grid">
              {/* Primary Large Video Tile (You) */}
              <div className="bc-tile-primary">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661763714352-79327575ebda?q=80&w=2232&auto=format&fit=crop"
                  alt="Primary Video Participant - You"
                />
                <div className="bc-tile-overlay-bottom">
                  <span>You</span>
                </div>
                <div className="bc-tile-overlay-top">
                  <div className="bc-tile-mic-status">
                    <MicIcon size={14} />
                  </div>
                </div>
              </div>

              {/* Secondary 2x2 Video Tile Grid */}
              <div className="bc-grid-secondary">
                <div className="bc-tile-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1713947506048-80f76419b2fe?q=80&w=2232&auto=format&fit=crop"
                    alt="Rohan Singh"
                  />
                  <div className="bc-tile-overlay-bottom">
                    <span>Rohan Singh</span>
                  </div>
                </div>

                <div className="bc-tile-secondary">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661629307926-e6ddb3ea4257?q=80&w=2070&auto=format&fit=crop"
                    alt="Neha Patel"
                  />
                  <div className="bc-tile-overlay-bottom">
                    <span>Neha Patel</span>
                  </div>
                </div>

                <div className="bc-tile-secondary">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661724998638-7b85a2d0d57a?q=80&w=2070&auto=format&fit=crop"
                    alt="Alex Morgan"
                  />
                  <div className="bc-tile-overlay-bottom">
                    <span>Alex Morgan</span>
                  </div>
                </div>

                <div className="bc-tile-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1629204814140-42a737865119?q=80&w=2070&auto=format&fit=crop"
                    alt="Priya Sharma"
                  />
                  <div className="bc-tile-overlay-bottom">
                    <span>Priya Sharma</span>
                  </div>
                </div>
              </div>
            </div>

            {/* App Bottom Floating Call Controls */}
            <div className="bc-app-controls">
              <button className="bc-ctrl-btn active" title="Mute Microphone" onClick={() => handleOpenModal("join")}>
                <MicIcon size={18} />
              </button>
              <button className="bc-ctrl-btn active" title="Turn Off Camera" onClick={() => handleOpenModal("join")}>
                <VideoIcon size={18} />
              </button>
              <button className="bc-ctrl-btn" title="Share Screen" onClick={() => handleOpenModal("join")}>
                <ScreenShareIcon size={18} />
              </button>
              <button className="bc-ctrl-btn" title="Raise Hand" onClick={() => handleOpenModal("join")}>
                <HandIcon size={18} />
              </button>
              <button className="bc-ctrl-btn" title="More Options" onClick={() => handleOpenModal("join")}>
                <MoreHorizontalIcon size={18} />
              </button>
              <button className="bc-ctrl-btn end-call" title="End Call" onClick={() => handleOpenModal("join")}>
                <PhoneOffIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY MARQUEE LOGOS */}
      <section className="bc-trust-section">
        <p className="bc-trust-title">Trusted by engineering teams at high-growth companies</p>
        <div className="bc-logos-grid">
          <div className="bc-logo-pill"><SparklesIcon size={14} /> Vercel</div>
          <div className="bc-logo-pill"><CodeIcon size={14} /> Supabase</div>
          <div className="bc-logo-pill"><GithubIcon size={14} /> GitHub</div>
          <div className="bc-logo-pill"><ZapIcon size={14} /> Linear</div>
          <div className="bc-logo-pill"><UsersIcon size={14} /> Raycast</div>
          <div className="bc-logo-pill"><ShieldCheckIcon size={14} /> Stripe</div>
          <div className="bc-logo-pill"><VideoIcon size={14} /> Loom</div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="bc-features-section" id="features">
        <div className="bc-section-badge">
          <SparklesIcon size={14} /> Powerful Capabilities
        </div>
        <h2 className="bc-section-title">Designed for real-time collaboration</h2>
        <p className="bc-section-subtitle">
          Everything remote engineering squads, tech leads, and peer developers need to connect, review code, and build faster.
        </p>

        <div className="bc-features-grid">
          <div className="bc-feature-card">
            <div className="bc-feature-icon-box">
              <ZapIcon size={22} />
            </div>
            <h3>Ultra-Low Latency P2P</h3>
            <p>Direct WebRTC peer connections eliminate media server hops for sub-50ms glass-to-glass latency.</p>
          </div>

          <div className="bc-feature-card">
            <div className="bc-feature-icon-box">
              <VideoIcon size={22} />
            </div>
            <h3>HD Video & Crystal Audio</h3>
            <p>Adaptive noise suppression and high-definition video encoding tailored for seamless pair programming.</p>
          </div>

          <div className="bc-feature-card">
            <div className="bc-feature-icon-box">
              <ScreenShareIcon size={22} />
            </div>
            <h3>Instant Screen Sharing</h3>
            <p>Share any browser window, IDE, terminal, or full display effortlessly with crisp 60fps streaming.</p>
          </div>

          <div className="bc-feature-card">
            <div className="bc-feature-icon-box">
              <ChatIcon size={22} />
            </div>
            <h3>In-Meeting Live Chat</h3>
            <p>Send text messages, links, and code snippets in real-time during your video session without leaving the screen.</p>
          </div>

          <div className="bc-feature-card">
            <div className="bc-feature-icon-box">
              <LockIcon size={22} />
            </div>
            <h3>End-to-End Encrypted</h3>
            <p>Built with DTLS-SRTP WebRTC protocols ensuring your audio, video, and data channels remain 100% private.</p>
          </div>

          <div className="bc-feature-card">
            <div className="bc-feature-icon-box">
              <UsersIcon size={22} />
            </div>
            <h3>Zero Download Instant Rooms</h3>
            <p>Generate shareable room links that open instantly in any browser on desktop, tablet, or mobile.</p>
          </div>
        </div>
      </section>

      {/* METRICS / STATS BANNER */}
      <section className="bc-stats-section">
        <div className="bc-stats-grid">
          <div className="bc-stat-card">
            <div className="bc-stat-num">&lt; 50ms</div>
            <div className="bc-stat-label">Sub-50ms Latency</div>
          </div>
          <div className="bc-stat-card">
            <div className="bc-stat-num">100%</div>
            <div className="bc-stat-label">E2E Encrypted P2P</div>
          </div>
          <div className="bc-stat-card">
            <div className="bc-stat-num">1080p60</div>
            <div className="bc-stat-label">Full HD Quality</div>
          </div>
          <div className="bc-stat-card">
            <div className="bc-stat-num">0</div>
            <div className="bc-stat-label">Downloads Required</div>
          </div>
        </div>
      </section>

      {/* DEVELOPER SHOWCASE / SOLUTIONS */}
      <section className="bc-showcase-section" id="solutions">
        <div className="bc-showcase-card">
          <div className="bc-showcase-grid">
            <div className="bc-showcase-content">
              <h2>Engineered for technical teams who ship fast</h2>
              <p>
                Whether conducting daily standups, architectural code reviews, or pairing on complex bug fixes, ZeesuMeet gives your team friction-free video calling.
              </p>
              <ul className="bc-showcase-list">
                <li><CheckIcon size={16} /> Instant WebRTC P2P signaling</li>
                <li><CheckIcon size={16} /> Lightweight, browser-native memory footprint</li>
                <li><CheckIcon size={16} /> Integrated code-sharing & live chat workspace</li>
              </ul>
            </div>

            <div className="bc-showcase-preview-box">
              <div className="bc-code-mockup">
                <div><span className="keyword">import</span> &#123; ZeesuMeet &#125; <span className="keyword">from</span> <span className="string">"@ZeesuMeet/core"</span>;</div>
                <br />
                <div><span className="keyword">const</span> room = <span className="keyword">await</span> ZeesuMeet.<span className="function">createRoom</span>(&#123;</div>
                <div>&nbsp;&nbsp;roomCode: <span className="string">"DEV-PAIR-SYNC"</span>,</div>
                <div>&nbsp;&nbsp;video: <span className="keyword">true</span>,</div>
                <div>&nbsp;&nbsp;audio: <span className="keyword">true</span>,</div>
                <div>&nbsp;&nbsp;encryption: <span className="string">"DTLS-SRTP"</span></div>
                <div>&#125;);</div>
                <br />
                <div>room.<span className="function">on</span>(<span className="string">"peer:join"</span>, (peer) =&gt; &#123;</div>
                <div>&nbsp;&nbsp;console.<span className="function">log</span>(<span className="string">`Peer connected!`</span>);</div>
                <div>&#125;);</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / WALL OF LOVE */}
      <section className="bc-testimonials-section" id="testimonials">
        <div className="bc-section-badge">
          <StarIcon size={14} /> Wall of Love
        </div>
        <h2 className="bc-section-title">Loved by developers worldwide</h2>
        <p className="bc-section-subtitle">
          Here is what engineering leaders and developers say about ZeesuMeet's speed and clarity.
        </p>

        <div className="bc-testimonials-grid">
          <div className="bc-testimonial-card">
            <div className="bc-stars-row">
              <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
            </div>
            <p className="bc-testimonial-quote">
              "ZeesuMeet replaced our heavy desktop meeting software. Launching a room in one click for pair programming has doubled our debugging velocity."
            </p>
            <div className="bc-testimonial-author">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                alt="Sarah Jenkins"
              />
              <div>
                <div className="bc-author-name">Sarah Jenkins</div>
                <div className="bc-author-role">Staff Frontend Engineer</div>
              </div>
            </div>
          </div>

          <div className="bc-testimonial-card">
            <div className="bc-stars-row">
              <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
            </div>
            <p className="bc-testimonial-quote">
              "The WebRTC sub-50ms audio latency is insane. It feels like standing right next to my teammate in front of a whiteboard."
            </p>
            <div className="bc-testimonial-author">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                alt="David Chen"
              />
              <div>
                <div className="bc-author-name">David Chen</div>
                <div className="bc-author-role">CTO at StackFlow</div>
              </div>
            </div>
          </div>

          <div className="bc-testimonial-card">
            <div className="bc-stars-row">
              <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
            </div>
            <p className="bc-testimonial-quote">
              "Zero downloads, zero friction. I just share the room code with candidate developers and we jump straight into the technical interview."
            </p>
            <div className="bc-testimonial-author">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop"
                alt="Elena Rostova"
              />
              <div>
                <div className="bc-author-name">Elena Rostova</div>
                <div className="bc-author-role">Engineering Manager</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bc-faq-section" id="faq">
        <div className="bc-section-badge">
          <SparklesIcon size={14} /> Got Questions?
        </div>
        <h2 className="bc-section-title">Frequently Asked Questions</h2>
        <p className="bc-section-subtitle">
          Everything you need to know about ZeesuMeet video conferencing.
        </p>

        <div className="bc-faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="bc-faq-item">
              <button className="bc-faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.q}</span>
                <ChevronDownIcon
                  size={18}
                  style={{
                    transform: activeFaq === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </button>
              {activeFaq === index && <div className="bc-faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="bc-cta-section">
        <div className="bc-cta-card">
          <h2>Start collaborating in seconds</h2>
          <p>Create your custom room or join an existing session now. No sign-up required.</p>
          <div className="bc-cta-buttons">
            <button className="bc-cta-btn-white" onClick={() => handleOpenModal("create")}>
              <VideoIcon size={18} /> Create a Room Now
            </button>
            <button className="bc-cta-btn-glass" onClick={() => handleOpenModal("join")}>
              <UsersIcon size={18} /> Join Session
            </button>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE SAAS FOOTER */}
      <footer className="bc-footer">
        <div className="bc-footer-grid">
          <div className="bc-footer-brand-col">
            <div className="bc-nav-brand" onClick={() => navigate("/")}>
              <ZeesuMeetLogo size={28} />
              <span>ZeesuMeet</span>
            </div>
            <p>
              Next-generation browser video conferencing designed for remote developers, engineering squads, and modern teams.
            </p>
            <div className="bc-social-links">
              <div className="bc-social-icon" title="GitHub"><GithubIcon size={18} /></div>
              <div className="bc-social-icon" title="Twitter"><TwitterIcon size={18} /></div>
              <div className="bc-social-icon" title="Discord"><DiscordIcon size={18} /></div>
            </div>
          </div>

          <div className="bc-footer-col">
            <h4>Product</h4>
            <ul className="bc-footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#solutions">WebRTC Architecture</a></li>
              <li><a href="#features">Security & Privacy</a></li>
              <li><a href="#solutions">Screen Sharing</a></li>
            </ul>
          </div>

          <div className="bc-footer-col">
            <h4>Solutions</h4>
            <ul className="bc-footer-links">
              <li><a href="#solutions">Pair Programming</a></li>
              <li><a href="#solutions">Agile Standups</a></li>
              <li><a href="#solutions">Technical Interviews</a></li>
              <li><a href="#solutions">Remote Teams</a></li>
            </ul>
          </div>

          <div className="bc-footer-col">
            <h4>Resources</h4>
            <ul className="bc-footer-links">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#testimonials">Wall of Love</a></li>
              <li><a href="#features">Documentation</a></li>
              <li><a href="#features">System Status</a></li>
            </ul>
          </div>

          <div className="bc-footer-col">
            <h4>Legal</h4>
            <ul className="bc-footer-links">
              <li><a href="#faq">Privacy Policy</a></li>
              <li><a href="#faq">Terms of Service</a></li>
              <li><a href="#faq">Security Policy</a></li>
              <li><a href="#faq">Cookie Settings</a></li>
            </ul>
          </div>
        </div>

        <div className="bc-footer-bottom">
          <div>© 2026 ZeesuMeet Inc. All rights reserved.</div>
          <div>Powered by Zeesu Royalist</div>
        </div>
      </footer>

      {/* JOIN / CREATE ROOM MODAL */}
      {isModalOpen && (
        <div className="bc-modal-backdrop" onClick={handleCloseModal}>
          <div className="bc-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="bc-modal-close" onClick={handleCloseModal}>
              <CloseIcon size={18} />
            </button>

            <div className="bc-modal-header">
              <div className="bc-modal-icon">
                {modalMode === "developer" ? (
                  <CodeIcon size={24} />
                ) : modalMode === "join" ? (
                  <UsersIcon size={24} />
                ) : (
                  <VideoIcon size={24} />
                )}
              </div>
              <h2 className="bc-modal-title">
                {modalMode === "developer"
                  ? "Meet a Developer"
                  : modalMode === "join"
                    ? "Join Meeting Room"
                    : "Create a Room"}
              </h2>
              <p className="bc-modal-desc">
                {modalMode === "developer"
                  ? "Connect with peer developers in instant video rooms"
                  : modalMode === "join"
                    ? "Enter your details and room code to join an ongoing call"
                    : "Start a high-definition video call session with your team"}
              </p>
            </div>

            {errorMsg && <div className="bc-error-msg">{errorMsg}</div>}

            <form onSubmit={handleSubmitForm}>
              <div className="bc-form-group">
                <label className="bc-form-label" htmlFor="email">
                  Your Name / Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="bc-input-field"
                  placeholder="e.g. Alex Morgan"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="bc-form-group">
                <label className="bc-form-label" htmlFor="room">
                  Room Code
                </label>
                <div className="bc-input-row">
                  <input
                    type="text"
                    id="room"
                    className="bc-input-field"
                    placeholder="Enter room code"
                    value={room}
                    onChange={(e) => setRoom(e.target.value.toUpperCase())}
                    required
                  />
                  <button
                    type="button"
                    className="bc-code-gen-btn"
                    onClick={handleGenerateRoomCode}
                    title="Generate New Code"
                  >
                    <SparklesIcon size={14} /> New Code
                  </button>
                </div>
              </div>

              <button type="submit" className="bc-modal-submit-btn">
                <VideoIcon size={18} /> Enter Room Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LobbyScreen;
