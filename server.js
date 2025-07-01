const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/gamepasses/:userId/:placeId", async (req, res) => {
    const { userId, placeId } = req.params;

    try {
        const url = `https://economy.roblox.com/v2/users/${userId}/developer-products?limit=100`;
        const response = await axios.get(url);

        const passes = response.data.Data || [];
        res.json({ success: true, gamepasses: passes });
    } catch (error) {
        console.error("❌ Erreur lors de la récupération :", error.message);
        res.status(500).json({ success: false, message: "Erreur interne" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
