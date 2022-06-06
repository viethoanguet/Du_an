const User = require('../models/User');
const { dataFilter } = require('../middlewares/dataFilter');

exports.createUser = async (req, res, next) => {
    try {
        const dataCheck = dataFilter(req.body, {
            email: 'string',
            username: 'string',
            password: 'string',
        });
        const document = {
            ...dataCheck,
            avatar: null,
            isEmailVerified: false,
            isContactVerified: false,
            isActive: true,
            role: 'user',
            contact: null,
        };
        const user = await User.create(document);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Tạo người dùng thành công',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const filter =
            'avatar contact email username role isEmailVerified isContactVerified';
        const user = await User.findById(userId, filter);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Lấy thông tin cá nhân thành công',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const dataCheck = dataFilter(req.body, {
            contact: 'string',
            avatar: 'string',
            email: 'string',
        });
        let document = dataCheck;
        if (document.contact) {
            document.isContactVerified = false;
        }
        if (document.email) {
            document.isEmailVerified = false;
        }
        const filter =
            'avatar contact email username role isEmailVerified isContactVerified';
        const user = await User.findByIdAndUpdate(userId, document, {
            new: true,
            runValidators: true,
        }).select(filter);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Cập nhật thông tin thành công',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const filter =
            'avatar contact email username role isEmailVerified isContactVerified isActive';
        const user = await User.findById(userId, filter);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Lấy thông tin người dùng thành công',
            data: { user },
        });
    } catch (error) {
        res.json(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const document = dataFilter(req.body, {
            contact: 'string',
            avatar: 'string',
            email: 'string',
            isContactVerified: 'boolean',
            isEmailVerified: 'boolean',
            isActive: 'boolean',
        });
        const filter =
            'avatar contact email username role isEmailVerified isContactVerified isActive';
        const user = await User.findByIdAndUpdate(userId, document, {
            new: true,
            runValidators: true,
        }).select(filter);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Cập nhật thông tin người dùng thành công',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            status: 'success',
            type: 'message',
            message: 'Xóa người dùng thành công',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

exports.queryUser = async (req, res, next) => {
    try {
        const query = dataFilter(req.query, {
            role: 'string',
            isEmailVerified: 'boolean',
            isContactVerified: 'boolean',
            isActive: 'boolean',
        });
        const filter =
            'avatar contact email username role isEmailVerified isContactVerified isActive';
        const users = await User.find(query, filter);
        if (users.length !== 0) {
            res.status(200).json({
                status: 'success',
                type: 'array',
                length: users.length,
                message: 'Lấy dữ liệu thành công',
                data: { users },
            });
        } else {
            res.status(200).json({
                status: 'success',
                type: 'message',
                message: 'Không có dữ liệu phù hợp',
                data: null,
            });
        }
    } catch (error) {
        next(error);
    }
};
