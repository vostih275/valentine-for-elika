const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.static("public"));

// Endpoint to get a random Valentine combo
app.get("/valentine", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "public", "data.json")));
  
  // Random message
  const message = data.valentineMessages[Math.floor(Math.random() * data.valentineMessages.length)];

  // Random secret
  const secret = data.classified.final[Math.floor(Math.random() * data.classified.final.length)];

  // Randomly choose media type
  const mediaTypes = ['video'];
  const mediaType = mediaTypes[Math.floor(Math.random() * mediaTypes.length)];
  let mediaSrc;
  mediaSrc = data.videos[Math.floor(Math.random() * data.videos.length)];

  // Return JSON
  res.json({ message, secret, mediaType, mediaSrc });
});

if (require.main === module) {
  app.listen(process.env.PORT || 3002, () => console.log("Valentine server running on port " + (process.env.PORT || 3002)));
}

module.exports = app;