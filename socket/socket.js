const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];
const addUser = (userId, socketId, userInfo) => {
  const checkUser = users.some((u) => u.userId === userId);

  if (!checkUser) {
    users.push({ userId, socketId, userInfo });
  }
};

const userRemove = (socketId) => {
  users = users.filter((usr) => usr.socketId !== socketId);
};

const findFriend = (id) => {
  return users.find((usr) => usr.userId === id);
};

const userLogout = (userId) => {
  users = users.filter(u=>u.userId !== userId)
}

io.on("connection", (socket) => {
  console.log(`Socket is connecting...`);
  socket.on("addUser", (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);
    io.emit("getUser", users);
  });

  socket.on("sendMessage", (data) => {
    const user = findFriend(data.receiverId);

    if (user !== undefined) {
      socket.to(user.socketId).emit("getMessage", data)}
  });

  socket.on("messageSeen", (msg) => {
    const user = findFriend(msg.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("msgSeenResponse", msg)}
  });
  
  socket.on("deliveredMessage", (msg) => {
    const user = findFriend(msg.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("msgDeliveredResponse", msg)}
  });
  
  socket.on('seen', (data)=>{
    const user = findFriend(data.senderId);
    if (user !== undefined){
      socket.to(user.socketId).emit('seenSuccess', data)
    }
  })

  socket.on('typingMessage', (data)=>{
    const user = findFriend(data.receiverId);

    if (user !== undefined) {
      socket.to(user.socketId).emit("getTypingMessage", {
        senderId: data.senderId,
        receiverId: data.receiverId,
        msg : data.msg
      });
      
    }
  })

  socket.on('logout',userId => {
    userLogout(userId);
})

  socket.on("disconnect", () => {
    console.log("User is disconnected...");
    userRemove(socket.id);
    io.emit("getUser", users);
  });
});
