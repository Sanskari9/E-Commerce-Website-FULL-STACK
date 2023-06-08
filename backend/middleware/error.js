const errorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) =>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error"


    // wrong mongodb Id error
    if(err === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new errorHandler(message, 400);
    }

    res.status(err.statuscode).json({
        success: false,
        message: err.stack,
    });
}