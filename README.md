# Travel Itinerary Generator - Mid Term Sprint Solo

A Node.js Express application that generates fictional travel itineraries for various destinations worldwide.

## 📋 Project Overview

This application generates custom travel itineraries featuring:
- Random destination selection from 10 popular locations
- 3-7 unique activities per itinerary with realistic pricing
- Highlighted "must-do" activities for each destination
- Three main pages: Home, Itinerary Details, and Highlights

**Due Date:** June 29th, 2025, at 11:59 PM

## ✨ Features

### Core Functionality
- **Random Destination Generation**: Selects from predefined travel destinations
- **Activity Generation**: Creates activities with names, descriptions, prices ($20-$200), and highlight status
- **Full Itinerary Creation**: Generates 3-7 unique activities with total cost calculation
- **Featured Itinerary**: Random itinerary displayed on homepage
- **Destination Selection**: Dropdown menu for custom itinerary generation

### Pages
1. **Home Page**: Featured random itinerary + destination dropdown
2. **Itinerary Page**: Full trip details for selected destination
3. **Highlights Page**: Must-do activities grouped by location

## 🛠 Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating engine
- **Testing**: Jest framework
- **Styling**: Custom CSS with responsive design

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd "Mid Term Sprint - Teams or Individual"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Development mode** (with auto-restart)
   ```bash
   npm run dev
   ```

5. **Run tests**
   ```bash
   npm test
   ```

The application will be available at `http://localhost:3000`

## 🗺 Available Destinations

- Paris, France
- Tokyo, Japan  
- New York City, USA
- Rome, Italy
- London, England
- Barcelona, Spain
- Sydney, Australia
- Amsterdam, Netherlands
- Dubai, UAE
- Santorini, Greece

Each destination includes 8 unique activities ranging from cultural experiences to adventure activities.

## 🧪 Testing

The project includes comprehensive unit tests for all core functions:

### Test Coverage
- **generateRandomDestination()**: Validates destination selection
- **generateActivity()**: Tests activity generation with proper properties
- **generateFullItinerary()**: Verifies itinerary creation meets requirements

### Running Tests
```bash
npm test
```

Tests verify:
- Functions return valid output
- Activities have correct property types
- Itineraries contain 3-7 unique activities
- Pricing is within expected ranges
- No duplicate activities in itineraries

## 📁 Project Structure

```
Mid Term Sprint - Teams or Individual/
├── app.js                          # Main Express application
├── package.json                    # Dependencies and scripts
├── README.md                       # Project documentation
├── public/
│   └── styles.css                  # CSS styling
├── routes/
│   └── index.js                    # Application routes
├── utils/
│   └── itineraryGenerator.js       # Core business logic
├── views/
│   ├── index.ejs                   # Home page template
│   ├── itinerary.ejs               # Itinerary details template
│   └── highlights.ejs              # Highlights page template
└── tests/
    └── itineraryGenerator.test.js  # Unit tests
```

## 🎯 Core Functions

### 1. generateRandomDestination()
```javascript
// Returns a random destination from predefined list
const destination = generateRandomDestination();
// Example: "Paris, France"
```

### 2. generateActivity(destination)
```javascript
// Generates activity with name, description, price, highlight status
const activity = generateActivity("Tokyo, Japan");
// Returns: { name, description, price, isHighlight }
```

### 3. generateFullItinerary(destination)
```javascript
// Creates complete itinerary with 3-7 unique activities
const itinerary = generateFullItinerary("Rome, Italy");
// Returns: { destination, activities[], totalCost, createdAt }
```

## 🌟 Key Features Implemented

### ✅ Required Functionality
- [x] Random destination generation
- [x] Activity generation with all required properties
- [x] Full itinerary generation (3-7 activities)
- [x] No duplicate activities per itinerary
- [x] Total cost calculation
- [x] Random featured itinerary on homepage
- [x] Destination dropdown selection

### ✅ Required Pages
- [x] Home page with dropdown and featured itinerary
- [x] Itinerary page with full trip details
- [x] Highlights page with activities grouped by location

### ✅ Testing Requirements
- [x] Unit tests for all three core functions
- [x] Validation of function outputs
- [x] Property type verification
- [x] Range and constraint testing

## 🎨 Design Features

- **Responsive Design**: Mobile-friendly layout
- **Modern UI**: Clean, professional appearance
- **Visual Hierarchy**: Clear information organization
- **Interactive Elements**: Hover effects and smooth transitions
- **Color-coded Highlights**: Special styling for must-do activities

## 🚀 Usage Examples

### Generate Custom Itinerary
1. Visit homepage
2. Select destination from dropdown
3. Click "Generate Itinerary"
4. View detailed trip plan

### View Highlights
1. Navigate to "Highlights" page
2. Browse must-do activities by destination
3. Click "View Full Itinerary" for complete trip details

## � Sample Output

**Itinerary Example:**
```
Destination: Paris, France
Activities: 5
Total Cost: $587

1. Eiffel Tower Visit - $45 ⭐ Must-Do
2. Louvre Museum Tour - $32
3. Seine River Cruise - $89
4. French Cooking Class - $156 ⭐ Must-Do  
5. Champs-Élysées Shopping - $265
```

## 🎯 Assignment Requirements Met

### Functional Requirements ✅
- Random destination generation
- Activity generation with all properties
- Full itinerary creation (3-7 activities)
- Featured itinerary on homepage
- Destination dropdown functionality

### Technical Requirements ✅
- Node.js & Express backend
- EJS templating (no other frameworks)
- Unit tests with Jest
- Proper project structure

### Page Requirements ✅
- Home page with featured itinerary and dropdown
- Itinerary page with full trip details
- Highlights page with grouped activities

## 👨‍💻 Author

**Ivan** - Full Stack Development Student  
**Course**: Mid Term Sprint Solo Project  
**Due**: June 29th, 2025

## 📄 License

This project is developed for educational purposes as part of the Full Stack Development course.

---

**Note**: This application generates fictional travel itineraries for demonstration purposes. All activities, prices, and descriptions are simulated data for the assignment requirements.