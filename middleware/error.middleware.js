export const errorHandler = (err, req, res, next) => {
  const errorStatusCode = err.statusCode || 500;
  const errorMessage = err.message || "Iternal Server Error";

  res.status(errorStatusCode).json({
    success: false,
    errorStatusCode,
    errorMessage,
  });
};
