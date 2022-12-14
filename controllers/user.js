const User = require("../models/user");

exports.getUserById = async (req, res, next, id) => {
  await User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        status: "Error",
        statusCode: 400,
        message: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = async (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json({
    status: "Success",
    statusCode: 200,
    message: "Successfully Viewed",
    Data: req.profile,
  });
};

exports.getAllUsers = async (req, res) => {
  //let limit = await req.query.limit ? parseInt(req.query.limit) : 4;
  //let sortBy = await req.query.sortBy ? await req.query.sortBy : "_id";
  //let sortOrder = await req.query.OrderBy && await req.query.OrderBy === "desc" ? -1 : 1;
  var usersearch = new RegExp(req.query.name, "i");
  var addresssearch = new RegExp(req.query.address, "i");
  
  await User.find({ name: usersearch, address: addresssearch })
    
    .select("-photo")
    .select("-salt")
    .select("-encry_password")
    .select("-__v")
    // .sort([[sortBy, sortOrder]])
    // .limit(limit)
     .exec((err, users) => {
      if (err || !users) {
        return res.status(400).json({
          status: "Error",
          statusCode: 400,
          message: "No User Found",
        });
      }

      res.json({
        status: "Success",
        statusCode: 200,
        message: "Successfully View",
        Data: users,
      });
    });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
          if (err) {
            return res.status(400).json({
              status: "Error",
              statusCode: 400,
              message: "You are not authorized to update this user",
            });
          }
          user.salt = undefined;
          user.encry_password = undefined;
          res.json({
            status: "Success",
            statusCode: 200,
            message: "Successfully Updated",
            data: user,
          });
        }
      );
};
exports.deleteUser = async (req, res) => {
  const user = req.profile._id;
  await User.findById(user).remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        status: "Error",
        statusCode: 400,
        message: "Failed to delete the User",
      });
    }
    res.json({
      status: "Success",
      statusCode: 200,
      message: "Successfully deleted",
      deletedUser,
    });
  });
};
