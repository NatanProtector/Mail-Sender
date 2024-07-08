const handler = require("./api/scheduled.js");
const express = require("express");
require('dotenv').config()

const secret_url = process.env.SECRET_URL;

const app = express();

app.get(secret_url, (req,res) => {

    handler();

    console.log('Mail sent successfully');
    
    res.status(200).send("Mail sent");

});


app.listen(3000, () => console.log("Server running on port 3000"));