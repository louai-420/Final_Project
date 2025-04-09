const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const connectDB = require("./Config/db");
const cors = require("cors");
const orderRoutes = require("./Routes/orderRoutes");
const productRoutes = require("./Routes/productRoutes");

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());

// Connexion à MongoDB
connectDB();

// Utiliser les routes
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
