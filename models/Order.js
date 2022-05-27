const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        paymentMethod: { type: String },
        delivery: { type: Number },
        status: { type: String, enum: [complete, pending, processing] },
        address: { type: String, required: [true, "address must be required"] },
        itemArr: {
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                    },
                    quantity: { type: Number, min: 1 },
                },
            ],
            minlength: 1,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
