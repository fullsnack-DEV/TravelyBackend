//dot env require
require("dotenv").config();

//requiring the Express
const express = require("express");

//calling express
const app = express();

const PORT = process.env.PORT || 5000;

//Creating a dummy Route
app.get("/", (req, res) => {
  res.send("HeLlo from the Server");
});

//Create a Port to Listen
app.listen(PORT, () => console.log(`Listing on the Port ${PORT}`));
