const express = require('express');
const path = require('path');
const { generateRandomDestination, generateActivity, generateFullItinerary } = require('./utils/itineraryGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Store generated itineraries globally for the highlights page
global.allItineraries = new Map();

// Routes
app.use('/', require('./routes/index'));

// Start server
app.listen(PORT, () => {
  console.log(`Travel Itinerary Generator running on http://localhost:${PORT}`);
});

module.exports = app;