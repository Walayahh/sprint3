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

// API route for rolling a die
app.get('/api/roll', (req, res) => {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  res.json({ value: diceValue, timestamp: new Date().toISOString() });
});

// Explicit route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route for any undefined paths (optional)
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
