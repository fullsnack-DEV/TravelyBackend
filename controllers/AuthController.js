const User = require("../models/Usermodel");
const ErrorResponse = require("../utils/Errorresponse");
const Sendemail = require("../utils/sendEmail");
const crypto = require("crypto");

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

    sendtoken(user, 201, res);
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

    sendtoken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.forgotpassword = async (req, res, next) => {
  //Check the Email of the usr and compare

  try {
    //find the user

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorResponse("Invalid Could not be sent", 404));
    }

    //resetting the token
    const resettoken = user.getresettoken(); //saving token to user schema
    //save to Database
    await user.save();

    const reseturl = `http://localhost:3000/passwordreset/${resettoken}`;
    const message = `<h1>You have requested a Password</h1>
                    <a href=${reseturl} clicktracking=off> ${reseturl} </a>`;

    try {
      //Sending Email

      await Sendemail({
        email: user.email,
        subject: "Password Reset",
        message,
      });

      res.status(200).json({
        success: true,
        data: "Email Send",
      });
    } catch (error) {
      user.resetpasswordtoken = undefined;
      user.resetpasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email Could not be Send", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = async (req, res, next) => {
  const resetpasswordtoken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetpasswordtoken,
      resetpasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token", 500));
    }

    user.password = req.body.password;
    user.resetpasswordtoken = undefined;
    user.resetpasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

//This will give the Signed token
const sendtoken = (user, statuscode, res) => {
  const token = user.getsignedtoken();
  res.status(statuscode).json({
    success: true,
    token: token,
  });
};

//Building  Protected Routes
