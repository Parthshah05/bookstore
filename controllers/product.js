const Product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, pro) => {
    if (err) {
      return res.status(400).json({
        status: "Error",
        statusCode: 400,
        Message: "Product not found in DB",
      });
    }
    req.product = pro;
    next();
  });
};

exports.createProduct = (req, res) => {
  const product = new Product(req.body);
  product.save((err, product) => {
    if (err) {
      return res.status(400).json({
        status: "Error",
        statusCode: 400,
        error: "NOT able to save product in DB",
      });
    }
    res.json({
      status: "Success",
      statusCode: 200,
      message: "Successfully Created",
      data: product,
    });
  });
};

exports.getProduct = (req, res) => {
  return res.json({
    status: "Success",
    statusCode: 200,
    message: "Successfully Viewed",
    data: req.Product,
  });
};

exports.getAllProduct = (req, res) => {
  Product.find()
  .populate("category")
  .exec((err, products) => {
    if (err) {
      return res.status(400).json({
        status: "Error",
        statusCode: 400,
        error: "NO Product found",
      });
    }
    res.json({
      status: "Success",
      statusCode: 200,
      message: "Successfully View",
      Data: products,
    });
  });
};

exports.updateProduct = (req, res) => {
  const proid = req.query.id;
  Product.findByIdAndUpdate(
    { _id: proid },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, pro) => {
      if (err) {
        return res.status(400).json({
          status: "Error",
          statusCode: 400,
          error: "You are not authorized to update this Product",
        });
      }
       res.json({
        status: "Success",
        statusCode: 200,
        message: "Successfully Update",
        data: pro,
      });
    }
  );
};

exports.removeProduct = (req, res) => {
  const product = req.product;

  product.remove((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this product",
      });
    }
    res.json({
      status: "Success",
      statusCode: 200,
      message: "Successfull deleted",
    });
  });
};
