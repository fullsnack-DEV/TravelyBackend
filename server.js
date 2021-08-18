//dot env require
require("dotenv").config();

const AuthRouter = require("./Routes/AuthRoutes");

//requiring the Express
const express = require("express");

//calling express
const app = express();

app.use(express.json());
app.use("/api/auth", require("./Routes/AuthRoutes"));

const PORT = process.env.PORT || 5000;
//Create a Port to Listen
app.listen(PORT, () => console.log(`Listing on the Port ${PORT}`));
