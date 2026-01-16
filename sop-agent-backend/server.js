const express = require('express');
const app = express();

const connectDB = require("./config/db");
 connectDB();

const port = 5000;

app.use('/api', require('./routes/upload'));

app.get('/', (req, res) => {
  res.send('sop-agent-backend is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





