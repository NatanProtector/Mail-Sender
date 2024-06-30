const ReceiverStratagy = require("./Stratagies/ReceiverStratagy");


const Database = new ReceiverStratagy();

async function test() {
  const results = await Database.getReceivers();
  console.log(results);
}

test();