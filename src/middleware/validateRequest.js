const validateRequest = (schema) => async (req, res, next) => {
  try {
    if (schema.body) {
      req.body = await schema.body.parseAsync(req.body);
    }

    if (schema.params) {
      req.params = await schema.params.parseAsync(req.params);
    }

    if (schema.query) {
      req.query = await schema.query.parseAsync(req.query);
    }

    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
    next(error);
  }
};

module.exports = validateRequest;
