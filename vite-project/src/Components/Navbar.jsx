import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem("token");

    // Rediriger vers la page d'accueil
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      {/* Lien vers le profil */}
      <Link to="/profile" style={styles.link}>
        <span role="img" aria-label="profile">
          👤
        </span>{" "}
        Profile
      </Link>

      {/* Nom d'utilisateur */}
      <span style={styles.username}>Welcome, {username}!</span>

      {/* Bouton de déconnexion */}
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

// Styles pour la Navbar
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  username: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;
