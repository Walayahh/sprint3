const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// API Route for rolling a 6-sided die (must come BEFORE catch-all)
app.get('/api/roll', (req, res) => {
  console.log('API /api/roll was hit');
  const diceValue = Math.floor(Math.random() * 6) + 1;
  res.json({ value: diceValue, timestamp: new Date().toISOString() });
});

// Catch-all route to serve index.html for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), err => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send(err);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
