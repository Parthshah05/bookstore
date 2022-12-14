const User = require("../models/user");
const { validationResult, check } = require("express-validator");
var jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        Status: "Error",
        statusCode: 400,
        err: "Not able to save User",
      });
    }
    res.json({
      status: "Success",
        statusCode: 200,
        message: "Successfully Created",
        user: {
          name: user.name,
          email: user.email,
          id: user._id         
        },
    });
  });

};

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = await req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  await User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        status: "Error",
        statusCode: 400,
        message: "USER email does not exists",
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        status: "Error",
        statusCode: 401,
        message: "Email and password do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.cookie("token", token);

    const { _id, name, email, role } = user;
    return res.json({
      status: "Success",
      statusCode: 200,
      token,
      message: "SignIn Successfully",
      user: { _id, name, email, role },
    });
  });
};

exports.signout = async (req, res) => {
  await res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

exports.isSignedIn = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      Status: "Error",
      statusCode: 403,
      message: "No Token Provided",
    });
  }
  const bearer = token.split(" ");
  const bearerToken = bearer[1];

  jwt.verify(bearerToken, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        Status: "Error",
        statusCode: 401,
        message: "Invalid Token",
      });
    }
    req.userId = decoded._id;

    next();
  });
};

//custom middlewares
exports.isAuthenticated = async (req, res, next) => {
  let checker =
    (await req.profile) && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      Status: "Error",
      statusCode: 403,
      error: "ACCESS DENIED",
    });
  }
  next();
};

