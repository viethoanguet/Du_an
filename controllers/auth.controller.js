const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { dataFilter } = require("../middlewares/dataFilter");

exports.register = async (req, res, next) => {
    try {
        const dataCheck = dataFilter(req.body, {
            email: "string",
            username: "string",
            password: "string",
        });
        const document = {
            ...dataCheck,
            avatar: null,
            isEmailVerified: false,
            isContactVerified: false,
            isActive: true,
            role: "user",
            contact: null,
        };
        const user = await User.create(document);
        res.status(200).json({
            status: "success",
            type: typeof user,
            message: "Đăng ký thành công",
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });
        if (!user) {
            const err = new Error("Email không tồn tại");
            err.statusCode = 400;
            return next(err);
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.APP_SECRET
            );
            res.status(200).json({
                status: "success",
                message: "Đăng nhập thành công",
                data: {
                    token,
                    username: user.username,
                    role: user.role,
                },
            });
        } else {
            const err = new Error("Mật khẩu không đúng");
            err.statusCode = 400;
            return next(err);
        }
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "success",
            message: "Đăng xuất thành công",
            data: null,
        });
    } catch (error) {}
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
        }
        res.status(200).json({
            message: "Check new password in your email",
        });
    } catch (error) {
        next(error);
    }
};
