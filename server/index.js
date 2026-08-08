const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify({ status: "ok", service: "Zeesu-Meet Server", time: new Date() }));
});

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const socketToUserMap = new Map(); // socket.id -> { email, room }
const roomToSocketsMap = new Map(); // room -> Set(socket.id)

io.on("connection", (socket) => {
  console.log(`Socket Connected: ${socket.id}`);

  socket.on("room:join", (data) => {
    const { email, room } = data;
    socketToUserMap.set(socket.id, { email, room });

    if (!roomToSocketsMap.has(room)) {
      roomToSocketsMap.set(room, new Set());
    }
    roomToSocketsMap.get(room).add(socket.id);

    socket.join(room);
    
    // Notify existing room members that a new user joined
    socket.broadcast.to(room).emit("user:joined", { email, id: socket.id });
    
    // Confirm room join to the requester with existing members if needed
    const existingUsersInRoom = Array.from(roomToSocketsMap.get(room))
      .filter((id) => id !== socket.id)
      .map((id) => ({ id, email: socketToUserMap.get(id)?.email }));

    io.to(socket.id).emit("room:join", { ...data, existingUsers: existingUsersInRoom });
  });

  socket.on("room:get-users", ({ room }) => {
    if (!roomToSocketsMap.has(room)) return;
    const existingUsersInRoom = Array.from(roomToSocketsMap.get(room))
      .filter((id) => id !== socket.id)
      .map((id) => ({ id, email: socketToUserMap.get(id)?.email }));
    
    socket.emit("room:users", { existingUsers: existingUsersInRoom });
  });

  // WebRTC Signaling Calls
  socket.on("user:call", ({ to, offer }) => {
    const user = socketToUserMap.get(socket.id);
    io.to(to).emit("incomming:call", { from: socket.id, email: user?.email, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:ice-candidate", ({ to, candidate }) => {
    io.to(to).emit("peer:ice-candidate", { from: socket.id, candidate });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  // Media Track Status Sync (Mic Mute / Camera Off)
  socket.on("media:toggle", ({ to, type, enabled }) => {
    io.to(to).emit("media:toggle", { from: socket.id, type, enabled });
  });

  // Chat Messages
  socket.on("chat:message", ({ room, message }) => {
    const user = socketToUserMap.get(socket.id);
    const payload = {
      id: Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      sender: user?.email || "Anonymous",
      senderId: socket.id,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    io.to(room).emit("chat:message", payload);
  });

  // Room Leaving / Disconnect handling
  const handleUserLeave = () => {
    const user = socketToUserMap.get(socket.id);
    if (!user) return;
    const { room, email } = user;

    socketToUserMap.delete(socket.id);
    if (roomToSocketsMap.has(room)) {
      roomToSocketsMap.get(room).delete(socket.id);
      if (roomToSocketsMap.get(room).size === 0) {
        roomToSocketsMap.delete(room);
      }
    }

    socket.leave(room);
    io.to(room).emit("user:left", { id: socket.id, email });
    console.log(`User ${email} (${socket.id}) left room ${room}`);
  };

  socket.on("room:leave", handleUserLeave);
  socket.on("disconnect", handleUserLeave);
});

