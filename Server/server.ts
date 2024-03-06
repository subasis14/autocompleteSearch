/* eslint-disable @typescript-eslint/no-var-requires */
// server.ts
const express = require('express');
const http=require('http')
const app = express();
const PORT =  3001;
const httpServer=http.createServer(app)
app.use('/fetchData',require('./routes/api/data'));


httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
