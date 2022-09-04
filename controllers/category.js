const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        status: "Error",
        statusCode: 400,
        Message: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        status: "Error",
        statusCode: 400,
        error: "NOT able to save category in DB",
      });
    }
    res.json({
      status: "Success",
      statusCode: 200,
      message: "Successfully Created",
      data: category,
    });
  });
};

exports.getCategory = (req, res) => {
  return res.json({
    status: "Success",
    statusCode: 200,
    message: "Successfully Viewed",
    data: req.Category,
  });
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        status: "Error",
        statusCode: 400,
        error: "NO categories found",
      });
    }
    res.json({
      status: "Success",
      statusCode: 200,
      message: "Successfully View",
      Data: categories,
    });
  });
};

exports.updateCategory = (req, res) => {
  const catid = req.query.id;
  Category.findByIdAndUpdate(
    { _id: catid },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, cat) => {
      if (err) {
        return res.status(400).json({
          status: "Error",
          statusCode: 400,
          error: "You are not authorized to update this Category",
        });
      }
      cat.salt = undefined;
      cat.encry_password = undefined;
      res.json({
        status: "Success",
        statusCode: 200,
        message: "Successfully Update",
        data: cat,
      });
    }
  );
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category",
      });
    }
    res.json({
      status: "Success",
      statusCode: 200,
      message: "Successfull deleted",
    });
  });
};
