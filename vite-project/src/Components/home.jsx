import React from "react";
import { Link } from "react-router-dom"; // Importe le composant Link

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>Please choose an option to continue:</p>
      <div>
        {/* Lien pour se connecter */}
        <Link to="/login">
          <button>Login</button>
        </Link>
        {/* Lien pour s'inscrire */}
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
