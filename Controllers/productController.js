// backend/controllers/productController.js
const Product = require("../Models/Product");

// Créer un nouveau produit
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    // Crée un nouveau produit
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      stock,
    });

    // Enregistre le produit dans la base de données
    await newProduct.save();

    // Réponse réussie
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    // Récupère tous les produits
    const products = await Product.find();

    // Réponse réussie
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Récupérer un produit par son ID
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    // Récupère le produit par son ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Réponse réussie
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category, image, stock } = req.body;

    // Met à jour le produit
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, category, image, stock },
      { new: true } // Retourne le produit mis à jour
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Réponse réussie
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Supprime le produit
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Réponse réussie
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Récupérer tous les produits groupés par catégorie
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find(); // Récupérer tous les produits
    const productsByCategory = {};

    // Grouper les produits par catégorie
    products.forEach((product) => {
      if (!productsByCategory[product.category]) {
        productsByCategory[product.category] = [];
      }
      productsByCategory[product.category].push(product);
    });

    // Réponse réussie
    res.status(200).json(productsByCategory);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Récupérer les produits d'une catégorie spécifique
exports.getProductsInCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Récupérer les produits de la catégorie spécifiée
    const products = await Product.find({ category });

    // Réponse réussie
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products in category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
