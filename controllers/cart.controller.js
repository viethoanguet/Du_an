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

exports.updateMyCart = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { itemArr } = req.body;
        const cart = await Cart.findOneAndUpdate(
            { userId: userId },
            { itemArr: itemArr },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Cập nhật giỏ hàng thành công',
            data: { cart },
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteMyCart = async (req, res, next) => {
    try {
        const { userId } = req.user;
        await Cart.findOneAndDelete({ userId: userId });
        await User.findByIdAndUpdate(userId, { $unset: { cart: 1 } });
        res.status(200).json({
            status: 'success',
            type: 'message',
            message: 'Xóa giỏ hàng thành công',
            data: null,
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

exports.updateCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const { itemArr } = req.body;
        const cart = await Cart.findByIdAndUpdate(
            cartId,
            { itemArr: itemArr },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Cập nhật giỏ hàng thành công',
            data: { cart },
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        await Cart.findByIdAndDelete(cartId);
        await User.findOneAndUpdate({ cart: cartId }, { $unset: { cart: 1 } });
        res.status(200).json({
            status: 'success',
            type: 'message',
            message: 'Xóa giỏ hàng thành công',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllCarts = async (req, res, next) => {
    try {
        const carts = await Cart.find({});
        res.status(200).json({
            status: 'success',
            type: 'array',
            message: 'Lấy tất cả giỏ hàng thành công',
            data: { carts },
        });
    } catch (error) {
        next(error);
    }
};
