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
            minlength: [1, "need at least 1 photo for this product"],
        },
        price: { type: Number, required: [true, "Price must be required"] },
        description: {
            type: String,
            required: [true, "Author must be required"],
        },
        category: {
            type: Array,
            minItems: [1, "Category must includes at least 1 item"],
        },
        stock: { type: Number, min: [0, "Invalid number"] },
        discount: { type: Number },
        review: {
            type: [
                {
                    customerId: { type: String },
                    comment: { type: String },
                    ranking: { type: Number, min: 1, max: 5 },
                },
            ],
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
