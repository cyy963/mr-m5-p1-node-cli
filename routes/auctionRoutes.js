const express = require('express');
const { searchAuctionItems } = require('../controllers/auctionController');

const router = express.Router();

router.get('/search', searchAuctionItems );

module.exports = router;
