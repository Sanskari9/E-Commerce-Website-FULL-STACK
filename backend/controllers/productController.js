const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrors = require("../middleware/asyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create Product - Admin
exports.createProduct = asyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
}
);

// get All product
exports.getAllproducts = asyncErrors(async (req, res) => {

 const apiFeature = new ApiFeatures(Product.find(),req.query).search();

  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
}
)

// Get Product Details
exports.getProductDetails = asyncErrors(async(req,res,next) =>{

  const product = await Product.findById(req.params.id);

  if (!product) {
      return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
      success: true,
      product
  })
})

// Update Product --Admin
exports.updateProduct = asyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }


  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
}
);


//Delete Product
exports.deleteProduct = asyncErrors(async(req,res,next) =>{
  const product = await Product.findById(req.params.id);

  if(!product){
      return res.status(500).json({
          success:false,
          message:"Product not found"
      })
  }
  await Product.deleteOne({ _id: req.params.id });

  res.status(200).json({
      success: true,
      message:"Product delete successfully"
  })
})
