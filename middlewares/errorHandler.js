exports.errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        err.statusCode = 400;
        for (let p in err.keyValue) {
            err.message = `${p} bị trùng`;
        }
    }

    // res.status(err.statusCode).json({ err });

    if (err.kind === "ObjectId") {
        err.statusCode = 404;
        err.message = `The ${req.originalUrl} is not found because of wrong ID`;
    }

    if (err.errors) {
        err.statusCode = 400;
        err.message = [];
        for (let p in err.errors) {
            err.message.push(err.errors[p].properties.message);
        }
    }

    res.status(err.statusCode).json({
        status: "error",
        type: typeof err.message,
        message: err.message,
        data: null,
    });
};
