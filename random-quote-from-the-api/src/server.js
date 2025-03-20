import express from "express";
import fetch from "node-fetch";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_URL = process.env.API_URL;

// Serve static frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serving static files from 'public' folder
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath))

// Serving index.html when accessing "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

// API route to fetch a random quote
app.get("/api/quote", async (req, res) => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        res.json(data.data); 
    } catch (error) {
        console.error("Error fetching quote:", error);
        res.status(500).json({ error: "Failed to fetch quote" });
    }
});

// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
