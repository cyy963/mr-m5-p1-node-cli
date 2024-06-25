#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const mongoose = require('mongoose');
const connectDB = require('../database');
const { seedAuctionItems, deleteAuctionItems } = require('../controllers/auctionController');

const program = new Command();

async function main() {
  await connectDB();

  program
    .command('seed')
    .description('Seed data into MongoDB')
    .action(async () => {
      await seedAuctionItems();
      mongoose.connection.close();
    });

  program
    .command('delete')
    .description('Delete data from MongoDB')
    .action(async () => {
      await deleteAuctionItems();
      mongoose.connection.close();
    });

  program.parse(process.argv);
}

main();
