const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        paymentMethod: { type: String },
        status: { type: String, required: [true, 'Chưa thiết lập trạng thái'] },
        address: { type: String, required: [true, 'Thiếu địa chỉ giao hàng'] },
        itemArr: {
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product',
                    },
                    quantity: { type: Number, min: 1 },
                },
            ],
            minlength: 1,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
