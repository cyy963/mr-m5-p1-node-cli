const mongoose = require('mongoose');

const AuctionItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  start_price: Number,
  reserve_price: Number
});

const AuctionItem = mongoose.model('AuctionItem', AuctionItemSchema);

module.exports = AuctionItem;
