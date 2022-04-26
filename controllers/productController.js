const Product = require('../models/Product');

exports.getProductInfo = async (req, res, next) => {
    try {
        const {productId} = req.params;
        const product = await Product.findById(productId);
        res.status(200).json({
            status: 'success',
            data: {product}
        })
    } catch (error) {
        res.json(error);
    }
} 

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