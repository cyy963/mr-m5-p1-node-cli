const mongoose = require('../db');

const auctionItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);

module.exports = AuctionItem;
