const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const port = 5000; // Choose a port for your server

app.get("/api/games", (req, res) => {
  // Handle the API logic for fetching games here
  // Send back the response with the game data
  res.json({ message: "API route for fetching games" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
