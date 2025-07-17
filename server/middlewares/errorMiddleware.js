// class ErroHandler extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }
// export const errorMiddleware = (err, req, res, next) => {
//   err.message = err.message || "Internal server error ";
//   err.statusCode = err.statusCode || 500;
//   console.log(err);
//   if (err.code === 11000) {
//     const statusCode = 400;
//     const message = `Duplicate field value entered`;
//     err = new ErroHandler(message, statusCode);
//   }
//   if (err.name === "JsonWebTokenError") {
//     const statusCode = 400;
//     const message = `json web token is invalid . try again`;
//     err = new ErroHandler(message, statusCode);
//   }
//   if (err.name === "TokenExpiredError") {
//     const statusCode = 400;
//     const message = `json web token is invalid . try again`;
//     err = new ErroHandler(message, statusCode);
//   }
//   if (err.name === "CastError") {
//     const statusCode = 400;
//     const message = `resource not found invalid: ${err.path}`;
//     err = new ErroHandler(message, statusCode);
//   }
//   const errorMessage = err.errors
//     ? Object.values(err.errors)
//         .map((error) => error.message)
//         .join(" ")
//     : err.message;
//   return res.status(err.statusCode).json({
//     success: false,
//     message: errorMessage,
//   });
// };
// export default ErroHandler;
// 📁 middlewares/errorMiddleware.js

// class ErrorHandler extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  console.log(err);

  if (err.code === 11000) {
    err = new ErrorHandler("Duplicate field value entered", 400);
  }

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("JSON Web Token is invalid. Try again.", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("JSON Web Token has expired. Try again.", 400);
  }

  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
