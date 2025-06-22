const express = require('express');
const router = express.Router();
const db = require('../utils/database');

// GET all conferences
router.get('/', async (req, res) => {
  try {
    const conferences = await db.query(`
      SELECT c.*, 
             COUNT(DISTINCT cr.attendee_id) as registered_attendees,
             COUNT(DISTINCT s.session_id) as total_sessions
      FROM conferences c
      LEFT JOIN conference_registrations cr ON c.conference_id = cr.conference_id
      LEFT JOIN sessions s ON c.conference_id = s.conference_id
      GROUP BY c.conference_id
      ORDER BY c.start_date
    `);
    res.json(conferences);
  } catch (error) {
    console.error('Error fetching conferences:', error);
    res.status(500).json({ error: 'Failed to fetch conferences' });
  }
});

// GET specific conference
router.get('/:id', async (req, res) => {
  try {
    const conference = await db.query(
      'SELECT * FROM conferences WHERE conference_id = ?',
      [req.params.id]
    );
    
    if (conference.length === 0) {
      return res.status(404).json({ error: 'Conference not found' });
    }

    // Get sessions for this conference
    const sessions = await db.query(`
      SELECT s.*, sp.first_name, sp.last_name, sp.company
      FROM sessions s
      JOIN speakers sp ON s.speaker_id = sp.speaker_id
      WHERE s.conference_id = ?
      ORDER BY s.session_date, s.start_time
    `, [req.params.id]);

    res.json({
      ...conference[0],
      sessions
    });
  } catch (error) {
    console.error('Error fetching conference:', error);
    res.status(500).json({ error: 'Failed to fetch conference' });
  }
});

// POST new conference
router.post('/', async (req, res) => {
  try {
    const { name, description, start_date, end_date, location, max_attendees } = req.body;
    
    if (!name || !start_date || !end_date || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.run(`
      INSERT INTO conferences (name, description, start_date, end_date, location, max_attendees)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [name, description, start_date, end_date, location, max_attendees || 100]);

    const newConference = await db.query(
      'SELECT * FROM conferences WHERE conference_id = ?',
      [result.id]
    );

    res.status(201).json(newConference[0]);
  } catch (error) {
    console.error('Error creating conference:', error);
    res.status(500).json({ error: 'Failed to create conference' });
  }
});

// PUT update conference
router.put('/:id', async (req, res) => {
  try {
    const { name, description, start_date, end_date, location, max_attendees } = req.body;
    
    const result = await db.run(`
      UPDATE conferences 
      SET name = ?, description = ?, start_date = ?, end_date = ?, location = ?, max_attendees = ?, updated_at = CURRENT_TIMESTAMP
      WHERE conference_id = ?
    `, [name, description, start_date, end_date, location, max_attendees, req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Conference not found' });
    }

    const updatedConference = await db.query(
      'SELECT * FROM conferences WHERE conference_id = ?',
      [req.params.id]
    );

    res.json(updatedConference[0]);
  } catch (error) {
    console.error('Error updating conference:', error);
    res.status(500).json({ error: 'Failed to update conference' });
  }
});

// DELETE conference
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.run(
      'DELETE FROM conferences WHERE conference_id = ?',
      [req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Conference not found' });
    }

    res.json({ message: 'Conference deleted successfully' });
  } catch (error) {
    console.error('Error deleting conference:', error);
    res.status(500).json({ error: 'Failed to delete conference' });
  }
});

module.exports = router;