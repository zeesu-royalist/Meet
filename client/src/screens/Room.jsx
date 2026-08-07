import React, { useEffect, useCallback, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  ScreenShareIcon,
  ChatIcon,
  PhoneOffIcon,
  CopyIcon,
  CloseIcon,
  SendIcon,
  UsersIcon,
  SparklesIcon,
} from "../components/Icons";

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSocket();

  const userEmail = location.state?.email || localStorage.getItem("zeesu_user_email") || "Guest User";

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [remoteEmail, setRemoteEmail] = useState("");
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  // Controls state
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [remoteMicOn, setRemoteMicOn] = useState(true);
  const [remoteCameraOn, setRemoteCameraOn] = useState(true);

  // Chat & Toast state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const screenTrackRef = useRef(null);
  const chatBottomRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // 1. Acquire media stream on mount
  useEffect(() => {
    let activeStream = null;
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        activeStream = stream;
        setMyStream(stream);
      } catch (err) {
        console.error("Failed to access camera/mic:", err);
        showToast("Camera/Mic access denied or unavailable.");
      }
    }
    getMedia();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Update local video element when stream is ready
  useEffect(() => {
    if (localVideoRef.current && myStream) {
      localVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  // Update remote video element when stream is ready
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Scroll chat drawer to bottom on new message
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  // 2. WebRTC Call Initiation (Caller)
  const handleCallUser = useCallback(async () => {
    if (!remoteSocketId || !myStream) return;

    peer.resetPeer();

    // Attach tracks
    myStream.getTracks().forEach((track) => peer.peer.addTrack(track, myStream));

    // Handle ICE Candidates
    peer.peer.onicecandidate = (event) => {
      if (event.candidate && remoteSocketId) {
        socket.emit("peer:ice-candidate", { to: remoteSocketId, candidate: event.candidate });
      }
    };

    // Handle Remote Track
    peer.peer.ontrack = (ev) => {
      if (ev.streams && ev.streams[0]) {
        setRemoteStream(ev.streams[0]);
      }
    };

    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    showToast("Calling peer...");
  }, [remoteSocketId, myStream, socket]);

  // 3. Remote User Joined
  const handleUserJoined = useCallback(
    ({ email, id }) => {
      setRemoteSocketId(id);
      setRemoteEmail(email || "Peer");
      showToast(`${email || "A peer"} joined the room!`);
    },
    []
  );

  // 4. Handle Incoming Call (Receiver)
  const handleIncommingCall = useCallback(
    async ({ from, email, offer }) => {
      setRemoteSocketId(from);
      if (email) setRemoteEmail(email);

      peer.resetPeer();

      // Attach tracks
      if (myStream) {
        myStream.getTracks().forEach((track) => peer.peer.addTrack(track, myStream));
      }

      // Handle ICE Candidates
      peer.peer.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("peer:ice-candidate", { to: from, candidate: event.candidate });
        }
      };

      // Handle Remote Track
      peer.peer.ontrack = (ev) => {
        if (ev.streams && ev.streams[0]) {
          setRemoteStream(ev.streams[0]);
        }
      };

      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
      showToast("Call connected!");
    },
    [socket, myStream]
  );

  // 5. Call Accepted
  const handleCallAccepted = useCallback(
    async ({ from, ans }) => {
      await peer.setLocalDescription(ans);
      showToast("Peer accepted call! Connection established.");
    },
    []
  );

  // 6. ICE Candidate Received
  const handleRemoteIceCandidate = useCallback(async ({ candidate }) => {
    if (candidate) {
      await peer.addIceCandidate(candidate);
    }
  }, []);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  // 8. Media Status Sync (Remote Mic/Camera updates)
  const handleMediaToggle = useCallback(({ type, enabled }) => {
    if (type === "audio") setRemoteMicOn(enabled);
    if (type === "video") setRemoteCameraOn(enabled);
  }, []);

  // 9. Chat Message Received
  const handleChatMessage = useCallback((data) => {
    setChatMessages((prev) => [...prev, data]);
  }, []);

  // 10. User Left
  const handleUserLeft = useCallback(({ email }) => {
    setRemoteSocketId(null);
    setRemoteStream(null);
    setRemoteEmail("");
    showToast(`${email || "Peer"} left the meeting.`);
  }, []);

  // Setup Socket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:ice-candidate", handleRemoteIceCandidate);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("media:toggle", handleMediaToggle);
    socket.on("chat:message", handleChatMessage);
    socket.on("user:left", handleUserLeft);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:ice-candidate", handleRemoteIceCandidate);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("media:toggle", handleMediaToggle);
      socket.off("chat:message", handleChatMessage);
      socket.off("user:left", handleUserLeft);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleRemoteIceCandidate,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
    handleMediaToggle,
    handleChatMessage,
    handleUserLeft,
  ]);

  // Media Controls Actions
  const toggleMic = () => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
        if (remoteSocketId) {
          socket.emit("media:toggle", { to: remoteSocketId, type: "audio", enabled: !isMicOn });
        }
      }
    }
  };

  const toggleCamera = () => {
    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCameraOn;
        setIsCameraOn(!isCameraOn);
        if (remoteSocketId) {
          socket.emit("media:toggle", { to: remoteSocketId, type: "video", enabled: !isCameraOn });
        }
      }
    }
  };

  const toggleScreenShare = async () => {
    if (!peer.peer) return;

    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        screenTrackRef.current = screenTrack;

        const sender = peer.peer.getSenders().find((s) => s.track && s.track.kind === "video");
        if (sender) {
          sender.replaceTrack(screenTrack);
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }

        screenTrack.onended = () => {
          stopScreenShare();
        };

        setIsScreenSharing(true);
        showToast("Screen sharing started.");
      } catch (err) {
        console.error("Screen share error:", err);
      }
    } else {
      stopScreenShare();
    }
  };

  const stopScreenShare = () => {
    if (screenTrackRef.current) {
      screenTrackRef.current.stop();
      screenTrackRef.current = null;
    }
    const originalVideoTrack = myStream?.getVideoTracks()[0];
    if (originalVideoTrack && peer.peer) {
      const sender = peer.peer.getSenders().find((s) => s.track && s.track.kind === "video");
      if (sender) {
        sender.replaceTrack(originalVideoTrack);
      }
    }
    if (localVideoRef.current && myStream) {
      localVideoRef.current.srcObject = myStream;
    }
    setIsScreenSharing(false);
    showToast("Screen sharing stopped.");
  };

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !socket) return;
    socket.emit("chat:message", { room: roomId, message: chatInput.trim() });
    setChatInput("");
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(link);
    showToast("Room invite link copied!");
  };

  const leaveRoom = () => {
    if (myStream) {
      myStream.getTracks().forEach((t) => t.stop());
    }
    if (socket) {
      socket.emit("room:leave");
    }
    peer.resetPeer();
    navigate("/");
  };

  return (
    <div className="room-wrapper">
      {/* Toast Notice */}
      {toastMessage && <div className="toast-notice">{toastMessage}</div>}

      {/* Top Navbar */}
      <header className="room-navbar">
        <div className="nav-brand">
          <SparklesIcon size={20} /> Zeesu<span>Meet</span>
        </div>

        <div className="room-info-pill">
          <span>Room: <strong>{roomId}</strong></span>
          <button className="btn btn-secondary" style={{ padding: "4px 10px", fontSize: "0.8rem" }} onClick={copyRoomLink}>
            <CopyIcon size={14} /> Copy Link
          </button>
        </div>

        <div className="badge badge-success">
          <UsersIcon size={14} /> {remoteSocketId ? "2 In Meeting" : "1 In Meeting"}
        </div>
      </header>

      {/* Connection Prompt Banner */}
      {remoteSocketId && !remoteStream && (
        <div className="call-prompt-banner">
          <span>A peer is in the room! Connect WebRTC video call?</span>
          <button className="btn btn-primary" style={{ padding: "6px 16px" }} onClick={handleCallUser}>
            Start Video Call
          </button>
        </div>
      )}

      {/* Main Area */}
      <main className="room-main">
        {/* Video Grid */}
        <div className="video-grid-container">
          {/* Local Stream Card */}
          <div className="video-card">
            {isCameraOn ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`video-element ${isScreenSharing ? "" : "mirrored"}`}
              />
            ) : (
              <div className="avatar-placeholder">{userEmail[0]?.toUpperCase() || "U"}</div>
            )}

            <div className="video-overlay-bottom">
              <span>{userEmail} (You)</span>
              {isScreenSharing && <span className="badge badge-warning" style={{ fontSize: "0.65rem" }}>Sharing Screen</span>}
            </div>

            <div className="video-overlay-top-right">
              <div className={`status-icon-pill ${!isMicOn ? "muted" : ""}`}>
                {isMicOn ? <MicIcon size={14} /> : <MicOffIcon size={14} />}
              </div>
            </div>
          </div>

          {/* Remote Stream Card */}
          {remoteSocketId ? (
            <div className="video-card">
              {remoteCameraOn && remoteStream ? (
                <video ref={remoteVideoRef} autoPlay playsInline className="video-element" />
              ) : (
                <div className="avatar-placeholder">{remoteEmail[0]?.toUpperCase() || "P"}</div>
              )}

              <div className="video-overlay-bottom">
                <span>{remoteEmail || "Remote Peer"}</span>
              </div>

              <div className="video-overlay-top-right">
                <div className={`status-icon-pill ${!remoteMicOn ? "muted" : ""}`}>
                  {remoteMicOn ? <MicIcon size={14} /> : <MicOffIcon size={14} />}
                </div>
              </div>
            </div>
          ) : (
            <div className="video-card" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>
                <UsersIcon size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
                <h3>Waiting for others to join...</h3>
                <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  Share room code <strong>{roomId}</strong> with your invitees.
                </p>
                <button className="btn btn-secondary" style={{ marginTop: "1rem" }} onClick={copyRoomLink}>
                  <CopyIcon size={16} /> Copy Invite Link
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Chat Drawer */}
        {isChatOpen && (
          <aside className="chat-drawer">
            <div className="chat-header">
              <span>In-Meeting Chat</span>
              <button className="btn btn-secondary" style={{ padding: "4px" }} onClick={() => setIsChatOpen(false)}>
                <CloseIcon size={16} />
              </button>
            </div>

            <div className="chat-messages">
              {chatMessages.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--text-dim)", marginTop: "auto", marginBottom: "auto", fontSize: "0.85rem" }}>
                  No messages yet. Say hello!
                </div>
              ) : (
                chatMessages.map((msg) => {
                  const isMine = msg.sender === userEmail || msg.senderId === socket?.id;
                  return (
                    <div key={msg.id} className={`chat-bubble ${isMine ? "mine" : "other"}`}>
                      {!isMine && <div className="chat-sender">{msg.sender}</div>}
                      <div>{msg.message}</div>
                      <div className="chat-time">{msg.time}</div>
                    </div>
                  );
                })
              )}
              <div ref={chatBottomRef} />
            </div>

            <form onSubmit={sendChatMessage} className="chat-input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: "0 14px" }}>
                <SendIcon size={16} />
              </button>
            </form>
          </aside>
        )}
      </main>

      {/* Floating Glass Control Toolbar */}
      <footer className="control-toolbar">
        <button
          className={`btn-control ${!isMicOn ? "off" : "active"}`}
          onClick={toggleMic}
          title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
        >
          {isMicOn ? <MicIcon size={20} /> : <MicOffIcon size={20} />}
        </button>

        <button
          className={`btn-control ${!isCameraOn ? "off" : "active"}`}
          onClick={toggleCamera}
          title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
        >
          {isCameraOn ? <VideoIcon size={20} /> : <VideoOffIcon size={20} />}
        </button>

        <button
          className={`btn-control ${isScreenSharing ? "active" : ""}`}
          onClick={toggleScreenShare}
          title={isScreenSharing ? "Stop Screen Share" : "Share Screen"}
        >
          <ScreenShareIcon size={20} />
        </button>

        <button
          className={`btn-control ${isChatOpen ? "active" : ""}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
          title="Toggle In-Meeting Chat"
        >
          <ChatIcon size={20} />
        </button>

        <button className="btn-control end-call" onClick={leaveRoom} title="Leave Meeting">
          <PhoneOffIcon size={20} />
        </button>
      </footer>
    </div>
  );
};

export default RoomPage;

