const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    // Access Authorization from req header
    const Authorization = req.header('authorization');

    if (!Authorization) {

    }

    const token = Authorization.replace('Bearer ', '');

    const { bookstoreId } = jwt.verify(token, process.env.APP_SECRET);

    req.bookstore = { bookstoreId };

    next();
}