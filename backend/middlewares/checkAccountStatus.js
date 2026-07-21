export const checkAccountStatus = (req, res, next) => {
  if (
    req.user.role !== "admin" &&
    req.user.status !== "active"
  ) {
    throw "Your account is not active.";
  }

  next();
};