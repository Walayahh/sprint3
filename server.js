const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Serve the homepage (index.html) from the root directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API route for rolling a 6-sided die
app.get('/api/roll', (req, res) => {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  res.json({ value: diceValue, timestamp: new Date().toISOString() });
});

// Catch-all route for undefined paths
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Homepage: http://localhost:${PORT}/`);
  console.log(`API: http://localhost:${PORT}/api/roll`);
});
