// backend/controllers/orderController.js
const Order = require("../Models/Order");
const User = require("../Models/User");

// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;

    // Vérifie si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Crée une nouvelle commande
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      status: "Pending", // Statut initial de la commande
    });

    // Enregistre la commande dans la base de données
    await newOrder.save();

    // Réponse réussie
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Récupérer toutes les commandes d'un utilisateur
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Récupère toutes les commandes de l'utilisateur
    const orders = await Order.find({ userId });

    // Réponse réussie
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Mettre à jour le statut d'une commande
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Met à jour le statut de la commande
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Retourne la commande mise à jour
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Réponse réussie
    res
      .status(200)
      .json({ message: "Order status updated", order: updatedOrder });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
