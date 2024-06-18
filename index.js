const { Command } = require('commander');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./database');
const { seedAuctionItems, deleteAuctionItems } = require('./controllers/auctionController');
const auctionRoutes = require('./routes/auctionRoutes');

const program = new Command();
const app = express();
const port = 3000;

connectDB();

program
  .command('seed')
  .description('Seed data into MongoDB')
  .action(async () => {
    await seedAuctionItems();
    mongoose.connection.close(); // Close connection after seeding
  });

program
  .command('delete')
  .description('Delete data from MongoDB')
  .action(async () => {
    await deleteAuctionItems();
    mongoose.connection.close(); // Close connection after deleting
  });

if (process.argv.includes('start-server')) {
  // Start the server if 'start-server' command is passed
  app.get('/', (req, res) => {
    res.send('Welcome to the Auction API');
  });

  app.use('/api', auctionRoutes);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} else {
  // Parse CLI commands
  program.parse(process.argv);
}
