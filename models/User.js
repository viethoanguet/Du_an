const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        contact: {
            type: String,
            trim: true,
        },
        avatar: { type: String, trim: true },
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
        role: { type: String, required: [true, "role must be required"] },
        isEmailVerified: { type: Boolean, required: true },
        isContactVerified: { type: Boolean, required: true },
        isActive: { type: Boolean, required: true },
        cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
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
