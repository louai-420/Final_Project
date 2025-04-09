// backend/routes/orderRoutes.js
const express = require("express");
const orderController = require("../Controllers/orderController");

const router = express.Router();

// Créer une commande
router.post("/orders", orderController.createOrder);

// Récupérer les commandes d'un utilisateur
router.get("/users/:userId/orders", orderController.getUserOrders);

// Mettre à jour le statut d'une commande
router.put("/orders/:orderId/status", orderController.updateOrderStatus);

module.exports = router;
