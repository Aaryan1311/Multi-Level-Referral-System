const express = require('express');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is running on port: ${ServerConfig.PORT}`);
});