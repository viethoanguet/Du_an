const jwt = require("jsonwebtoken");

exports.checkCurrentUser = (req, res, next) => {
    // Access Authorization from req header
    const Authorization = req.header("authorization");

    if (!Authorization) {
        req.user = null;
        next();
    } else {
        const token = Authorization.replace("Bearer ", "");
        try {
            const { userId, role } = jwt.verify(token, process.env.APP_SECRET);
            req.user = { userId, role };
            next();
        } catch (error) {
            req.user = null;
            next();
        }
    }
};
