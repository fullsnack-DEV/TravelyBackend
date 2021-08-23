//Chekc the JSon token in headers

const jwt = require("jsonwebtoken");
const User = require("../models/Usermodel");
const ErrorResponse = require("../utils/Errorresponse");

exports.protect = async (req, res, next) => {
  let token;

  //Check the Header

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //get the token
    token = req.headers.authorization.split(" ")[1];
  }

  //if  token  not  found

  if (!token) {
    return next(new ErrorResponse("Not Authrozed to access this route", 401));
  }

  //compare the Token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("No USer Found", 401));
    }
    next();
  } catch (error) {
    return next(new ErrorResponse("Not Authorized to access thus route", 401));
  }
};
