export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch((err) => {
      console.error("Async error caught:", err);
      next(err);
    });
  };
};
