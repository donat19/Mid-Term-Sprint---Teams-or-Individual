const database = require('../utils/database');

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Initialize database (connect and create tables)
    await database.initialize();
    
    // Check if data already exists
    const existingData = await database.query('SELECT COUNT(*) as count FROM conferences');
    
    if (existingData[0].count === 0) {
      console.log('No existing data found. Seeding database...');
      await database.seedData();
      console.log('Database setup completed successfully!');
    } else {
      console.log('Database already contains data. Skipping seed data.');
    }
    
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase().then(() => {
    console.log('Database setup script completed');
    process.exit(0);
  });
}

module.exports = setupDatabase;