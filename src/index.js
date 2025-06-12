const express = require('express');
const { ServerConfig, SocketServer } = require('./config');
const apiRoutes = require('./routes');
const { errorHandler } = require('./middlewares');
const http = require('http');
const path = require('path');

const app = express();



const server = http.createServer(app);
SocketServer.initSocket(server);

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.use(errorHandler);

server.listen(ServerConfig.PORT, () => {
  console.log(`Server with WebSocket is running on port: ${ServerConfig.PORT}`);
});
