const User = require("../models/Usermodel");

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
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  //getting the Email and Password from the Req

  const { email, password } = req.body;

  //Check if email and password is present or not

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "Please provid the email and password" });
  }

  try {
    //Find the user with that email in the databse
    const user = await User.findOne({ email }).select("+password"); //Selecting the Password of the user
    //Check if user is present or not
    if (!user) {
      res.status(404).json({
        success: false,
        error: "Invalid Credential",
      });
    }

    //check if password matches or not
    const ismatched = await user.matchpassword(password);

    if (!ismatched) {
      res.status(404).json({
        success: false,
        error: "Invalid email and password",
      });
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
