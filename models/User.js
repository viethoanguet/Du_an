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
            required: [true, "Chưa điền email"],
        },
        username: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Chưa điền tên tài khoản"],
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Chưa điền mật khẩu"],
            minlength: [8, "Mật khẩu phải chứa ít nhất 8 ký tự"],
        },
        role: { type: String, required: [true, "Thiếu trường role"] },
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
