const User = require("../models/Usermodel");

exports.register = async (req, res, next) => {
  //Destructuring
  const { username, email, password } = req.body;
  try {
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

exports.login = (req, res, next) => {
  res.send("login route");
};

exports.forgotpassword = (req, res, next) => {
  res.send("forgot password Route");
};

exports.resetpassword = (req, res, next) => {
  res.send("resetpassword Route");
};
