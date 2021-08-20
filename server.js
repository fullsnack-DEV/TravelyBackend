//dot env require
const dotenv = require("dotenv");

//path for dot env
dotenv.config({ path: "./config.env" });

const AuthRouter = require("./Routes/AuthRoutes");

const connectdb = require("./config/databse");
//requiring the Express
const express = require("express");

connectdb();

//

//calling express
const app = express();

app.use(express.json());
app.use("/api/auth", require("./Routes/AuthRoutes"));

const PORT = process.env.PORT || 5000;
//Create a Port to Listen
app.listen(PORT, () => console.log(`Listing on the Port ${PORT}`));
