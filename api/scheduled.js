require('dotenv').config();

const {MJ_API_KEY, MJ_API_SECRET} = process.env;

const SenderStratagy = require("../Stratagies/SenderStratagy.js");
const RecieverStratagy = require("../Stratagies/ReceiverStratagy.js");

const senderStratagy = new SenderStratagy(MJ_API_KEY, MJ_API_SECRET);
const receiverStratagy = new RecieverStratagy();
const Notifier = require("../Notifier.js");

const notifier = new Notifier(senderStratagy, receiverStratagy);

module.exports = async function handler() {
    // Your scheduled task logic here
    
    await notifier.notify();

    console.log("Scheduled function ran");
  };