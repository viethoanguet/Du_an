const Cart = require('../models/Cart');
const User = require('../models/User');
const { dataFilter } = require('../middlewares/dataFilter');

exports.createCart = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { itemArr } = req.body;
        const cart = await Cart.create({ userId: userId, itemArr });
        await User.findByIdAndUpdate(userId, { cart: cart._id });
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Tạo giỏ hàng thành công',
            data: { cart },
        });
    } catch (error) {
        next(error);
    }
};
exports.showMyCart = async (req, res, next) => {
    // code
    try {
        const { userId } = req.user;
        const cart = await Cart.findOne({ userId: userId }).select('itemArr');
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Lấy giỏ hàng thành công',
            data: { cart },
        });
    } catch (error) {
        next(error);
    }
};

exports.getCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await Cart.findById(cartId)
            .select('userId itemArr')
            .populate('userId', 'email username');
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Tìm giỏ hàng thành công',
            data: { cart },
        });
    } catch (error) {
        next(error);
    }
};

// Lỗi
exports.updateCart = async (req, res, next) => {
    try {
        const { productId, quantity, action } = req.body;
        const { cartId } = req.params;
        let { itemArr } = await Cart.findById(cartId);
        switch (action) {
            case 'update':
                const i = itemArr.findIndex(
                    (item) => item.productId === productId
                );
                if (i) {
                    itemArr[i] = { productId, quantity };
                } else {
                    itemArr = [...itemArr, { productId, quantity }];
                }
                break;
            case 'delete':
                itemArr = itemArr.filter(
                    (item) => item.productId !== productId
                );
                if (itemArr.length === 0) {
                    this.deleteCart;
                }
                break;
        }
        await Cart.findByIdAndUpdate(cartId, { itemArr: itemArr });
        res.status(200).json({
            status: 'success',
            data: { itemArr },
        });
    } catch (error) {}
};

exports.deleteCart = async (req, res, next) => {
    // code
    try {
        const { cartId } = req.params;
        const { userId } = req.user;
        await Cart.findByIdAndDelete(cartId);
        await User.findByIdAndUpdate(userId, { cart: '' });
        res.status(200).json({
            status: 'success',
            type: 'message',
            message: 'delete successfully',
            data: null,
        });
    } catch (error) {}
};
