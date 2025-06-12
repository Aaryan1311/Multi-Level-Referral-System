const { Server } = require('socket.io');

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('🔌 WebSocket connected:', socket.id);

    socket.on('register', (userId) => {
      console.log(`🧾 User ${userId} registering for socket events`);
      if (userId) {
        socket.join(userId.toString());
        console.log(`✅ User ${userId} joined room`);
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ WebSocket disconnected:', socket.id);
    });
  });
}

function emitToUser(userId, payload) {
  if (io) {
    console.log(`📤 Emitting to user ${userId}:`, payload);
    io.to(userId.toString()).emit('earningUpdate', payload);
  }
}

module.exports = {
  initSocket,
  emitToUser,
};
