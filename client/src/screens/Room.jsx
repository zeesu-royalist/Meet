import React, { useEffect, useCallback, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import {
  ZeesuMeetLogo,
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
  ShieldCheckIcon,
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

  // Refs for stable access in callbacks without triggering re-render loops
  const myStreamRef = useRef(null);
  const remoteSocketIdRef = useRef(null);
  const callingRef = useRef(false);

  useEffect(() => {
    myStreamRef.current = myStream;
  }, [myStream]);

  useEffect(() => {
    remoteSocketIdRef.current = remoteSocketId;
  }, [remoteSocketId]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  }, []);

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
  }, [showToast]);

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
      remoteVideoRef.current.play().catch((err) => {
        console.log("Remote video play trigger:", err);
      });
    }
  }, [remoteStream]);

  // Scroll chat drawer to bottom on new message
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  // 2. WebRTC Call Initiation (Caller - Auto-starts call)
  const handleCallUser = useCallback(
    async (targetId) => {
      const target = targetId || remoteSocketIdRef.current;
      const currentStream = myStreamRef.current;
      if (!target || !currentStream || callingRef.current) return;

      callingRef.current = true;
      peer.resetPeer();

      // Attach local stream tracks
      currentStream.getTracks().forEach((track) => {
        peer.peer.addTrack(track, currentStream);
      });

      // Handle ICE Candidates
      peer.peer.onicecandidate = (event) => {
        if (event.candidate && target && socket) {
          socket.emit("peer:ice-candidate", { to: target, candidate: event.candidate });
        }
      };

      // Handle Remote Track
      peer.peer.ontrack = (ev) => {
        if (ev.streams && ev.streams[0]) {
          setRemoteStream(ev.streams[0]);
        } else if (ev.track) {
          setRemoteStream(new MediaStream([ev.track]));
        }
      };

      try {
        const offer = await peer.getOffer();
        if (socket) {
          socket.emit("user:call", { to: target, offer });
        }
        showToast("Connecting video call...");
      } catch (err) {
        console.error("Error initiating offer:", err);
        callingRef.current = false;
      }
    },
    [socket, showToast]
  );

  // Auto-connect call when peer joins & stream is ready
  useEffect(() => {
    if (remoteSocketId && myStream && !remoteStream && !callingRef.current) {
      handleCallUser(remoteSocketId);
    }
  }, [remoteSocketId, myStream, remoteStream, handleCallUser]);

  // 3. Remote User Joined
  const handleUserJoined = useCallback(
    ({ email, id }) => {
      callingRef.current = false;
      setRemoteSocketId(id);
      setRemoteEmail(email || "Peer");
      showToast(`${email || "A peer"} joined the room!`);
      if (myStreamRef.current) {
        handleCallUser(id);
      }
    },
    [handleCallUser, showToast]
  );

  // 4. Handle Incoming Call (Receiver - Auto-answers call)
  const handleIncommingCall = useCallback(
    async ({ from, email, offer }) => {
      setRemoteSocketId(from);
      if (email) setRemoteEmail(email);

      peer.resetPeer();

      const currentStream = myStreamRef.current;
      if (currentStream) {
        currentStream.getTracks().forEach((track) => peer.peer.addTrack(track, currentStream));
      }

      peer.peer.onicecandidate = (event) => {
        if (event.candidate && socket) {
          socket.emit("peer:ice-candidate", { to: from, candidate: event.candidate });
        }
      };

      peer.peer.ontrack = (ev) => {
        if (ev.streams && ev.streams[0]) {
          setRemoteStream(ev.streams[0]);
        } else if (ev.track) {
          setRemoteStream(new MediaStream([ev.track]));
        }
      };

      try {
        const ans = await peer.getAnswer(offer);
        if (socket) {
          socket.emit("call:accepted", { to: from, ans });
        }
        showToast("Call connected!");
      } catch (err) {
        console.error("Error answering incoming call:", err);
      }
    },
    [socket, showToast]
  );

  // 5. Call Accepted
  const handleCallAccepted = useCallback(
    async ({ from, ans }) => {
      try {
        await peer.setLocalDescription(ans);
        showToast("Call connected!");
      } catch (err) {
        console.error("Error setting local description for answer:", err);
      }
    },
    [showToast]
  );

  // 6. ICE Candidate Received
  const handleRemoteIceCandidate = useCallback(async ({ candidate }) => {
    if (candidate) {
      await peer.addIceCandidate(candidate);
    }
  }, []);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      try {
        const ans = await peer.getAnswer(offer);
        if (socket) {
          socket.emit("peer:nego:done", { to: from, ans });
        }
      } catch (err) {
        console.error("Error handling negotiation incoming:", err);
      }
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    try {
      await peer.setLocalDescription(ans);
    } catch (err) {
      console.error("Error handling negotiation final:", err);
    }
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
  const handleUserLeft = useCallback(
    ({ email }) => {
      callingRef.current = false;
      setRemoteSocketId(null);
      setRemoteStream(null);
      setRemoteEmail("");
      peer.resetPeer();
      showToast(`${email || "Peer"} left the meeting.`);
    },
    [showToast]
  );

  // 11. Existing Room Users Sync
  const handleRoomUsers = useCallback(
    ({ existingUsers }) => {
      if (existingUsers && existingUsers.length > 0) {
        const firstUser = existingUsers[0];
        setRemoteSocketId(firstUser.id);
        if (firstUser.email) setRemoteEmail(firstUser.email);
        if (myStreamRef.current && !callingRef.current) {
          handleCallUser(firstUser.id);
        }
      }
    },
    [handleCallUser]
  );

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
    socket.on("room:users", handleRoomUsers);

    // Request active room members
    socket.emit("room:get-users", { room: roomId });

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
      socket.off("room:users", handleRoomUsers);
    };
  }, [
    socket,
    roomId,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleRemoteIceCandidate,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
    handleMediaToggle,
    handleChatMessage,
    handleUserLeft,
    handleRoomUsers,
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
    callingRef.current = false;
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
    <div className="ZeesuMeet-room-wrapper">
      {/* Toast Notification */}
      {toastMessage && <div className="toast-notice">{toastMessage}</div>}

      {/* Top ZeesuMeet Room Navbar */}
      <header className="bc-room-navbar">
        <div className="bc-room-brand" onClick={() => navigate("/")}>
          <ZeesuMeetLogo size={26} />
          <span>
            Zeesu<span style={{ color: "var(--primary-purple-hover)" }}>Meet</span>
          </span>
        </div>

        <div className="bc-room-pill-info">
          <span>
            Room: <strong>{roomId}</strong>
          </span>
          <ShieldCheckIcon size={14} style={{ color: "#10b981" }} />
          <button className="bc-copy-link-btn" onClick={copyRoomLink}>
            <CopyIcon size={12} /> Copy Link
          </button>
        </div>

        <div className="bc-room-right-actions">
          <div className="bc-user-count-badge">
            <UsersIcon size={14} /> {remoteSocketId ? "2 In Call" : "1 In Call"}
          </div>
          <button className="bc-leave-room-btn" onClick={leaveRoom}>
            <PhoneOffIcon size={14} /> Leave
          </button>
        </div>
      </header>

      {/* Main Video Call Area */}
      <main className="bc-room-main">
        <div className="bc-room-video-container">
          {/* Local User Video Tile */}
          <div className="bc-room-video-card active-stream">
            {isCameraOn ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`bc-room-video-element ${isScreenSharing ? "" : "mirrored"}`}
              />
            ) : (
              <div className="bc-avatar-fallback">{userEmail[0]?.toUpperCase() || "U"}</div>
            )}

            <div className="bc-room-overlay-bottom">
              <span>{userEmail} (You)</span>
              {isScreenSharing && (
                <span className="badge badge-warning" style={{ fontSize: "0.65rem" }}>
                  Sharing Screen
                </span>
              )}
            </div>

            <div className="bc-room-overlay-top-right">
              <div className={`bc-room-mic-status ${!isMicOn ? "muted" : ""}`}>
                {isMicOn ? <MicIcon size={14} /> : <MicOffIcon size={14} />}
              </div>
            </div>
          </div>

          {/* Remote Peer Video Tile */}
          {remoteSocketId ? (
            <div className="bc-room-video-card active-stream">
              {remoteCameraOn && remoteStream ? (
                <video ref={remoteVideoRef} autoPlay playsInline className="bc-room-video-element" />
              ) : (
                <div className="bc-avatar-fallback">{remoteEmail[0]?.toUpperCase() || "P"}</div>
              )}

              <div className="bc-room-overlay-bottom">
                <span>{remoteEmail || "Remote Peer"}</span>
              </div>

              <div className="bc-room-overlay-top-right">
                <div className={`bc-room-mic-status ${!remoteMicOn ? "muted" : ""}`}>
                  {remoteMicOn ? <MicIcon size={14} /> : <MicOffIcon size={14} />}
                </div>
              </div>
            </div>
          ) : (
            <div className="bc-room-video-card">
              <div className="bc-waiting-card">
                <UsersIcon size={44} style={{ marginBottom: "0.75rem", opacity: 0.5, color: "#6a55ea" }} />
                <h3>Waiting for others to join...</h3>
                <p>
                  Share the room code <strong>{roomId}</strong> to start collaborating.
                </p>
                <button
                  className="bc-copy-link-btn"
                  style={{ margin: "0 auto", padding: "6px 14px" }}
                  onClick={copyRoomLink}
                >
                  <CopyIcon size={14} /> Copy Invite Link
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Side Chat Drawer */}
        {isChatOpen && (
          <aside className="bc-room-chat-drawer">
            <div className="bc-chat-header">
              <span>In-Meeting Chat</span>
              <button
                className="bc-top-icon-btn"
                style={{ width: 28, height: 28 }}
                onClick={() => setIsChatOpen(false)}
              >
                <CloseIcon size={14} />
              </button>
            </div>

            <div className="bc-chat-messages">
              {chatMessages.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.4)",
                    marginTop: "auto",
                    marginBottom: "auto",
                    fontSize: "0.85rem",
                  }}
                >
                  No messages yet. Say hello!
                </div>
              ) : (
                chatMessages.map((msg) => {
                  const isMine = msg.sender === userEmail || msg.senderId === socket?.id;
                  return (
                    <div key={msg.id} className={`bc-chat-bubble ${isMine ? "mine" : "other"}`}>
                      {!isMine && <div className="bc-chat-sender">{msg.sender}</div>}
                      <div>{msg.message}</div>
                      <div className="bc-chat-time">{msg.time}</div>
                    </div>
                  );
                })
              )}
              <div ref={chatBottomRef} />
            </div>

            <form onSubmit={sendChatMessage} className="bc-chat-input-box">
              <input
                type="text"
                className="bc-chat-input"
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="bc-chat-send-btn">
                <SendIcon size={15} />
              </button>
            </form>
          </aside>
        )}
      </main>

      {/* Floating Bottom Control Toolbar */}
      <footer className="bc-room-toolbar">
        <button
          className={`bc-room-ctrl-btn ${!isMicOn ? "off" : "active"}`}
          onClick={toggleMic}
          title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
        >
          {isMicOn ? <MicIcon size={20} /> : <MicOffIcon size={20} />}
        </button>

        <button
          className={`bc-room-ctrl-btn ${!isCameraOn ? "off" : "active"}`}
          onClick={toggleCamera}
          title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
        >
          {isCameraOn ? <VideoIcon size={20} /> : <VideoOffIcon size={20} />}
        </button>

        <button
          className={`bc-room-ctrl-btn ${isScreenSharing ? "active" : ""}`}
          onClick={toggleScreenShare}
          title={isScreenSharing ? "Stop Screen Share" : "Share Screen"}
        >
          <ScreenShareIcon size={20} />
        </button>

        <button
          className={`bc-room-ctrl-btn ${isChatOpen ? "active" : ""}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
          title="Toggle In-Meeting Chat"
        >
          <ChatIcon size={20} />
        </button>

        <button className="bc-room-ctrl-btn end-call" onClick={leaveRoom} title="Leave Meeting">
          <PhoneOffIcon size={20} />
        </button>
      </footer>
    </div>
  );
};

export default RoomPage;
