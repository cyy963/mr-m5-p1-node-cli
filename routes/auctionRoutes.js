const express = require('express');
const router = express.Router();
const { searchAuctionItems } = require('../controllers/auctionController');

router.get('/search', searchAuctionItems);

module.exports = router;
