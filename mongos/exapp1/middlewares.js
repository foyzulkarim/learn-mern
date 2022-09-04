const { GeneralError } = require("./errors");

const validatorMiddleware = (x) => {
  return (req, res, next) => {
    const validationResult = x(req.body);
    if (!validationResult.error) {
      next();
      return;
    }
    return res
      .status(400)
      .json({ status: "error", message: validationResult.error });
  };
};

const handleError = async (err, req, res, next) => {
  if (res?.headersSent) {
    return next(err);
  }

  let code = 500;
  if (err instanceof GeneralError) {
    code = err.getCode();
  }

  const correlationId = req?.headers["x-correlation-id"];
  return (
    res &&
    res.status(code).send({
      correlationId,
      message: err.message,
      status: "error",
      error: { ...err },
    })
  );
};

module.exports = {
  validatorMiddleware,
  handleError,
};
