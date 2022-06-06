const Order = require('../models/Order');
const { dataFilter } = require('../middlewares/dataFilter');

exports.createOrder = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const dataCheck = dataFilter(req.body, {
            paymentMethod: 'string',
            address: 'string',
            contact: 'string',
            itemArr: 'array',
        });
        const document = {
            ...dataCheck,
            userId: userId,
            status: 'Đang chuẩn bị',
        };
        const order = await Order.create(document);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Tạo đơn hàng thành công',
            data: {
                order,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.getMyOrders = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const orders = await Order.find({ userId: userId });
        res.status(200).json({
            status: 'success',
            type: 'array',
            length: orders.length,
            message: 'Lấy đơn hàng thành công',
            data: { orders },
        });
    } catch (error) {
        next(error);
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Lấy thông tin giỏ hàng thành công',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};

exports.updateOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const dataCheck = dataFilter(req.body, {
            status: 'string',
        });
        let document = dataCheck;
        const order = await Order.findByIdAndUpdate(orderId, document, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Cập nhật giỏ hàng thành công',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({
            status: 'success',
            type: 'message',
            message: 'Xóa đơn hàng thành công',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

exports.queryOrders = async (req, res, next) => {
    try {
        const query = dataFilter(req.query, {
            status: 'string',
            paymentMethod: 'string',
            userId: 'string',
        });
        const orders = await Order.find(query);
        if (orders.length !== 0) {
            res.status(200).json({
                status: 'success',
                type: 'array',
                length: orders.length,
                message: 'Lấy dữ liệu thành công',
                data: { orders },
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
