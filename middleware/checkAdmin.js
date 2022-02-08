exports.IsAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      err = new Error('Dont have permission');
      err.statusCode = 403;
      return next(err);
    }

    return next();
  } catch (err) {
    return next(err);
  }
}