const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        itemArr: {
            type: [
                {
                    productId: { type: String },
                    quantity: { type: Number, min: 1 },
                },
            ],
            minlength: 1,
        },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
