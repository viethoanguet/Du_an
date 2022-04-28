const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            },
        });
    } catch (error) {
        res.json(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        });
        if (!user) {
            res.status(400).json({
                status: "error",
            });
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                { userId: user._id, userRole: user.role },
                process.env.APP_SECRET
            );
            res.status(200).json({
                status: "success",
                data: {
                    token,
                    username: user.username,
                    email: user.email,
                },
            });
        } else {
            res.status(400).json({
                status: "error2",
            });
        }
    } catch (error) {
        res.json(error);
    }
};

exports.logout = async (req, res, next) => {
    // code
    res.status(200).json(
        { status: "dang xuat thanh cong"})
};
