// Sample travel destinations with activities
const destinations = [
  'Paris, France',
  'Tokyo, Japan',
  'New York City, USA',
  'Rome, Italy',
  'London, England',
  'Barcelona, Spain',
  'Sydney, Australia',
  'Amsterdam, Netherlands',
  'Dubai, UAE',
  'Santorini, Greece'
];

// Sample activities by destination
const activitiesByDestination = {
  'Paris, France': [
    { name: 'Eiffel Tower Visit', description: 'Iconic tower with panoramic city views' },
    { name: 'Louvre Museum Tour', description: 'World-famous art museum with Mona Lisa' },
    { name: 'Seine River Cruise', description: 'Romantic boat ride through the city' },
    { name: 'Montmartre Walking Tour', description: 'Explore historic artist quarter' },
    { name: 'Versailles Palace Trip', description: 'Opulent royal palace and gardens' },
    { name: 'French Cooking Class', description: 'Learn to make authentic French cuisine' },
    { name: 'Champs-Élysées Shopping', description: 'Luxury shopping on famous avenue' },
    { name: 'Notre-Dame Cathedral', description: 'Gothic cathedral architecture tour' }
  ],
  'Tokyo, Japan': [
    { name: 'Sushi Making Class', description: 'Learn traditional sushi preparation' },
    { name: 'Sensoji Temple Visit', description: 'Ancient Buddhist temple in Asakusa' },
    { name: 'Shibuya Crossing Experience', description: 'Famous scramble crossing adventure' },
    { name: 'Tokyo Skytree Observation', description: 'City views from 634m tower' },
    { name: 'Tsukiji Fish Market Tour', description: 'Early morning fish market exploration' },
    { name: 'Harajuku Fashion District', description: 'Trendy youth culture and fashion' },
    { name: 'Traditional Tea Ceremony', description: 'Authentic Japanese tea experience' },
    { name: 'Robot Restaurant Show', description: 'Futuristic entertainment spectacle' }
  ],
  'New York City, USA': [
    { name: 'Statue of Liberty Tour', description: 'Icon of freedom and democracy' },
    { name: 'Broadway Show', description: 'World-class theater performance' },
    { name: 'Central Park Bike Tour', description: 'Scenic ride through urban oasis' },
    { name: 'Empire State Building', description: 'Art Deco skyscraper with city views' },
    { name: ' 9/11 Memorial Visit', description: 'Moving tribute to September 11th' },
    { name: 'Brooklyn Bridge Walk', description: 'Historic bridge with harbor views' },
    { name: 'Metropolitan Museum of Art', description: 'World-renowned art collections' },
    { name: 'Times Square Experience', description: 'Bright lights and bustling energy' }
  ],
  'Rome, Italy': [
    { name: 'Colosseum Tour', description: 'Ancient amphitheater gladiator history' },
    { name: 'Vatican Museums', description: 'Sistine Chapel and papal collections' },
    { name: 'Roman Forum Walk', description: 'Ancient Roman political center ruins' },
    { name: 'Trevi Fountain Visit', description: 'Baroque fountain coin throwing tradition' },
    { name: 'Pasta Making Class', description: 'Learn authentic Italian pasta techniques' },
    { name: 'Pantheon Exploration', description: 'Best-preserved Roman temple' },
    { name: 'Trastevere Food Tour', description: 'Traditional neighborhood cuisine' },
    { name: 'Spanish Steps Climb', description: 'Famous stairway and shopping area' }
  ],
  'London, England': [
    { name: 'Tower of London', description: 'Historic castle and Crown Jewels' },
    { name: 'British Museum Visit', description: 'World history and cultural artifacts' },
    { name: 'Thames River Cruise', description: 'Scenic boat trip past landmarks' },
    { name: 'Buckingham Palace Tour', description: 'Royal residence and changing guard' },
    { name: 'West End Musical', description: 'London theater district performance' },
    { name: 'Hyde Park Stroll', description: 'Royal park with Speaker\'s Corner' },
    { name: 'Fish and Chips Tasting', description: 'Traditional British pub meal' },
    { name: 'London Eye Ride', description: 'Giant observation wheel city views' }
  ],
  'Barcelona, Spain': [
    { name: 'Sagrada Familia Tour', description: 'Gaudí\'s unfinished basilica masterpiece' },
    { name: 'Park Güell Visit', description: 'Colorful mosaic park by Gaudí' },
    { name: 'Las Ramblas Walk', description: 'Famous pedestrian street and markets' },
    { name: 'Tapas Crawl', description: 'Traditional small plates bar hopping' },
    { name: 'Gothic Quarter Exploration', description: 'Medieval neighborhood wandering' },
    { name: 'Flamenco Show', description: 'Passionate Spanish dance performance' },
    { name: 'Picasso Museum', description: 'Early works of famous artist' },
    { name: 'Beach Day at Barceloneta', description: 'Mediterranean seaside relaxation' }
  ],
  'Sydney, Australia': [
    { name: 'Sydney Opera House Tour', description: 'Iconic architectural landmark visit' },
    { name: 'Harbour Bridge Climb', description: 'Adventurous bridge scaling experience' },
    { name: 'Bondi Beach Surfing', description: 'Learn to surf on famous beach' },
    { name: 'Darling Harbour Walk', description: 'Waterfront dining and entertainment' },
    { name: 'Blue Mountains Day Trip', description: 'Scenic mountain range excursion' },
    { name: 'Taronga Zoo Visit', description: 'Native Australian wildlife viewing' },
    { name: 'Ferry to Manly Beach', description: 'Scenic harbor ferry ride' },
    { name: 'Royal Botanic Gardens', description: 'Beautiful harbor-side gardens' }
  ],
  'Amsterdam, Netherlands': [
    { name: 'Canal Cruise', description: 'Historic waterway tour through city' },
    { name: 'Anne Frank House', description: 'Moving WWII history museum' },
    { name: 'Van Gogh Museum', description: 'World\'s largest Van Gogh collection' },
    { name: 'Bike Tour', description: 'Dutch cycling through city streets' },
    { name: 'Rijksmuseum Visit', description: 'Dutch Golden Age art and history' },
    { name: 'Jordaan District Walk', description: 'Trendy neighborhood exploration' },
    { name: 'Cheese Tasting Tour', description: 'Traditional Dutch cheese sampling' },
    { name: 'Keukenhof Gardens', description: 'Spectacular spring tulip displays' }
  ],
  'Dubai, UAE': [
    { name: 'Burj Khalifa Observation', description: 'World\'s tallest building views' },
    { name: 'Desert Safari', description: 'Dune bashing and camel riding' },
    { name: 'Gold Souk Shopping', description: 'Traditional gold jewelry market' },
    { name: 'Dubai Mall Exploration', description: 'Massive shopping and entertainment' },
    { name: 'Dhow Cruise Dinner', description: 'Traditional boat dinner cruise' },
    { name: 'Skiing at Mall of Emirates', description: 'Indoor snow skiing experience' },
    { name: 'Spice Souk Visit', description: 'Aromatic traditional spice market' },
    { name: 'Palm Jumeirah Tour', description: 'Artificial island luxury resort' }
  ],
  'Santorini, Greece': [
    { name: 'Sunset in Oia', description: 'World-famous sunset viewing spot' },
    { name: 'Wine Tasting Tour', description: 'Local volcanic soil wines' },
    { name: 'Akrotiri Archaeological Site', description: 'Ancient Minoan ruins exploration' },
    { name: 'Red Beach Visit', description: 'Unique red sand beach experience' },
    { name: 'Volcanic Island Cruise', description: 'Boat trip to active volcano' },
    { name: 'Traditional Village Walk', description: 'Cycladic architecture exploration' },
    { name: 'Cooking Class', description: 'Greek cuisine preparation lesson' },
    { name: 'Fira Cable Car Ride', description: 'Scenic cliff-side transportation' }
  ]
};

