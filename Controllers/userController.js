// backend/controllers/userController.js
const User = require("../Models/User.js"); // Importe le modèle User
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Fonction pour créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    console.log("Received data:", { username, email, password, address }); // Récupère les données du corps de la requête

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Crée un nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password,
      address, 
    });

    await newUser.save(); // Enregistre l'utilisateur dans la base de données

    // Réponse réussie
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    // Gestion des erreurs
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Vérifie le mot de passe
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Génère un token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Réponse réussie
    res.status(200).json({ message: "Login successful", token }); // Renvoie le token
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // Récupère l'ID de l'utilisateur à partir du token JWT
    const userId = req.user.userId; 
    // Récupère les informations de l'utilisateur
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Réponse réussie
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Récupère l'ID de l'utilisateur à partir du token JWT
    const { email, password, address } = req.body;

    // Récupère l'utilisateur
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Met à jour les informations
    if (email) user.email = email;
    if (password) user.password = password; 
    if (address) user.address = address;

    // Sauvegarde les modifications
    await user.save();

    // Réponse réussie
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    

    // Réponse réussie
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
