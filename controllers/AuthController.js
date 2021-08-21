const User = require("../models/Usermodel");
const ErrorResponse = require("../utils/Errorresponse");

exports.register = async (req, res, next) => {
  //Destructuring
  const { username, email, password } = req.body;
  try {
    //Creating the user with the Schema
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  //getting the Email and Password from the Req

  const { email, password } = req.body;

  //Check if email and password is present or not

  if (!email || !password) {
    return next(new ErrorResponse("Please Provide an Email and Password", 400));
  }

  try {
    //Find the user with that email in the databse
    const user = await User.findOne({ email }).select("+password"); //Selecting the Password of the user
    //Check if user is present or not
    if (!user) {
      return next(new ErrorResponse("Invalid Credential", 404));
    }

    //check if password matches or not
    const ismatched = await user.matchpassword(password);

    if (!ismatched) {
      return next(new ErrorResponse("Invalid Email amd Password", 404));
    }

    //if everything is fine then respond witht the token

    res.status(200).json({
      success: true,
      message: "Welcome",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send("forgot password Route");
};

exports.resetpassword = (req, res, next) => {
  res.send("resetpassword Route");
};
