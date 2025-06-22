const express = require('express');
const router = express.Router();
const db = require('../utils/database');

// GET all speakers
router.get('/', async (req, res) => {
  try {
    const speakers = await db.query(`
      SELECT s.*, COUNT(se.session_id) as total_sessions
      FROM speakers s
      LEFT JOIN sessions se ON s.speaker_id = se.speaker_id
      GROUP BY s.speaker_id
      ORDER BY s.last_name, s.first_name
    `);
    res.json(speakers);
  } catch (error) {
    console.error('Error fetching speakers:', error);
    res.status(500).json({ error: 'Failed to fetch speakers' });
  }
});

// GET specific speaker
router.get('/:id', async (req, res) => {
  try {
    const speaker = await db.query(
      'SELECT * FROM speakers WHERE speaker_id = ?',
      [req.params.id]
    );
    
    if (speaker.length === 0) {
      return res.status(404).json({ error: 'Speaker not found' });
    }

    // Get sessions for this speaker
    const sessions = await db.query(`
      SELECT s.*, c.name as conference_name, c.start_date, c.end_date
      FROM sessions s
      JOIN conferences c ON s.conference_id = c.conference_id
      WHERE s.speaker_id = ?
      ORDER BY s.session_date, s.start_time
    `, [req.params.id]);

    res.json({
      ...speaker[0],
      sessions
    });
  } catch (error) {
    console.error('Error fetching speaker:', error);
    res.status(500).json({ error: 'Failed to fetch speaker' });
  }
});

// POST new speaker
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, bio, company, title } = req.body;
    
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.run(`
      INSERT INTO speakers (first_name, last_name, email, bio, company, title)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [first_name, last_name, email, bio, company, title]);

    const newSpeaker = await db.query(
      'SELECT * FROM speakers WHERE speaker_id = ?',
      [result.id]
    );

    res.status(201).json(newSpeaker[0]);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Error creating speaker:', error);
    res.status(500).json({ error: 'Failed to create speaker' });
  }
});

// PUT update speaker
router.put('/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, bio, company, title } = req.body;
    
    const result = await db.run(`
      UPDATE speakers 
      SET first_name = ?, last_name = ?, email = ?, bio = ?, company = ?, title = ?, updated_at = CURRENT_TIMESTAMP
      WHERE speaker_id = ?
    `, [first_name, last_name, email, bio, company, title, req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Speaker not found' });
    }

    const updatedSpeaker = await db.query(
      'SELECT * FROM speakers WHERE speaker_id = ?',
      [req.params.id]
    );

    res.json(updatedSpeaker[0]);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Error updating speaker:', error);
    res.status(500).json({ error: 'Failed to update speaker' });
  }
});

// DELETE speaker
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.run(
      'DELETE FROM speakers WHERE speaker_id = ?',
      [req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Speaker not found' });
    }

    res.json({ message: 'Speaker deleted successfully' });
  } catch (error) {
    console.error('Error deleting speaker:', error);
    res.status(500).json({ error: 'Failed to delete speaker' });
  }
});

module.exports = router;