const Customer = require('../models/Customer');
const Bookstore = require('../models/Bookstore');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.create(req.body);
        const token = jwt.sign({customerId: customer._id}, process.env.APP_SECRET);
        res.status(200).json({
            status: 'success',
            data: { token, customerName: customer.name }
        })
    } catch (error) {
        res.json(error);
    }
} 

exports.registerStore = async (req, res, next) => {
    try {
        const bookstore = await Bookstore.create(req.body);
        const token = jwt.sign({bookstoreId: bookstore._id}, process.env.APP_SECRET);
        res.status(200).json({
            status: 'success',
            data: { token, bookstoreName: bookstore.name }
        })
    } catch (error) {
        res.json(error);
    }
} 

exports.login = async (req, res, next) => {
    if ( req.body.type === 'customer') {
        try {
            const customer = await Customer.findOne({username: req.body.username});
            if (!customer) {
                res.status(400).json({
                    status: "error",
                })
            } 
            if (bcrypt.compareSync(req.body.password, customer.password)) {
                const token = jwt.sign({customerId: customer._id}, process.env.APP_SECRET);
                res.status(200).json({
                    status: 'success',
                    data: {
                        token, type: req.body.type, customerName: customer.name
                    }
                })
            } else {
                res.status(400).json({
                    status: "error2",
                })
            }
        } catch (error) {
            res.json(error);
        }
    } else {
        try {
            const bookstore = await Bookstore.findOne({username: req.body.username});
                if (!bookstore) {
                    res.status(400).json({
                        status: "error",
                    })
                } 
                if (bcrypt.compareSync(req.body.password, bookstore.password)) {
                    const token = jwt.sign({bookstoreId: bookstore._id}, process.env.APP_SECRET);
                    res.status(200).json({
                        status: 'success',
                        data: {
                            token, type:req.body.type ,bookstoreName: bookstore.name
                        }
                    })
                } else {
                    res.status(400).json({
                        status: "error2",
                    })
                }
        } catch (error) {
            res.json(error);
        }
    }
}