/**
 * Generate a Random Destination
 * Selects a travel destination from a predefined list
 * @returns {string} A random destination
 */
function generateRandomDestination() {
  const randomIndex = Math.floor(Math.random() * destinations.length);
  return destinations[randomIndex];
}

/**
 * Generate an Activity
 * Generates an activity with name, description, price, and highlight status
 * @param {string} destination - The destination for context-specific activities
 * @returns {object} Activity object with name, description, price, and isHighlight
 */
function generateActivity(destination) {
  const destinationActivities = activitiesByDestination[destination] || activitiesByDestination['Paris, France'];
  const randomActivity = destinationActivities[Math.floor(Math.random() * destinationActivities.length)];
  
  // Generate random price between $20 and $200
  const price = Math.floor(Math.random() * 180) + 20;
  
  // 30% chance of being a highlight activity
  const isHighlight = Math.random() < 0.3;
  
  return {
    name: randomActivity.name,
    description: randomActivity.description,
    price: price,
    isHighlight: isHighlight
  };
}

/**
 * Generate a Full Itinerary
 * Creates an itinerary for a selected destination with 3-7 unique activities
 * @param {string} destination - The destination to create an itinerary for
 * @returns {object} Itinerary object with destination, activities, and total cost
 */
function generateFullItinerary(destination) {
  const numberOfActivities = Math.floor(Math.random() * 5) + 3; // 3-7 activities
  const activities = [];
  const usedActivities = new Set();
  
  const destinationActivities = activitiesByDestination[destination] || activitiesByDestination['Paris, France'];
  
  // Ensure we don't try to get more activities than available
  const maxActivities = Math.min(numberOfActivities, destinationActivities.length);
  
  while (activities.length < maxActivities) {
    const activity = generateActivity(destination);
    
    // Ensure no duplicates
    if (!usedActivities.has(activity.name)) {
      activities.push(activity);
      usedActivities.add(activity.name);
    }
  }
  
  // Calculate total cost
  const totalCost = activities.reduce((sum, activity) => sum + activity.price, 0);
  
  const itinerary = {
    destination: destination,
    activities: activities,
    totalCost: totalCost,
    createdAt: new Date()
  };
  
  // Store in global itineraries for highlights page
  if (!global.allItineraries) {
    global.allItineraries = new Map();
  }
  global.allItineraries.set(destination, itinerary);
  
  return itinerary;
}

/**
 * Get all available destinations
 * @returns {array} Array of all destinations
 */
function getAllDestinations() {
  return [...destinations];
}

/**
 * Get all highlighted activities across all generated itineraries
 * @returns {object} Object with destinations as keys and arrays of highlighted activities as values
 */
function getHighlightedActivities() {
  const highlights = {};
  
  if (global.allItineraries) {
    for (const [destination, itinerary] of global.allItineraries) {
      const highlightedActivities = itinerary.activities.filter(activity => activity.isHighlight);
      if (highlightedActivities.length > 0) {
        highlights[destination] = highlightedActivities;
      }
    }
  }
  
  return highlights;
}

module.exports = {
  generateRandomDestination,
  generateActivity,
  generateFullItinerary,
  getAllDestinations,
  getHighlightedActivities
};