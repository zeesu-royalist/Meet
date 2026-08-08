import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import {
  BrightCallLogo,
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
} from "../components/Icons";

const LobbyScreen = () => {
  const [email, setEmail] = useState(() => localStorage.getItem("zeesu_user_email") || "");
  const [room, setRoom] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' | 'join' | 'developer'

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
        // Fallback navigation if socket connection fails
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

  return (
    <div className="brightcall-landing">
      {/* HEADER / NAVBAR */}
      <div className="bc-navbar-container">
        <header className="bc-navbar">
          <div className="bc-nav-brand" onClick={() => navigate("/")}>
            <BrightCallLogo size={28} />
            <span>BrightCall</span>
          </div>

          <button className="bc-nav-join-btn" onClick={() => handleOpenModal("join")}>
            Join now <ArrowRightIcon size={16} />
          </button>
        </header>
      </div>

      {/* HERO SECTION */}
      <section className="bc-hero-section">
        <div className="bc-hero-headline-container">
          <h1 className="bc-hero-headline">
            Building <span className="bc-hero-highlight">teams</span> that
            <br />
            drive results
            <div className="bc-hero-inline-group">
              <div className="bc-hero-community-pill-wrapper">
                <span className="bc-paren">(</span>
                <div className="bc-community-pill">
                  <div className="bc-avatar-stack">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                      alt="Community Member"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                      alt="Community Member"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop"
                      alt="Community Member"
                    />
                  </div>
                  <span className="bc-community-text">
                    We are a <strong>developer community</strong> helping people connect, collaborate and build.
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
          <button className="bc-btn-secondary" onClick={() => handleOpenModal("developer")}>
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
                <BrightCallLogo size={22} />
                <span>BrightCall</span>
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
                  src="https://plus.unsplash.com/premium_photo-1661763714352-79327575ebda?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                {/* Participant 1: Rohan Singh */}
                <div className="bc-tile-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1713947506048-80f76419b2fe?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Rohan Singh"
                  />
                  <div className="bc-tile-overlay-bottom">
                    <span>Rohan Singh</span>
                  </div>
                </div>

                {/* Participant 2: Neha Patel */}
                <div className="bc-tile-secondary">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661629307926-e6ddb3ea4257?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Neha Patel"
                  />
                  <div className="bc-tile-overlay-bottom">
                    <span>Neha Patel</span>
                  </div>
                </div>

                {/* Participant 3: Alex Morgan */}
                <div className="bc-tile-secondary">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661724998638-7b85a2d0d57a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Alex Morgan"
                  />
                  <div className="bc-tile-overlay-bottom">
                    <span>Alex Morgan</span>
                  </div>
                </div>

                {/* Participant 4: Priya Sharma */}
                <div className="bc-tile-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1629204814140-42a737865119?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
