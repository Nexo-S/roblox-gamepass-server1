const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/gamepasses/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Récupère les assets de type GamePass créés par cet utilisateur
    const response = await axios.get(`https://catalog.roblox.com/v1/search/items/details?Category=3&CreatorTargetId=${userId}&Limit=30&SortType=3`);

    if (response.data && response.data.data) {
      const gamepasses = response.data.data.map(gp => ({
        Id: gp.id,
        Name: gp.name,
        Price: gp.price ?? 0,
      }));

      res.json(gamepasses);
    } else {
      res.status(404).json({ error: "Aucun gamepass trouvé" });
    }

  } catch (error) {
    console.error("❌ Erreur :", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Serveur Gamepass opérationnel !");
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
