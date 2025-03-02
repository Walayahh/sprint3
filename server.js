const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (adjust if needed)
app.use(cors());

// Middleware to parse JSON requests (not really needed here but kept for future use)
app.use(express.json());

// Serve static files from the root directory (including index.html)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve the frontend for any unknown route (important for Azure Web Apps)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ API Route for rolling dice
app.get('/api/roll', (req, res) => {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    res.json({ value: diceValue, timestamp: new Date().toISOString() });
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Frontend available at: http://localhost:${PORT}`);
    console.log(`🎲 API available at: http://localhost:${PORT}/api/roll`);
});
