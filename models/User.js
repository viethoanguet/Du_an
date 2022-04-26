const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name must be required"],
        },
        phone: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Phone must be required"],
        },
        avatar: { type: String },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Email must be required"],
        },
        username: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Username must be required"],
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Password must be required"],
            minlength: [8, "Password must be at least 8 characters"],
        },
        status: { type: Boolean, required: [true, "status must be required"] },
        role: { type: String, required: [true, "role must be required"] },
        cart: { type: String },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (error, hash) {
        if (error) {
            return next(error);
        } else {
            user.password = hash;
            next();
        }
    });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
