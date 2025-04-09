// backend/routes/userRoutes.js
const express = require("express");
const userController = require("../Controllers/userController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Route pour créer un utilisateur
router.post("/users", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", authMiddleware, userController.logoutUser);

// Route pour récupérer les informations de l'utilisateur (protégée par authMiddleware)
router.get("/profile", authMiddleware, userController.getUserProfile);

// Route pour mettre à jour les informations de l'utilisateur (protégée par authMiddleware)
router.put("/profile", authMiddleware, userController.updateUserProfile);

module.exports = router;
