import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddProduct from "./AddProduct";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Catégories disponibles
  const categories = ["High-Tech", "Jeux Vidéo", "Bureau"];

  // Fonction pour récupérer les informations de l'utilisateur
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    try {
      // Appeler l'API de déconnexion (optionnel)
      await axios.post(
        "http://localhost:5000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Supprimer le token du localStorage
      localStorage.removeItem("token");

      // Rediriger vers la page d'accueil
      navigate("/");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // Fonction pour récupérer les produits groupés par catégorie
  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/by-category"
      );
      setProductsByCategory(response.data);
    } catch (err) {
      console.error("Error fetching products by category:", err);
    }
  };

  // Fonction pour filtrer les produits par catégorie
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/category/${category}`
      );
      setFilteredProducts(response.data);
    } catch (err) {
      console.error("Error fetching products in category:", err);
    }
  };

  // Utiliser useEffect pour charger les données au montage du composant
  useEffect(() => {
    fetchUserProfile();
    fetchProductsByCategory();
  }, []);

  // Afficher un message de chargement si les données ne sont pas encore disponibles
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Navbar username={user.username} />

      <div>
        <p>Here's what's happening today:</p>

        {/* Afficher les boutons de catégorie */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{
                padding: "10px",
                backgroundColor:
                  selectedCategory === category ? "#007bff" : "#f0f0f0",
                color: selectedCategory === category ? "#fff" : "#000",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Afficher les produits filtrés ou tous les produits */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {(selectedCategory
            ? filteredProducts
            : Object.values(productsByCategory).flat()
          ).map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                width: "200px",
                textAlign: "center",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
            </div>
          ))}
        </div>

        {/* Afficher l'option "Ajouter un produit" uniquement pour l'admin */}
        {user.role === "admin" && <AddProduct />}

        {/* Autres fonctionnalités du Dashboard */}
        <div>
          <Link to="/orders">
            <button>View Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
