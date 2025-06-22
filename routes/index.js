const express = require('express');
const router = express.Router();
const { 
  generateRandomDestination, 
  generateFullItinerary, 
  getAllDestinations,
  getHighlightedActivities 
} = require('../utils/itineraryGenerator');

// Home Page - Display random featured itinerary and destination dropdown
router.get('/', (req, res) => {
  try {
    // Generate a random featured itinerary
    const randomDestination = generateRandomDestination();
    const featuredItinerary = generateFullItinerary(randomDestination);
    
    // Get all destinations for the dropdown
    const allDestinations = getAllDestinations();
    
    res.render('index', {
      title: 'Travel Itinerary Generator',
      featuredItinerary: featuredItinerary,
      destinations: allDestinations
    });
  } catch (error) {
    console.error('Error loading home page:', error);
    res.status(500).render('error', { message: 'Unable to load page' });
  }
});

// Itinerary Page - Display full itinerary for selected destination
router.get('/itinerary/:destination', (req, res) => {
  try {
    const destination = decodeURIComponent(req.params.destination);
    const itinerary = generateFullItinerary(destination);
    
    res.render('itinerary', {
      title: `${destination} Itinerary`,
      itinerary: itinerary
    });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).render('error', { message: 'Unable to generate itinerary' });
  }
});

// Handle form submission from dropdown
router.post('/generate-itinerary', (req, res) => {
  try {
    const selectedDestination = req.body.destination;
    if (!selectedDestination) {
      return res.redirect('/');
    }
    
    res.redirect(`/itinerary/${encodeURIComponent(selectedDestination)}`);
  } catch (error) {
    console.error('Error processing form:', error);
    res.redirect('/');
  }
});

// Highlight Activities Page - Display highlighted activities grouped by location
router.get('/highlights', (req, res) => {
  try {
    const highlightedActivities = getHighlightedActivities();
    const allDestinations = getAllDestinations();
    
    res.render('highlights', {
      title: 'Highlighted Activities',
      highlights: highlightedActivities,
      allDestinations: allDestinations
    });
  } catch (error) {
    console.error('Error loading highlights page:', error);
    res.status(500).render('error', { message: 'Unable to load highlights' });
  }
});

module.exports = router;