const User = require("../models/User");

exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body })
        res.status(200).json({
            status: "success",
            data: { user }
        })

    } catch (error) {
        res.json(error)
    }
}
exports.myprofile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json({
            status: "success",
            data: { user }
        })

    } catch (error) {
        res.json(error)
    }
}
exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json({
            status: "success",
            data: { user }
        })

    } catch (error) {
        res.json(error)
    }
}
exports.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(
            userId,
            { ...req.body },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: "success",
            data: { user }
        });
    } catch (error) {
        res.json(error)
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            status: "success",
            message: "user has been deleted"
        });

    } catch (error) {
        res.json(error)
    }
}
