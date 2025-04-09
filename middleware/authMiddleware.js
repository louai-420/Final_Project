const jwt = require("jsonwebtoken");

// Middleware pour vérifier le token JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token received:", token); // Log le token reçu

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Log le token décodé
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err); // Log l'erreur
    res.status(400).json({ error: "Invalid token." });
  }
};

// Middleware pour vérifier le rôle admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Access denied. Admin role required." });
  }
  next();
};

module.exports = { authMiddleware, isAdmin };
