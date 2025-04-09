
const express = require("express");
const productController = require("../Controllers/productController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Créer un produit
router.post(
  "/products",
  authMiddleware,
  isAdmin,
  productController.createProduct
);

// Récupérer tous les produits
router.get("/products", productController.getAllProducts);

// Récupérer un produit par son ID
router.get("/products/:productId", productController.getProductById);

// Mettre à jour un produit
router.put(
  "/products/:productId",
  authMiddleware,
  isAdmin,
  productController.updateProduct
);

// Supprimer un produit
router.delete(
  "/products/:productId",
  authMiddleware,
  isAdmin,
  productController.deleteProduct
);

// Récupérer tous les produits groupés par catégorie
router.get("/products/by-category", productController.getProductsByCategory);

// Récupérer les produits d'une catégorie spécifique
router.get(
  "/products/category/:category",
  productController.getProductsInCategory
);

module.exports = router;
