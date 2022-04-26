const Customer = require('../models/Customer');
exports.getCustomerProfile = async (req, res, next) => {
    try {
        const { customerId } = req.bookstore;
        const customerprofile = await Customer.findById(customerId);
        res.status(200).json({
            status: 'success',
            data: { customerprofile }
        })
    } catch (error) {
        res.json(error);
    }
}

exports.updateCustomerProfile = async (req, res, next) => {
    try {

        const { customerId } = req.bookstore;
        // console.log(bookstoreId)
        // const bookstore = await Bookstore.findById(bookstoreId);
        const newcustomerProfile = await Customer.findByIdAndUpdate(customerId, { ...req.body }, { new: true })
        res.status(200).json({
            status: 'success',
            data: { newcustomerProfile }
        })

    } catch (error) {
        res.json(error);
    }
} 