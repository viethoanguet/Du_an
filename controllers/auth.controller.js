const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
    try {
        const user = await User.create({
            ...req.body,
            avatar: null,
            isEmailVerified: false,
            isContactVerified: false,
            isActive: true,
            role: "user",
            contact: null,
        });
        res.status(200).json({
            status: "success",
            message: "Register Success",
            data: {
                user,
            },
        });
    } catch (error) {
        res.json(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });
        if (!user) {
            res.status(400).json({
                status: "email not available",
            });
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                { userId: user._id, userRole: user.role },
                process.env.APP_SECRET
            );
            res.status(200).json({
                status: "success",
                message: "Login Success",
                data: {
                    token,
                    username: user.username,
                    email: user.email,
                },
            });
        } else {
            res.status(400).json({
                status: "error 2",
            });
        }
    } catch (error) {
        res.json(error);
    }
};

exports.logout = async (req, res, next) => {
    // code
    res.status(200).json({
        message: "Logout Success",
    });
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
        }
        res.status(200).json({
            message: "Check new password in your email",
        });
    } catch (error) {}
};
