const Product = require('../models/Product');
const { dataFilter } = require('../middlewares/dataFilter');

exports.createProduct = async (req, res, next) => {
    try {
        const document = dataFilter(req.body, {
            name: 'string',
            brand: 'string',
            price: 'number',
            description: 'string',
            countInStock: 'number',
            category: 'array',
        });
        const product = await Product.create(document);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Tạo sản phẩm thành công',
            data: {
                product,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const filter =
            'name brand price description images category countInStock review';
        const product = await Product.findById(productId, filter);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Lấy thông tin sản phẩm thành công',
            data: { product },
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const dataCheck = dataFilter(req.body, {
            name: 'string',
            brand: 'string',
            price: 'number',
            description: 'string',
            category: 'array',
            countInStock: 'number',
            images: 'array',
        });
        let document = dataCheck;
        const filter =
            'name brand price description images category countInStock';
        const product = await Product.findByIdAndUpdate(productId, document, {
            new: true,
            runValidators: true,
        }).select(filter);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Cập nhật thông tin thành công',
            data: { product },
        });
    } catch (error) {
        next(error);
    }
};

// exports.getUser = async (req, res, next) => {
//     try {
//         const { userId } = req.params;
//         const filter =
//             "avatar contact email username role isEmailVerified isContactVerified isActive";
//         const user = await User.findById(userId, filter);
//         res.status(200).json({
//             status: "success",
//             type: "object",
//             message: "Lấy thông tin người dùng thành công",
//             data: { user },
//         });
//     } catch (error) {
//         res.json(error);
//     }
// };

// exports.updateUser = async (req, res, next) => {
//     try {
//         const { userId } = req.params;
//         const document = dataFilter(req.body, {
//             contact: "string",
//             avatar: "string",
//             email: "string",
//             isContactVerified: "boolean",
//             isEmailVerified: "boolean",
//             isActive: "boolean",
//         });
//         const filter =
//             "avatar contact email username role isEmailVerified isContactVerified isActive";
//         const user = await User.findByIdAndUpdate(userId, document, {
//             new: true,
//             runValidators: true,
//         }).select(filter);
//         res.status(200).json({
//             status: "success",
//             type: "object",
//             message: "Cập nhật thông tin người dùng thành công",
//             data: {
//                 user,
//             },
//         });
//     } catch (error) {
//         next(error);
//     }
// };

exports.deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            status: 'success',
            type: 'message',
            message: 'Xóa sản phẩm thành công',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

exports.queryProduct = async (req, res, next) => {
    try {
        const query = dataFilter(req.query, {
            brand: 'string',
            price: 'number',
            category: 'string',
        });
        // const filter =
        //     "name brand images price description category countInStock isActive";
        const products = await Product.find(query);
        if (products.length !== 0) {
            res.status(200).json({
                status: 'success',
                type: 'array',
                length: products.length,
                message: 'Lấy dữ liệu thành công',
                data: { products },
            });
        } else {
            res.status(200).json({
                status: 'success',
                type: 'message',
                message: 'Không có dữ liệu phù hợp',
                data: null,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.reviewProduct = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { productId } = req.params;
        const dataCheck = dataFilter(req.body, {
            comment: 'string',
            rating: 'number',
        });
        const document = {
            ...dataCheck,
            userId,
        };
        const query = {
            $push: { 'review.data': document },
            $inc: { 'review.length': 1 },
        };
        const filter = 'review';
        await Product.findByIdAndUpdate(productId, query, {
            new: true,
            runValidators: true,
        }).select(filter);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Gửi đánh giá thành công',
            data: { document },
        });
    } catch (error) {
        next(error);
    }
};
