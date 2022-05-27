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

exports.queryProduct = async (req, res, next) => {
    try {
        const query = req.query;
        const products = await Product.find(query);
        res.status(200).json({
            status: "success",
            length: products.length,
            data: { products },
        });
    } catch (error) {
        res.json(error);
    }
};

exports.reviewProduct = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { productId, rating, content } = req.body;
        const { review } = await Product.findById(productId).select(
            "review.rate review.length"
        );

        // const { rate, length } = review;
        console.log(review);
        // rate = (rate * length + rating) / (length + 1);
        // length = length + 1;
        // console.log(rate, length);
        const product = await Product.findByIdAndUpdate(
            productId,
            {
                rate: rate,
                length: length,
                $push: {
                    "review.data": {
                        userId: userId,
                        comment: content,
                        rating: rating,
                    },
                },
            },
            { new: true, runValidators: true }
        ).select("review");
        res.status(200).json({
            status: "success",
            message: "Review success",
            data: {
                product,
            },
        });
    } catch (error) {
        res.json(error);
    }
};
