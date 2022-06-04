const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Name must be required"],
        },
        brand: {
            type: String,
            trim: true,
            required: [true, "Author must be required"],
        },
        images: {
            type: Array,
        },
        price: { type: Number, required: [true, "Price must be required"] },
        description: {
            type: String,
            required: [true, "Author must be required"],
        },
        category: {
            type: Array,
            // minItems: [1, "Category must includes at least 1 item"],
        },
        countInStock: { type: Number, min: [0, "Invalid number"] },
        discount: { type: Number },
        review: {
            type: {
                rate: { type: Number, default: 0 },
                length: { type: Number, default: 0 },
                data: [
                    {
                        userId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User",
                        },
                        rating: { type: Number },
                        comment: { type: String },
                    },
                ],
            },
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
