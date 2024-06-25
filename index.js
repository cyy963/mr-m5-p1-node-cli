const express = require('express');
const connectDB = require('./database');
const auctionRoutes = require('./routes/auctionRoutes');

const app = express();
const port = 3000;

connectDB();

app.use('/api', auctionRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Auction API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
