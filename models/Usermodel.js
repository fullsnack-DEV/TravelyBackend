const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    require: ["true", "Please Provide the Username"],
  },
  email: {
    type: String,
    require: ["true", "Please Provde the Email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
      "Please Provide a Valid Email",
    ],
  },
  password: {
    type: String,
    required: [true, "Plaese provide Password"],
    minlength: 5,
    select: false,
  },
  resetpasswordtoken: String,
  resetpasswordExpire: Date,
});

//Hashing the Password

UserScheme.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Creating the Method to check the Matched Password

UserScheme.methods.matchpassword = async function (password) {
  return await bcrypt.compare(password, this.password);
  //this.password refers to the password of the user we call the Matchpassword Method
};

//creating the Method to sigend the token / creating the Token
UserScheme.methods.getsignedtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const User = mongoose.model("User", UserScheme);

//on this User we have a create Method in which we can pass the Model and It will create the USerSchema as Defines

module.exports = User;
