//dot env require
const dotenv = require("dotenv");

//path for dot env
dotenv.config({ path: "./config.env" });

const AuthRouter = require("./Routes/AuthRoutes");

const ErrorHandler = require("./middlewares/error");

const connectdb = require("./config/databse");
//requiring the Express

const express = require("express");

//calling express
const app = express();

connectdb();

//To get Access to the JSOn data via a Req
app.use(express.json());
//Auth Route
app.use("/api/auth", require("./Routes/AuthRoutes"));
app.use("/api/private", require("./Routes/private"));

app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;
//Create a Port to Listen
app.listen(PORT, () => console.log(`Listing on the Port ${PORT}`));
