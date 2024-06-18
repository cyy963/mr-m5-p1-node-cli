const AuctionItem = require('../models/auctionItem');

async function seedAuctionItems() {
  const data = [
    { title: 'Vintage Clock', description: 'An antique clock.', start_price: 100, reserve_price: 150 },
    { title: 'Painting', description: 'A beautiful painting.', start_price: 200, reserve_price: 300 },
    { title: 'Sculpture', description: 'A modern sculpture.', start_price: 300, reserve_price: 450 },
    { title: 'Antique Vase', description: 'A beautiful antique vase.', start_price: 150, reserve_price: 200 },
    { title: 'Rare Book', description: 'A rare first edition book.', start_price: 500, reserve_price: 750 },
    { title: 'Collectible Coin', description: 'A valuable collectible coin.', start_price: 250, reserve_price: 350 },
    { title: 'Luxury Watch', description: 'A luxury brand watch.', start_price: 1000, reserve_price: 1500 },
    { title: 'Classic Car', description: 'A vintage classic car.', start_price: 50000, reserve_price: 75000 },
    { title: 'Jewelry Set', description: 'A set of fine jewelry.', start_price: 2000, reserve_price: 3000 },
    { title: 'Designer Handbag', description: 'A designer brand handbag.', start_price: 800, reserve_price: 1200 }
  ];
  await AuctionItem.insertMany(data);
  console.log('Data seeded!');
}

async function deleteAuctionItems() {
  await AuctionItem.deleteMany({});
  console.log('Data deleted!');
}

async function searchAuctionItems(req, res) {
  console.log("Search API has been hit!");
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
}

module.exports = {
  seedAuctionItems,
  deleteAuctionItems,
  searchAuctionItems
};
