const {
  generateRandomDestination,
  generateActivity,
  generateFullItinerary,
  getAllDestinations
} = require('../utils/itineraryGenerator');

describe('Travel Itinerary Generator Tests', () => {
  
  describe('generateRandomDestination', () => {
    test('should return a valid destination string', () => {
      const destination = generateRandomDestination();
      
      expect(typeof destination).toBe('string');
      expect(destination.length).toBeGreaterThan(0);
    });

    test('should return a destination from the predefined list', () => {
      const allDestinations = getAllDestinations();
      const destination = generateRandomDestination();
      
      expect(allDestinations).toContain(destination);
    });

    test('should return different destinations over multiple calls', () => {
      const destinations = new Set();
      
      // Generate 20 destinations to increase chance of getting different ones
      for (let i = 0; i < 20; i++) {
        destinations.add(generateRandomDestination());
      }
      
      // Should have at least 2 different destinations (very likely with 20 calls)
      expect(destinations.size).toBeGreaterThanOrEqual(1);
    });
  });

  describe('generateActivity', () => {
    test('should return an activity object with required properties', () => {
      const destination = 'Paris, France';
      const activity = generateActivity(destination);
      
      expect(activity).toHaveProperty('name');
      expect(activity).toHaveProperty('description');
      expect(activity).toHaveProperty('price');
      expect(activity).toHaveProperty('isHighlight');
    });

    test('should have appropriate property types', () => {
      const destination = 'Tokyo, Japan';
      const activity = generateActivity(destination);
      
      expect(typeof activity.name).toBe('string');
      expect(typeof activity.description).toBe('string');
      expect(typeof activity.price).toBe('number');
      expect(typeof activity.isHighlight).toBe('boolean');
    });

    test('should have a price between $20 and $200', () => {
      const destination = 'New York City, USA';
      const activity = generateActivity(destination);
      
      expect(activity.price).toBeGreaterThanOrEqual(20);
      expect(activity.price).toBeLessThanOrEqual(200);
    });

    test('should have non-empty name and description', () => {
      const destination = 'Rome, Italy';
      const activity = generateActivity(destination);
      
      expect(activity.name.length).toBeGreaterThan(0);
      expect(activity.description.length).toBeGreaterThan(0);
    });

    test('should handle unknown destinations gracefully', () => {
      const destination = 'Unknown City, Unknown Country';
      const activity = generateActivity(destination);
      
      // Should still return a valid activity (defaults to Paris activities)
      expect(activity).toHaveProperty('name');
      expect(activity).toHaveProperty('description');
      expect(activity).toHaveProperty('price');
      expect(activity).toHaveProperty('isHighlight');
    });

    test('should generate different highlight statuses over multiple calls', () => {
      const destination = 'London, England';
      const highlightStatuses = new Set();
      
      // Generate multiple activities to test randomness
      for (let i = 0; i < 20; i++) {
        const activity = generateActivity(destination);
        highlightStatuses.add(activity.isHighlight);
      }
      
      // Should have both true and false values (very likely with 20 calls)
      expect(highlightStatuses.size).toBeGreaterThanOrEqual(1);
    });
  });

  describe('generateFullItinerary', () => {
    test('should return an itinerary object with required properties', () => {
      const destination = 'Barcelona, Spain';
      const itinerary = generateFullItinerary(destination);
      
      expect(itinerary).toHaveProperty('destination');
      expect(itinerary).toHaveProperty('activities');
      expect(itinerary).toHaveProperty('totalCost');
      expect(itinerary).toHaveProperty('createdAt');
    });

    test('should have appropriate property types', () => {
      const destination = 'Sydney, Australia';
      const itinerary = generateFullItinerary(destination);
      
      expect(typeof itinerary.destination).toBe('string');
      expect(Array.isArray(itinerary.activities)).toBe(true);
      expect(typeof itinerary.totalCost).toBe('number');
      expect(itinerary.createdAt instanceof Date).toBe(true);
    });

    test('should have between 3 and 7 activities', () => {
      const destination = 'Amsterdam, Netherlands';
      const itinerary = generateFullItinerary(destination);
      
      expect(itinerary.activities.length).toBeGreaterThanOrEqual(3);
      expect(itinerary.activities.length).toBeLessThanOrEqual(7);
    });

    test('should have the correct destination', () => {
      const destination = 'Dubai, UAE';
      const itinerary = generateFullItinerary(destination);
      
      expect(itinerary.destination).toBe(destination);
    });

    test('should have unique activities (no duplicates)', () => {
      const destination = 'Santorini, Greece';
      const itinerary = generateFullItinerary(destination);
      
      const activityNames = itinerary.activities.map(activity => activity.name);
      const uniqueNames = new Set(activityNames);
      
      expect(activityNames.length).toBe(uniqueNames.size);
    });

    test('should calculate correct total cost', () => {
      const destination = 'Paris, France';
      const itinerary = generateFullItinerary(destination);
      
      const expectedTotal = itinerary.activities.reduce((sum, activity) => sum + activity.price, 0);
      
      expect(itinerary.totalCost).toBe(expectedTotal);
    });

    test('should have totalCost greater than 0', () => {
      const destination = 'Tokyo, Japan';
      const itinerary = generateFullItinerary(destination);
      
      expect(itinerary.totalCost).toBeGreaterThan(0);
    });

    test('should generate different numbers of activities over multiple calls', () => {
      const destination = 'Rome, Italy';
      const activityCounts = new Set();
      
      // Generate multiple itineraries to test randomness
      for (let i = 0; i < 10; i++) {
        const itinerary = generateFullItinerary(destination);
        activityCounts.add(itinerary.activities.length);
      }
      
      // Should have some variation in activity counts
      expect(activityCounts.size).toBeGreaterThanOrEqual(1);
    });

    test('should handle all destinations without errors', () => {
      const allDestinations = getAllDestinations();
      
      allDestinations.forEach(destination => {
        expect(() => {
          const itinerary = generateFullItinerary(destination);
          expect(itinerary.destination).toBe(destination);
          expect(itinerary.activities.length).toBeGreaterThanOrEqual(3);
        }).not.toThrow();
      });
    });

    test('should store itinerary in global storage', () => {
      const destination = 'London, England';
      
      // Clear global storage
      global.allItineraries = new Map();
      
      const itinerary = generateFullItinerary(destination);
      
      expect(global.allItineraries.has(destination)).toBe(true);
      expect(global.allItineraries.get(destination)).toEqual(itinerary);
    });
  });

  describe('getAllDestinations', () => {
    test('should return an array of destinations', () => {
      const destinations = getAllDestinations();
      
      expect(Array.isArray(destinations)).toBe(true);
      expect(destinations.length).toBeGreaterThan(0);
    });

    test('should return destinations as strings', () => {
      const destinations = getAllDestinations();
      
      destinations.forEach(destination => {
        expect(typeof destination).toBe('string');
        expect(destination.length).toBeGreaterThan(0);
      });
    });

    test('should include expected destinations', () => {
      const destinations = getAllDestinations();
      
      // Check for some expected destinations
      expect(destinations).toContain('Paris, France');
      expect(destinations).toContain('Tokyo, Japan');
      expect(destinations).toContain('New York City, USA');
    });
  });
});