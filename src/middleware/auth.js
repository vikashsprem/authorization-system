const jwt = require("jsonwebtoken");
const { ROLE_PERMISSIONS } = require("../constants/roles");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = ROLE_PERMISSIONS[userRole];

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};

module.exports = { authenticateToken, checkPermission };
