const User = require("../models/User");

exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body, role: "user" });
        res.status(200).json({
            status: "success",
            data: { user },
        });
    } catch (error) {
        res.json(error);
    }
};
exports.getProfile = async (req, res, next) => {
    try {
        const { userId } = req.user;
        console.log(req.user);
        const user = await User.findById(userId);
        res.status(200).json({
            status: "success",
            data: { user },
        });
    } catch (error) {
        res.json(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const user = await User.findByIdAndUpdate(
            userId,
            { ...req.body },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: "success",
            message: "Update Success",
            data: { user },
        });
    } catch (error) {}
};
exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { role } = req.user.role;
        const user = await User.findById(userId);
        res.status(200).json({
            status: "success",
            data: { user },
        });
    } catch (error) {
        res.json(error);
    }
};
exports.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { role } = req.user.role;
        if (role === "admin") {
            const user = await User.findByIdAndUpdate(
                userId,
                { ...req.body },
                { new: true, runValidators: true }
            );
            res.status(200).json({
                status: "success",
                data: { user },
            });
        } else {
            res.json({ message: "you are not an admin" });
        }
    } catch (error) {
        res.json(error);
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            status: "success",
            message: "user has been deleted",
        });
    } catch (error) {
        res.json(error);
    }
};

exports.queryUser = async (req, res, next) => {
    try {
        const query = req.query;
        const users = await User.find(query);
        res.status(200).json({
            status: "success",
            data: {
                users,
            },
        });
    } catch (error) {}
};
