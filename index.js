const { Command } = require('commander');
const mongoose = require('mongoose');
const express = require('express');
const program = new Command();
const app = express();
const port = 3000;

const AuctionItem = mongoose.model('AuctionItem', new mongoose.Schema({
  title: String,
  description: String,
  start_price: Number,
  reserve_price: Number
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auction');

program
  .command('seed')
  .description('Seed data into MongoDB')
  .action(async () => {
    const data = [
      { title: 'Vintage Clock', description: 'An antique clock.', start_price: 100, reserve_price: 150 },
      { title: 'Painting', description: 'A beautiful painting.', start_price: 200, reserve_price: 300 },
      { title: 'Sculpture', description: 'A modern sculpture.', start_price: 300, reserve_price: 450 }
    ];
    await AuctionItem.insertMany(data);
    console.log('Data seeded!');
    mongoose.connection.close(); // Close connection after seeding
  });

program
  .command('delete')
  .description('Delete data from MongoDB')
  .action(async () => {
    await AuctionItem.deleteMany({});
    console.log('Data deleted!');
    mongoose.connection.close(); // Close connection after deleting
  });

if (process.argv.includes('start-server')) {
  // Start the server if 'start-server' command is passed
  app.get('/api/search', async (req, res) => {
    console.log("Search API has been hit!")
    const { query } = req.query;

    if (!query) {
      return res.status(400).send('Query parameter is required');
    }
    
    try {
      const items = await AuctionItem.find({
        $or: [
          { title: new RegExp(query, 'i') },
          { description: new RegExp(query, 'i') }
        ]
      });

      res.json(items);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} else {
  // Parse CLI commands
  program.parse(process.argv);
}
