import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { SparklesIcon, VideoIcon, UsersIcon } from "../components/Icons";

const LobbyScreen = () => {
  const [email, setEmail] = useState(() => localStorage.getItem("zeesu_user_email") || "");
  const [room, setRoom] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleGenerateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoom(code);
  };

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!email.trim() || !room.trim()) {
        setErrorMsg("Please enter both your name/email and a room code.");
        return;
      }
      setErrorMsg("");
      localStorage.setItem("zeesu_user_email", email.trim());
      socket.emit("room:join", { email: email.trim(), room: room.trim() });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`, { state: { email } });
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
    <div className="lobby-container">
      <div className="lobby-header">
        <div className="brand-badge">
          <SparklesIcon size={16} /> Zeesu-Meet Standard
        </div>
        <h1 className="lobby-title">Next-Gen Video Conferences</h1>
        <p className="lobby-subtitle">
          Connect, collaborate, and communicate seamlessly in high-definition P2P audio & video.
        </p>
      </div>

      <div className="lobby-card glass-panel">
        <form onSubmit={handleSubmitForm}>
          {errorMsg && (
            <div style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "1rem", textAlign: "center" }}>
              {errorMsg}
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Your Name / Email
            </label>
            <input
              type="text"
              id="email"
              className="input-field"
              placeholder="e.g. alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="room">
              Room Code
            </label>
            <div className="input-with-button">
              <input
                type="text"
                id="room"
                className="input-field"
                placeholder="Enter or generate code"
                value={room}
                onChange={(e) => setRoom(e.target.value.toUpperCase())}
                required
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleGenerateRoomCode}
                title="Generate Random Room Code"
              >
                <SparklesIcon size={16} /> Code
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
            <VideoIcon size={18} /> Join Meeting Room
          </button>
        </form>
      </div>

      <div className="lobby-features">
        <div className="feature-item">
          <div className="feature-icon">
            <VideoIcon size={20} />
          </div>
          <div className="feature-title">HD Video & Audio</div>
          <div className="feature-desc">Crystal clear WebRTC connection with adaptive STUN servers.</div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <UsersIcon size={20} />
          </div>
          <div className="feature-title">Instant Peer-to-Peer</div>
          <div className="feature-desc">Direct low-latency streaming without centralized media relay.</div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <SparklesIcon size={20} />
          </div>
          <div className="feature-title">Full Controls</div>
          <div className="feature-desc">Mute mic, disable camera, screen share, and real-time chat.</div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;

