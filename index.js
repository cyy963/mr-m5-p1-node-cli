const { Command } = require('commander');
const mongoose = require('mongoose');
const program = new Command();

const AuctionItem = mongoose.model('AuctionItem', new mongoose.Schema({
  title: String,
  description: String,
  start_price: Number,
  reserve_price: Number
}));

mongoose.connect('mongodb://localhost:27017/auction', { useNewUrlParser: true, useUnifiedTopology: true });

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
    mongoose.connection.close();
  });

program
  .command('delete')
  .description('Delete data from MongoDB')
  .action(async () => {
    await AuctionItem.deleteMany({});
    console.log('Data deleted!');
    mongoose.connection.close();
  });

program.parse(process.argv);
