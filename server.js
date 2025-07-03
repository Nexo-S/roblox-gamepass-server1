// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ✅ Route de test simple
app.get("/test", (req, res) => {
  res.send("✅ Serveur actif !");
});

// ✅ Route pour récupérer les gamepasses d’un joueur dans un jeu
app.get("/gamepasses/:userId/:placeId", async (req, res) => {
  const { userId, placeId } = req.params;

  try {
    const url = `https://games.roblox.com/v1/games/${placeId}/game-passes?userId=${userId}`;
    console.log("🔎 Appel API vers :", url);

    const response = await axios.get(url);

    if (response.data && response.data.data) {
      const gamepasses = response.data.data.map(gp => ({
        Id: gp.id,
        Name: gp.name,
        Price: gp.price ?? 0,
      }));

      res.json(gamepasses);
    } else {
      res.status(404).json({ error: "Aucun gamepass trouvé." });
    }

  } catch (error) {
    console.error("❌ Erreur lors de la récupération :", error.message);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// ✅ Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});

