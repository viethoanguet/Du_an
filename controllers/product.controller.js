const Product = require("../models/Product");

exports.getProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        res.status(200).json({
            status: "success",
            data: { product },
        });
    } catch (error) {
        res.json(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByIdAndUpdate(
            productId,
            { ...req.body },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: "success",
            data: { product },
        });
    } catch (error) {
        res.json(error);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create({ ...req.body });
        res.status(200).json({
            status: "success",
            data: { product },
        });
    } catch (error) {
        res.json(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            status: "success",
            message: "product has been deleted",
        });
    } catch (error) {
        res.json(error);
    }
};

exports.getAllProduct = async (req, res, next) => {
    try {
        console.log("entry");
        const productArr = await Product.find({});
        console.log("find");
        console.log(productArr);
        res.status(200).json({
            status: "success",
            length: productArr.length,
            data: { productArr },
        });
    } catch (error) {
        res.json(error);
    }
};

// exports.getAllProductInfo = async (req, res, next) => {
//     try {
//         const products = await Product.find({});
//         res.status(200).json({
//             status: 'success',
//             result: products.length,
//             data: {products}
//         })
//     } catch (error) {
//         res.json(error);
//     }
// }
